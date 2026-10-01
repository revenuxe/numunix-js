import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import {
  ArrowLeft,
  Clock,
  User,
  Calendar,
  Tag,
  ChevronRight,
  BookOpen,
  Share2,
  ArrowUp,
} from "lucide-react";
import Header from "@/components/numunix/Header";
import Footer from "@/components/numunix/Footer";
import { Label, Reveal } from "@/components/numunix/primitives";
import { articleBySlug, ARTICLES } from "@/content/articles";
import { SITE_URL } from "@/content/site";

export const Route = createFileRoute("/articles/$slug")({
  loader: ({ params }) => {
    const article = articleBySlug(params.slug);
    if (!article) throw notFound();
    return { article };
  },
  head: ({ params, loaderData }) => {
    const a = loaderData?.article;
    const title = a?.metaTitle ?? "Article | Numunix";
    const desc =
      a?.metaDescription ?? "Read in-depth articles from the Numunix team.";
    const pageUrl = `${SITE_URL}/articles/${a?.slug ?? params.slug}`;
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "article" },
        { property: "og:url", content: pageUrl },
        { name: "twitter:card", content: "summary_large_image" },
        ...(a
          ? [
            { property: "article:published_time", content: a.publishedAt },
            { property: "article:author", content: a.author },
          ]
          : []),
      ],
      links: [{ rel: "canonical", href: pageUrl }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Articles",
                item: `${SITE_URL}/articles`,
              },
              {
                "@type": "ListItem",
                position: 2,
                name: a?.title ?? params.slug,
                item: pageUrl,
              },
            ],
          }),
        },
        ...(a
          ? [
            {
              type: "application/ld+json",
              children: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Article",
                headline: a.title,
                description: desc,
                url: pageUrl,
                datePublished: a.publishedAt,
                author: {
                  "@type": "Organization",
                  name: a.author,
                  url: SITE_URL,
                },
                publisher: {
                  "@type": "Organization",
                  name: "Numunix",
                  url: SITE_URL,
                },
              }),
            },
          ]
          : []),
      ],
    };
  },
  component: ArticlePage,
});

/* ── Reading progress bar ─── */
function ReadingProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? Math.min((scrollTop / docHeight) * 100, 100) : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="fixed top-0 left-0 z-[100] h-[3px] w-full bg-transparent">
      <div
        className="h-full bg-gradient-to-r from-[#1e4ed8] to-[#3b82f6] transition-[width] duration-100"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

/* ── Stat highlight card ─── */
function StatCard({ value, label, delay = 0 }: { value: string; label: string; delay?: number }) {
  return (
    <Reveal delay={delay}>
      <div className="group relative overflow-hidden rounded-2xl border border-[#dbe5f2] bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#3b82f6]/30 hover:shadow-[0_20px_50px_-20px_rgba(16,42,99,0.25)]">
        <div className="absolute -top-6 -right-6 h-24 w-24 rounded-full bg-[#3b82f6]/[0.04] transition-transform duration-500 group-hover:scale-150" />
        <div className="relative">
          <div className="text-[32px] font-light tracking-[-0.03em] text-[#1e4ed8]">{value}</div>
          <div className="mt-1 text-[14px] text-[#5d76a3]">{label}</div>
        </div>
      </div>
    </Reveal>
  );
}

/* ── Callout box ─── */
function Callout({ icon, title, body, tone = "blue" }: { icon: string; title: string; body: string; tone?: "blue" | "amber" | "green" }) {
  const colors = {
    blue: "border-[#3b82f6]/20 bg-[#eef4ff]",
    amber: "border-[#f59e0b]/20 bg-[#fffbeb]",
    green: "border-[#10b981]/20 bg-[#ecfdf5]",
  }[tone];
  const iconColor = { blue: "text-[#1e4ed8]", amber: "text-[#d97706]", green: "text-[#059669]" }[tone];
  const titleColor = { blue: "text-[#102a63]", amber: "text-[#92400e]", green: "text-[#065f46]" }[tone];
  const bodyColor = { blue: "text-[#3d5585]", amber: "text-[#78350f]", green: "text-[#064e3b]" }[tone];
  return (
    <div className={`my-8 rounded-2xl border p-6 ${colors}`}>
      <div className="flex items-start gap-3">
        <span className={`text-2xl ${iconColor}`}>{icon}</span>
        <div>
          <div className={`text-[16px] font-semibold ${titleColor}`}>{title}</div>
          <div className={`mt-1.5 text-[15px] leading-relaxed ${bodyColor}`}>{body}</div>
        </div>
      </div>
    </div>
  );
}

