import "server-only";
import { cache } from "react";
import { CONTACT } from "@/content/site";
import { z } from "zod";
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
    { title: "Repair Enquiry Received | Numunix" },
    { property: "og:title", content: "Repair Enquiry Received | Numunix" },
    {
      property: "og:description",
      content: "Your enquiry has been received. Here is what happens next with Numunix.",
    },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
    {
      name: "description",
      content: "Your enquiry has been received. Here is what happens next with Numunix.",
    },
    { name: "robots", content: "noindex, follow" },
  ],
});
