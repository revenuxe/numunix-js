import "server-only";
import { cache } from "react";
import { REPAIR_PAGES, repairCategoryPath } from "@/content/repair-services";
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
  const service = REPAIR_PAGES.find((item) => item.slug === params.slug);
  if (!service) throw notFound();
  throw redirect({
    to: "/$category/repairs/$slug",
    params: { category: repairCategoryPath(service.category), slug: service.slug },
    statusCode: 301,
  });
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
