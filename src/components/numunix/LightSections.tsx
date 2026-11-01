import { useRef } from "react";
import { Link } from "@tanstack/react-router";
import { Label, Heading, Accent, Reveal } from "./primitives";
import { useCategory } from "./category";
import {
  ArrowRight,
  ArrowUpRight,
  Smartphone,
  Laptop,
  Cctv,
  WashingMachine,
  Tv,
  Gamepad2,
  HardDrive,
  ShieldCheck,
  AirVent,
  Zap,
  Tablet,
  Microwave,
  BatteryCharging,
  Droplets,
  Fan,
  Truck,
  type LucideIcon,
} from "lucide-react";

const STEPS = [
  ["01", "BOOK", "Tell us the device and the fault — walk in, call, or book online.", "idea"],
  ["02", "DIAGNOSE", "Technicians test the device and pinpoint the actual fault, not a guess.", "scope"],
  ["03", "ESTIMATE", "A clear, itemised quote before any work starts. You approve it.", "ux"],
  ["04", "REPAIR", "Skilled hands fix the fault using tested, quality spare parts.", "code"],
  ["05", "PARTS", "Genuine-grade spares sourced and logged against your job card.", "apis"],
  ["06", "TEST", "Every function is checked before the device leaves the bench.", "qa"],
  ["07", "DELIVER", "Pick up in-store or choose doorstep delivery, on schedule.", "cloud"],
  ["08", "WARRANTY", "A 90-day service warranty and AMC support after every job.", "grow"],
] as const;

