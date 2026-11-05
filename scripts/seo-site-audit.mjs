import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { gzipSync } from "node:zlib";
import { chromium } from "@playwright/test";

const origin = process.argv[2] || "http://127.0.0.1:4173";
const live = process.argv.includes("--live");
const outputDir = "docs/seo-audit-2026-11-05";
mkdirSync(outputDir, { recursive: true });
const sitemap = readFileSync("public/sitemap.xml", "utf8");
const canonicalOrigin = "https://www.numunix.com";
const paths = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => new URL(match[1]).pathname);
const browser = await chromium.launch({ headless: true });
const parser = await browser.newPage();
const records = [];

async function inspect(path) {
  const start = performance.now();
  let response;
  try {
    response = await fetch(new URL(path, origin), { redirect: "manual", signal: AbortSignal.timeout(30000) });
    const html = await response.text();
    if (live && (path === "/robots.txt" || path === "/sitemap.xml")) writeFileSync(`${outputDir}/live-${path.slice(1)}`, html);
    const parsed = await parser.evaluate(({ html, path, canonicalOrigin }) => {
      const doc = new DOMParser().parseFromString(html, "text/html");
      const clean = el => {
        const clone = el?.cloneNode(true);
        clone?.querySelectorAll("script,style,noscript,select,nav,header,footer").forEach(node => node.remove());
        return clone?.textContent?.replace(/\s+/g, " ").trim() || "";
      };
      const meta = name => doc.querySelector(`meta[name="${name}"]`)?.content || "";
      const links = scope => Array.from((scope || doc).querySelectorAll("a[href]")).flatMap(a => {
        const raw = a.getAttribute("href");
        try {
          const target = new URL(raw, canonicalOrigin + path);
          return target.origin === canonicalOrigin ? [{ path: target.pathname, hash: target.hash, text: clean(a), raw }] : [];
        } catch { return []; }
      });
      const main = doc.querySelector("main");
      const headingText = el => Array.from(el.childNodes).map(n => n.nodeName === "BR" ? " " : n.textContent).join("").replace(/\s+/g, " ").trim();
      const schema = [];
      const schemaErrors = [];
      for (const script of doc.querySelectorAll('script[type="application/ld+json"]')) {
        try { schema.push(JSON.parse(script.textContent)); } catch (error) { schemaErrors.push(error.message); }
      }
      const flatten = node => Array.isArray(node) ? node.flatMap(flatten) : node && typeof node === "object" ? [node, ...Object.values(node).flatMap(flatten)] : [];
      const nodes = flatten(schema).filter(node => node["@type"]);
      const headings = Array.from(doc.querySelectorAll("h1,h2,h3")).map(h => ({ level: h.tagName, text: headingText(h) }));
      const images = Array.from(doc.querySelectorAll("img")).map(img => ({ src: img.getAttribute("src"), alt: img.getAttribute("alt"), width: img.getAttribute("width"), height: img.getAttribute("height"), loading: img.loading }));
      return {
        title: doc.querySelector("title")?.textContent || "", description: meta("description"), robots: meta("robots"),
        canonicals: Array.from(doc.querySelectorAll('link[rel="canonical"]')).map(link => link.getAttribute("href")),
        h1s: headings.filter(h => h.level === "H1").map(h => h.text), headings,
        mainText: clean(main), links: links(doc), mainLinks: main ? links(main) : [], schemaTypes: [...new Set(nodes.map(n => n["@type"]).flat())], schemaErrors,
        schema: schema, images, lang: doc.documentElement.lang,
        metaCounts: { titles: doc.querySelectorAll("title").length, descriptions: doc.querySelectorAll('meta[name="description"]').length },
      };
    }, { html, path, canonicalOrigin });
    return { path, status: response.status, redirect: response.headers.get("location"), htmlBytes: Buffer.byteLength(html), htmlGzipBytes: gzipSync(html).length, requestMs: Math.round(performance.now() - start), ...parsed };
  } catch (error) { return { path, status: response?.status ?? null, error: error.message, code: error.cause?.code }; }
}

