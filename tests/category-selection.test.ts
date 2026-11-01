import { describe, expect, test } from "bun:test";
import { selectedRepairCategory, selectedHomepage } from "../src/content/category-selection";

describe("persistent repair selection", () => {
  test("a saved Appliances choice keeps the Appliances home destination", () => {
    expect(selectedHomepage(selectedRepairCategory("appliances"))).toBe("/appliances");
  });
  test("explicit Electronics selection restores the Electronics destination", () => {
    expect(selectedHomepage(selectedRepairCategory("electronics"))).toBe("/");
  });
});