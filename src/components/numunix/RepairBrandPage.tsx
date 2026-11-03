import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Check, ChevronDown, Droplets, RotateCw, ShieldCheck, ClipboardList } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BOSCH_WASHER as page } from "@/content/repair-brand-pages";
import { CONTACT } from "@/content/site";
import Header from "./Header";
import Footer from "./Footer";
import Hero from "./Hero";
import { DeviceVisual } from "./RepairVisual";
import { ContactForm } from "./ContactForm";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { Label, Heading, Accent, Reveal } from "./primitives";

export function RepairBrandPage() {
  const whatsappHref = `${CONTACT.whatsappHref.split("?")[0]}?text=${encodeURIComponent("Hi Numunix, I’d like to book Bosch washing machine repair. E-Nr / Model: Issue / Error code: Location: ")}`;
  return <div className="bg-ink-900">
    <Header />
    <main>
      <Hero headline="Bosch washing machine." accent="Repair with clarity." eyebrow="INDEPENDENT REPAIR / BANGALORE" intro={page.intro} primaryLabel="BOOK A REPAIR" primaryHref="#enquiry" secondaryLabel="BOOK ON WHATSAPP" secondaryIcon={<WhatsAppIcon />} secondaryHref={whatsappHref} />
      <section className="border-b border-border bg-paper py-7">
        <div className="shell flex flex-wrap items-center justify-between gap-5">
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-sm text-mutedtext">
            <Link to="/appliances" className="hover:text-primary">Appliances</Link><span>/</span>
            <Link to="/$category/repairs/$slug" params={{ category: "appliances", slug: "washing-machine-repair" }} className="hover:text-primary">Washing machine repair</Link><span>/</span><span className="text-navytext">Bosch</span>
          </nav>
          <p className="text-sm text-mutedtext">Independent service. Not an authorized Bosch service center.</p>
        </div>
      </section>
      <section className="section-pad bg-paper">
        <div className="shell grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal ssrVisible><Label tone="light">BOSCH WASHING MACHINE SERVICE</Label><Heading tone="light" className="mt-6">Your model matters.<br /><Accent>So does the diagnosis.</Accent></Heading><p className="mt-6 text-base leading-relaxed text-mutedtext">A washer that stops halfway through a programme is not always a failed motor. Water supply, drainage, load balance and door locking can affect the same cycle. Numunix starts with your Bosch model and the sequence of symptoms, rather than prescribing a part from a display message alone.</p><p className="mt-5 text-base leading-relaxed text-mutedtext">Whether you have a front-load washer or a washer-dryer, send the E-Nr and any error code. Confirm that your model can be assessed, what the visit involves and whether specialist work or parts are needed.</p></Reveal>
          <Reveal ssrVisible><div className="repair-visual"><div className="repair-visual-top"><span>Bosch washer / assessment</span><span className="repair-status">ILLUSTRATIVE</span></div><DeviceVisual kind="washing" /><div className="repair-checks">{page.checks.map(check => <div key={check}><span>{check}</span><Check size={14} /></div>)}</div></div></Reveal>
        </div>
      </section>
      <section className="section-pad bg-mist">
        <div className="shell"><Label tone="light">COMMON BOSCH WASHER FAULTS</Label><Heading tone="light" className="mt-6">What changed?<br /><Accent>Start with the symptom.</Accent></Heading>
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">{page.faults.map((fault, index) => <Reveal ssrVisible key={fault.title}><article className="h-full rounded-lg border border-border bg-card p-6 sm:p-8"><span className="font-mono text-xs text-primary">0{index + 1} / {fault.label}</span><h3 className="mt-5 text-xl text-navytext">{fault.title}</h3><p className="mt-4 text-sm leading-relaxed text-mutedtext">{fault.body}</p><Button asChild variant="link" className="mt-5 h-auto justify-start p-0 text-primary"><a href="#enquiry">Request assessment <ArrowUpRight size={16} /></a></Button></article></Reveal>)}</div>
        </div>
      </section>
      <section className="section-pad bg-ink-800 text-primary-foreground">
        <div className="shell grid gap-12 lg:grid-cols-2 lg:gap-20"><div><Label>ERROR CODES, NOT GUESSWORK</Label><Heading className="mt-6">An E:18 message?<br /><Accent>Check the context.</Accent></Heading><p className="mt-6 text-base leading-relaxed text-primary-foreground/70">Bosch describes E:18, F:18 and d:02 as drainage-related messages. A blocked pump or kinked drain hose can be involved. Photograph the display and note whether water remains in the drum before requesting help.</p><p className="mt-5 text-base leading-relaxed text-primary-foreground/70">Do not force a locked door or open the pump cover while the machine contains hot water. Follow your model’s manual. If you are unsure, leave draining and inspection to a professional.</p><Button asChild variant="outline" className="mt-8 border-primary-foreground/30 bg-transparent text-primary-foreground"><a href={page.sources[0]?.href} target="_blank" rel="noopener noreferrer">Read Bosch’s E:18 guidance <ArrowUpRight size={16} /></a></Button></div>
          <div className="grid gap-0">{[
            [Droplets, "Drainage first", "Explain whether water is left inside, whether the hose appears kinked and when the programme stops."],
            [RotateCw, "Cycle behaviour", "Tell us if washing works but spinning does not. Mention load size and any repeated interruption."],
            [ShieldCheck, "Safety before testing", "Stop using a leaking or electrically unsafe machine. Never handle plugs or switches with wet hands."],
          ].map(([Icon, title, body]) => { const Symbol = Icon as typeof Droplets; return <div key={String(title)} className="flex gap-5 border-t border-primary-foreground/20 py-7"><Symbol className="mt-1 size-6 shrink-0 text-electric" /><div><h3 className="text-xl">{String(title)}</h3><p className="mt-3 text-sm leading-relaxed text-primary-foreground/70">{String(body)}</p></div></div>; })}</div>
        </div>
      </section>
      <section className="section-pad bg-paper"><div className="shell"><Label tone="light">FROM REQUEST TO FUNCTION CHECK</Label><Heading tone="light" className="mt-6">A clear repair plan.<br /><Accent>Your approval first.</Accent></Heading><div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">{[
        ["Share the details", "Send the Bosch model, fault, display message and your location. Mention previous work and warranty status."],
        ["Confirm assessment", "Agree the visit arrangements and any inspection charges. Diagnosis establishes repair feasibility and parts requirements."],
        ["Review the estimate", "Confirm proposed work, labour, part specifications and exclusions. Ask what evidence supports any replacement."],
        ["Check the result", "Review relevant fill, wash, drain and spin functions after the repair. Confirm aftercare and any applicable written warranty terms."],
      ].map(([title, body], index) => <div key={title} className="border-t border-border pt-6"><span className="font-mono text-xs text-primary">0{index + 1}</span><h3 className="mt-5 text-xl text-navytext">{title}</h3><p className="mt-4 text-sm leading-relaxed text-mutedtext">{body}</p></div>)}</div></div></section>
      <section className="section-pad bg-mist"><div className="shell grid gap-12 lg:grid-cols-2 lg:gap-20"><div><Label tone="light">BEFORE YOUR ASSESSMENT</Label><Heading tone="light" className="mt-6">A few useful details.<br /><Accent>A better starting point.</Accent></Heading><ul className="mt-8 space-y-5">{page.preparation.map(item => <li key={item} className="flex gap-3 text-base leading-relaxed text-mutedtext"><ClipboardList className="mt-1 size-5 shrink-0 text-primary" />{item}</li>)}</ul></div><div><Label tone="light">BOSCH REPAIR QUESTIONS</Label>{page.faqs.map(([question, answer]) => <details key={question} className="group border-b border-border py-6"><summary className="flex cursor-pointer list-none justify-between gap-4 text-lg text-navytext">{question}<ChevronDown className="size-5 shrink-0 text-primary transition-transform group-open:rotate-180" /></summary><p className="mt-4 text-sm leading-relaxed text-mutedtext">{answer}</p></details>)}</div></div></section>
      <section id="enquiry" className="section-pad scroll-mt-24 bg-paper"><div className="shell grid items-start gap-12 lg:grid-cols-2 lg:gap-20"><div><Label tone="light">BOOK BOSCH WASHING MACHINE REPAIR</Label><Heading tone="light" className="mt-6">Tell us what stopped.<br /><Accent>Let’s take a look.</Accent></Heading><p className="mt-6 max-w-[46ch] text-base leading-relaxed text-mutedtext">Share your Bosch model, the issue and preferred timing. Our team can discuss assessment arrangements in Bangalore and what to confirm before approving work.</p><p className="mt-5 text-sm leading-relaxed text-mutedtext">Still covered by a manufacturer warranty? Start with Bosch official support to understand your options.</p><Button asChild variant="default" className="mt-8 whitespace-nowrap"><a href={whatsappHref}><WhatsAppIcon /> Book on WhatsApp</a></Button></div><ContactForm initialService={page.service} brandSelection={page.brandSelection} initialDescription="Bosch washing machine repair\nE-Nr / Model: \nFD: \nIssue / Error code: " /></div></section>
      <section className="border-t border-border bg-mist py-10"><div className="shell grid gap-8 lg:grid-cols-2"><div><Label tone="light">MANUFACTURER REFERENCES</Label><p className="mt-4 text-sm leading-relaxed text-mutedtext">Troubleshooting references from Bosch India. Always use the manual for your exact appliance. Bosch is a trademark of its respective owner; its name identifies the equipment, not an affiliation with Numunix.</p><ul className="mt-4 space-y-3">{page.sources.map(source => <li key={source.href}><a className="text-sm text-primary underline underline-offset-4" href={source.href} target="_blank" rel="noopener noreferrer">{source.name}</a></li>)}</ul></div><div><Label tone="light">MORE REPAIR HELP</Label><div className="mt-4 flex flex-col items-start gap-3"><Button asChild variant="link" className="h-auto whitespace-normal p-0 text-left"><Link to="/$category/repairs/$slug" params={{ category: "appliances", slug: "washing-machine-repair" }}>All washing machine repairs <ArrowUpRight size={16} /></Link></Button><Button asChild variant="link" className="h-auto whitespace-normal p-0 text-left"><Link to="/repair-guides/$slug" params={{ slug: "appliance-repair-visit-checklist" }}>Appliance repair visit checklist <ArrowUpRight size={16} /></Link></Button><Button asChild variant="link" className="h-auto p-0"><Link to="/repair-assessment">How assessment works <ArrowUpRight size={16} /></Link></Button></div></div></div></section>
    </main><Footer />
  </div>;
}