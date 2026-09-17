import { useState } from "react";
import NumunixRibbonScene from "./NumunixRibbonScene";
import { Label, Heading, Accent, Btn, Reveal } from "./primitives";
import { VoiceAgentPanel, AbstractMap } from "./demos";
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
            <Label>AI AGENTS</Label>
          </Reveal>
          <Reveal delay={60}>
            <Heading className="mt-8">
              Your next call
              <br />
              can <Accent>book the next job.</Accent>
            </Heading>
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-8 max-w-[50ch] text-[18px] leading-relaxed text-white/60 lg:text-[20px]">
              Numunix AI agents answer calls, understand customer needs, capture
              service details, check availability and book appointments — without
              keeping your team tied to the phone.
            </p>
          </Reveal>
          <Reveal delay={180}>
            <div className="mt-10 flex flex-wrap gap-3">
              <Btn as="a" href="#cta">
                SEE AI AGENTS
              </Btn>
              <Btn as="a" href="#cta" variant="ghostDark">
                BOOK A DEMO
              </Btn>
            </div>
          </Reveal>
        </div>
        <Reveal delay={140}>
          <VoiceAgentPanel />
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
            <Label>SMART DISPATCH</Label>
          </Reveal>
          <Reveal delay={60}>
            <Heading className="mt-8">
              Put the <Accent>right technician</Accent> on every job.
            </Heading>
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-8 max-w-[46ch] text-[18px] leading-relaxed text-white/60">
              Numunix weighs availability, distance, skill match, current workload
              and ETA — then recommends the technician who can actually finish the
              job today.
            </p>
          </Reveal>
          <Reveal delay={160}>
            <dl className="mt-10 grid grid-cols-2 gap-x-8 gap-y-6 border-t border-white/10 pt-8">
              {[
                ["AVAILABILITY", "Live shift status"],
                ["DISTANCE", "Nearest first"],
                ["SKILL MATCH", "Category aware"],
                ["WORKLOAD & ETA", "Balanced routing"],
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
          <div className="rounded-[26px] border border-white/10 bg-white/[0.03] p-4 backdrop-blur-xl lg:p-6">
            <div className="rounded-[20px] bg-white p-1">
              <div className="p-4">
                <AbstractMap />
              </div>
              <div className="grid grid-cols-3 gap-2 px-4 pb-4">
                {[
                  ["ARJUN", "3.2 km", "18 min"],
                  ["IMRAN", "5.8 km", "26 min"],
                  ["RAHUL", "8.1 km", "41 min"],
                ].map(([n, d, e], i) => (
                  <div
                    key={n}
                    className={`rounded-xl border p-3 ${
                      i === 0 ? "border-[#1e4ed8] bg-[#e7eefb]" : "border-[#e6ecf4] bg-[#f7f9fc]"
                    }`}
                  >
                    <div className="label-mono text-[#102a63]">{n}</div>
                    <div className="mt-1 text-[12px] text-[#5d76a3]">{d}</div>
                    <div className="label-mono mt-2 text-[#1747b8]">ETA {e}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

const SECURITY = [
  [ShieldCheck, "DATA SECURITY", "Keep business and customer information protected."],
  [Users, "ROLE-BASED ACCESS", "Control what every team member can access."],
  [Activity, "RELIABLE OPERATIONS", "Keep your service workflow available and organized."],
  [FileSearch, "AUDITABILITY", "Maintain visibility into important operational actions."],
] as const;

export function SecuritySection() {
  return (
    <section className="grain relative overflow-hidden bg-[#05070c] py-14 sm:py-20 lg:py-[104px]">
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
              Secure,
              <br />
              <Accent>reliable</Accent> and
              <br />
              built for business.
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

const BUILT_TABS = ["LEADS", "OPERATIONS", "AI", "BILLING"];
const BUILT_CARDS = [
  ["AI VOICE AGENT", "Answer, qualify and book service calls automatically."],
  ["LEAD AUTOMATION", "Turn incoming enquiries into organized service opportunities."],
  ["TECHNICIAN DISPATCH", "Assign the right technician based on availability, location and skill."],
  ["SMART INVOICING", "Generate and send professional invoices without duplicate data entry."],
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
          <Heading className="text-center">Built with Numunix</Heading>
        </Reveal>
        <Reveal delay={80}>
          <div className="mt-10 flex justify-center">
            <div className="flex gap-1 rounded-2xl border border-white/10 bg-white/[0.06] p-1 backdrop-blur-xl">
              {BUILT_TABS.map((t, i) => (
                <button
                  key={t}
                  onClick={() => setTab(i)}
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
          {BUILT_CARDS.map(([t, d], i) => (
            <Reveal key={t} delay={60 + i * 60}>
              <div className="group h-full rounded-[22px] bg-gradient-to-b from-white to-[#eef3f8] p-8 transition-all duration-250 hover:-translate-y-1 hover:shadow-[0_30px_70px_-40px_rgba(0,0,0,0.8)]">
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
                  TRY NOW <span className="hover-arrow">→</span>
                </span>
              </div>
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
            Your service business.{" "}
            <Accent>
              Automated from lead to invoice.
            </Accent>
          </Heading>
        </Reveal>
        <Reveal delay={100}>
          <p className="mt-10 max-w-[54ch] text-[18px] leading-relaxed text-white/60 lg:text-[20px]">
            Let Numunix handle the repetitive operational work while your team
            focuses on customers, technicians and growth.
          </p>
        </Reveal>
        <Reveal delay={160}>
          <div className="mt-12 flex flex-wrap gap-3">
            <Btn as="a" href="#top">
              GET STARTED
            </Btn>
            <Btn as="a" href="#top" variant="ghostDark">
              BOOK A DEMO
            </Btn>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
