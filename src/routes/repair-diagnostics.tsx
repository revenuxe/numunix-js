import { createFileRoute } from "@tanstack/react-router";
import { CompanyPage } from "@/components/numunix/CompanyPage";
import { TECHNOLOGY } from "@/content/company";
import { repairPageHead } from "@/content/repair-seo";

export const Route = createFileRoute("/repair-diagnostics")({
  head: () => repairPageHead({ title: TECHNOLOGY.metaTitle, description: TECHNOLOGY.metaDescription, path: "/repair-diagnostics", breadcrumbs: [{ name: TECHNOLOGY.metaTitle.split(" | ").at(0) ?? "Repair information", path: "/repair-diagnostics" }] }),
  component: () => <CompanyPage page={TECHNOLOGY} />,
});
