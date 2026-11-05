import { test, expect } from "@playwright/test";
import { WASHER_BRAND_PAGES } from "../src/content/repair-brand-pages";
import { FRIDGE_BRAND_PAGES } from "../src/content/fridge-brand-pages";
import { AC_BRAND_PAGES } from "../src/content/ac-brand-pages";
import { PURIFIER_BRAND_PAGES } from "../src/content/purifier-brand-pages";
import { MOBILE_BRAND_PAGES } from "../src/content/mobile-brand-pages";
import { LAPTOP_BRAND_PAGES } from "../src/content/laptop-brand-pages";
import { CCTV_BRAND_PAGES } from "../src/content/cctv-brand-pages";

const groups = [
  WASHER_BRAND_PAGES,
  FRIDGE_BRAND_PAGES,
  AC_BRAND_PAGES,
  PURIFIER_BRAND_PAGES,
  MOBILE_BRAND_PAGES,
  LAPTOP_BRAND_PAGES,
  CCTV_BRAND_PAGES,
];

test("every supported brand has six substantive, nonduplicated symptom cards", () => {
  const allBodies = new Set<string>();
  for (const pages of groups) {
    const brandNames = pages.map((page) => page.brand.toLowerCase());
    const normalize = (value: string) =>
      brandNames
        .reduce((text, brand) => text.replaceAll(brand, "BRAND"), value.toLowerCase())
        .replace(/\s+/g, " ")
        .trim();
    const serviceBodies = new Set<string>();
    for (const page of pages) {
      expect(page.faults, page.path).toHaveLength(6);
      for (const card of page.faults) {
        expect(card.title.length, page.path).toBeGreaterThan(15);
        expect(card.body.length, page.path).toBeGreaterThan(100);
        expect(card.label, page.path).not.toBe("");
        const body = normalize(card.body);
        expect(
          serviceBodies.has(body),
          `${page.path}: repeated card copy after removing brand names`,
        ).toBe(false);
        serviceBodies.add(body);
        expect(allBodies.has(card.body), `${page.path}: repeated card copy across services`).toBe(
          false,
        );
        allBodies.add(card.body);
      }
    }
  }
  expect(allBodies.size).toBe(groups.flat().length * 6);
});

test("every brand route server-renders its own symptom content", async ({ request }) => {
  test.setTimeout(180000);
  for (const pages of groups) {
    for (let offset = 0; offset < pages.length; offset += 4) {
      await Promise.all(
        pages.slice(offset, offset + 4).map(async (page) => {
          const response = await request.get(page.path);
          expect(response.status(), page.path).toBe(200);
          const html = await response.text();
          for (const card of page.faults) {
            const escaped = card.title
              .replaceAll("&", "&amp;")
              .replaceAll("<", "&lt;")
              .replaceAll(">", "&gt;")
              .replaceAll('"', "&quot;")
              .replaceAll("'", "&#x27;");
            expect(html, page.path).toContain(escaped);
          }
        }),
      );
    }
  }
});

for (const pages of groups) {
  const brand = pages[0]!;
  test(`${brand.service} cards retain layout and booking context`, async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 900 });
    await page.goto(brand.path);
    const section = page
      .locator("section")
      .filter({
        has: page.getByRole("heading", { name: "What changed? Start with the symptom." }),
      });
    await expect(section.getByRole("heading", { level: 3 })).toHaveCount(6);
    for (const card of brand.faults)
      await expect(section.getByRole("heading", { name: card.title, exact: true })).toBeVisible();
    await section.getByRole("link", { name: "Request assessment" }).first().click();
    await expect(page).toHaveURL(/#enquiry$/);
    await expect(page.locator('input[name="brand"]')).toHaveValue(brand.brand);
    await expect(page.locator("#contact-service")).toHaveValue(brand.service);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
      true,
    );
  });
}
