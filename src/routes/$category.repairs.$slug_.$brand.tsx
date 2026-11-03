import { createFileRoute, notFound } from "@tanstack/react-router";
import { washerBrandPage } from "@/content/repair-brand-pages";
import { mobileBrandPage } from "@/content/mobile-brand-pages";
import { acBrandPage } from "@/content/ac-brand-pages";
import { fridgeBrandPage } from "@/content/fridge-brand-pages";
import { repairPageHead, repairServiceSchema } from "@/content/repair-seo";
import { RepairBrandPage } from "@/components/numunix/RepairBrandPage";

export const Route = createFileRoute("/$category/repairs/$slug_/$brand")({
  loader: ({ params }) => {
    const page = washerBrandPage(params.category, params.slug, params.brand) ?? fridgeBrandPage(params.category, params.slug, params.brand) ?? acBrandPage(params.category, params.slug, params.brand) ?? mobileBrandPage(params.category, params.slug, params.brand);
    if (!page) throw notFound();
    return page;
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Brand repair unavailable | Numunix" }, { name: "robots", content: "noindex" }] };
    const isMobile = loaderData.service === "Mobile Repair";
    const categoryPath = isMobile ? "electronic" : "appliances";
    const serviceSlug = isMobile ? "mobile-repair" : loaderData.service === "AC Service & Repair" ? "ac-repair" : loaderData.service === "Refrigerator Repair" ? "refrigerator-repair" : "washing-machine-repair";
    const serviceName = isMobile ? "Mobile repair" : loaderData.service === "AC Service & Repair" ? "AC repair" : loaderData.service === "Refrigerator Repair" ? "Fridge repair" : "Washing machine repair";
    return repairPageHead({ title: loaderData.title, description: loaderData.description, path: loaderData.path,
      breadcrumbs: [...(isMobile ? [] : [{ name: "Appliances", path: "/appliances" }]), { name: serviceName, path: `/${categoryPath}/repairs/${serviceSlug}` }, { name: `${loaderData.brand} ${serviceName.toLowerCase()}`, path: loaderData.path }],
      entities: [repairServiceSchema({ name: `Independent ${loaderData.brand} ${serviceName}`, intro: loaderData.intro }, loaderData.path)] });
  },
  component: BrandRepair,
});
function BrandRepair() {
  const page = Route.useLoaderData();
  return <RepairBrandPage page={page} />;
}
