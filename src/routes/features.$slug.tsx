import { createFileRoute, notFound } from "@tanstack/react-router";
import FeaturePage from "@/components/numunix/FeaturePage";
import { featureBySlug } from "@/content/features";
import { SITE_URL } from "@/content/site";

export const Route = createFileRoute("/features/$slug")({
  loader: ({ params }) => {
    const feature = featureBySlug(params.slug);
    if (!feature) throw notFound();
    return { feature };
  },
  head: ({ params, loaderData }) => {
    const f = loaderData?.feature;
    const title = f?.metaTitle ?? "Service — Numunix";
    const desc = f?.metaDescription ?? "Numunix digital product development services.";
    const pageUrl = `${SITE_URL}/features/${f?.slug ?? params.slug}`;
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "article" },
        { property: "og:url", content: pageUrl },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: pageUrl }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Services", item: `${SITE_URL}/features` },
              {
                "@type": "ListItem",
                position: 2,
                name: f?.name ?? params.slug,
                item: pageUrl,
              },
            ],
          }),
        },
        // Service schema — helps Google understand what this page offers
        ...(f
          ? [
              {
                type: "application/ld+json",
                children: JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "Service",
                  name: f.name,
                  description: desc,
                  url: pageUrl,
                  provider: {
                    "@type": "Organization",
                    name: "Numunix",
                    url: SITE_URL,
                  },
                }),
              },
            ]
          : []),
        // FAQPage schema — enables rich FAQ snippets in Google SERPs
        ...(f?.faq?.length
          ? [
              {
                type: "application/ld+json",
                children: JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "FAQPage",
                  mainEntity: f.faq.map((item) => ({
                    "@type": "Question",
                    name: item.q,
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: item.a,
                    },
                  })),
                }),
              },
            ]
          : []),
      ],
    };
  },
  component: Page,
});

function Page() {
  const { feature } = Route.useLoaderData();
  return <FeaturePage feature={feature} />;
}
