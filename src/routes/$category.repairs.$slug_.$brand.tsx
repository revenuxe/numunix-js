import { createFileRoute, notFound } from "@tanstack/react-router";
import { washerBrandPage } from "@/content/repair-brand-pages";
import { repairPageHead, repairServiceSchema } from "@/content/repair-seo";
import { RepairBrandPage } from "@/components/numunix/RepairBrandPage";

export const Route = createFileRoute("/$category/repairs/$slug_/$brand")({
  loader: ({ params }) => {
    const page = washerBrandPage(params.category, params.slug, params.brand);
    if (!page) throw notFound();
    return page;
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Brand repair unavailable | Numunix" }, { name: "robots", content: "noindex" }] };
    return repairPageHead({ title: loaderData.title, description: loaderData.description, path: loaderData.path,
      breadcrumbs: [{ name: "Appliances", path: "/appliances" }, { name: "Washing machine repair", path: "/appliances/repairs/washing-machine-repair" }, { name: `${loaderData.brand} washing machine repair`, path: loaderData.path }],
      entities: [repairServiceSchema({ name: `Independent ${loaderData.brand} Washing Machine Repair`, intro: loaderData.intro }, loaderData.path)] });
  },
  component: BrandRepair,
});
function BrandRepair() {
  const page = Route.useLoaderData();
  return <RepairBrandPage page={page} />;
}
