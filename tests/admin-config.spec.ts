import { test, expect } from "@playwright/test";

test.skip(
  process.env["TEST_RUNTIME_SUPABASE_CONFIG"] !== "1",
  "Run with TEST_RUNTIME_SUPABASE_CONFIG=1 to exercise runtime-only configuration.",
);

test("public runtime config returns only browser-safe settings and is never cached", async ({
  request,
  page,
}) => {
  const response = await request.get("/api/public/config");
  expect(response.status()).toBe(200);
  expect(response.headers()["cache-control"]).toContain("no-store");
  expect(response.headers()["x-robots-tag"]).toContain("noindex");
  expect(await response.json()).toEqual({
    url: "https://admin-ui-test.supabase.co",
    key: "sb_publishable_ui_test_only",
  });
  await page.goto("/admin/login");
  await expect(page.getByRole("button", { name: "Sign in to workspace" })).toBeEnabled();
});

test("a temporary config failure can recover without reloading the login page", async ({
  page,
}) => {
  let requests = 0;
  await page.route("**/api/public/config", (route) => {
    requests++;
    return requests === 1
      ? route.fulfill({ status: 503, json: { error: "workspace_unavailable" } })
      : route.continue();
  });
  await page.goto("/admin/login");
  await expect(page.getByRole("button", { name: "Retry connection" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Sign in to workspace" })).toBeDisabled();
  await page.getByRole("button", { name: "Retry connection" }).click();
  await expect(page.getByRole("button", { name: "Sign in to workspace" })).toBeEnabled();
  expect(requests).toBe(2);
});

test("the browser rejects secret credentials even if a misconfigured endpoint returns them", async ({
  page,
}) => {
  await page.route("**/api/public/config", (route) =>
    route.fulfill({
      json: { url: "https://admin-ui-test.supabase.co", key: "sb_secret_not_a_browser_key" },
    }),
  );
  await page.goto("/admin/login");
  await expect(page.getByRole("button", { name: "Retry connection" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Sign in to workspace" })).toBeDisabled();
});
