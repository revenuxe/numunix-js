import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WASHING_MACHINE_PAGE as content } from "@/content/washing-machine-page";
import { REPAIR_DECISION_GUIDANCE, REPAIR_AFTERCARE_GUIDANCE } from "@/content/washer-repair-guidance";
import { repairWhatsAppHref } from "@/content/repair-whatsapp";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { Label, Heading, Accent } from "./primitives";

const whatsappHref = repairWhatsAppHref("washing machine repair", ["Brand","Model","Machine type","Issue","Location"]);

export function WashingMachineCTA({ final = false }: { final?: boolean }) {
  return <section className="border-y border-primary/20 bg-ink-800 py-12 sm:py-16" aria-labelledby={final ? "washer-final-cta" : "washer-assessment-cta"}>
    <div className="shell grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-12">
      <div><h2 id={final ? "washer-final-cta" : "washer-assessment-cta"} className="text-2xl font-medium leading-tight text-white sm:text-3xl">{final ? "Ready to discuss your washing machine repair?" : "Laundry on hold? Start with a clear repair plan."}</h2><p className="mt-4 max-w-[65ch] text-base leading-relaxed text-white/70">{final ? "Send your model, symptoms and Bangalore locality. Discuss assessment arrangements, the estimate and the proposed next step before approving work." : "Share what stopped, the full appliance model and your location. An assessment request is the starting point for a diagnosis and estimate."}</p></div>
      <div className="grid w-full min-w-0 grid-cols-2 gap-2 lg:w-auto lg:gap-3">
        <Button asChild variant="default" className="h-auto min-h-12 min-w-0 gap-1 whitespace-normal px-2 py-3 text-center text-xs sm:px-4 sm:text-sm"><a href="#enquiry">Request assessment <ArrowUpRight size={16} className="shrink-0" /></a></Button>
        <Button asChild variant="outline" className="h-auto min-h-12 min-w-0 gap-1 whitespace-normal border-white/30 bg-transparent px-2 py-3 text-center text-xs text-white hover:bg-white/10 hover:text-white sm:px-4 sm:text-sm"><a href={whatsappHref}><WhatsAppIcon /> Share on WhatsApp</a></Button>
      </div>
    </div>
  </section>;
}

export function WashingMachineScope() {
  return <>
    <section className="section-pad bg-paper" aria-labelledby="washer-types-title"><div className="shell">
      <Label tone="light">MATCH THE ASSESSMENT TO THE MACHINE</Label>
      <Heading tone="light" className="mt-6"><span id="washer-types-title">Different washers.<br /><Accent>A specific repair plan.</Accent></span></Heading>
      <p className="mt-6 max-w-[70ch] text-base leading-relaxed text-mutedtext">Front-load, top-load and semi-automatic washing machines need different descriptions of the same complaint. Start with your appliance type and the function that stopped. The exact model determines the appropriate instructions, assessment scope and parts enquiries.</p>
      <div className="mt-10 grid gap-6 md:grid-cols-3">{content.types.map(type => <article key={type.title} className="rounded-lg border border-border bg-card p-6 sm:p-8"><h3 className="text-xl text-navytext">{type.title}</h3><p className="mt-4 text-sm leading-relaxed text-mutedtext">{type.body}</p><p className="mt-5 border-t border-border pt-4 text-sm leading-relaxed text-navytext">{type.detail}</p></article>)}</div>
      <p className="mt-8 max-w-[80ch] text-base leading-relaxed text-mutedtext">Have a washer-dryer? Mention both functions and explain whether the problem occurs during washing, spinning or drying. Confirm assessment options for the full model and affected function before a visit is arranged.</p>
    </div></section>
    <section className="section-pad bg-mist" aria-labelledby="washer-doorstep-title"><div className="shell grid items-start gap-12 lg:grid-cols-2 lg:gap-20">
      <div><Label tone="light">WASHING MACHINE REPAIR IN BANGALORE</Label><Heading tone="light" className="mt-6"><span id="washer-doorstep-title">Plan the visit.<br /><Accent>Know the scope.</Accent></span></Heading><p className="mt-6 text-base leading-relaxed text-mutedtext">Share your Bangalore locality or PIN code, preferred timing and the space around the washer. Mention stairs, a fitted cabinet or restricted utility access so the team can discuss practical arrangements. Keep the model label and a fault description ready when requesting an assessment.</p><p className="mt-5 text-base leading-relaxed text-mutedtext">Confirm location coverage, assessment charges and what can be checked at your premises. If specialist work or another arrangement is needed, ask how transport, further inspection and revised approval would be handled before agreeing to it.</p></div>
      <article className="rounded-lg border border-border bg-card p-6 sm:p-8"><h3 className="text-xl text-navytext">What a useful assessment should establish</h3><p className="mt-4 text-base leading-relaxed text-mutedtext">The conversation should connect your reported symptom to the findings, explain the proposed repair and identify any further checks or parts required. Ask what supports the diagnosis, whether alternatives exist and what remains uncertain. An error message or a stopped programme alone is not a complete parts specification.</p><p className="mt-4 text-base leading-relaxed text-mutedtext">Agree the scope before work begins and confirm which relevant functions would be reviewed afterwards. If the findings change, the revised work and cost should be discussed before proceeding.</p><Button asChild variant="link" className="mt-6 h-auto whitespace-normal p-0 text-left"><Link to="/repair-assessment">Understand the assessment process <ArrowUpRight size={16} /></Link></Button></article>
    </div></section>
    <WashingMachineCTA />
  </>;
}

