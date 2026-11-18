import { test, expect } from "@playwright/test";

const parent = "/appliances/repairs/washing-machine-repair";
const variants = [
  { slug: "front-load-washing-machine-repair", title: "Front-Load Washing Machine Repair", type: "Front-load", fault: "Door stays locked after a cycle" },
  { slug: "top-load-washing-machine-repair", title: "Top-Load Washing Machine Repair", type: "Top-load", fault: "Water enters but washing does not start" },
];

test("washer type cards link to detailed pages and expose corner arrows", async ({ page }) => {
  await page.goto(parent);
  for (const variant of variants) {
    const card = page.getByRole("link", { name: new RegExp(`${variant.type} washing machines`, "i") });
    await expect(card).toHaveAttribute("href", `/appliances/repairs/${variant.slug}`);
    await expect(card.locator("svg")).toBeVisible();
    await card.click();
    await expect(page.locator("h1")).toContainText(variant.title);
    await page.goto(parent);
  }
});

for (const variant of variants) {
  test(`${variant.type} page keeps washer sections, SEO and booking context`, async ({ page, request }) => {
    const path = `/appliances/repairs/${variant.slug}`;
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(path);
    await expect(page).toHaveTitle(`${variant.title} in Bangalore | Numunix`);
    await expect(page.locator("h1")).toContainText(variant.title);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", `https://www.numunix.com${path}`);
    await expect(page.locator("#callback-title")).toBeVisible();
    await expect(page.locator("#brands a")).toHaveCount(9);
    await expect(page.locator("#assessment article")).toHaveCount(6);
    await expect(page.getByRole("heading", { name: variant.fault })).toBeVisible();
    for (const id of ["washer-type-scope-title", "washer-cost-title", "washer-replace-title", "washer-aftercare-title", "washer-final-cta"]) await expect(page.locator(`#${id}`)).toBeVisible();
    await expect(page.locator("#contact-service")).toHaveValue("Washing Machine Repair");
    await expect(page.locator("#contact-description")).toHaveValue(new RegExp(`Machine type: ${variant.type}`));
    await page.locator("#contact-brand").click();
    await expect(page.getByRole("option", { name: "LG", exact: true })).toBeVisible();
    await page.getByRole("option", { name: "LG", exact: true }).click();
    await expect(page.locator('input[name="brand"]')).toHaveValue("LG");
    const whatsapp = page.locator('section[aria-labelledby="washer-final-cta"]').getByRole("link", { name: "Share on WhatsApp" });
    const url = new URL((await whatsapp.getAttribute("href"))!);
    expect(url.pathname).toBe("/919886285028");
    expect(url.searchParams.get("text")).toContain(variant.title.toLowerCase());
    await expect(page.locator('#top a[href^="tel:"], section[aria-labelledby="washer-final-cta"] a[href^="tel:"]')).toHaveCount(0);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    await page.setViewportSize({ width: 1440, height: 900 });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    const response = await request.get(path);
    expect(response.status()).toBe(200);
    const html = await response.text();
    expect(html).toContain(variant.fault);
    expect(html).toContain(`${path}#service`);
    expect(html).toContain(`${path}#breadcrumbs`);
    const sitemap = await request.get("/sitemap.xml");
    expect(await sitemap.text()).toContain(`https://www.numunix.com${path}`);
    expect((await request.get(`/electronic/repairs/${variant.slug}`)).status()).toBe(404);
    expect((await request.get(`${path}/lg`)).status()).toBe(404);
  });
}
