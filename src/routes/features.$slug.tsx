import { createFileRoute, notFound, redirect } from "@tanstack/react-router";
import { LEGACY_SERVICE_SLUGS } from "@/content/repair-legacy";
import { REPAIR_PAGES } from "@/content/repair-services";

export const Route = createFileRoute("/services/$slug")({
  beforeLoad: ({ params }) => {
    if (REPAIR_PAGES.some(service => service.slug === params.slug)) throw redirect({ to: "/repairs/$slug", params: {slug: params.slug}, statusCode: 301 });
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
