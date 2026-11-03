import type { WasherBrandPage } from "./repair-brand-pages";
import { MOBILE_BRANDS } from "./mobile-brands";
import { MOBILE_EDITORIAL } from "./mobile-brand-editorial";
import { MOBILE_SEARCH_COPY } from "./mobile-search-copy";

export type MobileBrandPage = WasherBrandPage & { mobileGuidance: { subject: string; paragraphs: string[]; example: string } };

export const MOBILE_AFTERCARE_GUIDANCE = [
  { title: "Review the affected functions", body: "Ask which display, touch, charging, audio, camera or connectivity checks relate to the original complaint. Confirm any limitations that remain. A handset that switches on is not by itself proof that every reported fault is resolved." },
  { title: "Keep the repair record", body: "Retain the findings, approved scope, part specification and receipt. Confirm any written labour or parts warranty, exclusions and reporting process. Ask how part-related messages or functionality limitations were discussed for the work completed." },
  { title: "Check your data and access", body: "Review your own backup and accounts privately after handover. Confirm any agreed software changes and keep authentication under your control. Do not assume that a repair restores inaccessible data or the phone's original resistance to water." },
];

export const MOBILE_DECISION_GUIDANCE = [
  { title: "Consider the phone as a whole", body: "Weigh the findings alongside physical condition, battery behaviour, earlier repairs and the functions you need. Age or a cracked screen alone does not decide whether repair is practical. Ask which reported faults the proposed work addresses and what would remain unresolved." },
  { title: "Compare the complete estimate", body: "Review assessment charges, labour and proposed part specifications together. Compare this with the practical cost of replacing the handset and restoring your apps and data. Do not decide from an advertised part price that leaves the work or exclusions undefined." },
  { title: "Keep data needs in the decision", body: "A phone repair and data recovery are different scopes. If files are not backed up, discuss that priority before approving a reset, software reinstallation or board replacement. Confirm parts availability, feasibility and any written repair terms before proceeding." },
];

