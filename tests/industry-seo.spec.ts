import { test, expect } from "@playwright/test";
import { industries } from "../src/content/industries";
import { industryLandingBySlug } from "../src/content/industry-landings";
import { industrySeo, serializeIndustrySchema, INDUSTRY_SEO } from "../src/content/industry-seo";
import { SITE_URL, OG_IMAGE } from "../src/content/site";

test("every industry has a unique search snippet and safe structured-data serialization", () => {
  expect(Object.keys(INDUSTRY_SEO).sort()).toEqual(industries.map((item) => item.slug).sort());
  expect(new Set(Object.values(INDUSTRY_SEO).map((item) => item.title)).size).toBe(8);
  expect(new Set(Object.values(INDUSTRY_SEO).map((item) => item.description)).size).toBe(8);
  for (const seo of Object.values(INDUSTRY_SEO)) {
    expect(seo.title.length).toBeLessThanOrEqual(65);
    expect(seo.description.length).toBeGreaterThan(100);
    expect(seo.description.length).toBeLessThanOrEqual(165);
  }
  const unsafe = { text: "</script><script>alert('example')</script>&" };
  const serialized = serializeIndustrySchema(unsafe);
  expect(serialized).not.toContain("<");
  expect(JSON.parse(serialized)).toEqual(unsafe);
});

for (const industry of industries) {
  test(`${industry.slug}: crawlable server HTML, metadata, schema, and discovery`, async ({
    browser,
    request,
    baseURL,
  }) => {
    const context = await browser.newContext({ javaScriptEnabled: false, baseURL: baseURL! });
    await context.route("https://fonts.googleapis.com/**", (route) => route.abort());
    const page = await context.newPage();
    const seo = industrySeo(industry.slug)!;
    const content = industryLandingBySlug(industry.slug)!;
    const response = await page.goto(`/industries/${industry.slug}?ref=seo-test`, {
      waitUntil: "domcontentloaded",
    });
    expect(response?.status()).toBe(200);
    await expect(page.locator("title")).toHaveCount(1);
    await expect(page).toHaveTitle(seo.title);
    await expect(page.locator('meta[name="description"]')).toHaveCount(1);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
      "content",
      seo.description,
    );
    await expect(page.locator('link[rel="canonical"]')).toHaveCount(1);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", seo.url);
    for (const [attribute, name, value] of [
      ["property", "og:title", seo.title],
      ["property", "og:description", seo.description],
      ["property", "og:url", seo.url],
      ["property", "og:image", OG_IMAGE],
      ["name", "twitter:title", seo.title],
      ["name", "twitter:description", seo.description],
      ["name", "twitter:image", OG_IMAGE],
    ]) {
      const tag = page.locator(`meta[${attribute}="${name}"]`);
      await expect(tag).toHaveCount(1);
      await expect(tag).toHaveAttribute("content", value!);
    }
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator("h1")).toContainText(content.headline);
    await expect(page.locator("h1").locator("..")).toHaveCSS("opacity", "1");
    await expect(page.locator("#capabilities article")).toHaveCount(6);
    await expect(page.locator("#capabilities article").first().locator("..")).toHaveCSS(
      "opacity",
      "1",
    );
    await page.locator("#faq summary").first().click();
    await expect(page.locator("#faq details").first()).toHaveAttribute("open", "");
    const schemas = await page.locator('script[type="application/ld+json"]').allTextContents();
    const graph = schemas.map((text) => JSON.parse(text)).find((schema) => schema["@graph"]);
    expect(graph).toBeDefined();
    const nodes = graph["@graph"];
    const webpage = nodes.find((node: any) => node["@type"] === "WebPage");
    const service = nodes.find((node: any) => node["@type"] === "Service");
    const breadcrumb = nodes.find((node: any) => node["@type"] === "BreadcrumbList");
    expect(webpage.url).toBe(seo.url);
    expect(webpage.mainEntity["@id"]).toBe(service["@id"]);
    expect(service.provider["@id"]).toBe(`${SITE_URL}/#organization`);
    expect(
      service.hasOfferCatalog.itemListElement.map((offer: any) => offer.itemOffered.name),
    ).toEqual(content.capabilities.map(([name]) => name));
    expect(breadcrumb.itemListElement.at(-1).item).toBe(seo.url);
    const html = await response!.text();
    expect(html).toContain(content.headline);
    expect(html).toContain('href="/industries/');
    const robots = await page
      .locator('meta[name="robots"]')
      .evaluateAll((tags) => tags.map((tag) => tag.getAttribute("content")));
    expect(robots.join(" ")).not.toContain("noindex");
    const sitemap = await request.get("/sitemap.xml");
    expect(await sitemap.text()).toContain(`<loc>${seo.url}</loc>`);
    await context.close();
  });
}

test("unknown industry returns a real 404 without a successful service schema", async ({
  request,
}) => {
  const response = await request.get("/industries/not-a-real-industry");
  expect(response.status()).toBe(404);
  expect(await response.text()).not.toContain('"@type":"Service"');
});

test("robots advertises the sitemap and the social image is reachable", async ({ request }) => {
  const robots = await request.get("/robots.txt");
  expect(await robots.text()).toContain(`Sitemap: ${SITE_URL}/sitemap.xml`);
  const image = await request.get(new URL(OG_IMAGE).pathname);
  expect(image.status()).toBe(200);
  expect(image.headers()["content-type"]).toContain("image/");
});
