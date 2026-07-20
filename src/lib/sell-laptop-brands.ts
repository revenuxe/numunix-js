export type SellLaptopBrand = {
  name: string;
  slug: string;
  product: string;
  footerLabel: string;
};

// Marketing/SEO landing pages for brand searches (e.g. "sell used Dell laptop
// Bangalore"). Independent of the real Supabase-backed device_brands catalog
// used by the quote funnel — these are informational pages that still link
// into the real catalog via the "Select your laptop brand" section.
export const SELL_LAPTOP_BRANDS: SellLaptopBrand[] = [
  { name: "Apple", slug: "apple", product: "MacBook", footerLabel: "Sell Apple MacBook laptop" },
  { name: "Dell", slug: "dell", product: "Laptop", footerLabel: "Sell Dell laptop" },
  { name: "HP", slug: "hp", product: "Laptop", footerLabel: "Sell HP laptop" },
  { name: "Lenovo", slug: "lenovo", product: "Laptop", footerLabel: "Sell Lenovo laptop" },
  { name: "Asus", slug: "asus", product: "Laptop", footerLabel: "Sell Asus laptop" },
  { name: "Acer", slug: "acer", product: "Laptop", footerLabel: "Sell Acer laptop" },
  { name: "MSI", slug: "msi", product: "Laptop", footerLabel: "Sell MSI laptop" },
];

export function getSellLaptopBrand(slug: string): SellLaptopBrand | undefined {
  return SELL_LAPTOP_BRANDS.find((b) => b.slug === slug);
}

export function heroProductName(brand: SellLaptopBrand): string {
  return `${brand.name} ${brand.product}`;
}

export type BrandCopy = {
  intro: string[];
  whyBullets: string[];
  faqs: [string, string][];
};

export function buildBrandCopy(brand: SellLaptopBrand): BrandCopy {
  const product = heroProductName(brand);
  const isApple = brand.slug === "apple";

  const intro = [
    isApple
      ? `MacBooks hold their resale value better than almost any other laptop, which is exactly why Numunix specialises in buying used Apple MacBook Air and MacBook Pro models across Bangalore. Whether it's an older Intel-based MacBook or a recent Apple Silicon model, our engineers can verify the exact configuration and give you an honest, model-specific price.`
      : `Numunix buys used ${brand.name} laptops from homes, students and businesses across Bangalore, whatever the condition. Our engineers check the processor, RAM, storage and screen so your ${product} gets priced on its real configuration — not a generic guess.`,
    `Book online in a couple of minutes, and a verified Numunix agent will collect your ${product} from your doorstep anywhere in Bangalore. We check the device on the spot, confirm the final price, and pay you instantly by UPI or bank transfer — no waiting for a buyer to show up.`,
  ];

  const whyBullets = [
    `Certified diagnostics for every ${brand.name} model, from entry-level to high-end configurations.`,
    `Fair, model-specific pricing for your ${product} — no lowball flat-rate offers.`,
    `Genuine, certified data wiping before your ${product} leaves your hands.`,
    `Free doorstep pickup anywhere in Bangalore, with instant payment on verification.`,
  ];

  const faqs: [string, string][] = [
    [
      `Do you buy old ${brand.name} laptops in Bangalore?`,
      `Yes. Numunix buys used ${product} models in any condition — working, damaged or non-functional — from anywhere in Bangalore, with free doorstep pickup.`,
    ],
    [
      `How is the price for a used ${product} calculated?`,
      `We start from the model's best-case resale value, then adjust for its exact configuration, age and physical condition. You'll see your final price before booking a pickup, and it's confirmed again at your doorstep.`,
    ],
  ];

  return { intro, whyBullets, faqs };
}
