// Google Analytics 4 (gtag.js) config. Hardcoded so analytics works on every
// deploy without relying on an environment variable being set in the hosting
// dashboard — NEXT_PUBLIC_GA_MEASUREMENT_ID can still override it (e.g. to
// point a preview/staging deploy at a different GA property) via .env.example.
const DEFAULT_GA_MEASUREMENT_ID = "G-LF768EGWC7";
export const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || DEFAULT_GA_MEASUREMENT_ID;

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

// Records a page view for a client-side (App Router) navigation. The initial
// load's page_view is already sent by the gtag('js'/'config', ...) bootstrap
// in GoogleAnalytics, so this only needs to fire on subsequent route changes.
// Sent as an explicit page_view event rather than re-calling 'config': GA4's
// gtag.js does not reliably re-emit a hit for a second 'config' call with the
// same measurement ID within the same session.
export function pageview(path: string) {
  if (!GA_MEASUREMENT_ID || typeof window === "undefined" || typeof window.gtag !== "function") {
    return;
  }
  window.gtag("event", "page_view", {
    page_location: window.location.href,
    page_path: path,
    page_title: document.title,
    send_to: GA_MEASUREMENT_ID,
  });
}
