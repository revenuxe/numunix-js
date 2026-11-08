import "server-only";
import { cache } from "react";
import { cctvBrandPage } from "@/content/cctv-brand-pages";
import { laptopBrandPage } from "@/content/laptop-brand-pages";
import { washerBrandPage } from "@/content/repair-brand-pages";
import { mobileBrandPage } from "@/content/mobile-brand-pages";
import { acBrandPage } from "@/content/ac-brand-pages";
import { fridgeBrandPage } from "@/content/fridge-brand-pages";
import { purifierBrandPage } from "@/content/purifier-brand-pages";
import { repairPageHead, repairServiceSchema } from "@/content/repair-seo";
import { curateBrandRepair } from "@/content/curated-brand-repair";
import { notFound, permanentRedirect, redirect as temporaryRedirect } from "next/navigation";
import { resolveHref } from "@/lib/route-href";

type Context = { params: { category: string; slug: string; brand: string } };
const beforeLoad = (_context: Context) => {};
const loader = ({ params }: Context) => {
  const page =
    purifierBrandPage(params.category, params.slug, params.brand) ??
    cctvBrandPage(params.category, params.slug, params.brand) ??
    laptopBrandPage(params.category, params.slug, params.brand) ??
    washerBrandPage(params.category, params.slug, params.brand) ??
    fridgeBrandPage(params.category, params.slug, params.brand) ??
    acBrandPage(params.category, params.slug, params.brand) ??
    mobileBrandPage(params.category, params.slug, params.brand);
  if (!page) throw notFound();
  return curateBrandRepair(page);
};
const loadCachedPage = cache(async (paramsKey: string) => {
  const context: Context = { params: JSON.parse(paramsKey) };
  await beforeLoad(context);
  return await loader(context);
});
export async function loadPage(context: Context) {
  return loadCachedPage(JSON.stringify(context.params));
}
export const pageHead = ({
  loaderData,
}: {
  params: { category: string; slug: string; brand: string };
  loaderData: Awaited<ReturnType<typeof loadPage>>;
}) => {
  if (!loaderData)
    return {
      meta: [
        { title: "Brand repair unavailable | Numunix" },
        { name: "robots", content: "noindex" },
      ],
    };
  const isMobile = loaderData.service === "Mobile Repair";
  const isLaptop = loaderData.service === "Laptop Repair";
  const isCCTV = loaderData.service === "CCTV Installation & Repair";
  const categoryPath = isMobile || isLaptop || isCCTV ? "electronic" : "appliances";
  const serviceSlug = isCCTV
    ? "cctv-service"
    : isLaptop
      ? "laptop-repair"
      : isMobile
        ? "mobile-repair"
        : loaderData.service === "Water Purifier Service"
          ? "water-purifier-service"
          : loaderData.service === "AC Service & Repair"
            ? "ac-repair"
            : loaderData.service === "Refrigerator Repair"
              ? "refrigerator-repair"
              : "washing-machine-repair";
  const serviceName = isCCTV
    ? "CCTV repair"
    : isLaptop
      ? "Laptop repair"
      : isMobile
        ? "Mobile repair"
        : loaderData.service === "Water Purifier Service"
          ? "Water purifier repair"
          : loaderData.service === "AC Service & Repair"
            ? "AC repair"
            : loaderData.service === "Refrigerator Repair"
              ? "Fridge repair"
              : "Washing machine repair";
  return repairPageHead({
    title: loaderData.title,
    description: loaderData.description,
    path: loaderData.path,
    breadcrumbs: [
      ...(isMobile || isLaptop || isCCTV ? [] : [{ name: "Appliances", path: "/appliances" }]),
      { name: serviceName, path: `/${categoryPath}/repairs/${serviceSlug}` },
      { name: `${loaderData.brand} ${serviceName.toLowerCase()}`, path: loaderData.path },
    ],
    entities: [
      repairServiceSchema(
        { name: `Independent ${loaderData.brand} ${serviceName}`, intro: loaderData.intro },
        loaderData.path,
      ),
    ],
  });
};
