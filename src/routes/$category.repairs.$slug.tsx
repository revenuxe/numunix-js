import { createFileRoute, notFound } from "@tanstack/react-router";
import { REPAIR_PAGES, repairCategoryPath, repairPageHref } from "@/content/repair-services";
import { REPAIR_SITE_URL } from "@/content/repair-homepage-meta";
import { RepairServicePage } from "@/components/numunix/RepairServicePage";
import { repairPageHead, repairServiceSchema } from "@/content/repair-seo";

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
    const description = `${service.name} in Bangalore. ${service.checks.slice(0, 2).join("; ")}. Discuss diagnosis, parts and an estimate before approving work.`;
    return repairPageHead({ title, description, path, breadcrumbs: [{ name: "Repair services", path: "/services" }, { name: service.name, path }], entities: [repairServiceSchema(service, path)] });
  },
  component: RepairDetail,
});

function RepairDetail() {
  const { service } = Route.useLoaderData();
  return <RepairServicePage service={service} />;
}