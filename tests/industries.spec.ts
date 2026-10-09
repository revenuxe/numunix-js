import { test, expect } from "@playwright/test";
import { industryLandings } from "../src/content/industry-landings";
import { industries } from "../src/content/industries";
import { featureBySlug } from "../src/content/features";

for (const pageContent of industryLandings) {
  test(`${pageContent.slug}: page content, navigation, and mobile layout`, async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.emulateMedia({ reducedMotion: "reduce" });
    const response = await page.goto(`/industries/${pageContent.slug}`);
    expect(response?.status()).toBe(200);
    await expect(page.locator("h1")).toContainText(pageContent.headline);
    await expect(page.locator("#top canvas")).toHaveCount(1);
    await expect(page).toHaveTitle(/Software Development \| Numunix/);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      `https://www.numunix.com/industries/${pageContent.slug}`,
    );
    await expect(page.locator("#capabilities article")).toHaveCount(6);
    await expect(page.getByRole("button", { name: "Submit enquiry" })).toBeEnabled();
    await page.getByRole("link", { name: "DISCUSS YOUR PROJECT" }).click();
    await expect(page.locator("#enquiry form")).toBeInViewport();
    await page.locator("#faq summary").first().click();
    await expect(page.locator("#faq details").first()).toHaveAttribute("open", "");
    for (const link of await page.locator('a[href^="/features/"]').all()) {
      const slug = (await link.getAttribute("href"))!.split("/").at(-1)!;
      expect(featureBySlug(slug)).toBeDefined();
    }
    for (const width of [390, 320]) {
      await page.setViewportSize({ width, height: 844 });
      await expect
        .poll(() => page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth))
        .toBe(true);
    }
    expect(errors).toEqual([]);
  });
}

test("homepage industry cards open their respective pages", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  for (const industry of industries) {
    await expect(
      page
        .locator("#industries")
        .getByRole("link", { name: `Explore ${industry.name}`, exact: true })
        .first(),
    ).toHaveAttribute("href", `/industries/${industry.slug}`);
  }
  await page
    .locator("#industries")
    .getByRole("link", { name: "Explore Insurance", exact: true })
    .first()
    .click();
  await expect(page).toHaveURL(/\/industries\/insurance$/);
  await expect(page.locator("h1")).toContainText("More clarity in the claim.");
});

test("landing page desktop and mobile visual previews", async ({ page }, testInfo) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/industries/banking-financial-services");
  await expect(page.getByRole("button", { name: "Submit enquiry" })).toBeEnabled();
  await expect(page.locator("h1")).toBeVisible();
  await expect(page.locator("h1").locator("..")).toHaveCSS("opacity", "1");
  await page.screenshot({ path: testInfo.outputPath("banking-desktop.png") });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/industries/travel-hospitality");
  await expect(page.getByRole("button", { name: "Submit enquiry" })).toBeEnabled();
  await expect(page.locator("h1")).toBeVisible();
  await expect(page.locator("h1").locator("..")).toHaveCSS("opacity", "1");
  await page.screenshot({ path: testInfo.outputPath("travel-mobile.png"), fullPage: true });
  await page.locator("#capabilities").scrollIntoViewIfNeeded();
  await page.screenshot({ path: testInfo.outputPath("travel-capabilities.png") });
});

test("section navigation arrows reveal hidden links and disappear when all links fit", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/industries/insurance");
  const nav = page.getByRole("navigation", { name: "On this page", exact: true });
  const next = nav.getByRole("button", { name: "Scroll section links right" });
  const previous = nav.getByRole("button", { name: "Scroll section links left" });
  await expect(next).toBeVisible();
  await expect(previous).toHaveCount(0);
  await next.click();
  await expect(previous).toBeVisible();
  for (let i = 0; i < 5 && (await next.count()); i++) await next.click();
  await expect(next).toHaveCount(0);
  await expect(nav.getByRole("link", { name: "Start a conversation" })).toBeInViewport();
  await previous.click();
  await expect(next).toBeVisible();
  await page.setViewportSize({ width: 1440, height: 1000 });
  await expect(next).toHaveCount(0);
  await expect(previous).toHaveCount(0);
});

test("unknown industry displays the not-found page", async ({ page }) => {
  await page.goto("/industries/unknown-industry");
  await expect(page.getByRole("heading", { name: "Page not found", exact: true })).toBeVisible();
});
