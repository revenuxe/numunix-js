import type { WasherBrandPage } from "./repair-brand-pages";
import { REFRIGERATOR_BRANDS } from "./refrigerator-brands";
import { FRIDGE_SEARCH_COPY } from "./fridge-repair-details";

type Editorial = {
  subject: string; paragraphs: string[]; example: string;
  diagnosticTitle: string; diagnosticBody: string; support: string;
};

// These are scoping examples, not reported jobs or promises of model/parts availability.
const EDITORIAL: Record<string, Editorial> = {
  bosch: {
    subject: "Keep the full Bosch appliance identity with the cooling complaint",
    paragraphs: ["Include the complete E-Nr and FD details if accessible on the Bosch rating label. A front-panel series name or finish does not identify the exact appliance for a manual or parts enquiry. Photograph the label without pulling out a heavy refrigerator alone.", "Describe the fresh-food and freezer compartments separately. Note the settings, any alarm and whether the issue began after installation or a move. For an appliance fitted into cabinetry, mention the access constraints before a visit is discussed."],
    example: "A Bosch fridge compartment feels warm while the freezer still appears cold. The E-Nr, settings and a separate description of each compartment are more useful than requesting a compressor from the symptom alone.",
    diagnosticTitle: "One compartment warming?",
    diagnosticBody: "Explain whether the refrigerator, freezer or both have changed. Photograph the display and note when an alarm appears. Use instructions for the full E-Nr rather than applying a code list from a different appliance or another refrigerator's manual.",
    support: "https://www.bosch-home.in/service/contact-us",
  },
  godrej: {
    subject: "Identify the Godrej refrigerator and where cooling changed",
    paragraphs: ["Share the Godrej model, serial label and whether the fridge is single-door, double-door or another configuration. Mention whether the complaint concerns the freezer, fresh-food space or water collecting outside. Capacity alone may leave several models to choose from.", "Record when the change began and whether it followed a power interruption, move or previous repair. Include visible frost and door-closing behaviour without removing covers. The aim is to define the assessment before deciding which work is appropriate."],
    example: "A Godrej refrigerator runs but the fresh-food compartment no longer feels as cold. A label photo, compartment description and fault timeline help frame an assessment without assuming that refrigerant must be added.",
    diagnosticTitle: "Running, but not cooling?",
    diagnosticBody: "Describe the difference between the compartments and whether the sound or running pattern has changed. Include the model and any display message. Running sounds alone do not identify a compressor or sealed-system fault.",
    support: "https://www.godrejenterprises.com/support/appliances/refrigerators",
  },
  haier: {
    subject: "Describe each Haier compartment and its selected mode",
    paragraphs: ["Send the complete Haier model and serial number. Identify the affected compartment and include the selected settings or mode shown on the panel. If your model has configurable compartments, explain the intended use rather than assuming every section should behave the same way.", "Mention whether cooling changed suddenly or gradually, and whether doors close normally. Include any alarm, visible frost or water. Confirm the exact model's assessment options before discussing replacement controls or refrigeration work."],
    example: "A Haier multi-compartment fridge has one section that feels warmer than expected. The model, selected mode and location of that section clarify the enquiry before any internal fault is assumed.",
    diagnosticTitle: "Which section changed?",
    diagnosticBody: "Identify the compartment and its selected mode, if applicable. Photograph settings and any message before making repeated changes. Keep the observations separate from a diagnosis of the fan, sensor or cooling system.",
    support: "https://www.haier.com/in/service-support/",
  },
  ifb: {
    subject: "Use the IFB refrigerator label, not another appliance's details",
    paragraphs: ["Include the IFB refrigerator's own model and serial label. If your household also has another IFB appliance, check that the photo and documents belong to the fridge. Identify the compartment affected and whether a control or display behaves differently.", "For visible ice or water, note exactly where it appears and how long it takes to return. Include earlier service notes if the complaint has already been inspected. Ask which checks would be included in the assessment and how any required part would be matched to this model."],
    example: "An IFB fridge has ice collecting in one area while other sections appear unchanged. A model-label photo and the location and recurrence of the ice give a useful starting point for assessment.",
    diagnosticTitle: "Ice or water returning?",
    diagnosticBody: "Record the location and timing of the buildup. Use the manual for this refrigerator, and avoid scraping ice with tools or removing internal panels to investigate. Mention any recent defrosting or prior repair.",
    support: "https://www.ifbappliances.com/support",
  },
  lg: {
    subject: "Separate LG cooling symptoms from a feature badge",
    paragraphs: ["Share the full LG model and serial label rather than relying on an inverter or compressor badge. Explain whether the fridge, freezer or both are affected and include settings, messages and the approximate onset of the fault.", "If an app or diagnostic feature reports a message, identify it separately from what appears on the refrigerator. A message helps describe the fault but does not establish a failed component. Mention ice-making or dispensing issues separately when those features are fitted."],
    example: "An LG fridge has weaker cooling and a notification in an app. The full model and both the notification and compartment observations are useful; the appliance badge alone does not justify replacing a compressor.",
    diagnosticTitle: "A message, or a cooling change?",
    diagnosticBody: "Send a photo of the display and identify any separate app notification. Describe actual compartment behaviour as well. Ask what checks support a proposed repair rather than treating a notification as a parts order.",
    support: "https://www.lg.com/in/support/",
  },
  panasonic: {
    subject: "Bring the Panasonic model and service history together",
    paragraphs: ["Include the complete Panasonic model, approximate age and label photo if accessible. For an older appliance, keep earlier repair notes and part descriptions available. Do not assume that parts are interchangeable with a newer fridge of similar capacity.", "Explain whether the change was sudden or gradual and whether it affects one or both compartments. Ask about compatible parts and the likely scope before arranging work. Manufacturer support remains the source for official service and existing warranty questions."],
    example: "An older Panasonic fridge gradually loses cooling in the fresh-food section. Model details and earlier repair records help compare assessment and repair options without making age alone the deciding factor.",
    diagnosticTitle: "An older fridge to assess?",
    diagnosticBody: "Keep its model, repair history and symptoms together. Confirm assessment arrangements and compatible parts before approving work. A diagnosis should explain the current fault rather than assuming every cooling complaint has the same remedy.",
    support: "https://www.panasonic.com/in/support.html",
  },
  samsung: {
    subject: "Keep Samsung settings and display messages with the model code",
    paragraphs: ["Send the full Samsung model code and serial label. Photograph complete display messages and settings, including the intended compartment mode where relevant. Small differences in letters or suffixes can matter when identifying documentation.", "For a fridge with an ice maker or dispenser, describe that function separately from general cooling. Identify whether an app notification or appliance display is the source of a message. Confirm the relevant model and features before discussing assessment scope."],
    example: "A Samsung fridge shows a message and one compartment is warmer than expected. A display photo, full model and selected compartment mode are more useful than a shortened error description without context.",
    diagnosticTitle: "What does the display show?",
    diagnosticBody: "Photograph all letters and numbers and note which compartment changed. Include any selected mode without repeatedly resetting the controls. A model-specific assessment is needed before recommending a sensor, board or cooling-system part.",
    support: "https://www.samsung.com/in/support/category/home-appliances/refrigerator/",
  },
  whirlpool: {
    subject: "Give Whirlpool cooling and noise complaints a timeline",
    paragraphs: ["Identify the Whirlpool model, serial number and door configuration. Say whether the fresh-food section, freezer or both have changed. Mention any setting changes and whether the refrigerator was recently moved, installed or repaired.", "If the main complaint is sound, describe whether it is new, intermittent or linked to opening a door. A short recording can help explain the report without removing rear panels. Note cooling behaviour alongside the sound rather than assuming a specific component has failed."],
    example: "A Whirlpool fridge makes a new intermittent sound but the freezer appears unchanged. A recording, model label and account of the fresh-food section help describe the scope before parts are proposed.",
    diagnosticTitle: "A new sound with the fault?",
    diagnosticBody: "Describe when it begins and whether cooling changed at the same time. A sound recording is useful context, but it is not proof of a compressor failure. Avoid reaching behind a connected fridge or opening covers to locate the source.",
    support: "https://india.whirlpool.in/customer-care-service",
  },
  onida: {
    subject: "Start an Onida fridge enquiry with a clear appliance identity",
    paragraphs: ["Photograph the Onida refrigerator model and serial label if accessible and mention its approximate age. If documents are missing, a photo of the appliance and label can help identify the equipment without guessing from the logo or cabinet colour.", "Describe the cooling change, visible frost or water and whether the door closes normally. Include any prior repair. Compatibility, assessment options and parts availability need confirmation for this exact model before work is arranged."],
    example: "An Onida fridge has a recurring water patch and its paperwork is missing. The label, appliance photo and location of the water provide a clearer request than choosing a part from the brand name alone.",
    diagnosticTitle: "Missing the paperwork?",
    diagnosticBody: "Send an accessible label photo and a description of the problem. Do not move a heavy fridge alone to find a serial number. Confirm the model before using troubleshooting instructions or approving a replacement part.",
    support: "https://onida.com/contact-us/",
  },
  lloyd: {
    subject: "Match the Lloyd fridge to its own settings and documents",
    paragraphs: ["Include the full Lloyd refrigerator model, serial number and compartment layout. Mention whether the display, cooling or door behaviour has changed. Keep the purchase paperwork available when discussing existing manufacturer or extended cover.", "If the problem began after a move, include that history without trying to reposition or dismantle the fridge for the booking. Confirm local access, assessment scope and model compatibility before agreeing to work or parts."],
    example: "A Lloyd fridge has weaker cooling after a recent move. The model, timing and condition of both compartments help explain the enquiry without assuming a refrigerant or compressor fault.",
    diagnosticTitle: "Changed after a move?",
    diagnosticBody: "Share when the appliance was moved and when you first noticed the issue. Include settings and compartment observations. Follow the exact model's installation guidance rather than applying a universal restart instruction.",
    support: "https://havells.com/lloyd/",
  },
  voltas: {
    subject: "Use the full name and model on your Voltas refrigerator label",
    paragraphs: ["Send the full model and brand wording from the rating label, including Beko if it appears on your appliance. The supplied Voltas logo identifies your enquiry; it does not replace the model identity needed to discuss manuals, cover or compatible parts.", "Describe the fresh-food and freezer compartments separately and include any selected mode, warning or visible ice. Ask about the assessment scope for the exact model. Existing manufacturer cover should be checked before independent work is authorized."],
    example: "A fridge labelled Voltas Beko has one compartment that feels warm. The full label, selected mode and separate compartment observations help define an assessment without treating every Voltas appliance as identical.",
    diagnosticTitle: "What is on the rating label?",
    diagnosticBody: "Include the complete model and brand wording, not just the front logo. Share the relevant compartment settings and symptoms. This helps discuss model-specific guidance and avoids selecting parts for a different appliance.",
    support: "https://www.voltasbeko.com/telephone",
  },
  croma: {
    subject: "Distinguish a Croma-branded fridge from a fridge bought at Croma",
    paragraphs: ["Choose Croma when it is the brand printed on your refrigerator's rating label. If you bought another manufacturer's fridge from a Croma store, use that appliance brand instead. A retailer name on an invoice is not always the equipment brand.", "Include the actual model, serial label and a description of the compartments affected. Keep the invoice and any protection-plan documents available to check existing cover. Model compatibility and parts must be confirmed before an independent repair is arranged."],
    example: "A Croma-branded refrigerator no longer cools evenly. The appliance label and fault description identify the request. If the label names a different manufacturer, the enquiry should follow that brand even when the purchase invoice is from Croma.",
    diagnosticTitle: "Croma brand, or Croma purchase?",
    diagnosticBody: "Check the appliance label and use the equipment brand and model in your enquiry. Mention separately where it was purchased and any existing cover. This keeps assessment and parts discussions tied to the correct refrigerator.",
    support: "https://www.croma.com/faq",
  },
};

