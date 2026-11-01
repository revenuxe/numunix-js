import { describe, expect, test } from "bun:test";
import { REPAIR_SERVICES } from "../src/content/homepage-repairs";

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
});