const selectedPaths = live ? [...paths, "/robots.txt", "/sitemap.xml"] : paths;
for (const path of selectedPaths) {
  records.push(await inspect(path));
  if (records.length % 25 === 0) console.log(`Audited ${records.length}/${selectedPaths.length}`);
}

const pathSet = new Set(paths);
const inlinks = new Map(paths.map(path => [path, new Set()]));
const mainInlinks = new Map(paths.map(path => [path, new Set()]));
for (const record of records) {
  for (const link of record.links || []) if (inlinks.has(link.path) && link.path !== record.path) inlinks.get(link.path).add(record.path);
  for (const link of record.mainLinks || []) if (mainInlinks.has(link.path) && link.path !== record.path) mainInlinks.get(link.path).add(record.path);
}
const byPath = new Map(records.map(record => [record.path, record]));
const depths = new Map([["/", 0]]);
const queue = ["/"];
for (let index = 0; index < queue.length; index++) {
  const path = queue[index];
  for (const link of byPath.get(path)?.links || []) if (pathSet.has(link.path) && !depths.has(link.path)) { depths.set(link.path, depths.get(path) + 1); queue.push(link.path); }
}
const duplicates = key => {
  const groups = new Map();
  for (const row of records) {
    const value = row[key];
    if (typeof value !== "string" || !value) continue;
    if (!groups.has(value)) groups.set(value, []);
    groups.get(value).push(row.path);
  }
  return [...groups].filter(([, group]) => group.length > 1).map(([value, paths]) => ({ value, paths }));
};
for (const row of records) {
  row.titleLength = row.title?.length ?? 0;
  row.descriptionLength = row.description?.length ?? 0;
  row.wordCount = row.mainText?.split(/\s+/).filter(Boolean).length ?? 0;
  row.inlinks = [...(inlinks.get(row.path) || [])];
  row.contextualInlinks = [...(mainInlinks.get(row.path) || [])];
  row.depth = depths.get(row.path) ?? null;
  row.family = row.path.match(/^\/(electronic|appliances)\/repairs\/[^/]+\/[^/]+$/) ? "Brand" : row.path.includes("/repairs/") ? "Service" : row.path.startsWith("/repair-guides/") ? "Guide" : row.path.startsWith("/who-we-serve/") ? "Audience" : row.path.startsWith("/repair-process/") ? "Process stage" : "Core";
  row.flags = [];
  if (row.status !== 200) row.flags.push(`HTTP ${row.status}`);
  if (row.error) row.flags.push(row.error);
  if (row.status === 200 && !row.path.endsWith(".txt") && !row.path.endsWith(".xml")) {
    if (!row.title) row.flags.push("Missing title");
    if (!row.description) row.flags.push("Missing meta description");
    if (row.canonicals?.length !== 1 || row.canonicals[0] !== canonicalOrigin + row.path) row.flags.push("Canonical mismatch");
    if (row.h1s?.length !== 1) row.flags.push(`H1 count ${row.h1s?.length}`);
    if (row.robots?.includes("noindex")) row.flags.push("Noindex");
    if (row.titleLength > 65) row.flags.push("Long title: review search appearance");
    if (row.descriptionLength > 170) row.flags.push("Long description: review search appearance");
    if (!live && !row.inlinks.length && row.path !== "/") row.flags.push("No inlinks from sitemap pages");
    if (!live && row.depth === null) row.flags.push("Unreachable from homepage in sitemap graph");
    if (row.schemaErrors?.length) row.flags.push("Invalid JSON-LD");
    if (row.path === "/" || row.path === "/appliances") row.flags.push("H1 omits service location");
    if (row.family === "Brand") row.flags.push("Needs genuine service evidence, pricing/fee policy and coverage details");
    if (row.family === "Service" && row.wordCount < 900) row.flags.push("Review service-specific scope and decision information (not word-count target)");
    if (row.family === "Guide") row.flags.push("Add real reviewer credentials and contextual service links");
    if (row.family === "Audience") row.flags.push("Validate distinct audience demand and unique service information");
  }
}

