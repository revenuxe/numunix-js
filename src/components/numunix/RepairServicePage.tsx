import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowUpRight, Check, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { REPAIR_PAGES, repairCategoryPath, type RepairService } from "@/content/repair-services";
import Header from "./Header";
import Footer from "./Footer";
import Hero from "./Hero";
import { DeviceVisual } from "./RepairVisual";
import { ContactForm } from "./ContactForm";
import { Label, Heading, Accent, Reveal } from "./primitives";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { CONTACT } from "@/content/site";
import { RepairCallback } from "./RepairCallback";
import { WashingMachineBrands } from "./WashingMachineBrands";

export function RepairServicePage({ service }: { service: RepairService }) {
 const [brandSelection, setBrandSelection] = useState<{ brand: string }>();
 const related = REPAIR_PAGES.filter(item => item.category === service.category && item.slug !== service.slug).slice(0, 3);
 return <>
  <div className="bg-ink-900">
   <Header />
   <main>
    <Hero headline={service.headline} accent={service.accent} intro={service.intro} primaryLabel="BOOK A REPAIR" primaryHref="#enquiry" secondaryLabel="BOOK ON WHATSAPP" secondaryIcon={<WhatsAppIcon />} secondaryHref={`${CONTACT.whatsappHref.split("?")[0]}?text=${encodeURIComponent(`Hi Numunix, I’d like to book ${service.name.toLowerCase()}. Model: Issue: Location: `)}`} />
    <RepairCallback service={service.name} />
    <section id="assessment" className="section-pad scroll-mt-24 bg-paper">
     <div className="shell grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
      <Reveal ssrVisible><Label tone="light">{service.name.toUpperCase()}</Label><Heading tone="light" className="mt-6">Start with the fault.<br /><Accent>Not a guess.</Accent></Heading><p className="mt-6 max-w-[52ch] text-base leading-relaxed text-mutedtext">An issue can have more than one cause. Share what happened, how often it happens and any previous repairs. The assessment helps define which work is useful and which parts, if any, need replacing.</p></Reveal>
      <Reveal ssrVisible><div className="repair-visual"><div className="repair-visual-top"><span>{service.name} / assessment</span><span className="repair-status">ILLUSTRATIVE</span></div><DeviceVisual kind={service.kind} /><div className="repair-checks">{service.checks.map(check => <div key={check}><span>{check}</span><Check size={14} /></div>)}</div></div></Reveal>
     </div>
     <div className="shell mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{service.faults.map((fault,i) => <article key={fault} className="rounded-lg border border-border bg-card p-6"><span className="font-mono text-xs text-primary">0{i+1} / COMMON FAULT</span><h3 className="mt-5 text-lg leading-snug text-navytext">{fault}</h3></article>)}</div>
    </section>
    {service.slug === "washing-machine-repair" && <WashingMachineBrands onSelect={brand => setBrandSelection({ brand })} />}
    <section className="section-pad bg-ink-800 text-primary-foreground"><div className="shell"><Label>THE REPAIR JOURNEY</Label><Heading className="mt-6">Clear steps.<br /><Accent>Informed decisions.</Accent></Heading><div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">{[
     ["Describe", "Share the model, issue and any damage or previous work."],
     ["Assess", "Review the diagnosis, feasibility and any further checks needed."],
     ["Approve", "Confirm labour, parts, exclusions and the estimate before work begins."],
     ["Check", "Review the repaired functions and any aftercare or warranty terms."],
    ].map(([title,body],i) => <div key={title} className="border-t border-primary-foreground/20 pt-6"><span className="font-mono text-xs text-electric">0{i+1}</span><h3 className="mt-5 text-2xl font-light">{title}</h3><p className="mt-4 text-sm leading-relaxed text-primary-foreground/65">{body}</p></div>)}</div></div></section>
    <section className="section-pad bg-mist"><div className="shell grid gap-12 lg:grid-cols-2 lg:gap-20"><div><Label tone="light">BEFORE THE VISIT</Label><Heading tone="light" className="mt-6">A little preparation.<br /><Accent>A clearer assessment.</Accent></Heading><ul className="mt-8 space-y-5">{service.preparation.map(item => <li key={item} className="flex gap-3 text-base leading-relaxed text-navytext"><Check className="mt-1 size-4 shrink-0 text-primary" />{item}</li>)}</ul></div><div><Label tone="light">WHAT TO CONFIRM</Label>{[
     ["How much will the repair cost?", "The model, fault and parts requirements determine the estimate. Confirm any inspection or visit charges, labour and parts before approving work."],
     ["Can everything be repaired on site?", "Some checks can happen where the item is installed. Board work, storage recovery or specialist testing may need a workshop. Confirm the arrangement before booking."],
     ["How long will it take?", "Timing depends on diagnosis, parts availability and the tests required. Ask for an expected timeframe after assessment rather than relying on a fixed promise."],
     ["What if replacement is a better option?", "Ask about repair feasibility and the likely benefit. If the repair is not practical, discuss replacement options before spending on parts."],
    ].map(([q,a]) => <details key={q} className="group border-b border-border py-6"><summary className="flex cursor-pointer list-none justify-between gap-4 text-lg text-navytext">{q}<ChevronDown className="size-5 shrink-0 text-primary transition-transform group-open:rotate-180" /></summary><p className="mt-4 text-sm leading-relaxed text-mutedtext">{a}</p></details>)}</div></div></section>
    <section id="enquiry" className="section-pad scroll-mt-24 bg-paper"><div className="shell grid items-start gap-12 lg:grid-cols-2 lg:gap-20"><div><Label tone="light">REQUEST AN ASSESSMENT</Label><Heading tone="light" className="mt-6">Tell us the issue.<br /><Accent>Let’s take a look.</Accent></Heading><p className="mt-6 max-w-[46ch] text-base leading-relaxed text-mutedtext">Request {service.name.toLowerCase()} with the model, fault and preferred timing. Share enough detail to scope the next conversation.</p></div><ContactForm brandSelection={service.slug === "washing-machine-repair" ? brandSelection : undefined} initialService={service.name} initialDescription={`Service: ${service.name}\nModel: \nIssue: `} /></div></section>
    <section className="section-pad bg-mist"><div className="shell"><Label tone="light">RELATED REPAIRS</Label><div className="mt-8 grid gap-4 md:grid-cols-3">{related.map(item => <Button key={item.slug} asChild variant="outline" className="h-auto min-h-20 justify-between whitespace-normal bg-card p-6 text-left text-navytext"><Link to="/$category/repairs/$slug" params={{category:repairCategoryPath(item.category),slug:item.slug}}>{item.name}<ArrowUpRight className="shrink-0 text-primary" /></Link></Button>)}</div></div></section>
   </main>
   <Footer />
  </div>
 </>;
}
