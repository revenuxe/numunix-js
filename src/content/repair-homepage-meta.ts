import { REPAIR_SERVICES, type RepairCategory } from "./homepage-repairs";

export const REPAIR_SITE_URL = "https://numunix-flow-engine.lovable.app";
export const REPAIR_HOME_PATHS = { electronics: "/", appliances: "/appliances" } as const;

const PAGE_META = {
  electronics: {
    title: "Electronics Repair in Bangalore | Mobile, Laptop & CCTV, Numunix",
    description: "Mobile, laptop, tablet, TV and CCTV repair in Bangalore. Explore fault diagnosis, data recovery, repair estimates and device testing with Numunix.",
  },
  appliances: {
    title: "Home Appliance Repair in Bangalore | AC, Washing Machine & Fridge, Numunix",
    description: "Washing machine, AC, refrigerator, microwave and water purifier repair in Bangalore. Request a doorstep assessment and review repair options with Numunix.",
  },
};

export function repairHomepageHead(category: RepairCategory) {
  const { title, description } = PAGE_META[category];
  const url = `${REPAIR_SITE_URL}${REPAIR_HOME_PATHS[category]}`;
  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: url },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: url }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: title,
        description,
        url,
        about: REPAIR_SERVICES[category].map(service => ({ "@type": "Service", name: service.nav, serviceType: service.nav })),
      }),
    }],
  };
}