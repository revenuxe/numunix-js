import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Clock, Tag } from "lucide-react";
import Header from "@/components/numunix/Header";
import Footer from "@/components/numunix/Footer";
import NumunixRibbonScene from "@/components/numunix/NumunixRibbonScene";
import { Label, Heading, Accent, Reveal, Btn } from "@/components/numunix/primitives";
import { ARTICLES } from "@/content/articles";
import { SITE_URL } from "@/content/site";

const TITLE = "Articles & Insights | Numunix";
const DESC =
  "In-depth articles on UI/UX design, web development, software engineering, and digital product strategy from the Numunix team.";

export const Route = createFileRoute("/articles/")(  {
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/articles` },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/articles` }],
  }),
  component: ArticlesIndex,
});

function ArticlesIndex() {
  return (
    <div className="bg-[#05070c]">
      <Header />
      <main>
        {/* Hero */}
        <section className="relative flex min-h-[62svh] items-end overflow-hidden bg-[#05070c] pt-28 pb-14 lg:min-h-[70vh] lg:pt-40 lg:pb-24">
          <div className="absolute inset-0">
            <NumunixRibbonScene />
          </div>
          <div className="shell relative grid gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:items-end lg:gap-20">
            <Reveal>
              <Label>ARTICLES</Label>
              <h1
                style={{ lineHeight: 1.04 }}
                className="mt-6 max-w-[16ch] font-light tracking-[-0.03em] text-white text-[clamp(2.4rem,6vw,5.6rem)]"
              >
                Insights for <Accent>builders.</Accent>
              </h1>
            </Reveal>
            <Reveal delay={120}>
              <p className="max-w-[46ch] text-[17px] leading-relaxed text-white/60 lg:text-[19px]">
                Deep dives into design, development, and digital product strategy from our team.
              </p>
              <div className="mt-6">
                <Btn as="a" href="#list">
                  BROWSE ARTICLES
                </Btn>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Article listing */}
        <section id="list" className="section-pad bg-[#f1f5f9]">
          <div className="shell">
            <Label tone="light">LATEST</Label>
            <Heading tone="light" className="mt-6 max-w-[18ch]">
              Read, learn, <Accent>build better.</Accent>
            </Heading>
            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-1">
              {ARTICLES.map((article, i) => (
                <Reveal key={article.slug} delay={i * 60}>
                  <Link
                    to="/articles/$slug"
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
