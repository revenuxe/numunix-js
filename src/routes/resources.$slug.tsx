import { createFileRoute, notFound } from "@tanstack/react-router";
import Header from "@/components/numunix/Header";
import Footer from "@/components/numunix/Footer";
import Hero from "@/components/numunix/Hero";
import { Btn, Reveal } from "@/components/numunix/primitives";
import { articleBySlug } from "@/content/articles";
import { REPAIR_ORGANIZATION_ID, REPAIR_WEBSITE_ID, repairPageHead } from "@/content/repair-seo";
import { SITE_URL } from "@/content/site";

export const Route = createFileRoute("/resources/$slug")({
  loader: ({ params }) => { const article = articleBySlug(params.slug); if (!article) throw notFound(); return article; },
  head: ({ loaderData }) => {
    const article = loaderData;
    if (!article) return { meta: [{ title: "Resource unavailable | Numunix" }, { name: "robots", content: "noindex" }] };
    const pageUrl = `${SITE_URL}/resources/${article.slug}`;
    const base = repairPageHead({ title: article.metaTitle, description: article.metaDescription, path: `/resources/${article.slug}`, breadcrumbs: [{ name: "Resources", path: "/resources" }, { name: article.title, path: `/resources/${article.slug}` }] });
    return { ...base, meta: [...base.meta, { property: "og:type", content: "article" }, { property: "article:published_time", content: article.publishedAt }], scripts: [...base.scripts, { type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@type": "Article", headline: article.title, description: article.metaDescription, datePublished: article.publishedAt, dateModified: article.updatedAt ?? article.publishedAt, author: { "@type": "Organization", name: "Numunix", url: SITE_URL }, publisher: { "@type": "Organization", "@id": REPAIR_ORGANIZATION_ID }, isPartOf: { "@id": REPAIR_WEBSITE_ID }, mainEntityOfPage: pageUrl }) }] };
  },
  component: ResourcePage,
});

function ResourcePage() {
  return <PlaybookPage article={Route.useLoaderData()} />;
}

function PlaybookPage({ article }: { article: NonNullable<ReturnType<typeof articleBySlug>> }) {
  return <div className="bg-[#05070c]"><Header/><main><Hero headline={article.title} accent="Service operations playbook." intro={article.excerpt} primaryLabel="EXPLORE FEATURES" primaryHref="/features" secondaryLabel="OPEN WORKSPACE" secondaryHref="https://app.numunix.com"/><article className="section-pad bg-[#f1f5f9]"><div className="shell grid gap-12 lg:grid-cols-[minmax(0,1fr)_17rem] lg:gap-20"><div className="max-w-[74ch]">{article.content.map((section,index)=><Reveal key={section.heading} delay={index*50}><section className="border-b border-[#dbe5f2] py-8 first:pt-0"><div className="mb-3 font-mono text-[12px] text-[#1747b8]">{String(index+1).padStart(2,"0")}</div><h2 className="text-[24px] font-medium tracking-[-0.02em] text-[#102a63]">{section.heading}</h2><div className="mt-4 text-[16px] leading-[1.75] text-[#526b91] [&_p]:mb-4 [&_p:last-child]:mb-0" dangerouslySetInnerHTML={{__html:section.body}}/></section></Reveal>)}<div className="mt-10 rounded-2xl border border-[#dbe5f2] bg-white p-6 sm:p-8"><h2 className="text-[22px] font-medium text-[#102a63]">{article.cta?.title ?? "Explore the service workspace"}</h2><p className="mt-3 text-[15px] leading-relaxed text-[#5d76a3]">{article.cta?.body ?? "Connect enquiries, bookings, jobs and invoices in one shared workspace."}</p><div className="mt-6"><Btn as="a" href="/features">{article.cta?.label ?? "EXPLORE FEATURES"}</Btn></div></div></div><aside className="h-fit rounded-2xl border border-[#dbe5f2] bg-white p-6 lg:sticky lg:top-28"><div className="text-[14px] font-medium text-[#102a63]">In this playbook</div><ol className="mt-4 space-y-3">{article.content.map((section,index)=><li key={section.heading} className="flex gap-3 text-[13px] leading-relaxed text-[#5d76a3]"><span className="font-mono text-[#1747b8]">{String(index+1).padStart(2,"0")}</span>{section.heading}</li>)}</ol><p className="mt-6 border-t border-[#e6edf7] pt-5 text-[12px] leading-relaxed text-[#8190aa]">{article.readTime} · {article.publishedAt}</p></aside></div></article></main><Footer/></div>;
}
