import { createFileRoute, notFound, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/$category/repairs/$slug_/$brand")({
  beforeLoad: async ({ params }) => {
    const { category, slug, brand } = params;
    const candidates = await Promise.all([
      import("@/content/purifier-brand-pages").then(module => module.purifierBrandPage(category, slug, brand)),
      import("@/content/cctv-brand-pages").then(module => module.cctvBrandPage(category, slug, brand)),
      import("@/content/laptop-brand-pages").then(module => module.laptopBrandPage(category, slug, brand)),
      import("@/content/repair-brand-pages").then(module => module.washerBrandPage(category, slug, brand)),
      import("@/content/fridge-brand-pages").then(module => module.fridgeBrandPage(category, slug, brand)),
      import("@/content/ac-brand-pages").then(module => module.acBrandPage(category, slug, brand)),
      import("@/content/mobile-brand-pages").then(module => module.mobileBrandPage(category, slug, brand)),
    ]);
    if (!candidates.some(Boolean)) throw notFound();
    throw redirect({ to: "/features/$slug", params: { slug: "jobs" }, statusCode: 301 });
  },
  head: () => ({ meta: [{ title: "Service management feature | Numunix" }, { name: "robots", content: "noindex, follow" }] }),
  component: () => null,
});
