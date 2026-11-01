import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/numunix/LegalPage";
import { TERMS } from "@/content/company";
import { repairPageHead } from "@/content/repair-seo";

export const Route = createFileRoute("/terms")({
  head: () => repairPageHead({ title: TERMS.metaTitle, description: TERMS.metaDescription, path: "/terms", breadcrumbs: [{ name: TERMS.metaTitle.split(" | ").at(0) ?? "Repair information", path: "/terms" }] }),
  component: () => <LegalPage page={TERMS} />,
});
