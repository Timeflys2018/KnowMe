#!/bin/bash
# 知我 KnowMe · GitHub Releases 下载量查询脚本
#
# 用法：
#   bash scripts/download-stats.sh           # 看所有 release
#   bash scripts/download-stats.sh v1.0.0    # 只看某个 release

set -euo pipefail

REPO="Timeflys2018/KnowMe"
TAG="${1:-}"

if [ -n "$TAG" ]; then
  URL="https://api.github.com/repos/$REPO/releases/tags/$TAG"
else
  URL="https://api.github.com/repos/$REPO/releases"
fi

curl -sS "$URL" | python3 -c "
import sys, json
data = json.load(sys.stdin)

if isinstance(data, dict):
    # 单个 release（指定 tag）
    releases = [data]
else:
    releases = data

if not releases or (isinstance(releases[0], dict) and 'message' in releases[0] and releases[0].get('message') == 'Not Found'):
    print('尚无 Release 发布。')
    exit(0)

total = 0
for release in releases:
    print(f'\n📦 {release[\"tag_name\"]}  ·  {release[\"published_at\"][:10]}')
    print(f'   {release.get(\"name\", \"\") or \"(no title)\"}')
    print()
    sub_total = 0
    for asset in release.get('assets', []):
        n = asset['download_count']
        sub_total += n
        size_mb = asset['size'] / 1024 / 1024
        print(f'  {n:>7,} downloads  ·  {asset[\"name\"]}  ·  {size_mb:.1f} MB')
    print(f'  {\"-\"*40}')
    print(f'  {sub_total:>7,} (this release)')
    total += sub_total

if len(releases) > 1:
    print()
    print(f'  ===== TOTAL: {total:,} downloads across all releases =====')
"
