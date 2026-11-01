import { createFileRoute } from "@tanstack/react-router";
import { CompanyPage } from "@/components/numunix/CompanyPage";
import { Section, SectionHead } from "@/components/numunix/PageShell";
import { WorkflowVisualization } from "@/components/numunix/WorkflowVisualization";
import { Reveal } from "@/components/numunix/primitives";
import { APPROACH } from "@/content/company";
import { SITE_URL } from "@/content/site";

export const Route = createFileRoute("/approach")({
  head: () => ({
    meta: [
      { title: APPROACH.metaTitle },
      { name: "description", content: APPROACH.metaDescription },
      { property: "og:title", content: APPROACH.metaTitle },
      { property: "og:description", content: APPROACH.metaDescription },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/approach` },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/approach` }],
  }),
  component: ApproachRoute,
});

function ApproachRoute() {
  return (
    <CompanyPage page={APPROACH}>
      <Section bg="#f7f9fc">
        <SectionHead
          label="IDEA TO PRODUCT"
          title="Connected at every step."
          accent="every step."
          body="Discovery through launch stays on one map, so design, engineering, and delivery do not drift apart."
        />
        <Reveal delay={80}>
          <WorkflowVisualization />
        </Reveal>
      </Section>

      {/* Platform by Revenuxe */}
      <Section bg="#07111f">
        <Reveal delay={60}>
          <div className="mx-auto max-w-2xl text-center">
            <span className="label-mono text-white/40">PLATFORM</span>
            <h2 className="mt-4 text-[clamp(28px,4vw,42px)] font-light leading-[1.15] tracking-[-0.025em] text-white">
              A{" "}
              <span className="bg-gradient-to-r from-[#3b82f6] to-[#60a5fa] bg-clip-text text-transparent">
                Revenuxe
              </span>
              {" "}Venture
            </h2>
            <p className="mx-auto mt-5 max-w-[48ch] text-[17px] leading-relaxed text-white/50">
              Numunix is proudly built and operated by Revenuxe, a company
              dedicated to creating digital platforms that drive real business
              growth.
            </p>
            <a
              href="https://www.revenuxe.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-7 py-3 text-[15px] text-white/80 transition-all hover:border-[#3b82f6]/50 hover:bg-white/[0.07] hover:text-white"
            >
              Visit Revenuxe
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </Reveal>
      </Section>
    </CompanyPage>
  );
}
