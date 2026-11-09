import { defineConfig } from "@playwright/test";
const runtimeConfig = process.env["TEST_RUNTIME_SUPABASE_CONFIG"] === "1";

export default defineConfig({
  testDir: "./tests",
  testMatch: "**/*.spec.ts",
  globalSetup: "./tests/booking-backend.ts",
  fullyParallel: false,
  workers: 1,
  timeout: 60000,
  use: {
    baseURL: "http://127.0.0.1:4173",
    browserName: "chromium",
    screenshot: "only-on-failure",
    trace: "retain-on-failure",
  },
  webServer: {
    command: "npm run build && npm start -- --hostname 127.0.0.1 --port 4173",
    url: "http://127.0.0.1:4173",
    reuseExistingServer: false,
    timeout: 120000,
    env: {
      NEXT_PUBLIC_SUPABASE_URL: runtimeConfig ? "" : "https://admin-ui-test.supabase.co",
      NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: runtimeConfig ? "" : "sb_publishable_ui_test_only",
      NEXT_PUBLIC_SUPABASE_ANON_KEY: "",
      VITE_SUPABASE_URL: runtimeConfig ? "https://admin-ui-test.supabase.co" : "",
      VITE_SUPABASE_PUBLISHABLE_KEY: runtimeConfig ? "sb_publishable_ui_test_only" : "",
      SUPABASE_URL: "http://127.0.0.1:4180",
      SUPABASE_PUBLISHABLE_KEY: "sb_publishable_booking_test_only",
      RESEND_API_KEY: "",
    },
  },
});
