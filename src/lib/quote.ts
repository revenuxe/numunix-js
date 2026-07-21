import { supabase } from "@/lib/supabase";
import { saveMyProfile } from "@/lib/customer-profile";
import type { DeviceOrder, PickupSlot } from "@/lib/quote-types";

export type SubmitDeviceOrderInput = {
  customerName: string;
  phone: string;
  email?: string;
  address: string;
  pincode: string;
  pickupDate: string;
  pickupSlot: PickupSlot;
  notes?: string;
  categoryName: string;
  brandName: string;
  seriesName: string;
  modelName: string;
  modelId: string;
  basePrice: number;
};

export async function submitDeviceOrder(input: SubmitDeviceOrderInput): Promise<DeviceOrder> {
  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError || !userData.user) throw new Error("You must be signed in to book a pickup.");

  const { data, error } = await supabase
    .from("device_orders")
    .insert({
      user_id: userData.user.id,
      customer_name: input.customerName.trim(),
      phone: input.phone.trim(),
      email: input.email?.trim() || null,
      address: input.address.trim(),
      pincode: input.pincode.trim(),
      pickup_date: input.pickupDate,
      pickup_slot: input.pickupSlot,
      notes: input.notes?.trim() || null,
      category_name: input.categoryName,
      brand_name: input.brandName,
      series_name: input.seriesName,
      model_name: input.modelName,
      model_id: input.modelId,
      base_price: input.basePrice,
      final_quote: input.basePrice,
    })
    .select("*")
    .single();

  if (error) throw error;

  // Best-effort: remember this customer's details so their next booking (same
  // or different laptop) can be prefilled without asking again. Never blocks
  // the order itself if it fails.
  try {
    await saveMyProfile({
      full_name: input.customerName,
      phone: input.phone,
      email: input.email,
      address: input.address,
      pincode: input.pincode,
    });
  } catch {
    // ignore — the order already succeeded, profile save is a convenience
  }

  return data as DeviceOrder;
}

export async function getMyDeviceOrders(): Promise<DeviceOrder[]> {
  const { data, error } = await supabase
    .from("device_orders")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as DeviceOrder[];
}

// A customer can only ever move their own order to "cancelled" — RLS enforces
// this server-side too, and refuses once the order is already marked paid.
export async function cancelMyDeviceOrder(id: string): Promise<void> {
  const { error } = await supabase
    .from("device_orders")
    .update({ status: "cancelled" })
    .eq("id", id);
  if (error) throw error;
}
