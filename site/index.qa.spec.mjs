/* =============================================================
   知我 KnowMe landing page — production browser QA harness.

   Verifies the production landing page at site/index.html:
   the v3 "双定位" design (mode-switch hero: 知识模式 tri-state demo /
   智能模式 Fleet console; 双引擎闭环 #loop; Agent Fleet #agent-fleet;
   feature disclosures, mobile nav, FAQ), the REAL multi-source download
   wiring (R2 default, source switcher, per-platform hrefs), single-sourced
   version display, the collapsible download band, head/asset/link
   integrity, and an element-level horizontal-overflow audit. Captures
   desktop/mobile screenshots for default and compile demo states.

   Run (from a checkout that has @playwright/test installed, e.g. the
   sibling zhiwo repo):
     PAGE=/abs/path/to/site/index.html \
       pnpm exec playwright test /abs/path/to/site/index.qa.spec.mjs --reporter=line
   If PAGE is unset, defaults to the index.html next to this spec.
   ============================================================= */
import { test, expect } from "@playwright/test";
import { fileURLToPath, pathToFileURL } from "node:url";
import { dirname, join } from "node:path";
import { mkdirSync, statSync, readFileSync } from "node:fs";

const HERE = dirname(fileURLToPath(import.meta.url));
const PAGE_FILE = process.env.PAGE || join(HERE, "index.html");
const PAGE_URL = pathToFileURL(PAGE_FILE).href;

// Single source of truth for version, read from the page's inline script.
const PAGE_SRC = readFileSync(PAGE_FILE, "utf8");
const VERSION = (() => {
  const m = PAGE_SRC.match(/var\s+VERSION\s*=\s*['"]([^'"]+)['"]/);
  if (!m) throw new Error("Could not find VERSION constant in index.html");
  return m[1];
})();
// Windows package version is intentionally decoupled from VERSION: some releases
// ship macOS-only, keeping the Windows installer on an older version so its
// download link never 404s. The win filename tracks WIN_VERSION, not VERSION.
const WIN_VERSION = (() => {
  const m = PAGE_SRC.match(/var\s+WIN_VERSION\s*=\s*['"]([^'"]+)['"]/);
  return m ? m[1] : VERSION;
})();

const FILES = {
  "mac-arm": `KnowMe-${VERSION}-arm64.dmg`,
  "mac-intel": `KnowMe-${VERSION}.dmg`,
  win: `KnowMe-Setup-${WIN_VERSION}.exe`,
};
const R2_BASE = "https://download.useknowme.com/";
const GH_LATEST = `https://github.com/Timeflys2018/KnowMe/releases/latest/download/`;

const SCREENSHOT_DIR = join(HERE, "..", "test-results", "useknowme-landing-prod");
mkdirSync(SCREENSHOT_DIR, { recursive: true });

const VIEWPORTS = {
  desktop: { width: 1440, height: 900 },
  mobile: { width: 390, height: 844 },
};

/** Element-level horizontal-overflow audit. */
async function overflowingElements(page) {
  return page.evaluate(() => {
    const TOLERANCE = 1;
    const results = [];
    const candidates = [
      document.documentElement,
      document.body,
      ...document.querySelectorAll("main > section, body > section, header, nav, footer"),
    ].filter(Boolean);
    for (const el of candidates) {
      const rect = el.getBoundingClientRect();
      const visible =
        rect.width > 0 && rect.height > 0 && getComputedStyle(el).display !== "none";
      if (!visible && el !== document.documentElement && el !== document.body) continue;
      const overflow = el.scrollWidth - el.clientWidth;
      if (overflow > TOLERANCE) {
        results.push({
          tag: el.tagName.toLowerCase(),
          id: el.id || null,
          scrollWidth: el.scrollWidth,
          clientWidth: el.clientWidth,
          overflow,
        });
      }
    }
    const docOverflow = document.documentElement.scrollWidth - window.innerWidth;
    if (docOverflow > TOLERANCE) results.push({ tag: "document", overflow: docOverflow });
    return results;
  });
}

