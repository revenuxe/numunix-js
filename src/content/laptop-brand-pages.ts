import type { WasherBrandPage } from "./repair-brand-pages";
import { LAPTOP_BRANDS } from "./laptop-brands";
import { LAPTOP_EDITORIAL } from "./laptop-brand-editorial";

export type LaptopBrandPage = WasherBrandPage & {
  laptopGuidance: { subject: string; paragraphs: string[]; example: string };
};

export const LAPTOP_DECISION_GUIDANCE = [
  {
    title: "Match the repair to your needs",
    body: "Consider the laptop's condition, performance, battery and remaining usable functions alongside the diagnosed fault. A screen or keyboard issue does not automatically justify replacing the whole device. Ask what the proposed work resolves and which limitations remain.",
  },
  {
    title: "Compare the complete estimate",
    body: "Review inspection charges, labour, part specifications and exclusions together. Compare that total with a suitable replacement and the time needed to restore your working setup. Ask how changes in scope will be approved before additional work begins.",
  },
  {
    title: "Keep data in the decision",
    body: "Repair and data recovery are different requests. Discuss unbacked-up files before storage replacement, software reinstallation or board work. Encryption and hardware condition can affect access; do not assume that making the laptop start will recover inaccessible files.",
  },
];
export const LAPTOP_AFTERCARE_GUIDANCE = [
  {
    title: "Review the reported functions",
    body: "Ask for checks relevant to the original complaint: startup, display, keyboard, trackpad, charging, ports or cooling. Discuss any remaining symptoms and the conditions under which you should observe the laptop after handover.",
  },
  {
    title: "Keep the work record",
    body: "Retain the findings, approved estimate, part specification and receipt. Confirm any written labour or parts warranty, its exclusions and how to report a recurring symptom. Independent repair terms are separate from manufacturer cover.",
  },
  {
    title: "Check your files privately",
    body: "Review accessible files and backups yourself after handover. Keep passwords, recovery keys and authentication under your control. Confirm any software or storage changes made and follow the aftercare guidance for the work completed.",
  },
];

