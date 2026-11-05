import { brandSymptomCards } from "./brand-faults";
import type { WasherBrandPage } from "./repair-brand-pages";
import { PURIFIER_BRANDS } from "./purifier-brands";

type Guidance = { subject: string; paragraphs: string[]; example: string };
type Editorial = Guidance & { diagnosticTitle: string; diagnosticBody: string; support?: string };

// Illustrative scoping guidance, not completed jobs, universal compatibility or delivery claims.
const EDITORIAL: Record<string, Editorial> = {
  kent: {
    subject: "Identify your Kent purifier and its fitted filtration system",
    paragraphs: [
      "Send the complete Kent model from the appliance label and the last service record. Include the fitted purification type if documented; a Mineral RO badge alone does not identify the membrane, cartridges or electrical parts required.",
      "Describe slow tank filling separately from slow dispensing. Mention any change in the incoming supply and whether the problem started before or after the last filter replacement. Keep the exact alarm or indicator description with the model details.",
    ],
    example:
      "A Kent purifier dispenses its stored water normally but refills slowly after a filter visit. The model, work record and refill timeline help scope an assessment without assuming another membrane is needed.",
    diagnosticTitle: "Slow refill or slow dispensing?",
    diagnosticBody:
      "Explain whether the tank fills slowly or only the outlet flow has changed. Share the model and previous cartridge details so the assessment considers supply, filtration and dispensing separately.",
    support: "https://www.kent.co.in/kentservice",
  },
  pureit: {
    subject: "Match the Pureit filter request to the exact purifier",
    paragraphs: [
      "Share the full Pureit model, label photo and previous filter or replacement-kit record. Identify the treatment type from the appliance documentation rather than choosing a kit from the logo or cabinet shape.",
      "Photograph the full indicator pattern and explain whether dispensing has stopped, slowed or continued normally. Mention when the alert began and the last service date. Do not reset a service indicator just to clear the warning.",
    ],
    example:
      "A Pureit purifier shows an indicator after an earlier kit change. A photo of the indicator, full model and replacement record provides context before another kit or a reset is proposed.",
    diagnosticTitle: "A filter alert or a flow problem?",
    diagnosticBody:
      "Send the indicator pattern alongside the actual dispensing behaviour. The full Pureit model determines which instructions and compatible replacement kit need checking.",
    support: "https://www.pureitwater.com/",
  },
  "ao-smith": {
    subject: "Describe the affected AO Smith outlet and operating mode",
    paragraphs: [
      "Use the complete AO Smith purifier model, not a water-heater model from another appliance. Include the serial label, filter history and the particular dispensing function affected.",
      "If your model has more than one dispensing temperature, describe each affected mode separately. State whether normal dispensing still works and photograph any display message. Confirm that assessment covers the exact fitted features before work is arranged.",
    ],
    example:
      "An AO Smith purifier fills its tank but one dispensing mode does not respond. The model and a separate description of each outlet or mode keep the enquiry focused on the actual complaint.",
    diagnosticTitle: "Which dispensing function changed?",
    diagnosticBody:
      "Identify the outlet or mode involved and whether the tank still fills. Do not open the appliance or attempt work on heating or electrical components.",
    support: "https://www.aosmithindia.com/assistance/",
  },
  havells: {
    subject: "Keep Havells storage, dispensing and filtration symptoms separate",
    paragraphs: [
      "Send the Havells purifier model and serial label, along with the latest filter-service record. A cabinet finish or tank description does not establish which filters and controls are installed.",
      "For a leak, describe whether water appears at the outlet, underneath the cabinet or near the supply connection. For a flow complaint, explain tank filling separately from dispensing. Leave the cabinet closed and identify recent installation or service work.",
    ],
    example:
      "A Havells purifier has water beneath the cabinet after servicing while dispensing continues. A safe photo of the visible leak area and the service record help frame the inspection without opening the unit.",
    diagnosticTitle: "Where does the water first appear?",
    diagnosticBody:
      "Describe the visible leak location and when it occurs. Stop use if water reaches electrical connections and avoid moving a filled or wall-mounted purifier to investigate.",
    support: "https://havells.com/",
  },
  "v-guard": {
    subject: "Use the V-Guard purifier label and its own manual",
    paragraphs: [
      "Photograph the complete V-Guard water-purifier model and serial label. Keep its documentation separate from any V-Guard stabilizer, pump or other appliance in your home.",
      "Mention a recent supply interruption, relocation or filter change and describe what happened afterwards. Record any indicator sequence without applying a reset procedure from a different V-Guard product. Confirm the compatible filtration parts for this unit.",
    ],
    example:
      "A V-Guard purifier stops refilling after a water-supply interruption. The purifier model, current supply observations and indicator pattern are more useful than a parts request based on another V-Guard appliance.",
    diagnosticTitle: "Changed after a supply interruption?",
    diagnosticBody:
      "Note when the incoming water returned and whether the purifier resumed filling. Use the manual for your exact purifier and keep electrical covers and internal tubing untouched.",
    support: "https://vguard.com/pages/water-purifier-manual",
  },
  native: {
    subject: "Identify your Native model and existing Urban Company cover",
    paragraphs: [
      "Share the complete Native model, purchase date and service history. Check your Urban Company warranty or service-plan terms before arranging independent work; cover and filter schedules must be confirmed for the actual product.",
      "If your model provides app information, identify that notification separately from the appliance indicators and actual water flow. Keep account credentials private. Share the displayed message and model without granting account access.",
    ],
    example:
      "A Native purifier shows an app notification while water still dispenses. The model, appliance indicator and app-message text help separate a service enquiry from assumptions about the pump or filters.",
    diagnosticTitle: "App notification or appliance warning?",
    diagnosticBody:
      "Describe each message with its source and explain what the purifier actually does. Confirm existing Urban Company support options before approving independent work.",
    support: "https://www.urbancompany.com/native/",
  },
  faber: {
    subject: "Use the Faber purifier model rather than another kitchen appliance",
    paragraphs: [
      "Send the model and serial label from the Faber purifier itself. A Faber chimney or hob invoice cannot identify the purifier's filters, membrane or service requirements.",
      "Keep any purifier maintenance-cover documents and previous replacement records available. Explain whether the complaint is a slow refill, a leak or a control issue, and confirm the exact model's parts and assessment options before arranging a visit.",
    ],
    example:
      "A Faber purifier refills more slowly after an earlier service. The purifier label and replacement record help discuss compatibility without relying on documentation from another Faber kitchen appliance.",
    diagnosticTitle: "Have the purifier service record?",
    diagnosticBody:
      "Keep the last job details and filter specifications with the full purifier model. Confirm whether existing maintenance cover applies before commissioning independent repair.",
    support: "https://faberindia.com/pages/water-purifier-annual-maintenance-contract",
  },
  "zero-b": {
    subject: "Define the Zero B equipment and installation before booking",
    paragraphs: [
      "Share the complete Zero B model and installation type. Explain whether the request is for a household drinking-water purifier or another treatment system so the team can confirm the available scope.",
      "Describe the affected outlet, storage and visible filtration equipment without dismantling it. Include previous service details and whether several outlets are affected. Whole-building or commercial treatment equipment needs an explicit scope discussion.",
    ],
    example:
      "A Zero B installation has reduced flow at one drinking-water outlet. The equipment label and affected-outlet description help establish whether a domestic purifier assessment is the appropriate request.",
    diagnosticTitle: "One outlet or a wider system?",
    diagnosticBody:
      "Identify the actual equipment and affected outlets. Do not assume a household purifier visit covers a commercial or whole-building water-treatment installation.",
    support: "https://www.zerobonline.com/",
  },
  aquafresh: {
    subject: "Identify the Aquafresh supplier and fitted components",
    paragraphs: [
      "Send clear photos of the Aquafresh model label, invoice and previous service record. Include the supplier details shown on your own paperwork so model identity and any existing cover can be checked.",
      "Describe the installed system using its documentation rather than the front-panel name alone. Ask how proposed cartridges, membrane, pump or controls match the fitted specifications; a similar cabinet is not evidence of compatible parts.",
    ],
    example:
      "An Aquafresh purifier needs assessment after a previous filter change, but the old kit details are unclear. Label photos, supplier paperwork and the current symptoms help establish the fitted system before ordering parts.",
    diagnosticTitle: "Which components are actually fitted?",
    diagnosticBody:
      "Keep the label, invoice and previous job details together. Confirm the actual equipment and supplier before selecting replacement parts or relying on a service-cover claim.",
  },
};

