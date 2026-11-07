import { useRef } from "react";
import { Link } from "@tanstack/react-router";
import { Heading, Accent, Reveal } from "./primitives";
import { useCategory } from "./category";
import { REPAIR_PAGES, repairServiceHref, repairPageHref } from "@/content/repair-services";
import { REPAIR_SERVICES } from "@/content/homepage-repairs";
import { DeviceVisual } from "./RepairVisual";
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
  ["01", "BOOK", "Tell us the device and the fault, walk in, call, or book online.", "fault-intake"],
  ["02", "DIAGNOSE", "Technicians test the device and pinpoint the actual fault, not a guess.", "fault-diagnosis"],
  ["03", "ESTIMATE", "A clear, itemised quote before any work starts. You approve it.", "repair-estimate"],
  ["04", "APPROVE", "Confirm the estimate and agreed work before repair begins.", "repair-approval"],
  ["05", "REPAIR", "Complete the approved repair with compatible parts where needed.", "repair-work"],
  ["06", "TEST", "Every function is checked before the device leaves the bench.", "function-testing"],
  ["07", "DELIVER", "Pick up in-store or choose doorstep delivery, on schedule.", "repair-handover"],
  ["08", "AFTERCARE", "Confirm the warranty terms and maintenance options for your repair.", "repair-aftercare"],
] as const;

