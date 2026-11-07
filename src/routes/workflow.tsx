import { createFileRoute } from "@tanstack/react-router";
import { CompanyPage } from "@/components/numunix/CompanyPage";
import { PROCESS } from "@/content/company";
import { repairPageHead } from "@/content/repair-seo";

export const Route = createFileRoute("/workflow")({
  head: () => repairPageHead({ title: PROCESS.metaTitle, description: PROCESS.metaDescription, path: "/workflow", breadcrumbs: [{ name: "Workflow", path: "/workflow" }] }),
  component: () => <CompanyPage page={PROCESS} />,
});
