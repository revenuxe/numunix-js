import { ArrowUpRight } from "lucide-react";
import { CCTV_BRANDS } from "@/content/cctv-brands";
import { Label, Heading, Accent } from "./primitives";

export function CCTVBrands({ onSelect }: { onSelect: (brand: string) => void }) {
  return (
    <section
      id="brands"
      aria-labelledby="cctv-brands-title"
      className="section-pad border-t border-border bg-mist"
    >
      <div className="shell">
        <div className="grid gap-5 lg:grid-cols-2 lg:items-end lg:gap-16">
          <div>
            <Label tone="light">BRANDS WE SERVE</Label>
            <Heading tone="light" className="mt-5">
              <span id="cctv-brands-title">
                Your security system.
                <br />
                <Accent>Familiar brands.</Accent>
              </span>
            </Heading>
          </div>
          <p className="max-w-[48ch] text-base leading-relaxed text-mutedtext">
            Select your brand to request a CCTV assessment. Share the camera or recorder model and
            the issue so we can confirm repair options and compatibility. For mixed-brand systems,
            mention each device involved.
          </p>
        </div>
        <div className="mt-9 grid grid-cols-3 gap-2 sm:gap-5 lg:mt-12">
          {CCTV_BRANDS.map((brand) => (
            <a
              key={brand.file}
              href="#enquiry"
              onClick={() => onSelect(brand.name)}
              aria-label={`Request ${brand.name} CCTV repair`}
              className="group flex min-w-0 flex-col rounded-lg border border-primary/30 bg-card p-2.5 transition duration-200 hover:-translate-y-1 hover:border-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary active:scale-[0.98] motion-reduce:transform-none motion-reduce:transition-none sm:p-6"
            >
              <div
                className={`flex h-16 items-center justify-center sm:h-24 sm:px-6${brand.monochromeLogo ? " rounded-md bg-white px-1.5" : ""}`}
              >
                <span className="relative flex h-full w-full items-center justify-center">
                  <img
                    src={`/brands/cctv/${brand.file}`}
                    alt={`${brand.name} logo`}
                    width={brand.width}
                    height={brand.height}
                    loading="lazy"
                    decoding="async"
                    className={`h-full w-full object-contain${brand.monochromeLogo ? " brightness-0" : ""}`}
                  />
                  {brand.name === "Hi-Focus" && (
                    <img
                      src={`/brands/cctv/${brand.file}`}
                      alt=""
                      aria-hidden="true"
                      width={brand.width}
                      height={brand.height}
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 h-full w-full object-contain brightness-0 [clip-path:inset(0_0_0_21%)]"
                    />
                  )}
                </span>
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
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
