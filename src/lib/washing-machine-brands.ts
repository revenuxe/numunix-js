import type { StaticImageData } from "next/image";

import bosch from "@/assets/washing-machine-brand-logos/bosch.webp";
import godrej from "@/assets/washing-machine-brand-logos/godrej.webp";
import haier from "@/assets/washing-machine-brand-logos/haier.webp";
import ifb from "@/assets/washing-machine-brand-logos/ifb.webp";
import lg from "@/assets/washing-machine-brand-logos/lg.webp";
import panasonic from "@/assets/washing-machine-brand-logos/panasonic.webp";
import samsung from "@/assets/washing-machine-brand-logos/samsung.webp";
import siemens from "@/assets/washing-machine-brand-logos/siemens.webp";
import whirlpool from "@/assets/washing-machine-brand-logos/whirlpool.webp";

export type WashingMachineBrand = {
  name: string;
  slug: string;
  logo: StaticImageData | string;
  repairFocus: string;
};

export const WASHING_MACHINE_BRANDS: WashingMachineBrand[] = [
  {
    name: "Samsung",
    slug: "samsung",
    logo: samsung,
    repairFocus:
      "Samsung digital-inverter models, including common display, drainage and spin-cycle faults.",
  },
  {
    name: "LG",
    slug: "lg",
    logo: lg,
    repairFocus:
      "LG front-load and top-load models, with attention to door-lock, inlet and wash-programme issues.",
  },
  {
    name: "Bosch",
    slug: "bosch",
    logo: bosch,
    repairFocus:
      "Bosch washing machines, including front-load models with drainage, drum and error-code concerns.",
  },
  {
    name: "Siemens",
    slug: "siemens",
    logo: siemens,
    repairFocus:
      "Siemens front-load washing machines requiring careful checks of water flow, motor and control functions.",
  },
  {
    name: "Panasonic",
    slug: "panasonic",
    logo: panasonic,
    repairFocus:
      "Panasonic top-load and semi-automatic machines with wash, rinse, drain and spin performance problems.",
  },
  {
    name: "IFB",
    slug: "ifb",
    logo: ifb,
    repairFocus:
      "IFB front-load and top-load washers affected by drainage, vibration, door and programme-cycle faults.",
  },
  {
    name: "Haier",
    slug: "haier",
    logo: haier,
    repairFocus:
      "Haier washing machines with filling, draining, spin, balance and general performance issues.",
  },
  {
    name: "Whirlpool",
    slug: "whirlpool",
    logo: whirlpool,
    repairFocus:
      "Whirlpool top-load, front-load and semi-automatic models with wash-cycle, motor and water-flow faults.",
  },
  {
    name: "Godrej",
    slug: "godrej",
    logo: godrej,
    repairFocus:
      "Godrej washing machines that need reliable help with draining, spinning, leakage or unusual noise.",
  },
  {
    name: "Croma",
    slug: "croma",
    logo: "/washing-machine-brand-logos/croma.svg",
    repairFocus:
      "Croma washing machines with startup, rinse, drainage, spin and day-to-day performance faults.",
  },
];

export function getWashingMachineBrand(slug: string) {
  return WASHING_MACHINE_BRANDS.find((brand) => brand.slug === slug);
}

type BrandRepairCopy = {
  details: string;
  issues: string[];
  tip: string;
  faq: [string, string];
};

