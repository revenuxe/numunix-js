import { useState } from "react";
import NumunixRibbonScene from "./NumunixRibbonScene";
import { Label, Heading, Accent, Btn, Reveal } from "./primitives";
import ServiceDemo from "./ServiceDemo";
import { ShieldCheck, Users, Activity, FileSearch } from "lucide-react";

export function AIAgentsSection() {
  return (
    <section className="grain relative overflow-hidden bg-[#05070c] py-14 sm:py-20 lg:py-[104px]">
      <div className="pointer-events-none absolute inset-0 opacity-90">
        <NumunixRibbonScene className="h-full w-full" ribbons={4} intensity={0.85} />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(100%_70%_at_0%_50%,rgba(5,7,12,0.95),transparent_70%)]" />
      <div className="shell relative grid gap-14 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-20">
        <div>
          <Reveal>
            <Label>AI DIAGNOSTICS</Label>
          </Reveal>
          <Reveal delay={60}>
            <Heading className="mt-8">
              Your device problem,
              <br />
              quickly <Accent>understood.</Accent>
            </Heading>
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-8 max-w-[50ch] text-[18px] leading-relaxed text-white/60 lg:text-[20px]">
              Describe what's wrong in plain words — on chat or WhatsApp. Our AI assistant recognises the device, points to the likely fault, and books the right bench slot with a clear estimate.
            </p>
          </Reveal>
          <Reveal delay={180}>
            <div className="mt-10 flex flex-wrap gap-3">
              <Btn as="a" href="/contact">
                BOOK A REPAIR
              </Btn>
              <Btn as="a" href="/features" variant="ghostDark">
                WHAT WE REPAIR
              </Btn>
            </div>
          </Reveal>
        </div>
        <Reveal delay={140}>
          <ServiceDemo slug="ai-automation" preset="repair-ai" href="/features" />
        </Reveal>
      </div>
    </section>
  );
}

