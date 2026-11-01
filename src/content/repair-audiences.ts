import { HOMEPAGE_REPAIR, REPAIR_SERVICES, type RepairCategory } from "./homepage-repairs";
export const REPAIR_AUDIENCE_PATHS = ["homes", "offices", "retail", "education", "hospitality", "clinics", "warehouses", "communities"];
export const LEGACY_AUDIENCE_PATHS: Record<string,string> = {"banking-financial-services":"offices",insurance:"offices","automotive-mobility":"warehouses","retail-e-commerce":"retail",edtech:"education","saas-enterprise-tech":"offices","travel-hospitality":"hospitality","government-psu":"communities"};
export function repairAudience(slug: string, category: RepairCategory) {
  const index = REPAIR_AUDIENCE_PATHS.indexOf(slug);
  const row = HOMEPAGE_REPAIR[category].audiences[index];
  if (!row) return undefined;
  return {index, name:row[0], intro:row[1], service:row[2], services:REPAIR_SERVICES[category]};
}