/* ── Table of Contents ─── */
function TableOfContents({ headings }: { headings: string[] }) {
  const [active, setActive] = useState(0);
  return (
    <Reveal delay={100}>
      <div className="rounded-2xl border border-[#dbe5f2] bg-white p-6">
        <div className="flex items-center gap-2 text-[#102a63]">
          <BookOpen size={16} />
          <span className="text-[15px] font-semibold">Table of Contents</span>
        </div>
        <nav className="mt-4 space-y-1">
          {headings.map((h, i) => (
            <button
              key={h}
              onClick={() => {
                setActive(i);
                document.getElementById(`section-${i}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-[14px] transition-all duration-200 ${active === i
                  ? "bg-[#eef4ff] text-[#1e4ed8]"
                  : "text-[#5d76a3] hover:bg-[#f1f5f9] hover:text-[#102a63]"
                }`}
            >
              <ChevronRight size={12} className={active === i ? "text-[#3b82f6]" : "text-[#5d76a3]/50"} />
              <span className="line-clamp-1">{h}</span>
            </button>
          ))}
        </nav>
      </div>
    </Reveal>
  );
}

/* ── Back to top button ─── */
function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      className={`fixed bottom-8 right-8 z-50 grid h-12 w-12 place-items-center rounded-full border border-white/10 bg-[#1e4ed8] text-white shadow-[0_8px_30px_-6px_rgba(30,78,216,0.5)] transition-all duration-300 hover:bg-[#2563eb] ${show ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0 pointer-events-none"
        }`}
    >
      <ArrowUp size={18} />
    </button>
  );
}