for (const [name, viewport] of Object.entries(VIEWPORTS)) {
  test.describe(`landing @ ${name} ${viewport.width}x${viewport.height}`, () => {
    test.use({ viewport });

    // ---- Design invariants (v3 「双定位」) ----
    test("renders hero heading and default demo tab (knowledge mode)", async ({ page }) => {
      await page.goto(PAGE_URL);
      await expect(page.locator("#hero-title").first()).toBeVisible();
      await expect(page.locator("#hero-title").first()).toContainText("写下此刻");
      await expect(page.locator("#hero-title").first()).toContainText("会自己长出来");
      // knowledge mode active by default
      const mode = page.locator('[data-mode-tab][aria-selected="true"]');
      await expect(mode).toHaveCount(1);
      await expect(mode).toHaveAttribute("data-mode-tab", "knowledge");
      // knowledge-scene tri-state demo defaults to "write"
      const selected = page.locator('[data-demo-tab][aria-selected="true"]');
      await expect(selected).toHaveCount(1);
      await expect(selected).toHaveAttribute("data-demo-tab", "write");
      await expect(page.locator("#demo-panel-write")).toBeVisible();
      await expect(page.locator("#demo-panel-compile")).toBeHidden();
      await expect(page.locator("#demo-panel-ask")).toBeHidden();
    });

    test("mode switch reveals the Fleet scene and reskins hero", async ({ page }) => {
      await page.goto(PAGE_URL);
      await page.locator("#mode-tab-fleet").click();
      await expect(page.locator("body")).toHaveAttribute("data-mode", "fleet");
      const mode = page.locator('[data-mode-tab][aria-selected="true"]');
      await expect(mode).toHaveCount(1);
      await expect(mode).toHaveAttribute("data-mode-tab", "fleet");
      await expect(page.locator("#mode-scene-fleet")).toBeVisible();
      await expect(page.locator("#mode-scene-knowledge")).toBeHidden();
      // fleet console defaults to the kanban tab
      const fleetSel = page.locator('[data-fleet-tab][aria-selected="true"]');
      await expect(fleetSel).toHaveCount(1);
      await expect(fleetSel).toHaveAttribute("data-fleet-tab", "kanban");
    });

    test("#fleet deep-link opens directly in智能模式", async ({ page }) => {
      await page.goto(PAGE_URL + "#fleet");
      await expect(page.locator("body")).toHaveAttribute("data-mode", "fleet");
      await expect(page.locator("#mode-scene-fleet")).toBeVisible();
    });

    test("switches demo state on click with single selection", async ({ page }) => {
      await page.goto(PAGE_URL);
      await page.locator("#demo-tab-compile").click();
      const selected = page.locator('[data-demo-tab][aria-selected="true"]');
      await expect(selected).toHaveCount(1);
      await expect(selected).toHaveAttribute("data-demo-tab", "compile");
      await expect(page.locator("#demo-panel-compile")).toBeVisible();
      await expect(page.locator("#demo-panel-compile .demo-entities li")).toHaveCount(3);
    });

    test("supports arrow-key navigation across demo tabs", async ({ page }) => {
      await page.goto(PAGE_URL);
      await page.locator("#demo-tab-write").focus();
      await page.keyboard.press("ArrowRight");
      await expect(page.locator('[data-demo-tab][aria-selected="true"]')).toHaveAttribute(
        "data-demo-tab",
        "compile"
      );
      await page.keyboard.press("End");
      await expect(page.locator('[data-demo-tab][aria-selected="true"]')).toHaveAttribute(
        "data-demo-tab",
        "ask"
      );
      await page.keyboard.press("Home");
      await expect(page.locator('[data-demo-tab][aria-selected="true"]')).toHaveAttribute(
        "data-demo-tab",
        "write"
      );
    });

    test("双引擎闭环 shows the five exact step labels", async ({ page }) => {
      await page.goto(PAGE_URL);
      const labels = page.locator("#loop .loop-flow .loop-node h3");
      await expect(labels).toHaveCount(5);
      await expect(labels.nth(0)).toHaveText("随手记录");
      await expect(labels.nth(1)).toHaveText("AI 编译 Wiki");
      await expect(labels.nth(2)).toHaveText("Agent 经 MCP 读写");
      await expect(labels.nth(3)).toHaveText("Fleet 派活执行");
      await expect(labels.nth(4)).toHaveText("产出编回知识库");
    });

    test("Agent Fleet section renders its capability cards", async ({ page }) => {
      await page.goto(PAGE_URL);
      const section = page.locator("#agent-fleet");
      await expect(section).toHaveCount(1);
      await expect(section.locator(".fleet-cap")).toHaveCount(4);
    });

    test("more-capabilities disclosure is collapsed by default and toggles", async ({ page }) => {
      await page.goto(PAGE_URL);
      const details = page.locator("details.more-caps");
      await expect(details).toHaveCount(1);
      await expect(details).not.toHaveAttribute("open", /.*/);
      await details.locator("summary").click();
      await expect(details).toHaveAttribute("open", "");
    });

    test("FAQ disclosures toggle open/closed", async ({ page }) => {
      await page.goto(PAGE_URL);
      const first = page.locator(".faq-item").first();
      await expect(first).not.toHaveAttribute("open", /.*/);
      await first.locator("summary").click();
      await expect(first).toHaveAttribute("open", "");
      await first.locator("summary").click();
      await expect(first).not.toHaveAttribute("open", /.*/);
    });

    // ---- Real download wiring ----
    test("primary download is a real link to the default R2 source", async ({ page }) => {
      await page.goto(PAGE_URL);
      await page.locator(".download-strip").click().catch(() => {});
      const btn = page.locator("#download-primary");
      await expect(btn).toBeVisible();
      const tag = await btn.evaluate((el) => el.tagName.toLowerCase());
      expect(tag).toBe("a");
      const href = await btn.getAttribute("href");
      expect(href, `primary href: ${href}`).toContain(R2_BASE);
      // default platform is mac-arm or win depending on UA; must be a known file.
      expect(Object.values(FILES).some((f) => href.endsWith(f)), href).toBe(true);
    });

    test("platform cards carry correct per-os hrefs", async ({ page }) => {
      await page.goto(PAGE_URL);
      await page.locator(".download-strip").click().catch(() => {});
      for (const os of Object.keys(FILES)) {
        const card = page.locator(`.download-platform-card[data-os="${os}"]`);
        await expect(card).toHaveCount(1);
        const tag = await card.evaluate((el) => el.tagName.toLowerCase());
        expect(tag).toBe("a");
        const href = await card.getAttribute("href");
        expect(href, `${os} href: ${href}`).toBe(R2_BASE + FILES[os]);
      }
    });

    test("source switcher rewrites hrefs and toggles aria-pressed", async ({ page }) => {
      await page.goto(PAGE_URL);
      await page.locator(".download-strip").click().catch(() => {});
      const pills = page.locator(".download-source-pill");
      await expect(pills.first()).toBeVisible();
      // exactly one pressed by default
      await expect(page.locator('.download-source-pill[aria-pressed="true"]')).toHaveCount(1);
      // click "GitHub 直连"
      const gh = page.locator(".download-source-pill", { hasText: "GitHub 直连" });
      await gh.click();
      await expect(gh).toHaveAttribute("aria-pressed", "true");
      await expect(page.locator('.download-source-pill[aria-pressed="true"]')).toHaveCount(1);
      const primaryHref = await page.locator("#download-primary").getAttribute("href");
      expect(primaryHref, primaryHref).toContain(GH_LATEST);
      const macArm = await page
        .locator('.download-platform-card[data-os="mac-arm"]')
        .getAttribute("href");
      expect(macArm).toBe(GH_LATEST + FILES["mac-arm"]);
      // back to default R2
      const r2pill = page.locator(".download-source-pill", { hasText: "官方源" });
      await r2pill.click();
      const back = await page.locator("#download-primary").getAttribute("href");
      expect(back).toContain(R2_BASE);
    });

    test("no review-only stub remains", async ({ page }) => {
      await page.goto(PAGE_URL);
      const bodyText = await page.locator("body").innerText();
      expect(bodyText).not.toContain("原型评审版");
      expect(bodyText).not.toContain("下载按钮不触发真实下载");
    });

    // ---- Version single-sourcing ----
    test("all visible version literals equal the VERSION constant", async ({ page }) => {
      await page.goto(PAGE_URL);
      await page.locator(".download-strip").click().catch(() => {});
      const checks = {
        "#hero-download": (t) => t.includes(VERSION),
        "#download-title": (t) => t.includes(VERSION),
        "#download-strip-title": (t) => t.includes(VERSION),
        "#pricing-period-version": (t) => t.includes(VERSION),
        "#pricing-cta-version": (t) => t.includes(VERSION),
        // Windows installer filename tracks WIN_VERSION (decoupled from VERSION).
        "#install-win-filename": (t) => t.includes(WIN_VERSION),
        "#download-primary-meta": (t) => t.includes(VERSION),
      };
      for (const [sel, ok] of Object.entries(checks)) {
        const el = page.locator(sel);
        if ((await el.count()) === 0) continue;
        // textContent (not innerText) so elements inside collapsed <details> still read.
        const t = ((await el.first().textContent()) || "").trim();
        expect(ok(t), `${sel} = "${t}" (expected to satisfy version check)`).toBe(true);
      }
      // no stale version anywhere in the DOM text
      const stale = await page.evaluate(() => document.body.textContent.includes("0.10.1"));
      expect(stale, "stale 0.10.1 present in DOM").toBe(false);
    });

    // ---- Collapse band coexistence ----
    test("download links are wired even before expanding the band", async ({ page }) => {
      await page.goto(PAGE_URL);
      // do NOT expand; assert the download IIFE already ran
      const href = await page.locator("#download-primary").getAttribute("href");
      expect(href, `href while collapsed: ${href}`).toContain(R2_BASE);
    });

    // ---- Head / assets / links ----
    test("head has social + SEO metadata and assets paths", async ({ page }) => {
      await page.goto(PAGE_URL);
      await expect(page.locator('meta[property="og:title"]')).toHaveCount(1);
      await expect(page.locator('meta[name="twitter:card"]')).toHaveCount(1);
      await expect(page.locator('meta[name="description"]')).toHaveCount(1);
      const og = await page.locator('meta[property="og:image"]').getAttribute("content");
      expect(og).toContain("assets/");
      // zero prototype asset paths
      expect(PAGE_SRC).not.toContain("assets-landing/");
    });

    test("sponsor prep-card links the production /sponsor page", async ({ page }) => {
      await page.goto(PAGE_URL);
      await page.locator(".download-strip").click().catch(() => {});
      const sponsor = page.locator('.prep-card[href*="/sponsor"]');
      await expect(sponsor).toHaveCount(1);
    });

    test("has no real horizontal overflow", async ({ page }) => {
      await page.goto(PAGE_URL);
      await page.locator("#demo-tab-compile").click();
      const offenders = await overflowingElements(page);
      expect(
        offenders,
        `Horizontal overflow at ${viewport.width}x${viewport.height}: ${JSON.stringify(offenders)}`
      ).toEqual([]);
    });
  });
}

