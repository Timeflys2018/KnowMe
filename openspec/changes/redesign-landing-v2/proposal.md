## Why

The current production landing page (`site/index.html`) uses an older indigo-themed layout. A redesigned "纸墨书斋" (paper/ink) prototype exists at `prototypes/2026-08-07-landing-redesign-v2.html` (in the sibling `zhiwo` repo) with a stronger narrative: a tri-state hero demo (随手记 → AI 编译 → 随时问), an app-window mock, a four-step workflow, a collapsible download band, and mobile nav. We want that design live.

The prototype is a **review-only** artifact: it hardcodes version `0.10.1`, its download button is a non-navigating `<button>`, its platform cards are non-linking `<div>`s, it references assets at `assets-landing/`, and it lacks the production `<head>` (OG/Twitter/description) and the real multi-source download system. Production is already at `0.10.2` with a fully wired download center (R2 + GitHub `/latest/` + 4 mirrors + runtime source switcher), single-constant version injection (`applyVersionStrings()`), and `meta.json` consumed by the desktop version-nudge pipeline.

A naive copy of the prototype over production would REGRESS: it would downgrade `0.10.2 → 0.10.1`, delete the real download machinery, break asset paths, and drop social/SEO meta. This change instead **grafts the prototype's design onto production's proven download + version wiring**.

## What Changes

- Replace `site/index.html`'s layout/CSS/copy with the prototype's "纸墨书斋" design (tri-state hero demo, app-window mock, four-step workflow, collapsible download band, mobile nav, sections and copy).
- Preserve production's real download system: `VERSION='0.10.2'`, `RELEASE_DATE`, the multi-source download IIFE (R2/GitHub/mirrors), the runtime source switcher, `detectPlatform()` + `refineMacArch()`, and `<a id="download-primary">` + `<a class="download-platform-card" data-os=…>` real links.
- Convert the prototype's review-only stubs into production-wired elements; drop the "原型评审版" review badge.
- Route ALL version literals (including prototype-introduced ones such as the download-strip title) through `applyVersionStrings()`; HTML literals remain fallback only.
- Fix all `assets-landing/` → `assets/`; restore production `<head>` (OG/Twitter/description/favicon/apple-touch-icon/og-image).
- Point the sponsor prep-card to `/sponsor` (a real production page) instead of the prototype's in-page `#sponsor`.
- Rewrite the Playwright QA harness (`site/index.qa.spec.mjs`) for production semantics: real download hrefs per source, source switcher toggles hrefs, version single-sourced across the page, collapse band, demo-tab a11y, mobile nav, FAQ deep-link, no horizontal overflow, and review screenshots.
- Do NOT change `site/meta.json`, `site/_headers`, `site/_redirects`, `site/sponsor.html`, `site/legal/`, or any desktop/app code.

## Capabilities

### New Capabilities
- `landing-page`: The public `useknowme.com` landing page (`site/index.html`) — its design/structure, its real multi-source download wiring, and its single-sourced version display — with a repeatable browser QA harness that locks these invariants.

### Modified Capabilities

None.

## Impact

- `site/index.html`: Full rewrite — prototype design grafted onto production download/version JS.
- `site/index.qa.spec.mjs`: New Playwright QA harness for production landing invariants (replaces the prototype-only review harness that lived in `zhiwo/prototypes/`).
- `site/assets/`: No new assets required; the prototype's 4 referenced assets (favicon, apple-touch-icon, afdian-qr, wechat-mp-qr) plus og-image already exist under `assets/`.
- Deployment remains static Cloudflare Pages + git push; no runtime backend, Worker, or tracking is introduced.
- No change to `meta.json`, `_headers`, `_redirects`, `sponsor.html`, `legal/`, docs, or app code.
