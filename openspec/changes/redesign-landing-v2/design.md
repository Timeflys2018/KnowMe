# Design — redesign-landing-v2

## Context

- **Source of new design:** `zhiwo/prototypes/2026-08-07-landing-redesign-v2.html` (self-contained HTML+CSS+JS, review-only).
- **Target (live):** `KnowMe/site/index.html` (older indigo layout, fully wired downloads at `0.10.2`).
- The prototype and production diverge on: version (0.10.1 vs 0.10.2), download behavior (review-only stub vs real multi-source), asset paths (`assets-landing/` vs `assets/`), `<head>` completeness, sponsor link, and the presence of a beta-banner.

## Strategy: prototype shell + production download/version graft

Take the prototype as the **shell** (CSS, structure, copy, demo, collapse band, mobile nav) and graft production's **download IIFE + version wiring** in place of the prototype's stub. Confirmed by Oracle consult.

### Two independent JS IIFEs (coexistence contract)

The two IIFEs touch **disjoint DOM** and have no init race:

| Concern | Collapse IIFE (from prototype) | Download IIFE (from production) |
|---|---|---|
| Owns | `#download` classList (`.is-open`), `[data-download-collapse]` click, `#download` hashchange | `#download-pre.hidden`, `#download-live.hidden`, `#download-prep-grid.hidden`, `#download-primary.href`, `.download-platform-card[data-os].href`, `#download-source.hidden`, source pills |
| Reads | `location.hash`, `a[href="#download"]` clicks | `navigator.userAgent`, `navigator.userAgentData` |

Key fact: the collapse hides content via `.download-body { grid-template-rows: 0fr; overflow:hidden }`. The inner `#download-live` still exists in the DOM, so the download IIFE finds it, flips `hidden=false`, and writes hrefs regardless of collapse state. **The collapse IIFE MUST NOT touch `hidden` on `#download-live`** — it only toggles `.is-open` on `#download`. Load the download IIFE first, then the collapse IIFE, then the FAQ deep-link IIFE.

### DOM conversions on the download band (mandatory)

1. `#download-primary`: prototype `<button type="button" data-platform="auto" …>` → production `<a id="download-primary" href="#" class="btn-download-primary">`. Remove `type`, `data-platform`, `data-download-label`, `aria-describedby`.
2. Platform cards: prototype `<div class="platform-card" data-platform="mac-arm">` → production `<a class="download-platform-card" data-os="mac-arm" href="#">` (and `mac-intel`, `win`). **`data-platform` → `data-os` is critical** — `applyLinks()` reads `data-os`.
3. Insert production's `#download-source` / `#download-source-row` block (source-switcher container) before the platform grid.
4. Remove the "原型评审版" review badge (`#download-review-note`).
5. Platform-card copy: drop the hardcoded filename text (`KnowMe-0.10.1-arm64.dmg` …) — keep only OS + arch labels — to eliminate 3 version literals with no UX loss. (Alternative: id-hook each; chosen the simpler removal.)

### Version single-sourcing

Use production's `applyVersionStrings()` verbatim, EXTENDED to cover prototype-introduced literals:
- Already handled: `#hero-download`, `#download-title`, `#pricing-period-version`, `#pricing-cta-version`, `#install-win-filename`, `#download-primary-meta`, `#download-pre-version`, `#download-prep-mail(-text)`.
- **Add:** `#download-strip-title` → `'知我 KnowMe ' + VERSION + ' 公测版'`.
- Hero button: ensure `#hero-download` owns the whole "↓ 下载 <VERSION>" text node (prototype nests a `.hero-download-label` span + an SVG). Restructure so `applyVersionStrings` writes a single text node without dropping the icon — keep the SVG icon as a sibling and give the label span an id, OR keep production's markup (icon glyph "↓" in text). Chosen: keep the prototype's SVG icon, wrap the version text in `#hero-download` label span and inject into that span (not the whole `<a>`), and mirror this precisely in `applyVersionStrings`.

### Head / assets / links

- Port production `<head>` OG/Twitter/description/keywords/favicon/apple-touch-icon/og:image verbatim; keep the prototype's `<title>` copy.
- Replace every `assets-landing/` with `assets/` (favicon, apple-touch-icon, afdian-qr, wechat-mp-qr).
- Sponsor prep-card: `#sponsor` → `https://useknowme.com/sponsor` (matches current production; keeps in-page `#sponsor` section anchor working for nav/footer, but the download-center prep-card links the standalone page as production does).

### Beta-banner decision

Drop production's standalone `.beta-banner`. The prototype's hero-badge ("公测期 · … 完全免费") + the pricing/early-bird sections already carry the roadmap and early-bird link. This keeps the prototype's cleaner hero. (Design-correctness: no information loss — early-bird link remains reachable via pricing section `#early-bird` and FAQ.)

## Decisions & trade-offs

- **Graft over rewrite of download logic:** production's download IIFE is proven and drives `meta.json`-adjacent version display; reusing it verbatim avoids reintroducing R2/mirror/arch-detection bugs. (设计正确性 ✅, 开发维护 ✅)
- **Remove filename labels from cards** rather than id-hooking them: fewer version literals to drift; the href already carries the file. (长期扩展性 ✅)
- **Keep two IIFEs separate:** orthogonal concerns, independently testable. (维护 ✅)

## Risks

- `assets-landing/` path leak → grep must return zero (QA + manual).
- Forgetting `#download-strip-title` in `applyVersionStrings` → collapsed-state version mismatch; locked by QA invariant.
- Mobile CSS force-expands the band (`.download-strip{display:none}`, body `grid-template-rows:1fr`); the "collapsed by default" QA assertion MUST be desktop-only.
- Hero button icon loss if `applyVersionStrings` overwrites the whole `<a>` text — inject into the label span only.
