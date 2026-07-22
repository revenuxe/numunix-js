import type { MetadataRoute } from "next";
import { getServiceSlugs } from "@/lib/services";
import { BANGALORE_AREAS } from "@/lib/bangalore-areas";
import { REPAIR_LAPTOP_BRANDS } from "@/lib/repair-laptop-brands";
import { CCTV_BRANDS } from "@/lib/cctv-brands";
import { getBlogSlugs } from "@/lib/blog-posts";
import { SITE_URL } from "@/lib/site";

const STATIC_ROUTES = [
  "/",
  "/about",
  "/why-us",
  "/contact",
  "/repair-laptop",
  "/repair-laptop/brand/not-listed",
  "/services/cctv-installation/brand/not-sure",
  "/sell/laptops/terms",
  "/blog",
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
    url: `${SITE_URL}/repair-laptop/${area.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.65,
  }));

  const brandSeoEntries: MetadataRoute.Sitemap = REPAIR_LAPTOP_BRANDS.map((brand) => ({
    url: `${SITE_URL}/repair-laptop/brand/${brand.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.65,
  }));

  const cctvBrandEntries: MetadataRoute.Sitemap = CCTV_BRANDS.map((brand) => ({
    url: `${SITE_URL}/services/cctv-installation/brand/${brand.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.65,
  }));

  const blogEntries: MetadataRoute.Sitemap = getBlogSlugs().map((slug) => ({
    url: `${SITE_URL}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [
    ...staticEntries,
    ...serviceEntries,
    ...areaEntries,
    ...brandSeoEntries,
    ...cctvBrandEntries,
    ...blogEntries,
  ];
}
