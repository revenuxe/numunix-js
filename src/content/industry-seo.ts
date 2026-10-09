import { industries } from "./industries";
import { industryLandingBySlug } from "./industry-landings";
import { SITE_URL, OG_IMAGE } from "./site";

// Search snippets are editorial summaries, not promises of client outcomes.
export const INDUSTRY_SEO: Record<string, { title: string; description: string }> = {
  "banking-financial-services": {
    title: "Banking & Financial Software Development | Numunix",
    description:
      "Build banking portals, lending workflows, payment operations, and reporting tools with Numunix. Connect customer journeys to your existing financial systems.",
  },
  insurance: {
    title: "Insurance Software Development | Numunix",
    description:
      "Build insurance software for policy administration, claims, broker portals, and B2B2C distribution. Plan connected customer and partner journeys with Numunix.",
  },
  "automotive-mobility": {
    title: "Automotive & Mobility Software Development | Numunix",
    description:
      "Build fleet software, dealer systems, driver apps, and EV platforms with Numunix. Connect vehicle data, assignments, maintenance, and customer journeys.",
  },
  "retail-e-commerce": {
    title: "Retail & E-commerce Software Development | Numunix",
    description:
      "Build retail storefronts, marketplaces, order management, and inventory integrations with Numunix. Connect shopping, checkout, fulfilment, and returns.",
  },
  edtech: {
    title: "EdTech Software Development | Numunix",
    description:
      "Build admissions portals, learning management systems, and skills platforms with Numunix. Connect enrolment, course delivery, assessments, and feedback.",
  },
  "saas-enterprise-tech": {
    title: "SaaS & Enterprise Software Development | Numunix",
    description:
      "Build multi-tenant SaaS and enterprise products with Numunix. Plan onboarding, workspace permissions, subscriptions, integrations, and ISV product engineering.",
  },
  "travel-hospitality": {
    title: "Travel & Hospitality Software Development | Numunix",
    description:
      "Build travel booking platforms, hospitality portals, and tourism websites with Numunix. Connect discovery, availability, supplier confirmation, and support.",
  },
  "government-psu": {
    title: "Government & PSU Software Development | Numunix",
    description:
      "Build citizen portals, departmental workflows, and tourism platforms with Numunix. Scope accessible services, legacy integrations, and administrative tools.",
  },
};

export function industrySeo(slug: string) {
  const industry = industries.find((item) => item.slug === slug);
  const page = industryLandingBySlug(slug);
  const seo = INDUSTRY_SEO[slug];
  if (!industry || !page || !seo) return undefined;
  const url = `${SITE_URL}/industries/${industry.slug}`;
  const organizationId = `${SITE_URL}/#organization`;
  const websiteId = `${SITE_URL}/#website`;
  const serviceId = `${url}#service`;
  const pageId = `${url}#webpage`;
  const breadcrumbId = `${url}#breadcrumb`;
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": organizationId,
        name: "Numunix",
        url: SITE_URL,
        logo: `${SITE_URL}/numunix-logo.webp`,
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        name: "Numunix",
        url: SITE_URL,
        publisher: { "@id": organizationId },
        inLanguage: "en",
      },
      {
        "@type": "WebPage",
        "@id": pageId,
        url,
        name: seo.title,
        description: seo.description,
        isPartOf: { "@id": websiteId },
        about: { "@id": serviceId },
        mainEntity: { "@id": serviceId },
        breadcrumb: { "@id": breadcrumbId },
        inLanguage: "en",
        primaryImageOfPage: { "@type": "ImageObject", url: OG_IMAGE },
      },
      {
        "@type": "Service",
        "@id": serviceId,
        name: `${industry.name} software development`,
        serviceType: `${industry.name} software development`,
        url,
        description: seo.description,
        provider: { "@id": organizationId },
        mainEntityOfPage: { "@id": pageId },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: `${industry.name} development capabilities`,
          itemListElement: page.capabilities.map(([name, description]) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name,
              description,
              provider: { "@id": organizationId },
            },
          })),
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": breadcrumbId,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: industry.name, item: url },
        ],
      },
    ],
  };
  return { ...seo, url, graph };
}

// Escape markup characters before embedding editorial content in an HTML script.
export const serializeIndustrySchema = (value: unknown) =>
  JSON.stringify(value).replace(/</g, "\\u003c").replace(/>/g, "\\u003e").replace(/&/g, "\\u0026");
