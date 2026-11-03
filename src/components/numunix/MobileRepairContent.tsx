import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MOBILE_REPAIR_PAGE as content } from "@/content/mobile-repair-page";
import { MOBILE_DECISION_GUIDANCE, MOBILE_AFTERCARE_GUIDANCE } from "@/content/mobile-brand-pages";
import { repairWhatsAppHref } from "@/content/repair-whatsapp";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { Label, Heading, Accent } from "./primitives";

const whatsappHref = repairWhatsAppHref("a mobile repair assessment", ["Brand","Model","Issue","Backup status","Location"]);

export function MobileRepairCTA({ final = false }: { final?: boolean }) {
  return <section className="border-y border-primary/20 bg-ink-800 py-12 sm:py-16" aria-labelledby={final ? "mobile-final-cta" : "mobile-assessment-cta"}>
    <div className="shell grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-12">
      <div><h2 id={final ? "mobile-final-cta" : "mobile-assessment-cta"} className="text-2xl font-medium leading-tight text-white sm:text-3xl">{final ? "Ready to discuss your phone repair?" : "Your phone matters. Start with a clear repair plan."}</h2><p className="mt-4 max-w-[65ch] text-base leading-relaxed text-white/70">Share the model, symptoms and Bangalore locality. Mention damage and backup status so the assessment conversation covers the device and the data you care about.</p></div>
      <div className="grid w-full min-w-0 grid-cols-2 gap-2 lg:w-auto lg:gap-3">
        <Button asChild variant="default" className="h-auto min-h-12 min-w-0 gap-1 whitespace-normal px-2 py-3 text-center text-xs sm:px-4 sm:text-sm"><a href="#enquiry">Request phone repair <ArrowUpRight size={16} className="shrink-0" /></a></Button>
        <Button asChild variant="outline" className="h-auto min-h-12 min-w-0 gap-1 whitespace-normal border-white/30 bg-transparent px-2 py-3 text-center text-xs text-white hover:bg-white/10 hover:text-white sm:px-4 sm:text-sm"><a href={whatsappHref}><WhatsAppIcon /> Share on WhatsApp</a></Button>
      </div>
    </div>
  </section>;
}

export function MobileRepairScope() {
  return <>
    <section className="section-pad bg-paper" aria-labelledby="mobile-scope-title"><div className="shell">
      <Label tone="light">MOBILE REPAIR IN BANGALORE</Label><Heading tone="light" className="mt-6"><span id="mobile-scope-title">Your exact phone.<br /><Accent>A specific repair scope.</Accent></span></Heading>
      <p className="mt-6 max-w-[70ch] text-base leading-relaxed text-mutedtext">Repair options depend on the handset and findings, not only the brand. A useful assessment connects the symptoms to the proposed work, makes part specifications clear and explains what remains uncertain. These are the details to settle before handing over the device or approving replacement parts.</p>
      <div className="mt-10 grid gap-6 md:grid-cols-3">{content.scope.map(item => <article key={item.title} className="rounded-lg border border-border bg-card p-6 sm:p-8"><h3 className="text-xl text-navytext">{item.title}</h3><p className="mt-4 text-sm leading-relaxed text-mutedtext">{item.body}</p></article>)}</div>
      <Button asChild variant="link" className="mt-8 h-auto whitespace-normal p-0 text-left"><Link to="/repair-assessment">Understand the repair assessment process <ArrowUpRight size={16} /></Link></Button>
    </div></section>
    <section className="section-pad bg-mist" aria-labelledby="mobile-privacy-title"><div className="shell">
      <Label tone="light">BACKUP, PRIVACY &amp; APPROVAL</Label><Heading tone="light" className="mt-6"><span id="mobile-privacy-title">Protect what matters.<br /><Accent>Agree before a reset.</Accent></span></Heading>
      <p className="mt-6 max-w-[70ch] text-base leading-relaxed text-mutedtext">A broken phone can also mean interrupted access to photos, work, contacts and authentication. Put those priorities into the assessment conversation. Keep sensitive information out of the enquiry and ask how testing and any proposed software changes will be handled.</p>
      <div className="mt-10 grid gap-6 md:grid-cols-3">{content.privacy.map(item => <article key={item.title} className="rounded-lg border border-border bg-card p-6 sm:p-8"><h3 className="text-xl text-navytext">{item.title}</h3><p className="mt-4 text-sm leading-relaxed text-mutedtext">{item.body}</p></article>)}</div>
      <Button asChild variant="link" className="mt-8 h-auto whitespace-normal p-0 text-left"><Link to="/repair-guides/$slug" params={{ slug: "mobile-repair-before-you-book" }}>Read the mobile repair booking guide <ArrowUpRight size={16} /></Link></Button>
    </div></section>
    <MobileRepairCTA />
  </>;
}

