# Numunix: full-site SEO and enquiry-growth audit

Reviewed **5 November 2026**. Scope: every one of the **133 public URLs in the current local sitemap**, their public live equivalents, source templates, internal links, metadata, schema, content intent, conversion paths and four live mobile performance samples.

**Main recommendation:** publish the work already prepared, strengthen the core repair-service pages with real operating information and evidence, and connect the guides to those services. More brand pages or more rewritten paragraphs should not be the next default investment.

The site often tells a customer what to ask a repair provider instead of answering what **Numunix actually provides**. Its technical structure is stronger than its commercial evidence. This is an editorial and business assessment, not proof of a particular ranking cause.

## Read this with the page-level files

- [Every page: prioritized actions](page-by-page-actions.md)
- [Every page: spreadsheet with current/proposed titles, H1s, queries and actions](page-by-page-actions.csv)
- [Local crawl evidence](local-pages.csv) and [live crawl evidence](live-pages.csv)
- [Live mobile lab diagnostics](live-performance.json)
- [Full local crawl](local-crawl.json), [full live crawl](live-crawl.json), [content-overlap diagnostic](content-overlap.json)

The query column contains **targeting hypotheses**, not researched search volumes. Priorities express recommended implementation order, not a predicted traffic increase. No application content, business listing or deployment was changed during this audit.

The first brand optimization batch is a limited editorial sample across the main services, not a claim that those brands have the highest search volume or business margin. Replace that ordering with actual enquiry, capability and Search Console evidence when available.

## 1. What was verified

| Area | Observed result | Interpretation |
| --- | --- | --- |
| Current local public inventory | 133 URLs: 16 service hubs, 84 brand pages, 5 guides, 8 audience pages, 8 process stages and 12 core pages | All listed individually in the action spreadsheet |
| Local HTTP responses | 133/133 return 200 | Prepared pages are accessible locally |
| Live responses for that same inventory | 124 return 200; all 9 new purifier-brand destinations return 404 | The recent local work is not fully published |
| Live sitemap | 124 URLs; its listed URLs returned 200 | The nine unpublished URLs are absent, rather than broken entries in the current live sitemap |
| Local titles/descriptions | Unique and present across all 133 | Rewriting every title is unnecessary |
| Canonicals/H1s | One expected canonical and one H1 per local page | Good baseline; H1 relevance can still improve |
| Internal discovery | All 133 local URLs reachable from the homepage within three link steps | No sitemap-page orphan problem found |
| Structured data | Valid JSON parsing; Organization/WebSite, Service and breadcrumb structures present | Syntax checks are not a Google Rich Results eligibility test |
| Private/confirmation pages | Tested login and thank-you pages have noindex | Keep them outside the public sitemap |
| Errors/legacy paths | Tested invalid URLs return 404; sampled legacy routes return 301 to current routes | Preserve this routing behavior |
| Mobile rendering | Six local representative pages and four live samples have visible H1s and no horizontal overflow at the tested viewport | Not a substitute for every device or assistive-technology test |
| Tracking | No GA/gtag/dataLayer found in four live samples; no enquiry-conversion instrumentation found in reviewed source | Other externally configured/server-side analytics were not ruled out |

Search Console, Business Profile administration, actual lead outcomes, backlink tools, field Core Web Vitals, Google-selected canonicals and Google index coverage were not available. Search results were sampled for context; a `site:` query is not a reliable index-count or ranking report. No keyword volumes, ranking guarantees or percentage growth forecasts are asserted.

## 2. Publication is the first blocker

These URLs currently return **404 on the public site**, although they return 200 locally:

`/appliances/repairs/water-purifier-service/{kent,pureit,ao-smith,havells,v-guard,native,faber,zero-b,aquafresh}`

The public purifier hub also lacks the new grid. The revised symptom content on the existing brand pages differs between local and live versions. Google cannot evaluate the unpublished improvements as live content.

**Release task:** publish the reviewed local changes and sitemap together through the existing Lovable workflow. Then verify all nine public destinations, canonical tags, brand-card links, booking defaults and the updated sitemap. Submit the sitemap and inspect representative pages in Search Console when account access is available. Submission supports discovery; it does not guarantee indexing or rankings. [Google sitemap guidance](https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview)

