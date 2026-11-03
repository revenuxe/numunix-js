import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import type { WasherBrandPage } from "@/content/repair-brand-pages";
import { FRIDGE_AFTERCARE_GUIDANCE, type FridgeBrandPage } from "@/content/fridge-brand-pages";
import { washerRepairGuidance, REPAIR_DECISION_GUIDANCE, REPAIR_AFTERCARE_GUIDANCE } from "@/content/washer-repair-guidance";
import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { Label, Heading, Accent } from "./primitives";

export function RepairBrandScope({ page, whatsappHref }: { page: WasherBrandPage | FridgeBrandPage; whatsappHref: string }) {
  const isFridge = "guidance" in page;
  const guidance = isFridge ? page.guidance : washerRepairGuidance(page.slug);
  return <>
    <section className="section-pad bg-paper" aria-labelledby="brand-assessment-title">
      <div className="shell grid items-start gap-12 lg:grid-cols-2 lg:gap-20">
        <div>
          <Label tone="light">{page.brand.toUpperCase()} REPAIR IN BANGALORE</Label>
          <Heading tone="light" className="mt-6"><span id="brand-assessment-title">A better description.<br /><Accent>A focused assessment.</Accent></span></Heading>
          <h3 className="mt-8 text-xl text-navytext">{guidance.subject}</h3>
          {guidance.paragraphs.map(paragraph => <p key={paragraph} className="mt-5 text-base leading-relaxed text-mutedtext">{paragraph}</p>)}
        </div>
        <div className="space-y-6">
          <article className="rounded-lg border border-border bg-mist p-6 sm:p-8">
            <Label tone="light">AN EXAMPLE ENQUIRY</Label>
            <h3 className="mt-5 text-xl text-navytext">Describe the sequence, not just the symptom.</h3>
            <p className="mt-4 text-base leading-relaxed text-mutedtext">{guidance.example}</p>
            <p className="mt-4 text-xs leading-relaxed text-mutedtext">Illustrative scenario to help you prepare your enquiry.</p>
          </article>
          <article className="rounded-lg border border-border bg-card p-6 sm:p-8">
            <h3 className="text-xl text-navytext">Arrange the assessment around your location.</h3>
            <p className="mt-4 text-base leading-relaxed text-mutedtext">For your {page.brand} {isFridge ? "fridge" : "washing machine"} repair enquiry in Bangalore, share your locality or PIN code, preferred timing and any access restrictions. Mention a fitted cabinet, narrow utility space or stairs so the team can discuss the arrangements before a visit is agreed.</p>
            <p className="mt-4 text-sm leading-relaxed text-mutedtext">Confirm location coverage, inspection charges and whether work would be assessed at your premises or require another arrangement. Availability and the appropriate scope depend on your model, fault and location.</p>
            <Button asChild variant="link" className="mt-5 h-auto whitespace-normal p-0 text-left"><Link to="/repair-assessment">Explore the assessment process <ArrowUpRight size={16} /></Link></Button>
          </article>
        </div>
      </div>
    </section>
    <section className="border-y border-primary/20 bg-ink-800 py-12 sm:py-16" aria-labelledby="brand-repair-cta-title">
      <div className="shell grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-12">
        <div><h2 id="brand-repair-cta-title" className="text-2xl font-medium leading-tight text-white sm:text-3xl">Your {page.brand} {isFridge ? "fridge needs attention." : "washer stopped."} Let’s plan the next step.</h2><p className="mt-4 max-w-[65ch] text-base leading-relaxed text-white/70">Share the model, fault and Bangalore locality. Start with an assessment request and discuss the proposed work before you approve a repair.</p></div>
        <div className="grid w-full min-w-0 grid-cols-2 gap-2 lg:w-auto lg:gap-3">
          <Button asChild variant="default" className="h-auto min-h-12 min-w-0 gap-1 whitespace-normal px-2 py-3 text-center text-xs sm:gap-2 sm:px-4 sm:text-sm"><a href="#enquiry">Request {page.brand} repair <ArrowUpRight size={16} className="shrink-0" /></a></Button>
          <Button asChild variant="outline" className="h-auto min-h-12 min-w-0 gap-1 whitespace-normal border-white/30 bg-transparent px-2 py-3 text-center text-xs text-white hover:bg-white/10 hover:text-white sm:gap-2 sm:px-4 sm:text-sm"><a href={whatsappHref}><WhatsAppIcon /> Share on WhatsApp</a></Button>
        </div>
      </div>
    </section>
  </>;
}

