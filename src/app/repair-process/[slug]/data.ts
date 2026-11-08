import "server-only";
import { cache } from "react";
import { workflowBySlug } from "@/content/workflow";
import { repairPageHead } from "@/content/repair-seo";
import { notFound, permanentRedirect, redirect as temporaryRedirect } from "next/navigation";
import { resolveHref } from "@/lib/route-href";

type Context = { params: { slug: string } };
const beforeLoad = (_context: Context) => {};
const loader = ({ params }: Context) => {
  const stage = workflowBySlug(params.slug);
  if (!stage) throw notFound();
  return { stage };
};
const loadCachedPage = cache(async (paramsKey: string) => {
  const context: Context = { params: JSON.parse(paramsKey) };
  await beforeLoad(context);
  return await loader(context);
});
export async function loadPage(context: Context) {
  return loadCachedPage(JSON.stringify(context.params));
}
export const pageHead = ({
  loaderData,
  params,
}: {
  params: { slug: string };
  loaderData: Awaited<ReturnType<typeof loadPage>>;
}) => {
  const stage = loaderData?.stage;
  const title = stage
    ? `${stage.name}: Repair Process | Numunix`
    : "Repair Process | Numunix Repairs";
  const description = stage?.intro ?? "Explore the Numunix repair assessment and service process.";
  const path = `/repair-process/${params.slug}`;
  return repairPageHead({
    title,
    description,
    path,
    breadcrumbs: [
      { name: "Repair process", path: "/repair-process" },
      { name: stage?.name ?? params.slug, path },
    ],
  });
};
