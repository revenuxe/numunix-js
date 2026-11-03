// Editorial scoping examples, not completed customer jobs or delivery promises.
const BRAND_GUIDANCE: Record<string, { subject: string; paragraphs: string[]; example: string }> = {
  bosch: {
    subject: "Plan an assessment around your Bosch model",
    paragraphs: [
      "Keep the E-Nr, its full suffix and the FD number with your fault description. A photograph of the rating plate is more useful than a series name alone when discussing the manual and possible parts. Only photograph a label that you can reach without moving the washer unsafely.",
      "Separate a programme that stops with water inside from one that drains but leaves clothes wet. If the door stays locked, include the stage at which the machine stopped. These observations help frame the assessment without treating a display code as a parts order.",
      "For a Bosch washer-dryer, explain whether washing finishes normally before the drying issue begins. Ask which functions the proposed assessment covers, especially if the symptom occurs only during drying or only with a particular programme.",
    ],
    example: "A Bosch washer stops before its final spin and water remains visible. A useful enquiry includes the E-Nr, full display message and whether draining had begun. It leaves the proposed remedy open until the cause has been assessed.",
  },
  godrej: {
    subject: "Describe the Godrej washer you actually use",
    paragraphs: [
      "Start with the complete model and whether the machine is semi-automatic, top-loading or front-loading. A family name or capacity may leave several appliances to choose from. Include the serial label and approximate age when available.",
      "For a twin-tub machine, describe the wash tub and spin tub separately. If one function still works, say so. Explain whether the affected tub does nothing, starts then stops, or makes a new sound; avoid testing with a lid switch bypassed.",
      "For an automatic Godrej washer, note the programme and last completed stage. A problem that appears only after filling needs a different description from one that prevents the machine from starting. Mention earlier repairs and whether the symptom changed afterwards.",
    ],
    example: "A Godrej twin-tub washer washes normally but the spin tub stops early. The model, affected tub and sequence of events provide a clearer starting point than asking for a motor replacement before inspection.",
  },
  haier: {
    subject: "Separate Haier wash and drying symptoms",
    paragraphs: [
      "Send the complete Haier model, serial number and appliance type. Mention whether it is a washer alone or a washer-dryer. A combined appliance can have a complaint that concerns one function while the other still completes normally.",
      "Describe the result of the last programme: water left inside, clothes that remain soaked, or a drying phase that does not finish. Include the selected settings and any display message. Avoid rerunning a leaking or otherwise unsafe appliance just to collect more detail.",
      "Explain whether the issue began after installation, a move or an earlier repair. Confirm that assessment is available for the exact model and ask whether any drying-related inspection is included in the proposed scope.",
    ],
    example: "A Haier washer-dryer completes washing, but the load remains damp after drying. The enquiry should identify the drying programme and result separately from washing, rather than presenting it only as a spin fault.",
  },
  ifb: {
    subject: "Give your IFB fault a clear timeline",
    paragraphs: [
      "Share the full IFB model from the rating label, the programme selected and the display message. Include whether the machine is front-loading or top-loading. Capacity and a product-family name alone may not identify the instructions for your appliance.",
      "If a front-load door stays locked, explain whether washing had finished and whether water remains inside. Do not force the handle. The condition of the machine at the time of the interruption matters more than a guess about the lock or control board.",
      "Mention if the same symptom has already been inspected, adjusted or repaired. Keep any earlier job notes and part details available so the assessment can consider the history instead of starting with an incomplete account.",
    ],
    example: "An IFB washer stops during a programme and the door remains locked. A rating-label photo, display photo and note about retained water help explain the situation without assuming the door lock itself is the cause.",
  },
  lg: {
    subject: "Describe what your LG drum does before it stops",
    paragraphs: [
      "Use the full LG model number rather than a motor or feature badge when requesting a repair. Identify a top-load washer, front-load washer or washer-dryer and include the complete message on the appliance.",
      "For a spin complaint, explain whether washing completes, whether water drains and whether the drum attempts to turn before stopping. Mention the load involved and whether the symptom happens consistently. These details help distinguish the complaint without assuming a motor fault.",
      "If you have an app notification as well as a washer display message, send both and identify where each appeared. For a washer-dryer, explain washing and drying results separately so assessment arrangements match the affected function.",
    ],
    example: "An LG washer drains but interrupts the final spin. The model, display message and description of drum movement make a more useful request than selecting a replacement motor solely from the appliance's badge.",
  },
  panasonic: {
    subject: "Put the Panasonic model and repair history together",
    paragraphs: [
      "Include the full Panasonic model, serial number and approximate age. For an older washer, a legible rating-label photo and previous repair records can help clarify which appliance and which work you are discussing.",
      "Describe whether performance changed gradually or the fault appeared suddenly. Note whether filling, washing, draining or spinning is affected. If there is unusual noise, explain when it starts rather than opening panels to locate it yourself.",
      "Ask about assessment arrangements and compatible parts before committing to a repair. Keep the manufacturer's support information available when comparing official service options, warranty questions and an independent assessment.",
    ],
    example: "An older Panasonic washer takes longer to fill and then stops. The model, approximate age and timing of the interruption help scope an assessment; the age alone does not decide whether a repair is worthwhile.",
  },
  samsung: {
    subject: "Keep the complete Samsung message with the model code",
    paragraphs: [
      "Photograph the full Samsung model code and serial label. Send a clear image of the display so similar-looking letters and numbers are not confused. Include the programme and the stage at which the message appears.",
      "Explain whether the washer takes in water, drains and begins to spin. If a connected app also reports an issue, identify the app message separately. A notification can help describe the sequence without establishing which component needs replacement.",
      "For a combined washer-dryer, say whether the complaint occurs during washing, spinning or drying. Mention any earlier repair, installation change or intermittent behaviour so the assessment conversation covers the actual pattern.",
    ],
    example: "A Samsung washer shows a repeating message during draining. A photo of the exact characters, the full model code and a note about remaining water are useful; repeatedly restarting to clear the message is not a diagnosis.",
  },
  siemens: {
    subject: "Identify your Siemens appliance before discussing parts",
    paragraphs: [
      "Send the complete Siemens E-Nr, including the suffix, and FD number if accessible. Keep a photograph of the rating label rather than relying only on the name on the control panel when discussing documentation and compatibility.",
      "Record the selected programme, last completed stage and full display message. Explain whether water remains or the door is still locked. A visually similar washer or another brand's fault list should not replace instructions for the exact appliance.",
      "If you have a Siemens washer-dryer, describe the affected function explicitly. Ask which checks the assessment covers and how any proposed part is matched to the identified appliance before approving replacement work.",
    ],
    example: "A Siemens washer stops before spinning with water inside. The full E-Nr and display message help frame a drainage assessment while keeping the eventual repair decision dependent on the findings.",
  },
  whirlpool: {
    subject: "Match your Whirlpool enquiry to the affected function",
    paragraphs: [
      "Include the Whirlpool model, serial number and machine type. Describe a semi-automatic twin-tub washer differently from an automatic machine: identify the affected tub for one and the interrupted programme stage for the other.",
      "For a twin-tub washer, say whether washing still works when spinning does not. Describe a tub that will not start separately from one that starts and stops. Do not bypass lid switches or put hands near moving parts to investigate.",
      "For an automatic washer, note any water remaining, repeated display message or change in sound. Mention previous repairs and ask what checks support the proposed work before agreeing to a timer, motor or control replacement.",
    ],
    example: "A Whirlpool twin-tub washer washes normally but the spin tub makes a new sound and stops. The model and separate account of each tub help define the request without turning a symptom into a predetermined parts order.",
  },
};