export function RepairBrandDecisions({ page, whatsappHref }: { page: WasherBrandPage | FridgeBrandPage; whatsappHref: string }) {
  const isFridge = "guidance" in page;
  return <>
    <section className="section-pad bg-mist" aria-labelledby="repair-decision-title">
      <div className="shell">
        <Label tone="light">REPAIR OR REPLACE?</Label>
        <Heading tone="light" className="mt-6"><span id="repair-decision-title">Make the decision.<br /><Accent>With the facts in hand.</Accent></span></Heading>
        <p className="mt-6 max-w-[70ch] text-base leading-relaxed text-mutedtext">Whether to repair your {page.brand} {isFridge ? "fridge" : "washing machine"} depends on more than a single faulty part. Use the assessment to weigh the condition of the appliance, the proposed repair and the practical alternatives. An enquiry begins that conversation; it does not commit you to replacement parts or repair work.</p>
        <div className="mt-10 grid gap-6 md:grid-cols-3">{REPAIR_DECISION_GUIDANCE.map(item => <article key={item.title} className="rounded-lg border border-border bg-card p-6 sm:p-8"><h3 className="text-xl text-navytext">{item.title}</h3><p className="mt-4 text-sm leading-relaxed text-mutedtext">{isFridge ? item.body.replaceAll("washer", "fridge") : item.body}</p></article>)}</div>
        <div className="mt-10 rounded-lg border border-border bg-paper p-6 sm:p-8">
          <h3 className="text-xl text-navytext">Before replacing a part on your {page.brand} {isFridge ? "fridge" : "washer"}</h3>
          <p className="mt-4 max-w-[90ch] text-base leading-relaxed text-mutedtext">Ask which checks support the diagnosis, how the proposed part is matched to the full model and whether it is new, refurbished or another agreed specification. Confirm the part description, labour and any exclusions in the estimate. If the diagnosis changes during work, agree how the revised scope and cost will be approved.</p>
          <p className="mt-4 max-w-[90ch] text-sm leading-relaxed text-mutedtext">Manufacturer warranty, extended cover and independent repair terms are separate questions. If you have existing cover, check its terms with the provider before authorizing independent work. Parts availability and any repair warranty need confirmation for the specific job.</p>
          <Button asChild variant="link" className="mt-5 h-auto whitespace-normal p-0 text-left"><a href={whatsappHref}><WhatsAppIcon /> Discuss your {page.brand} repair enquiry <ArrowUpRight size={16} /></a></Button>
        </div>
      </div>
    </section>
    <section className="section-pad bg-paper" aria-labelledby="brand-aftercare-title">
      <div className="shell">
        <Label tone="light">AFTER THE REPAIR</Label>
        <Heading tone="light" className="mt-6"><span id="brand-aftercare-title">Check the result.<br /><Accent>Keep the details.</Accent></span></Heading>
        <p className="mt-6 max-w-[70ch] text-base leading-relaxed text-mutedtext">A useful handover explains the work completed on your {page.brand} {isFridge ? "fridge" : "washing machine"} and what to do next. Before closing the visit, ask about the affected function, routine care and the route for reporting the same symptom again.</p>
        <div className="mt-10 grid gap-8 md:grid-cols-3">{(isFridge ? FRIDGE_AFTERCARE_GUIDANCE : REPAIR_AFTERCARE_GUIDANCE).map((item, index) => <article key={item.title} className="border-t border-border pt-6"><span className="font-mono text-xs text-primary">0{index + 1}</span><h3 className="mt-5 text-xl text-navytext">{item.title}</h3><p className="mt-4 text-sm leading-relaxed text-mutedtext">{item.body}</p></article>)}</div>
        <Button asChild variant="link" className="mt-8 h-auto whitespace-normal p-0 text-left"><Link to="/repair-aftercare">Read the repair aftercare guide <ArrowUpRight size={16} /></Link></Button>
      </div>
    </section>
  </>;
}
