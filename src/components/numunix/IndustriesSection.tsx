import { useEffect, useRef, useState } from "react";
import { industries } from "@/content/industries";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { Label, Reveal } from "./primitives";
import IndustryScene from "./IndustryScene";

export default function IndustriesSection() {
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
      aria-label="Industries we serve"
      className="bg-[#f7f9fc] py-16 sm:py-20 lg:py-[104px]"
    >
      <div className="shell">
        <div className="grid gap-14 lg:grid-cols-[0.82fr_1.18fr] lg:gap-24">
          <div>
            <div className="lg:sticky lg:top-32">
              <Label tone="light">INDUSTRIES WE SERVE</Label>
              <p className="mt-6 max-w-[42ch] text-[15px] leading-[1.65] text-[#5d76a3]">
                Deep domain knowledge across regulated and high-growth sectors — built over a decade
                of enterprise delivery.
              </p>
              <div className="mt-8 hidden lg:block">
                {industries.map((industry, index) => (
                  <button
                    key={industry.label}
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
                      {industry.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="min-w-0 space-y-24 lg:space-y-[170px]">
            {industries.map((industry, index) => {
              return (
                <div
                  key={industry.name}
                  id={`industry-panel-${index}`}
                  ref={(el) => {
                    refs.current[index] = el;
                  }}
                >
                  <Reveal>
                    <div className="mb-4 flex items-center justify-between gap-4 lg:hidden">
                      <span className="label-mono text-[#1747b8]">{industry.label}</span>
                      <span className="label-mono text-[#8190aa]">
                        {String(index + 1).padStart(2, "0")} / 08
                      </span>
                    </div>
                    <Link
                      to="/industries/$slug"
                      params={{ slug: industry.slug }}
                      aria-label={`Explore ${industry.name}`}
                      className="block rounded-[24px] transition-transform hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2459e0] motion-reduce:transform-none"
                    >
                      <IndustryScene index={index} />
                    </Link>
                    <h3 className="mt-8 max-w-[620px] text-[1.3rem] font-normal leading-[1.28] tracking-[-0.02em] text-[#0b1b38] lg:mt-10 lg:text-[clamp(1.35rem,1.9vw,1.75rem)]">
                      {industry.name}
                    </h3>
                    <p className="mt-3 max-w-[560px] text-[15px] leading-[1.65] text-[#5d76a3] lg:mt-4 lg:text-[17px]">
                      {industry.description}
                    </p>
                    <Link
                      to="/industries/$slug"
                      params={{ slug: industry.slug }}
                      className="mt-5 inline-flex items-center gap-2 text-sm text-[#1e4ed8]"
                    >
                      Explore {industry.name} <ArrowUpRight size={16} />
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
