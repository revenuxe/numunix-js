import type { RepairCategory, DeviceKind } from "./homepage-repairs";

export type RepairService = {
 slug: string; category: RepairCategory; name: string; kind: DeviceKind;
 headline: string; accent: string; intro: string;
 faults: string[]; checks: string[]; preparation: string[];
};

export const REPAIR_PAGES: RepairService[] = [
  {
    "slug": "mobile-repair",
    "category": "electronics",
    "name": "Mobile Repair",
    "kind": "phone",
    "headline": "Mobile repair.",
    "accent": "Stay connected.",
    "faults": [
      "Cracked screen or unresponsive touch",
      "Battery draining or phone switching off",
      "Loose charging port or no charge",
      "Camera, microphone or speaker faults"
    ],
    "checks": [
      "Display and touch response",
      "Battery condition and charging path",
      "Camera, microphone and speaker checks"
    ],
    "preparation": [
      "Back up accessible photos and contacts",
      "Share the phone model and any liquid exposure",
      "Remove SIM and memory cards before handover"
    ],
    "intro": "Mobile Repair in Bangalore. Describe the model and symptoms, review the assessment and estimate, and agree on the work before repairs begin."
  },
  {
    "slug": "laptop-repair",
    "category": "electronics",
    "name": "Laptop Repair",
    "kind": "laptop",
    "headline": "Laptop repair.",
    "accent": "Back to work.",
    "faults": [
      "No power or no display",
      "Overheating, fan noise or sudden shutdowns",
      "Damaged hinges, keys or charging socket",
      "Slow storage or upgrade requirements"
    ],
    "checks": [
      "Power supply and board assessment",
      "Cooling, keyboard and display checks",
      "Storage health and upgrade compatibility"
    ],
    "preparation": [
      "Back up important files if the laptop starts",
      "Bring the charger and describe when the fault occurs",
      "Discuss data access before sharing passwords"
    ],
    "intro": "Laptop Repair in Bangalore. Describe the model and symptoms, review the assessment and estimate, and agree on the work before repairs begin."
  },
  {
    "slug": "cctv-service",
    "category": "electronics",
    "name": "CCTV Installation & Repair",
    "kind": "cctv",
    "headline": "CCTV care.",
    "accent": "A clearer view.",
    "faults": [
      "Camera offline or intermittent picture",
      "Recorder not saving footage",
      "Night view or image quality problems",
      "New camera installation or remote-view setup"
    ],
    "checks": [
      "Camera power, cable and signal checks",
      "DVR or NVR storage and recording settings",
      "Network and remote-view configuration"
    ],
    "preparation": [
      "Share camera count and recorder model",
      "Describe the areas needing coverage",
      "Confirm safe access to cameras and the recorder"
    ],
    "intro": "CCTV Installation & Repair in Bangalore. Describe the model and symptoms, review the assessment and estimate, and agree on the work before repairs begin."
  },
  {
    "slug": "tv-audio-repair",
    "category": "electronics",
    "name": "TV & Audio Repair",
    "kind": "tv",
    "headline": "TV & audio repair.",
    "accent": "Picture. Sound. Life.",
    "faults": [
      "Sound without a picture",
      "Flickering display or backlight issues",
      "No power or repeated restarting",
      "Speaker, soundbar or input faults"
    ],
    "checks": [
      "Power board and backlight assessment",
      "HDMI and input-signal checks",
      "Speaker and sound-output testing"
    ],
    "preparation": [
      "Share the model and screen size",
      "Describe whether sound or the picture still works",
      "Keep the remote and power cable available"
    ],
    "intro": "TV & Audio Repair in Bangalore. Describe the model and symptoms, review the assessment and estimate, and agree on the work before repairs begin."
  },
  {
    "slug": "tablet-repair",
    "category": "electronics",
    "name": "Tablet & iPad Repair",
    "kind": "tablet",
    "headline": "Tablet repair.",
    "accent": "Create again.",
    "faults": [
      "Cracked display or touch problems",
      "Battery drain or charging faults",
      "Wi-Fi or audio issues",
      "Damaged charging socket or buttons"
    ],
    "checks": [
      "Screen, touch and button checks",
      "Charging path and battery assessment",
      "Wi-Fi, camera and audio testing"
    ],
    "preparation": [
      "Back up accessible files and drawings",
      "Share the tablet model and damage history",
      "Discuss account access before repair"
    ],
    "intro": "Tablet & iPad Repair in Bangalore. Describe the model and symptoms, review the assessment and estimate, and agree on the work before repairs begin."
  },
  {
    "slug": "data-recovery",
    "category": "electronics",
    "name": "Data Recovery",
    "kind": "drive",
    "headline": "Data recovery.",
    "accent": "Your files matter.",
    "faults": [
      "Drive not detected",
      "Unreadable files or storage errors",
      "Accidentally deleted data",
      "Storage failure after impact or liquid exposure"
    ],
    "checks": [
      "Storage condition and fault assessment",
      "Recovery feasibility and scope review",
      "Recovered-file verification where possible"
    ],
    "preparation": [
      "Stop using the affected drive",
      "Do not repeatedly power on a damaged device",
      "List the files that matter most"
    ],
    "intro": "Data Recovery in Bangalore. Describe the model and symptoms, review the assessment and estimate, and agree on the work before repairs begin."
  },
  {
    "slug": "console-repair",
    "category": "electronics",
    "name": "Gaming Console Repair",
    "kind": "console",
    "headline": "Console repair.",
    "accent": "Back in play.",
    "faults": [
      "No power or overheating",
      "No HDMI picture or damaged port",
      "Fan noise or unexpected shutdowns",
      "Storage and connectivity problems"
    ],
    "checks": [
      "Power and cooling assessment",
      "HDMI port and display-output checks",
      "Storage and connection testing"
    ],
    "preparation": [
      "Share the console model and symptoms",
      "Bring the power adapter if requested",
      "Back up game saves where possible"
    ],
    "intro": "Gaming Console Repair in Bangalore. Describe the model and symptoms, review the assessment and estimate, and agree on the work before repairs begin."
  },
  {
    "slug": "doorstep-repair",
    "category": "electronics",
    "name": "Doorstep Electronics Service",
    "kind": "laptop",
    "headline": "Doorstep repairs.",
    "accent": "Care comes to you.",
    "faults": [
      "Devices that need an initial assessment at home",
      "Multiple laptops or screens needing checks",
      "CCTV faults at the installed location",
      "Pickup or workshop handover requirements"
    ],
    "checks": [
      "Model and symptoms reviewed before a visit",
      "On-site fault assessment where practical",
      "Workshop requirements explained before handover"
    ],
    "preparation": [
      "List the devices and location",
      "Confirm access and a suitable work area",
      "Ask which work can be done on site"
    ],
    "intro": "Doorstep Electronics Service in Bangalore. Describe the model and symptoms, review the assessment and estimate, and agree on the work before repairs begin."
  },
  {
    "slug": "washing-machine-repair",
    "category": "appliances",
    "name": "Washing Machine Repair",
    "kind": "washer",
    "headline": "Washing machine",
    "accent": "repair, with care.",
    "faults": [
      "Water not draining or filling",
      "Drum not spinning or unusual noise",
      "Leaks around hoses or the door",
      "Control errors or stopped cycles"
    ],
    "checks": [
      "Inlet, drainage and hose checks",
      "Drum, motor and control assessment",
      "Wash-cycle and leak testing"
    ],
    "preparation": [
      "Share the model and displayed error code",
      "Keep the appliance accessible",
      "Avoid running repeated cycles with a leak"
    ],
    "intro": "Washing Machine Repair in Bangalore. Describe the model and symptoms, review the assessment and estimate, and agree on the work before repairs begin."
  },
  {
    "slug": "ac-repair",
    "category": "appliances",
    "name": "AC Service & Repair",
    "kind": "ac",
    "headline": "AC service & repair.",
    "accent": "Comfort returns.",
    "faults": [
      "Weak cooling or uneven airflow",
      "Water leaking from the indoor unit",
      "Unusual noise or odour",
      "Unit not starting or control faults"
    ],
    "checks": [
      "Filter, coil and airflow inspection",
      "Cooling and leak assessment",
      "Drainage and electrical-control checks"
    ],
    "preparation": [
      "Share unit type and model",
      "Describe when cooling or leakage changes",
      "Confirm access to indoor and outdoor units"
    ],
    "intro": "AC Service & Repair in Bangalore. Describe the model and symptoms, review the assessment and estimate, and agree on the work before repairs begin."
  },
  {
    "slug": "refrigerator-repair",
    "category": "appliances",
    "name": "Refrigerator Repair",
    "kind": "fridge",
    "headline": "Refrigerator repair.",
    "accent": "Keep your cool.",
    "faults": [
      "Fridge or freezer not cooling",
      "Excess frost or water collecting",
      "Damaged door seals",
      "Unusual compressor noise or control faults"
    ],
    "checks": [
      "Temperature and cooling assessment",
      "Door seals, frost and drainage checks",
      "Compressor and control diagnosis"
    ],
    "preparation": [
      "Share the model and affected compartment",
      "Describe recent temperature changes",
      "Keep perishable food in safe alternative storage"
    ],
    "intro": "Refrigerator Repair in Bangalore. Describe the model and symptoms, review the assessment and estimate, and agree on the work before repairs begin."
  },
  {
    "slug": "microwave-repair",
    "category": "appliances",
    "name": "Microwave & Chimney Repair",
    "kind": "microwave",
    "headline": "Microwave repairs.",
    "accent": "Kitchen, back on.",
    "faults": [
      "Microwave not heating",
      "Turntable or controls not responding",
      "Door-interlock or power faults",
      "Chimney suction or motor problems"
    ],
    "checks": [
      "Controls and door-interlock checks",
      "Heating and turntable assessment",
      "Chimney motor and suction checks where relevant"
    ],
    "preparation": [
      "Share the model and symptoms",
      "Do not open the appliance casing",
      "Keep the plug and installation accessible"
    ],
    "intro": "Microwave & Chimney Repair in Bangalore. Describe the model and symptoms, review the assessment and estimate, and agree on the work before repairs begin."
  },
  {
    "slug": "water-purifier-service",
    "category": "appliances",
    "name": "Water Purifier Service",
    "kind": "purifier",
    "headline": "Purifier service.",
    "accent": "Restore the flow.",
    "faults": [
      "Low flow or no water output",
      "Leaks near fittings or filters",
      "Pump not starting",
      "Filter or membrane service requirements"
    ],
    "checks": [
      "Filter and membrane condition review",
      "Pump, supply and flow checks",
      "Connections and leak testing"
    ],
    "preparation": [
      "Share purifier model and last service details",
      "Describe any change in water flow",
      "Keep inlet and filter housing accessible"
    ],
    "intro": "Water Purifier Service in Bangalore. Describe the model and symptoms, review the assessment and estimate, and agree on the work before repairs begin."
  },
  {
    "slug": "inverter-ups-repair",
    "category": "appliances",
    "name": "Inverter & UPS Repair",
    "kind": "inverter",
    "headline": "Inverter & UPS care.",
    "accent": "Power your day.",
    "faults": [
      "Reduced battery backup",
      "Unit not charging or switching over",
      "Unexpected alarms or shutdowns",
      "Damaged terminals or connection faults"
    ],
    "checks": [
      "Battery and charging-system assessment",
      "Connection and load checks",
      "Backup and changeover testing"
    ],
    "preparation": [
      "Share the model and battery details",
      "Describe connected equipment and alarms",
      "Do not touch exposed or damaged terminals"
    ],
    "intro": "Inverter & UPS Repair in Bangalore. Describe the model and symptoms, review the assessment and estimate, and agree on the work before repairs begin."
  },
  {
    "slug": "fan-light-repair",
    "category": "appliances",
    "name": "Fan & Lighting Service",
    "kind": "electrical",
    "headline": "Fan & lighting care.",
    "accent": "Comfort. Restored.",
    "faults": [
      "Fan not starting or running slowly",
      "Noise, vibration or regulator issues",
      "Light fitting not working",
      "Loose or damaged fittings"
    ],
    "checks": [
      "Supply, regulator and fan checks",
      "Fitting and connection assessment",
      "Function and safe-mounting checks"
    ],
    "preparation": [
      "List the affected fans and lights",
      "Confirm ceiling height and access",
      "Avoid using visibly damaged fittings"
    ],
    "intro": "Fan & Lighting Service in Bangalore. Describe the model and symptoms, review the assessment and estimate, and agree on the work before repairs begin."
  },
  {
    "slug": "electrical-service",
    "category": "appliances",
    "name": "Electrical Service",
    "kind": "electrical",
    "headline": "Electrical service.",
    "accent": "Care in every check.",
    "faults": [
      "Sockets or switches not working",
      "Repeated trips needing assessment",
      "Loose fittings or damaged connections",
      "Small installation and replacement work"
    ],
    "checks": [
      "Fault and connection assessment",
      "Isolation and scope review",
      "Function and safety checks for agreed work"
    ],
    "preparation": [
      "Describe affected fittings and when trips occur",
      "Keep the distribution board accessible",
      "Do not handle exposed wiring yourself"
    ],
    "intro": "Electrical Service in Bangalore. Describe the model and symptoms, review the assessment and estimate, and agree on the work before repairs begin."
  }
];

export function repairServiceForKind(category: RepairCategory, kind: DeviceKind) {
 return REPAIR_PAGES.find(service => service.category === category && service.kind === kind);
}

export function repairServiceHref(category: RepairCategory, kind: DeviceKind) {
 const service = repairServiceForKind(category, kind);
 return service ? repairPageHref(service) : (category === "appliances" ? "/appliances" : "/");
}

export function repairCategoryPath(category: RepairCategory) {
 return category === "electronics" ? "electronic" : "appliances";
}

export function repairPageHref(service: RepairService) {
 return `/${repairCategoryPath(service.category)}/repairs/${service.slug}`;
}
