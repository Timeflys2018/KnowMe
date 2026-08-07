# Tasks — redesign-landing-v2

## 1. QA harness first (TDD: define production invariants, expect RED)

- [x] 1.1 Create `site/index.qa.spec.mjs` targeting `site/index.html` (file:// URL). Port the prototype harness's design tests (hero heading, demo tablist a11y, workflow 4 labels, more-caps disclosure, FAQ toggle, mobile nav, mobile page-height budget, no horizontal overflow, review screenshots).
- [x] 1.2 Add/INVERT the download tests for production semantics: `#download-primary` is an `<a>` (not button); its href starts with `https://download.useknowme.com/` and ends with the version filename; platform cards `[data-os]` carry correct per-OS hrefs; source switcher rewrites hrefs and toggles `aria-pressed`.
- [x] 1.3 Add version single-source test: read `VERSION` from the inline script, assert every visible version literal equals it (`#hero-download`, `#download-title`, `#download-strip-title`, `#pricing-period-version`, `#pricing-cta-version`, `#install-win-filename`, `#download-primary-meta`, platform-card hrefs).
- [x] 1.4 Add collapse-coexistence tests: desktop band collapsed by default + expands on strip click and on `#download` deep-link; `#download-primary` already has a valid R2 href while collapsed; gate the "collapsed by default" assertion to desktop viewport only (mobile force-expands).
- [x] 1.5 Add head/asset/link tests: OG/Twitter/description present, `og:image` uses `assets/`, zero `assets-landing/` references, sponsor prep-card links `/sponsor`.
- [x] 1.6 Run the harness against the CURRENT (un-merged) `site/index.html` and confirm it FAILS on the new v2 design assertions (RED proof that the tests actually test the new design).

## 2. Port prototype shell to production (implementation → GREEN)

- [x] 2.1 Replace `site/index.html` body/CSS/copy with the prototype's v2 structure (纸墨书斋 CSS, nav+mobile-nav, hero + tri-state demo, app-window mock, download section, features + more-caps, workflow, pricing + early-bird, promises + trust-proof, sponsor, FAQ, footer).
- [x] 2.2 Restore production `<head>`: OG/Twitter/description/keywords, favicon, apple-touch-icon, `og:image` at `assets/og-image.jpg`; keep prototype `<title>`.
- [x] 2.3 Replace all `assets-landing/` → `assets/`.
- [x] 2.4 Sponsor prep-card link → `https://useknowme.com/sponsor`; drop the standalone beta-banner (roadmap covered by hero-badge + pricing/early-bird).

## 3. Wire the download band to production logic

- [x] 3.1 Convert `#download-primary` from `<button>` to `<a>`; remove `type`/`data-platform`/`data-download-label`/`aria-describedby`; drop the "原型评审版" review badge.
- [x] 3.2 Convert platform cards from `<div data-platform>` to `<a class="download-platform-card" data-os=… href="#">`; remove hardcoded filename copy from cards.
- [x] 3.3 Insert production's `#download-source` / `#download-source-row` source-switcher block before the platform grid.
- [x] 3.4 Replace the prototype's stub download IIFE with production's full download IIFE (VERSION 0.10.2 + RELEASE_DATE, SOURCES, detectPlatform, refineMacArch, applyLinks, source pills, pre/live/prep toggling).
- [x] 3.5 Extend `applyVersionStrings()` to also set `#download-strip-title`; verify `#hero-download` label injection keeps the SVG icon.
- [x] 3.6 Keep the prototype's collapse-band IIFE and FAQ deep-link IIFE as separate IIFEs, loaded AFTER the download IIFE; ensure collapse IIFE never toggles `hidden` on `#download-live`.

## 4. Verify (e2e + CDP + regression)

- [x] 4.1 Run `site/index.qa.spec.mjs` via Playwright; all tests GREEN; screenshots captured to a persistent path.
- [x] 4.2 CDP real-browser verification: load merged `site/index.html`, confirm — demo tabs switch, download band expands, primary + platform hrefs are real R2 URLs, source switcher flips hrefs, mobile nav works, no console errors. Eyeball screenshots for visual fidelity to the prototype.
- [x] 4.3 Grep merged file: zero `assets-landing/`, zero `0.10.1`, zero review-badge text; `data-os` present on all 3 cards.
- [x] 4.4 Run `scripts/validate-meta-json.mjs` (unchanged meta.json still valid); confirm `_headers`/`_redirects`/`sponsor.html`/`legal/` untouched.

## 5. Close out

- [x] 5.1 `openspec validate redesign-landing-v2 --strict` passes; `openspec verify` / archive.
- [x] 5.2 Commit on `landing-redesign-v2` branch (CJK message via `git commit -F`).
