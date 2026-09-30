import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { ArrowLeft, Clock, User, Calendar, Tag } from "lucide-react";
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

function ArticlePage() {
  const { article } = Route.useLoaderData();

  // Find related articles (exclude current)
  const related = ARTICLES.filter((a) => a.slug !== article.slug).slice(0, 2);

  const formattedDate = new Date(article.publishedAt).toLocaleDateString(
    "en-US",
    { year: "numeric", month: "long", day: "numeric" }
  );

  return (
    <div className="bg-[#05070c]">
      <Header />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden bg-[#05070c] pt-32 pb-16 lg:pt-44 lg:pb-24">
          {/* Gradient background */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a1628] via-[#05070c] to-[#05070c]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(59,130,246,0.12),transparent)]" />

          <div className="shell relative">
            <Reveal>
              <Link
                to="/articles"
                className="mb-8 inline-flex items-center gap-2 text-[14px] text-white/50 transition-colors hover:text-white"
              >
                <ArrowLeft size={14} />
                Back to Articles
              </Link>

              <Label>{article.category.toUpperCase()}</Label>

              <h1
                style={{ lineHeight: 1.08 }}
                className="mt-6 max-w-[22ch] text-[clamp(2rem,5vw,4.2rem)] font-light tracking-[-0.025em] text-white"
              >
                {article.title}
              </h1>

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
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[12px] font-medium tracking-wide text-white/50"
                  >
                    <Tag size={10} />
                    {tag}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* Article content */}
        <section className="bg-[#f8fafb] py-16 lg:py-24">
          <div className="shell">
            <div className="mx-auto max-w-[780px]">
              {article.content.map((section, i) => (
                <Reveal key={section.heading} delay={i * 40}>
                  <article className="article-section mb-14 last:mb-0">
                    <h2 className="mb-6 text-[26px] font-light tracking-[-0.02em] text-[#102a63] lg:text-[32px]">
                      {section.heading}
                    </h2>
                    <div
                      className="article-body text-[17px] leading-[1.8] text-[#3d5585]"
                      dangerouslySetInnerHTML={{ __html: section.body }}
                    />
                  </article>
                </Reveal>
              ))}
            </div>
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
                      className="group flex h-full flex-col rounded-[22px] border border-white/[0.07] bg-white/[0.02] p-7 transition-all duration-250 hover:-translate-y-1 hover:border-[#3b82f6]/40 lg:p-9"
                    >
                      <span className="label-mono text-[#3b82f6]">
                        {r.category.toUpperCase()}
                      </span>
                      <h3 className="mt-4 text-[20px] font-light tracking-[-0.01em] text-white lg:text-[22px]">
                        {r.title}
                      </h3>
                      <p className="mt-3 flex-1 text-[15px] leading-relaxed text-white/50">
                        {r.excerpt}
                      </p>
                      <span className="mt-6 flex items-center gap-1.5 text-[13px] text-white/40">
                        <Clock size={12} />
                        {r.readTime}
                      </span>
                    </Link>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}
