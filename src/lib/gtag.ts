// Google Analytics 4 (gtag.js) config. Reads the measurement ID from the
// environment so analytics can be disabled (e.g. in local dev) by leaving
// NEXT_PUBLIC_GA_MEASUREMENT_ID unset — see .env.example.
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

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
