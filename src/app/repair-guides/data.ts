import "server-only";
import { cache } from "react";
const TITLE = "Electronics & Appliance Repair Guides | Numunix";
const DESC =
  "Practical guides for phones, laptops and appliances. Learn what to prepare, how to review repair estimates and what to check at handover.";
import { ARTICLES } from "@/content/articles";
import { repairPageHead, repairItemList } from "@/content/repair-seo";
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
    path: "/repair-guides",
    type: "CollectionPage",
    breadcrumbs: [{ name: "Repair guides", path: "/repair-guides" }],
    entities: [
      repairItemList(
        ARTICLES.map((article) => ({
          name: article.title,
          path: `/repair-guides/${article.slug}`,
        })),
      ),
    ],
  });
