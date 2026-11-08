import { PURIFIER_BRANDS } from "@/content/purifier-brands";
import Link from "next/link";
import { resolveHref } from "@/lib/route-href";
import { ArrowUpRight } from "lucide-react";
import { PurifierBrandLogo } from "./PurifierBrandLogo";
import { Label, Heading, Accent } from "./primitives";

export function PurifierBrands() {
  return (
    <section
      id="brands"
      aria-labelledby="purifier-brands-title"
      className="section-pad border-t border-border bg-mist"
    >
      <div className="shell">
        <div className="grid gap-5 lg:grid-cols-2 lg:items-end lg:gap-16">
          <div>
            <Label tone="light">BRANDS WE SERVE</Label>
            <Heading tone="light" className="mt-5">
              <span id="purifier-brands-title">
                Your water purifier.
                <br />
                <Accent>Familiar brands.</Accent>
              </span>
            </Heading>
          </div>
          <p className="max-w-[48ch] text-base leading-relaxed text-mutedtext">
            Request service for your water purifier. Share the brand, model and issue so we can
            confirm service options, compatible filters and parts availability.
          </p>
        </div>
        <ul className="mt-9 grid grid-cols-3 gap-2 sm:gap-5 lg:mt-12">
          {PURIFIER_BRANDS.map((brand) => (
            <li key={brand.file} className="flex min-w-0">
              <Link
                href={resolveHref("/$category/repairs/$slug/$brand", {
                  category: "appliances",
                  slug: "water-purifier-service",
                  brand: brand.file.replace(/\.[^.]+$/, ""),
                })}

                aria-label={`Explore ${brand.name} water purifier repair`}
                className="group flex w-full min-w-0 flex-col rounded-lg border border-primary/30 bg-card p-2.5 transition duration-200 hover:-translate-y-1 hover:border-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary active:scale-[0.98] motion-reduce:transform-none motion-reduce:transition-none sm:p-6"
              >
                <div className="flex h-20 items-center justify-center rounded-md bg-white px-2 sm:h-28 sm:px-6">
                  <PurifierBrandLogo brand={brand} />
                </div>
                <div className="mt-3 flex items-center justify-between gap-1 border-t border-border/70 pt-3 sm:gap-2">
                  <span className="text-[10px] font-medium text-navytext sm:text-sm">
                    {brand.name}
                  </span>
                  <span
                    aria-hidden="true"
                    className="grid size-4 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground sm:size-7"
                  >
                    <ArrowUpRight size={15} className="size-3 sm:size-[15px]" />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm leading-relaxed text-mutedtext">
          Numunix is an independent service provider. Brand names and logos identify the equipment
          we service and do not imply authorization or affiliation.
        </p>
      </div>
    </section>
  );
}
