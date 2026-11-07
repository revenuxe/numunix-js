import { createFileRoute } from "@tanstack/react-router";
import { CompanyPage } from "@/components/numunix/CompanyPage";
import { SUPPORT } from "@/content/company";
import { repairPageHead } from "@/content/repair-seo";

export const Route = createFileRoute("/team-workspace")({
  head: () => repairPageHead({ title: SUPPORT.metaTitle, description: SUPPORT.metaDescription, path: "/team-workspace", breadcrumbs: [{ name: "Team workspace", path: "/team-workspace" }] }),
  component: () => <CompanyPage page={SUPPORT} />,
});
