import test from "node:test";
import assert from "node:assert/strict";
import { resolvePublicSupabaseConfig } from "../src/lib/supabase-config.ts";

const url = "https://test-project.supabase.co";
const key = "sb_publishable_test_only";
test("resolves server, browser and migration variable names without exposing other environment values", () => {
  for (const prefix of ["", "NEXT_PUBLIC_", "VITE_"]) {
    const config = resolvePublicSupabaseConfig({
      [`${prefix}SUPABASE_URL`]: ` ${url}/ `,
      [`${prefix}SUPABASE_PUBLISHABLE_KEY`]: ` ${key} `,
      SUPABASE_SERVICE_ROLE_KEY: "sb_secret_never_return",
    });
    assert.deepEqual(config, { url, key });
  }
});
test("supports legacy anon JWTs but rejects service-role and secret keys regardless of variable name", () => {
  const jwt = (role) =>
    `header.${Buffer.from(JSON.stringify({ role })).toString("base64url")}.signature`;
  for (const prefix of ["", "NEXT_PUBLIC_", "VITE_"]) {
    assert.deepEqual(
      resolvePublicSupabaseConfig({
        [`${prefix}SUPABASE_URL`]: url,
        [`${prefix}SUPABASE_ANON_KEY`]: jwt("anon"),
      }),
      { url, key: jwt("anon") },
    );
    for (const unsafe of [jwt("service_role"), "sb_secret_not_public"])
      assert.equal(
        resolvePublicSupabaseConfig({
          [`${prefix}SUPABASE_URL`]: url,
          [`${prefix}SUPABASE_PUBLISHABLE_KEY`]: unsafe,
        }),
        null,
      );
  }
});
test("prefers complete matching project pairs and supports one URL with a split current key name", () => {
  assert.deepEqual(
    resolvePublicSupabaseConfig({
      SUPABASE_URL: "https://wrong-project.supabase.co",
      NEXT_PUBLIC_SUPABASE_URL: url,
      NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: key,
    }),
    { url, key },
  );
  assert.deepEqual(
    resolvePublicSupabaseConfig({ SUPABASE_URL: url, NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: key }),
    { url, key },
  );
});
test("missing or malformed deployment config fails closed; loopback is opt-in for server test backends", () => {
  assert.equal(resolvePublicSupabaseConfig({}), null);
  for (const badUrl of [
    "not a url",
    "http://example.com",
    "https://user:password@example.com",
    "https://example.com?secret=1",
  ])
    assert.equal(
      resolvePublicSupabaseConfig({ SUPABASE_URL: badUrl, SUPABASE_PUBLISHABLE_KEY: key }),
      null,
    );
  const local = { SUPABASE_URL: "http://127.0.0.1:4180", SUPABASE_PUBLISHABLE_KEY: key };
  assert.equal(resolvePublicSupabaseConfig(local), null);
  assert.deepEqual(resolvePublicSupabaseConfig(local, { allowLoopback: true }), {
    url: local.SUPABASE_URL,
    key,
  });
});
