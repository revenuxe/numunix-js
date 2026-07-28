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
    logo: logoApple,
  },
  {
    name: "Dell",
    slug: "dell",
    product: "Laptop",
    footerLabel: "Repair Dell laptop",
    serviceCenterName: "Dell Service Center",
    logo: logoDell,
  },
  {
    name: "HP",
    slug: "hp",
    product: "Laptop",
    footerLabel: "Repair HP laptop",
    serviceCenterName: "HP Service Center",
    logo: logoHp,
  },
  {
    name: "Lenovo",
    slug: "lenovo",
    product: "Laptop",
    footerLabel: "Repair Lenovo laptop",
    serviceCenterName: "Lenovo Service Center",
    logo: logoLenovo,
  },
  {
    name: "Asus",
    slug: "asus",
    product: "Laptop",
    footerLabel: "Repair Asus laptop",
    serviceCenterName: "Asus Service Center",
    logo: logoAsus,
  },
  {
    name: "Acer",
    slug: "acer",
    product: "Laptop",
    footerLabel: "Repair Acer laptop",
    serviceCenterName: "Acer Service Center",
    logo: logoAcer,
  },
  {
    name: "MSI",
    slug: "msi",
    product: "Laptop",
    footerLabel: "Repair MSI laptop",
    serviceCenterName: "MSI Service Center",
    logo: logoMsi,
  },
  {
    name: "Avita",
    slug: "avita",
    product: "Laptop",
    footerLabel: "Repair Avita laptop",
    serviceCenterName: "Avita Service Center",
    logo: logoAvita,
  },
  {
    name: "LG",
    slug: "lg",
    product: "Gram",
    footerLabel: "Repair LG Gram laptop",
    serviceCenterName: "LG Gram Service Center",
    logo: logoLg,
  },
  {
    name: "Microsoft",
    slug: "microsoft",
    product: "Surface",
    footerLabel: "Repair Microsoft Surface laptop",
    serviceCenterName: "Microsoft Surface Service Center",
    logo: logoMicrosoft,
  },
  {
    name: "Samsung",
    slug: "samsung",
    product: "Galaxy Book",
    footerLabel: "Repair Samsung Galaxy Book laptop",
    serviceCenterName: "Samsung Galaxy Book Service Center",
    logo: logoSamsung,
  },
  {
    name: "Xiaomi",
    slug: "xiaomi",
    product: "Notebook",
    footerLabel: "Repair Xiaomi Notebook laptop",
    serviceCenterName: "Xiaomi Notebook Service Center",
    logo: logoXiaomi,
  },
  {
    name: "Nokia",
    slug: "nokia",
    product: "Laptop",
    footerLabel: "Repair Nokia laptop",
    serviceCenterName: "Nokia Service Center",
    logo: logoNokia,
  },
  {
    name: "Realme",
    slug: "realme",
    product: "Laptop",
    footerLabel: "Repair Realme laptop",
    serviceCenterName: "Realme Service Center",
    logo: logoRealme,
  },
  {
    name: "Razer",
    slug: "razer",
    product: "Blade",
    footerLabel: "Repair Razer Blade laptop",
    serviceCenterName: "Razer Blade Service Center",
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
      ? `MacBooks need specialised care — logic board diagnostics, genuine Apple parts and technicians trained specifically on Apple hardware. Numunix repairs MacBook Air and MacBook Pro models across Bangalore, from cracked screens and battery replacements to liquid damage and boot issues, whether it's an older Intel-based MacBook or a recent Apple Silicon model.`
      : `Numunix repairs used ${brand.name} laptops for homes, students and businesses across Bangalore — screen replacements, battery swaps, keyboard repairs, motherboard-level diagnostics and more. Our engineers work on your ${product} using genuine or certified-compatible parts.`,
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
      ? `Looking for a reliable MacBook Service Center in Bangalore? MacBooks need specialised care — logic board diagnostics, genuine Apple parts and technicians trained specifically on Apple hardware. Numunix is an independent, certified MacBook service provider in Bangalore, repairing MacBook Air and MacBook Pro models from cracked screens and battery replacements to liquid damage and boot issues, whether it's an older Intel-based MacBook or a recent Apple Silicon model.`
      : `Looking for a reliable ${brand.serviceCenterName} in Bangalore? Numunix is an independent, certified ${brand.name} repair provider serving homes, students and businesses across the city — screen replacements, battery swaps, keyboard repairs, motherboard-level diagnostics and more. Our certified expert technicians are trained specifically on ${product} hardware and use genuine or certified-compatible parts.`,
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
