import { test, expect } from "@playwright/test";
import { REPAIR_PAGES, repairPageHref } from "../src/content/repair-services";
import { WASHER_BRAND_PAGES } from "../src/content/repair-brand-pages";
import { FRIDGE_BRAND_PAGES } from "../src/content/fridge-brand-pages";
import { AC_BRAND_PAGES } from "../src/content/ac-brand-pages";
import { MOBILE_BRAND_PAGES } from "../src/content/mobile-brand-pages";
import { CONTACT } from "../src/content/site";

test("all service and brand WhatsApp links put enquiry fields on separate lines", async ({ page, request }) => {
  const brandPages = [...WASHER_BRAND_PAGES, ...FRIDGE_BRAND_PAGES, ...AC_BRAND_PAGES, ...MOBILE_BRAND_PAGES];
  const paths = [...REPAIR_PAGES.map(repairPageHref), ...brandPages.map(brand => brand.path)];
  const base = CONTACT.whatsappHref.split("?")[0]!;
  let linksChecked = 0;
  for (const path of paths) {
    const response = await request.get(path);
    expect(response.status(), path).toBe(200);
    const html = await response.text();
    const links = await page.evaluate(markup => {
      const document = new DOMParser().parseFromString(markup, "text/html");
      return [...document.querySelectorAll<HTMLAnchorElement>("a[href]")].map(anchor => anchor.getAttribute("href")!);
    }, html);
    const bookingLinks = links.filter(href => href.startsWith(base));
    expect(bookingLinks.length, path).toBeGreaterThan(0);
    for (const href of bookingLinks) {
      const text = new URL(href).searchParams.get("text")!;
      const lines = text.split("\n");
      expect(lines, path).toContain("Model:");
      expect(lines, path).toContain("Issue:");
      expect(lines, path).toContain("Location:");
      expect(lines[1], path).toBe("");
      expect(lines.slice(2).every(line => /^[A-Za-z ]+:$/.test(line)), path).toBe(true);
      expect(text, path).not.toContain("\\n");
      expect(href, path).toContain("%0A");
      const brand = brandPages.find(item => item.path === path);
      if (brand) expect(lines[0], path).toContain(brand.brand);
      linksChecked++;
    }
  }
  expect(linksChecked).toBeGreaterThan(paths.length);
});