export function DispatchSection() {
  return (
    <section className="relative overflow-hidden bg-[#07111f] py-14 sm:py-20 lg:py-[104px]">
      <div className="shell grid gap-14 lg:grid-cols-[1fr_1.05fr] lg:items-center lg:gap-20">
        <div>
          <Reveal>
            <Label>WARRANTY & AMC</Label>
          </Reveal>
          <Reveal delay={60}>
            <Heading className="mt-8">
              One plan. Every device <Accent>covered.</Accent>
            </Heading>
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-8 max-w-[46ch] text-[18px] leading-relaxed text-white/60">
              Annual maintenance plans for homes, shops, and offices — scheduled preventive visits, priority repair slots, and honest advice about what is actually worth fixing.
            </p>
          </Reveal>
          <Reveal delay={160}>
            <dl className="mt-10 grid grid-cols-2 gap-x-8 gap-y-6 border-t border-white/10 pt-8">
              {[
                ["PLANS", "Home · Shop · Office"],
                ["COVERED", "Phones · Laptops · CCTV · Appliances"],
                ["VISITS", "Scheduled preventive checks"],
                ["SUPPORT", "Priority slots · Doorstep service"],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt className="label-mono text-[#8fb4e8]">{k}</dt>
                  <dd className="mt-2 text-[15px] text-white/70">{v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
        <Reveal delay={140}>
          <ServiceDemo slug="cloud-integrations" preset="repair-warranty" href="/features" />
        </Reveal>
      </div>
    </section>
  );
}

const SECURITY = [
  [ShieldCheck, "PRIVACY FIRST", "Your photos, files, and accounts stay yours — we ask before touching anything."],
  [Users, "CAREFUL HANDLING", "Every device is checked in, logged, and tracked from counter to bench."],
  [Activity, "TESTED PARTS", "Each replacement part is verified before it ever reaches your device."],
  [FileSearch, "TRANSPARENT JOBS", "Itemised estimates, live status, and a warranty recorded on your job card."],
] as const;

export function SecuritySection() {
  return (
    <section id="security" className="grain relative overflow-hidden bg-[#05070c] py-14 sm:py-20 lg:py-[104px]">
      <div className="pointer-events-none absolute inset-0">
        <NumunixRibbonScene className="h-full w-full" ribbons={5} intensity={0.8} />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(110%_80%_at_20%_50%,rgba(5,7,12,0.95),transparent_72%)]" />
      <div className="shell relative grid gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div>
          <Reveal>
            <Label>SECURITY</Label>
          </Reveal>
          <Reveal delay={60}>
            <Heading className="mt-8">
              Careful,
              <br />
              <Accent>honest</Accent> and
              <br />
              built to last.
            </Heading>
          </Reveal>
        </div>
        <div className="grid gap-10 sm:grid-cols-2">
          {SECURITY.map(([Icon, t, d], i) => (
            <Reveal key={t} delay={60 + i * 60}>
              <div>
                <div className="flex items-center gap-2.5">
                  <Icon size={17} className="text-[#6fb3ff]" />
                  <h3 className="text-[19px] font-light tracking-[-0.01em] text-white">
                    {t}
                  </h3>
                </div>
                <p className="mt-3 text-[15px] leading-relaxed text-white/55">{d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const BUILT_TABS = ["PHONES", "LAPTOPS", "CCTV", "APPLIANCES"];
const BUILT_CARDS = [
  ["MOBILE & TABLET REPAIRS", "Screens, batteries, charging ports, cameras, and water damage — fixed fast, with tested parts.", "/features"],
  ["LAPTOP & COMPUTER REPAIRS", "Board-level repair, displays, keyboards, and upgrades for every major brand.", "/features"],
  ["CCTV & SECURITY SYSTEMS", "Installation, DVR/NVR setup, camera repair, and maintenance for homes and businesses.", "/features"],
  ["APPLIANCES & AMC PLANS", "Washing machines, microwaves, chimneys, and annual maintenance for every device you own.", "/features"],
];

export function BuiltWithNumunix() {
  const [tab, setTab] = useState(0);
  return (
    <section className="grain relative overflow-hidden bg-[#07111f] py-14 sm:py-20 lg:py-[104px]">
      <div className="pointer-events-none absolute inset-0 opacity-70">
        <NumunixRibbonScene className="h-full w-full" ribbons={3} intensity={0.6} />
      </div>
      <div className="shell relative">
        <Reveal>
          <Heading className="text-center">What we can fix for you</Heading>
        </Reveal>
        <Reveal delay={80}>
          <div className="mt-10 flex justify-center">
            <div className="flex gap-1 rounded-2xl border border-white/10 bg-white/[0.06] p-1 backdrop-blur-xl">
              {BUILT_TABS.map((t, i) => (
                <button
                  key={t}
                  onClick={() => setTab(i)}
                  aria-pressed={tab === i}
                  className={`label-mono rounded-xl px-5 py-3 transition-colors ${
                    tab === i ? "bg-white text-[#102a63]" : "text-white/65 hover:text-white"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        <div className="mt-16 grid gap-5 md:grid-cols-2">
          {[...BUILT_CARDS.slice(tab), ...BUILT_CARDS.slice(0, tab)].map(([t, d, href], i) => (
            <Reveal key={t} delay={60 + i * 60}>
              <a href={href} className="group block h-full rounded-[22px] bg-gradient-to-b from-white to-[#eef3f8] p-8 transition-all duration-250 hover:-translate-y-1 hover:shadow-[0_30px_70px_-40px_rgba(0,0,0,0.8)]">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-[#dbe6f8]">
                  <span className="label-mono text-[#1747b8]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-8 text-[24px] font-light tracking-[-0.02em] text-[#08152e]">
                  {t}
                </h3>
                <p className="mt-3 max-w-[38ch] text-[15px] leading-relaxed text-[#5d76a3]">
                  {d}
                </p>
                <span className="label-mono mt-10 inline-flex items-center gap-2 text-[#1747b8]">
                  EXPLORE SERVICE <span className="hover-arrow">→</span>
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FinalCTA() {
  return (
    <section
      id="cta"
      className="grain relative overflow-hidden bg-[#05070c] py-14 sm:py-20 lg:py-[130px]"
    >
      <div className="pointer-events-none absolute inset-0">
        <NumunixRibbonScene className="h-full w-full" ribbons={6} />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(100%_70%_at_50%_50%,rgba(5,7,12,0.82),rgba(5,7,12,0.4))]" />
      <div className="shell relative">
        <Reveal>
          <Heading size="xl" className="max-w-[16ch]">
            Device not working?{" "}
            <Accent>
              Let’s bring it back.
            </Accent>
          </Heading>
        </Reveal>
        <Reveal delay={100}>
          <p className="mt-10 max-w-[54ch] text-[18px] leading-relaxed text-white/60 lg:text-[20px]">
            A cracked phone screen, a laptop that won’t start, CCTV that dropped offline, or an appliance that stopped mid-cycle — walk in or book a doorstep visit, and get a clear estimate before we start.
          </p>
        </Reveal>
        <Reveal delay={160}>
          <div className="mt-12 flex flex-wrap gap-3">
            <Btn as="a" href="/contact">
              BOOK A REPAIR
            </Btn>
            <Btn as="a" href="/features" variant="ghostDark">
              WHAT WE REPAIR
            </Btn>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
