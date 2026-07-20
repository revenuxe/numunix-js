import { publicSupabase } from "@/lib/supabase";
import type {
  Brand,
  Category,
  ConditionGroup,
  ConfigurationGroup,
  Model,
  Platform,
  Series,
} from "@/lib/quote-types";

export async function getLaptopCategory(): Promise<Category | null> {
  const { data, error } = await publicSupabase
    .from("device_categories")
    .select("*")
    .eq("slug", "laptops")
    .eq("active", true)
    .maybeSingle();
  if (error) throw error;
  return data as Category | null;
}

export async function getActiveBrands(categoryId: string): Promise<Brand[]> {
  const { data, error } = await publicSupabase
    .from("device_brands")
    .select("*")
    .eq("category_id", categoryId)
    .eq("active", true)
    .order("sort_order", { ascending: true });
  if (error) throw error;
  return (data ?? []) as Brand[];
}

export async function getBrandBySlug(categoryId: string, slug: string): Promise<Brand | null> {
  const { data, error } = await publicSupabase
    .from("device_brands")
    .select("*")
    .eq("category_id", categoryId)
    .eq("slug", slug)
    .eq("active", true)
    .maybeSingle();
  if (error) throw error;
  return data as Brand | null;
}

export async function getActiveSeries(brandId: string): Promise<Series[]> {
  const { data, error } = await publicSupabase
    .from("device_series")
    .select("*")
    .eq("brand_id", brandId)
    .eq("active", true)
    .order("sort_order", { ascending: true });
  if (error) throw error;
  return (data ?? []) as Series[];
}

export async function getSeriesBySlug(brandId: string, slug: string): Promise<Series | null> {
  const { data, error } = await publicSupabase
    .from("device_series")
    .select("*")
    .eq("brand_id", brandId)
    .eq("slug", slug)
    .eq("active", true)
    .maybeSingle();
  if (error) throw error;
  return data as Series | null;
}

export async function getActiveModels(seriesId: string): Promise<Model[]> {
  const { data, error } = await publicSupabase
    .from("device_models")
    .select("*")
    .eq("series_id", seriesId)
    .eq("active", true)
    .order("sort_order", { ascending: true });
  if (error) throw error;
  return (data ?? []) as Model[];
}

export async function getModelBySlug(seriesId: string, slug: string): Promise<Model | null> {
  const { data, error } = await publicSupabase
    .from("device_models")
    .select("*")
    .eq("series_id", seriesId)
    .eq("slug", slug)
    .eq("active", true)
    .maybeSingle();
  if (error) throw error;
  return data as Model | null;
}

// Groups visible for a given platform: platform-agnostic (null) groups always
// show; platform-specific groups only show for a matching brand platform.
export async function getConfigurationGroups(
  categoryId: string,
  platform: Platform,
): Promise<ConfigurationGroup[]> {
  const { data, error } = await publicSupabase
    .from("configuration_groups")
    .select("*, configuration_options(*)")
    .eq("category_id", categoryId)
    .eq("active", true)
    .or(`platform.is.null,platform.eq.${platform}`)
    .order("step_order", { ascending: true });
  if (error) throw error;
  return ((data ?? []) as ConfigurationGroup[]).map((group) => ({
    ...group,
    configuration_options: [...group.configuration_options].sort(
      (a, b) => a.sort_order - b.sort_order,
    ),
  }));
}

export async function getConditionGroups(categoryId: string): Promise<ConditionGroup[]> {
  const { data, error } = await publicSupabase
    .from("condition_groups")
    .select("*, condition_options(*)")
    .eq("category_id", categoryId)
    .eq("active", true)
    .order("step_order", { ascending: true });
  if (error) throw error;
  return ((data ?? []) as ConditionGroup[]).map((group) => ({
    ...group,
    condition_options: [...group.condition_options].sort((a, b) => a.sort_order - b.sort_order),
  }));
}
