import { SITE_URL, CONTACT } from "./site";

type SchemaNode = Record<string, unknown>;
type Breadcrumb = { name: string; path: string };

export const REPAIR_ORGANIZATION_ID = `${SITE_URL}/#organization`;
export const REPAIR_WEBSITE_ID = `${SITE_URL}/#website`;

export function repairSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": REPAIR_ORGANIZATION_ID,
        name: "Numunix",
        url: SITE_URL,
        description:
          "Numunix provides service management software for service businesses and field teams.",
        email: CONTACT.email,
        logo: {
          "@type": "ImageObject",
          url: `${SITE_URL}/numunix-logo.webp`,
          width: 1728,
          height: 345,
        },
      },
      {
        "@type": "WebSite",
        "@id": REPAIR_WEBSITE_ID,
        name: "Numunix Service Management",
        url: SITE_URL,
        inLanguage: "en-IN",
        publisher: { "@id": REPAIR_ORGANIZATION_ID },
      },
      {
        "@type": "SoftwareApplication",
        "@id": `${SITE_URL}/#service-management-software`,
        name: "Numunix Service Management",
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        url: SITE_URL,
        description:
          "A shared workspace for managing service enquiries, bookings, customers, technician assignments, jobs and invoices.",
        featureList: [
          "Lead and enquiry management",
          "Service booking management",
          "Customer records",
          "Technician assignments",
          "Service job tracking",
          "Service invoicing",
        ],
        publisher: { "@id": REPAIR_ORGANIZATION_ID },
      },
    ],
  };
}

export function repairServiceSchema(
  service: { name: string; intro: string },
  path: string,
): SchemaNode {
  return {
    "@type": "Service",
    "@id": `${SITE_URL}${path}#service`,
    name: service.name,
    description: service.intro,
    url: `${SITE_URL}${path}`,
    serviceType: service.name,
    areaServed: { "@type": "City", name: "Bangalore" },
    provider: { "@id": REPAIR_ORGANIZATION_ID },
  };
}

export function repairItemList(items: { name: string; path: string }[]): SchemaNode {
  return {
    "@type": "ItemList",
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      url: `${SITE_URL}${item.path}`,
    })),
  };
}

export function repairPageHead({
  title,
  description,
  path,
  type = "WebPage",
  breadcrumbs = [],
  entities = [],
  about = [],
}: {
  title: string;
  description: string;
  path: string;
  type?: "WebPage" | "CollectionPage" | "ContactPage";
  breadcrumbs?: Breadcrumb[];
  entities?: SchemaNode[];
  about?: SchemaNode[];
}) {
  const url = `${SITE_URL}${path}`;
  const trail = [{ name: "Numunix Service Management", path: "/" }, ...breadcrumbs];
  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: url },
      { property: "og:locale", content: "en_IN" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: url }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": type,
              "@id": `${url}#webpage`,
              name: title,
              description,
              url,
              inLanguage: "en-IN",
              isPartOf: { "@id": REPAIR_WEBSITE_ID },
              publisher: { "@id": REPAIR_ORGANIZATION_ID },
              ...(entities.length ? { mainEntity: entities } : {}),
              ...(about.length ? { about } : {}),
              ...(breadcrumbs.length ? { breadcrumb: { "@id": `${url}#breadcrumbs` } } : {}),
            },
            ...(breadcrumbs.length
              ? [
                  {
                    "@type": "BreadcrumbList",
                    "@id": `${url}#breadcrumbs`,
                    itemListElement: trail.map((item, index) => ({
                      "@type": "ListItem",
                      position: index + 1,
                      name: item.name,
                      item: `${SITE_URL}${item.path}`,
                    })),
                  },
                ]
              : []),
          ],
        }),
      },
    ],
  };
}
