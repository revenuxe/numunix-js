import { createFileRoute } from "@tanstack/react-router";
import { RepairHomepage } from "@/components/numunix/RepairHomepage";
import { repairHomepageHead } from "@/content/repair-homepage-meta";

export const Route = createFileRoute("/")({
  head: () => repairHomepageHead("electronics"),
  component: ElectronicsHomepage,
});

function ElectronicsHomepage() {
  return <RepairHomepage category="electronics" />;
}
