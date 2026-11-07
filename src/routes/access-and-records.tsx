import { createFileRoute } from "@tanstack/react-router";
import { CompanyPage } from "@/components/numunix/CompanyPage";
import { SECURITY } from "@/content/company";
import { repairPageHead } from "@/content/repair-seo";

export const Route = createFileRoute("/access-and-records")({
  head: () => repairPageHead({ title: SECURITY.metaTitle, description: SECURITY.metaDescription, path: "/access-and-records", breadcrumbs: [{ name: "Access and records", path: "/access-and-records" }] }),
  component: () => <CompanyPage page={SECURITY} />,
});
