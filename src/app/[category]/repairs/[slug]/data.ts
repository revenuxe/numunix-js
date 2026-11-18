import "server-only";
import { cache } from "react";
import { REPAIR_PAGES, repairCategoryPath, repairPageHref } from "@/content/repair-services";
import { MOBILE_REPAIR_PAGE } from "@/content/mobile-repair-page";
import { MOBILE_BRANDS } from "@/content/mobile-brands";
import { WASHING_MACHINE_PAGE } from "@/content/washing-machine-page";
import { repairItemList, repairPageHead, repairServiceSchema } from "@/content/repair-seo";
import { REFRIGERATOR_BRANDS } from "@/content/refrigerator-brands";
import { washerTypePage, washerTypeService, WASHER_PARENT_PATH, WASHER_TYPE_PAGES, washerTypeHref } from "@/content/washer-type-pages";
import { notFound, permanentRedirect, redirect as temporaryRedirect } from "next/navigation";
import { resolveHref } from "@/lib/route-href";

type Context = { params: { category: string; slug: string } };
const beforeLoad = (_context: Context) => {};
const loader = async ({ params }: Context) => {
  const washerType = washerTypePage(params.category, params.slug);
  if (washerType) return { service: washerTypeService(washerType), hubContent: undefined, washerType };
  const service = REPAIR_PAGES.find(
    (item) => item.slug === params.slug && repairCategoryPath(item.category) === params.category,
  );
  if (!service) throw notFound();
  const { repairHubContent } = await import("@/content/repair-hub-content");
  return { service, hubContent: repairHubContent(service), washerType: undefined };
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
  params: { category: string; slug: string };
  loaderData: Awaited<ReturnType<typeof loadPage>>;
}) => {
  const service = loaderData?.service;
  if (!service)
    return {
      meta: [
        { title: "Repair page unavailable | Numunix" },
        { name: "robots", content: "noindex" },
      ],
    };
  const title = `${service.name} in Bangalore | Numunix`;
  const path = repairPageHref(service);
  const description = loaderData.washerType?.description ?? (
    service.slug === "mobile-repair"
      ? MOBILE_REPAIR_PAGE.description
      : service.slug === "washing-machine-repair"
        ? WASHING_MACHINE_PAGE.description
        : (loaderData?.hubContent?.description ??
          `${service.name} in Bangalore. Review the reported fault, assessment scope and estimate before approving work.`));
  const entities = [repairServiceSchema(service, path)];
  if (service.slug === "washing-machine-repair") entities.push(repairItemList(WASHER_TYPE_PAGES.map(page => ({ name: page.name, path: washerTypeHref(page) }))));
  if (service.slug === "refrigerator-repair")
    entities.push(
      repairItemList(
        REFRIGERATOR_BRANDS.map((brand) => ({
          name: `${brand.name} Fridge Repair`,
          path: `${path}/${brand.name.toLowerCase()}`,
        })),
      ),
    );
  if (service.slug === "mobile-repair")
    entities.push(
      repairItemList(
        MOBILE_BRANDS.map((brand) => ({
          name: `${brand.name} Mobile Repair`,
          path: `${path}/${brand.file.replace(/\.[^.]+$/, "")}`,
        })),
      ),
    );
  return repairPageHead({
    title,
    description,
    path,
    breadcrumbs: [
      { name: "Repair services", path: "/services" },
      ...(loaderData.washerType ? [{ name: "Washing machine repair", path: WASHER_PARENT_PATH }] : []),
      { name: service.name, path },
    ],
    entities,
  });
};
