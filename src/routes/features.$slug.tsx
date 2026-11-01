import { createFileRoute, notFound, redirect } from "@tanstack/react-router";
import { LEGACY_SERVICE_SLUGS } from "@/content/repair-legacy";
import { REPAIR_PAGES, repairCategoryPath } from "@/content/repair-services";

export const Route = createFileRoute("/features/$slug")({
  beforeLoad: ({ params }) => {
    const service = REPAIR_PAGES.find(item => item.slug === params.slug);
    if (service) throw redirect({ to: "/$category/repairs/$slug", params: {category: repairCategoryPath(service.category), slug: service.slug}, statusCode: 301 });
    if (LEGACY_SERVICE_SLUGS.includes(params.slug)) throw redirect({ to: "/services", statusCode: 301 });
    throw notFound();
  },
  head: () => ({ meta: [
    {title: "Repair Services | Numunix"},
    {name: "description", content: "Explore Electronics and Appliances repair services from Numunix."},
    {property: "og:title", content: "Repair Services | Numunix"},
    {property: "og:description", content: "Find the right repair assessment for your device or appliance."},
    {property: "og:type", content: "website"},
    {name: "twitter:card", content: "summary_large_image"},
    {name: "robots", content: "noindex, follow"},
  ]}),
});
