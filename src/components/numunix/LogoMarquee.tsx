"use client";
import { useCategory } from "./category";
import { REPAIR_SERVICES } from "@/content/homepage-repairs";

export function LogoMarquee() {
  const ctx = useCategory();
  const services = REPAIR_SERVICES[ctx?.category ?? "electronics"];
  const row = [...services, ...services];
  return (
    <section className="relative overflow-hidden border-t border-white/10 bg-[#05070c] py-12">
      <div className="shell">
        <div className="label-mono text-[#8fb4e8]">WHAT WE REPAIR</div>
      </div>
      <div className="relative mt-10 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
        <div
          className="flex w-max items-center gap-20 whitespace-nowrap"
          style={{ animation: "marquee 48s linear infinite" }}
        >
          {row.map((service, i) => (
            <span
              key={`${service.nav}-${i}`}
              className="inline-flex items-center gap-4 text-[clamp(1.2rem,2vw,1.8rem)] font-medium tracking-[-0.02em] text-white/30"
            >
              <service.icon
                aria-hidden="true"
                className="h-[1.15em] w-[1.15em] shrink-0 text-[#8fb4e8]/60"
                strokeWidth={1.5}
              />
              {service.nav}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

export default LogoMarquee;
