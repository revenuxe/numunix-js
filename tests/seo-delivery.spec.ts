import { test, expect } from "@playwright/test";

test("indexing rules expose noindex and the canonical host redirect preserves queries", async ({
  request,
}) => {
  const robots = await request.get("/robots.txt");
  expect(await robots.text()).not.toMatch(/Disallow:\s*\/(admin|thank-you)/);
  for (const path of ["/admin/login", "/thank-you"]) {
    const response = await request.get(path);
    expect(response.headers()["x-robots-tag"]).toContain("noindex");
    expect(await response.text()).toMatch(/name="robots"[^>]*content="[^"]*noindex/);
  }
  const response = await request.get("/services?source=header", {
    headers: { host: "numunix.com" },
    maxRedirects: 0,
  });
  expect(response.status()).toBe(308);
  expect(response.headers()["location"]).toBe("https://www.numunix.com/services?source=header");
});

test("fonts and resized logos are delivered locally while headings remain fitted", async ({
  page,
}) => {
  const externalFonts: string[] = [];
  page.on("request", (request) => {
    if (/fonts\.(googleapis|gstatic)\.com/.test(request.url())) externalFonts.push(request.url());
  });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await expect(page.locator("h1")).toBeVisible();
  await page.evaluate(() => document.fonts.ready);
  expect(externalFonts).toEqual([]);
  const fonts = await page.evaluate(() =>
    performance
      .getEntriesByType("resource")
      .filter((entry) => entry.name.includes(".woff2"))
      .map((entry) => entry.name),
  );
  expect(fonts.length).toBeGreaterThan(0);
  expect(fonts.every((url) => new URL(url).origin === "http://127.0.0.1:4173")).toBe(true);
  const logo = page.getByRole("banner").getByAltText("Numunix");
  await expect(logo).toHaveAttribute("src", /\/_next\/image\?/);
  expect(
    await logo.evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth > 0),
  ).toBe(true);
  for (const width of [320, 390, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await expect(page.locator("h1")).toBeVisible();
    await expect
      .poll(() =>
        page.locator("h1").evaluate((heading) => heading.scrollWidth <= heading.clientWidth + 1),
      )
      .toBe(true);
  }
});

test("decorative canvas stops offscreen and responds to reduced-motion changes", async ({
  page,
}) => {
  await page.addInitScript(() => {
    (window as typeof window & { heroFrames: number }).heroFrames = 0;
    const clear = CanvasRenderingContext2D.prototype.clearRect;
    CanvasRenderingContext2D.prototype.clearRect = function (...args: Parameters<typeof clear>) {
      if (this.canvas.closest("section#top"))
        (window as typeof window & { heroFrames: number }).heroFrames++;
      return clear.apply(this, args);
    };
  });
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/electronic/repairs/mobile-repair");
  const frames = () =>
    page.evaluate(() => (window as typeof window & { heroFrames: number }).heroFrames);
  await expect.poll(frames).toBeGreaterThan(2);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.waitForTimeout(250);
  const still = await frames();
  await page.waitForTimeout(300);
  expect(await frames()).toBe(still);
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await expect.poll(frames).toBeGreaterThan(still);
  await page.locator("footer").scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);
  const offscreen = await frames();
  await page.waitForTimeout(300);
  expect(await frames()).toBe(offscreen);
});
