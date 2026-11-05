import type { BrandSymptomCopy } from "./types";

export const FRIDGE_SYMPTOMS: BrandSymptomCopy = {
  lg: [
    [
      "Fresh-food cooling changes while the unit runs",
      "Describe the LG fridge and freezer temperatures separately, using observations and selected settings. A compressor or motor feature name does not identify which part, if any, has failed.",
    ],
    [
      "One compartment behaves differently",
      "If your LG model has selectable compartment settings, include the active mode. Distinguish an intended setting from an unexpected cooling change before discussing a repair.",
    ],
    [
      "Ice returns around the same area",
      "Show the LG frost location and door condition without removing covers. Note the time since defrosting or a setting change rather than chipping away ice to investigate.",
    ],
    [
      "Water appears near a fitted dispenser",
      "If your LG has a dispenser or ice maker, identify that feature and the visible water location. Separate it from moisture elsewhere in the cabinet.",
    ],
    [
      "A new sound accompanies an app alert",
      "Describe the LG appliance sound and any connected notification independently. Record when cooling changed so the warning is considered alongside actual operation.",
    ],
    [
      "A control message persists after closing the door",
      "Photograph the LG display and explain whether the door closes normally. Identify visible seal damage without bypassing switches or treating the message as a parts diagnosis.",
    ],
  ],
  samsung: [
    [
      "Cooling changes in a selected mode",
      "Include the Samsung model code and active compartment settings. Describe what became warmer or colder before assuming the selected mode and the operating fault are the same issue.",
    ],
    [
      "Freezer and fresh-food results diverge",
      "For your Samsung, explain which compartment changed first and whether controls were recently adjusted. Identify fitted convertible functions only if documented for the actual model.",
    ],
    [
      "Frost builds after a control change",
      "Record the Samsung frost location, door condition and setting history. Keep the full warning if one appears; do not use another model's reset or defrost procedure.",
    ],
    [
      "Water returns around a particular feature",
      "Identify whether the Samsung water is near a dispenser, an ice-making feature or inside storage. State which features are fitted rather than assuming every model includes them.",
    ],
    [
      "The running pattern changes with a notification",
      "Send the Samsung unit message and app notification separately, if connected features are used. Include the timing of sounds and cooling changes without opening electrical panels.",
    ],
    [
      "An alarm and the door condition disagree",
      "Explain whether your Samsung door visibly closes and which complete message remains. Keep the appliance model code with the enquiry before sensor or control work is proposed.",
    ],
  ],
  whirlpool: [
    [
      "Cooling changes after an extended shutdown",
      "For your Whirlpool, mention the shutdown duration, restart timing and selected settings. Describe each compartment's behaviour rather than assuming a refrigerant refill is needed.",
    ],
    [
      "One section cools while another stays warm",
      "Include the Whirlpool layout and which section changed first. If the appliance has an adjustable compartment, share its actual setting and full model.",
    ],
    [
      "Ice returns after a recent defrost",
      "Describe how quickly frost returns on your Whirlpool and where it appears. Mention door closure and previous work without scraping the lining or applying improvised heat.",
    ],
    [
      "Water collects after defrosting or cleaning",
      "State where water first appears in the Whirlpool and whether the issue follows maintenance. Keep electrical areas dry and leave internal drainage inspection to the assessment.",
    ],
    [
      "An older fridge begins running differently",
      "Share the Whirlpool age, earlier repair record and whether the sound changed gradually. Agree repair feasibility using the actual findings and compatible parts.",
    ],
    [
      "Controls no longer hold the expected setting",
      "Record the Whirlpool control position and any display message. Explain whether cooling changes alongside the controls rather than identifying a replacement board in advance.",
    ],
  ],
  godrej: [
    [
      "Stored food feels warmer in one area",
      "Identify the Godrej model and whether it is a single-door or another layout. Describe the affected storage area and freezer behaviour independently.",
    ],
    [
      "Freezer operation differs from the main cabinet",
      "For your Godrej, note the control setting and whether both areas changed together. A single-door appliance and a separate-compartment model need different scoping details.",
    ],
    [
      "Visible ice returns unusually quickly",
      "Photograph the Godrej ice location and describe recent defrosting and door use. Use only the exact model's permitted care procedure, keeping sharp tools away from the lining.",
    ],
    [
      "Water appears underneath after cleaning",
      "Explain when the Godrej water returns and whether the appliance was moved. Keep the installation history with the enquiry without reaching behind a connected fridge.",
    ],
    [
      "A sound starts after a change of position",
      "Describe the Godrej relocation and whether cooling changed at the same time. Observe from a safe location rather than moving the heavy appliance again to test it.",
    ],
    [
      "The door no longer closes as before",
      "Mention visible obstruction or seal damage on your Godrej and any accompanying alarm. The exact model and door condition help define the inspection before parts are selected.",
    ],
  ],
  haier: [
    [
      "Cooling differs after changing a compartment mode",
      "If your Haier has a selectable compartment, send its active setting and full model. Describe the unexpected result rather than assuming every Haier uses the same modes.",
    ],
    [
      "Only one storage zone is affected",
      "Identify the Haier compartment layout and which zone remains cold. Keep the timing and any recent setting changes together so assessment considers the installed configuration.",
    ],
    [
      "Frost concentrates near an opening",
      "Show the Haier frost location, visible door condition and whether the door closes freely. Do not remove interior panels to check hidden airflow paths.",
    ],
    [
      "Water appears in a storage drawer",
      "For the Haier unit, say where water first collects and whether it returns after wiping. Mention recent cleaning or defrosting without disconnecting internal drains.",
    ],
    [
      "Noise changes when a particular section is used",
      "Describe the Haier sound and which door or operating stage accompanies it. Include cooling observations instead of using the sound alone to choose a component.",
    ],
    [
      "The display returns to an unexpected setting",
      "Photograph the Haier control screen and explain what you selected. Confirm fitted features and exact-model guidance before repeated resets or control changes are attempted.",
    ],
  ],
  bosch: [
    [
      "Cooling changes with an appliance warning",
      "Keep the Bosch full E-Nr, FD if accessible and complete message together. Describe fresh-food and freezer changes separately before interpreting the warning.",
    ],
    [
      "One section stays cold while another warms",
      "Identify the Bosch compartment layout and selected temperatures. A series name or cabinet finish cannot establish the relevant airflow, control or cooling parts.",
    ],
    [
      "Ice returns after a previous intervention",
      "For your Bosch fridge, include the last job details, frost location and time to recurrence. Keep covers in place rather than applying another appliance's defrost instructions.",
    ],
    [
      "Water appears beneath a shelf or drawer",
      "Specify the Bosch storage area where water is first seen and whether it follows cleaning. Do not pull out the heavy unit alone to inspect hidden pipework.",
    ],
    [
      "A new operating sound follows earlier work",
      "Describe the Bosch sound before and after the visit and whether temperatures changed. The full E-Nr and job record help scope the follow-up assessment.",
    ],
    [
      "The door closes but an alarm remains",
      "Record the Bosch alarm and any visible seal issue. Explain whether the appliance was recently installed or moved while avoiding repeated resets of the same warning.",
    ],
  ],
  panasonic: [
    [
      "Cooling declines over time",
      "Share the Panasonic model, age and when cooling began to change. Describe sudden failure separately from a gradual decline and keep previous repair details available.",
    ],
    [
      "The freezer result differs from the cabinet",
      "Give the Panasonic settings and observations for each area. For an older appliance, confirm model-specific assessment and parts options rather than assuming a complete system replacement.",
    ],
    [
      "Frost returns on an older appliance",
      "Note the Panasonic frost location and how it changed since the last defrost. Include door condition without chipping ice or heating the interior to reproduce the issue.",
    ],
    [
      "Water reappears after routine care",
      "For the Panasonic fridge, explain the cleaning or defrost history and where water first returns. Keep the model's own care instructions separate from general online advice.",
    ],
    [
      "A familiar sound becomes louder",
      "Describe the Panasonic running pattern and whether cooling changed with the sound. Ask how inspection findings affect repair feasibility for the actual appliance.",
    ],
    [
      "An older control becomes unreliable",
      "Identify the Panasonic control and any response that remains. Full model information and prior part records are useful before agreeing to a compatible control replacement.",
    ],
  ],
  ifb: [
    [
      "The refrigerator's cooling becomes inconsistent",
      "Use the IFB refrigerator's own model and serial label. Washer or AC documents from the same brand do not identify this appliance's settings or cooling components.",
    ],
    [
      "One compartment changes before the other",
      "Describe the IFB fridge layout and the first affected storage area. Include the active settings and any recent installation work to frame the inspection.",
    ],
    [
      "A patch of frost keeps returning",
      "Photograph the IFB refrigerator's frost pattern and visible door condition. Confirm exact-model care guidance instead of applying instructions from another IFB appliance.",
    ],
    [
      "Water appears following installation",
      "Record the IFB fridge installation date and where water first collects. Describe access without moving the appliance or opening its rear electrical area.",
    ],
    [
      "A new fridge sound accompanies weaker cooling",
      "Identify the IFB refrigerator and describe the sound's timing. Separate cooling observations from noise so assessment does not rely on an assumed failed component.",
    ],
    [
      "The appliance shows an unfamiliar alarm",
      "Send the IFB refrigerator's complete message and control photo. Keep its own model and purchase details available before any reset or control repair is discussed.",
    ],
  ],
  lloyd: [
    [
      "Cooling changes soon after moving the fridge",
      "Include the Lloyd refrigerator model, move history and selected settings. Identify the affected compartment before discussing the appropriate inspection and access arrangements.",
    ],
    [
      "The main cabinet warms while freezing continues",
      "Describe the Lloyd compartments separately and note which changed first. Use the refrigerator label, keeping support details for any Lloyd AC in your home distinct.",
    ],
    [
      "Frost develops around a door area",
      "Record the Lloyd frost location and whether the door closes normally following relocation. Keep the lining and seals undisturbed while describing the symptom.",
    ],
    [
      "Water is visible near the new installation position",
      "State when the Lloyd water appears and whether it comes from inside storage or underneath. Agree safe access rather than reaching behind the connected unit.",
    ],
    [
      "Noise starts after repositioning",
      "Describe the Lloyd installation change and whether the sound is continuous or intermittent. A new location is useful context without establishing the cause of the noise.",
    ],
    [
      "The door or controls change after a move",
      "Explain the Lloyd door closure and control response separately. Provide the fridge model and visible condition before hinges, seals or electrical parts are selected.",
    ],
  ],
  voltas: [
    [
      "Cooling changes on the labelled appliance",
      "Send the complete Voltas refrigerator label, including any additional brand wording. Use its own documents rather than assuming another Voltas appliance has the same service arrangements.",
    ],
    [
      "Stored items warm in one section only",
      "Identify the Voltas fridge compartment layout and settings. Distinguish this household refrigerator enquiry from a freezer or other cooling product with different assessment requirements.",
    ],
    [
      "Ice accumulation changes after servicing",
      "Include the Voltas refrigerator model, prior work and exact frost location. Confirm the relevant care procedure before attempting defrosting based on another product's instructions.",
    ],
    [
      "Water gathers near the cabinet base",
      "Describe the Voltas fridge leak timeline and any installation change. Leave hidden drainage and cooling connections untouched when preparing the enquiry.",
    ],
    [
      "An unfamiliar sound comes from the cooling appliance",
      "Identify the Voltas equipment from its label and describe cooling alongside the sound. Confirm that the actual product is within scope before a visit is arranged.",
    ],
    [
      "A warning appears on the refrigerator controls",
      "Keep the Voltas fridge's full message and purchase or cover documents together. Clarify the actual manufacturer support route shown on those documents before independent work.",
    ],
  ],
  onida: [
    [
      "Cooling drops on a model with limited paperwork",
      "For your Onida fridge, send an accessible rating-label photo and approximate age. Describe settings and both storage areas while model identity and assessment options are confirmed.",
    ],
    [
      "The freezer stays colder than the food section",
      "Explain when the Onida sections began behaving differently and whether door use or settings changed. The brand name alone cannot identify the installed cooling arrangement.",
    ],
    [
      "Frost returns despite recent defrosting",
      "Note the Onida frost location and interval before it returns. Mention visible seal condition and avoid sharp tools, improvised heating or internal cover removal.",
    ],
    [
      "Water reappears without an obvious source",
      "Record where the Onida water is first visible and whether cooling is affected. Earlier repair records can help scope hidden-drainage inspection without dismantling the unit yourself.",
    ],
    [
      "An older fridge develops a different sound",
      "Describe the Onida sound and fault timeline alongside previous repairs. Confirm suitable parts and practical repair options after the actual condition is assessed.",
    ],
    [
      "Door closure or a control becomes intermittent",
      "Identify the Onida function affected and the full model if accessible. Discuss compatibility before approving a generic-looking seal, thermostat or control replacement.",
    ],
  ],
  croma: [
    [
      "Cooling changes on a retailer-labelled fridge",
      "Share the Croma model and invoice details so the exact appliance can be identified. Keep warranty or protection-plan information with the symptom description.",
    ],
    [
      "One storage area no longer performs as before",
      "For your Croma fridge, name the affected compartment and active settings. Confirm the unit's layout rather than relying only on capacity or the front logo.",
    ],
    [
      "A recurring frost patch changes usable space",
      "Photograph the Croma frost location and describe door closure. Mention a recent defrost and allow exact-model guidance to determine permitted care before internal work.",
    ],
    [
      "Water collects after a service-plan visit",
      "Keep the Croma job record and plan documents with the visible leak description. Explain what changed after the visit without assuming the same provider covers independent work.",
    ],
    [
      "A new sound appears while cooling continues",
      "Describe the Croma fridge's sound, timing and any temperature change. Include model and prior service details so the enquiry is not based solely on an unfamiliar noise.",
    ],
    [
      "An alarm appears while existing cover applies",
      "Record the Croma appliance message and door condition. Check the provider named on your cover documents before authorizing an independent control or electrical repair.",
    ],
  ],
};
