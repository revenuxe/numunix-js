"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";
import { usePathname } from "next/navigation";
import { GA_MEASUREMENT_ID, pageview } from "@/lib/gtag";

// Mounted once in the root layout, so it loads on every route. The gtag.js
// script + inline bootstrap run with strategy="afterInteractive" (after the
// page is interactive, before it's fully idle) per Next.js's recommendation
// for third-party analytics. A pathname-change effect sends page_view events
// for client-side App Router navigations, which gtag's own script can't see
// since it only fires once on the initial full page load.
export function GoogleAnalytics() {
  const pathname = usePathname();
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    pageview(pathname);
  }, [pathname]);

  if (!GA_MEASUREMENT_ID) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}');
        `}
      </Script>
    </>
  );
}
