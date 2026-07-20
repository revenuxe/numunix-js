import { unstable_cache } from "next/cache";
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

// Catalog reads are wrapped in Next's Data Cache so repeat requests (and the
// duplicate generateMetadata + page fetch Next.js makes for every route) are
// served without round-tripping to Supabase. Revalidates every 30s, so admin
// catalog edits show up shortly without needing manual cache invalidation.
const CATALOG_TAGS = ["catalog"];
const REVALIDATE_SECONDS = 30;

export const getLaptopCategory = unstable_cache(
  async (): Promise<Category | null> => {
    const { data, error } = await publicSupabase
      .from("device_categories")
      .select("*")
      .eq("slug", "laptops")
      .eq("active", true)
      .maybeSingle();
    if (error) throw error;
    return data as Category | null;
  },
  ["laptop-category"],
  { revalidate: REVALIDATE_SECONDS, tags: CATALOG_TAGS },
);

export const getActiveBrands = unstable_cache(
  async (categoryId: string): Promise<Brand[]> => {
    const { data, error } = await publicSupabase
      .from("device_brands")
      .select("*")
      .eq("category_id", categoryId)
      .eq("active", true)
      .order("sort_order", { ascending: true });
    if (error) throw error;
    return (data ?? []) as Brand[];
  },
  ["active-brands"],
  { revalidate: REVALIDATE_SECONDS, tags: CATALOG_TAGS },
);

export const getBrandBySlug = unstable_cache(
  async (categoryId: string, slug: string): Promise<Brand | null> => {
    const { data, error } = await publicSupabase
      .from("device_brands")
      .select("*")
      .eq("category_id", categoryId)
      .eq("slug", slug)
      .eq("active", true)
      .maybeSingle();
    if (error) throw error;
    return data as Brand | null;
  },
  ["brand-by-slug"],
  { revalidate: REVALIDATE_SECONDS, tags: CATALOG_TAGS },
);

export const getActiveSeries = unstable_cache(
  async (brandId: string): Promise<Series[]> => {
    const { data, error } = await publicSupabase
      .from("device_series")
      .select("*")
      .eq("brand_id", brandId)
      .eq("active", true)
      .order("sort_order", { ascending: true });
    if (error) throw error;
    return (data ?? []) as Series[];
  },
  ["active-series"],
  { revalidate: REVALIDATE_SECONDS, tags: CATALOG_TAGS },
);

export const getSeriesBySlug = unstable_cache(
  async (brandId: string, slug: string): Promise<Series | null> => {
    const { data, error } = await publicSupabase
      .from("device_series")
      .select("*")
      .eq("brand_id", brandId)
      .eq("slug", slug)
      .eq("active", true)
      .maybeSingle();
    if (error) throw error;
    return data as Series | null;
  },
  ["series-by-slug"],
  { revalidate: REVALIDATE_SECONDS, tags: CATALOG_TAGS },
);

export const getActiveModels = unstable_cache(
  async (seriesId: string): Promise<Model[]> => {
    const { data, error } = await publicSupabase
      .from("device_models")
      .select("*")
      .eq("series_id", seriesId)
      .eq("active", true)
      .order("sort_order", { ascending: true });
    if (error) throw error;
    return (data ?? []) as Model[];
  },
  ["active-models"],
  { revalidate: REVALIDATE_SECONDS, tags: CATALOG_TAGS },
);

export const getModelBySlug = unstable_cache(
  async (seriesId: string, slug: string): Promise<Model | null> => {
    const { data, error } = await publicSupabase
      .from("device_models")
      .select("*")
      .eq("series_id", seriesId)
      .eq("slug", slug)
      .eq("active", true)
      .maybeSingle();
    if (error) throw error;
    return data as Model | null;
  },
  ["model-by-slug"],
  { revalidate: REVALIDATE_SECONDS, tags: CATALOG_TAGS },
);

// Groups visible for a given platform: platform-agnostic (null) groups always
// show; platform-specific groups only show for a matching brand platform.
export const getConfigurationGroups = unstable_cache(
  async (categoryId: string, platform: Platform): Promise<ConfigurationGroup[]> => {
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
  },
  ["configuration-groups"],
  { revalidate: REVALIDATE_SECONDS, tags: CATALOG_TAGS },
);

export const getConditionGroups = unstable_cache(
  async (categoryId: string): Promise<ConditionGroup[]> => {
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
  },
  ["condition-groups"],
  { revalidate: REVALIDATE_SECONDS, tags: CATALOG_TAGS },
);
