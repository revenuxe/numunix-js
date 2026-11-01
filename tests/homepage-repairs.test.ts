import { describe, expect, test } from "bun:test";
import { REPAIR_SERVICES } from "../src/content/homepage-repairs";
import { REPAIR_HOME_PATHS, repairHomepageHead } from "../src/content/repair-homepage-meta";

describe("homepage repair category rules", () => {
  test("Electronics includes mobile and laptop repairs", () => {
    const kinds = REPAIR_SERVICES.electronics.map(service => service.kind);
    expect(kinds).toContain("phone");
    expect(kinds).toContain("laptop");
    expect(kinds).not.toContain("washer");
    expect(kinds).not.toContain("ac");
  });
  test("Appliances includes washing machine and AC repairs", () => {
    const kinds = REPAIR_SERVICES.appliances.map(service => service.kind);
    expect(kinds).toContain("washer");
    expect(kinds).toContain("ac");
    expect(kinds).not.toContain("phone");
    expect(kinds).not.toContain("laptop");
  });
  test("category homepages have separate self-referencing addresses", () => {
    expect(REPAIR_HOME_PATHS.electronics).toBe("/");
    expect(REPAIR_HOME_PATHS.appliances).toBe("/appliances");
    for (const category of ["electronics", "appliances"] as const) {
      const head = repairHomepageHead(category);
      const url = `https://numunix-flow-engine.lovable.app${REPAIR_HOME_PATHS[category]}`;
      expect(head.links.find(link => link.rel === "canonical")?.href).toBe(url);
      expect(head.meta.find(meta => "property" in meta && meta.property === "og:url")?.content).toBe(url);
    }
  });
  test("homepage structured services stay within the selected category", () => {
    for (const category of ["electronics", "appliances"] as const) {
      const script = repairHomepageHead(category).scripts[0];
      const schema = JSON.parse(script?.children ?? "{}");
      expect(schema.about.map((service: { name: string }) => service.name)).toEqual(REPAIR_SERVICES[category].map(service => service.nav));
    }
  });
});