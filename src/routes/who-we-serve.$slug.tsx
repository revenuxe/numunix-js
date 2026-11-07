import { createFileRoute, notFound, redirect } from "@tanstack/react-router";

const LEGACY_AUDIENCE_ROUTES: Record<string, string> = {
  homes: "service-business-owners",
  offices: "operations-managers",
  retail: "customer-support-teams",
  education: "booking-coordinators",
  hospitality: "field-technicians",
  clinics: "service-managers",
  warehouses: "billing-teams",
  communities: "growing-service-teams",
};

export const Route = createFileRoute("/who-we-serve/$slug")({
  beforeLoad: ({ params }) => {
    const replacement = LEGACY_AUDIENCE_ROUTES[params.slug];
    if (!replacement) throw notFound();
    throw redirect({ to: "/industries/$slug", params: { slug: replacement }, statusCode: 301 });
  },
  head: () => ({ meta: [{ name: "robots", content: "noindex, follow" }] }),
  component: () => null,
});
