import { test, expect } from "@playwright/test";
import { MOBILE_BRANDS } from "../src/content/mobile-brands";

test("main mobile page content and side-by-side CTAs work on mobile and desktop", async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 800 });
  await page.goto("/electronic/repairs/mobile-repair");
  await expect(page.getByRole("button", { name: "Submit enquiry" })).toBeEnabled();
  await expect(page.locator("h1")).toHaveAccessibleName("Mobile Repair in Bangalore");
  await expect(page.locator("#assessment article")).toHaveCount(6);
  await expect(page.locator("#brands a")).toHaveCount(18);
  for (const id of [
    "mobile-scope-title",
    "mobile-privacy-title",
    "mobile-cost-title",
    "mobile-replace-title",
    "mobile-handover-title",
  ])
    await expect(page.locator(`#${id}`)).toBeVisible();
  await page.getByText("Will my photos and other data stay on the phone?", { exact: true }).click();
  await expect(
    page
      .locator("details[open]")
      .getByText(/A phone repair and data recovery are different scopes/),
  ).toBeVisible();
  await expect(page.getByText("Can everything be repaired on site?", { exact: true })).toHaveCount(
    0,
  );
  for (const id of ["mobile-assessment-cta", "mobile-final-cta"]) {
    const cta = page.locator(`section[aria-labelledby="${id}"]`);
    await expect(cta.locator('a[href^="tel:"]')).toHaveCount(0);
    const buttons = cta.getByRole("link");
    const first = await buttons.nth(0).boundingBox();
    const second = await buttons.nth(1).boundingBox();
    expect(Math.abs(first!.y - second!.y)).toBeLessThan(2);
    const href = await cta.getByRole("link", { name: "Share on WhatsApp" }).getAttribute("href");
    expect(new URL(href!).searchParams.get("text")).toContain("mobile repair assessment");
  }
  await page
    .locator('section[aria-labelledby="mobile-final-cta"]')
    .getByRole("link", { name: "Request phone repair" })
    .click();
  await expect(page).toHaveURL(/#enquiry$/);
  await expect(page.locator("#contact-service")).toHaveValue("Mobile Repair");
  await expect(page.locator("#contact-description")).toHaveValue(/Backup status \/ Data priority:/);
  for (const width of [320, 390, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
    ).toBe(true);
  }
});