export const LAPTOP_BRAND_PAGES: LaptopBrandPage[] = LAPTOP_BRANDS.map((brand) => {
  const slug = brand.file.replace(/\.[^.]+$/, "");
  const editorial = LAPTOP_EDITORIAL[slug];
  if (!editorial) throw new Error(`Missing laptop editorial: ${slug}`);
  return {
    brand: brand.name,
    slug,
    service: "Laptop Repair",
    path: `/electronic/repairs/laptop-repair/${slug}`,
    title: `${brand.name} Laptop Repair in Bangalore | Numunix`,
    description: `Independent ${brand.name} laptop repair in Bangalore for screen, charging, keyboard, overheating and startup faults. Request assessment and a clear repair estimate.`,
    intro: `Independent ${brand.name} laptop repair in Bangalore. Share the full model and symptoms to discuss diagnosis, data priorities, compatible parts and an estimate before approving work.`,
    heroIntro: `Get back to work with a clear repair plan. Independent ${brand.name} laptop assessment for display, power, keyboard and startup problems.`,
    modelPrompt: "Laptop model / Product code",
    modelIntro: editorial.model,
    diagnosticTitle: "Power on, but no progress?",
    diagnosticBody: editorial.focus,
    diagnosticLink: `Visit ${brand.name} official support`,
    brandSelection: { brand: brand.name },
    enquiryDescription: `${brand.name} laptop repair\nModel: \nIssue: \nDamage / Previous repair: \nBackup status: \nBangalore locality: `,
    checks: [
      "Model & fault history",
      "Display, input & startup",
      "Charging & cooling symptoms",
      "Backup priorities & repair scope",
    ],
    faults: [
      {
        title: "Cracked screen or missing image",
        label: "DISPLAY",
        body: `Describe the image, backlight and any touch response on your ${brand.name} laptop separately. Mention visible damage, hinge movement and external-display behaviour already observed. Ask which panel specification and features are included in the estimate.`,
      },
      {
        title: "Not charging or short battery life",
        label: "BATTERY & POWER",
        body: "Tell us whether the laptop runs on adapter power, battery power or neither. Include the adapter rating and any warning message. A power fault can involve the adapter, connector, battery or internal circuitry; the symptom alone does not identify a failed part.",
      },
      {
        title: "Keyboard, trackpad or port faults",
        label: "INPUT & CONNECTIONS",
        body: "Identify the affected keys, input function or connection. Mention spills, accidental damage and accessories involved. Distinguish one failed connection from a system-wide issue. Do not insert metal objects into ports or keep using a liquid-damaged device.",
      },
      {
        title: "Overheating, fan noise or shutdowns",
        label: "COOLING",
        body: "Describe the task running when the symptom occurs, fan behaviour and whether the laptop slows, freezes or switches off. Mention earlier internal cleaning or repairs. Avoid repeated stress tests; the appropriate cooling or power work depends on inspection.",
      },
      {
        title: "Slow startup, freezing or boot errors",
        label: "STARTUP & STORAGE",
        body: "Record the complete message and whether the problem began after an update, damage or storage change. Explain your backup status before approving a reset or reinstallation. Software symptoms and storage faults require different checks, and data recovery is a separate scope.",
      },
      {
        title: "Hinge damage, liquid or no power",
        label: "DAMAGE ASSESSMENT",
        body: "Describe when the damage happened and which functions still respond. Stop powering a wet device, forcing a damaged hinge or pressing a swollen battery. Assessment may reveal more than one affected assembly; request findings before agreeing to board or enclosure replacement.",
      },
    ],
    estimateChecks: [
      {
        title: "Diagnosis and data priorities",
        body: "Confirm inspection charges, the reported fault and which steps may affect data. Discuss backup, encryption and any separate data-recovery request before software, storage or board work is approved.",
      },
      {
        title: "Compatible parts and labour",
        body: "Ask how the proposed screen, keyboard, battery, connector or other assembly matches the exact model. Confirm its specification, labour and exclusions rather than comparing a part price alone.",
      },
      {
        title: "Checks, timing and terms",
        body: "Agree which functions will be checked, the expected schedule after diagnosis and how extra work would be approved. Ask for any applicable labour or parts warranty and exclusions in writing.",
      },
    ],
    preparation: [
      editorial.model,
      "Back up accessible files where possible. Mention incomplete backups and important data before any reset, reinstallation, storage replacement or board work is agreed.",
      "Record the full error message and fault sequence. Mention damage, spills, recent changes and previous repairs without sending private documents or screenshots containing personal information.",
      "Discuss whether the charger or an accessory is needed for assessment. Keep passwords, OTPs and encryption recovery keys out of the booking form and WhatsApp enquiry.",
      "Stop charging a wet, swollen or visibly damaged laptop. Do not open the enclosure or repeatedly power it on to reproduce a potentially unsafe fault.",
    ],
    faqs: [
      [
        `Is Numunix an authorized ${brand.name} laptop service center?`,
        `No. Numunix provides independent repair assessment and is not affiliated with or authorized by ${brand.name}. If the laptop has manufacturer or protection-plan cover, check those options with the provider before arranging independent work.`,
      ],
      [`What should I share for my ${brand.name} laptop repair?`, editorial.model],
      [
        `How much does ${brand.name} laptop repair cost?`,
        "The exact model, diagnosis, labour and proposed parts determine the estimate. Confirm inspection charges, part specifications and exclusions before approving work. No fixed repair price is quoted on this page.",
      ],
      [
        "Can you assess a screen, keyboard or charging fault?",
        "Describe each affected function and any physical damage. Assessment options and compatible parts need confirmation for the exact model. A brand listing does not guarantee that every configuration or repair can be supported.",
      ],
      [
        "Will my files be preserved during repair?",
        "Data retention cannot be guaranteed. Back up accessible files and discuss data priorities before any reset, software reinstallation, storage replacement or board work. Repair and data recovery are separate requests; encryption and hardware condition can affect access.",
      ],
      [
        "Do I need to share my password or recovery key?",
        "Do not include passwords, OTPs or encryption recovery keys in the enquiry. Discuss any testing access separately, including whether it can be supervised or handled through a temporary account. Keep authentication under your control.",
      ],
      [
        "Can an imported or older laptop be repaired?",
        "Share the complete model, region variant and repair history. Confirm assessment feasibility and compatible parts for that device. An imported model may have different assemblies or support arrangements from a locally sold laptop.",
      ],
      [
        "How long does assessment and repair take?",
        "Timing depends on the fault, suitable parts and the checks required. Agree assessment arrangements and ask for the expected schedule after diagnosis. A booking or callback request does not establish a completion time.",
      ],
      [
        "Should I repair the laptop or replace it?",
        "Compare the findings and full estimate with the device's overall condition, performance needs and replacement options. Include the practical cost of restoring your setup and any data priorities. Ask what would remain unresolved after the proposed repair.",
      ],
      [
        "What warranty applies to the repair?",
        "Confirm any written labour or parts warranty for the specific work, including duration, exclusions and how to report the same symptom again. Independent repair terms are separate from manufacturer warranties and extended-cover plans.",
      ],
    ],
    sources: [{ name: `${brand.name}: official product support`, href: editorial.support }],
    laptopGuidance: {
      subject: `Plan the assessment around your ${brand.name} laptop`,
      paragraphs: [editorial.model, editorial.focus],
      example: editorial.example,
    },
  };
});

export function laptopBrandPage(category: string, service: string, brand: string) {
  if (category !== "electronic" || service !== "laptop-repair") return undefined;
  return LAPTOP_BRAND_PAGES.find((page) => page.slug === brand);
}
