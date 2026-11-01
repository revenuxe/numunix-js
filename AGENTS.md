<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Website content and navigation
- Scope the private dashboard theme to admin-workspace and explicitly choose button variants, keeping public styles and lead permissions unchanged.
- Render the supplied WhatsApp symbol as an inline SVG with semantic foreground color, so booking actions do not depend on a separate image request.
- Public content is repair-specific; shared repair catalogues drive service and audience views, with the saved category selecting repair options while detail pages retain their own subjects.
- Electronics at / and Appliances at /appliances share the homepage layout but derive category context and leaf metadata from their route; use a non-modal navigation dropdown to avoid scroll-lock header shifts.
- Individual repair pages use /$category/repairs/$slug with category-aware catalogue helpers and redirect-only legacy /repairs/$slug paths and a shared repair catalogue for destinations, diagnostics, preparation and enquiry defaults; public content-page heroes use the shared homepage Hero to keep their ribbon design consistent.
- Homepage device illustrations use a shared browser-safe SVG repair visual with global semantic tokens and reduced-motion support, so service and audience panels stay consistent without changing their layout.
- Who We Serve illustrations place shared device drawings within audience-specific room scenes, keeping audience imagery distinct from diagnostic-bench service panels.
- Do not add phone-number or click-to-call buttons to heroes or CTA sections, including future pages. Use project, service, or email actions instead.
- Product and service cards must link to their relevant detail page, not the generic services directory. Preserve the existing visual design.
- Keep illustrative service scenarios and scoping guidance in a shared content module, separate from delivery claims; this lets detail pages be specific without implying real client results.
- Keep long researched article entries in dedicated content modules consumed by the shared article catalogue, so editorial updates retain existing article URLs and navigation.
- Shared Hero headings use two explicit no-wrap lines and pre-paint measured container fitting; reveal only the fitted heading after fonts settle to prevent initial overflow without changing article titles.
- A root category-selection context persists explicit selections in browser storage; homepage routes retain their own content and metadata, while interior shared navigation and repair options follow the saved selection without rewriting detail-page subjects.
- Legacy development service and article URLs permanently redirect to the repair directory or related repair guides; audience pages use a shared repair-specific template instead of the retired software industry template.
- Public navigation uses repair-specific canonical paths (/services, /repair-assessment, /repair-process, /repair-diagnostics, /repair-aftercare, /repair-safety, /repair-guides and /who-we-serve); old paths and development-era stage slugs remain redirect-only to preserve bookmarks and search links.
- Repair lead presentation reuses existing enquiry fields and stored status identifiers; classify service/category through the repair catalogue, retain legacy email data, and store the originating page path without changing database permissions.
- Public repair metadata uses the shared repair SEO helper and stable Organization/WebSite identifiers; page graphs describe visible services, collections and breadcrumbs without inventing prices, ratings, certifications or business details.
- Repair forms submit through a validated public write-only server function; the database derives a unique service-prefixed reference from the stored row ID, and the receipt returns no customer personal data or public enquiry lookup.
