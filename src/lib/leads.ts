import { supabase } from "@/lib/supabase";

export type LeadInput = {
  name: string;
  phone: string;
  postalCode?: string;
  service: string;
  message?: string;
  source: "hero" | "service" | "contact";
};

export async function createLead(input: LeadInput) {
  const { error } = await supabase.from("leads").insert({
    name: input.name.trim(),
    email: null,
    phone: input.phone.trim(),
    postal_code: input.postalCode?.trim() || null,
    service: input.service,
    message: input.message?.trim() || null,
    source: input.source,
  });
  if (error) throw error;
}
