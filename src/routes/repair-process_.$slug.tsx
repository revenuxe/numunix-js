import { createFileRoute, notFound } from "@tanstack/react-router";
import { WorkflowStagePage } from "@/components/numunix/WorkflowStagePage";
import { workflowBySlug } from "@/content/workflow";
import { SITE_URL } from "@/content/site";

export const Route = createFileRoute("/repair-process_/$slug")({
  loader: ({ params }) => {
    const stage = workflowBySlug(params.slug);
    if (!stage) throw notFound();
    return { stage };
  },
  head: ({ loaderData, params }) => {
    const stage = loaderData?.stage;
    const title = stage
      ? `${stage.name}: Repair Process | Numunix`
      : "Repair Process | Numunix Repairs";
    const description = stage?.intro ?? "Explore the Numunix repair assessment and service process.";
    const url = `${SITE_URL}/repair-process/${params.slug}`;
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
        { name: "twitter:card", content: "summary_large_image" },
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
                name: "Repair process",
                item: `${SITE_URL}/repair-process`,
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
