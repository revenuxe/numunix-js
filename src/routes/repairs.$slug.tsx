import { createFileRoute, notFound } from "@tanstack/react-router";
import { REPAIR_PAGES } from "@/content/repair-services";
import { REPAIR_SITE_URL } from "@/content/repair-homepage-meta";
import { RepairServicePage } from "@/components/numunix/RepairServicePage";

export const Route = createFileRoute("/repairs/$slug")({
 loader: ({params}) => {
  const service = REPAIR_PAGES.find(item => item.slug === params.slug);
  if (!service) throw notFound();
  return {service};
 },
 head: ({loaderData,params}) => {
  const service = loaderData?.service;
  if (!service) return {meta:[{title:"Repair page unavailable | Numunix"},{name:"robots",content:"noindex"}]};
  const title = `${service.name} in Bangalore | Numunix`;
  const url = `${REPAIR_SITE_URL}/repairs/${params.slug}`;
  return {
   meta:[{title},{name:"description",content:service.intro},{property:"og:title",content:title},{property:"og:description",content:service.intro},{property:"og:type",content:"website"},{property:"og:url",content:url},{name:"twitter:card",content:"summary_large_image"}],
   links:[{rel:"canonical",href:url}],
   scripts:[{type:"application/ld+json",children:JSON.stringify({"@context":"https://schema.org","@type":"Service",name:service.name,description:service.intro,url,serviceType:service.name,areaServed:{"@type":"City",name:"Bangalore"},provider:{"@type":"Organization",name:"Numunix",url:REPAIR_SITE_URL}})}],
  };
 },
 component: RepairDetail,
});

function RepairDetail() {
 const {service} = Route.useLoaderData();
 return <RepairServicePage service={service} />;
}