import { describe, expect, test } from "bun:test";
import { LEGACY_REPAIR_STAGES, REPAIR_ROUTE_ALIASES } from "../src/content/repair-navigation";
import { WORKFLOW_STAGES, workflowBySlug } from "../src/content/workflow";
import { REPAIR_SERVICES } from "../src/content/homepage-repairs";
import { repairServiceHref, repairPageHref, REPAIR_PAGES } from "../src/content/repair-services";

describe("repair-specific public destinations", () => {
  test("mobile repair uses the exact electronic category prefix", () => {
    expect(repairServiceHref("electronics", "phone")).toBe("/electronic/repairs/mobile-repair");
  });
  test("the washer card opens the washing machine service", () => {
    expect(repairServiceHref("appliances", REPAIR_SERVICES.appliances[0].kind)).toBe("/appliances/repairs/washing-machine-repair");
  });
  test("every illustrated service resolves to its category and device page", () => {
    for (const category of ["electronics", "appliances"] as const) {
      for (const service of REPAIR_SERVICES[category]) {
        const page = REPAIR_PAGES.find(item => repairPageHref(item) === repairServiceHref(category, service.kind));
        expect(page?.category).toBe(category);
        expect(page?.kind).toBe(service.kind);
      }
    }
  });
  test("idea and scope bookmarks redirect to fault intake and diagnosis", () => {
    expect(LEGACY_REPAIR_STAGES.idea).toBe("fault-intake");
    expect(LEGACY_REPAIR_STAGES.scope).toBe("fault-diagnosis");
    expect(workflowBySlug(LEGACY_REPAIR_STAGES.scope)?.name).toBe("Assess");
  });
  test("all eight retired stages resolve to current repair stages", () => {
    expect(Object.values(LEGACY_REPAIR_STAGES)).toEqual(WORKFLOW_STAGES.map(stage => stage.slug));
    for (const slug of Object.values(LEGACY_REPAIR_STAGES)) expect(workflowBySlug(slug)).toBeDefined();
  });
  test("services and process use repair-specific addresses", () => {
    expect(REPAIR_ROUTE_ALIASES["/features"]).toBe("/services");
    expect(REPAIR_ROUTE_ALIASES["/process"]).toBe("/repair-process");
  });
});