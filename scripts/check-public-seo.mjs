import { readFileSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";
import { inspectPublicHtml } from "./public-seo-validation.mjs";

const canonicalOrigin = readFileSync("src/content/site.ts", "utf8").match(
  /export const SITE_URL = "([^"]+)"/,
)?.[1];
if (!canonicalOrigin) throw new Error("Missing canonical origin");
const requestOrigin = process.argv[2] || canonicalOrigin;
const output = process.argv[3];
const get = (path) =>
  fetch(new URL(path, requestOrigin), { redirect: "manual", signal: AbortSignal.timeout(30000) });
const sitemapResponse = await get("/sitemap.xml");
if (!sitemapResponse.ok) throw new Error(`Sitemap HTTP ${sitemapResponse.status}`);
const sitemap = await sitemapResponse.text();
const entries = [...sitemap.matchAll(/<url>([\s\S]*?)<\/url>/g)].map((match) => ({
  url: match[1].match(/<loc>([^<]+)<\/loc>/)?.[1],
  lastmod: match[1].match(/<lastmod>([^<]+)<\/lastmod>/)?.[1],
}));
const urls = entries.map((entry) => entry.url).filter(Boolean);
const failures = [];
const pages = [];
const statusByPath = new Map();
const internalPaths = new Set();
if (!urls.length || urls.length !== entries.length) failures.push("Empty or malformed sitemap");
if (new Set(urls).size !== urls.length) failures.push("Duplicate sitemap URLs");
for (const entry of entries) {
  if (
    entry.lastmod &&
    (!Number.isFinite(Date.parse(entry.lastmod)) || Date.parse(entry.lastmod) > Date.now())
  )
    failures.push(`${entry.url}: invalid or future lastmod`);
  if (entry.url && /^\/(admin|api|thank-you)(\/|$)/.test(new URL(entry.url).pathname))
    failures.push(`${entry.url}: private/transactional URL in sitemap`);
}
const robotsResponse = await get("/robots.txt");
const robots = await robotsResponse.text();
if (!robotsResponse.ok || !robots.includes(`Sitemap: ${canonicalOrigin}/sitemap.xml`))
  failures.push("Invalid robots.txt or sitemap declaration");
if (/Disallow:\s*\/(?:admin|thank-you)/i.test(robots))
  failures.push("robots.txt prevents crawlers from reading private-page noindex");
for (let offset = 0; offset < urls.length; offset += 4) {
  await Promise.all(
    urls.slice(offset, offset + 4).map(async (url) => {
      try {
        const canonical = new URL(url);
        if (canonical.origin !== canonicalOrigin || canonical.search || canonical.hash)
          throw new Error("Invalid sitemap URL origin/query/fragment");
        const response = await get(canonical.pathname);
        statusByPath.set(canonical.pathname, response.status);
        if (response.status !== 200) throw new Error(`HTTP ${response.status}`);
        if (/noindex|\bnone\b/i.test(response.headers.get("x-robots-tag") ?? ""))
          failures.push(`${url}: public HTTP noindex`);
        const result = inspectPublicHtml(await response.text(), url);
        failures.push(...result.failures.map((failure) => `${url}: ${failure}`));
        result.internalLinks.forEach((path) => internalPaths.add(path));
        pages.push({
          url,
          title: result.title,
          description: result.description,
          schemaTypes: result.schemaTypes,
        });
      } catch (error) {
        failures.push(`${url}: ${error.message}`);
      }
    }),
  );
}
for (const field of ["title", "description"]) {
  const owners = new Map();
  for (const page of pages) {
    const value = page[field]?.toLowerCase().trim();
    if (!value) continue;
    if (owners.has(value))
      failures.push(`${page.url}: duplicate ${field} shared with ${owners.get(value)}`);
    else owners.set(value, page.url);
  }
}
const remainingPaths = [...internalPaths].filter((path) => !statusByPath.has(path));
for (let offset = 0; offset < remainingPaths.length; offset += 4)
  await Promise.all(
    remainingPaths.slice(offset, offset + 4).map(async (path) => {
      try {
        const response = await get(path);
        statusByPath.set(path, response.status);
        if (response.status !== 200)
          failures.push(`${path}: internal navigation returns HTTP ${response.status}`);
        await response.body?.cancel();
      } catch (error) {
        failures.push(`${path}: ${error.message}`);
      }
    }),
  );
const result = {
  requestOrigin,
  canonicalOrigin,
  pagesChecked: pages.length,
  internalDestinationsChecked: internalPaths.size,
  datedSitemapEntries: entries.filter((entry) => entry.lastmod).length,
  failures,
  pages: pages.sort((a, b) => a.url.localeCompare(b.url)),
};
if (output) {
  mkdirSync(dirname(output), { recursive: true });
  writeFileSync(output, JSON.stringify(result, null, 2) + "\n");
}
console.log(JSON.stringify({ ...result, pages: undefined }, null, 2));
process.exitCode = failures.length ? 1 : 0;
