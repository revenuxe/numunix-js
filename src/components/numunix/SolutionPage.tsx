import { Check, X, ArrowRight } from "lucide-react";
import { Page, PageHero, StatStrip, Section, SectionHead, ClosingCTA } from "./PageShell";
import { Reveal, Label, Heading, Accent } from "./primitives";
import { AICallDemo } from "./AICallDemo";
import { ServiceOperations, InvoiceDemo } from "./demos";
import ContactBand from "./ContactBand";
import { SOLUTIONS, type Solution } from "@/content/solutions";
import { FEATURES } from "@/content/features";

export function SolutionPage({ solution }: { solution: Solution }) {
  const others = SOLUTIONS.filter((s) => s.slug !== solution.slug).slice(0, 3);
  const features = FEATURES.slice(0, 6);

  return (
    <Page>
      <PageHero
        label={solution.label}
        title={solution.title}
        accent={solution.accentWord}
        body={solution.intro}
        secondary={{ label: "EXPLORE FEATURES", href: "/features" }}
      />
      <StatStrip stats={solution.stats} />

      <Section bg="#f1f5f9">
        <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-20">
          <div>
            <SectionHead
              label="LIVE INTERFACE"
              title="How the day actually runs."
              accent="actually runs."
              body="The same Numunix workflow, shaped around this kind of service operation."
            />
          </div>
          <Reveal delay={120}>
            <AICallDemo />
          </Reveal>
        </div>
      </Section>

      <section className="section-pad bg-[#07111f]">
        <div className="shell">
          <SectionHead
            label="THE DIFFERENCE"
            tone="dark"
            title="What changes when Numunix runs it."
            accent="when Numunix runs it."
          />
          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            <Reveal>
              <div className="h-full rounded-[24px] border border-white/[0.07] bg-white/[0.02] p-7 lg:p-10">
                <span className="label-mono text-white/40">TODAY</span>
                <ul className="mt-7 space-y-5">
                  {solution.challenges.map((p) => (
                    <li key={p} className="flex gap-4 text-[16.5px] leading-relaxed text-white/45">
                      <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-lg bg-white/[0.06] text-white/40">
                        <X size={13} />
                      </span>
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div className="h-full rounded-[24px] border border-[#3b82f6]/30 bg-[#0b1b38]/60 p-7 lg:p-10">
                <span className="label-mono text-[#8fb4e8]">WITH NUMUNIX</span>
                <ul className="mt-7 space-y-5">
                  {solution.wins.map((g) => (
                    <li key={g} className="flex gap-4 text-[16.5px] leading-relaxed text-white/80">
                      <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-lg bg-[#1e4ed8] text-white">
                        <Check size={13} />
                      </span>
                      {g}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <Section bg="#eef3f8">
        <SectionHead label="WORKFLOW" title="From first call to final invoice." accent="final invoice." />
        <div className="mt-12 grid gap-px overflow-hidden rounded-[24px] border border-[#dbe5f2] bg-[#dbe5f2] sm:grid-cols-2 lg:grid-cols-4">
          {solution.workflow.map((s, i) => (
            <Reveal key={s.step} delay={i * 60}>
              <div className="h-full bg-white p-7 transition-colors duration-300 hover:bg-[#f7fafe] lg:p-9">
                <span className="label-mono text-[#b3c2d6]">{s.step}</span>
                <h3 className="mt-5 text-[20px] font-light tracking-[-0.02em] text-[#102a63] lg:text-[23px]">
                  {s.title}
                </h3>
                <p className="mt-3 text-[15.5px] leading-relaxed text-[#5d76a3]">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section bg="#f7f9fc">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <ServiceOperations />
          </Reveal>
          <Reveal delay={100}>
            <InvoiceDemo />
          </Reveal>
        </div>
      </Section>

      <Section bg="#eef3f8">
        <SectionHead label="FEATURES USED" title="Everything working together." accent="working together." />
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <Reveal key={f.slug} delay={i * 50}>
              <a
                href={`/features/${f.slug}`}
                className="group block h-full rounded-[20px] border border-[#dbe5f2] bg-white p-7 transition-all duration-250 hover:-translate-y-1 hover:border-[#3b82f6]/40 hover:shadow-[0_24px_60px_-34px_rgba(16,42,99,0.45)]"
              >
                <span className="label-mono text-[#1747b8]">{f.label}</span>
                <h3 className="mt-4 text-[21px] font-light tracking-[-0.02em] text-[#102a63]">
                  {f.name}
                </h3>
                <ArrowRight size={17} className="hover-arrow mt-6 text-[#1e4ed8]" />
              </a>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section bg="#f7f9fc">
        <div className="grid gap-12 lg:grid-cols-[0.4fr_1.6fr] lg:gap-20">
          <Reveal>
            <Label tone="light">QUESTIONS</Label>
          </Reveal>
          <div>
            {solution.faq.map((f, i) => (
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
      </Section>

      <ContactBand
        title={`See Numunix running a ${solution.name.toLowerCase()} operation.`}
        accent="operation."
      />

      <Section bg="#eef3f8">
        <Label tone="light">OTHER INDUSTRIES</Label>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {others.map((o) => (
            <a
              key={o.slug}
              href={`/solutions/${o.slug}`}
              className="group rounded-[20px] border border-[#dbe5f2] bg-white p-7 transition-all duration-250 hover:-translate-y-1 hover:border-[#3b82f6]/40 hover:shadow-[0_24px_60px_-34px_rgba(16,42,99,0.45)]"
            >
              <span className="label-mono text-[#1747b8]">{o.label}</span>
              <h3 className="mt-4 text-[22px] font-light tracking-[-0.02em] text-[#102a63]">
                {o.name}
              </h3>
              <ArrowRight size={18} className="hover-arrow mt-6 text-[#1e4ed8]" />
            </a>
          ))}
        </div>
      </Section>

      <ClosingCTA
        title={`${solution.name}, running on Numunix.`}
        accent="running on Numunix."
      />
      <div className="hidden">
        <Heading tone="light">
          <Accent>.</Accent>
        </Heading>
      </div>
    </Page>
  );
}

export default SolutionPage;
