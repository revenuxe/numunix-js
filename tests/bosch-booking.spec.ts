import { test, expect } from "@playwright/test";

test("direct Bosch booking retains its defaults after category hydration", async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem("numunix-repair-category", "appliances"));
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/appliances/repairs/washing-machine-repair/bosch");
  await expect(page.getByRole("button", { name: "Submit enquiry" })).toBeEnabled();
  await expect(page.locator('input[name="brand"]')).toHaveValue("Bosch");
  await expect(page.locator("#contact-service")).toHaveValue("Washing Machine Repair");
  await expect(page.locator("#contact-description")).toHaveValue("Bosch washing machine repair\nE-Nr / Model: \nFD: \nIssue / Error code: ");
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  await page.locator("#contact-service").selectOption("Refrigerator Repair");
  await expect(page.locator('input[name="brand"]')).toHaveValue("");
});
