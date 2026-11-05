import { brandSymptomCards } from "./brand-faults";
import { additionalWasherBrandPages } from "./washer-brand-editorial";
import type { BrandPageEditorial } from "./curated-brand-repair";

// Brand-specific editorial content describes independent service, not manufacturer affiliation.
export const BOSCH_WASHER = {
  brand: "Bosch",
  slug: "bosch",
  modelPrompt: "E-Nr / Model",
  modelIntro: "Whether you have a front-load washer or a washer-dryer, send the E-Nr and any error code. Confirm that your model can be assessed, what the visit involves and whether specialist work or parts are needed.",
  diagnosticTitle: "An E:18 message?",
  diagnosticBody: "Bosch describes E:18, F:18 and d:02 as drainage-related messages. A blocked pump or kinked drain hose can be involved. Photograph the display and note whether water remains in the drum before requesting help.",
  diagnosticLink: "Read Bosch's E:18 guidance",
  service: "Washing Machine Repair",
  path: "/appliances/repairs/washing-machine-repair/bosch",
  title: "Bosch Washing Machine Repair in Bangalore | Numunix",
  description: "Independent Bosch washing machine repair in Bangalore. Get help with drainage, spin, leaks and error codes, with model-specific assessment and clear estimates.",
  intro: "Bosch washing machine repair in Bangalore for drainage problems, interrupted cycles, leaks and unusual noise. Share your model and symptoms for an independent assessment, a clear estimate and the next steps before any repair is approved.",
  brandSelection: { brand: "Bosch" },
  heroIntro: "Get your wash routine back on track. Independent Bosch repair with careful diagnosis and a clear estimate before work begins.",
  enquiryDescription: "Bosch washing machine repair\nE-Nr / Model: \nFD: \nIssue / Error code: ",
  estimateChecks: [
    { title: "Assessment charges", body: "Confirm any visit or inspection charge, what it covers and whether it is separate from the repair estimate." },
    { title: "Proposed work and parts", body: "Ask for the diagnosis, proposed repair, part specifications and labour cost. Confirm model compatibility and availability before approving a replacement." },
    { title: "Timing and aftercare", body: "Agree the expected schedule, function checks and any written terms for the specific work. Ask how to report a recurring fault." },
  ],
  faults: brandSymptomCards("washing-machine-repair", "bosch"),
  checks: ["Model & fault history", "Water inlet & drainage", "Door seal & drum movement", "Cycle & function checks"],
  preparation: [
    "Photograph the rating plate. Include the E-Nr model number and FD production number if visible, without moving a heavy machine alone.",
    "Write down the full display message, when the problem began and which programme was running.",
    "Mention recent installation, a change of detergent, earlier repairs or any visible leak.",
    "Keep the area around the washer accessible. Do not pull it out or disconnect plumbing solely for the booking.",
    "If there is a burning smell, an electrical trip or water near electrics, stop using it. Disconnect power only if it is safe and keep clear of wet sockets.",
  ],
  faqs: [
    ["Is Numunix an authorized Bosch service center?", "No. Numunix provides independent repair assessment and is not affiliated with or authorized by Bosch. For manufacturer warranty work or official support, contact Bosch directly before arranging an independent repair."],
    ["What does E:18 on a Bosch washing machine mean?", "Bosch identifies E:18, F:18 and d:02 as drainage-related messages. Possible causes include a blocked pump or kinked drain hose. The code alone does not identify a failed part; use the instructions for your exact model and arrange assessment if the issue persists."],
    ["Can you assess a Bosch front-load washing machine?", "Share the exact E-Nr model, fault and your location when requesting an assessment. Model compatibility, repair feasibility and parts availability need confirmation before work is arranged. Include washer-dryer details if your appliance also dries clothes."],
    ["How much does Bosch washing machine repair cost?", "The estimate depends on the model, diagnosis, labour and any required parts. Ask for inspection or visit charges, part specifications and exclusions before approving work. There is no fixed repair price quoted on this page."],
    ["Will my washer need a new pump or control board?", "Not necessarily. A symptom can have several causes. Ask what checks support the diagnosis and whether cleaning, adjustment or another repair is appropriate before agreeing to a replacement part."],
    ["Can I book a repair if my machine is under warranty?", "Check your manufacturer warranty terms and contact Bosch official support first. Independent repair may affect warranty eligibility. Share the appliance age and warranty status so you can make an informed choice."],
    ["What should I send when booking?", "Send the model or rating-plate photo, complete error code, a description of the fault and your location. A video of unusual noise or a photo showing where a leak starts can make the initial conversation more useful."],
    ["How long will repair take, and what about warranty?", "Timing depends on diagnosis, access and parts availability. Confirm the expected schedule after assessment. Ask what, if any, warranty applies to the specific labour and parts and request those terms in writing."],
  ],
  sources: [
    { name: "Bosch India: E:18 drainage guidance", href: "https://www.bosch-home.in/service/get-support/e18-in-display" },
    { name: "Bosch India: water supply checks", href: "https://www.bosch-home.in/service/get-support/water-is-not-running" },
    { name: "Bosch India: error codes and model identification", href: "https://www.bosch-home.in/service/get-support/washing-machine-errors" },
    { name: "Bosch India: official support", href: "https://www.bosch-home.in/service/get-support/washing-machines" },
  ],
};