/* ── Share button ─── */
function ShareButton({ title, url }: { title: string; url: string }) {
  const [copied, setCopied] = useState(false);
  const handleShare = async () => {
    if (navigator.share) {
      try { await navigator.share({ title, url }); } catch { }
    } else {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };
  return (
    <button
      onClick={handleShare}
      className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-[13px] text-white/60 transition-all hover:border-[#3b82f6]/50 hover:text-white"
    >
      <Share2 size={14} />
      {copied ? "Link copied!" : "Share"}
    </button>
  );
}

function ArticlePage() {
  const { article } = Route.useLoaderData();
  const contentRef = useRef<HTMLDivElement>(null);

  // Find related articles (exclude current)
  const related = ARTICLES.filter((a) => a.slug !== article.slug).slice(0, 2);

  const formattedDate = new Date(article.publishedAt).toLocaleDateString(
    "en-US",
    { year: "numeric", month: "long", day: "numeric" }
  );

  const pageUrl = `${SITE_URL}/articles/${article.slug}`;

  // Extract stats from article if available
  const stats = article.highlights ?? [];

  return (
    <div className="bg-[#05070c]">
      <ReadingProgress />
      <Header />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden bg-[#05070c] pt-32 pb-16 lg:pt-44 lg:pb-24">
          {/* Animated gradient background */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a1628] via-[#05070c] to-[#05070c]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(59,130,246,0.12),transparent)]" />
          {/* Floating orbs */}
          <div className="absolute top-20 left-[10%] h-72 w-72 rounded-full bg-[#3b82f6]/[0.04] blur-[80px] animate-[nx-float_8s_ease-in-out_infinite]" />
          <div className="absolute bottom-10 right-[15%] h-56 w-56 rounded-full bg-[#1e4ed8]/[0.06] blur-[60px] animate-[nx-float_10s_ease-in-out_2s_infinite]" />

          <div className="shell relative">
            <Reveal>
              <div className="flex items-center justify-between">
                <Link
                  to="/articles"
                  className="inline-flex items-center gap-2 text-[14px] text-white/50 transition-colors hover:text-white"
                >
                  <ArrowLeft size={14} />
                  Back to Articles
                </Link>
                <ShareButton title={article.title} url={pageUrl} />
              </div>

              <div className="mt-10">
                <Label>{article.category.toUpperCase()}</Label>
              </div>

              <h1
                style={{ lineHeight: 1.08 }}
                className="mt-6 max-w-[22ch] text-[clamp(2rem,5vw,4.2rem)] font-light tracking-[-0.025em] text-white"
              >
                {article.title}
              </h1>

              <p className="mt-6 max-w-[60ch] text-[18px] leading-relaxed text-white/45">
                {article.excerpt}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-5 text-[14px] text-white/50">
                <span className="flex items-center gap-1.5">
                  <User size={14} />
                  {article.author}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar size={14} />
                  {formattedDate}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock size={14} />
                  {article.readTime}
                </span>
                <span className="flex items-center gap-1.5">
                  <BookOpen size={14} />
                  {article.content.length} sections
                </span>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[12px] font-medium tracking-wide text-white/50 transition-colors hover:border-white/20 hover:text-white/70"
                  >
                    <Tag size={10} />
                    {tag}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* Stat highlights strip */}
        {stats.length > 0 && (
          <section className="border-y border-[#e2e8f0] bg-[#f1f5f9] py-10">
            <div className="shell">
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                {stats.map((s, i) => (
                  <StatCard key={s.label} value={s.value} label={s.label} delay={i * 60} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Article content with sidebar */}
        <section className="bg-[#f8fafb] py-16 lg:py-24" ref={contentRef}>
          <div className="shell">
            <div className="mx-auto grid max-w-[1200px] gap-10 lg:grid-cols-[280px_1fr]">
              {/* Sidebar: Table of Contents (sticky on desktop) */}
              <aside className="hidden lg:block">
                <div className="sticky top-28 space-y-6">
                  <TableOfContents headings={article.content.map((s) => s.heading)} />
                  {/* Sidebar CTA */}
                  <Reveal delay={200}>
                    <Link
                      to="/contact"
                      className="group block rounded-2xl border border-[#dbe5f2] bg-gradient-to-br from-[#eef4ff] to-white p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#3b82f6]/30 hover:shadow-[0_16px_40px_-16px_rgba(16,42,99,0.2)]"
                    >
                      <span className="label-mono text-[#1747b8]">NEED HELP?</span>
                      <p className="mt-2 text-[14px] leading-relaxed text-[#3d5585]">
                        Let's discuss your project and bring these ideas to life.
                      </p>
                      <span className="mt-3 inline-flex items-center gap-1.5 text-[13px] font-medium text-[#1e4ed8] transition-all group-hover:gap-2.5">
                        Get in touch <ChevronRight size={13} />
                      </span>
                    </Link>
                  </Reveal>
                </div>
              </aside>

              {/* Main content */}
              <div className="min-w-0">
                {/* Mobile TOC (collapsible) */}
                <div className="mb-10 lg:hidden">
                  <TableOfContents headings={article.content.map((s) => s.heading)} />
                </div>

                {article.content.map((section, i) => (
                  <div key={section.heading}>
                    <Reveal delay={i * 30}>
                      <article id={`section-${i}`} className="article-section mb-16 scroll-mt-28">
                        {/* Section number badge */}
                        <div className="mb-4 flex items-center gap-3">
                          <span className="grid h-8 w-8 place-items-center rounded-lg bg-[#1e4ed8]/10 text-[13px] font-semibold text-[#1e4ed8]">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <div className="h-px flex-1 bg-gradient-to-r from-[#dbe5f2] to-transparent" />
                        </div>
                        <h2 className="mb-6 text-[26px] font-light tracking-[-0.02em] text-[#102a63] lg:text-[32px]">
                          {section.heading}
                        </h2>
                        <div
                          className="article-body text-[17px] leading-[1.8] text-[#3d5585]"
                          dangerouslySetInnerHTML={{ __html: section.body }}
                        />

                        {/* Inline callouts for specific sections */}
                        {section.heading.toLowerCase().includes("introduction") && (
                          <Callout
                            icon="💡"
                            title="Why this matters"
                            body="Every section in this article includes actionable takeaways you can apply to your next project — not just theory."
                            tone="blue"
                          />
                        )}
                        {section.heading.toLowerCase().includes("conclusion") && (
                          <div className="mt-8 rounded-2xl border border-[#10b981]/20 bg-[#ecfdf5] p-6">
                            <div className="flex items-start gap-3">
                              <span className="text-2xl text-[#059669]">🚀</span>
                              <div>
                                <div className="text-[16px] font-semibold text-[#065f46]">Ready to build?</div>
                                <div className="mt-1.5 text-[15px] leading-relaxed text-[#064e3b]">
                                  If you're planning a project and want to apply these principles with a team that lives them — let's talk.
                                </div>
                                <Link
                                  to="/contact"
                                  className="mt-4 inline-flex items-center gap-2 rounded-xl bg-[#059669] px-5 py-2.5 text-[13px] font-medium tracking-wide text-white transition-all hover:-translate-y-0.5 hover:bg-[#047857] hover:shadow-[0_10px_30px_-8px_rgba(5,150,105,0.5)]"
                                >
                                  START A CONVERSATION
                                  <ChevronRight size={14} />
                                </Link>
                              </div>
                            </div>
                          </div>
                        )}
                      </article>
                    </Reveal>

                    {/* Mid-article CTA banner — after every 3rd section (but not the last) */}
                    {(i + 1) % 3 === 0 && i < article.content.length - 1 && (
                      <Reveal delay={20}>
                        <div className="relative mb-16 overflow-hidden rounded-[22px] border border-[#1e4ed8]/15 bg-gradient-to-r from-[#0b1b38] to-[#102a63] p-7 lg:p-9">
                          {/* Decorative elements */}
                          <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-[#3b82f6]/10 blur-[40px]" />
                          <div className="absolute bottom-0 left-0 h-24 w-24 rounded-full bg-[#1e4ed8]/10 blur-[30px]" />

                          <div className="relative flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                            <div>
                              <span className="label-mono text-[#60a5fa]">WORK WITH US</span>
                              <h3 className="mt-2 text-[20px] font-light tracking-[-0.01em] text-white lg:text-[22px]">
                                Applying this to a real project?
                              </h3>
                              <p className="mt-1.5 max-w-[44ch] text-[15px] text-white/50">
                                We help teams turn ideas like these into shipped products. Let's talk about yours.
                              </p>
                            </div>
                            <Link
                              to="/contact"
                              className="label-mono inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-[#102a63] transition-all duration-250 hover:-translate-y-0.5 hover:shadow-[0_12px_38px_-10px_rgba(255,255,255,0.3)]"
                            >
                              GET IN TOUCH
                              <ChevronRight size={14} />
                            </Link>
                          </div>
                        </div>
                      </Reveal>
                    )}
                  </div>
                ))}

                {/* CTA card at end of article */}
                <Reveal delay={40}>
                  <div className="mt-16 overflow-hidden rounded-[22px] border border-[#dbe5f2] bg-gradient-to-br from-[#f8faff] to-white p-8 lg:p-10">
                    <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                      <div>
                        <span className="label-mono text-[#1747b8]">LIKED THIS ARTICLE?</span>
                        <h3 className="mt-3 text-[24px] font-light tracking-[-0.02em] text-[#102a63]">
                          Let's build something together.
                        </h3>
                        <p className="mt-2 max-w-[42ch] text-[15px] text-[#5d76a3]">
                          We design and develop software, websites, and digital products built for real-world growth.
                        </p>
                      </div>
                      <Link
                        to="/contact"
                        className="label-mono inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#1e4ed8] px-6 py-3.5 text-white transition-all duration-250 hover:-translate-y-0.5 hover:bg-[#2563eb] hover:shadow-[0_12px_38px_-10px_rgba(59,130,246,0.75)]"
                      >
                        START A PROJECT
                        <ChevronRight size={14} />
                      </Link>
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* Full-width CTA section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-[#0b1b38] via-[#102a63] to-[#0b1b38] py-20 lg:py-28">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(59,130,246,0.08),transparent)]" />
          <div className="absolute top-0 left-[20%] h-64 w-64 rounded-full bg-[#3b82f6]/[0.06] blur-[80px] animate-[nx-float_8s_ease-in-out_infinite]" />
          <div className="absolute bottom-0 right-[20%] h-48 w-48 rounded-full bg-[#1e4ed8]/[0.08] blur-[60px] animate-[nx-float_10s_ease-in-out_3s_infinite]" />

          <div className="shell relative text-center">
            <Reveal>
              <span className="label-mono text-[#60a5fa]">READY TO START?</span>
              <h2
                style={{ lineHeight: 1.1 }}
                className="mx-auto mt-5 max-w-[18ch] text-[clamp(2rem,4.5vw,4rem)] font-light tracking-[-0.025em] text-white"
              >
                Turn insights into a{" "}
                <span className="text-[#3b82f6]">real product.</span>
              </h2>
              <p className="mx-auto mt-5 max-w-[52ch] text-[17px] leading-relaxed text-white/50">
                Whether it's a website, mobile app, SaaS platform, or custom software — our team designs and develops digital products that grow your business.
              </p>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                <Link
                  to="/contact"
                  className="label-mono inline-flex items-center justify-center gap-2 rounded-xl bg-[#1e4ed8] px-8 py-4 text-white transition-all duration-250 hover:-translate-y-0.5 hover:bg-[#2563eb] hover:shadow-[0_16px_48px_-10px_rgba(59,130,246,0.7)]"
                >
                  START A PROJECT
                  <ChevronRight size={14} />
                </Link>
                <Link
                  to="/features"
                  className="label-mono inline-flex items-center justify-center gap-2 rounded-xl border border-white/12 bg-white/[0.04] px-8 py-4 text-white/90 transition-all duration-250 hover:-translate-y-0.5 hover:border-[#3b82f6]/50 hover:bg-white/[0.08]"
                >
                  EXPLORE SERVICES
                </Link>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Related articles */}
        {related.length > 0 && (
          <section className="bg-[#05070c] py-16 lg:py-24">
            <div className="shell">
              <Reveal>
                <Label>MORE ARTICLES</Label>
                <h2
                  style={{ lineHeight: 1.1 }}
                  className="mt-5 text-[clamp(1.8rem,3.5vw,3rem)] font-light tracking-[-0.025em] text-white"
                >
                  Continue reading
                </h2>
              </Reveal>
              <div className="mt-10 grid gap-6 md:grid-cols-2">
                {related.map((r, i) => (
                  <Reveal key={r.slug} delay={i * 80}>
                    <Link
                      to="/articles/$slug"
                      params={{ slug: r.slug }}
                      className="group flex h-full flex-col rounded-[22px] border border-white/[0.07] bg-white/[0.02] p-7 transition-all duration-250 hover:-translate-y-1 hover:border-[#3b82f6]/40 hover:shadow-[0_24px_60px_-20px_rgba(59,130,246,0.15)] lg:p-9"
                    >
                      <div className="flex items-center justify-between">
                        <span className="label-mono text-[#3b82f6]">
                          {r.category.toUpperCase()}
                        </span>
                        <span className="flex items-center gap-1.5 text-[12px] text-white/30">
                          <Clock size={11} />
                          {r.readTime}
                        </span>
                      </div>
                      <h3 className="mt-4 text-[20px] font-light tracking-[-0.01em] text-white lg:text-[22px]">
                        {r.title}
                      </h3>
                      <p className="mt-3 flex-1 text-[15px] leading-relaxed text-white/50">
                        {r.excerpt}
                      </p>
                      <div className="mt-6 flex flex-wrap gap-2">
                        {r.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className="rounded-md border border-white/[0.06] bg-white/[0.03] px-2 py-0.5 text-[11px] text-white/35">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </Link>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
