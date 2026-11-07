import { createFileRoute, notFound, redirect } from "@tanstack/react-router";
import { workflowBySlug } from "@/content/workflow";
import { FEATURE_BY_LEGACY_STAGE } from "@/content/legacy-feature-routes";

export const Route = createFileRoute("/repair-process_/$slug")({
  beforeLoad: ({ params }) => {
    if (!workflowBySlug(params.slug)) throw notFound();
    const slug = FEATURE_BY_LEGACY_STAGE[params.slug] ?? "jobs";
    throw redirect({ to: "/features/$slug", params: { slug }, statusCode: 301 });
  },
  head: () => ({ meta: [{ title: "Service workflow feature | Numunix" }, { name: "robots", content: "noindex, follow" }] }),
  component: () => null,
});
