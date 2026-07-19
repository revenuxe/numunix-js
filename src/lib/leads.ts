import { publicSupabase } from "@/lib/supabase";

export type LeadInput = {
  name: string;
  phone: string;
  postalCode?: string;
  service: string;
  message?: string;
  source: "hero" | "service" | "contact";
};

export async function createLead(input: LeadInput): Promise<string> {
  const { data, error } = await publicSupabase.rpc("submit_public_lead", {
    p_name: input.name.trim(),
    p_phone: input.phone.trim(),
    p_postal_code: input.postalCode?.trim() || null,
    p_service: input.service,
    p_message: input.message?.trim() || null,
    p_source: input.source,
  });

  if (error) throw error;
  if (!data) throw new Error("The lead was saved without a booking reference.");
  return data;
}