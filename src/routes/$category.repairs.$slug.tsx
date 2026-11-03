import { createFileRoute, notFound } from "@tanstack/react-router";
import { REPAIR_PAGES, repairCategoryPath, repairPageHref } from "@/content/repair-services";
import { MOBILE_REPAIR_PAGE } from "@/content/mobile-repair-page";
import { MOBILE_BRANDS } from "@/content/mobile-brands";
import { WASHING_MACHINE_PAGE } from "@/content/washing-machine-page";
import { RepairServicePage } from "@/components/numunix/RepairServicePage";
import { repairItemList, repairPageHead, repairServiceSchema } from "@/content/repair-seo";
import { REFRIGERATOR_BRANDS } from "@/content/refrigerator-brands";

export const Route = createFileRoute("/$category/repairs/$slug")({
  loader: ({ params }) => {
    const service = REPAIR_PAGES.find(item => item.slug === params.slug && repairCategoryPath(item.category) === params.category);
    if (!service) throw notFound();
    return { service };
  },
  head: ({ loaderData }) => {
    const service = loaderData?.service;
    if (!service) return { meta: [{ title: "Repair page unavailable | Numunix" }, { name: "robots", content: "noindex" }] };
    const title = `${service.name} in Bangalore | Numunix`;
    const path = repairPageHref(service);
    const description = service.slug === "mobile-repair" ? MOBILE_REPAIR_PAGE.description : service.slug === "washing-machine-repair" ? WASHING_MACHINE_PAGE.description : `${service.name} in Bangalore. ${service.checks.slice(0, 2).join("; ")}. Discuss diagnosis, parts and an estimate before approving work.`;
    const entities = [repairServiceSchema(service, path)];
    if (service.slug === "refrigerator-repair") entities.push(repairItemList(REFRIGERATOR_BRANDS.map(brand => ({ name: `${brand.name} Fridge Repair`, path: `${path}/${brand.name.toLowerCase()}` }))));
    if (service.slug === "mobile-repair") entities.push(repairItemList(MOBILE_BRANDS.map(brand => ({ name: `${brand.name} Mobile Repair`, path: `${path}/${brand.file.replace(/\.[^.]+$/, "")}` }))));
    return repairPageHead({ title, description, path, breadcrumbs: [{ name: "Repair services", path: "/services" }, { name: service.name, path }], entities });
  },
  component: RepairDetail,
});

function RepairDetail() {
  const { service } = Route.useLoaderData();
  return <RepairServicePage service={service} />;
}
