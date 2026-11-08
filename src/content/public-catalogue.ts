import "server-only";
import { REPAIR_PAGES, repairPageHref } from "./repair-services";
import { ARTICLES } from "./articles";
import { WORKFLOW_STAGES } from "./workflow";
import { REPAIR_AUDIENCE_PATHS } from "./repair-audiences";
import { WASHER_BRAND_PAGES } from "./repair-brand-pages";
import { AC_BRAND_PAGES } from "./ac-brand-pages";
import { FRIDGE_BRAND_PAGES } from "./fridge-brand-pages";
import { MOBILE_BRAND_PAGES } from "./mobile-brand-pages";
import { LAPTOP_BRAND_PAGES } from "./laptop-brand-pages";
import { CCTV_BRAND_PAGES } from "./cctv-brand-pages";
import { PURIFIER_BRAND_PAGES } from "./purifier-brand-pages";
import { curateBrandRepair } from "./curated-brand-repair";

// Prerendering and sitemap discovery use the same approved content.
// Fail the build when a listed brand lacks curated editorial coverage.
export const PUBLIC_PATHS: string[] = [
  "/",
  "/appliances",
  "/services",
  "/contact",
  "/repair-assessment",
  "/repair-process",
  "/repair-diagnostics",
  "/repair-aftercare",
  "/repair-safety",
  "/repair-guides",
  "/privacy",
  "/terms",
  ...REPAIR_PAGES.map(repairPageHref),
  ...ARTICLES.map((article) => `/repair-guides/${article.slug}`),
  ...WORKFLOW_STAGES.map((stage) => `/repair-process/${stage.slug}`),
  ...REPAIR_AUDIENCE_PATHS.map((slug) => `/who-we-serve/${slug}`),
  ...[
    ...WASHER_BRAND_PAGES,
    ...AC_BRAND_PAGES,
    ...FRIDGE_BRAND_PAGES,
    ...MOBILE_BRAND_PAGES,
    ...LAPTOP_BRAND_PAGES,
    ...CCTV_BRAND_PAGES,
    ...PURIFIER_BRAND_PAGES,
  ].map((page) => curateBrandRepair(page).path),
];
