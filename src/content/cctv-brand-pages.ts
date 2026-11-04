import type { WasherBrandPage } from "./repair-brand-pages";
import { CCTV_BRANDS } from "./cctv-brands";
import { CCTV_EDITORIAL } from "./cctv-brand-editorial";

export type CCTVBrandPage = WasherBrandPage & {
  cctvGuidance: { subject: string; paragraphs: string[]; example: string };
};
export const CCTV_DECISION_GUIDANCE = [
  {
    title: "Assess the affected part of the system",
    body: "Compare the failed function with the condition of the camera, cabling, power supply, recorder and storage. One missing channel does not automatically require replacing the whole installation. Ask which checks support the proposed scope and which faults would remain.",
  },
  {
    title: "Review compatibility and the full estimate",
    body: "Confirm how any replacement matches the recorder, camera connections, power requirements and existing recording arrangement. Review inspection charges, labour, access work, parts and exclusions together. Agree how extra work would be approved.",
  },
  {
    title: "Include footage and continuity needs",
    body: "Tell the assessor if existing recordings matter before a reset, storage initialization or replacement is proposed. Discuss the likely interruption to viewing and recording. Repair is separate from footage recovery, and neither retention nor recovery can be guaranteed.",
  },
];
export const CCTV_AFTERCARE_GUIDANCE = [
  {
    title: "Check live view and recording separately",
    body: "Review each affected channel, relevant day or night behaviour and a new playback sample where available. Ask how recording schedules and timestamps were checked. A live picture alone does not establish that footage is being recorded.",
  },
  {
    title: "Confirm access and handover",
    body: "Have the authorized owner confirm local and agreed remote-viewing access. Review who has access and keep passwords, verification codes and account recovery under the owner's control. Do not assume an independent repair includes continuous monitoring.",
  },
  {
    title: "Keep the system and repair details",
    body: "Retain the findings, approved work, device models and part specifications. Confirm any written labour or parts warranty and the process for reporting a recurring fault. Record any agreed observation or maintenance steps for the installation.",
  },
];
export const CCTV_BRAND_PAGES: CCTVBrandPage[] = CCTV_BRANDS.map((brand) => {
  const slug = brand.file.replace(/\.[^.]+$/, "");
  const editorial = CCTV_EDITORIAL[slug];
  if (!editorial) throw new Error(`Missing CCTV editorial: ${slug}`);
  return {
    brand: brand.name,
    slug,
    service: "CCTV Installation & Repair",
    path: `/electronic/repairs/cctv-service/${slug}`,
    title: `${brand.name} CCTV Repair in Bangalore | Numunix`,
    description: `Independent ${brand.name} CCTV repair in Bangalore for camera, recording, power and remote-viewing faults. Request model-specific assessment and a clear estimate.`,
    intro: `Independent ${brand.name} CCTV repair in Bangalore. Share camera and recorder models, affected channels and symptoms to discuss assessment, compatibility, footage priorities and an estimate before work begins.`,
    heroIntro: `Get a clear plan for your security system. Independent ${brand.name} CCTV assessment for missing video, recording and connection problems.`,
    modelPrompt: "Camera / Recorder model",
    modelIntro: editorial.model,
    diagnosticTitle: "Live view or recording?",
    diagnosticBody: editorial.focus,
    diagnosticLink: `Visit ${brand.name} official support`,
    brandSelection: { brand: brand.name },
    enquiryDescription: `${brand.name} CCTV repair\nCamera / Recorder model: \nAffected channels: \nIssue: \nFootage priority: \nBangalore locality: `,
    checks: [
      "Camera & recorder models",
      "Affected channels & power",
      "Live view, recording & access",
      "Footage priorities & repair scope",
    ],
    faults: [
      {
        title: "No video on one or more cameras",
        label: "CAMERA & SIGNAL",
        body: `Tell us which channels are missing on your ${brand.name} system and whether the same issue appears on the local monitor and viewing app. Camera power, connections, cabling and recorder inputs may need checking before a replacement is proposed.`,
      },
      {
        title: "Missing recordings or playback gaps",
        label: "RECORDING & STORAGE",
        body: "Identify the affected dates and channels, whether live images still work and any storage warning. Share the recording method if known. Do not format a drive or initialize storage to test it when existing footage matters; discuss preservation before work is agreed.",
      },
      {
        title: "Remote viewing or app offline",
        label: "NETWORK & ACCESS",
        body: "Separate a working local picture from a remote-access failure. Mention router, internet or app changes and whether one user or every user is affected. Keep passwords, QR codes and verification details out of the enquiry. Account recovery must follow the appropriate ownership process.",
      },
      {
        title: "Blurred image or poor night view",
        label: "IMAGE QUALITY",
        body: "Describe whether the image is unclear throughout the day, only at night or after rain. Mention glare, a changed view or visible condensation from a safe position. Image quality can involve positioning, the enclosure, power or the camera; do not climb to inspect it.",
      },
      {
        title: "Recorder restarting or power loss",
        label: "POWER & RECORDER",
        body: "Note whether every camera drops together, how long the recorder runs and any warning before it restarts. Mention a recent electrical event or installation change. Keep electrical covers closed and avoid repeated power cycling when recordings or damaged equipment may be at risk.",
      },
      {
        title: "Intermittent channels or mixed equipment",
        label: "CABLING & COMPATIBILITY",
        body: "List the camera, recorder and other relevant device models, including different brands. Note whether the issue followed a cable change or replacement camera. Compatible signal formats, power and recording functions need confirmation for the actual equipment.",
      },
    ],
    estimateChecks: [
      {
        title: "Assessment and site access",
        body: "Confirm coverage, inspection charges, camera count and which parts of the installation will be assessed. Discuss access restrictions, work at height and any need to coordinate with a building manager or IT contact.",
      },
      {
        title: "Parts and compatibility",
        body: "Review the diagnosed fault, proposed work and model compatibility. Ask whether the estimate includes cabling, connectors, power equipment, storage or configuration, and distinguish essential repairs from optional changes.",
      },
      {
        title: "Footage, downtime and checks",
        body: "Discuss recording priorities and the risk of data loss before a reset or storage change. Agree the expected interruption, relevant checks and any written labour or parts warranty. Recovery of missing footage is a separate request.",
      },
    ],
    preparation: [
      editorial.model,
      "Describe live viewing, recorded playback and remote viewing separately. Include affected channels, the last known working time and recent power, router or installation changes.",
      "Nominate the owner or authorized contact for the system. Coordinate any access or configuration changes with the building manager or IT team where appropriate.",
      "Keep footage, passwords, verification codes, QR labels and network details out of the enquiry. Mention important recordings before any reset, formatting or storage replacement is discussed.",
      "Describe camera locations and safe access restrictions from ground level. Do not climb, open electrical enclosures or disconnect equipment simply to collect booking information.",
    ],
    faqs: [
      [
        `Is Numunix an authorized ${brand.name} CCTV service center?`,
        `No. Numunix provides independent repair assessment and is not affiliated with or authorized by ${brand.name}. Check manufacturer support, installer agreements and existing cover before arranging independent work.`,
      ],
      [`What details help with my ${brand.name} CCTV repair?`, editorial.model],
      [
        `How much does ${brand.name} CCTV repair cost?`,
        "The device models, affected channels, site access, diagnosis, labour and proposed parts determine the estimate. Confirm inspection charges, scope and exclusions before approval. No fixed repair price is quoted on this page.",
      ],
      [
        "Can you assess a camera, DVR or NVR fault?",
        "Share the full camera and recorder models and describe which functions still work. Assessment and compatible parts need confirmation for the particular installation. A brand listing does not guarantee every model or repair is supported.",
      ],
      [
        "Why can I see live video but not recordings?",
        "Live viewing and recording are separate functions. Share the affected time range, channels, recording method and any storage warning. Assessment may need to review the recording arrangement and storage; a live image does not establish that footage has been saved.",
      ],
      [
        "Will existing footage be preserved?",
        "Retention cannot be guaranteed. Tell us if recordings are important before authorizing resets, storage initialization, replacement or configuration work. Missing-footage recovery is a separate scope and depends on what data remains accessible.",
      ],
      [
        "Can you help when the viewing app says offline?",
        "Describe whether the local monitor and recording still work, which app is involved and any router or internet change. Device, network and account issues need to be distinguished. Access recovery should follow the manufacturer's ownership process; do not send passwords or codes in the enquiry.",
      ],
      [
        "Can different camera and recorder brands work together?",
        "Compatibility depends on the exact models, signal format, power and required recording functions. Share both models before purchasing replacements. Similar connectors or a brand name alone do not establish compatibility.",
      ],
      [
        "Can an assessment be arranged at my Bangalore property?",
        "Share the locality, camera count, building type and access restrictions. Confirm location coverage, inspection charges, authorized access and timing before a visit is agreed. Availability and arrangements depend on the installation and fault.",
      ],
      [
        "How long does repair take and what warranty applies?",
        "Timing depends on diagnosis, site access, suitable parts and the required checks. Confirm the schedule after assessment and request any applicable labour or parts warranty, exclusions and reporting process in writing.",
      ],
    ],
    sources: [
      { name: `${brand.name}: official product support and contacts`, href: editorial.support },
    ],
    cctvGuidance: {
      subject: `Plan an assessment for your ${brand.name} CCTV system`,
      paragraphs: [editorial.model, editorial.focus],
      example: editorial.example,
    },
  };
});
export function cctvBrandPage(category: string, service: string, brand: string) {
  if (category !== "electronic" || service !== "cctv-service") return undefined;
  return CCTV_BRAND_PAGES.find((page) => page.slug === brand);
}
