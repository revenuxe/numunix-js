// Illustrative device cutouts, not photographs of completed customer repairs.
export const REPAIR_CARD_IMAGES: Record<string, string> = Object.fromEntries(
  [
    "mobile-repair",
    "laptop-repair",
    "cctv-service",
    "tv-audio-repair",
    "tablet-repair",
    "data-recovery",
    "console-repair",
    "desktop-repair",
    "washing-machine-repair",
    "ac-repair",
    "refrigerator-repair",
    "microwave-repair",
    "water-purifier-service",
    "inverter-ups-repair",
    "fan-light-repair",
    "electrical-service",
  ].map((slug) => [
    slug,
    `/images/repair-categories/${slug === "mobile-repair" ? "mobile-repair-v2" : slug}.webp`,
  ]),
);

export function repairCardImage(slug: string) {
  const src = REPAIR_CARD_IMAGES[slug];
  if (!src) throw new Error(`Missing category image for ${slug}`);
  return src;
}
