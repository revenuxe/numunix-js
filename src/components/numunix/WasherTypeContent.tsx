import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { WASHER_TYPE_PAGES, WASHER_PARENT_PATH, washerTypeHref, type WasherTypePage } from "@/content/washer-type-pages";
import { Label, Heading, Accent } from "./primitives";
import { WashingMachineCTA } from "./WashingMachineContent";

export function WasherTypeScope({ page }: { page: WasherTypePage }) {
  return <>
    <section className="section-pad bg-mist" aria-labelledby="washer-type-scope-title">
      <div className="shell">
        <Label tone="light">{page.machineType.toUpperCase()} REPAIR / SCOPE</Label>
        <Heading tone="light" className="mt-6"><span id="washer-type-scope-title">Your machine.<br /><Accent>A specific repair plan.</Accent></span></Heading>
        <div className="mt-10 grid gap-6 md:grid-cols-3">{page.scope.map(item => <article key={item.title} className="rounded-lg border border-border bg-card p-6 sm:p-8"><h3 className="text-xl text-navytext">{item.title}</h3><p className="mt-4 text-base leading-relaxed text-mutedtext">{item.body}</p></article>)}</div>
        <nav aria-label="Washing machine repair options" className="mt-8 flex flex-wrap gap-6">
          <Link href={WASHER_PARENT_PATH} className="inline-flex items-center gap-2 text-primary underline underline-offset-4">All washing machine repairs <ArrowUpRight size={16} aria-hidden="true" /></Link>
          {WASHER_TYPE_PAGES.filter(item => item.slug !== page.slug).map(item => <Link key={item.slug} href={washerTypeHref(item)} className="inline-flex items-center gap-2 text-primary underline underline-offset-4">{item.name} <ArrowUpRight size={16} aria-hidden="true" /></Link>)}
        </nav>
      </div>
    </section>
    <WashingMachineCTA subject={page.name.toLowerCase()} />
  </>;
}
