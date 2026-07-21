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
    logo: logoApple,
  },
  {
    name: "Dell",
    slug: "dell",
    product: "Laptop",
    footerLabel: "Repair Dell laptop",
    logo: logoDell,
  },
  { name: "HP", slug: "hp", product: "Laptop", footerLabel: "Repair HP laptop", logo: logoHp },
  {
    name: "Lenovo",
    slug: "lenovo",
    product: "Laptop",
    footerLabel: "Repair Lenovo laptop",
    logo: logoLenovo,
  },
  {
    name: "Asus",
    slug: "asus",
    product: "Laptop",
    footerLabel: "Repair Asus laptop",
    logo: logoAsus,
  },
  {
    name: "Acer",
    slug: "acer",
    product: "Laptop",
    footerLabel: "Repair Acer laptop",
    logo: logoAcer,
  },
  { name: "MSI", slug: "msi", product: "Laptop", footerLabel: "Repair MSI laptop", logo: logoMsi },
  {
    name: "Avita",
    slug: "avita",
    product: "Laptop",
    footerLabel: "Repair Avita laptop",
    logo: logoAvita,
  },
  {
    name: "LG",
    slug: "lg",
    product: "Gram",
    footerLabel: "Repair LG Gram laptop",
    logo: logoLg,
  },
  {
    name: "Microsoft",
    slug: "microsoft",
    product: "Surface",
    footerLabel: "Repair Microsoft Surface laptop",
    logo: logoMicrosoft,
  },
  {
    name: "Samsung",
    slug: "samsung",
    product: "Galaxy Book",
    footerLabel: "Repair Samsung Galaxy Book laptop",
    logo: logoSamsung,
  },
  {
    name: "Xiaomi",
    slug: "xiaomi",
    product: "Notebook",
    footerLabel: "Repair Xiaomi Notebook laptop",
    logo: logoXiaomi,
  },
  {
    name: "Nokia",
    slug: "nokia",
    product: "Laptop",
    footerLabel: "Repair Nokia laptop",
    logo: logoNokia,
  },
  {
    name: "Realme",
    slug: "realme",
    product: "Laptop",
    footerLabel: "Repair Realme laptop",
    logo: logoRealme,
  },
  {
    name: "Razer",
    slug: "razer",
    product: "Blade",
    footerLabel: "Repair Razer Blade laptop",
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
