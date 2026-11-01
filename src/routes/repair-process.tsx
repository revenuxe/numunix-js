import { createFileRoute } from "@tanstack/react-router";
import { CompanyPage } from "@/components/numunix/CompanyPage";
import { PROCESS } from "@/content/company";
import { SITE_URL } from "@/content/site";

export const Route = createFileRoute("/repair-process")({
  head: () => ({
    meta: [
      { title: PROCESS.metaTitle },
      { name: "description", content: PROCESS.metaDescription },
      { property: "og:title", content: PROCESS.metaTitle },
      { property: "og:description", content: PROCESS.metaDescription },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/repair-process` },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/repair-process` }],
  }),
  component: () => <CompanyPage page={PROCESS} />,
});