export type FridgeBrandPage = WasherBrandPage & {
  guidance: { subject: string; paragraphs: string[]; example: string };
};

export const FRIDGE_AFTERCARE_GUIDANCE = [
  { title: "Review the affected compartment", body: "Ask which checks were completed and how cooling performance should be observed after the work. Confirm any model-specific settling or observation period with the repair provider. An interior light or a running sound alone does not establish that cooling has recovered." },
  { title: "Keep the repair details", body: "Retain the findings, approved work, part descriptions and receipt. Confirm any applicable labour or parts warranty and its exclusions in writing. Ask how to report the original symptom returning and what information to provide." },
  { title: "Follow the appliance manual", body: "Use the exact model's guidance for settings, loading, cleaning and defrosting. Do not chip ice with tools, open electrical covers or attempt work on refrigerant pipework. Report a recurring warning or cooling change with its timing and settings." },
];

export const FRIDGE_BRAND_PAGES: FridgeBrandPage[] = REFRIGERATOR_BRANDS.map(brand => {
  const slug = brand.name.toLowerCase();
  const editorial = EDITORIAL[slug];
  const searchCopy = FRIDGE_SEARCH_COPY[slug];
  if (!editorial || !searchCopy) throw new Error(`Missing refrigerator editorial: ${slug}`);
  return {
    brand: brand.name, slug, service: "Refrigerator Repair",
    path: `/appliances/repairs/refrigerator-repair/${slug}`,
    title: `${brand.name} Fridge Repair in Bangalore | Numunix`,
    description: searchCopy.description,
    intro: `${brand.name} fridge repair in Bangalore for cooling changes, frost buildup, leaks and unusual sounds. Share the full model and symptoms for an assessment and an estimate before approving work.`,
    heroIntro: searchCopy.hero,
    modelPrompt: slug === "bosch" ? "E-Nr / FD" : "Model / Serial number",
    modelIntro: editorial.paragraphs[0] ?? "",
    diagnosticTitle: editorial.diagnosticTitle, diagnosticBody: editorial.diagnosticBody,
    diagnosticLink: `Visit ${brand.name} official support`,
    brandSelection: { brand: brand.name },
    enquiryDescription: `${brand.name} fridge repair\nModel / Serial number: \nFridge type: \nAffected compartment / Issue: \nBangalore locality: `,
    checks: ["Model & compartment symptoms", "Door closure & visible frost", "Controls & cooling observations", "Relevant function checks"],
    faults: [
      { title: "Fridge not cooling as expected", label: "COOLING", body: `Explain whether the fresh-food section, freezer or both have changed on your ${brand.name} fridge. Include settings, timing and any display message. Reduced cooling alone does not prove that refrigerant or a compressor is needed.` },
      { title: "Freezer cold, fridge section warm", label: "COMPARTMENTS", body: "Describe each section separately and mention any visible ice or change in airflow. If a model has selectable compartment modes, include the selected setting. Keep internal covers in place while collecting information." },
      { title: "Frost or ice keeps returning", label: "FROST & DEFROST", body: "Photograph where the buildup appears and note how quickly it returns. Mention the door condition and any recent defrosting. Follow the model manual; never chip ice with sharp tools or apply improvised heat." },
      { title: "Water collecting inside or outside", label: "WATER & LEAKS", body: "Record where water first appears and whether it recurs after cleaning or normal use. Mention an ice maker or dispenser if fitted. Keep clear of water near plugs and do not open panels to trace the source." },
      { title: "A new sound or running pattern", label: "NOISE & OPERATION", body: "Describe whether the sound is new, constant or intermittent and whether cooling changed at the same time. A short recording helps explain the complaint without moving the fridge or reaching behind it while connected." },
      { title: "Door, alarm or display problems", label: "SEALS & CONTROLS", body: "Share a photo of the full display message and explain whether the door closes normally. Mention visible seal damage or a light that behaves differently. Do not bypass switches, alter wiring or repeatedly reset a recurring warning." },
    ],
    estimateChecks: [
      { title: "Assessment arrangements", body: "Confirm the inspection charge, location coverage, access requirements and which checks are included before a visit is agreed." },
      { title: "Parts and proposed work", body: "Ask what findings support the repair, how the part matches your full model and what labour, specifications and exclusions the estimate covers." },
      { title: "Cooling checks and aftercare", body: "Agree the relevant post-repair checks, observation guidance and any written terms for the specific work. Do not assume the same warranty applies to every repair." },
    ],
    preparation: [
      `Photograph the ${brand.name} rating label if accessible. Do not pull out a heavy refrigerator alone to find it.`,
      "Describe the fresh-food and freezer compartments separately. Include settings, display messages and when the change began.",
      "Mention recent installation, a move, power interruptions or earlier repairs, and share the previous job details if available.",
      "Keep the area accessible without disconnecting pipework or removing panels. Mention cabinetry, stairs and access restrictions.",
      "Do not attempt refrigerant work, chip ice with tools or handle wet electrical connections. Avoid repeated resets when a fault returns.",
    ],
    faqs: [
      [`Is Numunix an authorized ${brand.name} fridge service center?`, `No. Numunix provides independent repair assessment and is not affiliated with or authorized by ${brand.name}. Contact official brand support for manufacturer warranty work and check existing cover before independent repair.`],
      [`What details should I send for my ${brand.name} fridge?`, editorial.paragraphs[0] ?? ""],
      ["Does poor cooling mean the fridge needs a gas refill?", "Not by itself. Ask what checks establish the cause and support any proposed sealed-system work. Refrigerant type and work requirements depend on the appliance. Do not attempt a refill or pipework repair yourself."],
      ["Can I enquire about single-door, double-door or side-by-side models?", "Send the full model and configuration. Mention separate compartments, configurable modes, an ice maker or a dispenser if fitted. Assessment scope, model compatibility and parts availability require confirmation."],
      [`How much does ${brand.name} fridge repair cost?`, "The model, identified fault, labour and any parts determine the estimate. Confirm assessment charges, part specifications and exclusions before approval. No fixed repair price is quoted on this page."],
      ["Can the repair be completed at home?", "Share the locality, fault and access details to discuss the visit. Some assessment or repair may be possible at your premises; specialist checks or work may require a different arrangement. Confirm the scope before booking."],
      ["How long will cooling take to recover after work?", "Ask for guidance for the model and work completed, including how and when to observe the affected compartment. A light or a running sound alone does not confirm recovered cooling. Do not rely on a universal recovery time."],
      ["Should I repair or replace my fridge?", "Compare the findings and complete estimate with the appliance condition, service history, parts availability and replacement arrangements. Age or a cooling symptom alone should not decide which option is practical."],
      ["What warranty applies to an independent repair?", "Confirm any written labour or parts warranty for the specific job, including duration, exclusions and how to report a recurring fault. Manufacturer cover and independent repair terms are separate."],
    ],
    sources: [{ name: `${brand.name}: official appliance support`, href: editorial.support }],
    guidance: { subject: editorial.subject, paragraphs: editorial.paragraphs, example: editorial.example },
  };
});

export function fridgeBrandPage(category: string, service: string, brand: string) {
  if (category !== "appliances" || service !== "refrigerator-repair") return undefined;
  return FRIDGE_BRAND_PAGES.find(page => page.slug === brand);
}