export function washerRepairGuidance(slug: string) {
  const content = BRAND_GUIDANCE[slug];
  if (!content) throw new Error(`Missing washing machine editorial guidance: ${slug}`);
  return content;
}

export const REPAIR_DECISION_GUIDANCE = [
  { title: "Consider the whole appliance", body: "Discuss the identified fault alongside the washer's condition, earlier repairs and how it serves your household. A relatively new appliance and an older machine with recurring problems may lead to different decisions. Age alone is not a diagnosis, and a repair estimate is more useful when it explains the findings." },
  { title: "Compare the complete costs", body: "Ask for assessment charges, proposed parts, labour and exclusions together. If you are considering replacement, compare the full purchase and installation cost as well as removal arrangements. Avoid deciding from the cheapest advertised part price or an estimate that does not specify the work." },
  { title: "Confirm the practical next step", body: "Consider parts availability, the expected schedule after diagnosis and any written terms for the proposed repair. If a compatible part cannot be confirmed, ask what options remain before approving work. Keep the estimate and your approval together for later reference." },
];

export const REPAIR_AFTERCARE_GUIDANCE = [
  { title: "Review the affected function", body: "Ask how the repaired fault was checked and which relevant wash, fill, drain or spin functions were reviewed. For intermittent faults, describe the original conditions and agree what to watch for during normal use. A brief check and a full programme are different, so confirm what was included." },
  { title: "Keep the job details", body: "Retain the diagnosis, approved work, part details and receipt. Ask for any applicable labour or parts warranty terms in writing, including exclusions and how to report a recurring symptom. Do not assume the same terms apply to every repair or every replacement part." },
  { title: "Follow your model's care instructions", body: "Use the appliance manual for loading, detergent and routine care. If the original symptom returns, note the programme, timing and display message before contacting the repair provider. Stop using the machine if a new leak, burning smell or electrical trip makes continued use unsafe." },
];
