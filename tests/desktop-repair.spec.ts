import { test, expect } from "@playwright/test";

test("repair cards stay aligned in both categories and Desktop has its own destination", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const path of ["/", "/appliances"]) {
    await page.goto(path);
    await page.evaluate(() => document.fonts.ready);
    for (const width of [320, 768, 1440, 1920]) {
      await page.setViewportSize({ width, height: 1000 });
      const cards = page.locator("#approach a");
      await expect(cards).toHaveCount(8);
      const layout = await cards.evaluateAll((links) => {
        const boxes = links.map((link) => link.getBoundingClientRect());
        return {
          columns: getComputedStyle(links[0]!.parentElement!).gridTemplateColumns.split(" ").length,
          heights: boxes.map((box) => Math.round(box.height)),
          overflow: document.documentElement.scrollWidth > innerWidth,
          icons: links.map((link, i) =>
            Math.round(link.querySelector("svg")!.getBoundingClientRect().top - boxes[i]!.top),
          ),
        };
      });
      expect(layout.columns).toBe(width < 768 ? 2 : 4);
      expect(new Set(layout.heights).size).toBe(1);
      expect(new Set(layout.icons).size).toBe(1);
      expect(layout.overflow).toBe(false);
    }
    if (path === "/") {
      await expect(
        page.locator("#approach").getByRole("link", { name: /REPAIR: Desktop/ }),
      ).toHaveAttribute("href", "/electronic/repairs/desktop-repair");
      await expect(page.locator("#approach")).not.toContainText("Doorstep");
    }
  }
});

test("desktop detail content, SEO and booking defaults describe computers", async ({
  page,
  request,
}) => {
  await page.goto("/electronic/repairs/desktop-repair");
  await expect(page.locator("h1")).toHaveAccessibleName("Desktop Computer Repair in Bangalore");
  await expect(page).toHaveTitle("Desktop Computer Repair in Bangalore | Numunix");
  await expect(page.locator("link[rel=canonical]")).toHaveAttribute(
    "href",
    "https://www.numunix.com/electronic/repairs/desktop-repair",
  );
  await expect(page.locator("#assessment article")).toHaveCount(6);
  await expect(page.locator("#contact-service")).toHaveValue("Desktop Computer Repair");
  await expect(page.locator("#contact-description")).toHaveValue(/assembled specifications/);
  await expect(page.getByRole("img", { name: "desktop repair illustration" })).toBeVisible();
  await page.getByRole("combobox", { name: /Brand/ }).click();
  await expect(page.getByRole("option", { name: "Dell", exact: true })).toBeVisible();
  await page.getByRole("option", { name: "Dell", exact: true }).click();
  await page.getByLabel("Name *", { exact: true }).fill("Desktop Test");
  await page.getByLabel("Phone number *").fill("9876543210");
  await page.getByRole("button", { name: "Submit enquiry" }).click();
  await expect(page).toHaveURL(/\/thank-you\?booking=NU-/);
  await expect(page.locator("h1")).toContainText("Repair request received.");
  const sitemap = await (await request.get("/sitemap.xml")).text();
  expect(sitemap).toContain("/electronic/repairs/desktop-repair");
  expect(sitemap).not.toContain("doorstep-repair");
});

test("old doorstep addresses redirect and unsupported desktop combinations stay unavailable", async ({
  request,
}) => {
  for (const path of [
    "/electronic/repairs/doorstep-repair",
    "/repairs/doorstep-repair",
    "/features/doorstep-repair",
  ]) {
    const response = await request.get(path, { maxRedirects: 0 });
    expect(response.status()).toBe(308);
    expect(response.headers()["location"]).toBe("/electronic/repairs/desktop-repair");
  }
  for (const path of [
    "/appliances/repairs/desktop-repair",
    "/electronic/repairs/desktop-repair/dell",
  ])
    expect((await request.get(path)).status()).toBe(404);
});