export function AutomationWorkflow() {
  const category = useCategory()?.category ?? "electronics";
  const steps = category === "appliances" ? STEPS.map((step, i) => [step[0], step[1], ["Share the appliance model, symptoms and where it is installed.", "A specialist checks the fault and installation conditions.", "Review labour, parts and any visit charges before approving work.", "Approve the estimate and agreed work before repair begins.", "The approved repair is completed with suitable parts.", "Check a cycle, cooling, heating or water flow after the repair.", "Review the work and receive the service record.", "Confirm aftercare advice and the warranty terms for your repair."][i] ?? step[2], step[3]]) : STEPS;
  return (
    <section id="process" className="section-pad bg-[#f7f9fc]">
      <div className="shell">
        <Reveal delay={60}>
          <Heading tone="light" className="mt-8 max-w-[18ch]">
            From enquiry <Accent>to completion.</Accent>
          </Heading>
        </Reveal>

        <div className="mt-20 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map(([n, t, d, slug], i) => (
            <Reveal key={n} delay={i * 50}>
              <Link
                to="/repair-process/$slug"
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
  [Smartphone, "MOBILE PHONES", "Screens, batteries, charging ports, cameras, and water damage, every major brand.", "/services"],
  [Laptop, "LAPTOPS & COMPUTERS", "Board-level repair, displays, keyboards, upgrades, and tune-ups.", "/services"],
  [Cctv, "CCTV & SECURITY", "Installation, DVR/NVR setup, camera repair, and preventive maintenance.", "/services"],
  [WashingMachine, "HOME APPLIANCES", "Washing machines, microwaves, chimneys, and small appliances.", "/services"],
  [Tv, "TV & AUDIO", "Panels, backlights, boards, speakers, and soundbar service.", "/services"],
  [Gamepad2, "TABLETS & CONSOLES", "Tablet screens and batteries, console HDMI ports, and board repairs.", "/services"],
  [HardDrive, "DATA RECOVERY", "Photos, files, and contacts recovered from failed drives and phones.", "/services"],
] as const;

export function IndustryCarousel() {
  const category = useCategory()?.category ?? "electronics";
  const services = REPAIR_SERVICES[category];
  const ref = useRef<HTMLDivElement>(null);
  const scroll = (dir: number) =>
    ref.current?.scrollBy({ left: dir * 420, behavior: "smooth" });

  return (
    <section id="products" className="bg-[#eef3f8] py-14 sm:py-20 lg:py-[104px]">
      <div className="shell">
        <div className="grid items-end gap-8 lg:grid-cols-[1fr_auto]">
          <Reveal>
            <Heading tone="light" className="max-w-[14ch]">
              We repair the {category === "appliances" ? "appliances" : "devices"} <Accent>you rely on.</Accent>
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
        {services.map(({ icon: Icon, nav: t, body: d, kind }) => (
          <a
            href={repairServiceHref(category, kind)}
            key={t}
            className="group w-[300px] shrink-0 snap-start rounded-[24px] border border-[#dfe7f1] bg-white p-7 transition-all duration-250 hover:-translate-y-1.5 hover:border-[#3b82f6]/45 hover:shadow-[0_30px_70px_-45px_rgba(16,42,99,0.6)] sm:w-[380px]"
          >
            <div className="relative flex h-44 items-center justify-center overflow-hidden rounded-2xl bg-mist">
              <DeviceVisual kind={kind} />
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

const ELECTRONICS_ROWS = REPAIR_PAGES.filter(service => service.category === "electronics").map(service => [REPAIR_SERVICES.electronics.find(item => item.kind === service.kind)?.icon ?? Smartphone, service.name, repairPageHref(service)] as const);
const APPLIANCE_ROWS = REPAIR_PAGES.filter(service => service.category === "appliances").map(service => [REPAIR_SERVICES.appliances.find(item => item.kind === service.kind)?.icon ?? Zap, service.name, repairPageHref(service)] as const);

function Row({ icon: Icon, label, href }: { icon: LucideIcon; label: string; href: string }) {
  return (
    <a
      href={href}
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
        <div className="grid gap-x-10 md:grid-cols-2">
          <div>
            {left.map(([icon, l, href]) => (
              <Row key={l} icon={icon} label={l} href={href} />
            ))}
          </div>
          <div>
            {right.map(([icon, l, href]) => (
              <Row key={l} icon={icon} label={l} href={href} />
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
  const category = useCategory()?.category ?? "electronics";
  const top = category === "appliances" ? [["Washing Machine", 34], ["AC", 27], ["Refrigerator", 21], ["Purifier", 18]] as const : [["Mobile", 34], ["Laptop", 27], ["CCTV", 21], ["TV & Audio", 18]] as const;
  const pts = [18, 32, 26, 44, 38, 58, 50, 72, 64, 86, 78, 96];
  const path = pts
    .map((p, i) => `${i === 0 ? "M" : "L"}${(i / (pts.length - 1)) * 640},${120 - p}`)
    .join(" ");
  return (
    <section id="analytics" className="section-pad bg-[#f7f9fc]">
      <div className="shell">
        <Reveal delay={60}>
          <Heading tone="light" className="mt-8 max-w-[18ch]">
            See every {category === "appliances" ? "appliance repair" : "device repair"}, <Accent>clearly.</Accent>
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
                <div className="label-mono text-[#8190aa]">ILLUSTRATIVE REPAIR WORKFLOW</div>
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
                <div className="label-mono text-[#8190aa]">SAMPLE SERVICE CATEGORIES</div>
                <div className="mt-6 space-y-4">
                  {top.map(([k, v]) => (
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
  ["LEAD MANAGEMENT", "CUSTOMER ENQUIRIES", "Capture customer enquiries, organize service requests and keep every potential repair opportunity in view.", "/admin/login"],
  ["BOOKING MANAGEMENT", "SERVICE BOOKINGS", "Manage customer bookings, appliance details and scheduled service requests through a structured workflow.", "/admin/login"],
  ["JOB TRACKING", "CONNECTED WORKFLOW", "Follow repair jobs through assignment, acceptance, progress and completion.", "/admin/login"],
];

export function BlogCards() {
  const category = useCategory()?.category ?? "electronics";
  const services = REPAIR_SERVICES[category];
  const posts = category === "appliances" ? [["DIAGNOSE FIRST", "APPLIANCE CARE", "Cooling, drainage and power faults checked before replacing parts.", "/repair-diagnostics"], ["CLEAR SCOPE", "YOUR APPROVAL", "Review the visit, parts and labour estimate before work begins.", "/repair-process/repair-estimate"], ["TESTED AT HOME", "AFTERCARE", "Check the repaired function and understand the next care steps.", "/repair-aftercare"]] : POSTS;
  return (
    <section className="section-pad bg-[#eef3f8]">
      <div className="shell">
        <Reveal>
          <Heading tone="light">Everything you need to manage every repair.</Heading>
        </Reveal>
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {posts.map(([d, c, t, href], i) => (
            <Reveal key={t} delay={i * 70}>
              <a
                href={href}
                className="group block h-full overflow-hidden rounded-[22px] border border-[#dfe7f1] bg-white transition-all duration-250 hover:-translate-y-1.5 hover:border-[#3b82f6]/40 hover:shadow-[0_30px_70px_-45px_rgba(16,42,99,0.6)]"
              >
                <div className="relative flex h-56 items-center justify-center overflow-hidden bg-mist">
                  <DeviceVisual kind={services[i]?.kind ?? "phone"} />
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
