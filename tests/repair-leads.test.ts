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
test("booking forms accept each repair visit option and appliance page sources", () => {
  for (const timeline of ["Today if available", "Within a week", "Schedule a visit"]) {
    const result = enquirySchema.parse({name:"Repair Test",phone:"9876543210",service:"Washing Machine Repair",timeline,description:"Drain fault",source:"/appliances/repairs/washing-machine-repair"});
    expect(result.timeline).toBe(timeline);
    expect(result.source).toBe("/appliances/repairs/washing-machine-repair");
  }
});