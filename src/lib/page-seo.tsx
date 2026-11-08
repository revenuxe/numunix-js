import type { Metadata } from "next";
type Head = {
  meta?: Array<{ title?: string; name?: string; property?: string; content?: string }>;
  links?: Array<{ rel: string; href: string }>;
  scripts?: Array<{ type: string; children: string }>;
};
export function toMetadata(head: Head): Metadata {
  const value = (key: string) =>
    head.meta?.find((m) => m.name === key || m.property === key)?.content;
  const title = head.meta?.find((m) => m.title)?.title;
  const canonical = head.links?.find((l) => l.rel === "canonical")?.href;
  const robots = value("robots");
  return {
    ...(title ? { title } : {}),
    ...(value("description") ? { description: value("description")! } : {}),
    ...(canonical ? { alternates: { canonical } } : {}),
    ...(robots ? { robots } : {}),
    openGraph: {
      title: value("og:title") ?? title ?? "Numunix",
      description: value("og:description") ?? value("description") ?? "",
      ...(value("og:url") ? { url: value("og:url")! } : {}),
      type: value("og:type") === "article" ? "article" : "website",
      locale: "en_IN",
      siteName: "Numunix",
      images: [
        {
          url: "/social-preview.png",
          width: 1200,
          height: 630,
          alt: "Numunix electronics and appliance repair in Bangalore",
        },
      ],
      ...(value("article:published_time")
        ? { publishedTime: value("article:published_time")! }
        : {}),
      ...(value("article:modified_time") ? { modifiedTime: value("article:modified_time")! } : {}),
      ...(value("article:author") ? { authors: [value("article:author")!] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: value("twitter:title") ?? title ?? "Numunix",
      description: value("twitter:description") ?? value("description") ?? "",
      images: ["/social-preview.png"],
    },
  };
}
export function StructuredData({ head }: { head: Head }) {
  return (
    <>
      {head.scripts
        ?.filter((s) => s.type === "application/ld+json")
        .map((s, i) => (
          <script
            key={i}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: s.children.replace(/</g, "\\u003c") }}
          />
        ))}
    </>
  );
}
