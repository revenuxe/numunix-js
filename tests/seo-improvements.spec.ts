import { test, expect } from "@playwright/test";
import { REPAIR_PAGES, repairPageHref } from "../src/content/repair-services";
import { repairHubContent } from "../src/content/repair-hub-content";
import { guideRepairLinks, GUIDE_REPAIR_SLUGS } from "../src/content/repair-guide-links";
import { REPAIR_AUDIENCE_PATHS } from "../src/content/repair-audiences";
import { CONTACT } from "../src/content/site";

test("every service has its own scope, city heading, canonical and usable booking", async ({
  page,
}) => {
  test.setTimeout(180000);
  await page.setViewportSize({ width: 320, height: 900 });
  for (const service of REPAIR_PAGES) {
    await page.goto(repairPageHref(service));
    await expect(page.locator("h1")).toHaveAccessibleName(`${service.name} in Bangalore`);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      `https://www.numunix.com${repairPageHref(service)}`,
    );
    await expect(page.locator("#contact-service")).toHaveValue(service.name);
    const content = repairHubContent(service);
    if (content) {
      await expect(page.locator("#assessment article")).toHaveCount(content.faults.length);
      await expect(page.locator("#service-scope h3")).toHaveText(
        content.scope.map((item) => item.title),
      );
      await expect(page.locator('meta[name="description"]')).toHaveAttribute(
        "content",
        content.description,
      );
      await page.getByText(content.faqs[0]![0], { exact: true }).click();
      await expect(page.locator("details[open]")).toContainText(content.faqs[0]![1]);
    }
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
      service.slug,
    ).toBe(true);
    await expect(page.locator('#top a[href^="tel:"]')).toHaveCount(0);
  }
});

test("all five guides link directly to their matching repair services", async ({ page }) => {
  for (const slug of Object.keys(GUIDE_REPAIR_SLUGS)) {
    await page.goto(`/repair-guides/${slug}`);
    const nav = page.getByRole("navigation", { name: "Repair services related to this guide" });
    for (const service of guideRepairLinks(slug)) {
      await expect(
        nav.getByRole("link", { name: `${service.name} in Bangalore`, exact: true }),
      ).toHaveAttribute("href", service.path);
    }
  }
});

test("audience headings and planning are unique, including non-medical limits", async ({
  page,
}) => {
  const headings = new Set<string>();
  const scopes = new Set<string>();
  await page.setViewportSize({ width: 320, height: 900 });
  for (const slug of REPAIR_AUDIENCE_PATHS) {
    await page.goto(`/who-we-serve/${slug}`);
    await expect(page.locator("h1")).toBeVisible();
    const heading = await page.locator("h1").innerText();
    expect(headings.has(heading)).toBe(false);
    headings.add(heading);
    const body = await page.locator("main > section").nth(1).innerText();
    expect(scopes.has(body)).toBe(false);
    scopes.add(body);
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
      slug,
    ).toBe(true);
    if (slug === "clinics")
      await expect(page.locator("main")).toContainText(
        "Medical and laboratory equipment are outside this scope",
      );
  }
});

test("homepage subjects remain stable with a saved category and business schema matches visible details", async ({
  page,
}) => {
  await page.addInitScript(() => localStorage.setItem("numunix-repair-category", "appliances"));
  await page.goto("/");
  await expect(page.locator("h1")).toHaveAccessibleName("Electronics Repair in Bangalore");
  await expect(page).toHaveURL(/\/$/);
  await page.goto("/appliances");
  await expect(page.locator("h1")).toHaveAccessibleName("Appliance Repairs in Bangalore");
  await page.goto("/contact");
  const organization = await page
    .locator('script[type="application/ld+json"]')
    .evaluateAll((scripts) =>
      scripts
        .flatMap((script) => JSON.parse(script.textContent || "{}")["@graph"] || [])
        .find((node) => node["@id"] === "https://www.numunix.com/#organization"),
    );
  expect(organization["@type"]).toContain("LocalBusiness");
  expect(organization.address.streetAddress).toBe(CONTACT.address);
  expect(organization.telephone).toBe(CONTACT.phone);
  expect(organization.aggregateRating).toBeUndefined();
  expect(organization.priceRange).toBeUndefined();
  await expect(page.locator("main")).toContainText(CONTACT.address);
});

test("repair integration events omit personal data and never count a form start as success", async ({
  page,
}) => {
  await page.addInitScript(() => {
    (window as any).repairEvents = [];
    window.addEventListener("numunix:repair-event", (event) =>
      (window as any).repairEvents.push((event as CustomEvent).detail),
    );
    document.addEventListener(
      "click",
      (event) => {
        if ((event.target as Element)?.closest('a[href*="wa.me"]')) event.preventDefault();
      },
      true,
    );
  });
  await page.goto("/appliances/repairs/water-purifier-service/kent");
  await expect(page.getByRole("button", { name: "Submit enquiry" })).toBeEnabled();
  await page.locator("#contact-name").fill("Private customer");
  await page.locator("#contact-phone").fill("9886500000");
  await page.locator('#enquiry a[href*="wa.me"]').click();
  const events = await page.evaluate(() => (window as any).repairEvents);
  expect(events.filter((event: any) => event.name === "enquiry_start")).toHaveLength(1);
  expect(events.some((event: any) => event.name === "whatsapp_click")).toBe(true);
  expect(events.some((event: any) => event.name.endsWith("success"))).toBe(false);
  expect(JSON.stringify(events)).not.toMatch(/Private customer|9886500000|wa\.me|Brand:|booking=/);
  for (const event of events)
    expect(Object.keys(event).sort()).toEqual(
      event.service ? ["category", "name", "page_path", "service"] : ["name", "page_path"],
    );
});