Do not change existing brand URLs during that release, and do not rewrite published Git history.

## 3. Strengthen the sixteen repair-service hubs

The mobile and washing-machine hubs have approximately 2,084 and 2,135 main-content words. The other fourteen have about **386–446**. This is evidence of uneven treatment, not a target word count or proof that shorter pages cannot rank.

More useful service information should live on the hub, where a customer searching without a brand can decide whether to enquire. Brand pages should add model/brand context rather than carry all substantive service information.

| Hub | Main improvement |
| --- | --- |
| Mobile repair | Retain the existing detailed treatment; add verified fees, part options, handover arrangements and genuine evidence |
| Laptop repair | Add laptop-specific fault scope, charger/backup preparation, actual workshop/visit arrangements, upgrade boundaries and repair examples |
| CCTV service | Explain installation versus repair, site survey, authorized access, camera/recorder compatibility, footage preservation and real project evidence |
| TV/audio | Lead with the actual TV service; explain picture versus sound, panel/backlight assessment, handling arrangements and repair economics; separate audio scope |
| Tablet/iPad | Explain exact-model identification, image/touch, charging/battery and feature implications; state actual handover and part policies |
| Data recovery | Specify supported media and actual capabilities, privacy, diagnosis versus recovery and limitations; never promise recovery from every device |
| Console repair | State supported generations and genuine power, image, cooling, storage and controller scope; explain data/account handling |
| Doorstep repair | Make coverage, assessment/visit fee, access and on-site versus workshop limits explicit |
| Washing machine | Retain detailed guidance; add actual appliance-type capability, inspection fee, locality coverage and documented jobs |
| AC | Distinguish cleaning/service, fault repair, installation/relocation and refrigerant work; provide real inclusions, exclusions and access policy |
| Refrigerator | Explain compartment symptoms, fitted features and real assessment scope; add service/charge and follow-up details |
| Microwave/chimney | Separate these two intentions on the page; consider separate pages only if each is a real, distinct service with enough useful information |
| Water purifier | Explain routine filter/kit service versus repair, refill versus dispensing, model compatibility and recommissioning; publish the new brand pages |
| Inverter/UPS | Define the actual inverter/UPS/battery scope, supported setting, safe assessment and service limitations |
| Fan/lighting | State actual fitting, controller, fan and lighting tasks, supplied-part arrangements and visit/minimum charges |
| Electrical | Define actual tasks, safe scope, inspection/quotation process and verified credentials; differentiate it from the fan/lighting page |

### Recommended service-page structure

1. Explicit service and city in the existing two-line hero, followed by a factual summary.
2. A compact decision panel: what is offered, visit/workshop arrangement, actual coverage and confirmed assessment-fee policy.
3. Device/service-specific symptom and scope sections; retain safe boundaries.
4. Supported equipment/model context with no universal compatibility claim.
5. Genuine, permission-cleared work photographs or a documented repair example: reported fault, assessment, approved scope and outcome.
6. Estimate, parts, exclusions and actual job-dependent aftercare terms.
7. Direct links to relevant brands and genuinely related services/guides.
8. The existing booking form and WhatsApp action, with correct defaults.

Keep the public design and prohibition on hero/CTA phone buttons. Neither additional calls to action nor longer copy is a substitute for answers.

## 4. Improve page intent and search appearance

Both homepage titles identify Bangalore, but their H1s are slogans: “Every device, expertly repaired” and “Every appliance, back to its best.” Fourteen service H1s also omit the city. This is not a technical failure; descriptive headings would make the subject clearer to customers and search systems.

Suggested two-line examples, preserving the shared Hero behavior:

- `/`: **Electronics Repair / in Bangalore**
- `/appliances`: **Appliance Repairs / in Bangalore**
- laptop hub: **Laptop Repair / in Bangalore**
- purifier hub: **Water Purifier Service / in Bangalore**

