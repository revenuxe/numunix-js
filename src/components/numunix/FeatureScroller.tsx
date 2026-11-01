import { useEffect, useRef, useState } from "react";
import { Label } from "./primitives";
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
    nav: "MOBILE REPAIR",
    href: "/features",
    title: "Cracked, dead, or drowned — fixed.",
    body: "Screen replacements, batteries, charging ports, cameras, and water-damage recovery for every major brand — with live status from check-in to handover.",
    slug: "mobile-repair",
    preset: "repair-mobile",
  },
  {
    nav: "LAPTOP & COMPUTER REPAIR",
    href: "/features",
    title: "Board-level repair, not just replacement.",
    body: "From no-display and overheating to keyboards, hinges, and upgrades — our bench repairs what other service centres simply replace.",
    slug: "laptop-repair",
    preset: "repair-board",
  },
  {
    nav: "CCTV & SECURITY SYSTEMS",
    href: "/features",
    title: "Cameras that stay online.",
    body: "Installation, DVR/NVR setup, camera repair, and preventive maintenance for homes, shops, and offices.",
    slug: "cctv-security",
    preset: "repair-cctv",
  },
  {
    nav: "HOME APPLIANCE REPAIR",
    href: "/features",
    title: "Everyday machines, back to work.",
    body: "Washing machines, microwaves, chimneys, and more — doorstep diagnosis, itemised estimates, and repairs on schedule.",
    slug: "appliance-repair",
    preset: "repair-web",
  },
  {
    nav: "TV & AUDIO REPAIR",
    href: "/features",
    title: "Picture and sound, restored.",
    body: "Panel and backlight work, board repair, and speaker service for every brand and size.",
    slug: "tv-audio-repair",
    preset: "repair-tv",
  },
  {
    nav: "DATA RECOVERY",
    href: "/features",
    title: "When the data matters more than the device.",
    body: "Photos, files, and contacts recovered from failed drives, phones, and memory cards — assessed before anything is powered on.",
    slug: "data-recovery",
    preset: "repair-data",
  },
];

function SlideIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <div data-reveal style={{ animation: `nx-content-enter 700ms cubic-bezier(.2,.7,.3,1) ${delay}ms` }}>
      {children}
    </div>
  );
}

function MobileStage() {
  return (
    <div className="space-y-24 overflow-hidden lg:hidden">
      {ITEMS.map((it, i) => (
        <div key={it.nav}>
          <SlideIn>
            <div className="flex items-center justify-between">
              <span className="label-mono text-[#1747b8]">{it.nav}</span>
              <span className="label-mono text-[#8190aa]">
                {String(i + 1).padStart(2, "0")} / {String(ITEMS.length).padStart(2, "0")}
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
              <Label tone="light">OUR REPAIR SERVICES</Label>
              <div className="mt-8 hidden lg:block">
                {ITEMS.map((it, i) => (
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
          <MobileStage />


          {/* DESKTOP — continuous panel stack */}
          <div className="hidden lg:block lg:space-y-[170px]">
            {ITEMS.map((it, i) => (
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
