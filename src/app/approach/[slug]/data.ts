import "server-only";
import { cache } from "react";
import { LEGACY_REPAIR_STAGES } from "@/content/repair-navigation";
import { workflowBySlug } from "@/content/workflow";
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
type Context = { params: { slug: string } };
const beforeLoad = ({ params }: Context) => {
  const slug = LEGACY_REPAIR_STAGES[params.slug] ?? params.slug;
  if (!workflowBySlug(slug)) throw notFound();
  throw redirect({ to: "/repair-process/$slug", params: { slug }, statusCode: 301 });
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
  params: { slug: string };
  loaderData: Awaited<ReturnType<typeof loadPage>>;
}) => ({ meta: [{ name: "robots", content: "noindex, follow" }] });
