import { RepairAudiencePage } from "@/components/numunix/RepairAudiencePage";
import {
  LEGACY_AUDIENCE_PATHS,
  REPAIR_AUDIENCE_PATHS,
  repairAudience,
} from "@/content/repair-audiences";
import { SITE_URL } from "@/content/site";
import { repairPageHead } from "@/content/repair-seo";
type ViewProps = {
  loaderData: undefined;
  params: { slug: string };
  search: Record<string, string | undefined>;
};

export default function PageView(props: ViewProps) {
  const { params } = props;
  const Component = () => <RepairAudiencePage slug={params.slug} />;
  return <Component />;
}
