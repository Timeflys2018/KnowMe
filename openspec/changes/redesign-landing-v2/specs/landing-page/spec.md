## ADDED Requirements

### Requirement: Landing page adopts the v2 "纸墨书斋" design
The public landing page SHALL present the redesigned v2 structure and copy: a tri-state hero demo, an application-window mock, a four-step workflow, a differentiators section with a collapsible "更多能力" disclosure, pricing with an early-bird block, promises, sponsor, and FAQ.

#### Scenario: Hero renders the redesigned heading
- **WHEN** the landing page loads
- **THEN** the hero heading (`#hero-title`) SHALL contain "写下此刻" and "会自己长出来".

#### Scenario: Hero tri-state demo is an accessible tablist
- **WHEN** the landing page loads
- **THEN** exactly one demo tab (`[data-demo-tab]`) SHALL have `aria-selected="true"`, and it SHALL be the `write` tab, with only `#demo-panel-write` visible.

#### Scenario: Demo tabs switch on click and keyboard
- **WHEN** a user clicks the `compile` demo tab, or focuses a tab and presses ArrowRight / Home / End
- **THEN** exactly one tab SHALL be selected at a time and its corresponding panel SHALL be the only visible panel.

#### Scenario: Workflow shows the four steps
- **WHEN** the landing page loads
- **THEN** the workflow section SHALL show exactly four step labels in order: 随手记录, 自动编译, 随时提问, 连接每个 AI.

#### Scenario: "更多能力" disclosure is collapsed by default
- **WHEN** the landing page loads
- **THEN** the `details.more-caps` disclosure SHALL be collapsed (no `open` attribute), and SHALL toggle open when its summary is activated.

### Requirement: Download center is wired to the real multi-source download system
The landing page SHALL provide real, navigable download links driven by the production download logic, never review-only stubs.

#### Scenario: Primary download is a real link with an R2 default URL
- **WHEN** the landing page loads and the download band is present
- **THEN** the primary download element (`#download-primary`) SHALL be an `<a>` whose `href` points at the default source `https://download.useknowme.com/` with the current version's platform filename.

#### Scenario: Platform cards carry real per-platform hrefs
- **WHEN** the download band content is present
- **THEN** each platform card (`.download-platform-card[data-os]`) SHALL be an `<a>` whose `href` resolves to the correct file for its `data-os` (`mac-arm` → `KnowMe-<version>-arm64.dmg`, `mac-intel` → `KnowMe-<version>.dmg`, `win` → `KnowMe-Setup-<version>.exe`).

#### Scenario: Source switcher rewrites download hrefs
- **WHEN** a user selects a non-default source pill (e.g. "GitHub 直连" or a mirror)
- **THEN** `#download-primary` and every platform card href SHALL be rewritten to that source's URL form, and exactly one source pill SHALL have `aria-pressed="true"`.

#### Scenario: No review-only download stubs remain
- **WHEN** the landing page is rendered
- **THEN** there SHALL be no "原型评审版" review badge and no non-navigating download button; the primary download SHALL be a link, not a `<button>`.

### Requirement: Version display is single-sourced
The landing page SHALL derive every visible version string from one `VERSION` constant via `applyVersionStrings()`, with HTML literals used only as fallback.

#### Scenario: All visible version literals match the VERSION constant
- **WHEN** the landing page loads and version strings are injected
- **THEN** the hero download label, download title, download-strip title, pricing period, pricing CTA, Windows install filename, primary download meta, and every platform-card filename SHALL equal the single `VERSION` constant.

#### Scenario: Bumping VERSION updates the whole page
- **WHEN** the `VERSION` constant is changed
- **THEN** all injected version strings SHALL reflect the new value without editing any other location.

### Requirement: Download band collapse coexists with download wiring
The collapsible download band SHALL be controlled independently of the download-link wiring, so links are valid even while the band is collapsed.

#### Scenario: Band is collapsed by default on desktop and expands on demand
- **WHEN** the landing page loads on a desktop viewport
- **THEN** the `#download` section SHALL not have the `is-open` class and the band body SHALL be zero-height, and clicking the summary strip (or navigating to `#download`) SHALL add `is-open` and reveal the live download center.

#### Scenario: Download links are wired even while collapsed
- **WHEN** the landing page loads and before the band is expanded
- **THEN** `#download-primary` SHALL already carry a valid R2 download href (proving the download IIFE ran independently of the collapse state).

### Requirement: Production head, assets, and outbound links are preserved
The landing page SHALL keep production-grade metadata, asset paths, and cross-page links.

#### Scenario: Social and SEO metadata are present
- **WHEN** the landing page `<head>` is parsed
- **THEN** it SHALL include the Open Graph and Twitter card tags, a description, favicon, apple-touch-icon, and an `og:image` at `assets/og-image.jpg`.

#### Scenario: No prototype asset paths leak
- **WHEN** the landing page source is scanned
- **THEN** it SHALL contain zero references to `assets-landing/`; all image references SHALL use `assets/`.

#### Scenario: Sponsor link points at the production sponsor page
- **WHEN** a user activates the sponsor prep-card in the download center
- **THEN** it SHALL navigate to the production `/sponsor` page (not an in-page anchor).

### Requirement: Repeatable browser QA harness for the landing page
The repository SHALL include a Playwright harness that verifies the landing invariants and captures review screenshots.

#### Scenario: QA harness passes on the production landing invariants
- **WHEN** the QA harness runs against `site/index.html`
- **THEN** it SHALL verify the hero/demo/workflow/disclosures, the real download hrefs and source switcher, the single-sourced version strings, the collapse band, mobile nav, FAQ deep-link, and absence of horizontal overflow, and SHALL exit successfully.

#### Scenario: QA harness captures review screenshots
- **WHEN** the QA harness runs
- **THEN** it SHALL capture desktop and mobile screenshots of the default and compile demo states into a persistent results directory.
