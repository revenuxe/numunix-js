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
    </CompanyPage>
  );
}
