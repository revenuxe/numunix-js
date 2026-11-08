import { chromium } from "@playwright/test";
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const origin = process.argv[2] || "http://127.0.0.1:4175";
const output = process.argv[3] || "docs/seo-next-enhancements/performance.json";
const browser = await chromium.launch({ headless: true });
const results = [];
try {
  for (const path of ["/", "/appliances/repairs/washing-machine-repair/bosch"]) {
    const context = await browser.newContext({
      viewport: { width: 390, height: 844 },
      deviceScaleFactor: 1,
    });
    try {
      const page = await context.newPage();
      const errors = [];
      page.on("pageerror", (error) => errors.push(error.message));
      const cdp = await context.newCDPSession(page);
      await cdp.send("Network.enable");
      await cdp.send("Network.emulateNetworkConditions", {
        offline: false,
        latency: 150,
        downloadThroughput: 200000,
        uploadThroughput: 93750,
      });
      await cdp.send("Emulation.setCPUThrottlingRate", { rate: 4 });
      await page.addInitScript(() => {
        window.__lab = { lcp: 0, shifts: [], longTaskExcessMs: 0 };
        new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) window.__lab.lcp = entry.startTime;
        }).observe({ type: "largest-contentful-paint", buffered: true });
        new PerformanceObserver((list) => {
          for (const entry of list.getEntries())
            if (!entry.hadRecentInput)
              window.__lab.shifts.push({ time: entry.startTime, value: entry.value });
        }).observe({ type: "layout-shift", buffered: true });
        new PerformanceObserver((list) => {
          for (const entry of list.getEntries())
            window.__lab.longTaskExcessMs += Math.max(0, entry.duration - 50);
        }).observe({ type: "longtask", buffered: true });
      });
      const response = await page.goto(new URL(path, origin).href, {
        waitUntil: "domcontentloaded",
        timeout: 60000,
      });
      await page.waitForTimeout(6000);
      const metrics = await page.evaluate(() => {
        const resources = performance.getEntriesByType("resource");
        let maxCls = 0,
          windowValue = 0,
          windowStart = 0,
          previous = 0;
        for (const shift of window.__lab.shifts) {
          if (shift.time - previous > 1000 || shift.time - windowStart > 5000) {
            windowValue = 0;
            windowStart = shift.time;
          }
          windowValue += shift.value;
          maxCls = Math.max(maxCls, windowValue);
          previous = shift.time;
        }
        const nav = performance.getEntriesByType("navigation")[0];
        return {
          lcpMs: Math.round(window.__lab.lcp),
          cls: maxCls,
          longTaskExcessMs: Math.round(window.__lab.longTaskExcessMs),
          ttfbMs: Math.round(nav.responseStart - nav.requestStart),
          resourceTransferBytes: resources.reduce((sum, r) => sum + r.transferSize, 0),
          javascriptDecodedBytes: resources
            .filter(
              (r) =>
                r.initiatorType === "script" ||
                (r.name.includes("/_next/static/") && r.name.endsWith(".js")),
            )
            .reduce((sum, r) => sum + r.decodedBodySize, 0),
          thirdPartyRequests: resources
            .filter((r) => new URL(r.name).origin !== location.origin)
            .map((r) => r.name),
          headingVisible: getComputedStyle(document.querySelector("h1")).visibility === "visible",
          overflow: document.documentElement.scrollWidth > innerWidth,
        };
      });
      results.push({ path, status: response.status(), ...metrics, errors });
      console.log(JSON.stringify(results.at(-1)));
    } finally {
      await context.close();
    }
  }
} finally {
  await browser.close();
}
mkdirSync(dirname(output), { recursive: true });
writeFileSync(
  output,
  JSON.stringify(
    {
      method:
        "Single cold-cache local production runs: mobile 390x844, 4x CPU, 150ms latency, 1.6Mbps download, six-second observation. Lab diagnostics, not field Core Web Vitals or Lighthouse scores. Long-task excess is not Lighthouse TBT. No INP claim.",
      results,
    },
    null,
    2,
  ) + "\n",
);
