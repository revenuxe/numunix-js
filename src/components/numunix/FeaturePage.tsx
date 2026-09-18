import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import Header from "./Header";
import Footer from "./Footer";
import NumunixRibbonScene from "./NumunixRibbonScene";
import { Label, Heading, Accent, Btn, Reveal } from "./primitives";
import { AICallDemo } from "./AICallDemo";
import {
  BookingDemo,
  TechnicianDispatch,
  ServiceOperations,
  InvoiceDemo,
  VoiceAgentPanel,
} from "./demos";
import { WorkflowVisualization } from "./WorkflowVisualization";
import { FEATURES, type Feature, type DemoKey } from "@/content/features";

function Demo({ k }: { k: DemoKey }) {
  switch (k) {
    case "call":
      return <AICallDemo />;
    case "booking":
      return <BookingDemo />;
    case "dispatch":
      return <TechnicianDispatch />;
    case "jobs":
      return <ServiceOperations />;
    case "invoice":
      return <InvoiceDemo />;
    case "voice":
      return <VoiceAgentPanel />;
    case "flow":
      return <WorkflowVisualization />;
  }
}

function headline(title: string, accent: string) {
  const i = title.indexOf(accent);
  if (i < 0) return <>{title}</>;
  return (
    <>
      {title.slice(0, i)}
      <Accent>{accent}</Accent>
      {title.slice(i + accent.length)}
    </>
  );
}