test("all 19 mobile URLs have crawlable content, unique metadata, valid schemas and working links", async ({
  page,
  request,
}, testInfo) => {
  const origin = "https://www.numunix.com";
  const parent = "/electronic/repairs/mobile-repair";
  const paths = [
    parent,
    ...MOBILE_BRANDS.map((brand) => `${parent}/${brand.file.replace(/\.[^.]+$/, "")}`),
  ];
  const sitemapResponse = await request.get("/sitemap.xml");
  expect(sitemapResponse.status()).toBe(200);
  const sitemap = await sitemapResponse.text();
  const sitemapURLs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
  expect(new Set(sitemapURLs).size).toBe(sitemapURLs.length);
  const robots = await request.get("/robots.txt");
  expect(robots.status()).toBe(200);
  expect(await robots.text()).toContain(`Sitemap: ${origin}/sitemap.xml`);
  const internalLinks = new Set<string>();
  const titles = new Set<string>();
  const descriptions = new Set<string>();
  for (const path of paths) {
    expect(sitemapURLs).toContain(`${origin}${path}`);
    const response = await request.get(path, { maxRedirects: 0 });
    expect(response.status(), path).toBe(200);
    expect(response.headers()["x-robots-tag"] ?? "").not.toContain("noindex");
    const html = await response.text();
    const result = await page.evaluate((markup) => {
      const document = new DOMParser().parseFromString(markup, "text/html");
      const content = (selector: string) =>
        document.querySelector(selector)?.getAttribute("content") ?? "";
      return {
        titles: [...document.querySelectorAll("head title")].map((node) => node.textContent),
        descriptions: [...document.querySelectorAll('meta[name="description"]')].map((node) =>
          node.getAttribute("content"),
        ),
        canonical: [...document.querySelectorAll('link[rel="canonical"]')].map((node) =>
          node.getAttribute("href"),
        ),
        headings: document.querySelectorAll("main h1").length,
        paragraphs: document.querySelectorAll("main p").length,
        robots: content('meta[name="robots"]'),
        ogTitle: content('meta[property="og:title"]'),
        ogDescription: content('meta[property="og:description"]'),
        ogURL: content('meta[property="og:url"]'),
        image: content('meta[property="og:image"]'),
        twitterTitle: content('meta[name="twitter:title"]'),
        links: [...document.querySelectorAll("main a[href]")].map(
          (node) => node.getAttribute("href") ?? "",
        ),
        ids: [...document.querySelectorAll("[id]")].map((node) => node.id),
        graph: [...document.querySelectorAll('script[type="application/ld+json"]')].flatMap(
          (node) => JSON.parse(node.textContent ?? "{}")["@graph"] ?? [],
        ),
      };
    }, html);
    expect(result.titles, path).toHaveLength(1);
    expect(result.descriptions, path).toHaveLength(1);
    expect(result.canonical, path).toEqual([`${origin}${path}`]);
    expect(result.headings, path).toBe(1);
    expect(result.paragraphs, path).toBeGreaterThan(20);
    expect(result.robots).not.toContain("noindex");
    expect(result.ogTitle).toBe(result.titles[0]);
    expect(result.twitterTitle).toBe(result.titles[0]);
    expect(result.ogDescription).toBe(result.descriptions[0]);
    expect(result.ogURL).toBe(`${origin}${path}`);
    expect(result.image).toBe(`${origin}/social-preview.png`);
    expect(titles.has(result.titles[0]!)).toBe(false);
    expect(descriptions.has(result.descriptions[0]!)).toBe(false);
    titles.add(result.titles[0]!);
    descriptions.add(result.descriptions[0]!);
    const webpage = result.graph.find((node) => node["@id"] === `${origin}${path}#webpage`);
    const service = webpage.mainEntity.find(
      (node: Record<string, unknown>) => node["@type"] === "Service",
    );
    expect(service.url).toBe(`${origin}${path}`);
    expect(service.provider).toEqual({ "@id": `${origin}/#organization` });
    expect(service).not.toHaveProperty("aggregateRating");
    expect(service).not.toHaveProperty("offers");
    expect(
      result.graph.find((node) => node["@id"] === `${origin}/#organization`)?.["@type"],
    ).toEqual(["Organization", "LocalBusiness"]);
    const breadcrumbs = result.graph.find((node) => node["@type"] === "BreadcrumbList");
    expect(breadcrumbs.itemListElement.at(-1).item).toBe(`${origin}${path}`);
    const trail = breadcrumbs.itemListElement.map((item: { item: string }) => item.item);
    expect(new Set(trail).size).toBe(trail.length);
    if (path === parent) {
      const list = webpage.mainEntity.find(
        (node: Record<string, unknown>) => node["@type"] === "ItemList",
      );
      expect(list.numberOfItems).toBe(18);
      for (const brandPath of paths.slice(1)) expect(result.links).toContain(brandPath);
    }
    for (const href of result.links) {
      if (href.startsWith("/")) internalLinks.add(href.split(/[?#]/)[0]!);
      if (href.startsWith("#")) expect(result.ids, `${path}: ${href}`).toContain(href.slice(1));
    }
  }
  for (const href of internalLinks)
    expect((await request.get(href, { maxRedirects: 0 })).status(), href).toBe(200);
  const socialImage = await request.get("/social-preview.png");
  expect(socialImage.status()).toBe(200);
  expect(socialImage.headers()["content-type"]).toContain("image/");
  await testInfo.attach("mobile-seo-audit.json", {
    body: JSON.stringify(
      {
        pagesChecked: paths.length,
        uniqueTitles: titles.size,
        uniqueDescriptions: descriptions.size,
        internalLinksChecked: internalLinks.size,
        paths,
      },
      null,
      2,
    ),
    contentType: "application/json",
  });
});
