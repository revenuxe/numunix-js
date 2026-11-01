import { createFileRoute, notFound, redirect } from "@tanstack/react-router";
import { LEGACY_AUDIENCE_PATHS, REPAIR_AUDIENCE_PATHS } from "@/content/repair-audiences";
export const Route = createFileRoute("/industries/$slug")({
  beforeLoad: ({ params }) => {
    const slug = LEGACY_AUDIENCE_PATHS[params.slug] ?? params.slug;
    if (!REPAIR_AUDIENCE_PATHS.includes(slug)) throw notFound();
    throw redirect({ to: "/who-we-serve/$slug", params: { slug }, statusCode: 301 });
  },
  head: () => ({ meta: [{ name: "robots", content: "noindex, follow" }] }),
});
