import "server-only";
import { cache } from "react";
import {
  LEGACY_AUDIENCE_PATHS,
  REPAIR_AUDIENCE_PATHS,
  repairAudience,
} from "@/content/repair-audiences";
import { SITE_URL } from "@/content/site";
import { repairPageHead } from "@/content/repair-seo";
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
  const replacement = LEGACY_AUDIENCE_PATHS[params.slug];
  if (replacement)
    throw redirect({ to: "/who-we-serve/$slug", params: { slug: replacement }, statusCode: 301 });
  if (!REPAIR_AUDIENCE_PATHS.includes(params.slug)) throw notFound();
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
export const pageHead = ({
  params,
}: {
  params: { slug: string };
  loaderData: Awaited<ReturnType<typeof loadPage>>;
}) => {
  const audience = repairAudience(params.slug, "electronics");
  const title = `${audience?.guidance.headline ?? "Repair Care"} in Bangalore | Numunix`;
  const description = `Electronics and appliance repair for ${audience?.name.toLowerCase() ?? "shared spaces"}. Plan equipment assessment, service access, clear estimates and function testing.`;
  const url = `${SITE_URL}/who-we-serve/${params.slug}`;
  return repairPageHead({
    title,
    description,
    path: `/who-we-serve/${params.slug}`,
    breadcrumbs: [{ name: audience?.name ?? "Repair care", path: `/who-we-serve/${params.slug}` }],
  });
};
