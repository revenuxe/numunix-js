import type { StaticImageData } from "next/image";

import logoCpPlus from "@/assets/cctv-brand-logos/cp-plus.webp";
import logoHikvision from "@/assets/cctv-brand-logos/hikvision.webp";
import logoDahua from "@/assets/cctv-brand-logos/dahua.webp";
import logoEzviz from "@/assets/cctv-brand-logos/ezviz.webp";
import logoGodrej from "@/assets/cctv-brand-logos/godrej.webp";
import logoHifocus from "@/assets/cctv-brand-logos/hifocus.webp";
import logoTplink from "@/assets/cctv-brand-logos/tplink.webp";
import logoNotSure from "@/assets/brand-logos/not-listed.webp";

export type CctvBrand = {
  name: string;
  slug: string;
  footerLabel: string;
  logo: StaticImageData;
};

// Marketing/SEO landing pages for CCTV brand searches (e.g. "CP Plus CCTV
// installation Bangalore"). Shown below the hero on the CCTV Installation
// service page.
export const CCTV_BRANDS: CctvBrand[] = [
  { name: "CP Plus", slug: "cp-plus", footerLabel: "CP Plus CCTV installation", logo: logoCpPlus },
  {
    name: "Hikvision",
    slug: "hikvision",
    footerLabel: "Hikvision CCTV installation",
    logo: logoHikvision,
  },
  { name: "Dahua", slug: "dahua", footerLabel: "Dahua CCTV installation", logo: logoDahua },
  { name: "EZVIZ", slug: "ezviz", footerLabel: "EZVIZ camera installation", logo: logoEzviz },
  {
    name: "Godrej",
    slug: "godrej",
    footerLabel: "Godrej security camera installation",
    logo: logoGodrej,
  },
  {
    name: "Hi-Focus",
    slug: "hi-focus",
    footerLabel: "Hi-Focus CCTV installation",
    logo: logoHifocus,
  },
  {
    name: "TP-Link",
    slug: "tp-link",
    footerLabel: "TP-Link camera installation",
    logo: logoTplink,
  },
];

// Shown as an extra tile at the end of the brand grid for shoppers who don't
// know or aren't sure of their CCTV brand. No SEO landing page of its own —
// the grid links it straight to the "not sure" reassurance page instead.
export const CCTV_NOT_SURE_LOGO: StaticImageData = logoNotSure;

export function getCctvBrand(slug: string): CctvBrand | undefined {
  return CCTV_BRANDS.find((b) => b.slug === slug);
}

export type CctvBrandCopy = {
  intro: string[];
  whyBullets: string[];
  faqs: [string, string][];
};

export function buildCctvBrandCopy(brand: CctvBrand): CctvBrandCopy {
  const intro = [
    `Numunix installs, configures and services ${brand.name} CCTV cameras for homes, shops and offices across Bangalore. From choosing the right ${brand.name} camera and DVR/NVR combination for your property to running the cabling and setting up remote mobile viewing, our certified engineers handle the full ${brand.name} CCTV installation end to end.`,
    `Already have a ${brand.name} CCTV system that's stopped recording, gone offline, or lost its remote view? We troubleshoot and repair existing ${brand.name} installations too — camera and DVR/NVR diagnostics, hard-drive replacement, cable and connector faults, and app/remote-viewing reconfiguration — with a clear, upfront quote before any work starts.`,
  ];

  const whyBullets = [
    `Certified installers experienced with ${brand.name} cameras, DVRs and NVRs.`,
    `Correct camera placement and cabling for full coverage, no blind spots.`,
    `Remote mobile viewing setup so you can check your ${brand.name} cameras from anywhere.`,
    `Free doorstep visit for quotation, with AMC and repair support after installation.`,
  ];

  const faqs: [string, string][] = [
    [
      `Do you install ${brand.name} CCTV cameras in Bangalore?`,
      `Yes. Numunix installs and configures ${brand.name} CCTV systems — cameras, DVR/NVR, cabling and remote mobile viewing — for homes and businesses anywhere in Bangalore.`,
    ],
    [
      `Can you repair or service an existing ${brand.name} CCTV setup?`,
      `Yes. Our engineers diagnose ${brand.name} camera, DVR and NVR issues on site — offline cameras, recording failures, hard-drive faults and app connectivity problems — and share a transparent repair quote before starting work.`,
    ],
  ];

  return { intro, whyBullets, faqs };
}
