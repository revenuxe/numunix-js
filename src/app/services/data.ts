import "server-only";
import { cache } from "react";
const TITLE = "Electronics & Appliance Repair Services in Bangalore | Numunix";
const DESC =
  "Explore mobile, laptop, CCTV, TV, washing machine, AC, refrigerator and electrical repair services. Review common faults, assessment checks and visit preparation.";
import { REPAIR_PAGES, repairCategoryPath, repairPageHref } from "@/content/repair-services";
import { repairPageHead, repairItemList } from "@/content/repair-seo";
import { REPAIR_SERVICES } from "@/content/homepage-repairs";
import { SITE_URL } from "@/content/site";
import { notFound, permanentRedirect, redirect as temporaryRedirect } from "next/navigation";
import { resolveHref } from "@/lib/route-href";

type Context = { params: Record<string, never> };
const beforeLoad = (_context: Context) => {};
const loader = (_context: Context) => undefined;
const loadCachedPage = cache(async (paramsKey: string) => {
  const context: Context = { params: JSON.parse(paramsKey) };
  await beforeLoad(context);
  return await loader(context);
});
export async function loadPage(context: Context) {
  return loadCachedPage(JSON.stringify(context.params));
}
export const pageHead = (_context: {
  params: Record<string, never>;
  loaderData: Awaited<ReturnType<typeof loadPage>>;
}) =>
  repairPageHead({
    title: TITLE,
    description: DESC,
    path: "/services",
    type: "CollectionPage",
    breadcrumbs: [{ name: "Repair services", path: "/services" }],
    entities: [
      repairItemList(
        REPAIR_PAGES.map((service) => ({ name: service.name, path: repairPageHref(service) })),
      ),
    ],
  });
