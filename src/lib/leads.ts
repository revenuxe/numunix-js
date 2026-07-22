import { publicSupabase, supabase } from "@/lib/supabase";

export type LeadInput = {
  name: string;
  phone: string;
  postalCode?: string;
  service: string;
  message?: string;
  source: "hero" | "service" | "contact";
};

export async function createLead(input: LeadInput): Promise<string> {
  // If the visitor is signed in, stamp the request with their user id so it
  // shows up in their "My requests" page. Anonymous visitors must still be
  // able to submit, so a failed/absent auth check just leaves this null
  // rather than blocking the submission.
  const userId = await supabase.auth
    .getUser()
    .then(({ data }) => data.user?.id ?? null)
    .catch(() => null);

  const { data, error } = await publicSupabase.rpc("submit_public_lead", {
    p_name: input.name.trim(),
    p_phone: input.phone.trim(),
    p_postal_code: input.postalCode?.trim() || null,
    p_service: input.service,
    p_message: input.message?.trim() || null,
    p_source: input.source,
    p_user_id: userId,
  });

  if (error) throw error;
  if (!data) throw new Error("The lead was saved without a booking reference.");
  return data;
}

export type MyLead = {
  id: string;
  created_at: string;
  service: string;
  postal_code: string | null;
  message: string | null;
  booking_id: string | null;
};

export async function getMyLeads(): Promise<MyLead[]> {
  const { data, error } = await supabase
    .from("leads")
    .select("id, created_at, service, postal_code, message, booking_id")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as MyLead[];
}
