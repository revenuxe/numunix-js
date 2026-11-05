import { writeFileSync } from "node:fs";
const base = "https://www.numunix.com";
const results = [];
for (const path of ["/", "/electronic/repairs/laptop-repair", "/who-we-serve/offices", "/appliances/repairs/water-purifier-service/kent", "/sitemap.xml"]) {
  const response = await fetch(base + path, { redirect: "manual", headers: { "cache-control": "no-cache" }, signal: AbortSignal.timeout(20000) });
  const html = await response.text();
  results.push({ path, status: response.status, newHomepageHeading: path === "/" ? html.includes("Electronics Repair</span>") : undefined, serviceScope: path.includes("laptop-repair") ? html.includes('id="service-scope"') : undefined, audienceSubject: path.includes("who-we-serve") ? html.includes("Office Equipment Repair") : undefined, sitemapUrls: path === "/sitemap.xml" ? [...html.matchAll(/<loc>/g)].length : undefined });
}
const result = { checkedAt: new Date().toISOString(), results, verified: results.every(r => r.status === 200) && results.find(r => r.path === "/")?.newHomepageHeading === true && results.find(r => r.path.includes("laptop-repair"))?.serviceScope === true && results.find(r => r.path === "/sitemap.xml")?.sitemapUrls === 133 };
writeFileSync("docs/seo-implementation-2026-11-05/deployment-check.json", JSON.stringify(result, null, 2));
console.log(JSON.stringify(result, null, 2));
