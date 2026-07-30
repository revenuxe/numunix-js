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
  // A short, brand-specific line about that brand's camera line-up, used to
  // open its intro paragraph. Written per brand (not a single shared
  // template) so the 7 brand pages don't read as one template with the
  // brand name swapped in — search engines were treating the old shared
  // paragraph as near-duplicate content and leaving most of these pages
  // uncrawled.
  blurb: string;
  logo: StaticImageData;
};

// Marketing/SEO landing pages for CCTV brand searches (e.g. "CP Plus CCTV
// installation Bangalore"). Shown below the hero on the CCTV Installation
// service page.
export const CCTV_BRANDS: CctvBrand[] = [
  {
    name: "CP Plus",
    slug: "cp-plus",
    footerLabel: "CP Plus CCTV installation",
    blurb:
      "CP Plus, one of India's most widely installed security brands, with analog and IP camera ranges for homes, shops and offices",
    logo: logoCpPlus,
  },
  {
    name: "Hikvision",
    slug: "hikvision",
    footerLabel: "Hikvision CCTV installation",
    blurb:
      "Hikvision, one of the world's largest CCTV manufacturers, with a wide range of IP and analog cameras suited to both small properties and large multi-camera sites",
    logo: logoHikvision,
  },
  {
    name: "Dahua",
    slug: "dahua",
    footerLabel: "Dahua CCTV installation",
    blurb:
      "Dahua, a major global CCTV manufacturer known for AI-enabled cameras and NVR/DVR recording systems",
    logo: logoDahua,
  },
  {
    name: "EZVIZ",
    slug: "ezviz",
    footerLabel: "EZVIZ camera installation",
    blurb:
      "EZVIZ, a consumer smart-camera brand known for Wi-Fi and cloud-connected cameras that are easy to monitor from a phone",
    logo: logoEzviz,
  },
  {
    name: "Godrej",
    slug: "godrej",
    footerLabel: "Godrej security camera installation",
    blurb:
      "Godrej Security Solutions' CCTV cameras and DVR/NVR systems, a familiar Indian brand for home and small-business monitoring",
    logo: logoGodrej,
  },
  {
    name: "Hi-Focus",
    slug: "hi-focus",
    footerLabel: "Hi-Focus CCTV installation",
    blurb: "Hi-Focus, an Indian CCTV brand known for budget-friendly analog and IP camera systems",
    logo: logoHifocus,
  },
  {
    name: "TP-Link",
    slug: "tp-link",
    footerLabel: "TP-Link camera installation",
    blurb:
      "TP-Link's Tapo and VIGI camera ranges, Wi-Fi-first cameras built by a brand better known for its routers and networking gear",
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
    `Numunix installs, configures and services ${brand.blurb}, for homes, shops and offices across Bangalore. From choosing the right ${brand.name} camera and DVR/NVR combination for your property to running the cabling and setting up remote mobile viewing, our certified engineers handle the full installation end to end.`,
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
