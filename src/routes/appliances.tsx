import { createFileRoute } from "@tanstack/react-router";
import { RepairHomepage } from "@/components/numunix/RepairHomepage";
import { repairHomepageHead } from "@/content/repair-homepage-meta";

export const Route = createFileRoute("/appliances")({
  head: () => repairHomepageHead("appliances"),
  component: AppliancesHomepage,
});

function AppliancesHomepage() {
  return <RepairHomepage category="appliances" />;
}
