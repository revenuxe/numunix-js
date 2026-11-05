import type { BrandRepairAdvice } from "./brand-repair-advice";

export const PURIFIER_REPAIR_ADVICE: BrandRepairAdvice[] = [
  {
    service: "Water Purifier Service",
    slug: "kent",
    decision: {
      title: "What supports another Kent filter replacement?",
      body: "Keep the full model and previous cartridge record with the diagnosis. Confirm whether the fault concerns supply, refill or dispensing and how the proposed part matches the fitted system before approving work.",
    },
    handover: {
      title: "What should I review after Kent purifier work?",
      body: "Review refill and dispensing separately, check the visible area for leaks and retain the fitted part specification. Confirm model-specific flushing instructions and how the original warning was addressed.",
    },
  },
  {
    service: "Water Purifier Service",
    slug: "pureit",
    decision: {
      title: "Does the proposed kit match my Pureit model?",
      body: "Confirm the complete model, replacement-kit specification and indicator history. The agreed work should address the actual warning or flow complaint rather than simply clear a service indicator.",
    },
    handover: {
      title: "Which Pureit functions belong in the handover?",
      body: "Review the original indicator, filling and outlet flow and retain the fitted kit details. Confirm commissioning instructions for the exact purifier rather than applying another Pureit model's procedure.",
    },
  },
  {
    service: "Water Purifier Service",
    slug: "ao-smith",
    decision: {
      title: "Which AO Smith dispensing modes are included?",
      body: "Identify the purifier model and affected outlet or mode. Where several dispensing temperatures are fitted, confirm which functions and compatible components the estimate covers before authorizing work.",
    },
    handover: {
      title: "What should I check on the AO Smith purifier?",
      body: "Review the affected dispensing mode and other functions agreed for testing. Confirm leak checks and commissioning instructions, keeping the purifier record separate from any AO Smith water-heater documents.",
    },
  },
  {
    service: "Water Purifier Service",
    slug: "havells",
    decision: {
      title: "Does the Havells estimate address the observed fault?",
      body: "Match the proposal to the purifier label, first visible leak location and service history. Cabinet finish or tank appearance alone cannot specify the replacement kit or establish the cause of low flow.",
    },
    handover: {
      title: "What belongs in the Havells service record?",
      body: "Retain the original complaint, fitted specifications and agreed refill, dispensing and visible-leak checks. Confirm instructions for resuming use and how to report water at the same location again.",
    },
  },
  {
    service: "Water Purifier Service",
    slug: "v-guard",
    decision: {
      title: "Are these parts for the V-Guard purifier itself?",
      body: "Use the purifier's own label rather than information from another V-Guard appliance. Include supply interruptions and indicators, then confirm that the proposed filtration or electrical work follows the actual findings.",
    },
    handover: {
      title: "Which V-Guard operation should be reviewed?",
      body: "Review filling and outlet flow under the agreed conditions and record indicator behaviour. Keep the fitted parts and care guidance together without borrowing a reset procedure from another product.",
    },
  },
  {
    service: "Water Purifier Service",
    slug: "native",
    decision: {
      title: "What should I confirm before independent Native service?",
      body: "Check the actual Urban Company cover and service-plan terms first. Separate app information from physical refill or dispensing symptoms, confirm model compatibility and keep account credentials outside the enquiry.",
    },
    handover: {
      title: "What should I review after Native purifier work?",
      body: "Review the affected appliance function separately from app information. Retain the independent work record and commissioning instructions without assuming that the original service plan covers the new work.",
    },
  },
  {
    service: "Water Purifier Service",
    slug: "faber",
    decision: {
      title: "Does the Faber proposal use the purifier's service history?",
      body: "Keep the purifier label and maintenance documents available, separating chimney and hob records. Confirm how the fitted kit and proposed work address the current symptom before approving another visit.",
    },
    handover: {
      title: "What should I retain after Faber purifier service?",
      body: "Record filter specifications, the original complaint and agreed flow and leak checks. Confirm flushing guidance and any written job-specific terms separately from an existing maintenance plan.",
    },
  },
  {
    service: "Water Purifier Service",
    slug: "zero-b",
    decision: {
      title: "Is this Zero B installation within the agreed scope?",
      body: "Identify the actual treatment equipment and affected outlets. A domestic purifier enquiry does not establish support for commercial or whole-building treatment equipment; confirm system, access and proposed parts explicitly.",
    },
    handover: {
      title: "Which Zero B equipment and outlets were checked?",
      body: "Retain the equipment list, affected outlet details and completed scope. Review the functions agreed for that installation and confirm remaining limitations, recommissioning instructions and written terms.",
    },
  },
  {
    service: "Water Purifier Service",
    slug: "aquafresh",
    decision: {
      title: "How is the Aquafresh replacement matched to the system?",
      body: "Use the unit label, supplier documents and previous part record to establish compatibility. A similar-looking cabinet or brand-only kit listing does not specify the components fitted to this installation.",
    },
    handover: {
      title: "Which Aquafresh specifications should I keep?",
      body: "Retain cartridge and component details, supplier information where available and the work record. Confirm operating checks and commissioning instructions before resuming use, particularly when earlier part history is incomplete.",
    },
  },
];
