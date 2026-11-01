import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Clock, Tag } from "lucide-react";
import Header from "@/components/numunix/Header";
import Footer from "@/components/numunix/Footer";
import Hero from "@/components/numunix/Hero";
import NumunixRibbonScene from "@/components/numunix/NumunixRibbonScene";
import { Label, Heading, Accent, Reveal, Btn } from "@/components/numunix/primitives";
import { ARTICLES } from "@/content/articles";
const SITE_URL = "https://numunix-flow-engine.lovable.app";

const TITLE = "Electronics & Appliance Repair Guides | Numunix";
const DESC =
  "Practical guides for phones, laptops and appliances. Learn what to prepare, how to review repair estimates and what to check at handover.";

export const Route = createFileRoute("/repair-guides/")(  {
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/repair-guides` },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/repair-guides` }],
  }),
  component: ArticlesIndex,
});

function ArticlesIndex() {
  return (
    <div className="bg-[#05070c]">
      <Header />
      <main>
        {/* Hero */}
        <Hero headline="Repair guidance." accent="Informed decisions." intro="Practical advice for device faults, appliance visits, repair estimates and aftercare. Know what to ask before work begins." primaryLabel="BROWSE ARTICLES" primaryHref="#list" secondaryLabel="REQUEST ASSESSMENT" secondaryHref="/contact" />

        {/* Article listing */}
        <section id="list" className="section-pad bg-[#f1f5f9]">
          <div className="shell">
            <Label tone="light">LATEST</Label>
            <Heading tone="light" className="mt-6 max-w-[18ch]">
              Read, understand, <Accent>repair wisely.</Accent>
            </Heading>
            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-1">
              {ARTICLES.map((article, i) => (
                <Reveal key={article.slug} delay={i * 60}>
                  <Link
                    to="/repair-guides/$slug"
                    params={{ slug: article.slug }}
                    className="group flex flex-col rounded-[22px] border border-[#dbe5f2] bg-white p-7 transition-all duration-250 hover:-translate-y-1 hover:border-[#3b82f6]/40 hover:shadow-[0_28px_70px_-38px_rgba(16,42,99,0.5)] lg:flex-row lg:items-center lg:gap-12 lg:p-9"
                  >
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="label-mono text-[#1747b8]">
                          {article.category.toUpperCase()}
                        </span>
                        <span className="flex items-center gap-1.5 text-[13px] text-[#5d76a3]">
                          <Clock size={13} />
                          {article.readTime}
                        </span>
                      </div>
                      <h2 className="mt-4 text-[22px] font-light tracking-[-0.02em] text-[#102a63] lg:text-[28px]">
                        {article.title}
                      </h2>
                      <p className="mt-3 max-w-[72ch] text-[16px] leading-relaxed text-[#5d76a3]">
                        {article.excerpt}
                      </p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {article.tags.map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center gap-1 rounded-md bg-[#eef1f6] px-2.5 py-1 text-[12px] font-medium tracking-wide text-[#5d76a3]"
                          >
                            <Tag size={10} />
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="mt-6 flex items-center gap-2 text-[#1e4ed8] lg:mt-0">
                      <span className="label-mono">READ ARTICLE</span>
                      <ArrowRight
                        size={18}
                        className="transition-transform duration-200 group-hover:translate-x-1"
                      />
                    </div>
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
