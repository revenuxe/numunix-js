import { test, expect } from "@playwright/test";

for (const brand of ["Bosch", "Godrej", "Haier", "IFB", "LG", "Panasonic", "Samsung", "Siemens", "Whirlpool"]) {
  test(`${brand} editorial and repair CTA remain usable on a narrow mobile screen`, async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 800 });
    await page.goto(`/appliances/repairs/washing-machine-repair/${brand.toLowerCase()}`);
    await expect(page.getByRole("button", { name: "Submit enquiry" })).toBeEnabled();
    await expect(page.locator("#brand-assessment-title")).toBeVisible();
    await expect(page.locator("#repair-decision-title")).toBeVisible();
    await expect(page.locator("#brand-aftercare-title")).toBeVisible();
    const cta = page.getByRole("region", { name: `Your ${brand} washer stopped. Let’s plan the next step.` });
    await expect(cta.locator('a[href^="tel:"]')).toHaveCount(0);
    const whatsapp = cta.getByRole("link", { name: "Share on WhatsApp" });
    const href = await whatsapp.getAttribute("href");
    expect(new URL(href!).searchParams.get("text")).toContain(`${brand} washing machine repair`);
    await cta.getByRole("link", { name: `Request ${brand} repair` }).click();
    await expect(page).toHaveURL(/#enquiry$/);
    await expect(page.locator('input[name="brand"]')).toHaveValue(brand);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  });
}
