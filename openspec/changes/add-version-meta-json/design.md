## Context

The desktop version-nudge pipeline consumes a configurable remote metadata URL. The private zhiwo handoff defines the desktop↔Cloudflare contract for a static `meta.json` endpoint, while this public repository owns `useknowme.com` and its Cloudflare Pages assets under `site/`.

Current public repo state: there is no `site/meta.json`, and `site/_headers` has no metadata-specific cache/content-type rule. Cloudflare Pages already serves the static site and respects `_headers` / `_redirects`.

## Goals / Non-Goals

**Goals:**
- Serve a strict static `meta.json` contract from `https://useknowme.com/meta.json`.
- Keep metadata updates as simple git edits + push deploys.
- Add short-cache JSON response headers for fast operational updates.
- Add a local validation script so hand-edited metadata cannot silently break the desktop strict schema.

**Non-Goals:**
- No management dashboard.
- No Cloudflare Worker, KV service, license service, download proxy, account system, read receipts, segmentation, or analytics pipeline.
- No desktop implementation in this public repo.

## Decisions

1. **Static Pages file instead of Worker/KV.**
   - Decision: create `site/meta.json` directly in the Pages source.
   - Rationale: the handoff explicitly calls for the thinnest backend-free path; the metadata changes rarely and can be reviewed through git.
   - Alternative rejected: Worker/KV management endpoint. It adds operational and privacy surface without need for v1.

2. **Short TTL via `_headers`.**
   - Decision: add `/meta.json` headers with `Cache-Control: public, max-age=300, must-revalidate` and JSON content type.
   - Rationale: release announcements and risk notices need to propagate in minutes, not hours.
   - Alternative rejected: long immutable caching. It would delay urgent correction of metadata.

3. **Local script validation with no dependency.**
   - Decision: implement `scripts/validate-meta-json.mjs` using Node built-ins.
   - Rationale: this repo has minimal tooling; a no-dependency script is easy to run locally and in future CI.
   - Alternative rejected: adding zod only for this static-site validation. The desktop can use zod; the public repo does not need an extra dependency.

4. **Initial metadata is quiet.**
   - Decision: seed `announcements: []` and `riskBlock: null`.
   - Rationale: the endpoint should exist before the desktop depends on it, but it should not push user-visible messages until release operations are ready.

## Risks / Trade-offs

- **Metadata drift from desktop schema** → Keep the handoff document as the contract source and update the validator if the desktop schema changes.
- **Cloudflare analytics/RUM injection on JSON** → Static JSON should not be instrumented; verify with deployed `curl -i` and Cloudflare dashboard settings.
- **GitHub repository path case mismatch** → Validator must accept only the intended `github.com/Timeflys2018/knowme/` path prefix per handoff; if the public repo URL capitalization differs operationally, update both desktop allowlist and validator together.
- **Download URL availability** → Seed `downloadUrl` with `https://useknowme.com/#download` until `download.useknowme.com/latest` is live.

## Migration Plan

1. Add `site/meta.json` and `_headers` rule.
2. Add validator and run it locally.
3. Build docs/static assets as usual.
4. Commit and push to `origin/main`.
5. After Cloudflare Pages deploys, verify `curl -i https://useknowme.com/meta.json` for status, JSON content type, short TTL, and no HTML injection.
