import { test, expect } from "@playwright/test";

test("Godrej card opens its own mobile repair page and booking defaults", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/appliances/repairs/washing-machine-repair");
  await expect(page.locator("#brands a")).toHaveCount(9);
  await expect(page.getByText(/Don.t see your brand/)).toHaveCount(0);
  await page.getByRole("link", { name: "Request Godrej washing machine repair" }).click();
  await expect(page).toHaveURL(/\/washing-machine-repair\/godrej$/);
  await expect(page.locator("h1")).toContainText("Godrej Washing Machine");
  await expect(page.locator("h1")).toContainText("Repair in Bangalore");
  await expect(page.getByRole("button", { name: "Submit enquiry" })).toBeEnabled();
  await expect(page.locator('input[name="brand"]')).toHaveValue("Godrej");
  await expect(page.locator("#contact-service")).toHaveValue("Washing Machine Repair");
  await expect(page.locator("#contact-description")).toHaveValue(/Godrej washing machine repair\nModel/);
  await expect(page.locator('section[aria-labelledby="callback-title"] img')).toHaveAttribute("src", "/brands/washing-machines/godrej.webp");
  await expect(page.getByRole("link", { name: "Find your Godrej user manual" })).toBeVisible();
  await expect(page.getByText("An E:18 message?", { exact: true })).toHaveCount(0);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
});

test("unsupported brand and service combinations return not found", async ({ request }) => {
  for (const path of ["/appliances/repairs/refrigerator-repair/godrej", "/electronic/repairs/washing-machine-repair/godrej", "/appliances/repairs/washing-machine-repair/unknown"]) {
    const response = await request.get(path);
    expect(response.status()).toBe(404);
  }
});
