# Next.js application

The site now runs on Next.js App Router with React 19 and Tailwind CSS 4. It no longer needs TanStack, Vite, Nitro, or Lovable runtime/build integrations.

## Run and deploy

Use Node.js 22 or newer. Run `npm ci`, `npm run dev`, `npm run typecheck`, and `npm run build`. Start the production server with `npm start`. For a different port, use `npm start -- --port 4173`.

Deploy as a Next.js application on Vercel or another Node.js host using `npm run build` and `npm start`. This is a server application: do not deploy it as a static-only export, because booking actions, configuration resolution, and private integration endpoints require a server. No deployment or database migration is performed by this code migration.

## Page structure and SEO

`src/app/layout.tsx` owns the document, shared styles, category context and organization/site structured data. Each route has a server `page.tsx`, server-only `data.ts` for validation and SEO, and a `view.tsx` for its presentation. Interactive views and components declare `use client`; their initial content is still rendered on the server.

`src/content/public-catalogue.ts` derives public paths from the repair, brand, article, workflow and audience catalogues. It validates curated brand coverage during the build. Dynamic public routes use this list with `generateStaticParams`. The same list generates `/sitemap.xml`; recorded article dates supply accurate `lastmod` values. Private and transactional HTML stays crawlable so robots can discover its HTML and HTTP `noindex`; API routes remain disallowed. Unsupported category/service/brand combinations return 404. Legacy addresses use permanent Next.js redirects. Next.js uses HTTP 308 for permanent redirects.

The apex `numunix.com` host redirects permanently to `https://www.numunix.com`, retaining paths and queries. Configure HTTPS enforcement and DNS/domain ownership in the deployment host as well. Local development hosts are unaffected.

Inter and JetBrains Mono use package-managed WOFF2 files through `next/font/local`; no Google font request is required at build or visit time. The packages include their SIL Open Font License notices. Branding images use `next/image` responsive delivery. The decorative ribbon waits for the fitted heading, caps drawing at 30fps, pauses offscreen or in hidden tabs, reuses geometry buffers, and responds to live reduced-motion changes.

Existing canonical production URLs, metadata, visible content and JSON-LD are preserved. Metadata is emitted before page content for all user agents. Pages that need query values, such as `/thank-you`, render on request; stable public pages are prerendered at build time. Rebuild after editorial content changes.

## Supabase and email

Copy `.env.example` to `.env.local` and configure `SUPABASE_URL` and `SUPABASE_PUBLISHABLE_KEY`. Optional `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` allow build-time browser configuration. Otherwise the admin client obtains only public-safe configuration through a server action. Never use a service-role key as a public key.

The booking server action validates enquiries and calls the existing write-only `submit_repair_booking` RPC with the publishable key. It returns only the new receipt and service, preserves the source path and sends optional Resend notification through `RESEND_API_KEY`. Database policies and status permissions are unchanged. The authenticated admin browser client continues to rely on Supabase authentication, role checks and row-level security.

`/api/public/keepalive` requires `KEEPALIVE_KEY` as a Bearer token. Its optional server-side database check also requires `SUPABASE_SERVICE_ROLE_KEY`. Configure scheduling in your chosen host; no vendor-specific cron secret is required.

Existing local `.env` Supabase values were copied to their new server names without printing credentials. Configure the new names independently in production; ignored environment files do not deploy through Git.

## Verification

- `npm run typecheck`
- `npm run build`
- `npm run test:enquiries`
- `npm run test:seo`
- `node --experimental-strip-types --test scripts/booking-notification.test.mjs scripts/repair-brands.test.mjs`
- `npm run seo:check -- http://127.0.0.1:4173` against a running production server
- `npm run test:admin` for browser integration checks
- `npm run test:rendering` for no-JavaScript and stalled-observer content checks
- `npm run test:routes -- http://127.0.0.1:4173` for redirects, invalid combinations and private-page indexing

The migration also updates Zod and overrides vulnerable transitive `source-map-js` and lint-tooling `minimatch` versions. Recheck these overrides when upgrading the upstream tooling.

Browser tests use mocked Supabase responses; live booking/email delivery needs a configured test project and inbox. Do not use production enquiries as test fixtures.

## Migration verification results

- Production build and TypeScript route generation/checks passed.
- 20 browser checks passed against a production server, covering admin permissions and lead changes, booking success/failure, mobile layout, no-JavaScript content, stalled observers, service/audience SEO, brand defaults, guide links, analytics privacy and WhatsApp formatting.
- 11 enquiry, notification and brand-validation unit tests passed with Zod 4.
- Production HTTP crawl checked all 133 sitemap pages with no canonical, indexing or server-rendered heading failures.
- 10 redirect checks, 6 unsupported-route checks and 3 private/transactional indexing checks passed.
- Dependency installation audit reported zero vulnerabilities.

No live deployment, production enquiry, email delivery, database migration or Git push was performed.

The later pre-push enhancements and their verification are recorded in [the SEO enhancement report](seo-next-enhancements/README.md).
