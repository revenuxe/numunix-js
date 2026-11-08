import "server-only";
import { cache } from "react";

import { notFound, permanentRedirect, redirect as temporaryRedirect } from "next/navigation";
import { resolveHref } from "@/lib/route-href";
const redirect = ({
  to,
  params,
  statusCode,
}: {
  to: string;
  params?: Record<string, string>;
  statusCode?: number;
}) =>
  statusCode === 301
    ? permanentRedirect(resolveHref(to, params))
    : temporaryRedirect(resolveHref(to, params));
type Context = { params: Record<string, never> };
const beforeLoad = (_context: Context) => {
  throw redirect({ to: "/services", statusCode: 301 });
};
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
}) => ({ meta: [{ name: "robots", content: "noindex, follow" }] });
