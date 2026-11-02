import { readFileSync } from 'node:fs';

// Override only the request origin to validate local SSR against production canonicals.
const siteSource = readFileSync('src/content/site.ts', 'utf8');
const canonicalOrigin = siteSource.match(/export const SITE_URL = "([^"]+)"/)?.[1];
if (!canonicalOrigin) throw new Error('Missing canonical site origin');
const requestOrigin = process.argv[2] || canonicalOrigin;
const sitemap = readFileSync('public/sitemap.xml', 'utf8');
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => match[1]);
const failures = [];
if (!readFileSync('public/robots.txt', 'utf8').includes(`Sitemap: ${canonicalOrigin}/sitemap.xml`)) failures.push('robots.txt sitemap origin differs from canonical origin');
if (new Set(urls).size !== urls.length) failures.push('Duplicate sitemap URLs');
for (let offset = 0; offset < urls.length; offset += 4) {
  await Promise.all(urls.slice(offset, offset + 4).map(async url => {
    try {
      const canonical = new URL(url);
      if (canonical.origin !== canonicalOrigin) failures.push(`${url}: wrong sitemap origin`);
      const response = await fetch(new URL(canonical.pathname, requestOrigin), { redirect: 'manual', signal: AbortSignal.timeout(30000) });
      if (response.status !== 200) {
        failures.push(`${url}: HTTP ${response.status}, location ${response.headers.get('location') ?? 'none'}`);
        return;
      }
      const html = await response.text();
      const declared = [...html.matchAll(/<link\b[^>]*>/g)].filter(match => /\brel="canonical"/.test(match[0])).map(match => match[0].match(/\bhref="([^"]+)"/)?.[1]);
      if (declared.length !== 1 || declared[0] !== url) failures.push(`${url}: canonical ${JSON.stringify(declared)}`);
      if (/<meta\b[^>]*name="robots"[^>]*content="[^"]*noindex/.test(html)) failures.push(`${url}: noindex in sitemap`);
      if (!/<h1[\s>]/.test(html)) failures.push(`${url}: missing server-rendered H1`);
      if (html.includes('https://numunix-flow-engine.lovable.app')) failures.push(`${url}: retired Lovable origin in HTML`);
    } catch (error) {
      failures.push(`${url}: ${error.message}`);
    }
  }));
}
console.log(JSON.stringify({ requestOrigin, canonicalOrigin, pagesChecked: urls.length, failures }, null, 2));
process.exitCode = failures.length ? 1 : 0;
