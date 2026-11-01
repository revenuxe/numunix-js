import { createFileRoute } from "@tanstack/react-router";
import { CompanyPage } from "@/components/numunix/CompanyPage";
import { SUPPORT } from "@/content/company";
import { SITE_URL } from "@/content/site";

export const Route = createFileRoute("/repair-aftercare")({
  head: () => ({
    meta: [
      { title: SUPPORT.metaTitle },
      { name: "description", content: SUPPORT.metaDescription },
      { property: "og:title", content: SUPPORT.metaTitle },
      { property: "og:description", content: SUPPORT.metaDescription },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/repair-aftercare` },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/repair-aftercare` }],
  }),
  component: () => <CompanyPage page={SUPPORT} />,
});
