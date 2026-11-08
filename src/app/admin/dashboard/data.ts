import "server-only";
import { cache } from "react";
import { REPAIR_PAGES } from "@/content/repair-services";
import { repairLeadCategory } from "@/lib/repair-leads";
import { getSupabase } from "@/lib/supabase";
import {
  escapeLeadSearch,
  LEAD_STATUSES,
  STATUS_CLASSES,
  STATUS_LABELS,
  type Lead,
  type LeadStatus,
} from "@/lib/leads";
import { notFound, permanentRedirect, redirect as temporaryRedirect } from "next/navigation";
import { resolveHref } from "@/lib/route-href";

type Context = { params: Record<string, never> };
const beforeLoad = (_context: Context) => {};
const loader = (_context: Context) => undefined;
const loadCachedPage = cache(async (paramsKey: string) => {
  const context: Context = { params: JSON.parse(paramsKey) };
  await beforeLoad(context);
  return await loader(context);
});
export async function loadPage(context: Context) {
  return loadCachedPage(JSON.stringify(context.params));
}
export const pageHead = (_context: {
  params: Record<string, never>;
  loaderData: Awaited<ReturnType<typeof loadPage>>;
}) => ({
  meta: [
    { title: "Repair Lead Dashboard | Numunix" },
    { name: "description", content: "Private repair enquiry management for Numunix." },
    { property: "og:title", content: "Repair Lead Dashboard | Numunix" },
    { property: "og:description", content: "Private electronics and appliance repair leads." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
    { name: "robots", content: "noindex, nofollow" },
  ],
});
