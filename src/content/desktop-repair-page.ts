import type { HubCopy } from "./repair-hub-content";
import { VISIT_CHARGE_POLICY } from "./repair-visit-policy";

export const DESKTOP_REPAIR_HUB: HubCopy = {
  description:
    "Desktop computer repair in Bangalore for branded towers, assembled PCs and all-in-ones. Discuss no-power, no-display, overheating, storage faults and compatible upgrades.",
  assessmentIntro:
    "A desktop that shows no signs of power needs a different assessment from one whose fans run without a picture. Share the branded model or assembled-system specifications, the exact startup behaviour and any recent hardware changes. Tower and all-in-one designs have different access and component requirements. Agree on the checks, important files and estimate before authorizing parts, software changes or a drive replacement.",
  faults: [
    [
      "No power or intermittent startup",
      "POWER & STARTUP",
      "Explain whether lights or fans respond and whether a recent power event preceded the fault. Power supply, front-panel and board checks help distinguish the cause. Do not open a power supply, bypass its protection or assume a replacement wattage from the symptom alone.",
    ],
    [
      "Fans run, but there is no picture",
      "DISPLAY & POST",
      "State whether the monitor shows no signal, a startup logo, diagnostic lights or a beep pattern. Include the monitor connection and any separate graphics card. The display, cable, memory and startup path need assessment before a motherboard or graphics replacement is proposed.",
    ],
    [
      "Overheating or unexpected restarts",
      "COOLING & STABILITY",
      "Describe whether the issue occurs at idle or during a particular workload, and mention fan noise or earlier cooling work. Cooling condition, component temperatures and power stability should be assessed for the actual configuration. Stop using equipment that smells burnt or shows electrical damage.",
    ],
    [
      "Slow operation or storage errors",
      "STORAGE & DATA",
      "Note whether the computer reaches the operating system and record any drive warning. A software issue, failing storage and insufficient memory require different decisions. Back up accessible files; if a drive clicks, disappears or repeatedly reports errors, stop repeated startup attempts and discuss a separate recovery assessment.",
    ],
    [
      "A memory, SSD or graphics upgrade is needed",
      "UPGRADE COMPATIBILITY",
      "Share the motherboard or branded system model, current parts and intended workload. Check memory generation, storage interfaces, case space, power connectors and cooling before buying components. Installing a faster part does not guarantee compatibility or resolve an unrelated fault.",
    ],
    [
      "An all-in-one has a screen or startup fault",
      "ALL-IN-ONE SYSTEMS",
      "Identify the complete all-in-one model and external adapter if fitted. Integrated displays, internal layout and proprietary parts differ from standard tower PCs. Confirm model support, access requirements and parts availability before agreeing to work.",
    ],
  ],
  scope: [
    {
      title: "Identify the system and isolate the fault",
      body: "Record the desktop model or assembled parts, symptoms and attached equipment. Agree whether the request covers the system unit, monitor, peripherals or an all-in-one. Review power, startup and relevant component checks without assuming every component needs replacement.",
    },
    {
      title: "Protect files and approve changes",
      body: "Identify important files and discuss backups and encrypted storage before handover. Operating-system installation, drive formatting, cloning and data recovery are separate approvals. Do not share account passwords or recovery keys in the public enquiry form.",
    },
    {
      title: "Review parts, cost and function checks",
      body: "Confirm compatible component specifications, labour, any software scope and exclusions in the estimate. Ask which startup, display, storage and workload checks will be completed after approved work. Discuss any written parts or labour terms for the actual job.",
    },
  ],
  faqs: [
    [
      "Can I enquire about a branded desktop, assembled PC or all-in-one?",
      "Yes. Share the full model or assembled-system specifications. Confirm support and component availability for that configuration; specialist workstations, servers and proprietary systems need an explicit scope discussion.",
    ],
    [
      "Does no display mean the graphics card is faulty?",
      "Not necessarily. Monitor connections, memory, startup behaviour and display output can produce similar symptoms. Describe what happens before selecting a replacement component.",
    ],
    [
      "Will a desktop repair erase my files?",
      "Data handling depends on the agreed work. Back up accessible files and identify important data before assessment. Formatting, reinstalling software or replacing a drive must be discussed separately; recovery cannot be guaranteed.",
    ],
    [
      "Can you assess an SSD or memory upgrade?",
      "Share the system or motherboard model and current configuration. Review interface, memory generation, power and physical compatibility, along with whether the request includes data transfer or software work.",
    ],
    [
      "Can the computer be assessed at my premises?",
      "Share your locality and system setup to discuss coverage and practical arrangements. A booking is an enquiry, not a confirmed visit; some component checks or repairs may require workshop equipment.",
    ],
    ["How are visit and inspection charges calculated?", VISIT_CHARGE_POLICY],
    [
      "Is a repair estimate available before parts are fitted?",
      "Ask for the findings, proposed parts, labour and exclusions after assessment. Approve the agreed work before replacement or software changes, and discuss repair versus replacement if costs are disproportionate to the system.",
    ],
  ],
};
