import { AC_SYMPTOMS } from "./air-conditioners";
import { CCTV_SYMPTOMS } from "./cctv";
import { FRIDGE_SYMPTOMS } from "./refrigerators";
import { LAPTOP_SYMPTOMS } from "./laptops";
import { MOBILE_SYMPTOMS } from "./mobiles";
import { PURIFIER_SYMPTOMS } from "./purifiers";
import { WASHER_SYMPTOMS } from "./washers";
import type { BrandSymptomCopy, SymptomCard } from "./types";

type SymptomCatalogue = { brands: BrandSymptomCopy; labels: readonly string[] };
const CATALOGUE = {
  "washing-machine-repair": {
    brands: WASHER_SYMPTOMS,
    labels: [
      "WASH & CYCLE",
      "SPIN & WATER",
      "FILL & OPERATION",
      "LEAKS",
      "NOISE & MOVEMENT",
      "DOOR & CONTROLS",
    ],
  },
  "refrigerator-repair": {
    brands: FRIDGE_SYMPTOMS,
    labels: ["COOLING", "COMPARTMENTS", "FROST", "WATER", "NOISE", "DOORS & CONTROLS"],
  },
  "ac-repair": {
    brands: AC_SYMPTOMS,
    labels: [
      "COOLING",
      "AIRFLOW",
      "WATER & INSTALLATION",
      "WARNINGS & OPERATION",
      "NOISE & RUNNING",
      "STARTUP & CONTROLS",
    ],
  },
  "water-purifier-service": {
    brands: PURIFIER_SYMPTOMS,
    labels: [
      "FLOW",
      "LEAKS",
      "INDICATORS",
      "FILLING & DISPENSING",
      "SERVICE & OUTPUT",
      "OPERATION & HISTORY",
    ],
  },
  "mobile-repair": {
    brands: MOBILE_SYMPTOMS,
    labels: [
      "DISPLAY & TOUCH",
      "BATTERY & POWER",
      "CHARGING",
      "CAMERA & AUDIO",
      "STARTUP",
      "DAMAGE & HISTORY",
    ],
  },
  "laptop-repair": {
    brands: LAPTOP_SYMPTOMS,
    labels: [
      "DISPLAY",
      "POWER & CHARGING",
      "INPUT & PORTS",
      "COOLING & OPERATION",
      "STARTUP",
      "ENCLOSURE & DAMAGE",
    ],
  },
  "cctv-service": {
    brands: CCTV_SYMPTOMS,
    labels: [
      "LIVE VIEW",
      "RECORDING",
      "REMOTE ACCESS",
      "IMAGE QUALITY",
      "POWER & CONNECTIONS",
      "COMPATIBILITY",
    ],
  },
} satisfies Record<string, SymptomCatalogue>;

// Explicit editorial is required for every supported brand; never silently reuse another page.
export function brandSymptomCards(service: keyof typeof CATALOGUE, brand: string): SymptomCard[] {
  const { brands, labels }: SymptomCatalogue = CATALOGUE[service];
  const copy = brands[brand];
  if (!copy) throw new Error(`Missing brand symptom content: ${service}/${brand}`);
  return copy.map(([title, body], index) => ({
    title,
    body,
    label: labels[index] ?? "MODEL & SYMPTOMS",
  }));
}