export const MOBILE_BRAND_PAGES: MobileBrandPage[] = MOBILE_BRANDS.map(brand => {
  const slug = brand.file.replace(/\.[^.]+$/, "");
  const editorial = MOBILE_EDITORIAL[slug];
  const searchCopy = MOBILE_SEARCH_COPY[slug];
  if (!editorial || !searchCopy) throw new Error(`Missing mobile brand editorial: ${slug}`);
  return {
    brand: brand.name, slug, service: "Mobile Repair",
    path: `/electronic/repairs/mobile-repair/${slug}`,
    title: `${brand.name} Mobile Repair in Bangalore | Numunix`,
    description: searchCopy.description,
    intro: `Independent ${brand.name} mobile repair in Bangalore. Share your phone model, fault and damage history to discuss assessment, data priorities, parts and an estimate before work begins.`,
    heroIntro: searchCopy.hero,
    modelPrompt: "Phone model / Variant",
    modelIntro: editorial.modelDetails,
    diagnosticTitle: "Describe what still works.",
    diagnosticBody: editorial.focus,
    diagnosticLink: `Visit ${brand.name} official support`,
    brandSelection: { brand: brand.name },
    enquiryDescription: `${brand.name} mobile repair\nPhone model / Variant: \nIssue / Damage history: \nBackup status / Data priority: \nBangalore locality: `,
    checks: ["Model & damage history", "Display, touch & charging", "Relevant camera & audio checks", "Data priorities & repair scope"],
    faults: [
      { title: "Cracked screen or unresponsive touch", label: "DISPLAY & TOUCH", body: `Describe the image, touch response and frame condition on your ${brand.name} phone separately. Mention prior screen work and damage. Confirm the replacement specification, relevant checks and any model-specific limitations before approval.` },
      { title: "Battery drain or unexpected shutdowns", label: "BATTERY & POWER", body: "Note whether the phone drains quickly, switches off or has visible swelling. Describe the activity at the time and any earlier battery work. Stop using or charging a swollen or damaged phone; do not open or press the battery." },
      { title: "Intermittent or failed charging", label: "CHARGING", body: "Explain whether a charging indicator appears and mention the cable, charger and any port damage or liquid exposure. Do not insert metal objects into the connection or repeatedly charge a wet phone to reproduce the fault." },
      { title: "Camera, speaker or microphone trouble", label: "CAMERA & AUDIO", body: "Identify the affected camera or audio function and whether it happens in one app or several. Mention external damage and earlier work. Share an example only if it does not expose private recordings or personal information." },
      { title: "Repeated restarts or no start-up", label: "START-UP & SOFTWARE", body: "Describe whether the device responds, shows a logo, rings or vibrates. Tell us whether data is backed up before software or internal work is proposed. Do not factory-reset the phone solely to demonstrate the problem." },
      { title: "Drop damage or liquid exposure", label: "DAMAGE ASSESSMENT", body: "State when the damage occurred and which functions still work. Avoid repeated power or charging attempts after liquid exposure. Assessment may identify several affected areas; a visible crack alone does not establish the whole repair scope." },
    ],
    estimateChecks: [
      { title: "Assessment and data priorities", body: "Confirm inspection charges, what can be tested and whether any proposed step may affect stored data. Do not treat phone repair as a promise of data recovery." },
      { title: "Parts and functionality", body: "Ask how the part matches the full model, its agreed specification and what functions or messages may be affected. Review labour, exclusions and any change in scope before approval." },
      { title: "Checks and written terms", body: "Agree which reported functions will be reviewed after work. Ask for any applicable labour or parts warranty and its exclusions in writing, along with the completed-work record." },
    ],
    preparation: [
      `Share the exact ${brand.name} phone model and variant. Do not include passwords, OTPs, recovery codes or account credentials in the enquiry.`,
      "Back up accessible data before handover where possible. Mention an incomplete backup and any data-preservation priority before work is agreed.",
      "Describe damage, liquid exposure and earlier repairs, plus which functions still work. Keep sensitive content out of photos and videos.",
      "Discuss the handover and testing arrangements. Remove SIM and removable storage when appropriate, and keep control of your accounts.",
      "Stop charging a swollen, wet or visibly damaged phone. Do not press a raised battery, open the device or repeatedly restart it to reproduce the fault.",
    ],
    faqs: [
      [`Is Numunix an authorized ${brand.name} mobile service center?`, `No. Numunix provides independent repair assessment and is not affiliated with or authorized by ${brand.name}. Check official support and existing manufacturer or protection-plan cover before arranging independent work.`],
      [`What details help with my ${brand.name} phone repair?`, editorial.modelDetails],
      ["Will my data stay on the phone during repair?", "Data retention cannot be guaranteed. Back up accessible files and discuss data priorities before any reset, software reinstallation or board work is approved. Ask which steps may affect data and distinguish the repair scope from any separate data-recovery request."],
      ["Do I need to share an account password or OTP?", "Do not put passwords, OTPs, recovery codes or account credentials in the booking form or WhatsApp enquiry. Discuss any access needed for testing and how it can be supervised or handled through a model-supported privacy mode. Keep authentication under your control."],
      [`How much does ${brand.name} mobile repair cost?`, "The exact model, diagnosis, part specification and labour determine the estimate. Confirm assessment charges, exclusions and any functionality limitations before approval. No fixed repair price is quoted on this page."],
      ["Can a screen be changed without replacing other parts?", "That depends on the model and findings. Describe touch, image and frame damage separately and mention prior repairs. Ask what checks support the proposed scope and which features or messages may be affected by the chosen replacement."],
      ["Can you repair an imported or older phone?", "Share the full model, region variant if known and repair history. Assessment options, compatible parts and repair feasibility need confirmation for the particular handset; a brand listing does not guarantee support for every model."],
      ["How long will the repair take?", "Timing depends on assessment, suitable parts and the checks required. Confirm the expected schedule after diagnosis. An enquiry or callback request does not establish a completion time."],
      ["Will the phone still be water resistant after repair?", "Do not assume its original resistance to water remains unchanged. Ask what sealing work and testing, if any, are included and what limitations apply. Keep the repaired phone away from liquid unless you have clear model-specific guidance."],
      ["What warranty applies to the repair?", "Confirm any written labour or parts warranty for the specific job, including duration, exclusions and how to report the same symptom again. Independent repair terms are separate from manufacturer cover and protection plans."],
    ],
    sources: [{ name: `${brand.name}: official product support`, href: editorial.support }],
    mobileGuidance: { subject: editorial.subject, paragraphs: [editorial.modelDetails, editorial.focus], example: editorial.example },
  };
});

export function mobileBrandPage(category: string, service: string, brand: string) {
  if (category !== "electronic" || service !== "mobile-repair") return undefined;
  return MOBILE_BRAND_PAGES.find(page => page.slug === brand);
}
