import "server-only";
import { cache } from "react";
import { SUPPORT } from "@/content/company";
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
    title: SUPPORT.metaTitle,
    description: SUPPORT.metaDescription,
    path: "/repair-aftercare",
    breadcrumbs: [
      {
        name: SUPPORT.metaTitle.split(" | ").at(0) ?? "Repair information",
        path: "/repair-aftercare",
      },
    ],
  });
