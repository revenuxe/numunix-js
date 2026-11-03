import { test, expect } from "@playwright/test";
import { REFRIGERATOR_BRANDS } from "../src/content/refrigerator-brands";
import { FRIDGE_SEARCH_COPY } from "../src/content/fridge-repair-details";

for (const brand of REFRIGERATOR_BRANDS) {
  test(`${brand.name} fridge page uses the shared design with correct content and booking`, async ({ page }) => {
    const path = `/appliances/repairs/refrigerator-repair/${brand.name.toLowerCase()}`;
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/appliances/repairs/refrigerator-repair");
    await page.getByRole("link", { name: `Request ${brand.name} refrigerator repair` }).click();
    await expect(page).toHaveURL(new RegExp(`${path}$`));
    await expect(page).toHaveTitle(`${brand.name} Fridge Repair in Bangalore | Numunix`);
    await expect(page.locator("h1")).toHaveAccessibleName(`${brand.name} Fridge Repair in Bangalore`);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", `https://www.numunix.com${path}`);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", FRIDGE_SEARCH_COPY[brand.name.toLowerCase()]!.description);
    await expect(page.getByRole("button", { name: "Submit enquiry" })).toBeEnabled();
    const logo = page.locator('section[aria-labelledby="callback-title"] img');
    await expect(logo).toHaveAttribute("src", `/brands/refrigerators/${brand.file}`);
    await expect(logo).toHaveJSProperty("complete", true);
    expect(await logo.evaluate((image: HTMLImageElement) => image.naturalWidth)).toBeGreaterThan(0);
    await expect(page.locator('input[name="brand"]')).toHaveValue(brand.name);
    await expect(page.locator("#contact-service")).toHaveValue("Refrigerator Repair");
    await expect(page.locator("#contact-description")).toHaveValue(new RegExp(`^${brand.name} fridge repair\n`));
    await expect(page.locator("main")).not.toContainText("washing machine");
    await expect(page.locator("main")).not.toContainText("spin functions");
    for (const id of ["brand-assessment-title", "fridge-type-title", "fridge-parts-title", "repair-decision-title", "brand-aftercare-title"]) {
      await expect(page.locator(`#${id}`)).toBeVisible();
    }
    const cta = page.locator('section[aria-labelledby="brand-repair-cta-title"]');
    await expect(cta.locator('a[href^="tel:"]')).toHaveCount(0);
    const whatsapp = await cta.getByRole("link", { name: "Share on WhatsApp" }).getAttribute("href");
    expect(new URL(whatsapp!).searchParams.get("text")).toContain(`${brand.name} fridge repair`);
    await cta.getByRole("link", { name: `Request ${brand.name} repair` }).click();
    await expect(page).toHaveURL(/#enquiry$/);
    await expect(page.locator('input[name="brand"]')).toHaveValue(brand.name);
    for (const width of [320, 390, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
      const callbackHeading = page.locator("#callback-title");
      await expect(callbackHeading).toHaveCSS("white-space", "nowrap");
      expect(await callbackHeading.evaluate(element => element.scrollWidth <= element.clientWidth)).toBe(true);
    }
    await expect(page.getByRole("link", { name: "Book fridge assessment" })).toHaveAttribute("href", "#enquiry");
    await expect(page.getByRole("link", { name: "All fridge repairs" })).toHaveAttribute("href", "/appliances/repairs/refrigerator-repair");
    if (brand.name === "Bosch") {
      await page.setViewportSize({ width: 390, height: 844 });
      await page.locator("#top").screenshot({ path: "test-results/bosch-fridge-hero-mobile.png" });
    }
  });
}

test("unregistered fridge brand combinations stay unavailable", async ({ request }) => {
  for (const path of ["/electronic/repairs/refrigerator-repair/bosch", "/appliances/repairs/refrigerator-repair/siemens", "/appliances/repairs/ac-repair/croma"]) {
    expect((await request.get(path)).status()).toBe(404);
  }
});


test("fridge pages emit matching service graphs and remain indexable", async ({ request }) => {
  for (const brand of REFRIGERATOR_BRANDS) {
    const path = '/appliances/repairs/refrigerator-repair/' + brand.name.toLowerCase();
    const response = await request.get(path);
    expect(response.status()).toBe(200);
    const html = await response.text();
    expect(html).not.toMatch(/name="robots"[^>]*content="[^"]*noindex/);
    const scripts = [...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)];
    const graph = scripts.flatMap(match => JSON.parse(match[1]!)["@graph"] ?? []);
    const webpage = graph.find(node => node["@id"] === 'https://www.numunix.com' + path + '#webpage');
    const service = webpage.mainEntity.find((node: Record<string, unknown>) => node["@type"] === "Service");
    expect(service.url).toBe('https://www.numunix.com' + path);
    expect(service.provider).toEqual({ "@id": "https://www.numunix.com/#organization" });
    expect(service).not.toHaveProperty("offers");
    expect(service).not.toHaveProperty("aggregateRating");
    const breadcrumbs = graph.find(node => node["@type"] === "BreadcrumbList");
    expect(breadcrumbs.itemListElement.at(-2).item).toBe("https://www.numunix.com/appliances/repairs/refrigerator-repair");
  }
});
