import { useRef } from "react";
import { Label, Heading, Accent, Reveal } from "./primitives";
import {
  ArrowRight,
  Wind,
  Cpu,
  Smartphone,
  Car,
  Home,
  Building2,
  WashingMachine,
} from "lucide-react";

const STEPS = [
  ["01", "CAPTURE LEAD", "Automatically collect customer details and service requirements."],
  ["02", "QUALIFY", "Understand the issue and identify the right service."],
  ["03", "BOOK", "Schedule appointments based on availability."],
  ["04", "ASSIGN", "Match the job with the right technician."],
  ["05", "COMPLETE", "Track the service from start to finish."],
  ["06", "INVOICE", "Generate and send professional invoices."],
  ["07", "FOLLOW UP", "Automatically request feedback and re-engage customers."],
];

export function AutomationWorkflow() {
  return (
    <section className="section-pad bg-[#f7f9fc]">
      <div className="shell">
        <Reveal>
          <Label tone="light">AUTOMATION</Label>
        </Reveal>
        <Reveal delay={60}>
          <Heading tone="light" className="mt-8 max-w-[18ch]">
            From the first call to the <Accent>final invoice.</Accent>
          </Heading>
        </Reveal>

        <div className="mt-20 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map(([n, t, d], i) => (
            <Reveal key={n} delay={i * 50}>
              <div className="group relative h-full rounded-2xl border border-[#e2e9f3] bg-white p-7 transition-all duration-250 hover:-translate-y-1 hover:border-[#3b82f6]/45 hover:shadow-[0_24px_60px_-40px_rgba(16,42,99,0.6)]">
                <span className="label-mono text-[#9db4d6]">{n}</span>
                <h3 className="mt-10 text-[19px] font-light tracking-[-0.01em] text-[#08152e]">
                  {t}
                </h3>
                <p className="mt-3 text-[14px] leading-relaxed text-[#5d76a3]">{d}</p>
                <ArrowRight
                  size={16}
                  className="hover-arrow mt-8 text-[#1e4ed8] opacity-60"
                />
                {i < STEPS.length - 1 && (
                  <span className="pointer-events-none absolute top-1/2 -right-2.5 hidden h-px w-5 bg-[#cfdcee] lg:block" />
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const INDUSTRIES = [
  [WashingMachine, "APPLIANCE REPAIR", "Washing machines, refrigerators, ovens and more."],
  [Wind, "AC & HVAC", "Installations, servicing and seasonal maintenance."],
  [Cpu, "ELECTRONICS REPAIR", "Boards, displays and component-level service."],
  [Smartphone, "MOBILE & LAPTOP", "Walk-in and doorstep device repair."],
  [Car, "AUTOMOTIVE", "Garages, roadside and mobile mechanics."],
  [Home, "HOME SERVICES", "Plumbing, electrical and handyman teams."],
  [Building2, "SERVICE CENTERS", "Multi-location authorised service operations."],
] as const;

export function IndustryCarousel() {
  const ref = useRef<HTMLDivElement>(null);
  const scroll = (dir: number) =>
    ref.current?.scrollBy({ left: dir * 420, behavior: "smooth" });

  return (
    <section className="bg-[#eef3f8] py-14 sm:py-20 lg:py-[150px]">
      <div className="shell">
        <div className="grid items-end gap-8 lg:grid-cols-[1fr_auto]">
          <Reveal>
            <Heading tone="light" className="max-w-[14ch]">
              Built for <Accent>every</Accent> service business.
            </Heading>
          </Reveal>
          <Reveal delay={80}>
            <div className="flex gap-2">
              {[-1, 1].map((d) => (
                <button
                  key={d}
                  aria-label={d < 0 ? "Previous" : "Next"}
                  onClick={() => scroll(d)}
                  className="grid h-12 w-12 place-items-center rounded-xl border border-[#dbe5f2] bg-white text-[#102a63] transition-all hover:-translate-y-0.5 hover:border-[#3b82f6]/50"
                >
                  {d < 0 ? "←" : "→"}
                </button>
              ))}
            </div>
          </Reveal>
        </div>
      </div>

      <div
        ref={ref}
        className="mt-16 flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-6 lg:px-12 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {INDUSTRIES.map(([Icon, t, d]) => (
          <article
            key={t}
            className="group w-[300px] shrink-0 snap-start rounded-[24px] border border-[#dfe7f1] bg-white p-7 transition-all duration-250 hover:-translate-y-1.5 hover:border-[#3b82f6]/45 hover:shadow-[0_30px_70px_-45px_rgba(16,42,99,0.6)] sm:w-[380px]"
          >
            <div className="relative h-44 overflow-hidden rounded-2xl bg-[#0b1b38]">
              <div className="absolute inset-0 bg-[radial-gradient(80%_80%_at_70%_20%,rgba(59,130,246,0.55),transparent_65%)]" />
              <svg viewBox="0 0 380 176" className="absolute inset-0 h-full w-full">
                {[0, 1, 2, 3].map((i) => (
                  <path
                    key={i}
                    d={`M-20 ${150 - i * 26} C 110 ${90 - i * 20}, 240 ${170 - i * 30}, 400 ${60 - i * 22}`}
                    stroke={i % 2 ? "#38bdf8" : "#3b82f6"}
                    strokeOpacity={0.28 + i * 0.12}
                    strokeWidth={1.6}
                    fill="none"
                  />
                ))}
              </svg>
              <Icon
                size={26}
                className="absolute bottom-5 left-5 text-white"
                strokeWidth={1.2}
              />
            </div>
            <h3 className="mt-7 text-[20px] font-light tracking-[-0.02em] text-[#08152e]">
              {t}
            </h3>
            <p className="mt-2 text-[14px] leading-relaxed text-[#5d76a3]">{d}</p>
            <ArrowRight size={16} className="hover-arrow mt-8 text-[#1e4ed8]" />
          </article>
        ))}
      </div>
    </section>
  );
}

const LEFT = [
  "AI Voice Agents",
  "Lead Management",
  "Automated Booking",
  "Customer Management",
  "Technician Scheduling",
  "Service Jobs",
  "Estimates & Quotes",
  "Invoicing",
];
const RIGHT = [
  "Payments",
  "WhatsApp Automation",
  "Notifications",
  "Technician Tracking",
  "Reports & Analytics",
  "Service History",
  "Multi-location",
  "API & Integrations",
];

function Row({ label }: { label: string }) {
  return (
    <a
      href="#cta"
      className="group flex items-center justify-between gap-6 border-b border-[#dde5f0] px-5 py-6 transition-all duration-250 hover:rounded-2xl hover:border-transparent hover:bg-white hover:shadow-[0_18px_44px_-30px_rgba(16,42,99,0.6)] hover:ring-1 hover:ring-[#3b82f6]/35"
    >
      <span className="text-[clamp(1.15rem,2vw,1.6rem)] font-light tracking-[-0.02em] text-[#102a63]">
        {label}
      </span>
      <ArrowRight size={18} className="hover-arrow shrink-0 text-[#1e4ed8]" />
    </a>
  );
}

export function FeatureDirectory() {
  return (
    <section className="section-pad bg-[#eef3f8]">
      <div className="shell grid gap-12 lg:grid-cols-[0.35fr_1.65fr] lg:gap-20">
        <Reveal>
          <Label tone="light">FEATURES</Label>
        </Reveal>
        <div className="grid gap-x-10 md:grid-cols-2">
          <div>
            {LEFT.map((l) => (
              <Row key={l} label={l} />
            ))}
          </div>
          <div>
            {RIGHT.map((l) => (
              <Row key={l} label={l} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const METRICS = [
  ["NEW LEADS", "128"],
  ["CALLS ANSWERED", "94%"],
  ["BOOKING RATE", "72%"],
  ["ACTIVE JOBS", "34"],
  ["REVENUE", "₹8.42L"],
];
const TOP = [
  ["AC Repair", 34],
  ["Washing Machine", 27],
  ["Laptop Repair", 21],
  ["Other", 18],
] as const;

export function AnalyticsDemo() {
  const pts = [18, 32, 26, 44, 38, 58, 50, 72, 64, 86, 78, 96];
  const path = pts
    .map((p, i) => `${i === 0 ? "M" : "L"}${(i / (pts.length - 1)) * 640},${120 - p}`)
    .join(" ");
  return (
    <section className="section-pad bg-[#f7f9fc]">
      <div className="shell">
        <Reveal>
          <Label tone="light">REPORTS & ANALYTICS</Label>
        </Reveal>
        <Reveal delay={60}>
          <Heading tone="light" className="mt-8 max-w-[18ch]">
            Know what is happening across your <Accent>operation.</Accent>
          </Heading>
        </Reveal>

        <Reveal delay={120}>
          <div className="mt-16 rounded-[28px] border border-[#dfe7f1] bg-white p-6 shadow-[0_50px_140px_-80px_rgba(16,42,99,0.6)] lg:p-10">
            <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-5">
              {METRICS.map(([k, v]) => (
                <div key={k} className="rounded-2xl bg-[#f1f5f9] p-5">
                  <div className="label-mono text-[#8190aa]">{k}</div>
                  <div className="mt-3 text-[30px] font-light tracking-[-0.03em] text-[#08152e]">
                    {v}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 grid gap-6 lg:grid-cols-[1.6fr_1fr]">
              <div className="rounded-2xl border border-[#e6ecf4] p-6">
                <div className="label-mono text-[#8190aa]">BOOKINGS · LAST 12 WEEKS</div>
                <svg viewBox="0 0 640 130" className="mt-6 h-auto w-full">
                  {[30, 60, 90].map((y) => (
                    <line key={y} x1="0" y1={y} x2="640" y2={y} stroke="#eef1f6" />
                  ))}
                  <path d={path} fill="none" stroke="#1e4ed8" strokeWidth="2.2" />
                  <path
                    d={`${path} L640,130 L0,130 Z`}
                    fill="url(#g)"
                    opacity="0.18"
                  />
                  <defs>
                    <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#3b82f6" />
                      <stop offset="100%" stopColor="#ffffff" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <div className="rounded-2xl border border-[#e6ecf4] p-6">
                <div className="label-mono text-[#8190aa]">TOP SERVICE TYPES</div>
                <div className="mt-6 space-y-4">
                  {TOP.map(([k, v]) => (
                    <div key={k}>
                      <div className="flex justify-between text-[14px]">
                        <span className="text-[#102a63]">{k}</span>
                        <span className="font-mono text-[#5d76a3]">{v}%</span>
                      </div>
                      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#eef1f6]">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-[#1747b8] to-[#38bdf8]"
                          style={{ width: `${v * 2.4}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

const POSTS = [
  ["JULY 15, 2026", "AI & AUTOMATION", "How AI Voice Agents Are Changing Repair Businesses"],
  ["JULY 09, 2026", "OPERATIONS", "How to Automate Technician Scheduling"],
  ["JULY 02, 2026", "SERVICE OPERATIONS", "From Lead to Invoice: The Modern Service Workflow"],
];

export function BlogCards() {
  return (
    <section className="section-pad bg-[#eef3f8]">
      <div className="shell">
        <Reveal>
          <Heading tone="light">Latest from Numunix</Heading>
        </Reveal>
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {POSTS.map(([d, c, t], i) => (
            <Reveal key={t} delay={i * 70}>
              <a
                href="#cta"
                className="group block h-full overflow-hidden rounded-[22px] border border-[#dfe7f1] bg-white transition-all duration-250 hover:-translate-y-1.5 hover:border-[#3b82f6]/40 hover:shadow-[0_30px_70px_-45px_rgba(16,42,99,0.6)]"
              >
                <div className="relative h-56 overflow-hidden bg-[#05070c]">
                  <div className="absolute inset-0 bg-[radial-gradient(90%_90%_at_30%_10%,rgba(30,78,216,0.75),transparent_60%)]" />
                  <svg viewBox="0 0 400 224" className="absolute inset-0 h-full w-full">
                    {[0, 1, 2, 3, 4].map((k) => (
                      <path
                        key={k}
                        d={`M${-40 + k * 30} 240 C ${120 + k * 20} ${150 - k * 18}, ${220 - k * 10} ${120 + k * 16}, ${460} ${-20 + k * 26}`}
                        stroke={k % 2 ? "#60a5fa" : "#1e4ed8"}
                        strokeOpacity={0.5}
                        strokeWidth={10 - k}
                        fill="none"
                      />
                    ))}
                  </svg>
                </div>
                <div className="p-7">
                  <div className="label-mono flex flex-wrap gap-3 text-[#8190aa]">
                    <span>{d}</span>
                    <span className="text-[#1747b8]">{c}</span>
                  </div>
                  <h3 className="mt-5 text-[22px] font-light leading-snug tracking-[-0.02em] text-[#08152e]">
                    {t}
                  </h3>
                  <ArrowRight size={17} className="hover-arrow mt-8 text-[#1e4ed8]" />
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
