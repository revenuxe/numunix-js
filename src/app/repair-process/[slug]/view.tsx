import { WorkflowStagePage } from "@/components/numunix/WorkflowStagePage";
import { workflowBySlug } from "@/content/workflow";
import { repairPageHead } from "@/content/repair-seo";
type ViewProps = {
  loaderData: Awaited<ReturnType<typeof import("./data").loadPage>>;
  params: { slug: string };
  search: Record<string, string | undefined>;
};
function StageRoute({ loaderData, params, search }: ViewProps) {
  const { stage } = loaderData;
  return <WorkflowStagePage stage={stage} />;
}
export default function PageView(props: ViewProps) {
  return <StageRoute {...props} />;
}
