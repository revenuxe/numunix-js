import { createFileRoute, notFound, redirect } from "@tanstack/react-router";
import { RepairAudiencePage } from "@/components/numunix/RepairAudiencePage";
import { LEGACY_AUDIENCE_PATHS, REPAIR_AUDIENCE_PATHS, repairAudience } from "@/content/repair-audiences";
import { SITE_URL } from "@/content/site";
export const Route = createFileRoute("/industries/$slug")({
 beforeLoad: ({params}) => {
  const replacement=LEGACY_AUDIENCE_PATHS[params.slug];
  if (replacement) throw redirect({to:"/industries/$slug",params:{slug:replacement},statusCode:301});
  if (!REPAIR_AUDIENCE_PATHS.includes(params.slug)) throw notFound();
 },
 head: ({params}) => {
  const audience=repairAudience(params.slug,"electronics");
  const title=`Repair Care for ${audience?.name ?? "Shared Spaces"} | Numunix`;
  const description=`Electronics and appliance repair for ${audience?.name.toLowerCase() ?? "shared spaces"}. Plan equipment assessment, service access, clear estimates and function testing.`;
  const url=`${SITE_URL}/industries/${params.slug}`;
  return {meta:[{title},{name:"description",content:description},{property:"og:title",content:title},{property:"og:description",content:description},{property:"og:type",content:"website"},{property:"og:url",content:url},{name:"twitter:card",content:"summary_large_image"}],links:[{rel:"canonical",href:url}]};
 },
 component: () => <RepairAudiencePage slug={Route.useParams().slug} />,
});
