import { describe, expect, test } from "bun:test";
import { REPAIR_SERVICES } from "../src/content/homepage-repairs";
import { REPAIR_HOME_PATHS, repairHomepageHead } from "../src/content/repair-homepage-meta";
import { REPAIR_PAGES, repairServiceHref } from "../src/content/repair-services";

describe("homepage repair category rules", () => {
  test("every repair-panel service has its own page in the correct category", () => {
    expect(REPAIR_PAGES.filter(service => service.category === "electronics").map(service => service.slug)).toEqual(["mobile-repair", "laptop-repair", "cctv-service", "tv-audio-repair", "tablet-repair", "data-recovery", "console-repair", "doorstep-repair"]);
    expect(REPAIR_PAGES.filter(service => service.category === "appliances").map(service => service.slug)).toEqual(["washing-machine-repair", "ac-repair", "refrigerator-repair", "microwave-repair", "water-purifier-service", "inverter-ups-repair", "fan-light-repair", "electrical-service"]);
    expect(new Set(REPAIR_PAGES.map(service => service.slug)).size).toBe(16);
  });
  test("homepage device services resolve to their individual repair pages", () => {
    expect(repairServiceHref("electronics", "phone")).toBe("/electronic/repairs/mobile-repair");
    expect(repairServiceHref("electronics", "laptop")).toBe("/electronic/repairs/laptop-repair");
    expect(repairServiceHref("appliances", "washer")).toBe("/appliances/repairs/washing-machine-repair");
    expect(repairServiceHref("appliances", "ac")).toBe("/appliances/repairs/ac-repair");
  });
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
      const url = `https://www.numunix.com${REPAIR_HOME_PATHS[category]}`;
      expect(head.links.find(link => link.rel === "canonical")?.href).toBe(url);
      expect(head.meta.find(meta => "property" in meta && meta.property === "og:url")?.content).toBe(url);
    }
  });
  test("homepage structured services stay within the selected category", () => {
    for (const category of ["electronics", "appliances"] as const) {
      const script = repairHomepageHead(category).scripts[0];
      const schema = JSON.parse(script?.children ?? "{}");
      expect(schema["@graph"][0].about.map((service: { name: string }) => service.name)).toEqual(REPAIR_SERVICES[category].map(service => service.nav));
    }
  });
});