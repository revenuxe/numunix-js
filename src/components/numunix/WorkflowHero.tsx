import type { WorkflowStage } from "@/content/workflow";
import { PageHero } from "./PageShell";

type HeroContent = {
  title: string;
  accent: string;
  body: string;
  action: string;
};

const HERO_CONTENT: Record<string, HeroContent> = {
  idea: {
    title: "Turn your idea into a product direction.",
    accent: "a product direction.",
    body: "Have a business idea but need a starting point? We help identify your users, define the problem worth solving, and shape a product concept you can confidently take into planning.",
    action: "DISCUSS YOUR IDEA",
  },
  scope: {
    title: "Define your MVP. Plan the right first release.",
    accent: "the right first release.",
    body: "Turn a long feature wishlist into a focused product plan. We map user journeys, prioritize essential capabilities, and define acceptance criteria so everyone knows what the first release needs to do.",
    action: "PLAN YOUR MVP",
  },
  ux: {
    title: "Design experiences your users can navigate naturally.",
    accent: "navigate naturally.",
    body: "From first visit to task completed, make the journey clear. We create user flows, interactive prototypes, and responsive interfaces that connect your brand to the way people actually use your product.",
    action: "DESIGN YOUR EXPERIENCE",
  },
  code: {
    title: "Turn your product designs into working software.",
    accent: "working software.",
    body: "Build the interface, application logic, and data layer your product needs. We deliver reviewable increments, test important behavior, and prepare a maintainable codebase for your next release.",
    action: "DISCUSS YOUR BUILD",
  },
  apis: {
    title: "Connect your product to the tools you depend on.",
    accent: "the tools you depend on.",
    body: "Bring payments, messaging, CRM, and internal systems into one connected workflow. We build API and webhook integrations with clear data ownership, secure access, and practical failure handling.",
    action: "PLAN YOUR INTEGRATIONS",
  },
  qa: {
    title: "Test the journeys your customers will rely on.",
    accent: "your customers will rely on.",
    body: "Know what works before you launch. We check critical workflows, permissions, integrations, and responsive behavior, then document defects and verify fixes against your release requirements.",
    action: "PLAN YOUR QA REVIEW",
  },
  cloud: {
    title: "Take your product live with a clear deployment plan.",
    accent: "a clear deployment plan.",
    body: "Prepare your application for production with the right hosting, environment settings, and release workflow. We plan deployment, verify key journeys after launch, and document how the product will be operated.",
    action: "PLAN YOUR LAUNCH",
  },
  grow: {
    title: "Turn user feedback into your next product improvement.",
    accent: "your next product improvement.",
    body: "Your launch is the start of learning. We review usage signals, customer feedback, and operational friction to prioritize useful improvements and deliver focused updates to your live product.",
    action: "PLAN YOUR NEXT ITERATION",
  },
};

export function WorkflowHero({ stage, index }: { stage: WorkflowStage; index: number }) {
  const content = HERO_CONTENT[stage.slug];
  if (!content) return null;
  return (
    <PageHero
      label={`${String(index + 1).padStart(2, "0")} / ${stage.phase} / ${stage.category}`}
      title={content.title}
      accent={content.accent}
      body={content.body}
      primary={{ label: content.action, href: "/contact" }}
      secondary={{ label: "EXPLORE DELIVERABLES", href: "#deliverables" }}
    />
  );
}
