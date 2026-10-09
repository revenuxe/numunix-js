import { createFileRoute, notFound } from "@tanstack/react-router";
import IndustryPage from "@/components/numunix/IndustryPage";
import { industryLandingBySlug } from "@/content/industry-landings";
import { industrySeo, serializeIndustrySchema } from "@/content/industry-seo";
import { OG_IMAGE } from "@/content/site";

export const Route = createFileRoute("/industries/$slug")({
  loader: ({ params }) => {
    const page = industryLandingBySlug(params.slug);
    if (!page || !industrySeo(params.slug)) throw notFound();
    return { page };
  },
  head: ({ params }) => {
    const seo = industrySeo(params.slug);
    if (!seo)
      return {
        meta: [
          { title: "Industry not found | Numunix" },
          { name: "robots", content: "noindex, follow" },
        ],
      };
    return {
      meta: [
        { title: seo.title },
        { name: "description", content: seo.description },
        { property: "og:title", content: seo.title },
        { property: "og:description", content: seo.description },
        { property: "og:type", content: "website" },
        { property: "og:url", content: seo.url },
        { property: "og:site_name", content: "Numunix" },
        { property: "og:locale", content: "en_US" },
        { property: "og:image", content: OG_IMAGE },
        { property: "og:image:alt", content: "Numunix: software, apps, and digital products" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: seo.title },
        { name: "twitter:description", content: seo.description },
        { name: "twitter:image", content: OG_IMAGE },
        { name: "twitter:image:alt", content: "Numunix: software, apps, and digital products" },
      ],
      links: [{ rel: "canonical", href: seo.url }],
      scripts: [{ type: "application/ld+json", children: serializeIndustrySchema(seo.graph) }],
    };
  },
  component: Page,
});

function Page() {
  const { page } = Route.useLoaderData();
  return <IndustryPage page={page} />;
}
