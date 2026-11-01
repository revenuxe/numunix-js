import test from "node:test";
import assert from "node:assert/strict";
import { enquirySchema } from "../src/lib/enquiry-schema.ts";
import { isPublicSupabaseKey } from "../src/lib/supabase-config.ts";

test("only publishable and legacy anon keys are accepted", () => {
  const jwt = (role) => `header.${Buffer.from(JSON.stringify({ role })).toString("base64url")}.signature`;
  assert.equal(isPublicSupabaseKey("sb_publishable_example"), true);
  assert.equal(isPublicSupabaseKey(jwt("anon")), true);
  assert.equal(isPublicSupabaseKey(jwt("service_role")), false);
  assert.equal(isPublicSupabaseKey("sb_secret_example"), false);
  assert.equal(isPublicSupabaseKey("invalid"), false);
});

const valid = {
  name: " Test Visitor ",
  phone: "+91 98765 43210",
  email: "",
  service: "Mobile Repair",
  timeline: "Flexible",
  description: "",
  source: "/contact",
};
test("optional fields become null and names are trimmed", () => {
  const result = enquirySchema.parse(valid);
  assert.equal(result.name, "Test Visitor");
  assert.equal(result.email, null);
  assert.equal(result.description, null);
});
test("invalid contact details and oversized descriptions are rejected", () => {
  for (const invalid of [
    { name: "   " },
    { phone: "......." },
    { phone: "1234567890123456" },
    { email: "not-an-email" },
    { service: "" },
    { description: "x".repeat(1501) },
    { source: "https://example.com" },
  ]) {
    assert.equal(enquirySchema.safeParse({ ...valid, ...invalid }).success, false);
  }
});
test("repair requests can omit email and keep their originating service page", () => {
  const { email, ...withoutEmail } = valid;
  const result = enquirySchema.parse({ ...withoutEmail, source: "/electronic/repairs/mobile-repair" });
  assert.equal(result.email, null);
  assert.equal(result.source, "/electronic/repairs/mobile-repair");
});
test("both page sources and international phone formatting are accepted", () => {
  for (const source of ["/", "/contact"]) {
    assert.equal(
      enquirySchema.safeParse({
        ...valid,
        source,
        phone: "+1 (415) 555-0123",
        email: "visitor@example.com",
      }).success,
      true,
    );
  }
});
