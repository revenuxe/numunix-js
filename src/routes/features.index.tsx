import { createFileRoute } from "@tanstack/react-router";
import { ServiceManagementIndexPage } from "@/components/numunix/ServiceManagementPages";
import { SERVICE_MANAGEMENT_FEATURES } from "@/content/service-management";
import { repairItemList, repairPageHead } from "@/content/repair-seo";

const TITLE = "Service Management Software Features | Numunix";
const DESCRIPTION = "Explore service-management tools for enquiries, bookings, customers, technician assignments, jobs and invoicing in one workspace.";

export const Route = createFileRoute("/features/")({
  head: () => repairPageHead({ title: TITLE, description: DESCRIPTION, path: "/features", type: "CollectionPage", breadcrumbs: [{ name: "Features", path: "/features" }], entities: [repairItemList(SERVICE_MANAGEMENT_FEATURES.filter(feature => !feature.planned).map(feature => ({ name: feature.nav, path: `/features/${feature.slug}` })))] }),
  component: ServiceManagementIndexPage,
});
