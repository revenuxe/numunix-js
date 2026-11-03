import { expect, test } from "bun:test";
import { BOSCH_WASHER } from "../src/content/repair-brand-pages";
import { repairServiceSchema } from "../src/content/repair-seo";

test("Bosch enquiries retain washing machine service and Bosch equipment", () => {
  expect(BOSCH_WASHER.service).toBe("Washing Machine Repair");
  expect(BOSCH_WASHER.brandSelection.brand).toBe("Bosch");
  expect(BOSCH_WASHER.path).toBe("/appliances/repairs/washing-machine-repair/bosch");
});

test("independent brand service schema identifies Numunix as provider without offers or manufacturer affiliation", () => {
  const schema = repairServiceSchema({ name: "Independent Bosch Washing Machine Repair", intro: BOSCH_WASHER.intro }, BOSCH_WASHER.path);
  expect(schema.provider).toEqual({ "@id": "https://www.numunix.com/#organization" });
  expect(schema).not.toHaveProperty("brand");
  expect(schema).not.toHaveProperty("offers");
});