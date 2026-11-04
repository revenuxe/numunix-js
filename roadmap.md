# Roadmap

- [ ] Differentiate all existing repair brand pages with useful brand-specific sections and metadata while preserving the homepage design and booking flow.

- [ ] Build the Bosch washing machine repair page with researched content, shared homepage design, brand-prefilled booking, metadata, schema and a brand-card link.

- [x] Switched bookings to publishable-key-only RPC. Verified actual Mobile/Washer receipts, stored New status with blank internal notes and blocked anonymous customer reads. Public execution warnings are intentional for this narrow write-only RPC. Vercel redeploy remains user action.
- [ ] Remove latest test bookings 077ef692-7ca0-4774-869c-7f8bc32baef7 and db8c24f3-08c4-4026-b9b3-97d768891ba9; prior cleanup permission was declined.

- [x] Restored secure Supabase runtime bindings and verified real Mobile and Washing Machine bookings, saved references and confirmation reloads. Environment files are ignored and not tracked; booking errors no longer expose integration details. Publish required for live settings.
- [ ] Remove the two November 1 runtime-verification booking entries. Cleanup was declined; IDs: bc88d4da-25fc-4fd3-b4b4-f586d5543ee1 and 481d1321-2e33-43ae-aa96-61ae727aab6e.

- [x] Refreshed admin dashboard colors, typography, button variants, compact phone metrics and lead dialogs. Verified phone/desktop layouts and note saving with mocked enquiries; four lead tests passed. Real-account checks remain blocked by external unmanaged authentication; existing JS browser tests cannot launch their missing browser binary.

- [x] Fixed booking source and timing rejection; added stored unique service-prefixed references and thank-you receipts, plus reference in admin details. Verified Mobile and Washing Machine submissions, database records, confirmation reload and removed test rows. Owner email remains off until a sending domain is verified.

- [x] Fixed faint header contrast with a stable dark strip, clearer navigation and menu controls; verified 51 scrolling frames, category switching, mobile menu and desktop/phone screenshots without overflow or errors.
- [x] Prevent initial heading overflow by fitting before display and after fonts load; verified visible loading frames on three pages and desktop resizing.

- [x] Strengthened repair page metadata, Service/CollectionPage/Breadcrumb/Organization schemas and crawler guidance; removed retired software modules and artwork. Verified 49 public pages, unique titles, canonicals, repair-only content, service booking and legacy redirects; 25 tests passed.
- [ ] Connect Google Search Console and verify the published site; connection was declined, so Google indexing reports and sitemap submission remain unverified.

- [x] Verified eight distinct navigation destinations, category-specific service links, Appliances return via logo and root homepage, and explicit Electronics selection across reloads.

- [x] Added category-prefixed service addresses, updated all card links and metadata, retained old service redirects, and verified 49 pages and 18 tests.
- [x] Replaced repair detail hero secondary actions with service-specific WhatsApp booking and the supplied icon rendered white; verified the icon loads and the message names the service.
- [x] Removed public enquiry email inputs, made email omission valid, kept original service-page sources and added repair visit timing options. Added repair category/service filters, repair status labels, fault details, notes and WhatsApp customer actions to the admin dashboard. Twenty-one unit tests and five schema tests passed.
- [ ] Verify signed-in admin lead management against real data. Blocked by external unmanaged Supabase authentication; existing browser tests also cannot launch their required Chromium version in this environment.

- [x] Connected illustrated repair cards to named service pages; replaced development-era addresses and menu names with repair destinations and kept permanent redirects. Verified washing-machine card navigation, saved Appliances selection, twelve legacy redirects and all 49 public pages on phone and desktop with unique titles, self-referencing metadata and no overflow or page errors.

- [x] Replaced software-development content across public directories, company pages, articles, policies, navigation and metadata with repair content. Verified all 49 sitemap pages, legacy redirects, category-specific audience and service views, service-to-enquiry flow, mobile/desktop rendering and 12 tests.

- [x] Refresh repair H1s and keep shared public-page headings on two complete lines; verified phone and desktop rendering and existing repair tests.
- [x] Keep selected Electronics or Appliances category across navigation until explicitly changed; replaced interior-page header action with Call Now and a phone icon. Verified selection, interior footer, home return, reload, explicit category switch and eight tests.

- [x] Created sixteen Electronics and Appliances repair pages, linked service cards and footer links, and matched public content-page openings to the homepage ribbon design. Verified all pages, mobile card-to-enquiry flow, metadata and six tests.

- [x] Stabilize the category dropdown and provide separately addressable Electronics and Appliances homepages with category-specific metadata and content; verified navigation, reloads, full labels, metadata and no header movement at 394px and 1280px.

- [x] Curate homepage audience visuals for actual repairs and make the hero Appliances selector switch the full homepage content and repair scenes; verified both categories and switching back on desktop and 375px.

- [x] Homepage re-theme to Electronics Repairs (mobile, laptop, CCTV, appliances) — content, icons, visuals only; UI/cards untouched. Verified at 1280px and 394px.
- [x] Security update: @tanstack/react-start@1.168.60, @tanstack/react-router@1.170.41, @tanstack/router-plugin@1.168.42 applied; build OK.
- [ ] Supabase: user asked to connect project "numunix company" — app is already connected to external Supabase ref azfqsiwkfyqkqdurrgjv; user must verify the ref in their Supabase dashboard; switching is only possible via Integrations settings, not chat.
- [ ] Supabase keep-alive: user still needs the cron-job.org scheduler (every 2 days) on https://numunix-flow-engine.lovable.app/api/public/keepalive?key=YOUR_KEY.
- [x] Rebranded existing interior pages to repairs; retired development-service pages redirect to the repair directory and old articles redirect to repair guides.
- [ ] From earlier: About/Pricing/Blog/Careers pages await content and user scope; Security/Privacy/Terms exist. Dedicated repair detail pages are now available.
- [x] Retired the Bangalore software-company article as part of the approved repair-only rebrand; its address redirects to the Bangalore repair-service selection guide.
- [x] Admin login no longer disabled when VITE_* vars are absent: browser client falls back to public-safe config from a server function; fixed FormData-after-await crash. Verified enabled button, real Supabase auth round-trip and error message.
- [x] "What we repair" scroller now shows each service's specific icon next to its text on both Electronics and Appliances homepages. Verified 12 icons per category.
