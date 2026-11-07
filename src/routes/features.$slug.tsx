import { createFileRoute, notFound } from "@tanstack/react-router";
import { ServiceManagementFeaturePage } from "@/components/numunix/ServiceManagementPages";
import { serviceManagementFeature } from "@/content/service-management";
import { repairPageHead } from "@/content/repair-seo";
import { SITE_URL } from "@/content/site";

export const Route = createFileRoute("/features/$slug")({
  loader: ({ params }) => {
    const feature = serviceManagementFeature(params.slug);
    if (!feature) throw notFound();
    return feature;
  },
  head: ({ loaderData }) => {
    const feature = loaderData;
    if (!feature) return { meta: [{ title: "Feature unavailable | Numunix" }, { name: "robots", content: "noindex" }] };
    const pageHead = repairPageHead({
      title: feature.metaTitle,
      description: feature.metaDescription,
      path: `/features/${feature.slug}`,
      breadcrumbs: [{ name: "Features", path: "/features" }, { name: feature.nav, path: `/features/${feature.slug}` }],
      entities: [{ "@type": "SoftwareApplication", "@id": `${SITE_URL}/#service-management-software`, name: "Numunix Service Management", applicationCategory: "BusinessApplication" }],
    });
    return feature.planned ? { ...pageHead, meta: [...pageHead.meta, { name: "robots", content: "noindex, follow" }] } : pageHead;
  },
  component: FeaturePage,
});

function FeaturePage() {
  return <ServiceManagementFeaturePage feature={Route.useLoaderData()} />;
}