export type WasherBrandPage = typeof BOSCH_WASHER & { editorial?: BrandPageEditorial };

export const GODREJ_WASHER: WasherBrandPage = {
  ...BOSCH_WASHER,
  brand: "Godrej",
  slug: "godrej",
  modelPrompt: "Model / Serial number",
  path: "/appliances/repairs/washing-machine-repair/godrej",
  title: "Godrej Washing Machine Repair in Bangalore | Numunix",
  description: "Independent Godrej washing machine repair in Bangalore. Request model-specific assessment for filling, drainage, spin and wash-cycle problems.",
  intro: "Godrej washing machine repair in Bangalore for interrupted washes, poor spinning, water leaks and drainage problems. Share your model and symptoms to discuss assessment and an estimate before approving work.",
  heroIntro: "Keep laundry day moving. Independent Godrej washing machine repair with a careful assessment and a clear estimate before work begins.",
  brandSelection: { brand: "Godrej" },
  enquiryDescription: "Godrej washing machine repair\nModel / Serial number: \nMachine type: \nIssue / Error code: ",
  modelIntro: "Tell us whether your Godrej washer is semi-automatic, top-loading or front-loading. Include the model from the rating label and explain whether the problem affects washing, draining or spinning. Assessment options and parts need confirmation for your exact appliance.",
  diagnosticTitle: "A cycle cut short?",
  diagnosticBody: "Describe what happened just before the machine stopped: filling, washing, draining or spinning. For a semi-automatic washer, say whether the wash tub, spin tub or both are affected. Photograph any display message rather than guessing which part has failed.",
  diagnosticLink: "Find your Godrej user manual",
  checks: ["Model & machine type", "Water supply & drainage", "Wash & spin behaviour", "Relevant function checks"],
  faults: brandSymptomCards("washing-machine-repair", "godrej"),
  preparation: [
    "Photograph the model and serial-number label if accessible. Do not move a heavy washer alone to find it.",
    "Note whether the machine is semi-automatic, top-loading or front-loading, and which tub or cycle is affected.",
    "Save a photo of the display and describe when the fault occurs. Mention earlier repairs or recent installation.",
    "Keep the appliance area accessible without pulling out the machine or disconnecting plumbing for the booking.",
    "Stop using a machine with a burning smell, electrical tripping or water near electrics. Keep clear of wet sockets.",
  ],
  faqs: [
    ["Is Numunix an authorized Godrej service center?", "No. Numunix offers independent repair assessment and is not affiliated with or authorized by Godrej. Use Godrej official support for manufacturer warranty enquiries."],
    ["Can I request help with a semi-automatic Godrej washer?", "Share the model and say whether the wash tub, spin tub or both are affected. Model compatibility, assessment arrangements and parts availability must be confirmed before work is arranged."],
    ["What about top-load and front-load machines?", "Include the model number, machine type and symptoms when booking. The assessment and proposed work depend on the exact appliance; a brand name alone does not establish repair feasibility."],
    ["What does my Godrej error code mean?", "Photograph the complete code and check the manual for your exact model. Do not apply Bosch or another brand's code definitions to your Godrej machine. A message is a starting point for assessment, not proof that a part needs replacing."],
    ["How much will the repair cost?", "Ask for any assessment charge and a written estimate for the proposed labour and parts. The cost depends on the diagnosis and model; no fixed repair price is quoted here."],
    ["What should I do if my machine is under warranty?", "Check your warranty documents and contact Godrej official support before arranging independent work. Ask how your chosen repair may affect the applicable warranty terms."],
    ["What details help with a booking?", "Send the model, machine type, fault description, display message and location. Mention whether the problem affects washing, draining or spinning, and include any earlier repair history."],
    ["How long will the repair take?", "The schedule depends on assessment, access and parts availability. Confirm timing and any written labour or parts warranty terms for the proposed work before approval."],
  ],
  sources: [
    { name: "Godrej: washing machine user manuals", href: "https://www.godrejenterprises.com/support/appliances/washing-machines/user-manuals-and-catalogues" },
    { name: "Godrej: official washing machine support", href: "https://www.godrejenterprises.com/support/appliances/washing-machines" },
  ],
};

export const WASHER_BRAND_PAGES: WasherBrandPage[] = [BOSCH_WASHER, GODREJ_WASHER, ...additionalWasherBrandPages(GODREJ_WASHER)];
export function washerBrandPage(category: string, service: string, brand: string) {
  if (category !== "appliances" || service !== "washing-machine-repair") return undefined;
  return WASHER_BRAND_PAGES.find(page => page.slug === brand);
}
