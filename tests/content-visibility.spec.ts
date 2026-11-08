import { test, expect } from "@playwright/test";

for (const path of ["/", "/contact", "/features/web-development"]) {
  for (const scenario of ["no JavaScript", "stalled observers"] as const) {
    test(`${path}: content remains readable with ${scenario}`, async ({ browser }) => {
      const context = await browser.newContext({
        javaScriptEnabled: scenario !== "no JavaScript",
        reducedMotion: 'reduce',
      });
      // These checks exercise local content, independently of third-party font delivery.
      await context.route('https://fonts.googleapis.com/**', route => route.abort());
      await context.route('https://fonts.gstatic.com/**', route => route.abort());
      if (scenario === "stalled observers") {
        await context.addInitScript(() => {
          window.IntersectionObserver = class {
            root = null;
            rootMargin = "0px";
            thresholds = [0];
            observe() {}
            unobserve() {}
            disconnect() {}
            takeRecords() { return []; }
          };
        });
      }
      const page = await context.newPage();
      try {
        const response = await page.goto(`http://127.0.0.1:4173${path}`, {waitUntil:'domcontentloaded'});
        expect(response?.status()).toBe(200);
        await expect(page.locator("h1").first()).toBeVisible();
        const sections = page.locator("[data-reveal]");
        expect(await sections.count()).toBeGreaterThan(0);
        for (const section of await sections.all()) {
          await expect(section).toHaveCSS("opacity", "1");
          await expect(section).toHaveCSS("visibility", "visible");
        }
        await page.setViewportSize({ width: 390, height: 844 });
        await page.reload({waitUntil:'domcontentloaded'});
        await expect(page.locator("h1").first()).toBeVisible();
        for (const section of await page.locator("[data-reveal]").all()) {
          await expect(section).toHaveCSS("opacity", "1");
        }
      } finally {
        await context.close();
      }
    });
  }
}
