import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import Header from "@/components/numunix/Header";
import Footer from "@/components/numunix/Footer";
import Hero from "@/components/numunix/Hero";
import NumunixRibbonScene from "@/components/numunix/NumunixRibbonScene";
import { Label, Heading, Accent, Reveal, Btn } from "@/components/numunix/primitives";
import { FEATURES } from "@/content/features";
import { SITE_URL } from "@/content/site";
import { SERVICE_EDITORIAL } from "@/content/service-editorial";

const TITLE = "Web, App, SaaS & AI Development Services | Numunix";
const DESC =
  "Explore Numunix services for websites, web apps, mobile products, SaaS, e-commerce, AI, design and integrations. Find the right approach for your project.";

export const Route = createFileRoute("/features/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/features` },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/features` }],
  }),
  component: FeaturesIndex,
});

function FeaturesIndex() {
  return (
    <div className="bg-[#05070c]">
      <Header />
      <main>
        <Hero headline="From the first idea to" accent="the product people use." intro="Websites, applications, AI and connected systems. Explore what each service does, what it takes to build well, and where to begin." primaryLabel="BROWSE SERVICES" primaryHref="#list" secondaryLabel="START A PROJECT" secondaryHref="/contact" />

        <section className="border-b border-border bg-paper py-10 lg:py-14">
          <div className="shell grid gap-6 lg:grid-cols-[0.4fr_1.6fr] lg:gap-16">
            <Label tone="light">FIND YOUR STARTING POINT</Label>
            <div className="grid gap-7 sm:grid-cols-3 sm:gap-10">
              <a href="#web-and-commerce" className="group border-t border-border pt-5"><span className="label-mono text-primary">01 / LAUNCH</span><p className="mt-3 text-[19px] text-navytext">Build a website or commerce experience</p><ArrowRight className="hover-arrow mt-4 text-primary" size={17}/></a>
              <a href="#products-and-platforms" className="group border-t border-border pt-5"><span className="label-mono text-primary">02 / BUILD</span><p className="mt-3 text-[19px] text-navytext">Create an app, platform or internal tool</p><ArrowRight className="hover-arrow mt-4 text-primary" size={17}/></a>
              <a href="#intelligence-and-continuity" className="group border-t border-border pt-5"><span className="label-mono text-primary">03 / EVOLVE</span><p className="mt-3 text-[19px] text-navytext">Connect, automate and improve what's live</p><ArrowRight className="hover-arrow mt-4 text-primary" size={17}/></a>
            </div>
          </div>
        </section>

        <section id="list" className="section-pad bg-[#f1f5f9]">
          <div className="shell">
            <Label tone="light">SERVICES</Label>
            <Heading tone="light" className="mt-6 max-w-[18ch]">
              The right expertise for <Accent>the work ahead.</Accent>
            </Heading>
            {([
              ["web-and-commerce", "01 / DIGITAL PRESENCE", "Make the first interaction count.", ["web-development", "e-commerce"]],
              ["products-and-platforms", "02 / PRODUCTS & PLATFORMS", "Give people a better way to work.", ["web-applications", "mobile-app-development", "saas-development", "marketplaces", "custom-software"]],
              ["intelligence-and-continuity", "03 / SYSTEMS & GROWTH", "Keep the whole product moving.", ["ai-automation", "ui-ux-design", "cloud-integrations", "maintenance-support"]],
            ] as const).map(([id, label, title, slugs]) => <div key={id} id={id} className="scroll-mt-24 border-t border-border pt-10 mt-14">
              <div className="grid gap-4 lg:grid-cols-[0.4fr_1.6fr] lg:gap-16"><span className="label-mono text-primary">{label}</span><h3 className="text-[clamp(1.6rem,3vw,2.8rem)] font-light text-navytext">{title}</h3></div>
              <div className="mt-7 divide-y divide-border border-y border-border lg:ml-[calc(20%+2rem)]">
              {slugs.map((slug, i) => { const f = FEATURES.find((item) => item.slug === slug); if (!f) return null; return (
                <Reveal key={f.slug} delay={i * 50}>
                  <Link
                    to="/features/$slug"
                    params={{ slug: f.slug }}
                    className="group grid gap-3 py-7 transition-colors duration-250 hover:bg-paper sm:grid-cols-[2rem_0.85fr_1.15fr_1.5rem] sm:items-start sm:gap-6 sm:px-4"
                  >
                    <span className="label-mono text-primary">{String(i + 1).padStart(2, "0")}</span>
                    <h2 className="text-[22px] font-light text-navytext lg:text-[26px]">
                      {f.name}
                    </h2>
                    <p className="text-[16px] leading-relaxed text-muted-foreground">
                      {SERVICE_EDITORIAL[f.slug]?.moment ?? f.intro}
                    </p>
                    <ArrowRight size={18} className="hover-arrow text-primary" />
                  </Link>
                </Reveal>
              ); })}
              </div>
            </div>)}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
