import { test, expect } from "@playwright/test";

test("brand search follows the repair service and clears a previous choice", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/appliances/repairs/washing-machine-repair");
  await expect(page.getByRole("button", { name: "Submit enquiry" })).toBeEnabled();
  const brandCards = page.locator("#brands a");
  await expect(brandCards).toHaveCount(10);
  await expect(page.getByText("Other brands", { exact: true })).toHaveCSS("white-space", "nowrap");
  for (const logo of await page.locator("#brands img").all()) {
    await expect(logo).toHaveJSProperty("complete", true);
    expect(await logo.evaluate((image: HTMLImageElement) => image.naturalWidth)).toBeGreaterThan(0);
  }
  await page.setViewportSize({ width: 1440, height: 900 });
  const callbackConsent = page.locator('section[aria-labelledby="callback-title"] form > p.text-xs');
  await expect(callbackConsent).toHaveCSS("white-space", "nowrap");
  expect(await callbackConsent.evaluate((element) => element.scrollWidth <= element.clientWidth)).toBe(true);
  await page.getByRole("link", { name: "Request LG washing machine repair" }).click();
  await expect(page.locator('input[name="brand"]')).toHaveValue("LG");
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
  await expect(page.locator("#brands")).toHaveCount(0);
  await brand.click();
  await page.getByRole("combobox", { name: "Search brands" }).fill("Apple");
  await page.getByRole("option", { name: "Apple", exact: true }).click();
  await expect(page.locator('input[name="brand"]')).toHaveValue("Apple");
  await page.goto("/appliances/repairs/washing-machine-repair");
  await page.getByRole("link", { name: "Request Bosch washing machine repair" }).click();
  await expect(page).toHaveURL(/\/appliances\/repairs\/washing-machine-repair\/bosch$/);
  await expect(page.locator('input[name="brand"]')).toHaveValue("Bosch");
  await expect(page.locator("#contact-service")).toHaveValue("Washing Machine Repair");
});
