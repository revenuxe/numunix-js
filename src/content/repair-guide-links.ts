import { REPAIR_PAGES, repairPageHref } from "./repair-services";

export const GUIDE_REPAIR_SLUGS: Record<string, readonly string[]> = {
  "mobile-repair-before-you-book": ["mobile-repair", "tablet-repair"],
  "laptop-faults-repair-or-replace": ["laptop-repair", "data-recovery"],
  "appliance-repair-visit-checklist": [
    "washing-machine-repair",
    "ac-repair",
    "refrigerator-repair",
    "water-purifier-service",
  ],
  "choosing-a-repair-service-in-bangalore": [
    "mobile-repair",
    "laptop-repair",
    "cctv-service",
    "washing-machine-repair",
  ],
  "understanding-repair-estimates": ["laptop-repair", "tv-audio-repair", "refrigerator-repair"],
};

export function guideRepairLinks(slug: string) {
  return (GUIDE_REPAIR_SLUGS[slug] ?? []).map((repairSlug) => {
    const service = REPAIR_PAGES.find((item) => item.slug === repairSlug);
    if (!service) throw new Error(`Missing repair destination: ${repairSlug}`);
    return { ...service, path: repairPageHref(service) };
  });
}

export function guidesForRepair(slug: string) {
  return Object.entries(GUIDE_REPAIR_SLUGS)
    .filter(([, repairs]) => repairs.includes(slug))
    .map(([guide]) => guide);
}
