import { createServerFn } from "@tanstack/react-start";
import { enquirySchema } from "./enquiry-schema";

export const createRepairBooking = createServerFn({ method: "POST" })
  .inputValidator((values: unknown) => enquirySchema.parse(values))
  .handler(async ({ data }) => {
    // Public write-only form: validate first and return only this new row's receipt.
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: booking, error } = await supabaseAdmin.from("contact_enquiries")
      .insert(data).select("booking_reference, service").single();
    if (error || !booking?.booking_reference) {
      console.error("Repair booking insert failed", error?.code);
      throw new Error("Your request could not be saved. Please try again or contact our team.");
    }
    return { reference: booking.booking_reference, service: booking.service };
  });