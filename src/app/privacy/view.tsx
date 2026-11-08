import { LegalPage } from "@/components/numunix/LegalPage";
import { PRIVACY } from "@/content/company";
import { repairPageHead } from "@/content/repair-seo";
type ViewProps = {
  loaderData: undefined;
  params: Record<string, never>;
  search: Record<string, string | undefined>;
};

export default function PageView(props: ViewProps) {
  const { params } = props;
  const Component = () => <LegalPage page={PRIVACY} />;
  return <Component />;
}
