import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowRight, Calendar, Clock3, ShieldCheck } from "lucide-react";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { BlogPostContent } from "@/components/blog-post-content";
import { CONTACT } from "@/lib/contact";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import { buildBreadcrumbJsonLd } from "@/lib/breadcrumb";
import { getBlogPost, getBlogSlugs, getRelatedPosts } from "@/lib/blog-posts";

export function generateStaticParams() {
  return getBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};

  const path = `/blog/${slug}`;
  return {
    title: { absolute: post.seoTitle },
    description: post.seoDescription,
    keywords: `${post.keywords.join(", ")}, Numunix`,
    alternates: { canonical: path },
    openGraph: {
      title: post.seoTitle,
      description: post.seoDescription,
      type: "article",
      url: path,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
    },
  };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const path = `/blog/${slug}`;
  const relatedPosts = getRelatedPosts(post);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.seoDescription,
    image: `${SITE_URL}${post.coverImage.src}`,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    url: `${SITE_URL}${path}`,
    author: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.png` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}${path}` },
  };
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: post.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
    { name: post.title, path },
  ]);

  return (
    <main className="bg-white text-ink">
      <section className="relative isolate overflow-hidden bg-ink text-white">
        <Image
          src={post.coverImage}
          alt=""
          priority
          className="absolute inset-0 -z-20 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/85 via-black/65 to-black/85" />
        <SiteNav variant="dark" />
        <div className="mx-auto max-w-3xl px-4 pb-16 pt-28 md:px-8 md:pb-24 md:pt-36">
          <nav aria-label="Breadcrumb" className="text-xs text-white/60">
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link href="/blog" className="hover:text-white">
              Blog
            </Link>
            <span className="mx-2">/</span>
            <span className="text-white/85">{post.category}</span>
          </nav>
          <span className="mt-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium ring-1 ring-white/20 backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-brand" />
            {post.category}
          </span>
          <h1 className="mt-5 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl md:text-5xl">
            {post.title}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-white/75 md:text-lg">
            {post.excerpt}
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-5 text-sm text-white/60">
            <span className="inline-flex items-center gap-1.5">
              <Clock3 className="h-4 w-4" />
              {post.readTime}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              Updated {formatDate(post.updatedAt)}
            </span>
          </div>
        </div>
      </section>

      <article className="mx-auto max-w-3xl px-4 py-16 md:px-8 md:py-20">
        <p className="text-lg leading-8 text-ink">{post.intro}</p>
        <div className="mt-8">
          <BlogPostContent blocks={post.blocks} />
        </div>
      </article>

      <section className="bg-secondary/45 px-4 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-[2rem] bg-ink p-7 text-white shadow-card md:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand">
              Need a hand?
            </p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight">{post.ctaHeading}</h2>
            <p className="mt-4 leading-7 text-white/75">{post.ctaText}</p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                href={post.ctaHref}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-brand px-6 py-3.5 text-sm font-semibold text-brand-foreground transition hover:brightness-110"
              >
                {post.ctaLabel} <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={CONTACT.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white hover:text-ink"
              >
                WhatsApp us instead
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand">FAQs</p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-ink">
            Common questions, answered.
          </h2>
          <div className="mt-8 space-y-4">
            {post.faqs.map((faq) => (
              <article key={faq.question} className="rounded-3xl bg-white p-6 ring-1 ring-border">
                <ShieldCheck className="h-5 w-5 text-brand" />
                <h3 className="mt-4 text-lg font-bold text-ink">{faq.question}</h3>
                <p className="mt-3 leading-7 text-muted-foreground">{faq.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {relatedPosts.length > 0 && (
        <section className="bg-secondary/45 px-4 py-16 md:px-8 md:py-20">
          <div className="mx-auto max-w-6xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand">
              Keep reading
            </p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-ink">
              Related guides.
            </h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              {relatedPosts.map((related) => (
                <Link
                  key={related.slug}
                  href={`/blog/${related.slug}`}
                  className="group flex items-center gap-5 overflow-hidden rounded-3xl bg-white p-4 ring-1 ring-border transition hover:-translate-y-1 hover:ring-brand/40"
                >
                  <Image
                    src={related.coverImage}
                    alt={related.title}
                    className="h-20 w-20 shrink-0 rounded-2xl object-cover"
                  />
                  <div className="min-w-0">
                    <h3 className="font-bold leading-snug text-ink">{related.title}</h3>
                    <span className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-brand">
                      Read guide
                      <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <SiteFooter />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
    </main>
  );
}
