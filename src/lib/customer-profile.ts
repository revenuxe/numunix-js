import { supabase } from "@/lib/supabase";
import type { CustomerProfile } from "@/lib/quote-types";

export async function getMyProfile(): Promise<CustomerProfile | null> {
  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError || !userData.user) return null;

  const { data, error } = await supabase
    .from("customer_profiles")
    .select("*")
    .eq("id", userData.user.id)
    .maybeSingle();
  if (error) throw error;
  return data as CustomerProfile | null;
}

export type SaveProfileInput = {
  full_name: string;
  phone?: string | null;
  email?: string | null;
  address?: string | null;
  pincode?: string | null;
};

// Only fields actually passed in `input` are written — a partial save (e.g.
// autosaving just name + email right after signup) never clobbers phone/
// address/pincode saved earlier from a fuller update (the pickup form or the
// account page).
export async function saveMyProfile(input: SaveProfileInput): Promise<CustomerProfile> {
  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError || !userData.user) throw new Error("You must be signed in.");

  const payload: Record<string, unknown> = {
    id: userData.user.id,
    full_name: input.full_name.trim(),
    updated_at: new Date().toISOString(),
  };
  if (input.phone !== undefined) payload.phone = input.phone?.trim() || null;
  if (input.email !== undefined) payload.email = input.email?.trim() || null;
  if (input.address !== undefined) payload.address = input.address?.trim() || null;
  if (input.pincode !== undefined) payload.pincode = input.pincode?.trim() || null;

  const { data, error } = await supabase
    .from("customer_profiles")
    .upsert(payload, { onConflict: "id" })
    .select("*")
    .single();
  if (error) throw error;
  return data as CustomerProfile;
}
