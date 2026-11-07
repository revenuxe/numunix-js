import { useEffect, useRef, useState } from "react";
import ServiceDemo, { type RepairStory } from "./ServiceDemo";

type Item = {
  nav: string;
  href: string;
  title: string;
  body: string;
  slug: string;
  preset: RepairStory;
};

const ITEMS: Item[] = [
  {
    nav: "LEAD MANAGEMENT",
    href: "https://app.numunix.com",
    title: "Keep every enquiry in view.",
    body: "Capture service enquiries, review customer details and follow each lead through a clear status flow.",
    slug: "workspace-leads",
    preset: "workspace-leads",
  },
  {
    nav: "BOOKING MANAGEMENT",
    href: "https://app.numunix.com",
    title: "Bring service bookings together.",
    body: "Keep customer, service and appointment information connected to the work being arranged.",
    slug: "workspace-bookings",
    preset: "workspace-bookings",
  },
  {
    nav: "TECHNICIAN ASSIGNMENT",
    href: "https://app.numunix.com",
    title: "Coordinate work across your team.",
    body: "Assign service jobs to technicians and keep field operations organized.",
    slug: "workspace-technicians",
    preset: "workspace-technicians",
  },
  {
    nav: "JOB TRACKING",
    href: "https://app.numunix.com",
    title: "Follow every service job through completion.",
    body: "Keep assignment, acceptance, progress and completion updates tied to the service job.",
    slug: "workspace-jobs",
    preset: "workspace-jobs",
  },
  {
    nav: "INVOICING",
    href: "https://app.numunix.com",
    title: "Keep service billing organized.",
    body: "Create and manage service invoices as part of the day-to-day workflow.",
    slug: "workspace-invoices",
    preset: "workspace-invoices",
  },
  {
    nav: "SERVICE WORKSPACE",
    href: "https://app.numunix.com",
    title: "One view of the work ahead.",
    body: "Bring enquiries, bookings, jobs and invoice follow-up into one connected workspace.",
    slug: "workspace-overview",
    preset: "workspace-overview",
  },
];

function SlideIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <div data-reveal style={{ animation: `nx-content-enter 700ms cubic-bezier(.2,.7,.3,1) ${delay}ms` }}>
      {children}
    </div>
  );
}

function MobileStage({ items }: { items: Item[] }) {
  return (
    <div className="space-y-24 overflow-hidden lg:hidden">
      {items.map((it, i) => (
        <div key={it.nav}>
          <SlideIn>
            <div className="flex items-center justify-between">
              <span className="label-mono text-[#1747b8]">{it.nav}</span>
              <span className="label-mono text-[#8190aa]">
                {String(i + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
              </span>
            </div>
            <div className="mt-4"><ServiceDemo slug={it.slug} preset={it.preset} href={it.href} /></div>
          </SlideIn>

          <SlideIn delay={120}>
            <h3 className="mt-8 text-[1.3rem] font-normal leading-[1.3] tracking-[-0.025em] text-[#0b1b38]">
              {it.title}
            </h3>
            <p className="mt-3 text-[15px] leading-[1.65] text-[#5d76a3]">{it.body}</p>
          </SlideIn>
        </div>
      ))}
    </div>
  );
}


export function FeatureScroller() {
  const items = ITEMS;
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const mid = window.innerHeight * 0.45;
      let best = 0;
      let bestDist = Infinity;
      refs.current.forEach((el, i) => {
        if (!el) return;
        const r = el.getBoundingClientRect();
        const d = Math.abs(r.top + r.height / 2 - mid);
        if (d < bestDist) {
          bestDist = d;
          best = i;
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
    <section id="technology" className="bg-[#f7f9fc] py-16 sm:py-20 lg:py-[104px]">
      <div className="shell">
        <div className="grid gap-14 lg:grid-cols-[0.82fr_1.18fr] lg:gap-24">
          {/* LEFT — sticky index */}
          <div>
            <div className="lg:sticky lg:top-32">
              <div className="mt-8 hidden lg:block">
                {items.map((it, i) => (
                  <button
                    key={it.nav}
                    onClick={() =>
                      refs.current[i]?.scrollIntoView({ behavior: "smooth", block: "center" })
                    }
                    className="block w-full text-left"
                  >
                    <span
                      className={`block py-[6px] text-[clamp(1.6rem,2.5vw,2.45rem)] font-light leading-[1.22] tracking-[-0.035em] transition-colors duration-500 ${
                        active === i ? "text-[#0b1b38]" : "text-[#c2cfe2]"
                      }`}
                    >
                      {it.nav}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* MOBILE — pinned stage, cards slide in from the right on scroll */}
          <MobileStage items={items} />


          {/* DESKTOP — continuous panel stack */}
          <div className="hidden lg:block lg:space-y-[170px]">
            {items.map((it, i) => (
              <div
                key={it.nav}
                data-i={i}
                ref={(el) => {
                  refs.current[i] = el;
                }}
              >
                <ServiceDemo slug={it.slug} preset={it.preset} href={it.href} />
                <h3 className="mt-10 max-w-[620px] text-[clamp(1.35rem,1.9vw,1.75rem)] font-normal leading-[1.28] tracking-[-0.02em] text-[#0b1b38]">
                  {it.title}
                </h3>
                <p className="mt-4 max-w-[560px] text-[17px] leading-[1.65] text-[#5d76a3]">
                  {it.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default FeatureScroller;
