import { AirVent, BatteryCharging, Cctv, Droplets, Fan, Gamepad2, HardDrive, Laptop, Microwave, Refrigerator, Smartphone, Tablet, Tv, Zap } from "lucide-react";

export type RepairCategory = "electronics" | "appliances";
export type DeviceKind = "phone" | "laptop" | "cctv" | "tv" | "tablet" | "drive" | "console" | "washer" | "ac" | "fridge" | "microwave" | "purifier" | "inverter" | "electrical";
export const REPAIR_SERVICES = {
  electronics: [
    { name: "Mobile", nav: "MOBILE REPAIR", kind: "phone", icon: Smartphone, title: "Your screen, touch and charge. Restored.", body: "Cracked screens, weak batteries, charging faults and camera issues, assessed before parts are replaced.", checks: ["Display & touch", "Battery & charge", "Camera & audio"] },
    { name: "Laptop", nav: "LAPTOP & COMPUTER REPAIR", kind: "laptop", icon: Laptop, title: "Find the fault. Keep the laptop.", body: "No power, overheating, damaged hinges and failing keyboards, with board-level assessment and upgrade advice.", checks: ["Power & board", "Cooling & fans", "Keyboard & display"] },
    { name: "CCTV", nav: "CCTV & SECURITY SYSTEMS", kind: "cctv", icon: Cctv, title: "A clear view. A recording you can rely on.", body: "Camera installation, cable checks, recorder setup and remote viewing for homes, shops and offices.", checks: ["Camera signal", "Recorder & storage", "Remote viewing"] },
    { name: "TV & Audio", nav: "TV & AUDIO REPAIR", kind: "tv", icon: Tv, title: "Bring the picture and sound back.", body: "Backlight, display-board and speaker faults assessed with a clear repair-versus-replacement recommendation.", checks: ["Panel & backlight", "Input signal", "Sound & speakers"] },
    { name: "Tablet", nav: "TABLET & IPAD REPAIR", kind: "tablet", icon: Tablet, title: "Back to reading, drawing and everyday use.", body: "Display, battery and charging-port repairs for tablets, with touch and connectivity checks before handover.", checks: ["Screen & touch", "Charging port", "Wi-Fi & audio"] },
    { name: "Data Recovery", nav: "DATA RECOVERY & CONSOLES", kind: "drive", icon: HardDrive, title: "Assess first. Protect what matters.", body: "Failed drives, unreadable storage and console faults, careful assessment, recovery options and device-specific repair advice.", checks: ["Drive assessment", "Recovery options", "File verification"] },
  ],
  appliances: [
    { name: "Washing Machine", nav: "WASHING MACHINE REPAIR", kind: "washer", icon: WashingMachineIcon, title: "From a stopped cycle to a steady spin.", body: "Drainage, drum, motor and control-board faults, diagnosed at home, with a wash-cycle check after repair.", checks: ["Water inlet & drain", "Drum & motor", "Full cycle test"] },
    { name: "AC", nav: "AC SERVICE & REPAIR", kind: "ac", icon: AirVent, title: "Cooling restored. Air flowing freely.", body: "Poor cooling, water leaks, blocked filters and electrical faults, inspect the cause before recommending service or parts.", checks: ["Filter & airflow", "Cooling & leaks", "Electrical controls"] },
    { name: "Refrigerator", nav: "REFRIGERATOR REPAIR", kind: "fridge", icon: Refrigerator, title: "Keep the cold where it belongs.", body: "Cooling loss, frost buildup, door seals and compressor faults, assessed with temperature checks and clear repair advice.", checks: ["Cooling circuit", "Door seal & frost", "Temperature test"] },
    { name: "Microwave", nav: "MICROWAVE & CHIMNEY REPAIR", kind: "microwave", icon: Microwave, title: "Everyday kitchen essentials, working again.", body: "Heating, turntable and control faults in microwaves, plus chimney suction and motor service. Leave internal electrical work to a technician.", checks: ["Controls & interlock", "Heating & motor", "Operation test"] },
    { name: "Water Purifier", nav: "WATER PURIFIER SERVICE", kind: "purifier", icon: Droplets, title: "A better flow starts with the right checks.", body: "Filter changes, leaks, pump faults and low water flow, with service recommendations suited to your purifier model.", checks: ["Filters & membrane", "Pump & water flow", "Leak inspection"] },
    { name: "Electrical", nav: "INVERTER & ELECTRICAL SERVICE", kind: "inverter", icon: BatteryCharging, title: "Power and fittings, carefully checked.", body: "Inverters, UPS units, fans, lights and electrical fittings, with fault checks, safe isolation and a clearly scoped service visit.", checks: ["Battery & backup", "Connections & load", "Safety check"] },
  ],
} satisfies Record<RepairCategory, { name: string; nav: string; kind: DeviceKind; icon: typeof Smartphone; title: string; body: string; checks: string[] }[]>;

