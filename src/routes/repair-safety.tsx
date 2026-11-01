import { createFileRoute } from "@tanstack/react-router";
import { CompanyPage } from "@/components/numunix/CompanyPage";
import { SECURITY } from "@/content/company";
import { SITE_URL } from "@/content/site";

export const Route = createFileRoute("/repair-safety")({
  head: () => ({
    meta: [
      { title: SECURITY.metaTitle },
      { name: "description", content: SECURITY.metaDescription },
      { property: "og:title", content: SECURITY.metaTitle },
      { property: "og:description", content: SECURITY.metaDescription },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/repair-safety` },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/repair-safety` }],
  }),
  component: () => <CompanyPage page={SECURITY} />,
});
