export function attributes(tag) {
  return Object.fromEntries(
    [...tag.matchAll(/([\w:-]+)\s*=\s*(?:"([^"]*)"|'([^']*)')/g)].map(([, key, double, single]) => [
      key.toLowerCase(),
      decodeHtml(double ?? single),
    ]),
  );
}
export function decodeHtml(value) {
  return value.replace(/&(?:amp|lt|gt|quot|apos|#39|#\d+|#x[0-9a-f]+);/gi, (entity) => {
    const named = {
      "&amp;": "&",
      "&lt;": "<",
      "&gt;": ">",
      "&quot;": '"',
      "&apos;": "'",
      "&#39;": "'",
    };
    return (
      named[entity.toLowerCase()] ??
      String.fromCodePoint(
        entity.toLowerCase().startsWith("&#x")
          ? parseInt(entity.slice(3, -1), 16)
          : parseInt(entity.slice(2, -1), 10),
      )
    );
  });
}
const plainText = (value) =>
  decodeHtml(value.replace(/<[^>]*>/g, ""))
    .replace(/\s+/g, " ")
    .trim();
const sameUrl = (left, right) => {
  try {
    return new URL(left).href === new URL(right).href;
  } catch {
    return false;
  }
};
const httpsImage = (value, base) => {
  try {
    return Boolean(value) && new URL(value, base).protocol === "https:";
  } catch {
    return false;
  }
};
export function inspectPublicHtml(html, url) {
  const failures = [];
  const titles = [...html.matchAll(/<title\b[^>]*>([\s\S]*?)<\/title>/gi)].map((match) =>
    plainText(match[1]),
  );
  const metas = [...html.matchAll(/<meta\b[^>]*>/gi)].map((match) => attributes(match[0]));
  const links = [...html.matchAll(/<link\b[^>]*>/gi)].map((match) => attributes(match[0]));
  const named = (name) =>
    metas
      .filter((meta) => meta.name === name || meta.property === name)
      .map((meta) => meta.content);
  const descriptions = named("description");
  const canonicals = links.filter((link) => link.rel === "canonical").map((link) => link.href);
  if (titles.length !== 1 || !titles[0]) failures.push("Expected one nonempty title");
  if (descriptions.length !== 1 || !descriptions[0]?.trim())
    failures.push("Expected one nonempty meta description");
  if (canonicals.length !== 1 || !canonicals[0] || !sameUrl(canonicals[0], url))
    failures.push("Canonical does not match the public URL");
  const headings = [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)];
  if (headings.length !== 1 || !plainText(headings[0]?.[1] ?? ""))
    failures.push("Expected one nonempty server-rendered H1");
  if (named("robots").some((value) => /noindex|\bnone\b/i.test(value ?? "")))
    failures.push("Public page has noindex");
  for (const key of ["og:title", "twitter:title"])
    if (named(key).length !== 1 || named(key)[0] !== titles[0])
      failures.push(`${key} must match the page title`);
  for (const key of ["og:description", "twitter:description"])
    if (named(key).length !== 1 || named(key)[0] !== descriptions[0])
      failures.push(`${key} must match the description`);
  for (const key of ["og:image", "twitter:image"])
    if (!httpsImage(named(key)[0], url)) failures.push(`${key} must identify an HTTPS image`);
  if (!named("og:url")[0] || !sameUrl(named("og:url")[0], url))
    failures.push("Open Graph URL does not match the canonical");
  if (/fonts\.(googleapis|gstatic)\.com/.test(html))
    failures.push("External Google font request remains");
  if (html.includes("https://numunix-flow-engine.lovable.app"))
    failures.push("Retired Lovable origin in HTML");
  if (
    [...html.matchAll(/<img\b[^>]*>/gi)].some(
      (match) => !Object.hasOwn(attributes(match[0]), "alt"),
    )
  )
    failures.push("Image lacks an alt attribute");
  const nodes = [];
  const visit = (value) => {
    if (Array.isArray(value)) value.forEach(visit);
    else if (value && typeof value === "object") {
      nodes.push(value);
      Object.values(value).forEach(visit);
    }
  };
  let scriptCount = 0;
  for (const match of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)) {
    if (attributes(match[1]).type !== "application/ld+json") continue;
    scriptCount++;
    try {
      const schema = JSON.parse(match[2]);
      if (!/https?:\/\/schema.org\/?$/.test(schema["@context"]))
        failures.push("JSON-LD lacks the schema.org context");
      visit(schema);
    } catch {
      failures.push("Invalid JSON-LD JSON");
    }
  }
  if (!scriptCount) failures.push("Missing server-rendered JSON-LD");
  const types = new Set(nodes.flatMap((node) => [].concat(node["@type"] ?? [])));
  const path = new URL(url).pathname;
  for (const type of ["Organization", "LocalBusiness", "WebSite"])
    if (!types.has(type)) failures.push(`Missing ${type} schema`);
  if (path !== "/" && path !== "/appliances" && !types.has("BreadcrumbList"))
    failures.push("Missing breadcrumb schema");
  if (/^\/(electronic|appliances)\/repairs\//.test(path) && !types.has("Service"))
    failures.push("Missing service schema");
  if (/^\/repair-guides\/[^/]+$/.test(path) && !types.has("Article"))
    failures.push("Missing article schema");
  const internalLinks = [...html.matchAll(/<a\b[^>]*>/gi)]
    .map((match) => attributes(match[0]).href)
    .filter(Boolean)
    .flatMap((href) => {
      try {
        const dest = new URL(href, url);
        return dest.origin === new URL(url).origin &&
          !/^\/(admin|api|thank-you)(\/|$)/.test(dest.pathname) &&
          !dest.search &&
          !/\.[a-z0-9]+$/i.test(dest.pathname)
          ? [dest.pathname]
          : [];
      } catch {
        return [];
      }
    });
  return {
    title: titles[0],
    description: descriptions[0],
    schemaTypes: [...types],
    internalLinks: [...new Set(internalLinks)],
    failures,
  };
}
