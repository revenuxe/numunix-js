import { createFileRoute } from "@tanstack/react-router";
import { CompanyPage } from "@/components/numunix/CompanyPage";
import { TECHNOLOGY } from "@/content/company";
import { SITE_URL } from "@/content/site";

export const Route = createFileRoute("/repair-diagnostics")({
  head: () => ({
    meta: [
      { title: TECHNOLOGY.metaTitle },
      { name: "description", content: TECHNOLOGY.metaDescription },
      { property: "og:title", content: TECHNOLOGY.metaTitle },
      { property: "og:description", content: TECHNOLOGY.metaDescription },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/repair-diagnostics` },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/repair-diagnostics` }],
  }),
  component: () => <CompanyPage page={TECHNOLOGY} />,
});