The appliances title is 74 characters; the Native purifier title is 68. Thirteen descriptions exceed 170 characters, including seven washer-brand descriptions that reuse longer introductory copy. Review these for concise, useful wording, rather than applying a rigid character cap. Google fits title links to available display width and can choose different snippets from page content. [Title guidance](https://developers.google.com/search/docs/appearance/title-link), [snippet guidance](https://developers.google.com/search/docs/appearance/snippet)

Examples:

| Page | Proposed title |
| --- | --- |
| `/` | Electronics Repair in Bangalore \| Numunix |
| `/appliances` | Home Appliance Repair in Bangalore \| Numunix |
| purifier hub | Water Purifier Repair in Bangalore \| Numunix |
| Native purifier | Native Water Purifier Repair Bangalore \| Numunix |

Use one primary page per intention: the city service hub for generic service queries, the brand destination for brand-plus-service queries, and a guide for informational questions. Do not add separate “Bangalore” and “Bengaluru” copies, keyword-stuffed “near me” pages or many locality variants without distinct service value. Actual cannibalization must later be checked with query-to-page data; similar keywords alone do not prove it.

## 5. Brand pages need evidence beyond unique wording

The six symptom cards are now different in local source. However, the surrounding sections still share substantial text: estimate questions, approval steps, preparation, repair decisions and aftercare. A diagnostic comparison of normalized five-word shingles found median within-service overlap of about **57–71%** across brand pages. This is a custom text-similarity diagnostic, not a Google score or a penalty threshold. Shared navigation/layout and sensible reusable explanations are normal.

The useful next improvement is **different service value**, not artificially different prose:

- Which exact models and configurations Numunix can actually assess, with honest limitations.
- What model information changes the assessment or parts enquiry.
- Actual visit/handover and compatible-part arrangements.
- Genuine brand-relevant repair evidence where available.
- Verified fee/estimate policy and applicable terms.
- Accurate official-support context, especially when manufacturer cover may apply.

Keep brand pages that answer a real customer need. If a page has no distinct practical information, evaluate strengthening or consolidating it after reviewing its traffic and links. Do not automatically delete, noindex or canonicalize all brand pages to the parent. Google’s concerns focus on pages created primarily to manipulate search with little value; page count or shared design alone does not establish abuse. [Helpful-content guidance](https://developers.google.com/search/docs/fundamentals/creating-helpful-content), [spam policies](https://developers.google.com/search/docs/essentials/spam-policies)

The current pages contain approximately 1,727–2,449 main-content words. Some can likely become clearer and shorter as generic “ask what…” advice is replaced by actual business answers. There is no preferred word count to pursue.

## 6. Fix the guide-to-service journey

All five guides currently link to the general directory/contact and other guides, but none has a direct main-content link to an individual repair-service destination. The missing connection is straightforward:

| Guide | Add a relevant contextual destination |
| --- | --- |
| Mobile repair: before you book | `/electronic/repairs/mobile-repair` |
| Laptop faults: repair or replace? | `/electronic/repairs/laptop-repair` |
| Appliance visit checklist | The washer, AC, fridge or purifier hub beside the matching advice |
| Choosing a repair service in Bangalore | The relevant service example and verified workshop/contact information |
| Understanding your repair estimate | `/repair-process/repair-estimate` and a service-specific example |

Use descriptive, natural anchors. Add reciprocal links from services where the guide answers the next customer question. A customer should be able to move from understanding a symptom to requesting the relevant service without searching the directory again.

The guides are attributed to “Numunix Repair Team.” Add genuine reviewer information or a team-expertise page, clear responsibility for technical advice, original observations/photos and source-specific references. Keep published/updated dates meaningful. Do not invent technician qualifications or use automatic date refreshes.

Future topics should come from actual customer questions and, later, Search Console queries. Examples to validate include a slow-refill purifier checklist, laptop no-power versus no-display preparation, freezer-cold/fridge-warm observations and CCTV live-view versus recording gaps. Publish only where the business can contribute accurate, useful expertise. Avoid hazardous internal repair instructions.

## 7. Local presence and business trust

The live contact page currently shows the LR Bande / RT Nagar address and 560032 postcode. A search result for the same domain still surfaced older Shampura/560045 wording from an older crawl. **That is stale search evidence, not proof that the current live contact page has conflicting addresses.** Confirm the real operating details and then reconcile the website, Business Profile and legitimate directory listings.

Recommended business work:

1. Verify the Business Profile and use accurate actual business categories, opening hours and customer-visit/service-area settings.
2. Confirm whether customers can visit the stated workshop and provide useful directions or a verified map link.
3. Add genuine workshop, technician and repair photographs with permission; avoid presenting illustrative scenes as real jobs.
4. Show a truthful business/team story and service responsibility. An About/workshop section is a stronger trust investment than another batch of generic landing pages.
5. Invite real customers to leave honest reviews and respond helpfully. Do not buy, fabricate or selectively incentivize positive reviews.
6. Earn legitimate local references through real customer/supplier/community relationships. No mass directory submissions, paid link schemes or invented branch locations.

Google describes local visibility in terms of relevance, distance and prominence. Website content can support relevance, but adding city words cannot remove distance or replace a credible local presence. [Google local-ranking guidance](https://support.google.com/business/answer/7091)

### Structured-data opportunity

The site uses a stable Organization identifier, but that entity currently lacks the visible address, telephone, hours, logo and verified profile connections. Once business details are confirmed, enrich the same entity with a suitable truthful LocalBusiness type and visible details; keep existing Service provider references connected to it. Validate with the Rich Results Test and URL Inspection after deployment. Do not add fabricated ratings, certifications, prices, coordinates or reviews. LocalBusiness markup can improve understanding and eligibility, not guarantee a ranking change. [LocalBusiness guidance](https://developers.google.com/search/docs/appearance/structured-data/local-business)

FAQs remain useful customer content. FAQ rich-result markup is not a priority traffic strategy for this repair business; Google restricts regular FAQ rich results to eligible authoritative health/government sites. [FAQ rich-result guidance](https://developers.google.com/search/blog/2023/08/howto-faq-changes)

## 8. Audience and process pages

All eight audience pages have the **same H1**, “Everyday equipment. Considered care.” Their visible card collections are largely the same electronics set on first load. Give each page a clear subject and useful operating differences: office access/data responsibility, shop trading hours, school scheduling, community permissions, and non-medical scope for clinics, for example. Do not imply specialist medical or industrial repair capability.

Saved-category navigation can remain useful, but page identity and core promise should stay coherent. Make a direct visitor's audience context clear without requiring a prior category choice. Retain separate pages when they add real value; verify demand later rather than assuming eight URLs will produce eight worthwhile search opportunities.

The eight process-stage pages have roughly 175–191 main-content words. That does not make them automatically “thin.” They can serve existing customers. However, generic stage explanations should not consume the same effort as revenue-driving service pages. Add real stage-specific policy/checklists where useful; otherwise evaluate consolidation into the process hub with appropriate redirects after checking historical traffic and backlinks.

## 9. Production mobile performance

Four cold-cache live Chromium samples used a 390×844 viewport, 4× CPU slowdown, 150 ms network latency and 1.6 Mbps download. These are **single lab diagnostics**, not Lighthouse scores, field Core Web Vitals or representative 75th-percentile results.

| Public page | Observed lab LCP | Approximate resource transfer* | DOM elements |
| --- | --- | --- | --- |
| Electronics homepage | 2.87 s | 446 KB | 2,434 |
| Appliances homepage | 2.90 s | 446 KB | 2,333 |
| Mobile service | 2.35 s | 420 KB | 797 |
| Bosch washer page | 2.49 s | 433 KB | 654 |

*Resource transfer comes from browser resource timing, excluding the HTML navigation entry and not counting every cross-origin byte where timing disclosure is restricted. It is a comparison aid, not total billing traffic.

All sampled pages had visible headings, no horizontal overflow and no uncaught page errors. Compressed HTML is being served. The samples recorded long main-thread tasks up to about 299–532 ms. This does not establish INP; it identifies work to investigate.

Recommended performance tasks:

- Inspect the main client entry and category/shared dependency bundle before adding more JavaScript.
- Trace shared category/navigation dependencies and catalogue imports to identify avoidable client work; split code or content per route/service where the bundle analysis supports it.
- Use correctly sized header/footer logos and defer below-fold footer media where appropriate. Both logo assets currently load early and together represent about 82 KB of transferred resources in these samples.
- Keep below-fold illustrations and interactions inexpensive; review duplicated responsive homepage content and the 2,300+ element homepage DOM.
- Profile the animated canvas and stop unnecessary work offscreen; retain reduced-motion support.
- Check font loading and heading fitting under slow/failed fonts while preserving the required pre-paint fitting behavior.
- Retest after the unpublished content is deployed; its bundle composition differs from the current live version.

Google’s good-experience reference values are LCP within 2.5 seconds, INP below 200 ms and CLS below 0.1. Evaluate actual field performance when available rather than declaring a pass/fail from these four runs. [Core Web Vitals guidance](https://developers.google.com/search/docs/appearance/core-web-vitals)

The full raw lab file includes layout-shift events. Their raw sum is **not** a correctly session-windowed CLS score, and no INP result was measured. Local development-server resource totals are also saved in the crawl; **do not treat those as production asset measurements**.

## 10. Measurement needed to grow impressions and enquiries

Establish the baseline before judging optimization:

- Search Console: page indexing, submitted sitemap, selected canonicals, query/page/device/country performance and field experience where available.
- Compare successive 28-day periods; use longer comparisons for low-volume pages and seasonality. Separate branded and non-branded queries.
- Track which service and brand pages gain relevant impressions, clicks and enquiry starts. A higher impression count for irrelevant queries is not the business objective.
- Add consent-appropriate events for service/brand selection, form start, successful server-confirmed enquiry, successful callback request and WhatsApp click. A WhatsApp click is a contact intent, not a confirmed lead.
- Keep phone numbers, names, enquiry text and other personal data out of analytics event parameters. Use page/service identifiers for analysis.
- Attribute completed enquiries to their originating page, already captured by the lead flow, then record qualified lead and completed-job outcomes when operationally available.
- Verify whether the “callback within 15 minutes” promise is operationally supported during the stated hours; keep the public promise consistent with actual handling.

Later query-led decisions should be concrete: improve a page already showing relevant impressions but weak click appeal; answer missing service questions on a page attracting qualified queries; address discoverability/indexability before changing content on a page Google has not indexed. Do not assume positions 8–20 or any search volumes without data.

## 11. Recommended delivery order

| Order | Work | Completion evidence |
| --- | --- | --- |
| First release | Publish pending purifier pages, grid and revised brand cards; verify public routes and sitemap | Nine new URLs return 200 and appear in the deployed sitemap; old URLs remain intact |
| First optimization batch | Strengthen laptop, CCTV, AC, fridge and purifier hubs; clarify homepage/service H1s; add guide-to-service links | Real fee/scope/coverage information supplied by the business, relevant links and mobile QA |
| Alongside that batch | Confirm local business details, real evidence, Business Profile and enquiry measurement | Consistent verified facts, owner-approved evidence and tested conversion events |
| Next batch | Add meaningful brand-specific service evidence, improve audience pages and complete the remaining hubs | Each page answers a distinct decision and preserves appropriate service/brand defaults |
| Performance batch | Reduce shared client work, logo cost and avoidable homepage complexity | Repeatable production lab comparison and, later, field data |
| Ongoing | Review real queries and leads, maintain facts, add useful guides and legitimate references | More relevant non-brand visibility and qualified enquiries over appropriate comparison periods |

These are implementation phases, not a promise of results within a set number of days. Search impact depends on deployment, crawling/indexing, actual service competitiveness, local presence and customer demand.

## 12. What not to spend effort on now

- Creating hundreds of brand × model × locality combinations without unique service value.
- Rewriting the same guidance again only to reduce a text-similarity percentage.
- Keyword density targets, arbitrary word counts or treating title character counts as ranking rules.
- Adding FAQ/review schema in the expectation of guaranteed rich results.
- Creating separate Bangalore/Bengaluru duplicates or pretending to have branches in every locality.
- Publishing unverified prices, warranty duration, same-day promises, author credentials, repair success rates or testimonials.
- Changing working URLs or the established design when the real gap is factual service information and evidence.

The page-by-page spreadsheet assigns a practical next action to every current public URL, while the crawl files preserve the observations that support those recommendations.
