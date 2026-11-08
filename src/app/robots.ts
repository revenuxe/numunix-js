import type { MetadataRoute } from "next";
import { SITE_URL } from "@/content/site";
export default function robots(): MetadataRoute.Robots {
  return {
    // Crawlers must fetch private/transactional HTML to observe its noindex rule.
    // Supabase authentication and RLS, rather than robots.txt, protect customer data.
    rules: { userAgent: "*", allow: "/", disallow: ["/api/"] },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