const extraPaths = [...new Set(records.flatMap(row => (row.links || []).map(link => link.path)))].filter(path => !pathSet.has(path));
const extraChecks = [];
if (!live) {
  for (const path of [...new Set([...extraPaths, "/features", "/articles", "/approach", "/process", "/repairs/mobile-repair", "/electronics/repairs/mobile-repair", "/appliances/repairs/ac-repair/kent", "/definitely-not-a-real-page", "/admin/login", "/thank-you"])]) {
    if (path.startsWith("/api/")) continue;
    try {
      const response = await fetch(new URL(path, origin), { redirect: "manual", signal: AbortSignal.timeout(20000) });
      const html = await response.text();
      extraChecks.push({ path, status: response.status, location: response.headers.get("location"), noindex: /name="robots"[^>]*content="[^"]*noindex/.test(html) });
    } catch (error) { extraChecks.push({ path, error: error.message }); }
  }
}

const renderChecks = [];
if (!live) {
  for (const path of ["/", "/appliances", "/electronic/repairs/mobile-repair", "/appliances/repairs/water-purifier-service/kent", "/appliances/repairs/water-purifier-service/native", "/repair-guides/mobile-repair-before-you-book"]) {
    const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
    const errors = [];
    page.on("pageerror", error => errors.push(error.message));
    await page.goto(origin + path, { waitUntil: "networkidle" });
    const result = await page.evaluate(() => ({
      h1: document.querySelector("h1")?.innerText, h1Visible: document.querySelector("h1") ? getComputedStyle(document.querySelector("h1")).visibility : null,
      overflow: document.documentElement.scrollWidth > innerWidth,
      domNodes: document.getElementsByTagName("*").length,
      resourceBytes: performance.getEntriesByType("resource").reduce((total, item) => total + (item.transferSize || 0), 0),
      resourceCount: performance.getEntriesByType("resource").length,
      longHeadings: [...document.querySelectorAll("h1,h2,h3")].filter(el => el.scrollWidth > el.clientWidth + 1).map(el => el.textContent),
      navigation: performance.getEntriesByType("navigation").map(n => ({ domContentLoadedMs: Math.round(n.domContentLoadedEventEnd), loadMs: Math.round(n.loadEventEnd) })),
    }));
    renderChecks.push({ path, ...result, errors });
    if (path.includes("/native")) await page.screenshot({ path: outputDir + "/native-mobile.png", fullPage: true });
    await page.close();
  }
}
const summary = {
  origin, mode: live ? "Live samples" : "Local current source", auditedAt: new Date().toISOString(), sitemapUrls: paths.length, audited: records.length,
  families: Object.fromEntries([...new Set(records.map(r => r.family))].map(f => [f, records.filter(r => r.family === f).length])),
  non200: records.filter(r => r.status !== 200).map(r => ({ path: r.path, status: r.status, error: r.error })),
  duplicateTitles: duplicates("title"), duplicateDescriptions: duplicates("description"),
  noInlinks: records.filter(r => !r.inlinks.length && r.path !== "/").map(r => r.path),
  noContextualInlinks: records.filter(r => !r.contextualInlinks.length && r.path !== "/").map(r => r.path),
  unreachable: records.filter(r => r.depth === null).map(r => r.path),
  missingMeta: records.filter(r => !r.title || !r.description).map(r => r.path),
  extraChecks, renderChecks,
};
const prefix = live ? "live" : "local";
writeFileSync(`${outputDir}/${prefix}-crawl.json`, JSON.stringify({ summary, pages: records }, null, 2));
const csvColumns = ["path", "family", "status", "title", "titleLength", "description", "descriptionLength", "h1s", "wordCount", "depth", "inlinks", "contextualInlinks", "htmlBytes", "htmlGzipBytes", "schemaTypes", "flags"];
const cell = value => '"' + (Array.isArray(value) ? value.join(" | ") : value ?? "").toString().replaceAll('"', '""') + '"';
writeFileSync(`${outputDir}/${prefix}-pages.csv`, [csvColumns.join(","), ...records.map(row => csvColumns.map(key => cell(key === "inlinks" || key === "contextualInlinks" ? row[key].length : row[key])).join(","))].join("\n"));
console.log(JSON.stringify(summary, null, 2));
await browser.close();