// ---- Desktop-only collapse behavior (mobile force-expands the band) ----
test.describe("collapse band @ desktop 1440x900", () => {
  test.use({ viewport: VIEWPORTS.desktop });

  test("band collapsed by default, expands on strip click and #download deep-link", async ({
    page,
  }) => {
    await page.goto(PAGE_URL);
    const section = page.locator("#download");
    const strip = page.locator(".download-strip");
    const body = page.locator(".download-body");
    const btn = page.locator("#download-primary");
    const bodyHeight = () => body.evaluate((el) => el.getBoundingClientRect().height);

    await expect(strip).toBeVisible();
    await expect(section).not.toHaveClass(/is-open/);
    expect(await bodyHeight()).toBe(0);

    await strip.click();
    await expect(section).toHaveClass(/is-open/);
    await expect(strip).toBeHidden();
    await expect(btn).toBeVisible();
    // grid-template-rows 0fr→1fr transition (~0.55s); poll until the band has
    // settled past its collapsed height instead of sampling a mid-transition frame.
    await expect.poll(bodyHeight).toBeGreaterThan(100);

    await page.locator("[data-download-collapse]").click();
    await expect(section).not.toHaveClass(/is-open/);
    await expect.poll(bodyHeight).toBe(0);

    // deep-link expands
    await page.goto(PAGE_URL + "#download");
    await expect(section).toHaveClass(/is-open/);
  });
});