export function FeaturePage({ feature }: { feature: Feature }) {
  const related = FEATURES.filter((f) => f.slug !== feature.slug).slice(0, 3);

  return (
    <div className="bg-[#05070c]">
      <Header />
      <main>
        {/* HERO — dark */}
        <section className="relative flex min-h-[74svh] items-end overflow-hidden bg-[#05070c] pt-28 pb-14 lg:min-h-[80vh] lg:pt-40 lg:pb-24">
          <div className="absolute inset-0">
            <NumunixRibbonScene />
          </div>
          <div className="grain pointer-events-none absolute inset-0 opacity-[0.5]" />
          <div className="shell relative grid gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:items-end lg:gap-20">
            <Reveal>
              <Label>{feature.label}</Label>
              <h1
                style={{ lineHeight: 1.04 }}
                className="mt-6 max-w-[16ch] font-light tracking-[-0.03em] text-white text-[clamp(2.4rem,6vw,5.6rem)]"
              >
                {headline(feature.title, feature.accentWord)}
              </h1>
            </Reveal>
            <Reveal delay={120}>
              <p className="max-w-[46ch] text-[17px] leading-relaxed text-white/60 lg:text-[19px]">
                {feature.intro}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Btn as="a" href="#cta">
                  GET STARTED
                </Btn>
                <Btn as="a" href="#cta" variant="ghostDark">
                  BOOK A DEMO
                </Btn>
              </div>
            </Reveal>
          </div>
        </section>

        {/* STATS strip */}
        <section className="border-y border-white/[0.07] bg-[#07111f]">
          <div className="shell grid grid-cols-2 lg:grid-cols-4">
            {feature.stats.map(([k, v], i) => (
              <div
                key={k}
                className={`border-white/[0.07] px-1 py-7 lg:py-9 ${i % 2 === 0 ? "border-r" : ""} ${i < 2 ? "border-b lg:border-b-0" : ""} lg:border-r lg:last:border-r-0`}
              >
                <div className="font-mono text-[26px] leading-none font-light text-white lg:text-[32px]">
                  {v}
                </div>
                <div className="label-mono mt-2.5 text-[#8fb4e8]">{k}</div>
              </div>
            ))}
          </div>
        </section>

        {/* LIVE DEMO — light */}
        <section className="section-pad bg-[#f1f5f9]">
          <div className="shell">
            <Reveal>
              <Label tone="light">LIVE INTERFACE</Label>
            </Reveal>
            <div className="mt-8 grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-20">
              <Reveal delay={60}>
                <Heading tone="light">
                  This is how it works
                  <br />
                  <Accent>inside Numunix.</Accent>
                </Heading>
                <ul className="mt-8 space-y-4">
                  {feature.outcomes.map((o) => (
                    <li
                      key={o}
                      className="flex gap-3 border-b border-[#dde6f2] pb-4 text-[17px] text-[#5d76a3] last:border-0"
                    >
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#1e4ed8]" />
                      {o}
                    </li>
                  ))}
                </ul>
              </Reveal>
              <Reveal delay={140}>
                <Demo k={feature.demo} />
              </Reveal>
            </div>
          </div>
        </section>

        {/* CAPABILITIES — light */}
        <section className="section-pad bg-[#eef3f8]">
          <div className="shell">
            <Reveal>
              <Label tone="light">CAPABILITIES</Label>
              <Heading tone="light" className="mt-6 max-w-[18ch]">
                Built around how service teams actually work.
              </Heading>
            </Reveal>
            <div className="mt-12 grid gap-px overflow-hidden rounded-[24px] border border-[#dbe5f2] bg-[#dbe5f2] sm:grid-cols-2">
              {feature.capabilities.map((c, i) => (
                <Reveal key={c.title} delay={i * 60}>
                  <div className="group h-full bg-white p-7 transition-colors duration-300 hover:bg-[#f7fafe] lg:p-10">
                    <span className="label-mono text-[#b3c2d6]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-5 text-[22px] font-light tracking-[-0.02em] text-[#102a63] lg:text-[26px]">
                      {c.title}
                    </h3>
                    <p className="mt-3 text-[16px] leading-relaxed text-[#5d76a3]">
                      {c.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* FLOW — dark */}
        <section className="section-pad bg-[#05070c]">
          <div className="shell">
            <Reveal>
              <Label>WORKFLOW</Label>
              <Heading className="mt-6 max-w-[16ch]">
                Step by step, <Accent>end to end.</Accent>
              </Heading>
            </Reveal>
            <div className="mt-12 grid gap-px overflow-hidden rounded-[24px] border border-[#0d2247] bg-[#0d2247] sm:grid-cols-2 lg:grid-cols-4">
              {feature.steps.map((s, i) => (
                <Reveal key={s.step} delay={i * 60}>
                  <div className="group relative h-full bg-[#05070c] p-7 transition-colors duration-300 hover:bg-[#07111f] lg:p-9">
                    <span className="pointer-events-none absolute inset-x-0 -top-px h-px scale-x-0 bg-gradient-to-r from-transparent via-[#38bdf8] to-transparent transition-transform duration-500 group-hover:scale-x-100" />
                    <span className="label-mono text-[#3b82f6]">{s.step}</span>
                    <h3 className="mt-5 text-[20px] font-light tracking-[-0.02em] text-white lg:text-[23px]">
                      {s.title}
                    </h3>
                    <p className="mt-3 text-[15.5px] leading-relaxed text-white/50">
                      {s.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* QUESTIONS — light */}
        <section className="section-pad bg-[#f7f9fc]">
          <div className="shell grid gap-12 lg:grid-cols-[0.4fr_1.6fr] lg:gap-20">
            <Reveal>
              <Label tone="light">QUESTIONS</Label>
            </Reveal>
            <div>
              {feature.faq.map((f, i) => (
                <Reveal key={f.q} delay={i * 60}>
                  <div className="border-b border-[#dde6f2] py-7">
                    <h3 className="text-[21px] font-light tracking-[-0.02em] text-[#102a63] lg:text-[25px]">
                      {f.q}
                    </h3>
                    <p className="mt-3 max-w-[70ch] text-[16.5px] leading-relaxed text-[#5d76a3]">
                      {f.a}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* RELATED — light */}
        <section className="section-pad bg-[#eef3f8]">
          <div className="shell">
            <Label tone="light">EXPLORE MORE</Label>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  to="/features/$slug"
                  params={{ slug: r.slug }}
                  className="group rounded-[20px] border border-[#dbe5f2] bg-white p-7 transition-all duration-250 hover:-translate-y-1 hover:border-[#3b82f6]/40 hover:shadow-[0_24px_60px_-34px_rgba(16,42,99,0.45)]"
                >
                  <span className="label-mono text-[#1747b8]">{r.label}</span>
                  <h3 className="mt-4 text-[22px] font-light tracking-[-0.02em] text-[#102a63]">
                    {r.name}
                  </h3>
                  <ArrowRight
                    size={18}
                    className="hover-arrow mt-6 text-[#1e4ed8]"
                  />
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section
          id="cta"
          className="relative overflow-hidden bg-[#05070c] py-24 lg:py-[130px]"
        >
          <div className="absolute inset-0">
            <NumunixRibbonScene />
          </div>
          <div className="shell relative text-center">
            <Heading size="xl" className="mx-auto max-w-[18ch]">
              Your service business.{" "}
              <Accent>Automated from lead to invoice.</Accent>
            </Heading>
            <p className="mx-auto mt-7 max-w-[54ch] text-[17px] leading-relaxed text-white/55 lg:text-[19px]">
              Let Numunix handle the repetitive operational work while your team
              focuses on customers, technicians and growth.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <Btn as="a" href="#cta">
                GET STARTED
              </Btn>
              <Btn as="a" href="#cta" variant="ghostDark">
                BOOK A DEMO
              </Btn>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default FeaturePage;
