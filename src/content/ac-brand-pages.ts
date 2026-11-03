import type { WasherBrandPage } from "./repair-brand-pages";
import { AC_BRANDS } from "./ac-brands";

type Editorial = { subject: string; paragraphs: string[]; example: string; diagnosticTitle: string; diagnosticBody: string; support: string };
// Illustrative enquiry guidance; no manufacturer affiliation or universal model support implied.
const EDITORIAL: Record<string, Editorial> = {
  daikin: {
    subject: "Identify the Daikin system before discussing the fault",
    paragraphs: ["Share the Daikin indoor-unit model and, if safely accessible, the outdoor-unit details. State whether it is a room split AC, window unit or another system. A capacity or series name alone may not identify the equipment or the appropriate assessment scope.", "Record the selected mode, set temperature and whether air moves from the indoor unit. Include a complete warning or controller message. For a multi-unit or centrally controlled system, explain which rooms or units are affected and confirm whether that system can be assessed."],
    example: "A Daikin indoor unit blows air but the room does not cool as expected. The model, selected mode, fault timeline and safely observed outdoor-unit behaviour help frame the request without assuming a refrigerant refill.",
    diagnosticTitle: "Airflow without cooling?", diagnosticBody: "Separate weak airflow from air that moves normally but does not feel cool. Note the operating mode and any controller message. Do not open the outdoor unit or use a code list for a different Daikin system.",
    support: "https://daikinindia.com/contact-us/customer-support-information",
  },
  "blue-star": {
    subject: "Match the Blue Star enquiry to the unit and installation",
    paragraphs: ["Include the full Blue Star model and whether it is a split or window AC. For a split installation, mention outdoor-unit access without climbing or leaning out to photograph it. State whether the complaint concerns one unit or several.", "Describe whether the problem started after installation, cleaning or an earlier repair. Cooling, water leakage and noise should be explained separately. Agree which checks and access arrangements are included before a visit is arranged."],
    example: "A Blue Star split AC starts dripping after a recent service. The indoor model, location of the drip and service history give a clearer starting point than requesting a replacement drain component immediately.",
    diagnosticTitle: "Dripping after a service?", diagnosticBody: "Note where the water first appears and whether it occurs throughout operation or after some time. Mention recent work and access conditions. Keep electrical covers closed and stop using the unit if water reaches electrics.",
    support: "https://consumer.bluestarindia.com/pages/service-support",
  },
  bpl: {
    subject: "Use the BPL appliance label and its own service history",
    paragraphs: ["Photograph the BPL AC model and serial label if reachable safely. State the installation type and approximate age. If paperwork is missing, identify the equipment from its own label rather than assuming another BPL appliance uses the same parts or instructions.", "Explain whether the unit starts, blows air and responds to the remote. Mention any cooling change, water or new sound and when it began. Confirm model compatibility and parts availability before agreeing to repair work."],
    example: "A BPL AC starts and responds to the remote but cooling has changed. A model-label photo, selected mode and description of airflow are more useful than an enquiry based only on the BPL logo.",
    diagnosticTitle: "Have the full BPL model?", diagnosticBody: "Keep the model, installation type and fault timeline together. A front-panel logo or capacity alone is not a parts specification. Use official BPL support for manufacturer cover and confirm independent assessment options for your exact unit.",
    support: "https://www.bpl.in/contact-us",
  },
  godrej: {
    subject: "Describe the Godrej AC mode and the change you noticed",
    paragraphs: ["Share the complete Godrej indoor-unit model and identify a split or window installation. Include the mode and temperature setting when the fault occurs. Describe an unresponsive control separately from a unit that responds but does not cool as expected.", "For a repeating message or shutdown, note how long the unit runs and whether airflow or sound changes beforehand. Mention earlier servicing. Ask which assessment findings support any proposed control, sensor or cooling-system work."],
    example: "A Godrej AC responds to the remote but stops after a short period. Its model, mode, display message and timing help describe the fault without deciding on a control-board replacement in advance.",
    diagnosticTitle: "Starting, then stopping?", diagnosticBody: "Record the interval before shutdown and the complete display message. Include any recent servicing or power interruption. Avoid repeated restarts when the same fault returns.",
    support: "https://www.godrejenterprises.com/support/appliances/air-conditioners/user-manuals-and-catalogues",
  },
  haier: {
    subject: "Separate Haier airflow, cooling and control symptoms",
    paragraphs: ["Include the full Haier model and serial number and whether the unit is split or window type. State the selected mode and describe whether airflow is weak, absent or apparently normal. These observations help define the complaint before internal checks are discussed.", "If you use connected controls, identify an app notification separately from a message on the unit. Mention recent installation or a change in behaviour after servicing. Confirm model and feature coverage rather than assuming every Haier AC has the same controls."],
    example: "A Haier AC reports a notification while airflow continues. The model, appliance display and separate app message help explain the situation without treating the notification as proof of a failed component.",
    diagnosticTitle: "Which control shows the message?", diagnosticBody: "Photograph the unit display and identify any app or remote notification separately. Describe cooling and airflow alongside those messages. Use the full model's instructions before attempting permitted user checks.",
    support: "https://www.haier.com/in/service-support/",
  },
  ifb: {
    subject: "Keep IFB AC details separate from other household appliances",
    paragraphs: ["Use the model and serial label from the IFB air conditioner itself. Include the installation type, selected mode and symptoms. Documents from an IFB washing appliance or another unit should not be used to identify AC parts or codes.", "Say whether the issue is cooling, water leakage, sound or control response. Mention previous work and whether the symptom changed afterwards. Keep earlier job details available so assessment can consider the actual history."],
    example: "An IFB AC has reduced airflow after an earlier repair. The AC's own label, selected setting and previous work record help focus the enquiry instead of relying on a different appliance's model details.",
    diagnosticTitle: "What changed after the last visit?", diagnosticBody: "Describe the original complaint and what is happening now. Include previous work and any recurring message. A clear timeline helps scope assessment without presuming the earlier repair or a particular part is the cause.",
    support: "https://www.ifbappliances.com/support",
  },
  lg: {
    subject: "Use the LG model, not a feature badge, to identify the AC",
    paragraphs: ["Send the full LG AC model and serial label. A dual-inverter or other feature name alone does not identify the system or establish which part has failed. Include mode, settings and whether the complaint is airflow, cooling or intermittent operation.", "If an app provides a message, send it alongside any unit display warning and identify the source. Describe what the AC actually does before the message appears. Keep internal covers closed and confirm the relevant checks before parts are proposed."],
    example: "An LG AC has an app notification and weaker cooling. The model, display photo and airflow observations give a useful request; an inverter badge alone is not a diagnosis of the compressor or board.",
    diagnosticTitle: "A warning with reduced cooling?", diagnosticBody: "Keep the complete warning, model and operating settings together. State whether airflow changed as well. Ask what evidence supports the proposed repair instead of selecting a part from a feature name.",
    support: "https://www.lg.com/in/support/",
  },
  lloyd: {
    subject: "Put Lloyd installation and access details in the enquiry",
    paragraphs: ["Share the Lloyd indoor-unit model and identify a split or window AC. For split units, describe outdoor-unit access from a safe position. Mention a recent installation, relocation or service before arranging inspection.", "If water or noise is the complaint, record where it appears and whether cooling changed at the same time. Keep the purchase and warranty documents available. Confirm any access requirements and the proposed assessment charge before agreeing to a visit."],
    example: "A Lloyd split AC leaks indoors and its outdoor unit is in a restricted position. The model, leak location and access information help plan the assessment without asking you to reach the outdoor unit yourself.",
    diagnosticTitle: "Is the outdoor unit accessible?", diagnosticBody: "Describe its location and any building restrictions. Do not climb or lean out for a photo. Agree access arrangements separately from the fault description so a visit can be scoped realistically.",
    support: "https://havells.com/lloyd/",
  },
  panasonic: {
    subject: "Match Panasonic controls and messages to the exact model",
    paragraphs: ["Include the Panasonic model, serial number and installation type. Photograph complete display messages or indicator behaviour. If a connected control is used, say whether the issue also occurs with the appliance's usual remote.", "Describe what the unit was doing when the problem began and whether it followed a setting change or service. Avoid applying another model's reset procedure or code interpretation. Confirm the exact unit's assessment and parts options first."],
    example: "A Panasonic AC displays a recurring message after starting. Its model, selected mode and complete message make a clearer request than repeated resets with a code definition found for another unit.",
    diagnosticTitle: "A recurring message?", diagnosticBody: "Photograph the full display or explain the indicator sequence. Include the model and selected mode. Do not treat a similar-looking remote or another Panasonic appliance's manual as equivalent.",
    support: "https://www.panasonic.com/in/support.html",
  },
  samsung: {
    subject: "Identify Samsung unit messages and connected controls separately",
    paragraphs: ["Send the full Samsung AC model code and installation type. Photograph the complete unit message and note the operating mode. If an app reports a different notification, identify its source rather than combining both into a shortened error description.", "Explain whether the unit starts, blows air and changes the room's cooling as expected. Mention new noise or water separately. Confirm the features and model that can be assessed before discussing control or cooling-system parts."],
    example: "A Samsung AC responds to a connected control but shows a unit warning. The full model code and both message sources help frame an assessment without assuming the app or the unit's board is at fault.",
    diagnosticTitle: "App alert or unit warning?", diagnosticBody: "Send each message with its source and describe the AC's behaviour at the time. Use the full model code for documentation and assessment. A warning alone is not a replacement-parts order.",
    support: "https://www.samsung.com/in/support/category/home-appliances/",
  },
  voltas: {
    subject: "Use the Voltas AC label and installation history",
    paragraphs: ["Share the complete Voltas AC model and serial label, capacity if known and whether the unit is split or window type. Use the AC's own label and documents when discussing support; another Voltas household appliance may have different service arrangements.", "Mention installation or relocation work, earlier servicing and when cooling changed. State whether the symptom involves airflow, leakage, noise or shutdown. Confirm any existing cover with the provider before authorizing independent repair."],
    example: "A Voltas AC has weaker cooling after relocation. The model, mode, installation history and symptoms give a more useful assessment request than booking a gas refill without checks.",
    diagnosticTitle: "Changed after installation work?", diagnosticBody: "Include when the unit was installed or moved and when the fault first appeared. Describe current settings and airflow. Let assessment establish the appropriate work before approving refrigerant or component replacement.",
    support: "https://www.voltas.com/pages/contact-us",
  },
  whirlpool: {
    subject: "Give the Whirlpool AC cooling complaint a clear timeline",
    paragraphs: ["Include the full Whirlpool AC model, serial label and approximate age. For an older unit, keep previous repair and part details available. Describe the appliance type rather than relying only on a capacity or series name.", "Explain whether cooling declined gradually or changed suddenly, and whether airflow or sound changed as well. Confirm compatible parts and repair feasibility before work is arranged. A unit's age alone does not establish the cause or the best option."],
    example: "An older Whirlpool AC cools less effectively but still starts normally. Its label, service history and description of airflow help compare assessment and repair options without assuming a compressor failure.",
    diagnosticTitle: "A gradual cooling change?", diagnosticBody: "Record the change over time, selected settings and any earlier servicing. Mention new noise or water separately. Ask about the findings and compatible parts before deciding whether repair is practical.",
    support: "https://india.whirlpool.in/customer-care-service",
  },
};

