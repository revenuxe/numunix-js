import { createFileRoute, notFound } from "@tanstack/react-router";
import { BOSCH_WASHER } from "@/content/repair-brand-pages";
import { repairPageHead, repairServiceSchema } from "@/content/repair-seo";
import { RepairBrandPage } from "@/components/numunix/RepairBrandPage";

export const Route = createFileRoute("/$category/repairs/$slug_/$brand")({
  loader: ({ params }) => {
    if (params.category !== "appliances" || params.slug !== "washing-machine-repair" || params.brand !== "bosch") throw notFound();
    return BOSCH_WASHER;
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Brand repair unavailable | Numunix" }, { name: "robots", content: "noindex" }] };
    return repairPageHead({ title: loaderData.title, description: loaderData.description, path: loaderData.path,
      breadcrumbs: [{ name: "Appliances", path: "/appliances" }, { name: "Washing machine repair", path: "/appliances/repairs/washing-machine-repair" }, { name: "Bosch washing machine repair", path: loaderData.path }],
      entities: [repairServiceSchema({ name: "Independent Bosch Washing Machine Repair", intro: loaderData.intro }, loaderData.path)] });
  },
  component: RepairBrandPage,
});