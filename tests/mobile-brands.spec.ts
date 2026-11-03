import { test, expect } from "@playwright/test";
import { MOBILE_BRANDS } from "../src/content/mobile-brands";

test("mobile brand cards show all supplied images and link to detailed repair pages", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/electronic/repairs/mobile-repair");
  await expect(page.getByRole("button", { name: "Submit enquiry" })).toBeEnabled();
  await expect(page.locator("#mobile-brands-title")).toBeVisible();
  await expect(page.locator("#brands a")).toHaveCount(18);
  for (const brand of MOBILE_BRANDS) {
    const card = page.getByRole("link", { name: `Request ${brand.name} mobile repair` });
    await card.scrollIntoViewIfNeeded();
    const logo = card.getByRole("img");
    await expect(logo).toHaveAttribute("src", `/brands/mobiles/${brand.file}`);
    await expect(logo).toHaveJSProperty("complete", true);
    expect(await logo.evaluate((image: HTMLImageElement) => image.naturalWidth)).toBeGreaterThan(0);
    await expect(card).toHaveAttribute("href", `/electronic/repairs/mobile-repair/${brand.file.replace(/\.[^.]+$/, "")}`);
  }
  await page.locator("#brands").screenshot({ path: "test-results/mobile-brands-mobile.png" });
  for (const width of [320, 390, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  }
  await page.locator("#contact-service").selectOption("Laptop Repair");
  await expect(page.locator('input[name="brand"]')).toHaveValue("");
  await page.goto("/appliances/repairs/ac-repair");
  await expect(page.locator("#mobile-brands-title")).toHaveCount(0);
  await expect(page.locator("#brands a")).toHaveCount(12);
});