export type PurifierBrandPage = WasherBrandPage & { purifierGuidance: Guidance };

export const PURIFIER_DECISION_GUIDANCE = [
  {
    title: "Understand the findings",
    body: "Ask which checks explain the reported flow, leakage or control fault. Confirm whether the proposed work is maintenance, fault repair or both.",
  },
  {
    title: "Compare compatible options",
    body: "Review the full model, fitted filtration system, labour and replacement specifications. A filter set chosen only by brand name may not suit the unit.",
  },
  {
    title: "Agree the next step",
    body: "Consider the condition, parts availability and total estimate before approving work. Discuss existing cover and practical alternatives for the actual appliance.",
  },
];
export const PURIFIER_AFTERCARE_GUIDANCE = [
  {
    title: "Review the agreed checks",
    body: "Ask about refill, dispensing, visible leaks and the original warning. Confirm any flushing or recommissioning instructions for the exact fitted system before using it again.",
  },
  {
    title: "Keep the replacement record",
    body: "Retain filter and part specifications, the service date, findings and receipt. Ask for any written labour or parts terms and how to report a recurring fault.",
  },
  {
    title: "Follow the model guidance",
    body: "Confirm the next service requirements from the exact model and fitted parts. A working outlet or a TDS reading alone does not demonstrate overall water safety.",
  },
];