export function WashingMachineDecisions() {
  return <>
    <section className="section-pad bg-paper" aria-labelledby="washer-cost-title"><div className="shell">
      <Label tone="light">WASHING MACHINE REPAIR COST</Label><Heading tone="light" className="mt-6"><span id="washer-cost-title">Understand the estimate.<br /><Accent>Approve with clarity.</Accent></span></Heading>
      <p className="mt-6 max-w-[70ch] text-base leading-relaxed text-mutedtext">A useful washing machine repair estimate explains the work, rather than quoting a replacement part in isolation. The model, findings and parts requirements affect the proposal. Confirm the complete charges and exclusions before deciding what to approve.</p>
      <div className="mt-10 grid gap-6 sm:grid-cols-2">{content.costs.map((item, index) => <article key={item.title} className="rounded-lg border border-border bg-card p-6 sm:p-8"><span className="font-mono text-xs text-primary">0{index + 1}</span><h3 className="mt-5 text-xl text-navytext">{item.title}</h3><p className="mt-4 text-sm leading-relaxed text-mutedtext">{item.body}</p></article>)}</div>
    </div></section>
    <section className="section-pad bg-mist" aria-labelledby="washer-replace-title"><div className="shell">
      <Label tone="light">REPAIR OR REPLACE?</Label><Heading tone="light" className="mt-6"><span id="washer-replace-title">Consider the condition.<br /><Accent>Compare the options.</Accent></span></Heading>
      <p className="mt-6 max-w-[70ch] text-base leading-relaxed text-mutedtext">A recurring fault, an older appliance or a substantial estimate can make replacement worth discussing. Use the diagnosis and full costs to compare the options. A request for assessment does not commit you to buying parts or approving the repair.</p>
      <div className="mt-10 grid gap-8 md:grid-cols-3">{REPAIR_DECISION_GUIDANCE.map(item => <article key={item.title} className="border-t border-border pt-6"><h3 className="text-xl text-navytext">{item.title}</h3><p className="mt-4 text-sm leading-relaxed text-mutedtext">{item.body}</p></article>)}</div>
    </div></section>
    <section className="section-pad bg-paper" aria-labelledby="washer-aftercare-title"><div className="shell">
      <Label tone="light">AFTER THE REPAIR</Label><Heading tone="light" className="mt-6"><span id="washer-aftercare-title">Review the result.<br /><Accent>Keep the care simple.</Accent></span></Heading>
      <p className="mt-6 max-w-[70ch] text-base leading-relaxed text-mutedtext">Before closing a repair visit, ask how the affected function was checked and what to do if the original symptom returns. Keep the diagnosis and job details with your appliance documents so future conversations have a clear history.</p>
      <div className="mt-10 grid gap-6 md:grid-cols-3">{REPAIR_AFTERCARE_GUIDANCE.map(item => <article key={item.title} className="rounded-lg border border-border bg-card p-6 sm:p-8"><h3 className="text-xl text-navytext">{item.title}</h3><p className="mt-4 text-sm leading-relaxed text-mutedtext">{item.body}</p></article>)}</div>
      <div className="mt-8 flex flex-wrap gap-x-8 gap-y-4"><Button asChild variant="link" className="h-auto whitespace-normal p-0 text-left"><Link to="/repair-aftercare">Repair aftercare guidance <ArrowUpRight size={16} /></Link></Button><Button asChild variant="link" className="h-auto whitespace-normal p-0 text-left"><Link to="/repair-guides/$slug" params={{ slug: "appliance-repair-visit-checklist" }}>Prepare for an appliance repair visit <ArrowUpRight size={16} /></Link></Button></div>
    </div></section>
  </>;
}
