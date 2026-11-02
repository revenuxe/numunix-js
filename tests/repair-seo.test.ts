import { describe, expect, test } from "bun:test";
import { REPAIR_PAGES, repairPageHref } from "../src/content/repair-services";
import { repairPageHead, repairServiceSchema, repairSiteSchema, REPAIR_ORGANIZATION_ID } from "../src/content/repair-seo";
import { repairHomepageHead } from "../src/content/repair-homepage-meta";

describe("repair search entities", () => {
  test("all sixteen repair services retain their own address and provider", () => {
    for (const service of REPAIR_PAGES) {
      const path = repairPageHref(service);
      const entity = repairServiceSchema(service, path);
      expect(entity["@type"]).toBe("Service");
      expect(entity.url).toBe(`https://www.numunix.com${path}`);
      expect(entity.provider).toEqual({ "@id": REPAIR_ORGANIZATION_ID });
      expect(entity).not.toHaveProperty("offers");
      expect(entity).not.toHaveProperty("aggregateRating");
    }
  });
  test("each homepage lists exactly its eight category-specific repair destinations", () => {
    for (const category of ["electronics", "appliances"] as const) {
      const graph = JSON.parse(repairHomepageHead(category).scripts[0]?.children ?? "{}")["@graph"];
      const items = graph[0].mainEntity.find((entity: { "@type": string }) => entity["@type"] === "ItemList");
      expect(items.numberOfItems).toBe(8);
      expect(items.itemListElement.map((item: { url: string }) => item.url)).toEqual(REPAIR_PAGES.filter(service => service.category === category).map(service => `https://www.numunix.com${repairPageHref(service)}`));
    }
  });
  test("repair breadcrumbs reference the actual service instead of the homepage", () => {
    const path = "/electronic/repairs/mobile-repair";
    const head = repairPageHead({ title: "Mobile repair", description: "Repair assessment", path, breadcrumbs: [{ name: "Repair services", path: "/services" }, { name: "Mobile repair", path }] });
    const graph = JSON.parse(head.scripts[0]?.children ?? "{}")["@graph"];
    expect(graph[1].itemListElement.map((item: { item: string }) => item.item)).toEqual(["https://www.numunix.com/", "https://www.numunix.com/services", `https://www.numunix.com${path}`]);
  });
  test("site entities advertise repairs without a software application or unverified commercial claims", () => {
    const schema = repairSiteSchema();
    expect(schema["@graph"].map(entity => entity["@type"])).toEqual(["Organization", "WebSite"]);
    for (const entity of schema["@graph"]) {
      expect(entity).not.toHaveProperty("aggregateRating");
      expect(entity).not.toHaveProperty("openingHours");
    }
  });
});