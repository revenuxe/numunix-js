import { createFileRoute } from "@tanstack/react-router";
import { CompanyPage } from "@/components/numunix/CompanyPage";
import { SECURITY } from "@/content/company";
import { repairPageHead } from "@/content/repair-seo";

export const Route = createFileRoute("/repair-safety")({
  head: () => repairPageHead({ title: SECURITY.metaTitle, description: SECURITY.metaDescription, path: "/repair-safety", breadcrumbs: [{ name: SECURITY.metaTitle.split(" | ")[0], path: "/repair-safety" }] }),
  component: () => <CompanyPage page={SECURITY} />,
});
