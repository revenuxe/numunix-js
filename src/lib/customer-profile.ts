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
  phone: string;
  email?: string | null;
  address?: string | null;
  pincode?: string | null;
};

export async function saveMyProfile(input: SaveProfileInput): Promise<CustomerProfile> {
  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError || !userData.user) throw new Error("You must be signed in.");

  const { data, error } = await supabase
    .from("customer_profiles")
    .upsert(
      {
        id: userData.user.id,
        full_name: input.full_name.trim(),
        phone: input.phone.trim(),
        email: input.email?.trim() || null,
        address: input.address?.trim() || null,
        pincode: input.pincode?.trim() || null,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "id" },
    )
    .select("*")
    .single();
  if (error) throw error;
  return data as CustomerProfile;
}
