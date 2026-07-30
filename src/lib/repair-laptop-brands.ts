import type { StaticImageData } from "next/image";

import logoApple from "@/assets/brand-logos/apple.webp";
import logoDell from "@/assets/brand-logos/dell.webp";
import logoHp from "@/assets/brand-logos/hp.webp";
import logoLenovo from "@/assets/brand-logos/lenovo.webp";
import logoAcer from "@/assets/brand-logos/acer.webp";
import logoAsus from "@/assets/brand-logos/asus.webp";
import logoMsi from "@/assets/brand-logos/msi.webp";
import logoAvita from "@/assets/brand-logos/avita.webp";
import logoLg from "@/assets/brand-logos/lg.webp";
import logoMicrosoft from "@/assets/brand-logos/microsoft.webp";
import logoSamsung from "@/assets/brand-logos/samsung.webp";
import logoXiaomi from "@/assets/brand-logos/xiaomi.webp";
import logoNokia from "@/assets/brand-logos/nokia.webp";
import logoRealme from "@/assets/brand-logos/realme.webp";
import logoRazer from "@/assets/brand-logos/razer.webp";
import logoNotListed from "@/assets/brand-logos/not-listed.webp";

export type RepairLaptopBrand = {
  name: string;
  slug: string;
  product: string;
  footerLabel: string;
  // The brand/product-facing name used for the "Service Center" style H1 and
  // page title on that brand's landing page, e.g. "Lenovo Service Center" or
  // "MacBook Service Center" (Apple laptops are searched as "MacBook", not "Apple").
  serviceCenterName: string;
  // A short, brand-specific line about that brand's laptop line-up, used to
  // open its intro paragraph. Written per brand (not a single shared
  // template) so the 14 non-Apple brand pages — repeated again for their
  // /repair-laptop/service-center/[brand] counterparts — don't read as one
  // template with the brand name swapped in, which search engines were
  // treating as near-duplicate content and leaving mostly uncrawled.
  blurb: string;
  logo?: StaticImageData;
};