export const PURIFIER_BRAND_PAGES: PurifierBrandPage[] = PURIFIER_BRANDS.map((brand) => {
  const slug = brand.file.replace(/\.[^.]+$/, "");
  const editorial = EDITORIAL[slug];
  if (!editorial) throw new Error(`Missing purifier editorial: ${slug}`);
  return {
    brand: brand.name,
    slug,
    service: "Water Purifier Service",
    path: `/appliances/repairs/water-purifier-service/${slug}`,
    title: `${brand.name} Water Purifier Repair in Bangalore | Numunix`,
    description: `Independent ${brand.name} water purifier service in Bangalore for slow flow, leaks and operating faults. Discuss model compatibility and an estimate before work.`,
    intro: `Request independent ${brand.name} water purifier assessment in Bangalore. Share the full model, symptoms and service history to discuss compatible parts and the proposed work.`,
    heroIntro: `A clearer next step for your ${brand.name} purifier. Share the model and issue for independent assessment and an estimate before work begins.`,
    modelPrompt: "Purifier model / Serial number",
    modelIntro: editorial.paragraphs[0] ?? "",
    diagnosticTitle: editorial.diagnosticTitle,
    diagnosticBody: editorial.diagnosticBody,
    diagnosticLink: editorial.support
      ? `Visit ${brand.name} official guidance`
      : "Explore repair diagnostics",
    brandSelection: { brand: brand.name },
    enquiryDescription: `${brand.name} water purifier service\nModel / Serial number: \nIssue / Indicator: \nLast filter change: \nBangalore locality: `,
    checks: [
      "Model & filter history",
      "Incoming supply & refill",
      "Dispensing & visible leaks",
      "Relevant operating checks",
    ],
    faults: brandSymptomCards("water-purifier-service", slug),
    estimateChecks: [
      {
        title: "Assessment and access",
        body: "Confirm visit charges, locality coverage and access to the installed unit. Agree whether the request covers maintenance, fault assessment or both.",
      },
      {
        title: "Compatible filtration and parts",
        body: "Ask how each proposed filter, membrane or electrical part matches the full model and fitted system. Confirm specifications, labour and exclusions before approval.",
      },
      {
        title: "Handover and terms",
        body: "Agree relevant operating checks and model-specific flushing instructions. Confirm the expected schedule and any written repair or parts terms for this job.",
      },
    ],
    preparation: [
      `Photograph the ${brand.name} purifier label from a safe position; do not detach a wall-mounted unit for a photo.`,
      "Keep the last service date, filter replacement details and any existing warranty or maintenance-cover documents available.",
      "Record the complete indicator pattern, affected outlet and whether the issue happens during filling or dispensing.",
      "Share the Bangalore locality, preferred timing and access restrictions. Keep the surrounding area accessible without removing covers.",
      "Stop use if water reaches electrics, a burning smell appears or the supply trips. Do not handle wet plugs or bypass protective devices.",
    ],
    faqs: [
      [
        `Is Numunix an authorized ${brand.name} service center?`,
        `No. Numunix provides independent assessment and is not affiliated with or authorized by ${brand.name}. For manufacturer warranty or existing service cover, contact the provider listed on your documents first.`,
      ],
      [`What details do you need for my ${brand.name} purifier?`, editorial.paragraphs[0] ?? ""],
      [
        "Does slow flow always require a new membrane?",
        "No. Describe supply, tank filling and dispensing separately. The proposed remedy should follow assessment of the actual unit rather than a part selected from the symptom alone.",
      ],
      [
        "Can I book a filter replacement?",
        "Share the full model and previous replacement details. Confirm the compatible kit, installation scope, estimate and any required flushing instructions before approving work.",
      ],
      [
        `How much does ${brand.name} purifier repair cost?`,
        "The estimate depends on the model, diagnosis, access, labour and compatible parts. Confirm inspection charges and exclusions before approval. No fixed repair price is quoted on this page.",
      ],
      [
        "Can you assess every model?",
        "Model compatibility, required parts and location coverage need confirmation before booking. Share the equipment label and discuss specialist or commercial installations separately.",
      ],
      [
        "What if I have warranty or a maintenance plan?",
        "Check the terms with your existing provider first. Manufacturer cover, a maintenance plan and independent repair terms are separate, and independent work may affect existing cover.",
      ],
      [
        "What happens after a repair?",
        "Review the agreed operating checks, part specifications and any flushing or recommissioning instructions. Keep the service record and ask for applicable written terms and a process for reporting the same fault.",
      ],
    ],
    sources: editorial.support
      ? [{ name: `${brand.name}: official product and service guidance`, href: editorial.support }]
      : [],
    purifierGuidance: {
      subject: editorial.subject,
      paragraphs: editorial.paragraphs,
      example: editorial.example,
    },
  };
});

export function purifierBrandPage(category: string, service: string, brand: string) {
  if (category !== "appliances" || service !== "water-purifier-service") return undefined;
  return PURIFIER_BRAND_PAGES.find((page) => page.slug === brand);
}
