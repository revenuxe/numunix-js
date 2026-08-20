import type { MetadataRoute } from "next";
import { getServiceSlugs } from "@/lib/services";
import { BANGALORE_AREAS } from "@/lib/bangalore-areas";
import { REPAIR_LAPTOP_BRANDS } from "@/lib/repair-laptop-brands";
import { CCTV_BRANDS } from "@/lib/cctv-brands";
import { WASHING_MACHINE_BRANDS } from "@/lib/washing-machine-brands";
import { getBlogSlugs } from "@/lib/blog-posts";
import { getElectricalServiceSlugs } from "@/lib/electrical-services";
import { getComputerSubserviceParams } from "@/lib/computer-subservices";
import { LOCAL_SERVICE_PAGES } from "@/lib/local-service-pages";
import { SITE_URL } from "@/lib/site";

const STATIC_ROUTES = [
  "/",
  "/about",
  "/why-us",
  "/contact",
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
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));

  const serviceEntries: MetadataRoute.Sitemap = getServiceSlugs().map((slug) => ({
    url: `${SITE_URL}/services/${slug}`,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const electricalServiceEntries: MetadataRoute.Sitemap = getElectricalServiceSlugs().map(
    (slug) => ({
      url: `${SITE_URL}/services/electrical-work/${slug}`,
      changeFrequency: "monthly",
      priority: 0.75,
    }),
  );
  const computerSubserviceEntries: MetadataRoute.Sitemap = getComputerSubserviceParams().map(
    ({ serviceSlug, subService }) => ({
      url: `${SITE_URL}/services/${serviceSlug}/${subService}`,
      changeFrequency: "monthly",
      priority: 0.7,
    }),
  );
  const localServiceEntries: MetadataRoute.Sitemap = LOCAL_SERVICE_PAGES.map((page) => ({
    url: `${SITE_URL}/services/${page.serviceSlug}/${page.slug}`,
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  const areaEntries: MetadataRoute.Sitemap = BANGALORE_AREAS.map((area) => ({
    url: `${SITE_URL}/repair-laptop/${area.slug}`,
    changeFrequency: "weekly",
    priority: 0.65,
  }));

  const brandSeoEntries: MetadataRoute.Sitemap = REPAIR_LAPTOP_BRANDS.map((brand) => ({
    url: `${SITE_URL}/repair-laptop/brand/${brand.slug}`,
    changeFrequency: "weekly",
    priority: 0.65,
  }));

  const cctvBrandEntries: MetadataRoute.Sitemap = CCTV_BRANDS.map((brand) => ({
    url: `${SITE_URL}/services/cctv-installation/brand/${brand.slug}`,
    changeFrequency: "weekly",
    priority: 0.65,
  }));

  const washingMachineBrandEntries: MetadataRoute.Sitemap = WASHING_MACHINE_BRANDS.map((brand) => ({
    url: `${SITE_URL}/services/washing-machine-repair/brand/${brand.slug}`,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const blogEntries: MetadataRoute.Sitemap = getBlogSlugs().map((slug) => ({
    url: `${SITE_URL}/blog/${slug}`,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [
    ...staticEntries,
    ...serviceEntries,
    ...electricalServiceEntries,
    ...computerSubserviceEntries,
    ...localServiceEntries,
    ...areaEntries,
    ...brandSeoEntries,
    ...cctvBrandEntries,
    ...washingMachineBrandEntries,
    ...blogEntries,
  ];
}
