import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Check, ChevronDown, Droplets, RotateCw, ShieldCheck, ClipboardList } from "lucide-react";
import { Button } from "@/components/ui/button";
import { type WasherBrandPage } from "@/content/repair-brand-pages";
import type { FridgeBrandPage } from "@/content/fridge-brand-pages";
import { REFRIGERATOR_BRANDS } from "@/content/refrigerator-brands";
import { CONTACT } from "@/content/site";
import Header from "./Header";
import Footer from "./Footer";
import Hero from "./Hero";
import { DeviceVisual } from "./RepairVisual";
import { ContactForm } from "./ContactForm";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { RepairCallback } from "./RepairCallback";
import { RepairBrandScope, RepairBrandDecisions } from "./RepairBrandEditorial";
import { FridgeRepairDetails } from "./FridgeRepairDetails";
import { Label, Heading, Accent, Reveal } from "./primitives";

export function RepairBrandPage({ page }: { page: WasherBrandPage | FridgeBrandPage }) {
  const isFridge = "guidance" in page;
  const appliance = isFridge ? "fridge" : "washing machine";
  const directorySlug = isFridge ? "refrigerator-repair" : "washing-machine-repair";
  const logo = isFridge ? `/brands/refrigerators/${REFRIGERATOR_BRANDS.find(brand => brand.name === page.brand)?.file}` : `/brands/washing-machines/${page.slug}.webp`;
  const whatsappHref = `${CONTACT.whatsappHref.split("?")[0]}?text=${encodeURIComponent(`Hi Numunix, I would like to book ${page.brand} ${appliance} repair. ${page.modelPrompt}: Issue / Error code: Location: `)}`;
  return <div className="bg-ink-900">
    <Header />
    <main>
      <Hero headline={`${page.brand} ${isFridge ? "Fridge" : "Washing Machine"}`} accent="Repair in Bangalore" intro={page.heroIntro} primaryLabel="BOOK A REPAIR" primaryHref="#enquiry" secondaryLabel="BOOK ON WHATSAPP" secondaryIcon={<WhatsAppIcon />} secondaryHref={whatsappHref} />
      <RepairCallback service={page.service} brand={page.brand} brandLogo={logo} />
      <section className="section-pad bg-paper">
        <div className="shell grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal ssrVisible><Label tone="light">{page.brand.toUpperCase()} {isFridge ? "FRIDGE" : "WASHING MACHINE"} SERVICE</Label><Heading tone="light" className="mt-6">Your model matters.<br /><Accent>So does the diagnosis.</Accent></Heading><p className="mt-6 text-base leading-relaxed text-mutedtext">{isFridge ? `A cooling change in your ${page.brand} fridge needs an assessment of the actual appliance, not a part guessed from the symptom. Describe the compartments, controls and fault history so the proposed work follows the findings.` : `A washer that stops halfway through a programme is not always a failed motor. Water supply, drainage, load balance and door locking can affect the same cycle. Numunix starts with your ${page.brand} model and the sequence of symptoms, rather than prescribing a part from a display message alone.`}</p><p className="mt-5 text-base leading-relaxed text-mutedtext">{page.modelIntro}</p></Reveal>
          <Reveal ssrVisible><div className="repair-visual"><div className="repair-visual-top"><span>{page.brand} {isFridge ? "fridge" : "washer"} / assessment</span><span className="repair-status">ILLUSTRATIVE</span></div><DeviceVisual kind={isFridge ? "fridge" : "washer"} /><div className="repair-checks">{page.checks.map(check => <div key={check}><span>{check}</span><Check size={14} /></div>)}</div></div></Reveal>
        </div>
      </section>
      <section className="section-pad bg-mist">
        <div className="shell"><Label tone="light">COMMON {page.brand.toUpperCase()} {isFridge ? "FRIDGE" : "WASHER"} FAULTS</Label><Heading tone="light" className="mt-6">What changed?<br /><Accent>Start with the symptom.</Accent></Heading>
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">{page.faults.map((fault, index) => <Reveal ssrVisible key={fault.title}><article className="h-full rounded-lg border border-border bg-card p-6 sm:p-8"><span className="font-mono text-xs text-primary">0{index + 1} / {fault.label}</span><h3 className="mt-5 text-xl text-navytext">{fault.title}</h3><p className="mt-4 text-sm leading-relaxed text-mutedtext">{fault.body}</p><Button asChild variant="link" className="mt-5 h-auto justify-start p-0 text-primary"><a href="#enquiry">Request assessment <ArrowUpRight size={16} /></a></Button></article></Reveal>)}</div>
        </div>
      </section>
      <RepairBrandScope page={page} whatsappHref={whatsappHref} />
      {isFridge && <FridgeRepairDetails page={page} whatsappHref={whatsappHref} />}
      <section className="section-pad bg-ink-800 text-primary-foreground">
        <div className="shell grid gap-12 lg:grid-cols-2 lg:gap-20"><div><Label>ERROR CODES, NOT GUESSWORK</Label><Heading className="mt-6">{page.diagnosticTitle}<br /><Accent>Check the context.</Accent></Heading><p className="mt-6 text-base leading-relaxed text-primary-foreground/70">{page.diagnosticBody}</p><p className="mt-5 text-base leading-relaxed text-primary-foreground/70">{isFridge ? "Do not chip ice with tools, remove electrical covers or attempt work on refrigerant pipework. Follow your exact model manual and leave internal inspection to a professional." : "Do not force a locked door or open the pump cover while the machine contains hot water. Follow your model manual. If you are unsure, leave draining and inspection to a professional."}</p><Button asChild variant="outline" className="mt-8 border-primary-foreground/30 bg-transparent text-primary-foreground"><a href={page.sources[0]?.href} target="_blank" rel="noopener noreferrer">{page.diagnosticLink} <ArrowUpRight size={16} /></a></Button></div>
          <div className="grid gap-0">{(isFridge ? [
            [Droplets, "Compartment observations", "Describe the fresh-food and freezer sections separately and include settings and visible ice or water."],
            [RotateCw, "Operating pattern", "Mention a new sound, a recurring warning or a change in operation and when it began."],
            [ShieldCheck, "Safe assessment", "Keep covers in place, avoid refrigerant pipework and do not handle wet electrical connections."],
          ] : [
            [Droplets, "Drainage first", "Explain whether water is left inside, whether the hose appears kinked and when the programme stops."],
            [RotateCw, "Cycle behaviour", "Tell us if washing works but spinning does not. Mention load size and any repeated interruption."],
            [ShieldCheck, "Safety before testing", "Stop using a leaking or electrically unsafe machine. Never handle plugs or switches with wet hands."],
          ]).map(([Icon, title, body]) => { const Symbol = Icon as typeof Droplets; return <div key={String(title)} className="flex gap-5 border-t border-primary-foreground/20 py-7"><Symbol className="mt-1 size-6 shrink-0 text-electric" /><div><h3 className="text-xl">{String(title)}</h3><p className="mt-3 text-sm leading-relaxed text-primary-foreground/70">{String(body)}</p></div></div>; })}</div>
        </div>
      </section>
      <section className="section-pad bg-paper"><div className="shell"><Label tone="light">FROM REQUEST TO FUNCTION CHECK</Label><Heading tone="light" className="mt-6">A clear repair plan.<br /><Accent>Your approval first.</Accent></Heading><div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">{[
        ["Share the details", `Send the ${page.brand} model, fault, display message and your location. Mention previous work and warranty status.`],
        ["Confirm assessment", "Agree the visit arrangements and any inspection charges. Diagnosis establishes repair feasibility and parts requirements."],
        ["Review the estimate", "Confirm proposed work, labour, part specifications and exclusions. Ask what evidence supports any replacement."],
        ["Check the result", isFridge ? "Discuss relevant cooling, control and door checks, observation guidance and any applicable written warranty terms." : "Review relevant fill, wash, drain and spin functions after the repair. Confirm aftercare and any applicable written warranty terms."],
      ].map(([title, body], index) => <div key={title} className="border-t border-border pt-6"><span className="font-mono text-xs text-primary">0{index + 1}</span><h3 className="mt-5 text-xl text-navytext">{title}</h3><p className="mt-4 text-sm leading-relaxed text-mutedtext">{body}</p></div>)}</div></div></section>
      <section className="section-pad border-t border-border bg-paper">
        <div className="shell">
          <Label tone="light">BEFORE YOU APPROVE A REPAIR</Label>
          <Heading tone="light" className="mt-6">Know the work.<br /><Accent>Know the estimate.</Accent></Heading>
          <p className="mt-6 max-w-[65ch] text-base leading-relaxed text-mutedtext">Keep your model details and the proposed work together. These questions help you discuss the assessment; the answers depend on your appliance and the fault found.</p>
          <div className="mt-10 grid gap-6 md:grid-cols-3">{page.estimateChecks.map(item => <article key={item.title} className="rounded-lg border border-border bg-card p-6 sm:p-8"><ClipboardList className="size-6 text-primary" aria-hidden="true" /><h3 className="mt-5 text-xl text-navytext">{item.title}</h3><p className="mt-4 text-sm leading-relaxed text-mutedtext">{item.body}</p></article>)}</div>
        </div>
      </section>
      <RepairBrandDecisions page={page} whatsappHref={whatsappHref} />
      <section className="section-pad bg-mist"><div className="shell grid gap-12 lg:grid-cols-2 lg:gap-20"><div><Label tone="light">BEFORE YOUR ASSESSMENT</Label><Heading tone="light" className="mt-6">A few useful details.<br /><Accent>A better starting point.</Accent></Heading><ul className="mt-8 space-y-5">{page.preparation.map(item => <li key={item} className="flex gap-3 text-base leading-relaxed text-mutedtext"><ClipboardList className="mt-1 size-5 shrink-0 text-primary" />{item}</li>)}</ul></div><div><Label tone="light">{page.brand.toUpperCase()} REPAIR QUESTIONS</Label>{page.faqs.map(([question, answer]) => <details key={question} className="group border-b border-border py-6"><summary className="flex cursor-pointer list-none justify-between gap-4 text-lg text-navytext">{question}<ChevronDown className="size-5 shrink-0 text-primary transition-transform group-open:rotate-180" /></summary><p className="mt-4 text-sm leading-relaxed text-mutedtext">{answer}</p></details>)}</div></div></section>
      <section id="enquiry" className="section-pad scroll-mt-24 bg-paper"><div className="shell grid items-start gap-12 lg:grid-cols-2 lg:gap-20"><div><Label tone="light">BOOK {page.brand.toUpperCase()} {isFridge ? "FRIDGE" : "WASHING MACHINE"} REPAIR</Label><Heading tone="light" className="mt-6">Tell us what stopped.<br /><Accent>Let’s take a look.</Accent></Heading><p className="mt-6 max-w-[46ch] text-base leading-relaxed text-mutedtext">Share your {page.brand} model, the issue and preferred timing. Our team can discuss assessment arrangements in Bangalore and what to confirm before approving work.</p><p className="mt-5 text-sm leading-relaxed text-mutedtext">Still covered by a manufacturer warranty? Start with {page.brand} official support to understand your options.</p><Button asChild variant="default" className="mt-8 whitespace-nowrap"><a href={whatsappHref}><WhatsAppIcon /> Book on WhatsApp</a></Button></div><ContactForm initialService={page.service} brandSelection={page.brandSelection} initialDescription={page.enquiryDescription} /></div></section>
      <section className="border-t border-border bg-mist py-10"><div className="shell grid gap-8 lg:grid-cols-2"><div><Label tone="light">MANUFACTURER REFERENCES</Label><p className="mt-4 text-sm leading-relaxed text-mutedtext">Troubleshooting references from {page.brand} India. Always use the manual for your exact appliance. {page.brand} is a trademark of its respective owner; its name identifies the equipment, not an affiliation with Numunix.</p><ul className="mt-4 space-y-3">{page.sources.map(source => <li key={source.href}><a className="text-sm text-primary underline underline-offset-4" href={source.href} target="_blank" rel="noopener noreferrer">{source.name}</a></li>)}</ul></div><div><Label tone="light">MORE REPAIR HELP</Label><div className="mt-4 flex flex-col items-start gap-3"><Button asChild variant="link" className="h-auto whitespace-normal p-0 text-left"><Link to="/$category/repairs/$slug" params={{ category: "appliances", slug: directorySlug }}>All {isFridge ? "fridge" : "washing machine"} repairs <ArrowUpRight size={16} /></Link></Button><Button asChild variant="link" className="h-auto whitespace-normal p-0 text-left"><Link to="/repair-guides/$slug" params={{ slug: "appliance-repair-visit-checklist" }}>Appliance repair visit checklist <ArrowUpRight size={16} /></Link></Button><Button asChild variant="link" className="h-auto p-0"><Link to="/repair-assessment">How assessment works <ArrowUpRight size={16} /></Link></Button></div></div></div></section>
    </main><Footer />
  </div>;
}
