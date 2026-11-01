import { expect, test } from "bun:test";
import { enquirySchema } from "../src/lib/enquiry-schema";
import { repairLeadCategory, repairLeadWhatsApp } from "../src/lib/repair-leads";
test("repair enquiries do not require email and retain their service page", () => {
  const result = enquirySchema.parse({name:"Repair Test",phone:"+91 98765 43210",service:"Mobile Repair",timeline:"Within a week",description:"Charging fault",source:"/electronic/repairs/mobile-repair"});
  expect(result.email).toBeNull();
  expect(result.source).toBe("/electronic/repairs/mobile-repair");
});
test("mobile and washer leads are classified into their repair categories", () => {
  expect(repairLeadCategory({service:"Mobile Repair",source:"/contact"})).toBe("electronics");
  expect(repairLeadCategory({service:"Washing Machine Repair",source:"/contact"})).toBe("appliances");
});
test("local customer numbers open an Indian WhatsApp chat", () => {
  expect(repairLeadWhatsApp("98765 43210")).toBe("https://wa.me/919876543210");
});