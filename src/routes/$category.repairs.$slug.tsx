import { createFileRoute, notFound, redirect } from "@tanstack/react-router";
import { REPAIR_PAGES, repairCategoryPath } from "@/content/repair-services";
import { legacyServiceFeature } from "@/content/legacy-feature-routes";

export const Route = createFileRoute("/$category/repairs/$slug")({
  beforeLoad: ({ params }) => {
    const service = REPAIR_PAGES.find(item => item.slug === params.slug && repairCategoryPath(item.category) === params.category);
    if (!service) throw notFound();
    throw redirect({ to: "/features/$slug", params: { slug: legacyServiceFeature(params.slug) }, statusCode: 301 });
  },
  head: () => ({ meta: [{ title: "Service management feature | Numunix" }, { name: "robots", content: "noindex, follow" }] }),
  component: () => null,
});
