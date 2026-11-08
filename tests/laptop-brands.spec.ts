import { test, expect } from "@playwright/test";
import { LAPTOP_BRANDS } from "../src/content/laptop-brands";
import { LAPTOP_BRAND_PAGES, laptopBrandPage } from "../src/content/laptop-brand-pages";
import { curateBrandRepair } from "../src/content/curated-brand-repair";

test("laptop cards load supplied logos and link to dedicated pages", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/electronic/repairs/laptop-repair");
  await expect(page.locator("#laptop-brands-title")).toBeVisible();
  await expect(page.locator("#brands a")).toHaveCount(12);
  for (const brand of LAPTOP_BRANDS) {
    const card = page.getByRole("link", { name: `Request ${brand.name} laptop repair` });
    await card.scrollIntoViewIfNeeded();
    await expect(card).toHaveAttribute(
      "href",
      `/electronic/repairs/laptop-repair/${brand.file.replace(/\.[^.]+$/, "")}`,
    );
    const logo = card.getByRole("img");
    await expect(logo).toHaveJSProperty("complete", true);
    expect(await logo.evaluate((img: HTMLImageElement) => img.naturalWidth)).toBeGreaterThan(0);
  }
  await page.locator("#brands").screenshot({ path: "test-results/laptop-brands-mobile.png" });
  await page.getByRole("link", { name: "Request Xiaomi laptop repair" }).click();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    /Xiaomi Laptop\s*Repair in Bangalore/,
  );
});

test("all laptop landing pages have metadata, relevant content and booking context", async ({
  page,
}) => {
  test.setTimeout(180000);
  await page.setViewportSize({ width: 390, height: 844 });
  for (const brand of LAPTOP_BRAND_PAGES) {
    await page.goto(brand.path);
    await expect(page).toHaveTitle(brand.title);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      new RegExp(`${brand.brand} Laptop\\s*Repair in Bangalore`),
    );
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      `https://www.numunix.com${brand.path}`,
    );
    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
      "content",
      curateBrandRepair(brand).description,
    );
    await expect(page.locator("#contact-service")).toHaveValue("Laptop Repair");
    await expect(page.locator('input[name="brand"]')).toHaveValue(brand.brand);
    await expect(page.getByRole("heading", { name: brand.laptopGuidance.subject })).toBeVisible();
    expect(await page.locator("main").innerText()).not.toMatch(
      /washing machine|washer|wash cycle|phone model/i,
    );
    const whatsapp = page.locator('main a[href*="wa.me"]').first();
    const url = new URL((await whatsapp.getAttribute("href"))!);
    expect(url.searchParams.get("text")).toContain(`${brand.brand} laptop repair`);
    expect(url.searchParams.get("text")).toContain("\nModel:\nIssue:");
    for (const width of [320, 390, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
        true,
      );
    }
    await page.setViewportSize({ width: 390, height: 844 });
  }
  await page.goto("/electronic/repairs/laptop-repair/hp");
  await page.screenshot({ path: "test-results/hp-laptop-mobile.png", fullPage: true });
});

test("unsupported laptop combinations do not resolve", () => {
  expect(laptopBrandPage("appliances", "laptop-repair", "hp")).toBeUndefined();
  expect(laptopBrandPage("electronic", "mobile-repair", "hp")).toBeUndefined();
  expect(laptopBrandPage("electronic", "laptop-repair", "fabricated-brand")).toBeUndefined();
  expect(LAPTOP_BRAND_PAGES).toHaveLength(12);
});

test("laptop server responses emit service schema and reject invalid routes", async ({
  request,
}) => {
  for (const path of [
    "/appliances/repairs/laptop-repair/hp",
    "/electronic/repairs/laptop-repair/unknown",
    "/electronics/repairs/laptop-repair/hp",
  ]) {
    expect((await request.get(path)).status()).toBe(404);
  }
  for (const brand of LAPTOP_BRAND_PAGES) {
    const response = await request.get(brand.path);
    expect(response.status()).toBe(200);
    const html = await response.text();
    const graphs = [
      ...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g),
    ].flatMap((match) => JSON.parse(match[1])["@graph"] ?? []);
    const webpage = graphs.find(
      (node) => node["@id"] === `https://www.numunix.com${brand.path}#webpage`,
    );
    expect(webpage.mainEntity[0].name).toBe(`Independent ${brand.brand} Laptop repair`);
    expect(webpage.mainEntity[0].provider).toEqual({
      "@id": "https://www.numunix.com/#organization",
    });
    const breadcrumbs = graphs.find((node) => node["@type"] === "BreadcrumbList");
    expect(breadcrumbs.itemListElement.at(-2).item).toBe(
      "https://www.numunix.com/electronic/repairs/laptop-repair",
    );
  }
});
