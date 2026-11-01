import { createServerFn } from "@tanstack/react-start";
import { enquirySchema } from "./enquiry-schema";

export const createRepairBooking = createServerFn({ method: "POST" })
  .inputValidator((values: unknown) => enquirySchema.parse(values))
  .handler(async ({ data }) => {
    // Public write-only form: validate first and return only this new row's receipt.
    try {
      const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
      const { data: booking, error } = await supabaseAdmin.from("contact_enquiries")
        .insert(data).select("booking_reference, service").single();
      if (error || !booking?.booking_reference) {
        throw new Error("Booking storage unavailable");
      }
      return { reference: booking.booking_reference, service: booking.service };
    } catch {
      // Never send integration configuration or raw provider errors to visitors.
      console.error("Repair booking could not be stored");
      throw new Error("Your request could not be saved. Please try again or contact our team.");
    }
  });