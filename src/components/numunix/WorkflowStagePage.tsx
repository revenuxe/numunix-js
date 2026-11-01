import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { WORKFLOW_STAGES, type WorkflowStage } from "@/content/workflow";
import { Page, Section, SectionHead, ClosingCTA } from "./PageShell";
import { WorkflowHero } from "./WorkflowHero";
import { Label, Reveal } from "./primitives";
import { NODE_VIZ } from "./nodeviz";

export function WorkflowStagePage({ stage }: { stage: WorkflowStage }) {
  const index = WORKFLOW_STAGES.findIndex((item) => item.slug === stage.slug);
  const next = WORKFLOW_STAGES[index + 1];
  const Visual = NODE_VIZ[index];

  return (
    <Page>
      <WorkflowHero stage={stage} index={index} />

      <nav aria-label="Repair stages" className="border-y border-[#dbe5f2] bg-white">
        <div className="shell flex flex-wrap gap-x-5 gap-y-3 py-5">
          {WORKFLOW_STAGES.map((item, i) => (
            <Link
              key={item.slug}
              to="/repair-process/$slug"
              params={{ slug: item.slug }}
              aria-current={item.slug === stage.slug ? "page" : undefined}
              className={`inline-flex items-center gap-2 rounded-md px-2 py-2 text-sm transition-colors hover:bg-[#eff4ff] focus-visible:outline-2 focus-visible:outline-[#2563eb] ${item.slug === stage.slug ? "bg-[#eff4ff] font-medium text-[#1e4ed8]" : "text-[#5d76a3]"}`}
            >
              <span className="font-mono text-[10px] opacity-60">
                {String(i + 1).padStart(2, "0")}
              </span>
              {item.name}
            </Link>
          ))}
        </div>
      </nav>

      <Section>
        <div className="grid min-w-0 grid-cols-[minmax(0,1fr)] items-center gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:gap-24">
          <SectionHead
            label="THE OUTCOME"
            title="Your fault. Clearly understood."
            accent="Clearly understood."
            body={stage.outcome}
          />
          <Reveal delay={100} className="min-w-0">
            <div className="relative overflow-hidden rounded-[28px] border border-[#dbe5f2] bg-white p-8 shadow-[0_30px_80px_-50px_rgba(16,42,99,0.3)] sm:p-10">
              <div className="flex items-center justify-between">
                <Label tone="light">{stage.phase}</Label>
                <span className="font-mono text-sm text-[#8190aa]">
                  {String(index + 1).padStart(2, "0")} / 08
                </span>
              </div>
              <div className="mt-8 font-mono text-4xl font-light tracking-normal text-navytext sm:text-6xl">
                {stage.name}
              </div>
              <div className="label-mono mt-3 text-[#2563eb]">{stage.category}</div>
              <div aria-hidden="true" className="my-10 max-w-[260px] origin-left scale-110">
                {Visual && <Visual />}
              </div>
              <div className="flex items-center gap-2 border-t border-[#e6ecf5] pt-5 text-sm text-[#5d76a3]">
                <Check size={16} className="text-[#2563eb]" />
                One connected repair journey
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      <section id="deliverables" className="section-pad scroll-mt-24 bg-[#edf2f9]">
        <div className="shell">
          <SectionHead
            label="WHAT YOU GET"
            title="Repair details. Kept together."
            accent="Kept together."
            body="Review the findings, decisions and records relevant to this stage of your repair."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {stage.deliverables.map(([title, body], i) => (
              <Reveal key={title} delay={i * 50} className="h-full">
                <article className="h-full rounded-[22px] border border-[#dbe5f2] bg-white p-7 lg:p-9">
                  <span className="font-mono text-xs text-[#2563eb]">
                    {String(i + 1).padStart(2, "0")} / DELIVERABLE
                  </span>
                  <h3 className="mt-5 text-xl font-light text-[#102a63]">{title}</h3>
                  <p className="mt-3 text-base leading-relaxed text-[#5d76a3]">{body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Section bg="#07111f">
        <SectionHead
          tone="dark"
          label="HOW WE WORK"
          title="A clear process. Shared decisions."
          accent="Shared decisions."
        />
        <div className="mt-14 grid gap-10 lg:grid-cols-3">
          {stage.steps.map(([title, body], i) => (
            <Reveal key={title} delay={i * 70}>
              <div className="border-t border-white/15 pt-7">
                <span className="font-mono text-sm text-[#8fb4e8]">STEP 0{i + 1}</span>
                <h3 className="mt-5 text-[22px] font-light text-white">{title}</h3>
                <p className="mt-4 text-base leading-relaxed text-white/60">{body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section bg="#fff">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <SectionHead label="GOOD QUESTIONS" title="Before we begin." accent="begin." />
          <div className="divide-y divide-[#dbe5f2] border-y border-[#dbe5f2]">
            {stage.faq.map(([question, answer]) => (
              <details key={question} className="group py-6">
                <summary className="cursor-pointer rounded-sm text-lg leading-relaxed text-[#102a63] focus-visible:outline-2 focus-visible:outline-[#2563eb]">
                  {question}
                </summary>
                <p className="mt-4 max-w-[60ch] text-base leading-relaxed text-[#5d76a3]">
                  {answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </Section>

      <Section bg="#f0f4fa">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
          <Link
            to="/repair-process"
            className="inline-flex items-center gap-2 text-sm text-[#5d76a3] hover:text-[#1e4ed8]"
          >
            <ArrowLeft size={16} />
            Explore the repair process
          </Link>
          {next ? (
            <Link
              to="/repair-process/$slug"
              params={{ slug: next.slug }}
              className="group flex items-center justify-between gap-8 rounded-2xl border border-[#dbe5f2] bg-white p-6 transition-colors hover:border-[#2563eb] focus-visible:outline-2 focus-visible:outline-[#2563eb] sm:min-w-80"
            >
              <div>
                <span className="label-mono text-[#5d76a3]">UP NEXT / {next.phase}</span>
                <div className="mt-2 font-mono text-2xl text-[#102a63]">{next.name}</div>
              </div>
              <ArrowRight className="text-[#2563eb]" size={24} />
            </Link>
          ) : (
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 rounded-xl bg-[#1e4ed8] px-6 py-4 text-white"
            >
              Discuss your aftercare
              <ArrowUpRight size={20} />
            </Link>
          )}
        </div>
      </Section>
      <ClosingCTA
        title="Your repair. A clear next step."
        accent="A clear next step."
        body="Share the model, symptoms and service history. Review the assessment and estimate before approving work."
      />
    </Page>
  );
}
