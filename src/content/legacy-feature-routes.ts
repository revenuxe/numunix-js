export const FEATURE_BY_LEGACY_STAGE: Record<string, string> = {
  "fault-intake": "leads",
  "fault-diagnosis": "jobs",
  "repair-estimate": "jobs",
  "repair-approval": "jobs",
  "repair-work": "jobs",
  "function-testing": "jobs",
  "repair-handover": "invoicing",
  "repair-aftercare": "technicians",
};

export function legacyServiceFeature(slug: string) {
  if (slug === "doorstep-repair") return "technicians";
  if (slug === "mobile-repair" || slug === "fault-intake") return "leads";
  if (slug === "repair-estimate" || slug === "repair-approval") return "jobs";
  return "jobs";
}
