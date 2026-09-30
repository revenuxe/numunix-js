import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/numunix/LegalPage";
import { TERMS } from "@/content/company";
import { SITE_URL } from "@/content/site";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: TERMS.metaTitle },
      { name: "description", content: TERMS.metaDescription },
      { property: "og:title", content: TERMS.metaTitle },
      { property: "og:description", content: TERMS.metaDescription },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/terms` },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/terms` }],
  }),
  component: () => <LegalPage page={TERMS} />,
});
