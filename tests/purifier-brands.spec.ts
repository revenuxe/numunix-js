import { test, expect } from "@playwright/test";
import { PURIFIER_BRANDS } from "../src/content/purifier-brands";
import { PURIFIER_BRAND_PAGES } from "../src/content/purifier-brand-pages";

test("purifier brand cards show logos, arrows and dedicated destinations", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/appliances/repairs/water-purifier-service");
  await expect(page.locator("#brands a")).toHaveCount(9);
  for (const brand of PURIFIER_BRANDS) {
    const card = page.getByRole("link", { name: `Explore ${brand.name} water purifier repair` });
    await expect(card).toHaveAttribute(
      "href",
      `/appliances/repairs/water-purifier-service/${brand.file.replace(/\.[^.]+$/, "")}`,
    );
    await expect(card.locator("svg")).toHaveCount(1);
    const image = card.getByRole("img");
    await image.scrollIntoViewIfNeeded();
    await expect(image).toHaveJSProperty("complete", true);
    expect(await image.evaluate((img: HTMLImageElement) => img.naturalWidth)).toBeGreaterThan(0);
  }
  await expect(page.locator("#brands a").first()).toHaveAccessibleName(
    "Explore Kent water purifier repair",
  );
  await page.locator("#brands").screenshot({ path: "test-results/purifier-brands-mobile.png" });
  await page.getByRole("link", { name: "Explore Kent water purifier repair" }).click();
  await expect(page).toHaveURL(/water-purifier-service\/kent$/);
});

test("all purifier brand pages retain purifier content, metadata and booking defaults", async ({
  page,
}) => {
  test.setTimeout(180000);
  for (const brand of PURIFIER_BRAND_PAGES) {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(brand.path);
    await expect(page).toHaveTitle(brand.title);
    await expect(page.locator("h1")).toHaveAccessibleName(
      `${brand.brand} Water Purifier Repair in Bangalore`,
    );
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      `https://www.numunix.com${brand.path}`,
    );
    await expect(page.locator("#contact-service")).toHaveValue("Water Purifier Service");
    await expect(page.locator('input[name="brand"]')).toHaveValue(brand.brand);
    await expect(page.locator("#contact-description")).toHaveValue(brand.enquiryDescription);
    await expect(page.getByRole("heading", { name: brand.purifierGuidance.subject })).toBeVisible();
    expect(
      (await page.locator("main h1, main h2, main h3, main p").allTextContents()).join(" "),
    ).not.toMatch(/washing machine|washer|wash cycle|spin functions|drum/i);
    const logo = page.locator('section[aria-labelledby="callback-title"] img');
    await expect(logo).toHaveAttribute(
      "src",
      `/brands/water-purifiers/${PURIFIER_BRANDS.find((item) => item.name === brand.brand)!.file}`,
    );
    await expect(logo).toHaveJSProperty("complete", true);
    const cta = page.locator('section[aria-labelledby="brand-repair-cta-title"]');
    expect(
      new URL(
        (await cta.getByRole("link", { name: "Share on WhatsApp" }).getAttribute("href"))!,
      ).searchParams.get("text"),
    ).toContain(`${brand.brand} water purifier repair`);
    await cta.getByRole("link", { name: `Request ${brand.brand} repair` }).click();
    await expect(page).toHaveURL(/#enquiry$/);
    await expect(page.locator('input[name="brand"]')).toHaveValue(brand.brand);
    await expect(page.getByRole("link", { name: "All water purifier repairs" })).toHaveAttribute(
      "href",
      "/appliances/repairs/water-purifier-service",
    );
    for (const width of [320, 390, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
        `${brand.brand} overflow at ${width}px`,
      ).toBe(true);
    }
  }
});

test("purifier routes emit correct schema and reject unsupported combinations", async ({
  request,
}) => {
  for (const brand of PURIFIER_BRAND_PAGES) {
    const response = await request.get(brand.path);
    expect(response.status()).toBe(200);
    const html = await response.text();
    expect(html).toContain("Independent " + brand.brand + " Water purifier repair");
    expect(html).toContain("https://www.numunix.com/appliances/repairs/water-purifier-service");
  }
  for (const path of [
    "/electronic/repairs/water-purifier-service/kent",
    "/appliances/repairs/ac-repair/kent",
    "/appliances/repairs/water-purifier-service/unknown",
    "/electronics/repairs/water-purifier-service/native",
  ])
    expect((await request.get(path)).status()).toBe(404);
});
