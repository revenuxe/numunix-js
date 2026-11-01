import { createFileRoute } from "@tanstack/react-router";
import { CompanyPage } from "@/components/numunix/CompanyPage";
import { PROCESS } from "@/content/company";
import { repairPageHead } from "@/content/repair-seo";

export const Route = createFileRoute("/repair-process")({
  head: () => repairPageHead({ title: PROCESS.metaTitle, description: PROCESS.metaDescription, path: "/repair-process", breadcrumbs: [{ name: PROCESS.metaTitle.split(" | ").at(0) ?? "Repair information", path: "/repair-process" }] }),
  component: () => <CompanyPage page={PROCESS} />,
});
