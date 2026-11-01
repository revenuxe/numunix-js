import { createFileRoute, notFound, redirect } from "@tanstack/react-router";
import { RepairAudiencePage } from "@/components/numunix/RepairAudiencePage";
import { LEGACY_AUDIENCE_PATHS, REPAIR_AUDIENCE_PATHS, repairAudience } from "@/content/repair-audiences";
import { SITE_URL } from "@/content/site";
import { repairPageHead } from "@/content/repair-seo";
export const Route = createFileRoute("/who-we-serve/$slug")({
 beforeLoad: ({params}) => {
  const replacement=LEGACY_AUDIENCE_PATHS[params.slug];
  if (replacement) throw redirect({to:"/who-we-serve/$slug",params:{slug:replacement},statusCode:301});
  if (!REPAIR_AUDIENCE_PATHS.includes(params.slug)) throw notFound();
 },
 head: ({params}) => {
  const audience=repairAudience(params.slug,"electronics");
  const title=`Repair Care for ${audience?.name ?? "Shared Spaces"} | Numunix`;
  const description=`Electronics and appliance repair for ${audience?.name.toLowerCase() ?? "shared spaces"}. Plan equipment assessment, service access, clear estimates and function testing.`;
  const url=`${SITE_URL}/who-we-serve/${params.slug}`;
  return repairPageHead({ title, description, path: `/who-we-serve/${params.slug}`, breadcrumbs: [{ name: audience?.name ?? "Repair care", path: `/who-we-serve/${params.slug}` }] });
 },
 component: () => <RepairAudiencePage slug={Route.useParams().slug} />,
});