// Marketing/SEO landing pages for brand searches (e.g. "Dell laptop repair
// Bangalore"). These are informational pages for the repair service — separate
// from the real Supabase-backed device_brands catalog used by the buyback
// quote funnel at /sell/laptops.
export const REPAIR_LAPTOP_BRANDS: RepairLaptopBrand[] = [
  {
    name: "Apple",
    slug: "apple",
    product: "MacBook",
    footerLabel: "Repair Apple MacBook",
    serviceCenterName: "MacBook Service Center",
    blurb:
      "MacBook Air and MacBook Pro models, from older Intel-based units to recent Apple Silicon",
    logo: logoApple,
  },
  {
    name: "Dell",
    slug: "dell",
    product: "Laptop",
    footerLabel: "Repair Dell laptop",
    serviceCenterName: "Dell Service Center",
    blurb:
      "Dell laptops, from everyday Inspiron models to premium XPS ultrabooks and business Latitude machines",
    logo: logoDell,
  },
  {
    name: "HP",
    slug: "hp",
    product: "Laptop",
    footerLabel: "Repair HP laptop",
    serviceCenterName: "HP Service Center",
    blurb:
      "HP laptops, from Pavilion and Envy home and creative models to EliteBook and ProBook business machines",
    logo: logoHp,
  },
  {
    name: "Lenovo",
    slug: "lenovo",
    product: "Laptop",
    footerLabel: "Repair Lenovo laptop",
    serviceCenterName: "Lenovo Service Center",
    blurb:
      "Lenovo laptops, from ThinkPad business machines built around durability and keyboard feel to IdeaPad everyday laptops and Legion gaming rigs",
    logo: logoLenovo,
  },
  {
    name: "Asus",
    slug: "asus",
    product: "Laptop",
    footerLabel: "Repair Asus laptop",
    serviceCenterName: "Asus Service Center",
    blurb:
      "Asus laptops, from slim ZenBook and everyday VivoBook models to high-performance ROG gaming laptops",
    logo: logoAsus,
  },
  {
    name: "Acer",
    slug: "acer",
    product: "Laptop",
    footerLabel: "Repair Acer laptop",
    serviceCenterName: "Acer Service Center",
    blurb:
      "Acer laptops, from budget-friendly Aspire models and slim Swift ultrabooks to Predator and Nitro gaming laptops",
    logo: logoAcer,
  },
  {
    name: "MSI",
    slug: "msi",
    product: "Laptop",
    footerLabel: "Repair MSI laptop",
    serviceCenterName: "MSI Service Center",
    blurb:
      "MSI laptops, mostly high-performance gaming and creator models built around discrete graphics and heavier cooling",
    logo: logoMsi,
  },
  {
    name: "Avita",
    slug: "avita",
    product: "Laptop",
    footerLabel: "Repair Avita laptop",
    serviceCenterName: "Avita Service Center",
    blurb:
      "Avita laptops, popular budget-friendly models like the Cosmos, Liber and Pura ranges favoured by students and first-time buyers",
    logo: logoAvita,
  },
  {
    name: "LG",
    slug: "lg",
    product: "Gram",
    footerLabel: "Repair LG Gram laptop",
    serviceCenterName: "LG Gram Service Center",
    blurb:
      "LG Gram laptops, known for their unusually light magnesium-alloy build and long battery life",
    logo: logoLg,
  },
  {
    name: "Microsoft",
    slug: "microsoft",
    product: "Surface",
    footerLabel: "Repair Microsoft Surface laptop",
    serviceCenterName: "Microsoft Surface Service Center",
    blurb:
      "Microsoft Surface laptops and 2-in-1 devices, including detachable and convertible touchscreen models",
    logo: logoMicrosoft,
  },
  {
    name: "Samsung",
    slug: "samsung",
    product: "Galaxy Book",
    footerLabel: "Repair Samsung Galaxy Book laptop",
    serviceCenterName: "Samsung Galaxy Book Service Center",
    blurb:
      "Samsung Galaxy Book laptops, slim ultrabooks known for their AMOLED displays and tight integration with Samsung's phone and tablet ecosystem",
    logo: logoSamsung,
  },
  {
    name: "Xiaomi",
    slug: "xiaomi",
    product: "Notebook",
    footerLabel: "Repair Xiaomi Notebook laptop",
    serviceCenterName: "Xiaomi Notebook Service Center",
    blurb:
      "Xiaomi Notebook and RedmiBook laptops, popular value-for-money models aimed at everyday and student use",
    logo: logoXiaomi,
  },
  {
    name: "Nokia",
    slug: "nokia",
    product: "Laptop",
    footerLabel: "Repair Nokia laptop",
    serviceCenterName: "Nokia Service Center",
    blurb:
      "Nokia-branded laptops, licensed budget and mid-range models built for everyday, no-frills computing",
    logo: logoNokia,
  },
  {
    name: "Realme",
    slug: "realme",
    product: "Laptop",
    footerLabel: "Repair Realme laptop",
    serviceCenterName: "Realme Service Center",
    blurb:
      "Realme Book laptops, budget-to-mid-range models popular with Realme's smartphone-first customer base",
    logo: logoRealme,
  },
  {
    name: "Razer",
    slug: "razer",
    product: "Blade",
    footerLabel: "Repair Razer Blade laptop",
    serviceCenterName: "Razer Blade Service Center",
    blurb:
      "Razer Blade laptops, premium all-metal gaming machines built around high-end discrete graphics",
    logo: logoRazer,
  },
];

// Shown as an extra tile at the end of the brand grid for shoppers whose
// brand isn't in the list above. It has no SEO landing page of its own (there's
// no real "Not Listed" product to write content about) — the grid links it
// straight to WhatsApp instead of /repair-laptop/brand/[slug].
export const NOT_LISTED_BRAND_LOGO: StaticImageData = logoNotListed;

export function getRepairLaptopBrand(slug: string): RepairLaptopBrand | undefined {
  return REPAIR_LAPTOP_BRANDS.find((b) => b.slug === slug);
}

export function heroProductName(brand: RepairLaptopBrand): string {
  return `${brand.name} ${brand.product}`;
}

export type BrandCopy = {
  intro: string[];
  whyBullets: string[];
  faqs: [string, string][];
};

