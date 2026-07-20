import { supabase } from "@/lib/supabase";
import type {
  Brand,
  Category,
  ConditionGroup,
  ConditionOption,
  ConfigurationGroup,
  ConfigurationOption,
  DeviceOrder,
  DeviceOrderStatus,
  Model,
  Platform,
  SelectionMode,
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

// ---------- Configuration groups & options ----------

export type ConfigGroupInput = {
  title: string;
  helper_text: string | null;
  platform: Platform | null;
  selection_mode: SelectionMode;
  step_order: number;
  depends_on_processor_family: string | null;
  active: boolean;
};

export async function listConfigurationGroups(categoryId: string): Promise<ConfigurationGroup[]> {
  const { data, error } = await supabase
    .from("configuration_groups")
    .select("*, configuration_options(*)")
    .eq("category_id", categoryId)
    .order("step_order", { ascending: true });
  if (error) throw error;
  return ((data ?? []) as ConfigurationGroup[]).map((g) => ({
    ...g,
    configuration_options: [...g.configuration_options].sort((a, b) => a.sort_order - b.sort_order),
  }));
}

export async function createConfigGroup(categoryId: string, input: ConfigGroupInput) {
  const { error } = await supabase
    .from("configuration_groups")
    .insert({ category_id: categoryId, ...input });
  if (error) throw error;
  await revalidateCatalog();
}

export async function updateConfigGroup(id: string, input: ConfigGroupInput) {
  const { error } = await supabase.from("configuration_groups").update(input).eq("id", id);
  if (error) throw error;
  await revalidateCatalog();
}

export async function deleteConfigGroup(id: string) {
  const { error } = await supabase.from("configuration_groups").delete().eq("id", id);
  if (error) throw error;
  await revalidateCatalog();
}

export type ConfigOptionInput = {
  label: string;
  description: string | null;
  price_effect_type: ConfigurationOption["price_effect_type"];
  price_effect_amount: number;
  processor_family: string | null;
  sort_order: number;
};

export async function createConfigOption(groupId: string, input: ConfigOptionInput) {
  const { error } = await supabase
    .from("configuration_options")
    .insert({ group_id: groupId, ...input });
  if (error) throw error;
  await revalidateCatalog();
}

export async function updateConfigOption(id: string, input: ConfigOptionInput) {
  const { error } = await supabase.from("configuration_options").update(input).eq("id", id);
  if (error) throw error;
  await revalidateCatalog();
}

export async function deleteConfigOption(id: string) {
  const { error } = await supabase.from("configuration_options").delete().eq("id", id);
  if (error) throw error;
  await revalidateCatalog();
}

// ---------- Condition groups & options ----------

export type ConditionGroupInput = {
  title: string;
  helper_text: string | null;
  selection_mode: SelectionMode;
  step_order: number;
  active: boolean;
};

export async function listConditionGroups(categoryId: string): Promise<ConditionGroup[]> {
  const { data, error } = await supabase
    .from("condition_groups")
    .select("*, condition_options(*)")
    .eq("category_id", categoryId)
    .order("step_order", { ascending: true });
  if (error) throw error;
  return ((data ?? []) as ConditionGroup[]).map((g) => ({
    ...g,
    condition_options: [...g.condition_options].sort((a, b) => a.sort_order - b.sort_order),
  }));
}

export async function createConditionGroup(categoryId: string, input: ConditionGroupInput) {
  const { error } = await supabase
    .from("condition_groups")
    .insert({ category_id: categoryId, ...input });
  if (error) throw error;
  await revalidateCatalog();
}

export async function updateConditionGroup(id: string, input: ConditionGroupInput) {
  const { error } = await supabase.from("condition_groups").update(input).eq("id", id);
  if (error) throw error;
  await revalidateCatalog();
}

export async function deleteConditionGroup(id: string) {
  const { error } = await supabase.from("condition_groups").delete().eq("id", id);
  if (error) throw error;
  await revalidateCatalog();
}

export type ConditionOptionInput = {
  label: string;
  description: string | null;
  price_effect_type: ConditionOption["price_effect_type"];
  price_effect_amount: number;
  sort_order: number;
};

export async function createConditionOption(groupId: string, input: ConditionOptionInput) {
  const { error } = await supabase
    .from("condition_options")
    .insert({ group_id: groupId, ...input });
  if (error) throw error;
  await revalidateCatalog();
}

export async function updateConditionOption(id: string, input: ConditionOptionInput) {
  const { error } = await supabase.from("condition_options").update(input).eq("id", id);
  if (error) throw error;
  await revalidateCatalog();
}

export async function deleteConditionOption(id: string) {
  const { error } = await supabase.from("condition_options").delete().eq("id", id);
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
