import { test, expect } from "@playwright/test";
import { AC_BRANDS } from "../src/content/ac-brands";

test("AC brand logos render and link to dedicated repair pages", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/appliances/repairs/ac-repair");
  await expect(page.getByRole("button", { name: "Submit enquiry" })).toBeEnabled();
  await expect(page.locator("#ac-brands-title")).toBeVisible();
  await expect(page.locator("#brands a")).toHaveCount(12);
  for (const brand of AC_BRANDS) {
    const card = page.getByRole("link", { name: `Request ${brand.name} AC repair` });
    await card.scrollIntoViewIfNeeded();
    const logo = card.getByRole("img");
    await expect(logo).toHaveJSProperty("complete", true);
    expect(await logo.evaluate((image: HTMLImageElement) => image.naturalWidth)).toBeGreaterThan(0);
    await expect(card).toHaveAttribute("href", `/appliances/repairs/ac-repair/${brand.file.replace(/\.[^.]+$/, "")}`);
  }
  await page.locator("#brands").screenshot({ path: "test-results/ac-brands-mobile.png" });
  for (const width of [320, 390, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  }
  await page.locator("#contact-service").selectOption("Refrigerator Repair");
  await expect(page.locator('input[name="brand"]')).toHaveValue("");
  await page.goto("/appliances/repairs/refrigerator-repair");
  await expect(page.locator("#ac-brands-title")).toHaveCount(0);
  await expect(page.locator("#brands a")).toHaveCount(12);
});
