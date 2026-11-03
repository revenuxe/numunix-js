import { test, expect } from "@playwright/test";
import { MOBILE_BRANDS } from "../src/content/mobile-brands";

for (const brand of MOBILE_BRANDS) {
  test(`${brand.name} mobile page has correct content, metadata and booking`, async ({ page }) => {
    const slug = brand.file.replace(/\.[^.]+$/, "");
    const path = `/electronic/repairs/mobile-repair/${slug}`;
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/electronic/repairs/mobile-repair");
    await page.getByRole("link", { name: `Request ${brand.name} mobile repair` }).click();
    await expect(page).toHaveURL(new RegExp(`${path}$`));
    await expect(page).toHaveTitle(`${brand.name} Mobile Repair in Bangalore | Numunix`);
    await expect(page.locator("h1")).toHaveAccessibleName(
      `${brand.name} Mobile Repair in Bangalore`,
    );
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      `https://www.numunix.com${path}`,
    );
    await expect(page.getByRole("button", { name: "Submit enquiry" })).toBeEnabled();
    const logo = page.locator('section[aria-labelledby="callback-title"] img');
    await expect(logo).toHaveAttribute("src", `/brands/mobiles/${brand.file}`);
    await expect(logo).toHaveJSProperty("complete", true);
    expect(await logo.evaluate((image: HTMLImageElement) => image.naturalWidth)).toBeGreaterThan(0);
    await expect(page.locator('input[name="brand"]')).toHaveValue(brand.name);
    await expect(page.locator("#contact-service")).toHaveValue("Mobile Repair");
    expect(await page.locator("#contact-description").inputValue()).toContain(
      `${brand.name} mobile repair\n`,
    );
    for (const phrase of ["washing machine", "refrigerant", "outdoor unit"])
      await expect(page.locator("main")).not.toContainText(phrase);
    await expect(
      page.getByText("Will my data stay on the phone during repair?", { exact: true }),
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: "Before booking a mobile repair" }),
    ).toHaveAttribute("href", "/repair-guides/mobile-repair-before-you-book");
    const cta = page.locator('section[aria-labelledby="brand-repair-cta-title"]');
    await expect(cta.locator('a[href^="tel:"]')).toHaveCount(0);
    const whatsapp = await cta
      .getByRole("link", { name: "Share on WhatsApp" })
      .getAttribute("href");
    expect(new URL(whatsapp!).searchParams.get("text")).toContain(`${brand.name} mobile repair`);
    await cta.getByRole("link", { name: `Request ${brand.name} repair` }).click();
    await expect(page).toHaveURL(/#enquiry$/);
    await expect(page.locator('input[name="brand"]')).toHaveValue(brand.name);
    for (const width of [320, 390, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
      ).toBe(true);
      await expect(page.locator("#callback-title")).toHaveCSS("white-space", "nowrap");
    }
    await expect(page.getByRole("link", { name: "All mobile repairs" })).toHaveAttribute(
      "href",
      "/electronic/repairs/mobile-repair",
    );
    if (slug === "apple") {
      await page.setViewportSize({ width: 390, height: 844 });
      await page.locator("#top").screenshot({ path: "test-results/apple-mobile-hero.png" });
    }
  });
}

test("mobile routes reject unsupported combinations and emit correct breadcrumbs", async ({
  request,
}) => {
  for (const path of [
    "/appliances/repairs/mobile-repair/apple",
    "/electronic/repairs/tablet-repair/apple",
    "/electronic/repairs/mobile-repair/unknown",
    "/electronics/repairs/mobile-repair/apple",
  ]) {
    expect((await request.get(path)).status()).toBe(404);
  }
  const response = await request.get("/electronic/repairs/mobile-repair/apple");
  expect(response.status()).toBe(200);
  const html = await response.text();
  const scripts = [
    ...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g),
  ];
  const graph = scripts.flatMap((match) => JSON.parse(match[1]!)["@graph"] ?? []);
  const webpage = graph.find(
    (node) =>
      node["@id"] === "https://www.numunix.com/electronic/repairs/mobile-repair/apple#webpage",
  );
  expect(webpage.mainEntity[0].provider).toEqual({
    "@id": "https://www.numunix.com/#organization",
  });
  const breadcrumbs = graph.find((node) => node["@type"] === "BreadcrumbList");
  expect(breadcrumbs.itemListElement.at(-2).item).toBe(
    "https://www.numunix.com/electronic/repairs/mobile-repair",
  );
});

test("appliance brand pages retain their own subjects", async ({ page }) => {
  for (const [path, heading, service] of [
    [
      "washing-machine-repair/bosch",
      "Bosch Washing Machine Repair in Bangalore",
      "Washing Machine Repair",
    ],
    ["refrigerator-repair/lg", "LG Fridge Repair in Bangalore", "Refrigerator Repair"],
    ["ac-repair/daikin", "Daikin AC Repair in Bangalore", "AC Service & Repair"],
  ]) {
    await page.goto(`/appliances/repairs/${path}`);
    await expect(page.getByRole("button", { name: "Submit enquiry" })).toBeEnabled();
    await expect(page.locator("h1")).toHaveAccessibleName(heading!);
    await expect(page.locator("#contact-service")).toHaveValue(service!);
    await expect(
      page.getByText("Will my data stay on the phone during repair?", { exact: true }),
    ).toHaveCount(0);
  }
});
