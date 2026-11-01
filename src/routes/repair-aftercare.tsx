import { createFileRoute } from "@tanstack/react-router";
import { CompanyPage } from "@/components/numunix/CompanyPage";
import { SUPPORT } from "@/content/company";
import { repairPageHead } from "@/content/repair-seo";

export const Route = createFileRoute("/repair-aftercare")({
  head: () => repairPageHead({ title: SUPPORT.metaTitle, description: SUPPORT.metaDescription, path: "/repair-aftercare", breadcrumbs: [{ name: SUPPORT.metaTitle.split(" | ")[0], path: "/repair-aftercare" }] }),
  component: () => <CompanyPage page={SUPPORT} />,
});
