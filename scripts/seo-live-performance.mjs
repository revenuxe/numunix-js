import { chromium } from "@playwright/test";
import { writeFileSync } from "node:fs";

const browser = await chromium.launch({ headless: true });
const results = [];
for (const path of ["/", "/appliances", "/electronic/repairs/mobile-repair", "/appliances/repairs/washing-machine-repair/bosch"]) {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1 });
  const page = await context.newPage();
  const errors = [];
  const failed = [];
  page.on("pageerror", error => errors.push(error.message));
  page.on("requestfailed", request => failed.push({ url: request.url(), error: request.failure()?.errorText }));
  const cdp = await context.newCDPSession(page);
  await cdp.send("Network.enable");
  await cdp.send("Network.emulateNetworkConditions", { offline: false, latency: 150, downloadThroughput: 1_600_000 / 8, uploadThroughput: 750_000 / 8 });
  await cdp.send("Emulation.setCPUThrottlingRate", { rate: 4 });
  await page.addInitScript(() => {
    window.__seoMetrics = { lcp: [], shifts: [], longTasks: [] };
    new PerformanceObserver(list => { for (const item of list.getEntries()) window.__seoMetrics.lcp.push({ time: item.startTime, size: item.size, element: item.element?.tagName, text: item.element?.textContent?.slice(0, 180) }); }).observe({ type: "largest-contentful-paint", buffered: true });
    new PerformanceObserver(list => { for (const item of list.getEntries()) if (!item.hadRecentInput) window.__seoMetrics.shifts.push({ time: item.startTime, value: item.value }); }).observe({ type: "layout-shift", buffered: true });
    new PerformanceObserver(list => { for (const item of list.getEntries()) window.__seoMetrics.longTasks.push({ time: item.startTime, duration: item.duration }); }).observe({ type: "longtask", buffered: true });
  });
  try {
    const response = await page.goto("https://www.numunix.com" + path, { waitUntil: "load", timeout: 60000 });
    await page.waitForTimeout(5000);
    const metrics = await page.evaluate(() => {
      const resources = performance.getEntriesByType("resource");
      const scripts = [...document.scripts].map(script => script.src).filter(Boolean);
      return {
        observer: window.__seoMetrics,
        h1: document.querySelector("h1")?.innerText,
        h1Visibility: document.querySelector("h1") && getComputedStyle(document.querySelector("h1")).visibility,
        overflow: document.documentElement.scrollWidth > innerWidth,
        domNodes: document.getElementsByTagName("*").length,
        navigation: performance.getEntriesByType("navigation").map(n => ({ ttfbMs: n.responseStart - n.requestStart, domContentLoadedMs: n.domContentLoadedEventEnd, loadMs: n.loadEventEnd, encodedBodySize: n.encodedBodySize, decodedBodySize: n.decodedBodySize })),
        resources: resources.map(r => ({ name: r.name, type: r.initiatorType, bytes: r.transferSize, encoded: r.encodedBodySize, decoded: r.decodedBodySize, duration: r.duration })),
        scriptUrls: scripts,
        analyticsDetected: { gtag: typeof window.gtag, ga: typeof window.ga, dataLayer: Array.isArray(window.dataLayer) },
      };
    });
    results.push({ path, status: response.status(), ...metrics, errors, failed });
    console.log(JSON.stringify({ path, status: response.status(), lcp: metrics.observer.lcp.at(-1), shiftTotal: metrics.observer.shifts.reduce((sum, shift) => sum + shift.value, 0), bytes: metrics.resources.reduce((sum, item) => sum + item.bytes, 0), resourceCount: metrics.resources.length, errors, failed }));
    if (path === "/") await page.screenshot({ path: "docs/seo-audit-2026-11-05/live-home-mobile.png", fullPage: true });
  } catch (error) { results.push({ path, error: error.message, errors, failed }); console.log(JSON.stringify({ path, error: error.message })); }
  await context.close();
}
const variations = [];
for (const url of ["http://numunix.com/", "http://www.numunix.com/", "https://numunix.com/", "https://www.numunix.com/services/", "https://www.numunix.com/appliances/", "https://www.numunix.com/admin/login", "https://www.numunix.com/definitely-not-a-real-page"]) {
  try {
    const response = await fetch(url, { redirect: "manual", signal: AbortSignal.timeout(20000) });
    const html = await response.text();
    variations.push({ url, status: response.status, location: response.headers.get("location"), headers: { cacheControl: response.headers.get("cache-control"), contentEncoding: response.headers.get("content-encoding"), xRobotsTag: response.headers.get("x-robots-tag") }, noindex: /name="robots"[^>]*content="[^"]*noindex/.test(html) });
  } catch (error) { variations.push({ url, error: error.message }); }
}
writeFileSync("docs/seo-audit-2026-11-05/live-performance.json", JSON.stringify({ method: "Single cold-cache Chromium runs; 390x844 viewport, 4x CPU slowdown, 150ms network latency, 1.6Mbps download. Lab diagnostics, not field Core Web Vitals or a Lighthouse score. CLS reported here is raw non-input shift sum, not the session-window CLS calculation. No INP claim.", results, variations }, null, 2));
console.log(JSON.stringify({ variations }, null, 2));
await browser.close();
