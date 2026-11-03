import { test, expect } from "@playwright/test";

test("washer service content, metadata and CTAs work on mobile", async ({ page, request }) => {
  const path = "/appliances/repairs/washing-machine-repair";
  await page.setViewportSize({ width: 320, height: 800 });
  await page.goto(path);
  await expect(page.getByRole("button", { name: "Submit enquiry" })).toBeEnabled();
  await expect(page).toHaveTitle("Washing Machine Repair in Bangalore | Numunix");
  await expect(page.locator("h1")).toContainText("Repair in Bangalore");
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", `https://www.numunix.com${path}`);
  await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", /drainage, spin, filling and leak problems/);
  for (const id of ["washer-types-title", "washer-doorstep-title", "washer-cost-title", "washer-replace-title", "washer-aftercare-title"]) {
    await expect(page.locator(`#${id}`)).toBeVisible();
  }
  await expect(page.locator("#assessment article")).toHaveCount(6);
  await expect(page.locator("#brands a")).toHaveCount(9);
  await page.getByText("Can I request doorstep washing machine repair?", { exact: true }).click();
  await expect(page.getByText(/Share your locality, appliance model and symptoms/)).toBeVisible();
  await expect(page.getByText(/storage recovery/)).toHaveCount(0);
  for (const id of ["washer-assessment-cta", "washer-final-cta"]) {
    const cta = page.locator(`section[aria-labelledby="${id}"]`);
    await expect(cta.locator('a[href^="tel:"]')).toHaveCount(0);
    const buttons = cta.getByRole("link");
    const first = await buttons.nth(0).boundingBox();
    const second = await buttons.nth(1).boundingBox();
    expect(Math.abs(first!.y - second!.y)).toBeLessThan(2);
    const href = await cta.getByRole("link", { name: "Share on WhatsApp" }).getAttribute("href");
    expect(new URL(href!).searchParams.get("text")).toContain("washing machine repair");
  }
  await page.locator('section[aria-labelledby="washer-final-cta"]').getByRole("link", { name: "Request assessment" }).click();
  await expect(page).toHaveURL(/#enquiry$/);
  await expect(page.locator("#contact-service")).toHaveValue("Washing Machine Repair");
  await expect(page.locator("#contact-description")).toHaveValue(/Bangalore locality:/);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  await page.setViewportSize({ width: 1440, height: 900 });
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  const response = await request.get(path);
  expect(response.status()).toBe(200);
  const html = await response.text();
  expect(html).toContain("What a useful assessment should establish");
  expect(html).toContain("#organization");
});

test("washer editorial stays scoped to washing machine repairs", async ({ page }) => {
  await page.goto("/appliances/repairs/ac-repair");
  await expect(page.getByRole("button", { name: "Submit enquiry" })).toBeEnabled();
  await expect(page.locator("#washer-types-title")).toHaveCount(0);
  await expect(page.locator("#washer-cost-title")).toHaveCount(0);
  await expect(page.locator("#contact-service")).toHaveValue("AC Service & Repair");
});
