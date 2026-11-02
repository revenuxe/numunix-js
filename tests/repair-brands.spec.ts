import { test, expect } from "@playwright/test";

test("brand search follows the repair service and clears a previous choice", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/appliances/repairs/washing-machine-repair");
  const brand = page.getByRole("combobox", { name: /Brand/ });
  await brand.click();
  await page.getByRole("combobox", { name: "Search brands" }).fill("LG");
  await page.getByRole("option", { name: "LG", exact: true }).click();
  await expect(brand).toHaveText("LG");
  await expect(page.locator('input[name="brand"]')).toHaveValue("LG");
  await page.locator("#contact-service").selectOption("AC Service & Repair");
  await expect(brand).toHaveText("Select a brand");
  await expect(page.locator('input[name="brand"]')).toHaveValue("");
  await brand.click();
  await page.getByRole("combobox", { name: "Search brands" }).fill("Daikin");
  await page.getByRole("option", { name: "Daikin", exact: true }).click();
  await expect(page.locator('input[name="brand"]')).toHaveValue("Daikin");
  await page.goto("/electronic/repairs/mobile-repair");
  await brand.click();
  await page.getByRole("combobox", { name: "Search brands" }).fill("Apple");
  await page.getByRole("option", { name: "Apple", exact: true }).click();
  await expect(page.locator('input[name="brand"]')).toHaveValue("Apple");
});