// Imported separately to keep the service catalogue's shape identical for both modes.
import { WashingMachine as WashingMachineIcon } from "lucide-react";

export const HOMEPAGE_REPAIR = {
  electronics: {
    headline: "Every device,", accent: "expertly repaired.",
    intro: "Mobile, laptop, CCTV, TV and tablet repairs, clear diagnosis, an estimate before work begins, and careful testing before handover.",
    overview: "From phones and laptops to CCTV, tablets and TVs, tell us the fault and we’ll help you choose the right next step.",
    audienceIntro: "From one phone to an office full of devices, repair care for homes, shops and shared spaces.",
    diagnostic: "A device fault,", diagnosticAccent: "properly understood.",
    diagnosticBody: "A dead screen, a hot laptop, or a camera that’s offline? Share the model and symptoms. A technician checks the cause before recommending a repair.",
    maintenance: "Phones · Laptops · CCTV · TVs",
    cta: "Device not working?", ctaBody: "A cracked phone screen, a laptop that won’t start, or CCTV that dropped offline, tell us the symptoms and request a repair assessment.",
    audiences: [
      ["Homes & individuals", "Phones, tablets, laptops and TVs, repair options for the devices you use every day.", 0],
      ["Offices & workspaces", "Work laptops, displays and CCTV, coordinate repairs and preventive checks around your team's schedule.", 1],
      ["Retail & showrooms", "Billing computers, displays and security cameras, keep the shop’s essential devices in working order.", 2],
      ["Schools & colleges", "Computer labs, tablets and displays, arrange diagnosis and maintenance around classroom use.", 4],
      ["Hotels & restaurants", "Guest-room TVs, reception computers and CCTV, assess faults without disrupting busy spaces.", 3],
      ["Clinics & labs", "Reception computers, screens and CCTV only, careful scheduled service for non-medical electronics.", 1],
      ["Factories & warehouses", "Security cameras, office computers and displays, a clear plan for repair and maintenance.", 2],
      ["Apartments & communities", "Gate cameras, common-area CCTV and shared displays, coordinate service through one contact.", 2],
    ],
  },
  appliances: {
    headline: "Every appliance,", accent: "back to its best.",
    intro: "Washing machine, AC, refrigerator and kitchen-appliance repair, doorstep assessment, clear estimates and testing after the work is done.",
    overview: "Washing machines, ACs, refrigerators, microwaves, purifiers and electrical fittings, service for the essentials your home runs on.",
    audienceIntro: "From a home wash cycle to shared cooling and kitchen essentials, appliance care for everyday spaces.",
    diagnostic: "An appliance fault,", diagnosticAccent: "properly understood.",
    diagnosticBody: "A washer that won’t drain, an AC that won’t cool, or a fridge that feels warm? Share the model and symptoms so the right specialist can assess it.",
    maintenance: "Washers · ACs · Fridges · Purifiers",
    cta: "Appliance stopped?", ctaBody: "A washing machine stuck mid-cycle, a leaking AC or a fridge that won’t cool, request a doorstep assessment and review the estimate before approving repairs.",
    audiences: [
      ["Homes & individuals", "Washers, ACs, refrigerators and kitchen essentials, diagnosis where the appliance is installed.", 0],
      ["Offices & workspaces", "Office ACs, pantry refrigerators and water purifiers, scheduled service around working hours.", 1],
      ["Retail & showrooms", "Cooling, fans and electrical fittings, assess faults and plan service around opening hours.", 1],
      ["Schools & colleges", "Water purifiers, fans and AC units, coordinate maintenance around classes and holidays.", 4],
      ["Hotels & restaurants", "Laundry washers, room ACs and domestic kitchen appliances, check model and service scope before booking.", 3],
      ["Clinics & labs", "Comfort cooling, pantry appliances and water purifiers only, not medical or laboratory equipment.", 1],
      ["Factories & warehouses", "Office cooling, fans and pantry appliances, domestic appliance and fitting service, not industrial machinery.", 5],
      ["Apartments & communities", "Shared purifiers, fans and domestic appliances, plan preventive visits through your community contact.", 4],
    ],
  },
} as const;

export const APPLIANCE_EXTRAS = [Fan, Zap, Gamepad2];