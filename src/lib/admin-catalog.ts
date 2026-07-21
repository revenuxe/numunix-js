import { supabase } from "@/lib/supabase";
import type {
  Brand,
  Category,
  DeviceOrder,
  DeviceOrderStatus,
  Model,
  Platform,
  Series,
} from "@/lib/quote-types";

export { slugify } from "@/lib/slug";

const DEVICE_ASSETS_BUCKET = "device-assets";
const MAX_IMAGE_BYTES = 5 * 1024 * 1024;
const ALLOWED_IMAGE_TYPES = ["image/png", "image/jpeg", "image/webp", "image/svg+xml"];

// Every catalog write calls this so the public site's cached reads
// (unstable_cache, tagged "catalog") refresh immediately instead of waiting
// out their revalidate window. Best-effort: a failed revalidate never blocks
// the admin action, the cache just self-heals on its normal TTL instead.
async function revalidateCatalog() {
  try {
    await fetch("/api/revalidate", { method: "POST" });
  } catch {
    // ignore — TTL-based revalidation is the fallback
  }
}

// Plain (uncached) read for client components. `@/lib/catalog` wraps its
// reads in `unstable_cache`, which is a server-only API — calling it from a
// 'use client' component throws "incrementalCache missing in unstable_cache"
// at runtime, so the admin dashboard needs its own copy of this query.
export async function getLaptopCategoryForAdmin(): Promise<Category | null> {
  const { data, error } = await supabase
    .from("device_categories")
    .select("*")
    .eq("slug", "laptops")
    .maybeSingle();
  if (error) throw error;
  return data as Category | null;
}

export async function uploadDeviceAsset(file: File): Promise<string> {
  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    throw new Error("Please upload a PNG, JPEG, WEBP or SVG image.");
  }
  if (file.size > MAX_IMAGE_BYTES) {
    throw new Error("Image must be smaller than 5MB.");
  }
  const path = `${crypto.randomUUID()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, "")}`;
  const { error } = await supabase.storage
    .from(DEVICE_ASSETS_BUCKET)
    .upload(path, file, { upsert: false });
  if (error) throw error;
  const { data } = supabase.storage.from(DEVICE_ASSETS_BUCKET).getPublicUrl(path);
  return data.publicUrl;
}

async function swapSortOrder(
  table: string,
  a: { id: string; sort_order: number },
  b: { id: string; sort_order: number },
) {
  const { error: e1 } = await supabase
    .from(table)
    .update({ sort_order: b.sort_order })
    .eq("id", a.id);
  if (e1) throw e1;
  const { error: e2 } = await supabase
    .from(table)
    .update({ sort_order: a.sort_order })
    .eq("id", b.id);
  if (e2) throw e2;
  await revalidateCatalog();
}

// ---------- Brands ----------

export type BrandInput = {
  name: string;
  slug: string;
  platform: Platform;
  logo: string | null;
  active: boolean;
};

export async function listAllBrands(categoryId: string): Promise<Brand[]> {
  const { data, error } = await supabase
    .from("device_brands")
    .select("*")
    .eq("category_id", categoryId)
    .order("sort_order", { ascending: true });
  if (error) throw error;
  return (data ?? []) as Brand[];
}

export async function createBrand(categoryId: string, input: BrandInput, sortOrder: number) {
  const { error } = await supabase
    .from("device_brands")
    .insert({ category_id: categoryId, ...input, sort_order: sortOrder });
  if (error) throw error;
  await revalidateCatalog();
}

export async function updateBrand(id: string, input: BrandInput) {
  const { error } = await supabase.from("device_brands").update(input).eq("id", id);
  if (error) throw error;
  await revalidateCatalog();
}

export async function deleteBrand(id: string) {
  const { error } = await supabase.from("device_brands").delete().eq("id", id);
  if (error) throw error;
  await revalidateCatalog();
}

export async function reorderBrand(a: Brand, b: Brand) {
  await swapSortOrder("device_brands", a, b);
}

// ---------- Series ----------

export type SeriesInput = { name: string; slug: string; image: string | null; active: boolean };

export async function listAllSeries(brandId: string): Promise<Series[]> {
  const { data, error } = await supabase
    .from("device_series")
    .select("*")
    .eq("brand_id", brandId)
    .order("sort_order", { ascending: true });
  if (error) throw error;
  return (data ?? []) as Series[];
}

export async function createSeries(brandId: string, input: SeriesInput, sortOrder: number) {
  const { error } = await supabase
    .from("device_series")
    .insert({ brand_id: brandId, ...input, sort_order: sortOrder });
  if (error) throw error;
  await revalidateCatalog();
}

export async function updateSeries(id: string, input: SeriesInput) {
  const { error } = await supabase.from("device_series").update(input).eq("id", id);
  if (error) throw error;
  await revalidateCatalog();
}

export async function deleteSeries(id: string) {
  const { error } = await supabase.from("device_series").delete().eq("id", id);
  if (error) throw error;
  await revalidateCatalog();
}

export async function reorderSeries(a: Series, b: Series) {
  await swapSortOrder("device_series", a, b);
}

// ---------- Models ----------

export type ModelInput = {
  name: string;
  slug: string;
  base_price: number;
  year: number;
  image: string | null;
  active: boolean;
};

export async function listAllModels(seriesId: string): Promise<Model[]> {
  const { data, error } = await supabase
    .from("device_models")
    .select("*")
    .eq("series_id", seriesId)
    .order("sort_order", { ascending: true });
  if (error) throw error;
  return (data ?? []) as Model[];
}

export async function createModel(seriesId: string, input: ModelInput, sortOrder: number) {
  const { error } = await supabase
    .from("device_models")
    .insert({ series_id: seriesId, ...input, sort_order: sortOrder });
  if (error) throw error;
  await revalidateCatalog();
}

export async function updateModel(id: string, input: ModelInput) {
  const { error } = await supabase.from("device_models").update(input).eq("id", id);
  if (error) throw error;
  await revalidateCatalog();
}

export async function deleteModel(id: string) {
  const { error } = await supabase.from("device_models").delete().eq("id", id);
  if (error) throw error;
  await revalidateCatalog();
}

// ---------- Orders ----------

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
