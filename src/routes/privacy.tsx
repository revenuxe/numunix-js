import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/numunix/LegalPage";
import { PRIVACY } from "@/content/company";
import { repairPageHead } from "@/content/repair-seo";

export const Route = createFileRoute("/privacy")({
  head: () => repairPageHead({ title: PRIVACY.metaTitle, description: PRIVACY.metaDescription, path: "/privacy", breadcrumbs: [{ name: PRIVACY.metaTitle.split(" | ").at(0) ?? "Repair information", path: "/privacy" }] }),
  component: () => <LegalPage page={PRIVACY} />,
});
