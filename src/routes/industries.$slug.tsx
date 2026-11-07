import { createFileRoute, notFound } from "@tanstack/react-router";
import { ServiceManagementPersonaPage } from "@/components/numunix/ServiceManagementPersonaPage";
import { serviceManagementPersona } from "@/content/service-management-personas";
import { repairPageHead } from "@/content/repair-seo";

export const Route = createFileRoute("/industries/$slug")({
  loader: ({ params }) => {
    const persona = serviceManagementPersona(params.slug);
    if (!persona) throw notFound();
    return persona;
  },
  head: ({ loaderData }) => {
    const persona = loaderData;
    if (!persona) return { meta: [{ title: "Team page unavailable | Numunix" }, { name: "robots", content: "noindex" }] };
    return repairPageHead({ title: persona.metaTitle, description: persona.metaDescription, path: `/industries/${persona.slug}`, breadcrumbs: [{ name: "Teams", path: "/#industries" }, { name: persona.name, path: `/industries/${persona.slug}` }] });
  },
  component: PersonaPage,
});

function PersonaPage() {
  return <ServiceManagementPersonaPage persona={Route.useLoaderData()} />;
}
