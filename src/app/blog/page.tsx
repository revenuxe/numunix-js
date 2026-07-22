import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock3 } from "lucide-react";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { PageHero } from "@/components/page-hero";
import { BLOG_POSTS } from "@/lib/blog-posts";
import { buildBreadcrumbJsonLd } from "@/lib/breadcrumb";

export const metadata: Metadata = {
  title: { absolute: "Blog — Laptop, CCTV & IT Support Guides | Numunix" },
  description:
    "Practical, in-depth guides on laptop care, troubleshooting and CCTV security from Numunix's certified technicians in Bangalore — no jargon, just what actually works.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Blog — Laptop, CCTV & IT Support Guides | Numunix",
    description:
      "Practical, in-depth guides on laptop care, troubleshooting and CCTV security from Numunix's certified technicians in Bangalore.",
    type: "website",
    url: "/blog",
  },
};

export default function BlogIndexPage() {
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
  ]);

  return (
    <main className="bg-white text-ink">
      <SiteNav variant="dark" />
      <PageHero
        eyebrow="Numunix Blog"
        title="Guides that actually"
        accent="fix things."
        description="Straightforward, practical advice from certified technicians — no jargon, no upsells. Just what's actually wrong and how to fix it."
      />

      <section className="mx-auto max-w-6xl px-4 py-20 md:px-8 md:py-28">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {BLOG_POSTS.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex flex-col overflow-hidden rounded-3xl border border-border bg-white shadow-soft transition duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-card"
            >
              <div className="relative overflow-hidden">
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  className="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-brand shadow-soft">
                  {post.category}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h2 className="text-lg font-bold leading-snug text-ink">{post.title}</h2>
                <p className="mt-3 flex-1 text-sm leading-6 text-muted-foreground">
                  {post.excerpt}
                </p>
                <div className="mt-5 flex items-center justify-between text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5">
                    <Clock3 className="h-3.5 w-3.5" />
                    {post.readTime}
                  </span>
                  <span className="inline-flex items-center gap-1.5 font-semibold text-brand">
                    Read guide
                    <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <SiteFooter />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
    </main>
  );
}
