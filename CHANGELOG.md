# Changelog

All notable changes to KnowMe / 知我 are documented here.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

### Added (planned for v1)
- Local-only logging UI ("Open log directory" in Settings) — D2 from owner sign-off
- License-key entry UI for Commercial / Lifetime tiers — D5 + D6 from owner sign-off
- Cloudflare R2 mirror for installer downloads (China CDN) — to be deployed at v1 ship time
- 知识星球 (Zhishi Xingqiu) + theme-pack purchase channels (CN) — D8

### Changed (planned for v1)
- Public release readiness pass: README_CN as primary, English secondary
- All v1 user-visible UI strings audited for tone (no more dev-mode jargon)

---

## [0.x.y] — Pre-release internal builds

Pre-v1 development happened in a private repository. Highlights of the in-progress work that will land in v1:

- **Core editor (CodeMirror 6 based)**:
  - Live / Edit / Reading three-mode editor
  - In-document find / replace (Cmd+F / Cmd+Alt+F) — Phase 12.68
  - List rendering with multi-level indent guides, Tab/Shift+Tab indent, ordered-list auto-renumber
  - Heading + list folding with persisted state per note
  - WikiLink hover preview (Live + Reading mode parity)
  - KaTeX math (inline + block) with WeChat export support
  - Mermaid diagram rendering

- **Knowledge graph**:
  - Entity / Concept / Source three-class auto-extraction via LLM
  - Review queue with Pending / Resolved / All views — Phase 12.67
  - SQLite-backed FTS for fast knowledge-base search
  - Page-slug-aware wikilink resolution

- **Multi-channel publishing**:
  - WeChat Official Account (公众号) export with juice-inlined CSS, KaTeX math, Mermaid SVG
  - Markdown export

- **MCP**:
  - Standalone MCP server bundled with the desktop app
  - Read-only knowledge queries exposed to Claude Code / Cursor
  - Write-path MCP (creating reviews from agents) on the v1.x roadmap

- **Theming**:
  - Three-axis theme system: theme (lake-warm / obsidian) × mode (light / dark) × accent (configurable)
  - All settings stored device-locally

- **Tabs + mounts**:
  - Multi-tab editor with reopen-recently-closed (Cmd+Shift+T)
  - External directory mounting (read raw notes from arbitrary paths)
  - STATUS auto-collapse on file open from mount

---

## [v1.0.0] — TBD

_To be released. This will be the first public version._

The contents of "Unreleased" will move here when v1 ships, plus any final pre-release fixes.

[Unreleased]: https://github.com/Timeflys2018/knowme/compare/v1.0.0...HEAD