// ---- Mobile-only behavior ----
test.describe("mobile-only behavior @ 390x844", () => {
  test.use({ viewport: VIEWPORTS.mobile });

  test("mobile nav drawer opens and closes on anchor click", async ({ page }) => {
    await page.goto(PAGE_URL);
    const toggle = page.locator("[data-nav-toggle]");
    const drawer = page.locator("[data-mobile-nav]");
    await expect(toggle).toBeVisible();
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
    await expect(drawer).toBeHidden();
    await toggle.click();
    await expect(toggle).toHaveAttribute("aria-expanded", "true");
    await expect(drawer).toBeVisible();
    await drawer.locator('a[href="#loop"]').click();
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
    await expect(drawer).toBeHidden();
  });

  test("page height stays within the mobile length budget", async ({ page }) => {
    await page.goto(PAGE_URL);
    const height = await page.evaluate(() => document.documentElement.scrollHeight);
    expect(height).toBeLessThan(15600);
  });
});

// ---- FAQ deep-link ----
test.describe("faq deep-link @ desktop", () => {
  test.use({ viewport: VIEWPORTS.desktop });
  test("navigating to #faq-install opens that details", async ({ page }) => {
    await page.goto(PAGE_URL + "#faq-install");
    const target = page.locator("#faq-install");
    await expect(target).toHaveCount(1);
    await expect(target).toHaveAttribute("open", "");
  });
});