export function MobileRepairDecisions() {
  return <>
    <section className="section-pad bg-paper" aria-labelledby="mobile-cost-title"><div className="shell">
      <Label tone="light">PHONE REPAIR COST &amp; PARTS</Label><Heading tone="light" className="mt-6"><span id="mobile-cost-title">Know the full estimate.<br /><Accent>Approve the right work.</Accent></span></Heading>
      <p className="mt-6 max-w-[70ch] text-base leading-relaxed text-mutedtext">A useful quote identifies the handset, proposed work and part specification. Ask what is included in assessment, fitting and relevant function checks. Repair cost is not determined by a screen size or a headline replacement price alone.</p>
      <div className="mt-10 grid gap-6 md:grid-cols-3">{content.costs.map(item => <article key={item.title} className="rounded-lg border border-border bg-card p-6 sm:p-8"><h3 className="text-xl text-navytext">{item.title}</h3><p className="mt-4 text-sm leading-relaxed text-mutedtext">{item.body}</p></article>)}</div>
    </div></section>
    <section className="section-pad bg-mist" aria-labelledby="mobile-replace-title"><div className="shell">
      <Label tone="light">REPAIR OR REPLACE YOUR PHONE?</Label><Heading tone="light" className="mt-6"><span id="mobile-replace-title">Compare the options.<br /><Accent>Keep the facts together.</Accent></span></Heading>
      <p className="mt-6 max-w-[70ch] text-base leading-relaxed text-mutedtext">Consider the whole phone, your data needs and the complete estimate before deciding. An assessment request starts that discussion; it does not commit you to a replacement screen, battery or internal part.</p>
      <div className="mt-10 grid gap-8 md:grid-cols-3">{MOBILE_DECISION_GUIDANCE.map(item => <article key={item.title} className="border-t border-border pt-6"><h3 className="text-xl text-navytext">{item.title}</h3><p className="mt-4 text-sm leading-relaxed text-mutedtext">{item.body}</p></article>)}</div>
    </div></section>
    <section className="section-pad bg-paper" aria-labelledby="mobile-handover-title"><div className="shell">
      <Label tone="light">AFTER THE MOBILE REPAIR</Label><Heading tone="light" className="mt-6"><span id="mobile-handover-title">Check the functions.<br /><Accent>Keep the work record.</Accent></span></Heading>
      <p className="mt-6 max-w-[70ch] text-base leading-relaxed text-mutedtext">At handover, review the reported problem and what was done. Ask what was tested, what limitations remain and how to report the same symptom again. Retain the record so any future assessment has a clear history.</p>
      <div className="mt-10 grid gap-6 md:grid-cols-3">{MOBILE_AFTERCARE_GUIDANCE.map(item => <article key={item.title} className="rounded-lg border border-border bg-card p-6 sm:p-8"><h3 className="text-xl text-navytext">{item.title}</h3><p className="mt-4 text-sm leading-relaxed text-mutedtext">{item.body}</p></article>)}</div>
      <div className="mt-8 flex flex-wrap gap-x-8 gap-y-4"><Button asChild variant="link" className="h-auto whitespace-normal p-0 text-left"><Link to="/repair-aftercare">Repair aftercare guidance <ArrowUpRight size={16} /></Link></Button><Button asChild variant="link" className="h-auto whitespace-normal p-0 text-left"><Link to="/$category/repairs/$slug" params={{ category: "electronic", slug: "data-recovery" }}>Discuss a separate data recovery enquiry <ArrowUpRight size={16} /></Link></Button></div>
    </div></section>
  </>;
}
