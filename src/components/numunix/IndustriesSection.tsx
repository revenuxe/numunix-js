import { useEffect, useRef, useState } from "react";
import { Label, Reveal } from "./primitives";
import AudienceRepairScene from "./AudienceRepairScene";
import { useCategory } from "./category";
import { Link } from "@tanstack/react-router";
import { REPAIR_AUDIENCE_PATHS } from "@/content/repair-audiences";
import { HOMEPAGE_REPAIR, REPAIR_SERVICES } from "@/content/homepage-repairs";
import { ArrowUpRight } from "lucide-react";

// Homepage audiences — who brings devices in for repair.
const AUDIENCES = [
  {
    label: "HOMES",
    name: "Homes & individuals",
    description:
      "Phones, laptops, TVs, and appliances, picked up, repaired, and returned working, with a warranty on every job.",
  },
  {
    label: "OFFICES",
    name: "Offices & workspaces",
    description:
      "Work laptops, networking, and CCTV kept healthy with priority repair slots and annual maintenance cover.",
  },
  {
    label: "RETAIL",
    name: "Retail & showrooms",
    description:
      "Billing machines, displays, and security cameras maintained so the counter never stops moving.",
  },
  {
    label: "EDUCATION",
    name: "Schools & colleges",
    description:
      "Computer labs, projectors, and campus CCTV serviced on a fixed schedule, term after term.",
  },
  {
    label: "HOSPITALITY",
    name: "Hotels & restaurants",
    description:
      "Kitchen equipment, TVs, and surveillance kept ready for every guest, every service.",
  },
  {
    label: "HEALTHCARE",
    name: "Clinics & labs",
    description:
      "Front-desk systems, displays, and CCTV maintained with careful, quiet, scheduled service.",
  },
  {
    label: "INDUSTRY",
    name: "Factories & warehouses",
    description:
      "CCTV coverage, displays, and communication devices repaired with minimal downtime.",
  },
  {
    label: "COMMUNITIES",
    name: "Apartments & communities",
    description:
      "Gate cameras, intercoms, and common-area devices kept working under one maintenance plan.",
  },
];

export default function IndustriesSection() {
  const category = useCategory()?.category ?? "electronics";
  const content = HOMEPAGE_REPAIR[category];
  const audiences = AUDIENCES.map((audience, i) => {
    const entry = content.audiences[i] ?? content.audiences[0];
    return { ...audience, name: entry[0], description: entry[1], service: entry[2] };
  });
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      let best = 0;
      let distance = Infinity;
      refs.current.forEach((el, index) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const next = Math.abs(rect.top + rect.height / 2 - window.innerHeight * 0.45);
        if (next < distance) {
          best = index;
          distance = next;
        }
      });
      setActive(best);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      id="industries"
      aria-label="Who we serve"
      className="bg-[#f7f9fc] py-16 sm:py-20 lg:py-[104px]"
    >
      <div className="shell">
        <div className="grid gap-14 lg:grid-cols-[0.82fr_1.18fr] lg:gap-24">
          <div>
            <div className="lg:sticky lg:top-32">
              <Label tone="light">WHO WE SERVE</Label>
              <p className="mt-6 max-w-[42ch] text-[15px] leading-[1.65] text-[#5d76a3]">
                {content.audienceIntro}
              </p>
              <div className="mt-8 hidden lg:block">
                {audiences.map((audience, index) => (
                  <button
                    key={audience.label}
                    type="button"
                    aria-controls={`industry-panel-${index}`}
                    aria-current={active === index ? "true" : undefined}
                    onClick={() =>
                      refs.current[index]?.scrollIntoView({
                        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
                          ? "instant"
                          : "smooth",
                        block: "center",
                      })
                    }
                    className="block w-full rounded-sm text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2459e0]"
                  >
                    <span
                      className={`block py-[6px] text-[clamp(1.6rem,2.5vw,2.45rem)] font-light leading-[1.22] tracking-[-0.035em] uppercase transition-colors duration-500 ${active === index ? "text-[#0b1b38]" : "text-[#c2cfe2]"}`}
                    >
                      {audience.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="min-w-0 space-y-24 lg:space-y-[170px]">
            {audiences.map((audience, index) => {
              return (
                <div
                  key={audience.name}
                  id={`industry-panel-${index}`}
                  ref={(el) => {
                    refs.current[index] = el;
                  }}
                >
                  <Reveal>
                    <div className="mb-4 flex items-center justify-between gap-4 lg:hidden">
                      <span className="label-mono text-[#1747b8]">{audience.label}</span>
                      <span className="label-mono text-[#8190aa]">
                        {String(index + 1).padStart(2, "0")} / 08
                      </span>
                    </div>
                    <Link
                      to="/who-we-serve/$slug"
                      params={{ slug: REPAIR_AUDIENCE_PATHS[index]! }}
                      aria-label={`Explore ${audience.name}`}
                      className="block rounded-[24px] transition-transform hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2459e0] motion-reduce:transform-none"
                    >
                      <div className="overflow-hidden rounded-[24px] border border-border bg-card text-card-foreground" data-audience-repair={category}>
                        <div className="repair-audience-heading">
                          <div><span className="label-mono text-blue">{audience.label} / {category.toUpperCase()} CARE</span><h4>{REPAIR_SERVICES[category][audience.service]?.title}</h4></div>
                          <span className="text-mutedtext text-[28px] font-light">{String(index + 1).padStart(2, "0")}</span>
                        </div>
                        <div className="repair-audience-stage"><AudienceRepairScene key={`${category}-${index}`} category={category} index={index} service={audience.service} /></div>
                        <div className="repair-audience-footer"><span>ASSESS · REPAIR · TEST</span><span>Illustrative repair</span></div>
                      </div>
                    </Link>
                    <h3 className="mt-8 max-w-[620px] text-[1.3rem] font-normal leading-[1.28] tracking-[-0.02em] text-[#0b1b38] lg:mt-10 lg:text-[clamp(1.35rem,1.9vw,1.75rem)]">
                      {audience.name}
                    </h3>
                    <p className="mt-3 max-w-[560px] text-[15px] leading-[1.65] text-[#5d76a3] lg:mt-4 lg:text-[17px]">
                      {audience.description}
                    </p>
                    <Link
                      to="/who-we-serve/$slug"
                      params={{ slug: REPAIR_AUDIENCE_PATHS[index]! }}
                      className="mt-5 inline-flex items-center gap-2 text-sm text-[#1e4ed8]"
                    >
                      Explore {audience.name} <ArrowUpRight size={16} />
                    </Link>
                  </Reveal>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
