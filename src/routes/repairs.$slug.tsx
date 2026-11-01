import { createFileRoute, notFound, redirect } from "@tanstack/react-router";
import { REPAIR_PAGES, repairCategoryPath } from "@/content/repair-services";

export const Route = createFileRoute("/repairs/$slug")({
  beforeLoad: ({ params }) => {
    const service = REPAIR_PAGES.find(item => item.slug === params.slug);
    if (!service) throw notFound();
    throw redirect({ to: "/$category/repairs/$slug", params: { category: repairCategoryPath(service.category), slug: service.slug }, statusCode: 301 });
  },
  head: () => ({ meta: [{ name: "robots", content: "noindex, follow" }] }),
});