export function buildBrandCopy(brand: RepairLaptopBrand): BrandCopy {
  const product = heroProductName(brand);
  const isApple = brand.slug === "apple";

  const intro = [
    isApple
      ? `Numunix repairs ${brand.blurb} across Bangalore — from cracked screens and battery replacements to liquid damage and boot issues. MacBooks need specialised care: logic board diagnostics, genuine Apple parts and technicians trained specifically on Apple hardware.`
      : `Numunix repairs ${brand.blurb} across Bangalore for homes, students and businesses — screen replacements, battery swaps, keyboard repairs, motherboard-level diagnostics and more, using genuine or certified-compatible parts.`,
    `Book online in a couple of minutes. A certified Numunix engineer can visit your doorstep for pickup, diagnose the exact fault, quote a transparent price before starting any work, and return your ${product} fully tested — most repairs are done within 24-48 hours.`,
  ];

  const whyBullets = [
    `Certified technicians for every ${brand.name} model, from entry-level to high-end configurations.`,
    `Transparent, upfront pricing for your ${product} repair — no hidden charges.`,
    `Genuine or certified-compatible parts, backed by a warranty on every repair.`,
    `Free doorstep pickup and drop anywhere in Bangalore.`,
  ];

  const faqs: [string, string][] = [
    [
      `Do you repair ${brand.name} laptops in Bangalore?`,
      `Yes. Numunix repairs ${product} models for any issue — screen, battery, keyboard, motherboard or software — with free doorstep pickup anywhere in Bangalore.`,
    ],
    [
      `How much does a ${product} repair cost?`,
      `Cost depends on the exact fault and part needed. Our engineer diagnoses the issue first and shares a transparent quote before starting any work, so there are no surprises.`,
    ],
  ];

  return { intro, whyBullets, faqs };
}

// Copy for the dedicated "{Brand} Service Center" landing pages
// (/repair-laptop/service-center/[brand]), separate from the plain repair
// pages (/repair-laptop/brand/[brand]). These target "service center" search
// intent explicitly, so the independent-provider framing is woven into the
// copy itself rather than left only to the disclaimer section.
export function buildServiceCenterCopy(brand: RepairLaptopBrand): BrandCopy {
  const product = heroProductName(brand);
  const isApple = brand.slug === "apple";

  const intro = [
    isApple
      ? `Looking for a reliable MacBook Service Center in Bangalore? Numunix is an independent, certified service provider for ${brand.blurb}, repairing cracked screens, battery replacements, liquid damage and boot issues. MacBooks need specialised care — logic board diagnostics, genuine Apple parts and technicians trained specifically on Apple hardware.`
      : `Looking for a reliable ${brand.serviceCenterName} in Bangalore? Numunix is an independent, certified repair provider for ${brand.blurb}, serving homes, students and businesses across the city. Our certified expert technicians are trained specifically on ${product} hardware — screen replacements, battery swaps, keyboard repairs, motherboard-level diagnostics and more — using genuine or certified-compatible parts.`,
    `Book online in a couple of minutes. A certified Numunix engineer can visit your doorstep for pickup, diagnose the exact fault, quote a transparent price before starting any work, and return your ${product} fully tested — most repairs are done within 24-48 hours.`,
  ];

  const whyBullets = [
    `Certified expert technicians, specifically experienced on every ${brand.name} model.`,
    `Transparent, upfront pricing for your ${product} service — no hidden charges.`,
    `Genuine or certified-compatible parts, backed by a warranty on every repair.`,
    `Free doorstep pickup and drop anywhere in Bangalore.`,
  ];

  const faqs: [string, string][] = [
    [
      `Is this an authorized ${brand.name} service center?`,
      `No. Numunix is an independent, certified repair service and is not an authorized, franchised or brand-owned service center for ${brand.name}. Our technicians are experienced experts on ${product} hardware, and we use genuine or certified-compatible parts, but we are not affiliated with ${brand.name} or its subsidiaries.`,
    ],
    [
      `Do you service ${brand.name} laptops in Bangalore?`,
      `Yes. Numunix services ${product} models for any issue — screen, battery, keyboard, motherboard or software — with free doorstep pickup anywhere in Bangalore.`,
    ],
    [
      `How much does a ${product} service cost?`,
      `Cost depends on the exact fault and part needed. Our engineer diagnoses the issue first and shares a transparent quote before starting any work, so there are no surprises.`,
    ],
  ];

  return { intro, whyBullets, faqs };
}

// Independent-service disclaimer shown on every "{Brand} Service Center"
// landing page, just above the footer. Keeps that H1/SEO framing legally
// accurate: Numunix is a certified independent repair provider, not an
// authorized or brand-owned service center.
export function buildBrandDisclaimer(brand: RepairLaptopBrand): { heading: string; body: string } {
  const product = heroProductName(brand);
  return {
    heading: `Independent, certified ${brand.name} repair — not an authorized service center`,
    body: `Numunix is an independent repair service provider and is not associated with, authorized by, sponsored by, or in any way officially connected with ${brand.name} or its subsidiaries and affiliates. "${brand.name}" and any related names, logos and trademarks are the property of their respective owners and are used here only to describe the devices we service. Our certified expert technicians are trained and experienced specifically in working on ${product} hardware, and every repair uses genuine or certified-compatible parts backed by a Numunix service warranty.`,
  };
}
