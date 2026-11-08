import "server-only";
import { cache } from "react";
import { PROCESS } from "@/content/company";
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
    title: PROCESS.metaTitle,
    description: PROCESS.metaDescription,
    path: "/repair-process",
    breadcrumbs: [
      {
        name: PROCESS.metaTitle.split(" | ").at(0) ?? "Repair information",
        path: "/repair-process",
      },
    ],
  });
