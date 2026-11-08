import { REPAIR_PAGES, repairCategoryPath, repairPageHref } from "@/content/repair-services";
import { MOBILE_REPAIR_PAGE } from "@/content/mobile-repair-page";
import { MOBILE_BRANDS } from "@/content/mobile-brands";
import { WASHING_MACHINE_PAGE } from "@/content/washing-machine-page";
import { RepairServicePage } from "@/components/numunix/RepairServicePage";
import { repairItemList, repairPageHead, repairServiceSchema } from "@/content/repair-seo";
import { REFRIGERATOR_BRANDS } from "@/content/refrigerator-brands";
type ViewProps = {
  loaderData: Awaited<ReturnType<typeof import("./data").loadPage>>;
  params: { category: string; slug: string };
  search: Record<string, string | undefined>;
};
function RepairDetail({ loaderData, params, search }: ViewProps) {
  const { service, hubContent } = loaderData;
  return <RepairServicePage service={service} hubContent={hubContent} />;
}
export default function PageView(props: ViewProps) {
  return <RepairDetail {...props} />;
}
