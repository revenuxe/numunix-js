import "server-only";
import { cache } from "react";
const TITLE = "Contact Numunix Repairs in Bangalore | Location & Enquiries";
const DESC =
  "Contact Numunix for electronics and appliance repair enquiries. Share the model, fault and location to discuss assessment and service options.";
import { CONTACT, SITE_URL } from "@/content/site";
import { repairPageHead } from "@/content/repair-seo";
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
}) =>
  repairPageHead({
    title: TITLE,
    description: DESC,
    path: "/contact",
    type: "ContactPage",
    breadcrumbs: [{ name: "Repair enquiries", path: "/contact" }],
  });
