import "server-only";
import { cache } from "react";
import { articleBySlug, ARTICLES } from "@/content/articles";
import { LEGACY_ARTICLE_PATHS } from "@/content/repair-legacy";
import { REPAIR_ORGANIZATION_ID, REPAIR_WEBSITE_ID } from "@/content/repair-seo";
import { SITE_URL } from "@/content/site";
import { guideRepairLinks } from "@/content/repair-guide-links";
import { notFound, permanentRedirect, redirect as temporaryRedirect } from "next/navigation";
import { resolveHref } from "@/lib/route-href";
const redirect = ({
  to,
  params,
  statusCode,
}: {
  to: string;
  params?: Record<string, string>;
  statusCode?: number;
}) =>
  statusCode === 301
    ? permanentRedirect(resolveHref(to, params))
    : temporaryRedirect(resolveHref(to, params));
type Context = { params: { slug: string } };
const beforeLoad = ({ params }: Context) => {
  const replacement = LEGACY_ARTICLE_PATHS[params.slug];
  if (replacement)
    throw redirect({
      to: "/repair-guides/$slug",
      params: { slug: replacement },
      statusCode: 301,
    });
};
const loader = ({ params }: Context) => {
  const article = articleBySlug(params.slug);
  if (!article) throw notFound();
  return { article };
};
const loadCachedPage = cache(async (paramsKey: string) => {
  const context: Context = { params: JSON.parse(paramsKey) };
  await beforeLoad(context);
  return await loader(context);
});
export async function loadPage(context: Context) {
  return loadCachedPage(JSON.stringify(context.params));
}
export const pageHead = ({
  params,
  loaderData,
}: {
  params: { slug: string };
  loaderData: Awaited<ReturnType<typeof loadPage>>;
}) => {
  const a = loaderData?.article;
  const title = a?.metaTitle ?? "Repair Guide | Numunix";
  const desc =
    a?.metaDescription ?? "Practical electronics and appliance repair guidance from Numunix.";
  const pageUrl = `${SITE_URL}/repair-guides/${a?.slug ?? params.slug}`;
  return {
    meta: [
      { title },
      { name: "description", content: desc },
      { property: "og:title", content: title },
      { property: "og:description", content: desc },
      { property: "og:type", content: "article" },
      { property: "og:url", content: pageUrl },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: desc },
      { property: "og:locale", content: "en_IN" },
      ...(a
        ? [
            { property: "article:published_time", content: a.publishedAt },
            ...(a.updatedAt ? [{ property: "article:modified_time", content: a.updatedAt }] : []),
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
              name: "Repair Guides",
              item: `${SITE_URL}/repair-guides`,
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
                mainEntityOfPage: pageUrl,
                inLanguage: "en-IN",
                isPartOf: { "@id": REPAIR_WEBSITE_ID },
                datePublished: a.publishedAt,
                dateModified: a.updatedAt ?? a.publishedAt,
                author: {
                  "@type": "Organization",
                  name: a.author,
                  url: SITE_URL,
                },
                publisher: {
                  "@type": "Organization",
                  "@id": REPAIR_ORGANIZATION_ID,
                  name: "Numunix",
                  url: SITE_URL,
                },
              }),
            },
          ]
        : []),
    ],
  };
};
