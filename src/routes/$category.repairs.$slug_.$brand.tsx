import { createFileRoute, notFound } from "@tanstack/react-router";
import { washerBrandPage } from "@/content/repair-brand-pages";
import { fridgeBrandPage } from "@/content/fridge-brand-pages";
import { repairPageHead, repairServiceSchema } from "@/content/repair-seo";
import { RepairBrandPage } from "@/components/numunix/RepairBrandPage";

export const Route = createFileRoute("/$category/repairs/$slug_/$brand")({
  loader: ({ params }) => {
    const page = washerBrandPage(params.category, params.slug, params.brand) ?? fridgeBrandPage(params.category, params.slug, params.brand);
    if (!page) throw notFound();
    return page;
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Brand repair unavailable | Numunix" }, { name: "robots", content: "noindex" }] };
    const serviceSlug = loaderData.service === "Refrigerator Repair" ? "refrigerator-repair" : "washing-machine-repair";
    const serviceName = loaderData.service === "Refrigerator Repair" ? "Fridge repair" : "Washing machine repair";
    return repairPageHead({ title: loaderData.title, description: loaderData.description, path: loaderData.path,
      breadcrumbs: [{ name: "Appliances", path: "/appliances" }, { name: serviceName, path: `/appliances/repairs/${serviceSlug}` }, { name: `${loaderData.brand} ${serviceName.toLowerCase()}`, path: loaderData.path }],
      entities: [repairServiceSchema({ name: `Independent ${loaderData.brand} ${serviceName}`, intro: loaderData.intro }, loaderData.path)] });
  },
  component: BrandRepair,
});
function BrandRepair() {
  const page = Route.useLoaderData();
  return <RepairBrandPage page={page} />;
}
