/** Public repair destinations and permanent aliases for older bookmarks. */
export const REPAIR_ROUTE_ALIASES: Record<string, string> = {
  "/features": "/services",
  "/approach": "/repair-assessment",
  "/process": "/repair-process",
  "/technology": "/repair-diagnostics",
  "/support": "/repair-aftercare",
  "/security": "/repair-safety",
  "/articles": "/repair-guides",
  "/industries": "/who-we-serve",
};

export const LEGACY_REPAIR_STAGES: Record<string, string> = {
  idea: "fault-intake",
  scope: "fault-diagnosis",
  ux: "repair-estimate",
  build: "repair-approval",
  integrate: "repair-work",
  test: "function-testing",
  launch: "repair-handover",
  support: "repair-aftercare",
};