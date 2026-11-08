import type { MetadataRoute } from "next";
import { PUBLIC_PATHS } from "@/content/public-catalogue";
import { SITE_URL } from "@/content/site";
import { ARTICLES } from "@/content/articles";
export default function sitemap(): MetadataRoute.Sitemap {
  const articleDates = new Map(
    ARTICLES.map((article) => [
      `/repair-guides/${article.slug}`,
      article.updatedAt ?? article.publishedAt,
    ]),
  );
  return [...new Set(PUBLIC_PATHS)].map((path) => ({
    url: `${SITE_URL}${path}`,
    // Only assert dates backed by editorial records; deployment time is not lastmod.
    ...(articleDates.has(path) ? { lastModified: articleDates.get(path)! } : {}),
  }));
}
