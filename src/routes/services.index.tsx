import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import Header from "@/components/numunix/Header";
import Footer from "@/components/numunix/Footer";
import Hero from "@/components/numunix/Hero";
import { Label, Heading, Accent, Reveal } from "@/components/numunix/primitives";
import { useCategory } from "@/components/numunix/category";
import { REPAIR_PAGES } from "@/content/repair-services";
import { REPAIR_SERVICES } from "@/content/homepage-repairs";
import { SITE_URL } from "@/content/site";

const TITLE = "Electronics & Appliance Repair Services in Bangalore | Numunix";
const DESC = "Explore mobile, laptop, CCTV, TV, washing machine, AC, refrigerator and electrical repair services. Review common faults, assessment checks and visit preparation.";
export const Route = createFileRoute("/services/")({
 head: () => ({meta: [{title:TITLE},{name:"description",content:DESC},{property:"og:title",content:TITLE},{property:"og:description",content:DESC},{property:"og:type",content:"website"},{property:"og:url",content:`${SITE_URL}/services`},{name:"twitter:card",content:"summary_large_image"}],links:[{rel:"canonical",href:`${SITE_URL}/services`}]}),
 component: FeaturesIndex,
});
function FeaturesIndex() {
 const category = useCategory()?.category ?? "electronics";
 const services = REPAIR_PAGES.filter(service => service.category === category);
 return <div className="bg-ink-900"><Header /><main>
  <Hero headline={category === "appliances" ? "Appliance repairs." : "Electronics repairs."} accent="Care that fits." intro={category === "appliances" ? "Washers, cooling, kitchen appliances and electrical essentials. Find the right assessment, understand the likely checks and prepare for a service visit." : "Phones, laptops, CCTV, TVs and everyday electronics. Explore common faults, the checks that matter and what to confirm before approving a repair."} primaryLabel="BROWSE REPAIRS" primaryHref="#list" secondaryLabel="REQUEST ASSESSMENT" secondaryHref="/contact" />
  <section className="border-b border-border bg-paper py-10 lg:py-14"><div className="shell grid gap-6 lg:grid-cols-[0.4fr_1.6fr] lg:gap-16"><Label tone="light">A CLEAR START</Label><div className="grid gap-7 sm:grid-cols-3 sm:gap-10">{[["01 / DESCRIBE","Share the model and symptoms."],["02 / ASSESS","Understand the fault and options."],["03 / APPROVE","Review the estimate before work."]].map(([label,title]) => <div key={label} className="border-t border-border pt-5"><span className="label-mono text-primary">{label}</span><p className="mt-3 text-[19px] text-navytext">{title}</p></div>)}</div></div></section>
  <section id="list" className="section-pad scroll-mt-24 bg-mist"><div className="shell"><Label tone="light">{category.toUpperCase()} / SERVICES</Label><Heading tone="light" className="mt-6">The right checks.<br /><Accent>The right next step.</Accent></Heading><div className="mt-12 divide-y divide-border border-y border-border">{services.map((service,i) => {
   const summary = REPAIR_SERVICES[category].find(item => item.kind === service.kind);
   return <Reveal key={service.slug} delay={i*40}><Link to="/repairs/$slug" params={{slug:service.slug}} className="group grid gap-3 py-7 transition-colors hover:bg-paper sm:grid-cols-[2rem_0.85fr_1.15fr_1.5rem] sm:items-start sm:gap-6 sm:px-4"><span className="label-mono text-primary">{String(i+1).padStart(2,"0")}</span><h2 className="text-[22px] font-light text-navytext lg:text-[26px]">{service.name}</h2><p className="text-base leading-relaxed text-muted-foreground">{summary?.body ?? `${service.faults.slice(0,2).join("; ")}. Share the model and symptoms to confirm the assessment scope.`}</p><ArrowRight size={18} className="hover-arrow text-primary" /></Link></Reveal>;
  })}</div></div></section>
 </main><Footer /></div>;
}
