import { createFileRoute, notFound, redirect } from "@tanstack/react-router";
import { LEGACY_ARTICLE_PATHS } from "@/content/repair-legacy";
import { articleBySlug } from "@/content/articles";
export const Route = createFileRoute("/articles/$slug")({
  beforeLoad: ({ params }) => {
    const slug = LEGACY_ARTICLE_PATHS[params.slug] ?? params.slug;
    if (!articleBySlug(slug)) throw notFound();
    throw redirect({ to: "/repair-guides/$slug", params: { slug }, statusCode: 301 });
  },
  head: () => ({ meta: [{ name: "robots", content: "noindex, follow" }] }),
});
