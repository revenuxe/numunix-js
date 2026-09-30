import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { WorkflowStage } from "@/content/workflow";
import { accented } from "./PageShell";
import { Btn, Label, Reveal } from "./primitives";

type HeroContent = {
  title: string;
  accent: string;
  body: string;
  action: string;
  preview: string;
  summary: string;
  items: [string, string][];
};

const HERO_CONTENT: Record<string, HeroContent> = {
  idea: {
    title: "Turn your idea into a product direction.",
    accent: "a product direction.",
    body: "Have a business idea but need a starting point? We help identify your users, define the problem worth solving, and shape a product concept you can confidently take into planning.",
    action: "DISCUSS YOUR IDEA",
    preview: "YOUR DISCOVERY BLUEPRINT",
    summary: "Find the problem. Define the opportunity.",
    items: [
      ["THE PEOPLE", "Who needs this product, and why?"],
      ["THE PROBLEM", "What is difficult in their current workflow?"],
      ["THE OPPORTUNITY", "What would a better solution make possible?"],
    ],
  },
  scope: {
    title: "Define your MVP. Plan the right first release.",
    accent: "the right first release.",
    body: "Turn a long feature wishlist into a focused product plan. We map user journeys, prioritize essential capabilities, and define acceptance criteria so everyone knows what the first release needs to do.",
    action: "PLAN YOUR MVP",
    preview: "YOUR RELEASE PLAN",
    summary: "A place for every priority.",
    items: [
      ["FIRST RELEASE", "The essential journey your users need to complete."],
      ["NEXT ITERATION", "Improvements that build on early feedback."],
      ["LATER", "Ideas to revisit when the evidence supports them."],
    ],
  },
  ux: {
    title: "Design experiences your users can navigate naturally.",
    accent: "navigate naturally.",
    body: "From first visit to task completed, make the journey clear. We create user flows, interactive prototypes, and responsive interfaces that connect your brand to the way people actually use your product.",
    action: "DESIGN YOUR EXPERIENCE",
    preview: "YOUR EXPERIENCE MAP",
    summary: "Every screen has a purpose.",
    items: [
      ["ARRIVE", "Clear navigation and an obvious place to begin."],
      ["TAKE ACTION", "Focused screens with useful guidance and feedback."],
      ["COMPLETE", "A clear outcome, confirmation, and next step."],
    ],
  },
  code: {
    title: "Turn your product designs into working software.",
    accent: "working software.",
    body: "Build the interface, application logic, and data layer your product needs. We deliver reviewable increments, test important behavior, and prepare a maintainable codebase for your next release.",
    action: "DISCUSS YOUR BUILD",
    preview: "YOUR PRODUCT FOUNDATION",
    summary: "Connected from interface to data.",
    items: [
      ["INTERFACE", "Responsive screens and clear interaction states."],
      ["APPLICATION", "Business rules, workflows, and access controls."],
      ["DATA", "Structured information with reliable read and write paths."],
    ],
  },
  apis: {
    title: "Connect your product to the tools you depend on.",
    accent: "the tools you depend on.",
    body: "Bring payments, messaging, CRM, and internal systems into one connected workflow. We build API and webhook integrations with clear data ownership, secure access, and practical failure handling.",
    action: "PLAN YOUR INTEGRATIONS",
    preview: "YOUR INTEGRATION FLOW",
    summary: "The right data. In the right place.",
    items: [
      ["YOUR PRODUCT", "A user action or business event starts the flow."],
      ["API / WEBHOOK", "Validate, authenticate, and exchange the required data."],
      ["CONNECTED SERVICE", "Confirm the result and handle failures or repeat events."],
    ],
  },
  qa: {
    title: "Test the journeys your customers will rely on.",
    accent: "your customers will rely on.",
    body: "Know what works before you launch. We check critical workflows, permissions, integrations, and responsive behavior, then document defects and verify fixes against your release requirements.",
    action: "PLAN YOUR QA REVIEW",
    preview: "YOUR VALIDATION PLAN",
    summary: "Release decisions backed by checks.",
    items: [
      ["CORE JOURNEYS", "Can users complete the tasks that matter most?"],
      ["EDGE CASES", "What happens with invalid input or unavailable services?"],
      ["RELEASE REVIEW", "Which fixes are verified, and what risks remain?"],
    ],
  },
  cloud: {
    title: "Take your product live with a clear deployment plan.",
    accent: "a clear deployment plan.",
    body: "Prepare your application for production with the right hosting, environment settings, and release workflow. We plan deployment, verify key journeys after launch, and document how the product will be operated.",
    action: "PLAN YOUR LAUNCH",
    preview: "YOUR PATH TO PRODUCTION",
    summary: "Prepare. Deploy. Verify.",
    items: [
      ["STAGING", "Check the build, configuration, and migration steps."],
      ["PRODUCTION", "Deploy the agreed release with a recovery plan."],
      ["OPERATIONS", "Verify core journeys and hand over monitoring guidance."],
    ],
  },
  grow: {
    title: "Turn user feedback into your next product improvement.",
    accent: "your next product improvement.",
    body: "Your launch is the start of learning. We review usage signals, customer feedback, and operational friction to prioritize useful improvements and deliver focused updates to your live product.",
    action: "PLAN YOUR NEXT ITERATION",
    preview: "YOUR IMPROVEMENT CYCLE",
    summary: "Listen. Prioritize. Ship. Learn.",
    items: [
      ["LISTEN", "Collect feedback and review available product signals."],
      ["IMPROVE", "Choose a focused change with a clear intended outcome."],
      ["LEARN", "Review the result and use it to guide the next release."],
    ],
  },
};

