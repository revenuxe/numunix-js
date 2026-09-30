import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/numunix/LegalPage";
import { PRIVACY } from "@/content/company";
import { SITE_URL } from "@/content/site";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: PRIVACY.metaTitle },
      { name: "description", content: PRIVACY.metaDescription },
      { property: "og:title", content: PRIVACY.metaTitle },
      { property: "og:description", content: PRIVACY.metaDescription },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/privacy` },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/privacy` }],
  }),
  component: () => <LegalPage page={PRIVACY} />,
});
