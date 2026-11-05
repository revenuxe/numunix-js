import type { DeviceKind } from "./homepage-repairs";
type AudienceGuidance = {
  headline: string;
  scope: string;
  planning: [string, string][];
  electronics: DeviceKind[];
  appliances: DeviceKind[];
};

export const AUDIENCE_REPAIR_GUIDANCE: Record<string, AudienceGuidance> = {
  homes: {
    headline: "Repair Care for Homes",
    scope:
      "Household enquiries can involve one portable device or an installed appliance. Identify what is not working and whether access, a backup or existing manufacturer cover needs attention. Visit or workshop arrangements are confirmed for the actual equipment.",
    electronics: ["phone", "laptop", "tv", "tablet"],
    appliances: ["washer", "ac", "fridge", "microwave", "purifier"],
    planning: [
      [
        "The everyday item you need",
        "Share the model, remaining usable functions and what changed. Keep separate symptoms distinct when several household devices need attention.",
      ],
      [
        "A workable home arrangement",
        "Describe appliance position, building entry and suitable timing. Do not move heavy equipment or open electrical covers to prepare for a booking.",
      ],
      [
        "Your approval and records",
        "Confirm who approves the estimate, which accessories are handed over and the job-specific function checks and aftercare terms.",
      ],
    ],
  },
  offices: {
    headline: "Office Equipment Repair",
    scope:
      "Office planning starts with affected workstations, shared equipment and the responsible contact. Describe the interruption without sharing staff credentials or documents. Data responsibility, access windows and recurring maintenance scope need explicit agreement.",
    electronics: ["laptop", "cctv", "tv", "drive"],
    appliances: ["ac", "fridge", "purifier", "inverter"],
    planning: [
      [
        "Equipment and priorities",
        "List models, affected staff or rooms and critical items. Separate a failed device from a shared connection or power complaint.",
      ],
      [
        "Authorized access",
        "Nominate the building or IT coordinator. Keep passwords and recovery keys private and agree any data-impacting work separately.",
      ],
      [
        "Downtime and approval",
        "Discuss service windows and the estimate approver. Retain the scope, parts, tests and applicable written terms for each job.",
      ],
    ],
  },
  retail: {
    headline: "Repair Care for Shops",
    scope:
      "Identify equipment supporting billing, displays and security, along with trading-hour restrictions. Distinguish a failed device from loss of recording or a shared installation issue. Specialist retail systems require explicit capability confirmation.",
    electronics: ["laptop", "cctv", "tv"],
    appliances: ["ac", "fridge", "purifier", "inverter"],
    planning: [
      [
        "The trading function affected",
        "Name the computer, display or security channel involved and which other functions still work. Include the last normal operation and recent changes.",
      ],
      [
        "Access around opening hours",
        "Provide entry, mounting and equipment-location details. Coordinate with the shop owner or manager before a planned interruption is agreed.",
      ],
      [
        "Recording and handover",
        "Mention important footage or files before storage work or resets. Record approved scope and the reported function checked at handover.",
      ],
    ],
  },
  education: {
    headline: "Repair Care for Education",
    scope:
      "Prepare equipment and classroom details with an authorized staff contact. Distinguish individual failures from shared equipment problems. Timing and access follow the institution's permissions; this guidance does not imply an existing institutional contract.",
    electronics: ["laptop", "tablet", "cctv", "tv"],
    appliances: ["ac", "purifier", "inverter"],
    planning: [
      [
        "Rooms and equipment",
        "List affected classroom and administrative devices with model or asset references. Identify the functions interrupted rather than only the number of items.",
      ],
      [
        "Permission and scheduling",
        "Name the coordinating staff member and service windows. Keep student information, passwords and private recordings outside enquiry material.",
      ],
      [
        "Approval and equipment return",
        "Agree who approves costs, records accessories and accepts completed work. Confirm relevant checks and unresolved limitations for each item.",
      ],
    ],
  },
  hospitality: {
    headline: "Repair Care for Hospitality",
    scope:
      "Enquiries may concern guest-room TVs, reception computers or domestic appliances used on site. Identify the actual equipment and area. Commercial kitchen, specialist laundry and other systems require explicit scope confirmation.",
    electronics: ["tv", "laptop", "cctv"],
    appliances: ["ac", "fridge", "washer", "microwave"],
    planning: [
      [
        "The room or service area",
        "List models and affected rooms. Separate domestic equipment from specialist commercial systems and exclude private guest information.",
      ],
      [
        "Coordinated access",
        "Nominate the manager and describe occupied rooms, quiet periods and installed-equipment positions before arrangements are agreed.",
      ],
      [
        "Return to ordinary use",
        "Confirm estimate approval and functions needed at handover. Keep individual repair records separate from any existing service contract.",
      ],
    ],
  },
  clinics: {
    headline: "Everyday Repairs for Clinics",
    scope:
      "This guidance concerns non-medical equipment: reception computers, displays, CCTV, comfort cooling and domestic pantry appliances. Medical and laboratory equipment are outside this scope. Keep patient information private and coordinate access through the responsible clinic contact.",
    electronics: ["laptop", "tv", "cctv"],
    appliances: ["ac", "fridge", "purifier"],
    planning: [
      [
        "Non-medical equipment only",
        "Identify the ordinary office, comfort or pantry item. Diagnostic, clinical and laboratory equipment should not be booked through this guidance.",
      ],
      [
        "Privacy-sensitive access",
        "Keep patient records outside photos and enquiry text. Arrange access with the authorized contact and discuss computer data priorities separately.",
      ],
      [
        "Scheduling and approval",
        "Agree service windows, the estimate approver and the exact equipment scope. Review the relevant checks before returning the item to ordinary use.",
      ],
    ],
  },
  warehouses: {
    headline: "Repair Care for Warehouses",
    scope:
      "This page concerns CCTV, office computers, displays and domestic comfort or pantry equipment. Industrial machinery and specialist process systems are outside this guidance. Describe permissions and restricted equipment positions before assessment arrangements are agreed.",
    electronics: ["cctv", "laptop", "tv"],
    appliances: ["ac", "fridge", "inverter"],
    planning: [
      [
        "Everyday site equipment",
        "List security, office and domestic appliance models. Keep industrial machinery requests separate and confirm specialist system scope explicitly.",
      ],
      [
        "Safe access to the site",
        "Name the contact and access restrictions. Describe mounted equipment from a safe position without climbing or disturbing wiring.",
      ],
      [
        "Continuity and records",
        "Mention footage or business-file preservation needs. Agree downtime, estimate approval and the functions included in completed-work checks.",
      ],
    ],
  },
  communities: {
    headline: "Community Equipment Repairs",
    scope:
      "Apartment and community enquiries benefit from one authorized coordinator and an equipment list. Describe shared CCTV, displays or domestic appliances and common-area permissions. Shared treatment or specialist installations need explicit scope confirmation.",
    electronics: ["cctv", "tv", "laptop"],
    appliances: ["purifier", "ac", "washer", "inverter"],
    planning: [
      [
        "The shared equipment complaint",
        "Identify devices, locations and affected common areas. Separate one outlet or channel issue from a wider shared installation problem.",
      ],
      [
        "One responsible coordinator",
        "Provide the manager or association contact, permissions and suitable windows. Confirm authority for account or equipment changes.",
      ],
      [
        "A reviewable scope",
        "Agree who approves costs and receives records. Keep individual repair scope distinct from proposed preventive schedules and job-specific terms.",
      ],
    ],
  },
};
