import type { MetadataRoute } from "next";
import { getServiceSlugs } from "@/lib/services";
import {
  getActiveBrands,
  getActiveSeries,
  getActiveModels,
  getLaptopCategory,
} from "@/lib/catalog";
import { BANGALORE_AREAS } from "@/lib/bangalore-areas";
import { SELL_LAPTOP_BRANDS } from "@/lib/sell-laptop-brands";
import { SITE_URL } from "@/lib/site";

const STATIC_ROUTES = [
  "/",
  "/about",
  "/why-us",
  "/contact",
  "/sell-laptop",
  "/sell/laptops",
  "/privacy",
  "/terms",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));

  const serviceEntries: MetadataRoute.Sitemap = getServiceSlugs().map((slug) => ({
    url: `${SITE_URL}/services/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const areaEntries: MetadataRoute.Sitemap = BANGALORE_AREAS.map((area) => ({
    url: `${SITE_URL}/sell-laptop/${area.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.65,
  }));

  const brandSeoEntries: MetadataRoute.Sitemap = SELL_LAPTOP_BRANDS.map((brand) => ({
    url: `${SITE_URL}/sell-laptop/brand/${brand.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.65,
  }));

  const catalogEntries: MetadataRoute.Sitemap = [];
  try {
    const category = await getLaptopCategory();
    if (category) {
      const brands = await getActiveBrands(category.id);
      for (const brand of brands) {
        catalogEntries.push({
          url: `${SITE_URL}/sell/laptops/${brand.slug}`,
          lastModified: new Date(),
          changeFrequency: "weekly",
          priority: 0.6,
        });
        const series = await getActiveSeries(brand.id);
        for (const s of series) {
          catalogEntries.push({
            url: `${SITE_URL}/sell/laptops/${brand.slug}/${s.slug}`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.6,
          });
          const models = await getActiveModels(s.id);
          for (const model of models) {
            catalogEntries.push({
              url: `${SITE_URL}/sell/laptops/${brand.slug}/${s.slug}/${model.slug}`,
              lastModified: new Date(),
              changeFrequency: "weekly",
              priority: 0.65,
            });
          }
        }
      }
    }
  } catch {
    // Supabase unreachable at build time — sitemap still returns the static/service routes.
  }

  return [
    ...staticEntries,
    ...serviceEntries,
    ...areaEntries,
    ...brandSeoEntries,
    ...catalogEntries,
  ];
}
