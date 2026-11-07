import { createFileRoute, notFound, redirect } from "@tanstack/react-router";
import { articleBySlug } from "@/content/articles";

const LEGACY_PLAYBOOKS: Record<string, string> = {
  "mobile-repair-before-you-book": "service-enquiry-management",
  "laptop-faults-repair-or-replace": "service-job-tracking",
  "appliance-repair-visit-checklist": "service-booking-workflow",
  "choosing-a-repair-service-in-bangalore": "technician-job-assignment",
  "understanding-repair-estimates": "service-invoice-management",
};

export const Route = createFileRoute("/repair-guides/$slug")({
  beforeLoad: ({ params }) => {
    const slug = LEGACY_PLAYBOOKS[params.slug] ?? (articleBySlug(params.slug) ? params.slug : undefined);
    if (!slug) throw notFound();
    throw redirect({ to: "/resources/$slug", params: { slug }, statusCode: 301 });
  },
  head: () => ({ meta: [{ name: "robots", content: "noindex, follow" }] }),
  component: () => null,
});