export function WorkflowHero({ stage, index }: { stage: WorkflowStage; index: number }) {
  const content = HERO_CONTENT[stage.slug]!;
  return (
    <section className="relative overflow-hidden bg-[#050b16] pt-32 pb-16 lg:pt-44 lg:pb-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(37,99,235,0.2),transparent_65%)]"
      />
      <div className="shell relative grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
        <Reveal>
          <Label>
            {String(index + 1).padStart(2, "0")} / {stage.phase} / {stage.category}
          </Label>
          <h1 className="mt-7 max-w-[18ch] text-[clamp(2.3rem,4.8vw,5.2rem)] leading-[1.06] font-light tracking-[-0.035em] text-white">
            {accented(content.title, content.accent)}
          </h1>
          <p className="mt-7 max-w-[54ch] text-[17px] leading-relaxed text-[#a8b7ce] lg:text-lg">
            {content.body}
          </p>
          <div className="hero-actions mt-8 flex flex-wrap gap-3">
            <Btn as="a" href="/contact">
              {content.action}
              <ArrowUpRight size={16} aria-hidden="true" />
            </Btn>
            <Btn as="a" href="#deliverables" variant="ghostDark">
              EXPLORE DELIVERABLES
            </Btn>
          </div>
        </Reveal>
        <Reveal delay={120}>
          <div className="overflow-hidden rounded-[24px] border border-[#284064] bg-[#0b172a] shadow-[0_30px_90px_-40px_rgba(37,99,235,0.35)]">
            <div className="flex items-center justify-between gap-4 border-b border-[#243650] px-6 py-5">
              <span className="font-mono text-[10px] leading-relaxed tracking-[0.14em] text-[#95baff]">
                {content.preview}
              </span>
              <span className="font-mono text-xs text-[#6481a8]">0{index + 1}</span>
            </div>
            <div className="p-6 sm:p-8">
              <h2 className="max-w-[24ch] text-2xl leading-snug font-light tracking-tight text-white">
                {content.summary}
              </h2>
              <ol className="mt-8 space-y-5">
                {content.items.map(([label, body], i) => (
                  <li key={label} className="flex gap-4">
                    <span
                      aria-hidden="true"
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[#2e4b75] bg-[#122745] font-mono text-xs text-[#95baff]"
                    >
                      0{i + 1}
                    </span>
                    <div className="min-w-0 border-b border-[#243650] pb-5">
                      <h3 className="font-mono text-[11px] tracking-[0.12em] text-[#95baff]">
                        {label}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-[#b0bfd4]">{body}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <a
                href="#deliverables"
                className="mt-6 inline-flex items-center gap-2 rounded-sm text-sm text-[#95baff] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#95baff]"
              >
                Explore{" "}
                {stage.name === "UX" || stage.name === "QA" || stage.name === "APIs"
                  ? stage.name
                  : stage.name.toLowerCase()}{" "}
                deliverables
                <ArrowRight size={16} aria-hidden="true" />
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
