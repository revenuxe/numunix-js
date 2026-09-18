import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import Header from "@/components/numunix/Header";
import Footer from "@/components/numunix/Footer";
import NumunixRibbonScene from "@/components/numunix/NumunixRibbonScene";
import { Label, Heading, Accent, Reveal, Btn } from "@/components/numunix/primitives";
import { FEATURES } from "@/content/features";

const TITLE = "Features — AI Service Operations Platform | Numunix";
const DESC =
  "Explore Numunix features: AI call agents, automated booking, technician dispatch, service job management, invoicing, automation, AMC renewals and WhatsApp communication.";

export const Route = createFileRoute("/features/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/features" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/features" }],
  }),
  component: FeaturesIndex,
});

function FeaturesIndex() {
  return (
    <div className="bg-[#05070c]">
      <Header />
      <main>
        <section className="relative flex min-h-[62svh] items-end overflow-hidden bg-[#05070c] pt-28 pb-14 lg:min-h-[70vh] lg:pt-40 lg:pb-24">
          <div className="absolute inset-0">
            <NumunixRibbonScene />
          </div>
          <div className="shell relative grid gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:items-end lg:gap-20">
            <Reveal>
              <Label>PLATFORM</Label>
              <h1
                style={{ lineHeight: 1.04 }}
                className="mt-6 max-w-[16ch] font-light tracking-[-0.03em] text-white text-[clamp(2.4rem,6vw,5.6rem)]"
              >
                Every part of your <Accent>service operation.</Accent>
              </h1>
            </Reveal>
            <Reveal delay={120}>
              <p className="max-w-[46ch] text-[17px] leading-relaxed text-white/60 lg:text-[19px]">
                From the first customer call to the final invoice and the next
                renewal — one intelligent platform behind every service job.
              </p>
              <div className="mt-6">
                <Btn as="a" href="#list">
                  BROWSE FEATURES
                </Btn>
              </div>
            </Reveal>
          </div>
        </section>

        <section id="list" className="section-pad bg-[#f1f5f9]">
          <div className="shell">
            <Label tone="light">FEATURES</Label>
            <Heading tone="light" className="mt-6 max-w-[18ch]">
              Explore the platform, <Accent>module by module.</Accent>
            </Heading>
            <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {FEATURES.map((f, i) => (
                <Reveal key={f.slug} delay={i * 50}>
                  <Link
                    to="/features/$slug"
                    params={{ slug: f.slug }}
                    className="group flex h-full flex-col rounded-[22px] border border-[#dbe5f2] bg-white p-7 transition-all duration-250 hover:-translate-y-1 hover:border-[#3b82f6]/40 hover:shadow-[0_28px_70px_-38px_rgba(16,42,99,0.5)] lg:p-9"
                  >
                    <span className="label-mono text-[#1747b8]">{f.label}</span>
                    <h2 className="mt-5 text-[24px] font-light tracking-[-0.02em] text-[#102a63] lg:text-[28px]">
                      {f.name}
                    </h2>
                    <p className="mt-3 flex-1 text-[16px] leading-relaxed text-[#5d76a3]">
                      {f.intro.split(" ").slice(0, 24).join(" ")}…
                    </p>
                    <ArrowRight size={18} className="hover-arrow mt-7 text-[#1e4ed8]" />
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
