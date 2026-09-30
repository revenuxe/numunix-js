import { test, expect, type Page } from "@playwright/test";

const user = {
  id: "22222222-2222-4222-8222-222222222222",
  aud: "authenticated",
  role: "authenticated",
  email: "admin@example.com",
  app_metadata: {},
  user_metadata: {},
  created_at: "2026-09-29T08:00:00Z",
};
const lead = {
  id: "11111111-1111-4111-8111-111111111111",
  name: "Avery Morgan",
  phone: "+91 98765 43210",
  email: "avery@example.com",
  service: "SaaS Development",
  timeline: "Within a month",
  description: "A subscription platform for our team.",
  source: "/contact",
  status: "new",
  notes: "",
  created_at: "2026-09-29T09:00:00Z",
  updated_at: "2026-09-29T09:00:00Z",
};

async function mockSupabase(page: Page, admin = true) {
  let deleted = false;
  let current = { ...lead };
  await page.route("https://admin-ui-test.supabase.co/**", async (route) => {
    const url = new URL(route.request().url());
    const method = route.request().method();
    const headers = {
      "access-control-allow-origin": "*",
      "access-control-allow-headers": "*",
      "access-control-expose-headers": "content-range",
    };
    if (method === "OPTIONS") return route.fulfill({ status: 204, headers });
    if (url.pathname === "/auth/v1/token")
      return route.fulfill({
        json: {
          access_token: "test-access-token",
          refresh_token: "test-refresh-token",
          token_type: "bearer",
          expires_in: 3600,
          user,
        },
        headers,
      });
    if (url.pathname === "/auth/v1/user") return route.fulfill({ json: user, headers });
    if (url.pathname === "/auth/v1/logout") return route.fulfill({ status: 204, headers });
    if (url.pathname === "/rest/v1/admin_users")
      return route.fulfill({ json: admin ? { user_id: user.id } : null, headers });
    if (url.pathname === "/rest/v1/contact_enquiries") {
      if (method === "DELETE") {
        deleted = true;
        return route.fulfill({ json: { id: lead.id }, headers });
      }
      if (method === "PATCH") {
        current = { ...current, ...route.request().postDataJSON() };
        return route.fulfill({ json: { id: lead.id }, headers });
      }
      if (method === "POST") return route.fulfill({ status: 201, headers });
      const matches =
        !deleted &&
        (!url.searchParams.has("status") ||
          url.searchParams.get("status") === `eq.${current.status}`) &&
        !url.searchParams.get("or")?.includes("Nobody");
      return route.fulfill({
        status: 200,
        body: method === "HEAD" ? "" : JSON.stringify(matches ? [current] : []),
        contentType: "application/json",
        headers: { ...headers, "content-range": matches ? "0-0/1" : "*/0" },
      });
    }
    return route.fulfill({ status: 404, json: { message: "Unexpected mocked endpoint" }, headers });
  });
}

async function login(page: Page) {
  await page.goto("/admin/login");
  await page.getByLabel("Email address").fill("admin@example.com");
  await page.getByLabel("Password", { exact: true }).fill("local-test-password");
  await page.getByRole("button", { name: "Sign in to workspace" }).click();
}

test("mobile admin can view, update, filter and delete a lead", async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await mockSupabase(page);
  await login(page);
  await expect(page).toHaveURL(/admin\/dashboard/);
  await expect(page.getByRole("heading", { name: "Every lead. One place." })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(
    true,
  );
  await page.screenshot({ path: testInfo.outputPath("mobile-dashboard.png"), fullPage: true });
  await page.getByRole("button", { name: "Leads", exact: true }).click();
  await page
    .getByRole("button", { name: "View Avery Morgan", exact: true })
    .filter({ visible: true })
    .click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  const box = await dialog.boundingBox();
  expect(box!.width).toBeLessThan(375);
  expect(box!.x).toBeGreaterThanOrEqual(0);
  await page.screenshot({ path: testInfo.outputPath("mobile-details.png") });
  await page.getByLabel("Lead status").selectOption("qualified");
  await page.getByLabel("Internal notes").fill("Follow up on Monday.");
  await page.getByRole("button", { name: "Save changes" }).click();
  await expect(page.getByRole("status")).toContainText("Lead updated.");
  await page
    .getByRole("button", { name: "View Avery Morgan", exact: true })
    .filter({ visible: true })
    .click();
  await expect(page.getByLabel("Internal notes")).toHaveValue("Follow up on Monday.");
  await page.getByRole("button", { name: "Close", exact: true }).click();
  await page
    .getByRole("button", { name: "Delete Avery Morgan", exact: true })
    .filter({ visible: true })
    .click();
  await page.getByRole("button", { name: "Keep lead" }).click();
  await expect(page.getByRole("alertdialog")).not.toBeVisible();
  await page
    .getByRole("button", { name: "Delete Avery Morgan", exact: true })
    .filter({ visible: true })
    .click();
  await page.getByRole("button", { name: "Delete lead", exact: true }).click();
  await expect(
    page.getByRole("heading", { name: "Your next conversation starts here" }),
  ).toBeVisible();
});

test("non-admin accounts cannot enter the dashboard", async ({ page }) => {
  await mockSupabase(page, false);
  await login(page);
  await expect(page.getByRole("alert")).toContainText("doesn’t have admin access");
  await page.goto("/admin/dashboard");
  await expect(page.getByRole("heading", { name: "Admin access required" })).toBeVisible();
  await expect(page.getByText("Avery Morgan")).not.toBeVisible();
});

test("desktop table supports search and public contact submission", async ({ page }, testInfo) => {
  await mockSupabase(page);
  await login(page);
  await page.getByRole("button", { name: "Leads", exact: true }).click();
  await expect(page.getByRole("table")).toBeVisible();
  await page.screenshot({ path: testInfo.outputPath("desktop-dashboard.png"), fullPage: true });
  await page.getByRole("textbox", { name: "Search leads" }).fill("Nobody");
  await expect(page.getByRole("heading", { name: "No matching leads" })).toBeVisible();
  await page.getByRole("button", { name: "Clear filters" }).click();
  await expect(page.getByRole("table")).toBeVisible();
  await page.goto("/contact");
  await page.getByLabel("Name *", { exact: true }).fill("Test Visitor");
  await page.getByLabel("Phone number *").fill("+91 98765 43210");
  await page
    .getByRole("combobox", { name: "Service *", exact: true })
    .selectOption({ label: "SaaS Development" });
  await page.getByRole("button", { name: "Submit enquiry" }).click();
  await expect(page.getByRole("status")).toContainText("Your enquiry has been received");
});
