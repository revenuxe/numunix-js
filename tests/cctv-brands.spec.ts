import { test, expect } from "@playwright/test";
import { CCTV_BRANDS } from "../src/content/cctv-brands";

test("CCTV brand cards display supplied logos and preselect the matching enquiry brand", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/electronic/repairs/cctv-service");
  await expect(page.getByRole("button", { name: "Submit enquiry" })).toBeEnabled();
  await expect(page.locator("#cctv-brands-title")).toBeVisible();
  await expect(page.locator("#brands a")).toHaveCount(12);
  for (const brand of CCTV_BRANDS) {
    const card = page.getByRole("link", { name: `Request ${brand.name} CCTV repair` });
    await card.scrollIntoViewIfNeeded();
    const logo = card.getByRole("img");
    await expect(logo).toHaveAttribute("src", `/brands/cctv/${brand.file}`);
    await expect(logo).toHaveJSProperty("complete", true);
    expect(await logo.evaluate((image: HTMLImageElement) => image.naturalWidth)).toBeGreaterThan(0);
    await card.click();
    await expect(page.locator('input[name="brand"]')).toHaveValue(brand.name);
    await expect(page.locator("#contact-service")).toHaveValue("CCTV Installation & Repair");
  }
  await page.locator("#brands").screenshot({ path: "test-results/cctv-brands-mobile.png" });
  for (const width of [320, 390, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
    ).toBe(true);
  }
  await page.locator("#contact-service").selectOption("Mobile Repair");
  await expect(page.locator('input[name="brand"]')).toHaveValue("");
  await page.goto("/electronic/repairs/mobile-repair");
  await expect(page.locator("#cctv-brands-title")).toHaveCount(0);
  await expect(page.locator("#brands a")).toHaveCount(18);
});
