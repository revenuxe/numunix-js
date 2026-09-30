import { createFileRoute, notFound } from "@tanstack/react-router";
import { WorkflowStagePage } from "@/components/numunix/WorkflowStagePage";
import { workflowBySlug } from "@/content/workflow";
import { SITE_URL } from "@/content/site";

export const Route = createFileRoute("/approach_/$slug")({
  loader: ({ params }) => {
    const stage = workflowBySlug(params.slug);
    if (!stage) throw notFound();
    return { stage };
  },
  head: ({ loaderData, params }) => {
    const stage = loaderData?.stage;
    const title = stage
      ? `${stage.name}: ${stage.phase.toLowerCase()} your product | Numunix`
      : "Product approach | Numunix";
    const description = stage?.intro ?? "Explore the Numunix product development approach.";
    const url = `${SITE_URL}/approach/${params.slug}`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:url", content: url },
        { property: "og:type", content: "website" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Our approach",
                item: `${SITE_URL}/approach`,
              },
              { "@type": "ListItem", position: 2, name: stage?.name ?? params.slug, item: url },
            ],
          }),
        },
      ],
    };
  },
  component: StageRoute,
});

function StageRoute() {
  const { stage } = Route.useLoaderData();
  return <WorkflowStagePage stage={stage} />;
}
