import { enquirySchema } from "./enquiry-schema";
import { supabaseConfigured, supabaseUrl as url, supabaseKey as key } from "./supabase";

export const enquiriesConfigured = supabaseConfigured;

export async function submitEnquiry(values: unknown) {
  const enquiry = enquirySchema.parse(values);
  if (!enquiriesConfigured)
    throw new Error("Online enquiries are currently unavailable. Please email our team.");

  let response: Response;
  try {
    response = await fetch(`${url!.replace(/\/$/, "")}/rest/v1/contact_enquiries`, {
      method: "POST",
      headers: {
        apikey: key!,
        ...(!key!.startsWith("sb_publishable_") ? { Authorization: `Bearer ${key}` } : {}),
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify(enquiry),
      signal: AbortSignal.timeout(15000),
    });
  } catch {
    throw new Error(
      "We couldn’t confirm delivery. Please check your connection or email our team before trying again.",
    );
  }
  if (!response.ok)
    throw new Error("Your enquiry could not be saved. Please try again later or email our team.");
}
