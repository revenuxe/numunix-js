import "server-only";
import { cache } from "react";
import { ensureSupabase } from "@/lib/supabase";
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
    { title: "Repair Team Login | Numunix" },
    { name: "description", content: "Private sign-in for Numunix repair enquiry management." },
    { property: "og:title", content: "Repair Team Login | Numunix" },
    { property: "og:description", content: "Private sign-in for the Numunix repair team." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
    { name: "robots", content: "noindex, nofollow" },
  ],
});
