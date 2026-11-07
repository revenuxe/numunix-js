import { createFileRoute } from "@tanstack/react-router";
import { CompanyPage } from "@/components/numunix/CompanyPage";
import { TECHNOLOGY } from "@/content/company";
import { repairPageHead } from "@/content/repair-seo";

export const Route = createFileRoute("/operations")({
  head: () => repairPageHead({ title: TECHNOLOGY.metaTitle, description: TECHNOLOGY.metaDescription, path: "/operations", breadcrumbs: [{ name: "Operations dashboard", path: "/operations" }] }),
  component: () => <CompanyPage page={TECHNOLOGY} />,
});
