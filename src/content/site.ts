import { REPAIR_PAGES } from "./repair-services";

/** Canonical base URL — no trailing slash */
export const SITE_URL = "https://numunix-flow-engine.lovable.app";

/** Default OG image used for social sharing when a page has no custom image */
export const OG_IMAGE = `${SITE_URL}/og-default.jpg`;

export const CONTACT = {
  phone: "+91 98865 79923",
  phoneHref: "tel:+919886579923",
  email: "hello@numunix.com",
  emailHref: "mailto:hello@numunix.com",
  whatsappHref: "https://wa.me/919886579923?text=Hi%20Numunix%2C%20I%27d%20like%20to%20request%20a%20repair.",
  hours: "Mon – Sat · 9:00 AM – 8:00 PM IST",
  address: "Shop No 1, 1st Floor, 10/1, 10th Cross, LR Bande C L Ramaiah Layout, RT Nagar Post, Bengaluru, Karnataka 560032",
  addressLocality: "Bengaluru",
  addressRegion: "Karnataka",
  postalCode: "560032",
  addressCountry: "IN",
};

type Extra = {
  pains: string[];
  gains: string[];
  included: string[];
  useCases: { industry: string; body: string }[];
};

export const DEFAULT_EXTRA: Extra = {pains:["A device or appliance is not working","The cause needs assessment","The repair scope is unclear"],gains:["Model-specific checks","A reviewed estimate","Informed repair choices"],included:["Assessment scope","Parts and labour review","Function checks"],useCases:[]};
export const FEATURE_EXTRAS: Record<string,Extra> = Object.fromEntries(REPAIR_PAGES.map(service=>[service.slug,{pains:service.faults,gains:service.checks,included:service.preparation,useCases:[]} ]));
