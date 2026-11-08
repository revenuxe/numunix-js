import { createFileRoute, notFound, redirect } from "@tanstack/react-router";
import { LEGACY_REPAIR_STAGES } from "@/content/repair-navigation";
import { workflowBySlug } from "@/content/workflow";
export const Route = createFileRoute("/approach_/$slug")({
  beforeLoad: ({ params }) => {
    const slug = LEGACY_REPAIR_STAGES[params.slug] ?? params.slug;
    if (!workflowBySlug(slug)) throw notFound();
    throw redirect({ to: "/repair-process/$slug", params: { slug }, statusCode: 301 });
  },
  head: () => ({ meta: [{ name: "robots", content: "noindex, follow" }] }),
});
