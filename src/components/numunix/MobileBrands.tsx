import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { MOBILE_BRANDS } from "@/content/mobile-brands";
import { Label, Heading, Accent } from "./primitives";

export function MobileBrands() {
  return <section id="brands" aria-labelledby="mobile-brands-title" className="section-pad border-t border-border bg-mist">
    <div className="shell">
      <div className="grid gap-5 lg:grid-cols-2 lg:items-end lg:gap-16">
        <div><Label tone="light">BRANDS WE SERVE</Label><Heading tone="light" className="mt-5"><span id="mobile-brands-title">Your mobile phone.<br /><Accent>Familiar brands.</Accent></span></Heading></div>
        <p className="max-w-[48ch] text-base leading-relaxed text-mutedtext">Select your brand to request a mobile repair assessment. Share the exact model, issue and any damage so we can confirm repair options and parts availability.</p>
      </div>
      <div className="mt-9 grid grid-cols-3 gap-2 sm:gap-5 lg:mt-12">
        {MOBILE_BRANDS.map(brand => <Link key={brand.file} to="/$category/repairs/$slug/$brand" params={{ category: "electronic", slug: "mobile-repair", brand: brand.file.replace(/\.[^.]+$/, "") }} aria-label={`Request ${brand.name} mobile repair`} className="group flex min-w-0 flex-col rounded-lg border border-primary/30 bg-card p-2.5 transition duration-200 hover:-translate-y-1 hover:border-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary active:scale-[0.98] motion-reduce:transform-none motion-reduce:transition-none sm:p-6">
          <div className={`flex h-20 items-center justify-center sm:h-28${brand.darkLogo ? " rounded-md bg-ink-900 p-2" : ""}`}><img src={`/brands/mobiles/${brand.file}`} alt={`${brand.name} logo`} width={brand.width} height={brand.height} loading="lazy" decoding="async" className="h-auto max-h-14 w-auto max-w-full object-contain sm:max-h-20" /></div>
          <div className="mt-3 flex items-center justify-between gap-1 border-t border-border/70 pt-3 sm:gap-2"><span className="text-[10px] font-medium text-navytext sm:text-sm">{brand.name}</span><span aria-hidden="true" className="grid size-4 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground sm:size-7"><ArrowUpRight size={15} className="size-3 sm:size-[15px]" /></span></div>
        </Link>)}
      </div>
    </div>
  </section>;
}
