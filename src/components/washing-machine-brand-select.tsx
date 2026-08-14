import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { WASHING_MACHINE_BRANDS } from "@/lib/washing-machine-brands";

export function WashingMachineBrandSelect() {
  return (
    <section id="brands" className="scroll-mt-20 bg-secondary/45 px-4 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand">
            Brands we serve
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            Washing machine repair for leading brands
          </h2>
          <p className="mt-4 leading-7 text-muted-foreground">
            Our technicians provide washing machine service and repair for popular front-load,
            top-load and semi-automatic models. Tell us your brand and model when booking so we can
            prepare for the right diagnosis.
          </p>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {WASHING_MACHINE_BRANDS.map((brand) => (
            <Link
              key={brand.name}
              href={`/services/washing-machine-repair/brand/${brand.slug}`}
              className="group relative flex min-h-28 items-center justify-center overflow-hidden rounded-2xl border border-brand/45 bg-white p-5 shadow-soft transition duration-300 hover:-translate-y-1 hover:border-brand hover:shadow-card"
            >
              <Image
                src={brand.logo}
                alt={`${brand.name} washing machine repair`}
                width={240}
                height={80}
                className={`w-full object-contain ${brand.name === "Croma" ? "max-h-14" : "max-h-9"}`}
              />
              <ArrowRight className="absolute bottom-3 right-3 h-4 w-4 text-brand transition group-hover:translate-x-0.5" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