export type ACBrandPage = WasherBrandPage & { acGuidance: { subject: string; paragraphs: string[]; example: string } };

export const AC_AFTERCARE_GUIDANCE = [
  { title: "Review the reported function", body: "Ask which cooling, airflow, drainage or control checks relate to the original complaint. Confirm the settings used and what observation is appropriate after the work. A unit that switches on is not, by itself, evidence that the cooling fault is resolved." },
  { title: "Retain the work record", body: "Keep the findings, approved scope, part details and receipt. Confirm any written labour or parts warranty, exclusions and how to report the same symptom again. Independent repair terms and manufacturer cover are separate." },
  { title: "Follow model-specific care", body: "Use the exact model's guidance for accessible filters and routine care. Keep electrical covers closed and do not attempt refrigerant or pipework work. If water reaches electrics, a burning smell appears or the supply trips, stop use and arrange assessment." },
];

export const AC_BRAND_PAGES: ACBrandPage[] = AC_BRANDS.map(brand => {
  const slug = brand.file.replace(/\.[^.]+$/, "");
  const editorial = EDITORIAL[slug];
  if (!editorial) throw new Error(`Missing AC brand editorial: ${slug}`);
  return {
    brand: brand.name, slug, service: "AC Service & Repair",
    path: `/appliances/repairs/ac-repair/${slug}`,
    title: `${brand.name} AC Repair in Bangalore | Numunix`,
    description: `${brand.name} AC repair in Bangalore for cooling, airflow, leakage and control problems. Discuss model-specific assessment, access and an estimate before work.`,
    intro: `Independent ${brand.name} AC repair in Bangalore. Share the full model, installation type and cooling or operating symptoms to discuss assessment, parts and an estimate before approving work.`,
    heroIntro: `A clearer next step for your ${brand.name} AC. Share the model and symptoms for independent assessment and an estimate before repair work.`,
    modelPrompt: "Indoor / Outdoor model",
    modelIntro: editorial.paragraphs[0] ?? "",
    diagnosticTitle: editorial.diagnosticTitle, diagnosticBody: editorial.diagnosticBody,
    diagnosticLink: `Visit ${brand.name} official support`,
    brandSelection: { brand: brand.name },
    enquiryDescription: `${brand.name} AC repair\nIndoor / Outdoor model: \nAC type: \nIssue / Error code: \nBangalore locality: `,
    checks: ["Model & installation history", "Airflow & cooling observations", "Drainage & visible condition", "Relevant function checks"],
    faults: [
      { title: "AC running but cooling has changed", label: "COOLING", body: `Share the ${brand.name} model, mode, set temperature and when the change began. Explain whether air moves normally or feels weak. Reduced cooling does not establish that refrigerant or a compressor is needed.` },
      { title: "Weak or missing airflow", label: "AIRFLOW", body: "Describe whether the indoor unit starts and whether airflow changes with the selected setting. Mention noise or visible ice without opening covers. Use only the checks permitted by your exact model manual." },
      { title: "Water dripping indoors", label: "DRAINAGE", body: "Record where water first appears and whether it follows installation or cleaning. Stop use if water reaches electrical connections. Do not open panels or disconnect drainage to demonstrate the leak." },
      { title: "A repeating message or shutdown", label: "CONTROLS", body: "Photograph the complete display message and note how long the unit runs before stopping. Identify app notifications separately. Avoid repeated resets to get past a recurring fault." },
      { title: "New noise or vibration", label: "NOISE & INSTALLATION", body: "Note whether the sound comes from indoors or outdoors and when it begins. A safe recording can help. Do not climb, lean out or reach into a running unit to locate the source." },
      { title: "Remote or start-up problems", label: "OPERATION", body: "Explain whether the remote display, unit indicators or both respond. Include the mode and any recent power interruption. Do not bypass protective devices or alter wiring when the AC fails to start." },
    ],
    estimateChecks: [
      { title: "Visit and access scope", body: "Confirm the assessment charge, location coverage and safe access to the indoor and outdoor equipment. Agree any special access arrangements before the visit." },
      { title: "Work, parts and specifications", body: "Ask what findings support the proposal, how parts match the model and which labour and exclusions the estimate includes. Refrigerant work should follow assessment, not an assumption." },
      { title: "Function checks and terms", body: "Agree which checks relate to the reported complaint and confirm any written labour or parts warranty. Ask how a change in scope or cost would be approved." },
    ],
    preparation: [
      `Share the ${brand.name} indoor model and outdoor model if safely accessible. Do not climb or lean out to photograph a label.`,
      "Note operating mode, temperature setting, airflow and the full display message. Mention recent installation or servicing.",
      "Describe outdoor-unit access, building restrictions and the Bangalore locality before arrangements are agreed.",
      "Keep the indoor area accessible without removing electrical covers or disconnecting pipework for the booking.",
      "Stop use for a burning smell, electrical trips or water reaching electrics. Do not attempt refrigerant work or repeated resets.",
    ],
    faqs: [
      [`Is Numunix an authorized ${brand.name} AC service center?`, `No. Numunix provides independent repair assessment and is not affiliated with or authorized by ${brand.name}. For manufacturer warranty work or official service, contact brand support before independent repair.`],
      [`What should I send for my ${brand.name} AC repair?`, editorial.paragraphs[0] ?? ""],
      ["Does weak cooling mean the AC needs a gas refill?", "Not by itself. Ask what checks establish the cause and support any proposed refrigerant work. Refrigerant specification and work requirements depend on the exact appliance. Do not attempt a refill or pipework repair yourself."],
      ["Can I enquire about split, window and inverter ACs?", "Share the full model and installation type. Confirm compatibility, parts and the scope of assessment. Commercial, multi-unit or specialist systems require an explicit scope discussion rather than assumed support."],
      [`How much does ${brand.name} AC repair cost?`, "The model, findings, access, labour and required parts determine the estimate. Confirm assessment charges, specifications and exclusions before approving work. No fixed repair price is quoted here."],
      ["Is routine servicing the same as fault repair?", "A service request and a fault assessment have different scopes. Describe the symptom and ask what cleaning, inspection, testing or repair the proposal includes. Routine cleaning should not be assumed to resolve every cooling or electrical fault."],
      ["Can you reach an outdoor unit on a high ledge?", "Describe the location and building restrictions from a safe position. Confirm access arrangements before booking. Do not climb or lean out to inspect or photograph an outdoor unit yourself."],
      ["How long will the repair take?", "Timing depends on diagnosis, safe access, compatible parts and the checks required. Confirm the expected schedule after assessment. An enquiry or callback request does not establish a completion time."],
      ["What warranty applies after independent work?", "Ask for any written labour or parts warranty for the specific job, including duration, exclusions and reporting process. Manufacturer cover and independent repair terms are separate."],
    ],
    sources: [{ name: `${brand.name}: official appliance support`, href: editorial.support }],
    acGuidance: { subject: editorial.subject, paragraphs: editorial.paragraphs, example: editorial.example },
  };
});

export function acBrandPage(category: string, service: string, brand: string) {
  if (category !== "appliances" || service !== "ac-repair") return undefined;
  return AC_BRAND_PAGES.find(page => page.slug === brand);
}
