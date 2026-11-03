import { ArrowUpRight } from "lucide-react";
import type { FridgeBrandPage } from "@/content/fridge-brand-pages";
import { FRIDGE_TYPES, FRIDGE_PARTS_GUIDANCE } from "@/content/fridge-repair-details";
import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { Label, Heading, Accent } from "./primitives";

export function FridgeRepairDetails({ page, whatsappHref }: { page: FridgeBrandPage; whatsappHref: string }) {
  return <>
    <section className="section-pad bg-paper" aria-labelledby="fridge-type-title"><div className="shell">
      <Label tone="light">MATCH THE REPAIR TO THE REFRIGERATOR</Label>
      <Heading tone="light" className="mt-6"><span id="fridge-type-title">Your {page.brand} fridge.<br /><Accent>Its own repair needs.</Accent></span></Heading>
      <p className="mt-6 max-w-[70ch] text-base leading-relaxed text-mutedtext">The cabinet layout and fitted features help explain a complaint; the full model identifies the appliance. Use the descriptions below to prepare your {page.brand} refrigerator enquiry, then confirm compatibility and assessment scope for your exact model.</p>
      <div className="mt-10 grid gap-6 md:grid-cols-3">{FRIDGE_TYPES.map(item => <article key={item.title} className="rounded-lg border border-border bg-card p-6 sm:p-8"><h3 className="text-xl text-navytext">{item.title}</h3><p className="mt-4 text-sm leading-relaxed text-mutedtext">{item.body}</p><p className="mt-5 border-t border-border pt-4 text-sm leading-relaxed text-navytext">{item.prompt}</p></article>)}</div>
    </div></section>
    <section className="section-pad bg-mist" aria-labelledby="fridge-parts-title"><div className="shell">
      <Label tone="light">WHAT THE REPAIR PROPOSAL SHOULD EXPLAIN</Label>
      <Heading tone="light" className="mt-6"><span id="fridge-parts-title">Findings first.<br /><Accent>Parts with a reason.</Accent></span></Heading>
      <p className="mt-6 max-w-[70ch] text-base leading-relaxed text-mutedtext">Before approving work on your {page.brand} fridge in Bangalore, ask how the diagnosis connects to the symptom you reported. A useful estimate states the proposed repair, labour, part specifications and exclusions, with your approval sought again if the scope changes.</p>
      <div className="mt-10 grid gap-6 sm:grid-cols-2">{FRIDGE_PARTS_GUIDANCE.map(item => <article key={item.title} className="rounded-lg border border-border bg-card p-6 sm:p-8"><h3 className="text-xl text-navytext">{item.title}</h3><p className="mt-4 text-sm leading-relaxed text-mutedtext">{item.body}</p></article>)}</div>
      <div className="mt-10 rounded-lg border border-primary/20 bg-paper p-6 sm:p-8">
        <h3 className="text-xl text-navytext">Ready to describe your {page.brand} fridge problem?</h3>
        <p className="mt-4 max-w-[75ch] text-base leading-relaxed text-mutedtext">Send the full model, affected compartment, symptoms and Bangalore locality. Include a display photo or a short sound recording if it helps. Confirm visit arrangements and any assessment charge before work is agreed.</p>
        <div className="mt-6 grid max-w-lg grid-cols-2 gap-2 sm:gap-3">
          <Button asChild variant="default" className="h-auto min-h-12 min-w-0 gap-1 whitespace-normal px-2 py-3 text-xs sm:text-sm"><a href="#enquiry">Book fridge assessment <ArrowUpRight size={16} className="shrink-0" /></a></Button>
          <Button asChild variant="outline" className="h-auto min-h-12 min-w-0 gap-1 whitespace-normal bg-transparent px-2 py-3 text-xs sm:text-sm"><a href={whatsappHref}><WhatsAppIcon /> Send model &amp; issue</a></Button>
        </div>
      </div>
    </div></section>
  </>;
}
