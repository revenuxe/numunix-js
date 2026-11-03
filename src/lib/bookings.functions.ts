import { createServerFn } from "@tanstack/react-start";
import { enquirySchema } from "./enquiry-schema";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";
import { notifyRepairTeam } from "./booking-notification";

export const createRepairBooking = createServerFn({ method: "POST" })
  .inputValidator((values: unknown) => enquirySchema.parse(values))
  .handler(async ({ data }) => {
    // Public write-only form: validate first and return only this new row's receipt.
    try {
      const url = process.env['SUPABASE_URL'] || process.env['VITE_SUPABASE_URL'];
      const key = process.env['SUPABASE_PUBLISHABLE_KEY'] || process.env['VITE_SUPABASE_PUBLISHABLE_KEY'];
      if (!url || !key) throw new Error("Booking configuration unavailable");
      const client = createClient<Database>(url, key, {
        auth: { persistSession: false, autoRefreshToken: false },
        global: { fetch: (input, init) => {
          const headers = new Headers(init?.headers);
          if (key.startsWith('sb_') && headers.get('Authorization') === `Bearer ${key}`) headers.delete('Authorization');
          headers.set('apikey', key);
          return fetch(input, { ...init, headers });
        } },
      });
      const { data: booking, error } = await client.rpc('submit_repair_booking', {
        p_name: data.name, p_phone: data.phone, p_service: data.service,
        p_brand: data.brand ?? '',
        p_timeline: data.timeline, p_description: data.description ?? '', p_source: data.source,
      }).single();
      if (error || !booking?.reference) {
        throw new Error("Booking storage unavailable");
      }
      const notification = await notifyRepairTeam({ ...data, reference: booking.reference }, process.env['RESEND_API_KEY']);
      if (notification !== "sent") {
        // Log the receipt and outcome only, never customer details or provider credentials.
        console.error("Repair notification not sent", { reference: booking.reference, reason: notification });
      }
      return { reference: booking.reference, service: booking.service };
    } catch {
      // Never send integration configuration or raw provider errors to visitors.
      console.error("Repair booking could not be stored");
      throw new Error("Your request could not be saved. Please try again or contact our team.");
    }
  });
