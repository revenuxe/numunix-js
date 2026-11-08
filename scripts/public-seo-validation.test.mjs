import { test } from "node:test";
import assert from "node:assert/strict";
import { inspectPublicHtml } from "./public-seo-validation.mjs";
const url = "https://www.numunix.com/services";
const fixture = `<html><head><title>Phones &amp; appliances</title>
<link href='${url}' rel='canonical'>
<meta content='Repair advice.' name='description'>
<meta property='og:title' content='Phones &amp; appliances'>
<meta name='twitter:title' content='Phones &amp; appliances'>
<meta property='og:description' content='Repair advice.'>
<meta name='twitter:description' content='Repair advice.'>
<meta property='og:url' content='${url}'>
<meta property='og:image' content='https://www.numunix.com/social-preview.png'>
<meta name='twitter:image' content='https://www.numunix.com/social-preview.png'>
<script type='application/ld+json'>${JSON.stringify({ "@context": "https://schema.org", "@graph": [{ "@type": ["Organization", "LocalBusiness"] }, { "@type": "WebSite" }, { "@type": "BreadcrumbList" }] })}</script>
</head><body><h1>Repair services</h1><img src='/logo.webp' alt='Numunix'><a href='/contact#enquiry'>Contact</a><a href='mailto:test@example.com'>Email</a></body></html>`;
test("valid SSR metadata supports escaped text, reordered attributes and internal anchor links", () => {
  const result = inspectPublicHtml(fixture, url);
  assert.deepEqual(result.failures, []);
  assert.equal(result.title, "Phones & appliances");
  assert.deepEqual(result.internalLinks, ["/contact"]);
});
test("rejects malformed canonical URLs without crashing and missing visible headings", () => {
  const result = inspectPublicHtml(
    fixture.replace(`href='${url}'`, "href='https://['").replace("<h1>Repair services</h1>", ""),
    url,
  );
  assert.ok(result.failures.some((value) => value.includes("Canonical")));
  assert.ok(result.failures.some((value) => value.includes("H1")));
});
test("rejects corrupt JSON-LD and requires service schema on repair pages", () => {
  const result = inspectPublicHtml(
    fixture.replace(
      "<script type='application/ld+json'>",
      "<script type='application/ld+json'>{broken",
    ),
    "https://www.numunix.com/electronic/repairs/mobile-repair",
  );
  assert.ok(result.failures.includes("Invalid JSON-LD JSON"));
  assert.ok(result.failures.includes("Missing service schema"));
});
test("detects public noindex, duplicate titles and inaccessible images", () => {
  const result = inspectPublicHtml(
    fixture
      .replace("</head>", "<title>Duplicate</title><meta name='robots' content='noindex'></head>")
      .replace(" alt='Numunix'", ""),
    url,
  );
  assert.ok(result.failures.includes("Public page has noindex"));
  assert.ok(result.failures.includes("Expected one nonempty title"));
  assert.ok(result.failures.includes("Image lacks an alt attribute"));
});
