import { RepairHomepage } from "@/components/numunix/RepairHomepage";
import { repairHomepageHead } from "@/content/repair-homepage-meta";
type ViewProps = {
  loaderData: undefined;
  params: Record<string, never>;
  search: Record<string, string | undefined>;
};
function AppliancesHomepage({ loaderData, params, search }: ViewProps) {
  return <RepairHomepage category="appliances" />;
}
export default function PageView(props: ViewProps) {
  return <AppliancesHomepage {...props} />;
}