// -------------------------------------------------------------
// Screenshots: default + compile, desktop + mobile, settled.
// -------------------------------------------------------------
async function settle(page, activePanelId) {
  await page.evaluate(() => document.fonts.ready);
  const panel = page.locator(`#${activePanelId}`);
  await expect(panel).toBeVisible();
  await expect
    .poll(() =>
      page.evaluate(
        (id) => parseFloat(getComputedStyle(document.getElementById(id)).opacity || "0"),
        activePanelId
      )
    )
    .toBeGreaterThan(0.99);
  await page.evaluate(async () => {
    const hero = document.getElementById("hero");
    if (!hero || typeof hero.getAnimations !== "function") return;
    const finite = hero.getAnimations({ subtree: true }).filter((a) => {
      const timing = a.effect && a.effect.getTiming ? a.effect.getTiming() : null;
      return !timing || timing.iterations !== Infinity;
    });
    await Promise.all(finite.map((a) => a.finished.catch(() => undefined)));
  });
}

function assertFullPagePng(filePath, expectedWidth) {
  const stat = statSync(filePath);
  expect(stat.size).toBeGreaterThan(0);
  const buf = readFileSync(filePath);
  const sig = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];
  sig.forEach((b, i) => expect(buf[i]).toBe(b));
  expect(buf.readUInt32BE(16)).toBe(expectedWidth);
}

test.describe("review screenshots", () => {
  test.use({ reducedMotion: "reduce" });
  for (const [device, viewport] of Object.entries(VIEWPORTS)) {
    test(`captures ${device} default state`, async ({ page }) => {
      await page.setViewportSize(viewport);
      await page.goto(PAGE_URL);
      await settle(page, "demo-panel-write");
      const out = join(SCREENSHOT_DIR, `landing-default-${device}.png`);
      await page.screenshot({ path: out, fullPage: true });
      assertFullPagePng(out, viewport.width);
    });

    test(`captures ${device} compile state`, async ({ page }) => {
      await page.setViewportSize(viewport);
      await page.goto(PAGE_URL);
      await page.locator("#demo-tab-compile").click();
      await settle(page, "demo-panel-compile");
      const out = join(SCREENSHOT_DIR, `landing-compile-${device}.png`);
      await page.screenshot({ path: out, fullPage: true });
      assertFullPagePng(out, viewport.width);
    });
  }
});
