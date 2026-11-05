import type { BrandSymptomCopy } from "./types";

// Possible enquiry scenarios, not brand failure rates or universal feature support.
export const PURIFIER_SYMPTOMS: BrandSymptomCopy = {
  kent: [
    [
      "Tank refills slowly after a filter visit",
      "For your Kent purifier, compare refill time before and after the last service. Include the full model and replacement record so supply and fitted filtration can be assessed together.",
    ],
    [
      "Water appears while the tank fills",
      "Say whether the Kent cabinet leaks during filling or after it stops. Photograph the visible area without detaching the unit or disturbing internal tubes.",
    ],
    [
      "An alarm returns after servicing",
      "Keep the exact Kent indicator or alarm pattern with the previous job details. A service reset and resolution of the underlying warning are separate questions.",
    ],
    [
      "Stored water flows, but refilling stops",
      "Explain whether the Kent outlet dispenses remaining water normally while the tank fails to replenish. Mention a recent supply interruption rather than presuming a pump failure.",
    ],
    [
      "Taste changed after replacement filters",
      "Share the Kent model, fitted cartridge details and when the change began. Ask what model-specific flushing and assessment are required before using the output again.",
    ],
    [
      "The unit keeps running without filling",
      "Describe the Kent operating sound, tank level and any visible discharge already observed. Avoid extended test runs; those observations do not identify a membrane or control fault by themselves.",
    ],
  ],
  pureit: [
    [
      "Dispensing slows before the next kit change",
      "Record the Pureit model, replacement-kit details and whether the tank still fills. A slow outlet needs a different description from a purifier that produces little water.",
    ],
    [
      "Drips begin around the dispensing area",
      "Identify whether your Pureit drips from the outlet or elsewhere on the cabinet. Note if it follows dispensing or continues while idle, keeping covers in place.",
    ],
    [
      "A kit indicator stays on",
      "Send a clear photo of the Pureit indicator and the most recent kit record. Confirm the correct kit for the model before another replacement or reset is proposed.",
    ],
    [
      "Water delivery stops with a warning",
      "Describe the Pureit warning and whether filling or dispensing stopped first. Use the exact model instructions instead of bypassing an alert to restore flow.",
    ],
    [
      "Stored water develops a different odour",
      "Mention how long water stood in the Pureit tank and when it was last serviced. Discuss storage and filtration assessment rather than relying on taste alone.",
    ],
    [
      "Operating behaviour changes after a kit visit",
      "Explain what your Pureit did before the visit and what happens now. Keep the work record so the assessment can consider the fitted kit and the original complaint.",
    ],
  ],
  "ao-smith": [
    [
      "One dispensing mode has reduced flow",
      "If your AO Smith model offers multiple dispensing modes, identify which one is affected. Explain whether the other mode and tank filling still operate normally.",
    ],
    [
      "Water collects beneath the outlet",
      "For your AO Smith purifier, distinguish an outlet drip from water beneath the appliance. Include when it occurs without opening the cabinet or reaching near wet electrics.",
    ],
    [
      "A display message accompanies a dispensing fault",
      "Photograph the complete AO Smith message and name the selected mode. A notification without the model and affected function is insufficient to choose replacement parts.",
    ],
    [
      "The tank fills but an outlet will not respond",
      "Give the full AO Smith purifier model and describe each available outlet separately. Do not use a water-heater model number or assume every purifier has the same controls.",
    ],
    [
      "Water quality seems different in one mode",
      "Describe the change on your AO Smith unit and which dispensing mode you used. Include the last filter service and ask what checks are appropriate for that exact system.",
    ],
    [
      "A new sound occurs during dispensing",
      "Note whether your AO Smith makes the sound while filling, dispensing or changing mode. Leave internal heating and electrical components to the assessment.",
    ],
  ],
  havells: [
    [
      "Refill slows while dispensing remains normal",
      "Separate the Havells tank-filling complaint from the outlet flow. Include the model, last filter replacement and whether the incoming supply changed at the same time.",
    ],
    [
      "A leak follows recent installation work",
      "Say where water first appears on the Havells installation and whether the unit was recently moved or serviced. Do not remove a filled wall-mounted purifier to investigate.",
    ],
    [
      "An indicator changes during filling",
      "Record the Havells display or indicator before and during the interruption, if already observed safely. Include the actual model rather than identifying it by finish or tank appearance.",
    ],
    [
      "The cabinet lights up but no water arrives",
      "Describe your Havells indicators, available incoming supply and whether stored water can still be dispensed. These observations help separate supply and operating symptoms before internal checks.",
    ],
    [
      "Water changes after a long period unused",
      "Mention how long the Havells purifier was idle and its last service date. Confirm the relevant storage, cleaning and recommissioning guidance for the fitted system.",
    ],
    [
      "Filling continues longer than before",
      "Compare the Havells refill pattern with its earlier behaviour and note recent cartridge work. Ask what findings support any proposed flow-control or filtration repair.",
    ],
  ],
  "v-guard": [
    [
      "Flow drops after a supply interruption",
      "Describe the V-Guard purifier's refill and dispensing after incoming water returned. Use the purifier model label, keeping details of a separate V-Guard pump or stabilizer distinct.",
    ],
    [
      "Water appears near the supply connection",
      "Report the visible location on the V-Guard installation and when the leak began. Leave connections undisturbed and stop use if water approaches electrical equipment.",
    ],
    [
      "An unfamiliar indicator sequence appears",
      "Keep a photo of the V-Guard purifier indicators with its full model. A reset procedure for another V-Guard appliance should not be applied to this unit.",
    ],
    [
      "The purifier will not restart filling",
      "Note whether your V-Guard has incoming water and visible indicators following a shutdown. Share the interruption timeline without repeatedly cycling power to override the fault.",
    ],
    [
      "Taste changes after servicing",
      "Include the V-Guard cartridge specification and previous visit record. Confirm that replacements suit the purifier model and ask about the required flushing process.",
    ],
    [
      "The operating sound changes after relocation",
      "Explain where the V-Guard unit was installed and whether filling still completes. A changed sound after a move needs installation context before a component is blamed.",
    ],
  ],
  native: [
    [
      "App information and water flow differ",
      "For your Native model, describe the actual outlet flow separately from app information. Include the appliance indicators without sharing your Urban Company account credentials.",
    ],
    [
      "A leak appears while the unit is idle",
      "Note whether the Native cabinet, outlet or nearby connection is wet and when you first noticed it. Check existing Urban Company cover before commissioning independent work.",
    ],
    [
      "An app notification persists",
      "Send the Native model and the notification text alongside appliance behaviour. Confirm the applicable service-plan terms rather than assuming an alert establishes filter life or a failed part.",
    ],
    [
      "The purifier stops supplying water",
      "Identify whether your Native stopped filling, dispensing or both. Keep purchase and service records available so official cover and independent assessment can be compared.",
    ],
    [
      "Output changes despite a reassuring display",
      "Describe the observed change in Native water output and the last service details. App readings alone should not be treated as confirmation of overall water safety.",
    ],
    [
      "Operation changes after an earlier visit",
      "Explain the original Native complaint, completed work and present symptoms separately. Agree the next assessment scope without resetting the unit or changing account settings solely for the enquiry.",
    ],
  ],
  faber: [
    [
      "Refill is slower after replacement parts",
      "Use the Faber purifier's own model and replacement record to describe the slowdown. Chimney or hob documents cannot establish which purifier cartridge was fitted.",
    ],
    [
      "Water returns beneath the purifier",
      "Record whether the Faber leak follows filling or dispensing and whether it recurs after wiping the area. Do not open the cabinet to trace a hidden connection.",
    ],
    [
      "A service warning recurs",
      "Keep the Faber purifier warning with the previous job sheet and any maintenance-plan documents. Confirm what was replaced before discussing another service or internal repair.",
    ],
    [
      "Dispensing ends before the tank refills",
      "Explain how much stored water your Faber supplies and whether filling resumes. Include recent supply and maintenance changes without ordering a pump from the symptom alone.",
    ],
    [
      "Taste differs since the last filter service",
      "Share the Faber filter specification and service date. Ask how the fitted kit matches the unit and what recommissioning instructions apply before resuming use.",
    ],
    [
      "The unit runs repeatedly between uses",
      "Describe the Faber operating intervals and whether water is being drawn at the time. Existing purifier maintenance cover may be relevant; check the actual documents.",
    ],
  ],
  "zero-b": [
    [
      "One outlet has less flow",
      "Identify the Zero B equipment and whether other connected outlets behave normally. A household purifier request needs a different scope from whole-building treatment equipment.",
    ],
    [
      "A leak is visible around treatment equipment",
      "Specify which Zero B unit or connection is involved and describe it from a safe position. Confirm the installation scope before arranging a domestic purifier assessment.",
    ],
    [
      "A control or warning changes",
      "Photograph the Zero B equipment label and full warning rather than only the logo. Name the affected system and include the last service record.",
    ],
    [
      "Several water points stop together",
      "Explain which outlets depend on the Zero B installation and whether incoming supply remains available. Discuss shared-system access and assessment responsibilities before a visit.",
    ],
    [
      "Water changes at one drinking outlet",
      "Distinguish that Zero B outlet from the rest of the installation and describe the change. Include storage and service history without assuming every treatment stage needs replacement.",
    ],
    [
      "Operation changes after system maintenance",
      "Keep the Zero B equipment list and maintenance record together. Describe the affected function so the team can confirm whether the actual installation is within scope.",
    ],
  ],
  aquafresh: [
    [
      "Flow drops with an unidentified filter set",
      "For your Aquafresh installation, send the unit label and previous filter invoice. Establish the fitted components before choosing a kit from a similar-looking cabinet.",
    ],
    [
      "A connection leaks after earlier work",
      "Describe the Aquafresh leak location and provide the earlier job details if available. The fitted tubing and housing need assessment; do not dismantle them for identification.",
    ],
    [
      "A label or control is difficult to identify",
      "Photograph the Aquafresh appliance label, controls and supplier paperwork without exposing personal information. The front-panel name alone may not establish the required instructions.",
    ],
    [
      "Power indications continue without refill",
      "Explain what your Aquafresh indicators show and whether any stored water dispenses. Share the actual equipment details before agreeing to an electrical or filtration replacement.",
    ],
    [
      "A replacement cartridge changes the output",
      "Keep the Aquafresh replacement packaging or invoice with the model photo. Confirm fitted specifications and commissioning requirements with the assessor rather than relying on a brand-only kit description.",
    ],
    [
      "A previously repaired unit behaves differently",
      "Describe the current Aquafresh complaint alongside the original work and supplier details. Ask which checks establish compatibility when the history of installed parts is unclear.",
    ],
  ],
};
