# SEO and performance enhancements before push

The enhancements retain the repair content, public URL structure, two-line fitted heroes and existing Supabase permissions.

- Fonts are self-hosted through `next/font/local` from package-managed Inter and JetBrains Mono WOFF2 assets. Only the main text font is preloaded.
- Logos use responsive `next/image` delivery with explicit dimensions and sizing.
- Public enquiry validation is loaded on submission rather than during initial page loading. A synchronous submission lock covers chunk loading as well as the server call, and the server validates every request independently.
- Decorative canvas work begins after the heading fits, runs at at most 30fps with elapsed-time-based motion, reuses geometry buffers and stops offscreen or in hidden tabs. Reduced-motion changes are observed during the visit.
- Private and confirmation pages remain crawlable, with both HTML and HTTP `noindex`. API endpoints remain excluded from crawling. Authentication/RLS continue to control data access.
- Apex-domain requests permanently redirect to the HTTPS www canonical, preserving paths and queries.
- Sitemap `lastmod` is emitted only for the five guides with recorded editorial dates; other pages do not assert invented dates or update frequencies.
- Article social metadata retains its author alongside publication/modification dates.
- The public SEO checker now checks unique titles/descriptions, canonical and social metadata, exactly one nonempty server-rendered H1, valid JSON-LD with expected schema types, image alt attributes, internal destinations, crawl rules and sitemap dates.

## Verification artifacts

`crawl.json` records the production crawl of all 133 public pages and 133 internal destinations. No failures were found. Local schema validation checks syntax and expected entities; it does not certify eligibility for a particular Google rich result.

`before.json` and `after.json` record reproducible mobile lab diagnostics. The runner uses cold browser contexts, 390×844 resolution, 4× CPU slowdown, 150ms network latency and 1.6Mbps download, with a six-second observation window. They are individual local samples, not Lighthouse scores or real-user Core Web Vitals. They do not measure field INP or prove search ranking improvements.

| Sample | Initial JavaScript, decoded | LCP before → after | CLS after |
| --- | --- | --- | --- |
| Electronics homepage | 897,174 → 805,278 bytes (10.2% less) | 1,732 → 1,904 ms | 0 |
| Bosch washing-machine page | 942,739 → 811,092 bytes (14.0% less) | 1,460 → 1,448 ms | 0.0092 |

Both final samples had zero third-party requests, no browser errors and no horizontal overflow. Total resource transfer increased by about 33 kB on the homepage and 18 kB on the brand page while the actual font files moved to local delivery. The homepage's LCP was slightly slower in this sample; these results demonstrate less initial JavaScript and more reliable font delivery, not a proven overall speed or ranking gain.

## Completed checks

- TypeScript route generation/checking and the final production build passed.
- The 23-check production browser regression run passed. After deferring validation, all eight affected admin/booking/font/animation/indexing checks passed again, including two synchronous form submissions producing only one booking action.
- All 15 SEO-validator, enquiry, notification and brand-validation unit tests passed.
- The final crawl checked all 133 public pages and 133 internal destinations with zero failures; five sitemap dates are backed by article records.
- All ten legacy redirects, six invalid-route responses and three private/transactional indexing checks passed. The apex-domain redirect also passed its production browser check.
- Installing the font packages reported zero dependency vulnerabilities.

To repeat:

```text
npm run typecheck
npm run test:seo
npx playwright test tests/seo-delivery.spec.ts tests/admin.spec.ts tests/content-visibility.spec.ts tests/seo-improvements.spec.ts tests/bosch-booking.spec.ts tests/godrej-booking.spec.ts tests/whatsapp-format.spec.ts
npm run build
npm start -- --hostname 127.0.0.1 --port 4175
```

Against that running server:

```text
npm run seo:check -- http://127.0.0.1:4175 docs/seo-next-enhancements/crawl.json
npm run test:routes -- http://127.0.0.1:4175
node scripts/measure-public-performance.mjs http://127.0.0.1:4175 docs/seo-next-enhancements/after.json
```

## Checks after deployment

1. Verify the canonical domain and HTTPS redirects on the real host, along with Supabase/email configuration.
2. Verify ownership in Google Search Console, submit `https://www.numunix.com/sitemap.xml` and inspect representative home, service, brand and guide URLs.
3. Run Google's Rich Results Test and review any warnings against visible content. Do not add invented reviews, prices or business credentials to satisfy a tool.
4. Measure mobile PageSpeed and real-user Core Web Vitals on the deployed host. Review font/image delivery, LCP, CLS and INP using real traffic.
5. Review actual search queries and the Google Business Profile before choosing further content or local SEO changes.

No push, deployment, Search Console submission, production enquiry or live email test is part of this preparation.
