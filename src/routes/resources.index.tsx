import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Clock } from "lucide-react";
import Header from "@/components/numunix/Header";
import Footer from "@/components/numunix/Footer";
import Hero from "@/components/numunix/Hero";
import { Heading, Accent, Reveal } from "@/components/numunix/primitives";
import { ARTICLES } from "@/content/articles";
import { repairItemList, repairPageHead } from "@/content/repair-seo";

const TITLE = "Service Management Resources | Numunix";
const DESCRIPTION = "Playbooks for service enquiries, bookings, technician assignments, job tracking and invoicing.";

export const Route = createFileRoute("/resources/")({
  head: () => repairPageHead({ title: TITLE, description: DESCRIPTION, path: "/resources", type: "CollectionPage", breadcrumbs: [{ name: "Resources", path: "/resources" }], entities: [repairItemList(ARTICLES.map(article => ({ name: article.title, path: `/resources/${article.slug}` })))] }),
  component: ResourcesPage,
});

function ResourcesPage() {
  return <div className="bg-[#05070c]"><Header/><main><Hero headline="Service management." accent="Clearer daily workflows." intro="Practical playbooks for organizing enquiries, bookings, technicians, jobs and billing across a service team." primaryLabel="BROWSE PLAYBOOKS" primaryHref="#list" secondaryLabel="EXPLORE FEATURES" secondaryHref="/features"/><section id="list" className="section-pad bg-[#f1f5f9]"><div className="shell"><Heading tone="light" className="max-w-[18ch]">Build a consistent <Accent>service workflow.</Accent></Heading><div className="mt-12 grid gap-5 md:grid-cols-2">{ARTICLES.map((article,index)=><Reveal key={article.slug} delay={index*50}><Link to="/resources/$slug" params={{slug:article.slug}} className="group flex h-full flex-col rounded-[22px] border border-[#dbe5f2] bg-white p-7 transition-all hover:-translate-y-1 hover:border-[#9ab6e0] hover:shadow-[0_25px_65px_-42px_rgba(16,42,99,0.5)] sm:p-8"><div className="flex items-center justify-between gap-3"><span className="text-[12px] font-medium text-[#1747b8]">{article.category}</span><span className="flex items-center gap-1.5 text-[12px] text-[#8190aa]"><Clock size={13}/>{article.readTime}</span></div><h2 className="mt-5 text-[22px] font-medium leading-snug tracking-[-0.02em] text-[#102a63]">{article.title}</h2><p className="mt-3 flex-1 text-[15px] leading-relaxed text-[#5d76a3]">{article.excerpt}</p><span className="mt-7 inline-flex items-center gap-2 text-[13px] font-medium text-[#1747b8]">READ PLAYBOOK<ArrowRight size={15} className="transition-transform group-hover:translate-x-1"/></span></Link></Reveal>)}</div></div></section></main><Footer/></div>;
}
