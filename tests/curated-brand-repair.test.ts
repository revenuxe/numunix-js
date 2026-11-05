import { expect, test } from "bun:test";
import { curateBrandRepair } from "../src/content/curated-brand-repair";
import { WASHER_BRAND_PAGES, BOSCH_WASHER } from "../src/content/repair-brand-pages";
import { AC_BRAND_PAGES } from "../src/content/ac-brand-pages";
import { FRIDGE_BRAND_PAGES } from "../src/content/fridge-brand-pages";
import { MOBILE_BRAND_PAGES } from "../src/content/mobile-brand-pages";
import { LAPTOP_BRAND_PAGES } from "../src/content/laptop-brand-pages";
import { CCTV_BRAND_PAGES } from "../src/content/cctv-brand-pages";

const groups = [WASHER_BRAND_PAGES, AC_BRAND_PAGES, FRIDGE_BRAND_PAGES, MOBILE_BRAND_PAGES, LAPTOP_BRAND_PAGES, CCTV_BRAND_PAGES];

test("curation preserves every supported brand's service, address and booking selection", () => {
  for (const group of groups) for (const original of group) {
    const curated = curateBrandRepair(original);
    expect(curated.service).toBe(original.service);
    expect(curated.path).toBe(original.path);
    expect(curated.brandSelection).toEqual(original.brandSelection);
    expect(curated.enquiryDescription).toBe(original.enquiryDescription);
  }
});

test("unsupported brands cannot silently receive generic editorial", () => {
  expect(() => curateBrandRepair({ ...BOSCH_WASHER, slug: "unlisted-brand" })).toThrow("Missing curated brand advice");
});