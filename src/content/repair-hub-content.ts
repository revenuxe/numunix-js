import type { RepairService } from "./repair-services";
import { ADDITIONAL_REPAIR_HUBS } from "./additional-repair-hubs";
import { DESKTOP_REPAIR_HUB } from './desktop-repair-page';

type Card = { title: string; body: string };
export type HubCopy = {
  description: string;
  assessmentIntro: string;
  faults: [title: string, label: string, body: string][];
  scope: Card[];
  faqs: [question: string, answer: string][];
};

// Service scope and preparation guidance. Prices, attendance and written cover require job confirmation.
const HUB_COPY: Record<string, HubCopy> = {
  ...ADDITIONAL_REPAIR_HUBS,
  'desktop-repair': DESKTOP_REPAIR_HUB,
  "laptop-repair": {
    description:
      "Laptop repair in Bangalore for display, charging, keyboard, hinge and startup faults. Discuss your model, backup priorities, assessment and repair estimate.",
    assessmentIntro:
      "A laptop that will not start needs a different enquiry from one that starts with a dark screen. Numunix accepts laptop repair enquiries for power, display, input, cooling and storage complaints. Include the complete model, charger details and what still responds. Assessment establishes the proposed work; an enquiry does not authorize a reset, replacement or access to private files.",
    faults: [
      [
        "No power or a missing image",
        "POWER & DISPLAY",
        "Describe lights, fan activity, sounds and any image already observed on an external monitor. Separate a laptop with no response from one that appears to start behind a blank screen. Include the charger used without repeatedly testing a wet or damaged device.",
      ],
      [
        "Charging stops or battery runtime changes",
        "CHARGING",
        "Explain whether the laptop runs on its adapter, battery or neither and include any charging warning. Adapter, connector, battery and internal power faults need different checks; a charge symbol or short runtime alone does not identify the part required.",
      ],
      [
        "Keys, touchpad or connections fail",
        "INPUT & PORTS",
        "Name the affected keys or connection and any dock or accessory involved. Mention liquid exposure and earlier keyboard work. A port problem through a dock should be described separately from the laptop's own connection.",
      ],
      [
        "The hinge or enclosure is damaged",
        "HINGES & FRAME",
        "Show the affected corner and explain any known change in the image or lid movement. Do not repeatedly flex a damaged hinge. A useful estimate identifies mounting or enclosure damage as well as the visible broken part.",
      ],
      [
        "Noise, slowdown or shutdown under load",
        "COOLING & OPERATION",
        "Include the task, approximate time before the symptom and any previous cooling work. Separate an idle shutdown from a problem during a demanding application. Avoid stress tests when heat, swelling or electrical damage makes continued use unsafe.",
      ],
      [
        "Startup stops with files still on the device",
        "STARTUP & STORAGE",
        "Photograph the complete message without private information and state whether a backup exists. Repair, upgrades and data recovery are different scopes. Discuss any reset, reinstall or storage replacement before approval.",
      ],
    ],
    scope: [
      {
        title: "The complete laptop and accessories",
        body: "Use the full product code or model, not only a range name. Identify a convertible, dock or external display where relevant. Compatible panels, input assemblies, chargers and storage options depend on the actual hardware; brand listings do not guarantee support for every variant.",
      },
      {
        title: "A repair scope that includes your data priorities",
        body: "The enquiry form records the reported fault and chosen service. State important unbacked-up files before any software or internal work is discussed. Keep passwords and recovery keys private, and agree access and data-impacting steps separately.",
      },
      {
        title: "Assessment and handover arrangements",
        body: "Include your Bangalore locality and whether the laptop is usable. Confirm how the device and charger would be handed over, assessment charges and any workshop requirement before arrangements are agreed. Review the proposed part, labour, exclusions and relevant function checks together.",
      },
    ],
    faqs: [
      [
        "Does no display mean the motherboard has failed?",
        "No. Explain whether the device powers up, produces sounds or responds to input. The screen, power path and other components may need different checks; the reported symptom is the starting point for assessment, not a diagnosis.",
      ],
      [
        "Can I enquire about an upgrade as well as a repair?",
        "Yes. Identify the current model and the task you want it to handle. Any memory or storage upgrade needs hardware compatibility and a separate discussion of backups, software and the total scope.",
      ],
      [
        "Should I bring the charger?",
        "Include its specification in the enquiry and confirm which accessories are needed for assessment. Mention docks or adapters involved in the fault so the handover covers the relevant setup.",
      ],
      [
        "Will repair preserve my files?",
        "Data retention cannot be guaranteed. Back up accessible files and discuss preservation before reset, reinstallation, storage or board work. Recovery feasibility should be treated as a separate request.",
      ],
    ],
  },
  "cctv-service": {
    description:
      "CCTV repair and installation enquiries in Bangalore for missing video, recording gaps and viewing faults. Discuss models, site access, footage and an estimate.",
    assessmentIntro:
      "CCTV installation, a missing live image and lost recordings are different requests. Numunix accepts enquiries about cameras, recorder operation, cabling and viewing arrangements. Identify the site, camera and recorder models, affected channels and the person authorized to approve access. Describe important existing footage before any storage or configuration change is proposed.",
    faults: [
      [
        "One camera or a group has no image",
        "LIVE VIEW",
        "Identify the missing channels and whether the same gap appears at the local monitor and in remote viewing. Note any shared power or connection route already known. Those details help scope the signal-path assessment before individual cameras are replaced.",
      ],
      [
        "Live images work but recordings are absent",
        "RECORDING",
        "Specify channels and dates and include the full storage warning if visible. A live picture does not establish that recording works. Do not initialize or format storage when existing footage matters; discuss preservation first.",
      ],
      [
        "The app is offline while the site view works",
        "REMOTE ACCESS",
        "Mention router, internet, phone or app changes and whether every authorized user is affected. Keep credentials, verification codes and device QR labels out of the enquiry. Ownership recovery is distinct from camera repair.",
      ],
      [
        "Images are unclear at night or after rain",
        "IMAGE QUALITY",
        "Describe the lighting, glare, obstruction or weather pattern and whether neighbouring cameras differ. Observe from a safe location; do not climb, move the camera or open its enclosure to demonstrate the complaint.",
      ],
      [
        "The recorder restarts or channels drop together",
        "POWER & RECORDER",
        "Note the running interval, warnings and whether cameras remain powered. Shared symptoms may require checks of more than one device. Keep electrical covers closed and coordinate any planned recording interruption.",
      ],
      [
        "A new camera or installation needs scoping",
        "INSTALLATION",
        "Provide camera positions, recording and viewing needs, access restrictions and existing equipment models. A site-specific proposal should identify the agreed equipment, cable route, access work, testing and exclusions before installation is approved.",
      ],
    ],
    scope: [
      {
        title: "Installation and existing-system repair",
        body: "A new installation starts with positions, access and the recording/viewing requirement. Fault repair starts with the existing models and failed function. Identify mixed-brand equipment separately so recorder, camera, connection and power compatibility can be reviewed for the actual system.",
      },
      {
        title: "Authorized site and account access",
        body: "A home owner, building manager or responsible IT contact should coordinate access and approval. Describe high or restricted equipment locations without climbing. Keep passwords and account recovery under the owner's control and confirm any testing access separately.",
      },
      {
        title: "Recording continuity and the completed scope",
        body: "State whether existing footage must be preserved and agree any interruption before work. Repair is separate from footage recovery. Review affected live views, new recording, playback, timestamps and the remote access included in the job; keep the completed-work record.",
      },
    ],
    faqs: [
      [
        "Do I need a new camera when one channel is blank?",
        "Not necessarily. Send the camera and recorder models, affected channel and local/remote observations. Connections, power and recorder inputs may need assessment before a replacement is proposed.",
      ],
      [
        "Is installation covered by the same enquiry?",
        "You can select CCTV Installation & Repair and describe the request. State clearly whether this is a new installation, an addition or a fault. Survey, equipment and access scope need agreement for that site.",
      ],
      [
        "Should I reset or format the recorder first?",
        "Do not do so to demonstrate the issue when recordings or configuration matter. Explain preservation priorities before any reset, storage initialization or replacement is authorized.",
      ],
      [
        "Can you restore access to another person's camera account?",
        "Account recovery must follow the relevant ownership process. Coordinate through the authorized owner or site contact and keep passwords and verification details out of the booking.",
      ],
    ],
  },
  "ac-repair": {
    description:
      "AC service and repair in Bangalore for weak cooling, leaks, airflow and operating faults. Describe the unit, installation and issue for assessment and an estimate.",
    assessmentIntro:
      "An AC service request may concern routine cleaning, a cooling fault, indoor water or an installation change. Describe the actual complaint when contacting Numunix rather than choosing a gas refill or part before inspection. The indoor model, installation type, operating mode and safely observed symptoms establish the starting scope; access and proposed work are confirmed before arrangements are agreed.",
    faults: [
      [
        "Air moves but the room does not cool as expected",
        "COOLING",
        "Include mode, set temperature and whether the change was sudden or gradual. Normal airflow with weak cooling is different from little airflow. The complaint alone does not establish that refrigerant, a compressor or a board needs replacement.",
      ],
      [
        "Airflow becomes weak or stops",
        "AIRFLOW",
        "Describe the fan response at the selected setting and any recent cleaning. Mention visible ice or new sound without opening covers. Confirm whether the request is maintenance, fault assessment or both.",
      ],
      [
        "Water drips from the indoor unit",
        "WATER & DRAINAGE",
        "Record where the first drip appears and how long the unit runs beforehand. Include installation, relocation or cleaning history. Stop use if water reaches electrical connections and do not disconnect a drain to show the leak.",
      ],
      [
        "A warning or shutdown keeps returning",
        "CONTROLS",
        "Photograph the complete display or indicator sequence and identify the controller used. State how long operation lasts and keep app messages separate. Avoid repeated starts to override the same warning.",
      ],
      [
        "A new sound follows installation or service",
        "NOISE",
        "Identify whether it appears indoors or outdoors and whether cooling changed. A safe recording and job history can help frame the assessment without reaching moving parts or an inaccessible outdoor unit.",
      ],
      [
        "Cleaning, relocation or installation is needed",
        "SERVICE SCOPE",
        "Name the requested task, exact unit and access constraints. Cleaning, electrical fault repair, relocation and refrigerant work have different requirements; the agreed proposal should identify what is included for this installation.",
      ],
    ],
    scope: [
      {
        title: "Routine care and fault repair",
        body: "Describe dust or airflow concerns separately from cooling loss, warnings and leakage. A maintenance visit should not be assumed to cure every fault. A proposed part or refrigerant job should follow the relevant assessment and exact unit specification.",
      },
      {
        title: "The system and safe access",
        body: "Include whether the unit is split, window or another arrangement, with indoor model and outdoor details only where safely accessible. Commercial and multi-unit systems need explicit scope confirmation. Describe ledges, building restrictions and permissions without climbing for photographs.",
      },
      {
        title: "Estimate and relevant function checks",
        body: "Before work, agree assessment charges, access arrangements, proposed labour, parts and exclusions. The handover should address the reported cooling, airflow, drainage or control complaint and any limits on the checks completed. Retain the written terms for that job.",
      },
    ],
    faqs: [
      [
        "Does weak cooling mean the AC needs a gas refill?",
        "The symptom alone does not establish that. Include settings, airflow and fault history; the proposed work should be supported by assessment and matched to the unit's specification.",
      ],
      [
        "Is routine AC cleaning the same as fault repair?",
        "No. State whether the request concerns cleaning, poor cooling, water or a warning. The proposal needs to make maintenance, fault checks and any additional repair scope clear.",
      ],
      [
        "What if the outdoor unit is difficult to reach?",
        "Describe its location and building restrictions from a safe position. Access and any special arrangements must be confirmed before work. Do not climb or lean out for a label photo.",
      ],
      [
        "Can I enquire about relocation or an older AC?",
        "Share the full model, current installation and requested change. Confirm assessment feasibility, compatible parts and the proposed installation scope rather than assuming every unit can be relocated or repaired.",
      ],
    ],
  },
  "refrigerator-repair": {
    description:
      "Refrigerator repair in Bangalore for cooling changes, recurring frost, leaks and door or control faults. Share the model and compartment symptoms for assessment.",
    assessmentIntro:
      "A warm fresh-food section, recurring frost and a door alarm need different observations. Numunix accepts refrigerator repair enquiries with the full model, compartment layout, settings and service history. Describe each affected area separately. Cooling loss alone is not a refrigerant or compressor diagnosis, and a repair request does not establish that every fitted feature or configuration is within scope.",
    faults: [
      [
        "Food storage becomes warmer than usual",
        "COOLING",
        "Explain whether the fresh-food section, freezer or both changed and include selected settings. Note recent installation, prolonged shutdown or earlier work. Keep the timeline with the full appliance model before a component is selected.",
      ],
      [
        "The freezer stays cold while the cabinet warms",
        "COMPARTMENTS",
        "Describe each section separately and mention visible ice or a changed airflow sound. If the model has selectable modes, state the active setting. Leave internal covers in place while collecting booking information.",
      ],
      [
        "Frost returns after defrosting",
        "FROST",
        "Photograph the location and note the interval before it returns. Include visible door and seal condition. Follow the exact model's care instructions and do not chip ice, pierce the lining or apply improvised heat.",
      ],
      [
        "Water collects in storage or underneath",
        "WATER",
        "Identify where water first appears and whether it follows cleaning, defrosting or ordinary operation. Name a dispenser or ice maker only if fitted. Keep clear of wet electrical connections instead of reaching behind the appliance.",
      ],
      [
        "The running sound or pattern changes",
        "OPERATION",
        "State whether the sound is new, intermittent or continuous and whether cooling changed as well. Recent movement and earlier part work provide context. A sound alone cannot specify a cooling-system repair.",
      ],
      [
        "The door, alarm or controls behave differently",
        "DOOR & CONTROLS",
        "Include the complete warning and whether the door closes freely. Describe visible seal damage and control changes separately. Do not bypass switches or repeatedly reset a warning that returns.",
      ],
    ],
    scope: [
      {
        title: "Layout and fitted functions",
        body: "Identify single-door, separate freezer or other compartment layouts and the full model. Convertible sections, dispensers and ice-making functions should be stated only where fitted. A cabinet finish or capacity alone does not identify parts or establish support for every feature.",
      },
      {
        title: "Installation and accessible observations",
        body: "Share your Bangalore locality, appliance position and any restricted access. Use label information already accessible without moving a heavy fridge alone. Keep safe compartment and control observations separate from internal diagnosis or refrigerant work.",
      },
      {
        title: "A repair decision based on findings",
        body: "Review the proposed work, compatibility, labour, exclusions and expected follow-up observations before approval. Ask how the original complaint will be checked and keep the findings and job-specific terms. Repair feasibility and compatible parts are confirmed for the actual appliance.",
      },
    ],
    faqs: [
      [
        "Does a warm fridge always need a compressor?",
        "No. Describe settings, each compartment and fault history. The proposed repair should follow assessment; a cooling complaint by itself does not identify a failed compressor or establish refrigerant requirements.",
      ],
      [
        "What if one compartment is still cold?",
        "State which compartment changed first and its selected mode if applicable. Those details help describe the fault without removing covers or assuming another model uses the same controls.",
      ],
      [
        "Should I remove ice before requesting assessment?",
        "Use only the exact model's permitted care procedure. Do not chip ice or use improvised heat. A safe photo of the buildup and its recurrence is useful when preparing the enquiry.",
      ],
      [
        "Can you assess a dispenser or an older refrigerator?",
        "Include the full model and fitted feature or age. Scope, repair feasibility and compatible parts need confirmation; a brand listing does not guarantee coverage of every configuration.",
      ],
    ],
  },
  "water-purifier-service": {
    description:
      "Water purifier service in Bangalore for slow refill, leaks, filter alerts and dispensing faults. Discuss the exact model, compatible kit and assessment before work.",
    assessmentIntro:
      "A filter-service request and a purifier that has stopped dispensing are different starting points. Numunix accepts water purifier enquiries for low flow, leaks, indicators and operating changes. Include the model, last filter work and whether the tank refills or the outlet flow has changed. The exact fitted system determines compatible kits and the scope to confirm before a service or repair is approved.",
    faults: [
      [
        "The tank takes longer to refill",
        "REFILL",
        "Compare current refill with earlier operation and mention supply changes or recent filter work. Slow production can need different checks from a restricted dispensing outlet; a membrane replacement should not be assumed from the symptom alone.",
      ],
      [
        "Stored water dispenses slowly or not at all",
        "DISPENSING",
        "Explain whether the tank fills and which outlet or mode is affected. If the purifier has multiple dispensing functions, describe them separately. Keep the model and complete indicators with the enquiry.",
      ],
      [
        "Water appears near the cabinet or connections",
        "LEAKS",
        "Record the first visible location and whether it occurs during filling, dispensing or while idle. Leave tubing and covers untouched and stop use if water approaches electrical connections.",
      ],
      [
        "A filter or service warning returns",
        "INDICATORS",
        "Photograph the complete pattern and include the previous replacement record. A warning needs the correct model instructions and assessment; clearing an indicator does not establish that the reported issue is resolved.",
      ],
      [
        "Taste or odour changes after service or storage",
        "OUTPUT & HISTORY",
        "Mention source-water changes, time unused and the fitted kit where documented. Confirm appropriate assessment and recommissioning before relying on the output again. Taste, a display or a TDS reading alone does not establish overall water safety.",
      ],
      [
        "A filter change or maintenance visit is due",
        "FILTER SERVICE",
        "Use the appliance label and previous kit details to describe the request. Confirm compatible cartridges, any membrane work, labour and commissioning instructions rather than choosing a universal kit from the brand name.",
      ],
    ],
    scope: [
      {
        title: "Filter maintenance versus fault repair",
        body: "A service request may concern scheduled cartridge work, visible leakage or a system that no longer fills. Identify the treatment type from the appliance documents where known. The proposed work should state whether it is maintenance, a diagnosed repair or both, with the fitted kit specified.",
      },
      {
        title: "Model, installation and existing cover",
        body: "Include the label, supplier and last service record and any manufacturer or maintenance-plan cover. A household purifier visit does not establish support for commercial or whole-building treatment. Confirm scope and access without detaching a wall-mounted or filled appliance for photographs.",
      },
      {
        title: "Parts and commissioning in the estimate",
        body: "Review the exact replacement specification, fitting, relevant leak and operating checks and exclusions. Keep the service date and part record and confirm the model-specific flushing or recommissioning instructions before resuming use. Independent job terms and existing manufacturer cover are separate.",
      },
    ],
    faqs: [
      [
        "Does low flow always require a new membrane?",
        "No. Describe supply, tank refill and dispensing separately. Assessment should support the proposed remedy and establish compatible parts for the installed unit.",
      ],
      [
        "Can I request a filter change rather than a repair?",
        "Yes. Select Water Purifier Service and include the complete model and last kit details. Confirm the compatible specification, labour and any required commissioning instructions before approval.",
      ],
      [
        "Does a normal TDS reading confirm safe drinking water?",
        "A TDS reading alone does not establish overall water safety. Describe the concern and use the exact system's maintenance guidance; do not treat taste or a display value as a substitute for appropriate assessment.",
      ],
      [
        "What if I already have a brand service plan?",
        "Check the provider's actual terms before independent work. Manufacturer support, a maintenance plan and job-specific independent repair terms are separate arrangements.",
      ],
    ],
  },
};

export function repairHubContent(service: RepairService) {
  const copy = HUB_COPY[service.slug];
  return copy
    ? {
        ...copy,
        faults: copy.faults.map(([title, label, body]) => ({ title, label, body })),
        preparation: service.preparation,
      }
    : undefined;
}
export type RepairHubContent = NonNullable<ReturnType<typeof repairHubContent>>;
