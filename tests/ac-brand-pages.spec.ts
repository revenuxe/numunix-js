import { test, expect } from "@playwright/test";
import { AC_BRANDS } from "../src/content/ac-brands";

for (const brand of AC_BRANDS) {
  test(`${brand.name} AC page has the correct heading, logo, content and booking`, async ({ page }) => {
    const slug = brand.file.replace(/\.[^.]+$/, "");
    const path = `/appliances/repairs/ac-repair/${slug}`;
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/appliances/repairs/ac-repair");
    await page.getByRole("link", { name: `Request ${brand.name} AC repair` }).click();
    await expect(page).toHaveURL(new RegExp(`${path}$`));
    await expect(page).toHaveTitle(`${brand.name} AC Repair in Bangalore | Numunix`);
    await expect(page.locator("h1")).toHaveAccessibleName(`${brand.name} AC Repair in Bangalore`);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", `https://www.numunix.com${path}`);
    await expect(page.getByRole("button", { name: "Submit enquiry" })).toBeEnabled();
    const logo = page.locator('section[aria-labelledby="callback-title"] img');
    await expect(logo).toHaveAttribute("src", `/brands/air-conditioners/${brand.file}`);
    await expect(logo).toHaveJSProperty("complete", true);
    expect(await logo.evaluate((image: HTMLImageElement) => image.naturalWidth)).toBeGreaterThan(0);
    await expect(page.locator('input[name="brand"]')).toHaveValue(brand.name);
    await expect(page.locator("#contact-service")).toHaveValue("AC Service & Repair");
    await expect(page.locator("#contact-description")).toHaveValue(new RegExp(`^${brand.name} AC repair\n`));
    await expect(page.locator("main")).not.toContainText("washing machine");
    await expect(page.locator("main")).not.toContainText("fridge");
    await expect(page.getByRole("link", { name: `Visit ${brand.name} official support` })).toHaveAttribute("href", /^https:\/\//);
    for (const id of ["brand-assessment-title", "repair-decision-title", "brand-aftercare-title"]) {
      await expect(page.locator(`#${id}`)).toBeVisible();
    }
    const cta = page.locator('section[aria-labelledby="brand-repair-cta-title"]');
    await expect(cta.locator('a[href^="tel:"]')).toHaveCount(0);
    const whatsapp = await cta.getByRole("link", { name: "Share on WhatsApp" }).getAttribute("href");
    expect(new URL(whatsapp!).searchParams.get("text")).toContain(`${brand.name} AC repair`);
    await cta.getByRole("link", { name: `Request ${brand.name} repair` }).click();
    await expect(page).toHaveURL(/#enquiry$/);
    await expect(page.locator('input[name="brand"]')).toHaveValue(brand.name);
    for (const width of [320, 390, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
      await expect(page.locator("#callback-title")).toHaveCSS("white-space", "nowrap");
    }
    await expect(page.getByRole("link", { name: "All AC repairs" })).toHaveAttribute("href", "/appliances/repairs/ac-repair");
  });
}

test("unsupported AC brand combinations return not found", async ({ request }) => {
  for (const path of ["/electronic/repairs/ac-repair/daikin", "/appliances/repairs/refrigerator-repair/bpl", "/appliances/repairs/ac-repair/unknown"]) {
    expect((await request.get(path)).status()).toBe(404);
  }
});
