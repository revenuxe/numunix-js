import { test, expect } from "@playwright/test";

for (const [brand, slug] of [["Haier", "haier"], ["IFB", "ifb"], ["LG", "lg"], ["Panasonic", "panasonic"], ["Samsung", "samsung"], ["Siemens", "siemens"], ["Whirlpool", "whirlpool"]]) {
  test(`${brand} card opens a complete brand page with correct enquiry context`, async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/appliances/repairs/washing-machine-repair");
    await page.getByRole("link", { name: `Request ${brand} washing machine repair` }).click();
    await expect(page).toHaveURL(new RegExp(`/washing-machine-repair/${slug}$`));
    await expect(page).toHaveTitle(`${brand} Washing Machine Repair in Bangalore | Numunix`);
    await expect(page.locator("h1")).toContainText(`${brand} Washing Machine`);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", `https://www.numunix.com/appliances/repairs/washing-machine-repair/${slug}`);
    await expect(page.getByRole("button", { name: "Submit enquiry" })).toBeEnabled();
    await expect(page.locator('input[name="brand"]')).toHaveValue(brand);
    await expect(page.locator("#contact-service")).toHaveValue("Washing Machine Repair");
    await expect(page.locator("#contact-description")).toHaveValue(new RegExp(`^${brand} washing machine repair\n`));
    const logo = page.locator('section[aria-labelledby="callback-title"] img');
    await expect(logo).toHaveAttribute("src", `/brands/washing-machines/${slug}.webp`);
    await expect(logo).toHaveJSProperty("complete", true);
    expect(await logo.evaluate((image: HTMLImageElement) => image.naturalWidth)).toBeGreaterThan(0);
    await expect(page.getByRole("link", { name: `Visit ${brand} official support` })).toHaveAttribute("href", /^https:\/\//);
    await expect(page.locator("main")).not.toContainText("Godrej");
    await expect(page.locator("main")).not.toContainText("E:18");
    for (const width of [320, 390, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    }
  });
}
