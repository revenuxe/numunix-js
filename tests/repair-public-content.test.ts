import { describe, expect, test } from "bun:test";
import { REPAIR_PAGES } from "../src/content/repair-services";
import { REPAIR_AUDIENCE_PATHS, repairAudience, LEGACY_AUDIENCE_PATHS } from "../src/content/repair-audiences";
import { ARTICLES } from "../src/content/articles";
import { LEGACY_ARTICLE_PATHS } from "../src/content/repair-legacy";

describe("repair-only public offerings", () => {
 test("public repair service offerings belong to Electronics or Appliances", () => {
  expect(REPAIR_PAGES).toHaveLength(16);
  expect(new Set(REPAIR_PAGES.map(service=>service.category))).toEqual(new Set(["electronics","appliances"]));
 });
 test("every retired article resolves to an available repair guide", () => {
  for (const destination of Object.values(LEGACY_ARTICLE_PATHS)) expect(ARTICLES.some(article=>article.slug===destination)).toBe(true);
 });
 test("every audience has repair services in both categories", () => {
  for (const slug of REPAIR_AUDIENCE_PATHS) {
   expect(repairAudience(slug,"electronics")?.services.some(service=>service.kind==="phone")).toBe(true);
   expect(repairAudience(slug,"appliances")?.services.some(service=>service.kind==="washer")).toBe(true);
  }
 });
 test("retired audience addresses resolve to valid repair audiences", () => {
  for (const destination of Object.values(LEGACY_AUDIENCE_PATHS)) expect(REPAIR_AUDIENCE_PATHS).toContain(destination);
 });
});