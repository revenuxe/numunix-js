import { cctvBrandPage } from "@/content/cctv-brand-pages";
import { laptopBrandPage } from "@/content/laptop-brand-pages";
import { washerBrandPage } from "@/content/repair-brand-pages";
import { mobileBrandPage } from "@/content/mobile-brand-pages";
import { acBrandPage } from "@/content/ac-brand-pages";
import { fridgeBrandPage } from "@/content/fridge-brand-pages";
import { purifierBrandPage } from "@/content/purifier-brand-pages";
import { repairPageHead, repairServiceSchema } from "@/content/repair-seo";
import { RepairBrandPage } from "@/components/numunix/RepairBrandPage";
import { curateBrandRepair } from "@/content/curated-brand-repair";
type ViewProps = {
  loaderData: Awaited<ReturnType<typeof import("./data").loadPage>>;
  params: { category: string; slug: string; brand: string };
  search: Record<string, string | undefined>;
};
function BrandRepair({ loaderData, params, search }: ViewProps) {
  const page = loaderData;
  return <RepairBrandPage page={page} />;
}
export default function PageView(props: ViewProps) {
  return <BrandRepair {...props} />;
}
