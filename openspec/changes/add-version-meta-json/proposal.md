## Why

The desktop version-nudge pipeline needs a stable public metadata endpoint that can be fetched independently from the private app repository. Hosting a strict `meta.json` contract on `useknowme.com` lets the desktop app check release lifecycle, announcements, and rare high-risk upgrade notices without adding a backend, account system, or license service.

## What Changes

- Add a Cloudflare Pages-served `site/meta.json` endpoint for version metadata.
- Add explicit `/meta.json` response headers with JSON content type and short cache TTL.
- Add a local validator script so future hand-edited metadata is checked before deployment.
- Do not add a management UI, Worker/KV service, license service, download proxy, analytics beacon, or user tracking.

## Capabilities

### New Capabilities
- `version-meta-endpoint`: Public static metadata endpoint consumed by the desktop app for version-nudge lifecycle, announcements, and rare high-risk upgrade notices.

### Modified Capabilities

None.

## Impact

- `site/meta.json`: New static JSON contract deployed by Cloudflare Pages.
- `site/_headers`: Adds `/meta.json` JSON and cache headers.
- `scripts/validate-meta-json.mjs`: New validation utility for local and CI/manual checks.
- Deployment remains static Pages + git push; no runtime backend or Cloudflare Worker is introduced.
