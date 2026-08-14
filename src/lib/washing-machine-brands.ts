import type { StaticImageData } from "next/image";

import bosch from "@/assets/washing-machine-brand-logos/bosch.webp";
import godrej from "@/assets/washing-machine-brand-logos/godrej.webp";
import haier from "@/assets/washing-machine-brand-logos/haier.webp";
import ifb from "@/assets/washing-machine-brand-logos/ifb.webp";
import lg from "@/assets/washing-machine-brand-logos/lg.webp";
import panasonic from "@/assets/washing-machine-brand-logos/panasonic.webp";
import samsung from "@/assets/washing-machine-brand-logos/samsung.webp";
import siemens from "@/assets/washing-machine-brand-logos/siemens.webp";
import whirlpool from "@/assets/washing-machine-brand-logos/whirlpool.webp";

export type WashingMachineBrand = { name: string; slug: string; logo: StaticImageData | string };

export const WASHING_MACHINE_BRANDS: WashingMachineBrand[] = [
  { name: "Samsung", slug: "samsung", logo: samsung },
  { name: "LG", slug: "lg", logo: lg },
  { name: "Bosch", slug: "bosch", logo: bosch },
  { name: "Siemens", slug: "siemens", logo: siemens },
  { name: "Panasonic", slug: "panasonic", logo: panasonic },
  { name: "IFB", slug: "ifb", logo: ifb },
  { name: "Haier", slug: "haier", logo: haier },
  { name: "Whirlpool", slug: "whirlpool", logo: whirlpool },
  { name: "Godrej", slug: "godrej", logo: godrej },
  { name: "Croma", slug: "croma", logo: "/washing-machine-brand-logos/croma.svg" },
];

export function getWashingMachineBrand(slug: string) {
  return WASHING_MACHINE_BRANDS.find((brand) => brand.slug === slug);
}
