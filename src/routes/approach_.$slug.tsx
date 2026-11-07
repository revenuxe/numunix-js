import { createFileRoute, notFound, redirect } from "@tanstack/react-router";
import { LEGACY_REPAIR_STAGES } from "@/content/repair-navigation";
import { workflowBySlug } from "@/content/workflow";
import { FEATURE_BY_LEGACY_STAGE } from "@/content/legacy-feature-routes";
export const Route = createFileRoute("/approach_/$slug")({
  beforeLoad: ({ params }) => {
    const slug = LEGACY_REPAIR_STAGES[params.slug] ?? params.slug;
    if (!workflowBySlug(slug)) throw notFound();
    throw redirect({ to: "/features/$slug", params: { slug: FEATURE_BY_LEGACY_STAGE[slug] ?? "jobs" }, statusCode: 301 });
  },
  head: () => ({ meta: [{ name: "robots", content: "noindex, follow" }] }),
});