export function AutomationWorkflow() {
  return (
    <section id="process" className="section-pad bg-[#f7f9fc]">
      <div className="shell">
        <Reveal>
          <Label tone="light">HOW WE REPAIR</Label>
        </Reveal>
        <Reveal delay={60}>
          <Heading tone="light" className="mt-8 max-w-[18ch]">
            From the first fault to a device that <Accent>works like new.</Accent>
          </Heading>
        </Reveal>

        <div className="mt-20 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map(([n, t, d, slug], i) => (
            <Reveal key={n} delay={i * 50}>
              <Link
                to="/approach/$slug"
                params={{ slug }}
                aria-label={`Explore ${t.toLowerCase()}: ${d}`}
                className="group relative block h-full rounded-2xl border border-[#e2e9f3] bg-white p-7 transition-all duration-250 hover:-translate-y-1 hover:border-[#3b82f6]/45 hover:shadow-[0_24px_60px_-40px_rgba(16,42,99,0.6)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2563eb] motion-reduce:transform-none motion-reduce:transition-none"
              >
                <span className="label-mono text-[#9db4d6]">{n}</span>
                <h3 className="mt-10 text-[19px] font-light tracking-[-0.01em] text-[#08152e]">
                  {t}
                </h3>
                <p className="mt-3 text-[14px] leading-relaxed text-[#5d76a3]">{d}</p>
                <ArrowUpRight
                  size={16}
                  aria-hidden="true"
                  className="absolute top-7 right-7 text-[#1e4ed8]"
                />
                <span aria-hidden="true" className="mt-8 block font-mono text-[10px] tracking-[0.12em] text-[#1e4ed8]">EXPLORE {t}</span>
                {i < STEPS.length - 1 && (
                  <span className="pointer-events-none absolute top-1/2 -right-2.5 hidden h-px w-5 bg-[#cfdcee] lg:block" />
                )}
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const INDUSTRIES = [
  [Smartphone, "MOBILE PHONES", "Screens, batteries, charging ports, cameras, and water damage — every major brand.", "/features"],
  [Laptop, "LAPTOPS & COMPUTERS", "Board-level repair, displays, keyboards, upgrades, and tune-ups.", "/features"],
  [Cctv, "CCTV & SECURITY", "Installation, DVR/NVR setup, camera repair, and preventive maintenance.", "/features"],
  [WashingMachine, "HOME APPLIANCES", "Washing machines, microwaves, chimneys, and small appliances.", "/features"],
  [Tv, "TV & AUDIO", "Panels, backlights, boards, speakers, and soundbar service.", "/features"],
  [Gamepad2, "TABLETS & CONSOLES", "Tablet screens and batteries, console HDMI ports, and board repairs.", "/features"],
  [HardDrive, "DATA RECOVERY", "Photos, files, and contacts recovered from failed drives and phones.", "/features"],
] as const;

export function IndustryCarousel() {
  const ref = useRef<HTMLDivElement>(null);
  const scroll = (dir: number) =>
    ref.current?.scrollBy({ left: dir * 420, behavior: "smooth" });

  return (
    <section id="products" className="bg-[#eef3f8] py-14 sm:py-20 lg:py-[104px]">
      <div className="shell">
        <div className="grid items-end gap-8 lg:grid-cols-[1fr_auto]">
          <Reveal>
            <Heading tone="light" className="max-w-[14ch]">
              We repair the devices <Accent>you rely on.</Accent>
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
        {INDUSTRIES.map(([Icon, t, d, href]) => (
          <a
            href={href}
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
          </a>
        ))}
      </div>
    </section>
  );
}

const ELECTRONICS_ROWS: [LucideIcon, string][] = [
  [Smartphone, "Mobile Repair"],
  [Laptop, "Laptop Repair"],
  [Tablet, "Tablet & iPad Repair"],
  [Cctv, "CCTV Installation"],
  [ShieldCheck, "CCTV Maintenance"],
  [Tv, "TV & Audio Repair"],
  [HardDrive, "Data Recovery"],
  [Gamepad2, "Console Repair"],
];
const APPLIANCE_ROWS: [LucideIcon, string][] = [
  [WashingMachine, "Washing Machine Repair"],
  [Microwave, "Microwave & Chimney Repair"],
  [AirVent, "AC Service & Repair"],
  [BatteryCharging, "Inverter & UPS Repair"],
  [Droplets, "Water Purifier Service"],
  [Fan, "Fan & Lighting Work"],
  [Zap, "Electrician Services"],
  [Truck, "Doorstep Service"],
];

function Row({ icon: Icon, label }: { icon: LucideIcon; label: string }) {
  return (
    <a
      href="/features"
      className="group flex items-center justify-between gap-6 border-b border-[#dde5f0] px-5 py-6 transition-all duration-250 hover:rounded-2xl hover:border-transparent hover:bg-white hover:shadow-[0_18px_44px_-30px_rgba(16,42,99,0.6)] hover:ring-1 hover:ring-[#3b82f6]/35"
    >
      <span className="flex items-center gap-4">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-[#dbe5f2] bg-[#f4f8fd] text-[#1e4ed8] transition-colors duration-250 group-hover:border-[#3b82f6]/45 group-hover:bg-[#eaf2fe]">
          <Icon size={20} strokeWidth={1.6} aria-hidden="true" />
        </span>
        <span className="text-[clamp(1.05rem,1.8vw,1.45rem)] font-light tracking-[-0.02em] text-[#102a63]">
          {label}
        </span>
      </span>
      <ArrowRight size={18} className="hover-arrow shrink-0 text-[#1e4ed8]" />
    </a>
  );
}

export function FeatureDirectory() {
  const ctx = useCategory();
  const rows = !ctx
    ? [...ELECTRONICS_ROWS, ...APPLIANCE_ROWS]
    : ctx.category === "electronics"
      ? ELECTRONICS_ROWS
      : APPLIANCE_ROWS;
  const half = Math.ceil(rows.length / 2);
  const left = rows.slice(0, half);
  const right = rows.slice(half);
  return (
    <section className="section-pad bg-[#eef3f8]">
      <div className="shell grid gap-12 lg:grid-cols-[0.35fr_1.65fr] lg:gap-20">
        <Reveal>
          <Label tone="light">WHAT WE FIX</Label>
        </Reveal>
        <div className="grid gap-x-10 md:grid-cols-2">
          <div>
            {left.map(([icon, l]) => (
              <Row key={l} icon={icon} label={l} />
            ))}
          </div>
          <div>
            {right.map(([icon, l]) => (
              <Row key={l} icon={icon} label={l} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const METRICS = [
  ["DEVICES REPAIRED", "128"],
  ["FIRST-VISIT FIXES", "94%"],
  ["PARTS IN STOCK", "72%"],
  ["JOBS TODAY", "34"],
  ["REVENUE", "₹8.42L"],
];
const TOP = [
  ["Mobile", 34],
  ["Laptop", 27],
  ["CCTV", 21],
  ["Appliances", 18],
] as const;

export function AnalyticsDemo() {
  const pts = [18, 32, 26, 44, 38, 58, 50, 72, 64, 86, 78, 96];
  const path = pts
    .map((p, i) => `${i === 0 ? "M" : "L"}${(i / (pts.length - 1)) * 640},${120 - p}`)
    .join(" ");
  return (
    <section id="analytics" className="section-pad bg-[#f7f9fc]">
      <div className="shell">
        <Reveal>
          <Label tone="light">REPAIR DESK · SAMPLE DASHBOARD</Label>
        </Reveal>
        <Reveal delay={60}>
          <Heading tone="light" className="mt-8 max-w-[18ch]">
            See every repair, <Accent>clearly.</Accent>
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
                <div className="label-mono text-[#8190aa]">REPAIRS COMPLETED · SAMPLE 12 WEEKS</div>
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
                <div className="label-mono text-[#8190aa]">JOBS BY DEVICE</div>
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
  ["FIXED RIGHT", "DIAGNOSTICS FIRST", "We find the real fault before replacing any part.", "/features"],
  ["QUALITY PARTS", "TESTED & WARRANTIED", "Every spare is verified, and every job carries a service warranty.", "/features"],
  ["ONE WORKSHOP", "END TO END", "Booking, repair, quality check, and doorstep delivery — one team.", "/features"],
];

export function BlogCards() {
  return (
    <section className="section-pad bg-[#eef3f8]">
      <div className="shell">
        <Reveal>
          <Heading tone="light">Why repair with Numunix</Heading>
        </Reveal>
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {POSTS.map(([d, c, t, href], i) => (
            <Reveal key={t} delay={i * 70}>
              <a
                href={href}
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
