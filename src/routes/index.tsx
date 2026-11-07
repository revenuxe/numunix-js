import { createFileRoute } from "@tanstack/react-router";
import { RepairHomepage } from "@/components/numunix/RepairHomepage";
import { homepageHead } from "@/content/repair-homepage-meta";

export const Route = createFileRoute("/")({
  head: homepageHead,
  component: ElectronicsHomepage,
});

function ElectronicsHomepage() {
  return <RepairHomepage />;
}
