import { supabase } from "@/lib/supabase";
import type { DeviceOrder, DeviceOrderStatus } from "@/lib/quote-types";

export async function listAllDeviceOrders(): Promise<DeviceOrder[]> {
  const { data, error } = await supabase
    .from("device_orders")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as DeviceOrder[];
}

export async function updateDeviceOrderStatus(id: string, status: DeviceOrderStatus) {
  const { error } = await supabase.from("device_orders").update({ status }).eq("id", id);
  if (error) throw error;
}

export async function deleteDeviceOrder(id: string) {
  const { error } = await supabase.from("device_orders").delete().eq("id", id);
  if (error) throw error;
}

export async function countActiveCategories(): Promise<number> {
  const { count, error } = await supabase
    .from("device_categories")
    .select("id", { count: "exact", head: true })
    .eq("active", true);
  if (error) throw error;
  return count ?? 0;
}