const BRAND_REPAIR_COPY: Record<string, BrandRepairCopy> = {
  samsung: {
    details:
      "For Samsung washers, we assess the selected programme, water supply, drain route and drum movement before recommending a repair. This helps separate a simple setup or blockage issue from a component fault.",
    issues: [
      "Digital display or programme errors",
      "Machine stops before spinning",
      "Drainage or water-inlet faults",
      "Noise during a high-speed spin",
    ],
    tip: "Cleaning the drain filter and checking the inlet hose periodically can help avoid common Samsung wash-cycle interruptions.",
    faq: [
      "Can you diagnose Samsung washing machine display errors?",
      "Yes. We inspect the displayed error alongside the machine's water, drainage, door-lock and cycle behaviour to identify the underlying issue.",
    ],
  },
  lg: {
    details:
      "LG top-load and front-load machines need different checks. We examine door or lid operation, water intake, drain performance and drum balance in line with the symptoms you report.",
    issues: [
      "Door or lid not locking",
      "Water not entering correctly",
      "Off-balance vibration",
      "Wash programme not completing",
    ],
    tip: "Avoid overloading and leave the door or lid open after a wash where practical to reduce moisture build-up.",
    faq: [
      "Why does my LG washing machine shake heavily?",
      "Heavy movement can be caused by an uneven load, levelling issue, worn suspension or a drum-related fault. We inspect the machine before advising on repair.",
    ],
  },
  bosch: {
    details:
      "For Bosch front-load washing machine repair, our inspection considers filter condition, water drainage, door sealing and drum movement. We also check the machine's behaviour through the affected part of the cycle.",
    issues: [
      "Drain filter or pump blockage",
      "Front-load door seal leakage",
      "Error message during a cycle",
      "Drum noise or poor spin",
    ],
    tip: "Use the recommended detergent amount and clean the door seal and filter regularly to help protect drainage and wash performance.",
    faq: [
      "Can you repair a Bosch washer that stops mid-cycle?",
      "Yes. We check water supply, drainage, door locking and relevant operating components to determine why the cycle is stopping.",
    ],
  },
  siemens: {
    details:
      "Siemens washing machine service begins with the exact symptom, whether that is slow filling, failed spin, unusual sound or a cycle that will not progress. We check the relevant mechanical and electrical systems before proposing work.",
    issues: [
      "Slow or failed water fill",
      "Machine not advancing through cycle",
      "Motor or spin performance issue",
      "Water remaining after wash",
    ],
    tip: "Checking pockets before washing and keeping the detergent drawer clean can help prevent avoidable drainage and dispensing problems.",
    faq: [
      "Do you service Siemens front-load washing machines?",
      "Yes. We provide independent diagnostics and repair support for Siemens front-load washing machine faults in Bangalore.",
    ],
  },
  panasonic: {
    details:
      "Panasonic top-load and semi-automatic washing machines often need a focused inspection of their wash, drain and spin functions. We assess the affected tub, timer controls, water flow and movement to recommend the appropriate repair.",
    issues: [
      "Spin tub not rotating",
      "Wash timer or cycle concern",
      "Water not draining",
      "Unusual sound from machine",
    ],
    tip: "For semi-automatic machines, ensure the drain hose is positioned correctly and avoid moving laundry between tubs with excess water.",
    faq: [
      "Can you repair Panasonic semi-automatic washing machines?",
      "Yes. We inspect wash, drain and spin functions on Panasonic semi-automatic machines and explain the suitable repair options.",
    ],
  },
  ifb: {
    details:
      "IFB washing machine repair may involve checking the door or lid, drainage path, load balance and programme behaviour. We diagnose the cause of vibration, leakage or incomplete cycles before replacing parts.",
    issues: [
      "Front-load door not opening",
      "Repeated drainage problem",
      "Vibration during spin",
      "Cycle taking longer than expected",
    ],
    tip: "Running periodic drum-cleaning cycles and keeping the filter clear can help maintain washing performance.",
    faq: [
      "Why is my IFB washing machine not draining?",
      "The cause may be a blocked filter, drain-hose issue, pump fault or another related component. We inspect the complete drain path before repair.",
    ],
  },
  haier: {
    details:
      "For Haier washing machine service, we look at the stage where the machine is failing: filling, washing, draining or spinning. This helps us target the right component or connection rather than recommend unnecessary work.",
    issues: [
      "Machine not filling with water",
      "Top-load balance issue",
      "Poor drainage",
      "Machine does not start",
    ],
    tip: "Check that the appliance is level and water-inlet taps are fully open before booking a visit for a filling or vibration issue.",
    faq: [
      "Can you fix a Haier washing machine that will not start?",
      "Yes. We check the power supply, controls, lid or door operation and internal systems to identify the cause safely.",
    ],
  },
  whirlpool: {
    details:
      "Whirlpool washer problems can appear as interrupted wash cycles, weak spinning, incorrect water levels or unusual noise. We inspect the model's wash, drain and spin operation to identify a repair path matching the fault.",
    issues: [
      "Machine not sensing water level",
      "Interrupted wash cycle",
      "Spin or motor concern",
      "Water leakage",
    ],
    tip: "Distribute laundry evenly and use the correct cycle for the load to reduce strain during Whirlpool machine spinning.",
    faq: [
      "Can you service Whirlpool top-load washing machines?",
      "Yes. Our independent service covers common Whirlpool top-load wash, drain, spin and water-flow concerns.",
    ],
  },
  godrej: {
    details:
      "Godrej washing machine repair starts with a clear check of water intake, draining, drum or tub movement and the affected operating cycle. We explain the fault in plain language and advise whether repair is practical.",
    issues: [
      "Drain water not releasing",
      "Spin function not working",
      "Machine making unusual noise",
      "Leak around hose or tub",
    ],
    tip: "Inspect the drain hose for kinks and avoid operating the machine with an uneven load to help protect wash and spin functions.",
    faq: [
      "Do you repair Godrej semi-automatic washing machines?",
      "Yes. We provide independent Godrej washing machine diagnosis and repair for semi-automatic as well as other common configurations.",
    ],
  },
  croma: {
    details:
      "For Croma washing machine repair, we assess the startup, filling, wash, rinse, drain and spin stages according to the fault you are experiencing. This gives you a clear recommendation before repair work begins.",
    issues: [
      "Machine not powering on",
      "Rinse or drain concern",
      "Spin cycle not working",
      "Unexpected noise or vibration",
    ],
    tip: "Use the recommended load size and clean the accessible filter according to the appliance instructions to help maintain day-to-day performance.",
    faq: [
      "Can you repair Croma washing machines in Bangalore?",
      "Yes. Numunix provides independent Croma washing machine inspection, repair and maintenance support in Bangalore.",
    ],
  },
};

export function getWashingMachineBrandCopy(slug: string): BrandRepairCopy | undefined {
  return BRAND_REPAIR_COPY[slug];
}
