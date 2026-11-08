import { RepairHomepage } from "@/components/numunix/RepairHomepage";
import { repairHomepageHead } from "@/content/repair-homepage-meta";
type ViewProps = {
  loaderData: undefined;
  params: Record<string, never>;
  search: Record<string, string | undefined>;
};
function ElectronicsHomepage({ loaderData, params, search }: ViewProps) {
  return <RepairHomepage category="electronics" />;
}
export default function PageView(props: ViewProps) {
  return <ElectronicsHomepage {...props} />;
}
