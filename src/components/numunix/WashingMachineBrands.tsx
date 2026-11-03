import { ArrowUpRight, WashingMachine } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Label, Heading, Accent } from "./primitives";

const BRANDS = [
  { name: "Bosch", file: "bosch", width: 480, height: 104 },
  { name: "Godrej", file: "godrej", width: 480, height: 232 },
  { name: "Haier", file: "haier", width: 480, height: 150 },
  { name: "IFB", file: "ifb", width: 480, height: 170 },
  { name: "LG", file: "lg", width: 480, height: 215 },
  { name: "Panasonic", file: "panasonic", width: 480, height: 78 },
  { name: "Samsung", file: "samsung", width: 480, height: 74 },
  { name: "Siemens", file: "siemens", width: 480, height: 113 },
  { name: "Whirlpool", file: "whirlpool", width: 480, height: 160 },
];

export function WashingMachineBrands({ onSelect }: { onSelect: (brand: string) => void }) {
  return (
    <section
      id="brands"
      aria-labelledby="washing-brands-title"
      className="section-pad border-t border-border bg-mist"
    >
      <div className="shell">
        <div className="grid gap-5 lg:grid-cols-2 lg:items-end lg:gap-16">
          <div>
            <Label tone="light">BRANDS WE SERVE</Label>
            <Heading tone="light" className="mt-5">
              <span id="washing-brands-title">
                Your washing machine.
                <br />
                <Accent>Familiar brands.</Accent>
              </span>
            </Heading>
          </div>
          <p className="max-w-[48ch] text-base leading-relaxed text-mutedtext">
            Select your brand to request a washing machine assessment. Share the model and issue so
            we can confirm repair options and parts availability.
          </p>
        </div>
        <div className="mt-9 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:mt-12">
          {BRANDS.map((brand) => brand.file === "bosch" ? (
            <Link key={brand.file} to="/$category/repairs/$slug_/$brand" params={{ category: "appliances", slug: "washing-machine-repair", brand: "bosch" }} aria-label="Request Bosch washing machine repair" className="group flex min-w-0 flex-col rounded-lg border border-primary/30 bg-card p-4 transition duration-200 hover:-translate-y-1 hover:border-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary active:scale-[0.98] motion-reduce:transform-none motion-reduce:transition-none sm:p-6">
              <div className="flex h-20 items-center justify-center px-2 sm:h-24 sm:px-6"><img src="/brands/washing-machines/bosch.webp" alt="Bosch logo" width={480} height={104} loading="lazy" decoding="async" className="max-h-14 w-auto max-w-full object-contain sm:max-h-16" /></div>
              <div className="mt-3 flex items-center justify-between gap-2 border-t border-border/70 pt-3"><span className="text-sm font-medium text-navytext">Bosch</span><span aria-hidden="true" className="grid size-7 place-items-center rounded-full bg-primary text-primary-foreground"><ArrowUpRight size={15} /></span></div>
            </Link>
          ) : (
            <a
              key={brand.file}
              href="#enquiry"
              onClick={() => onSelect(brand.name)}
              aria-label={`Request ${brand.name} washing machine repair`}
              className="group flex min-w-0 flex-col rounded-2xl border border-border bg-white p-4 shadow-[0_5px_18px_-10px_rgba(16,42,99,0.22)] transition duration-200 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_12px_28px_-14px_rgba(30,78,216,0.3)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary active:scale-[0.98] motion-reduce:transform-none motion-reduce:transition-none sm:p-6"
            >
              <div className="flex h-20 items-center justify-center px-2 sm:h-24 sm:px-6">
                <img
                  src={`/brands/washing-machines/${brand.file}.webp`}
                  alt={`${brand.name} logo`}
                  width={brand.width}
                  height={brand.height}
                  loading="lazy"
                  decoding="async"
                  className="max-h-14 w-auto max-w-full object-contain sm:max-h-16"
                />
              </div>
              <div className="mt-3 flex items-center justify-between gap-2 border-t border-border/70 pt-3">
                <span className="text-sm font-medium text-navytext">{brand.name}</span>
                <span
                  aria-hidden="true"
                  className="grid size-7 place-items-center rounded-full bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white"
                >
                  <ArrowUpRight size={15} />
                </span>
              </div>
            </a>
          ))}
          <a
            href="#enquiry"
            onClick={() => onSelect("Other brand")}
            aria-label="Request other brand washing machine repair"
            className="group flex min-w-0 flex-col rounded-2xl border border-border bg-white p-4 shadow-[0_5px_18px_-10px_rgba(16,42,99,0.22)] transition duration-200 hover:border-primary/40 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary active:scale-[0.98] motion-reduce:transform-none motion-reduce:transition-none sm:hidden"
          >
            <div className="flex h-20 items-center justify-center">
              <span className="grid size-14 place-items-center rounded-2xl bg-primary/10 text-primary">
                <WashingMachine size={28} strokeWidth={1.5} aria-hidden="true" />
              </span>
            </div>
            <div className="mt-3 flex items-center justify-between gap-2 border-t border-border/70 pt-3">
              <span className="whitespace-nowrap text-sm font-medium text-navytext">
                Other brands
              </span>
              <span
                aria-hidden="true"
                className="grid size-7 shrink-0 place-items-center rounded-full bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white"
              >
                <ArrowUpRight size={15} />
              </span>
            </div>
          </a>
        </div>
        <p className="mt-5 text-sm leading-relaxed text-mutedtext">
          Don’t see your brand? Choose “Other brand” in the enquiry form. Numunix provides
          independent repair services and is not an authorized service center for these brands.
        </p>
      </div>
    </section>
  );
}
