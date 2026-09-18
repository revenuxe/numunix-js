import { createFileRoute, notFound } from "@tanstack/react-router";
import FeaturePage from "@/components/numunix/FeaturePage";
import { featureBySlug } from "@/content/features";

export const Route = createFileRoute("/features/$slug")({
  loader: ({ params }) => {
    const feature = featureBySlug(params.slug);
    if (!feature) throw notFound();
    return { feature };
  },
  head: ({ params, loaderData }) => {
    const f = loaderData?.feature;
    const title = f?.metaTitle ?? "Feature — Numunix";
    const desc = f?.metaDescription ?? "Numunix feature.";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `/features/${params.slug}` },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: `/features/${params.slug}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Features", item: "/features" },
              {
                "@type": "ListItem",
                position: 2,
                name: f?.name ?? params.slug,
                item: `/features/${params.slug}`,
              },
            ],
          }),
        },
      ],
    };
  },
  component: Page,
});

function Page() {
  const { feature } = Route.useLoaderData();
  return <FeaturePage feature={feature} />;
}
