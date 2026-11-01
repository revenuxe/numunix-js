import { createFileRoute, notFound } from "@tanstack/react-router";
import { WorkflowStagePage } from "@/components/numunix/WorkflowStagePage";
import { workflowBySlug } from "@/content/workflow";
import { repairPageHead } from "@/content/repair-seo";

export const Route = createFileRoute("/repair-process_/$slug")({
  loader: ({ params }) => {
    const stage = workflowBySlug(params.slug);
    if (!stage) throw notFound();
    return { stage };
  },
  head: ({ loaderData, params }) => {
    const stage = loaderData?.stage;
    const title = stage
      ? `${stage.name}: Repair Process | Numunix`
      : "Repair Process | Numunix Repairs";
    const description = stage?.intro ?? "Explore the Numunix repair assessment and service process.";
    const path = `/repair-process/${params.slug}`;
    return repairPageHead({ title, description, path, breadcrumbs: [{ name: "Repair process", path: "/repair-process" }, { name: stage?.name ?? params.slug, path }] });
  },
  component: StageRoute,
});

function StageRoute() {
  const { stage } = Route.useLoaderData();
  return <WorkflowStagePage stage={stage} />;
}
