import { unstable_cache } from "next/cache";
import { publicSupabase } from "@/lib/supabase";
import type { Brand, Category, Model, Series } from "@/lib/quote-types";

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

// ---------- Combined single-round-trip lookups ----------
//
// The catalog funnel (brand -> series -> model) used to resolve each level
// with its own sequential, dependent Supabase call (category -> brand ->
// series -> model), so the model page alone cost 4 network round trips
// before it could render — and generateMetadata repeated the same chain.
// Postgrest can embed the whole related-table chain in one request, so these
// collapse each page's lookup to a single round trip instead.

type BrandRow = Brand & { device_categories?: { slug: string } };
type SeriesRow = Series & { device_brands?: BrandRow; device_models?: Model[] };
type SeriesWithBrandRow = Series & { device_brands?: BrandRow };
type ModelRow = Model & { device_series?: SeriesWithBrandRow };

function stripEmbed<T extends object, K extends string>(row: T, ...keys: K[]): Omit<T, K> {
  const copy = { ...row };
  for (const key of keys) delete copy[key as unknown as keyof T];
  return copy;
}

export const getActiveBrandsForLaptops = unstable_cache(
  async (): Promise<Brand[]> => {
    const { data, error } = await publicSupabase
      .from("device_brands")
      .select("*, device_categories!inner(slug)")
      .eq("active", true)
      .eq("device_categories.slug", "laptops")
      .order("sort_order", { ascending: true });
    if (error) throw error;
    return ((data ?? []) as BrandRow[]).map((row) => stripEmbed(row, "device_categories"));
  },
  ["active-brands-for-laptops"],
  { revalidate: REVALIDATE_SECONDS, tags: CATALOG_TAGS },
);

export const getBrandWithSeries = unstable_cache(
  async (brandSlug: string): Promise<{ brand: Brand; series: Series[] } | null> => {
    const { data, error } = await publicSupabase
      .from("device_brands")
      .select("*, device_categories!inner(slug), device_series(*)")
      .eq("slug", brandSlug)
      .eq("active", true)
      .eq("device_categories.slug", "laptops")
      .eq("device_series.active", true)
      .order("sort_order", { referencedTable: "device_series", ascending: true })
      .maybeSingle();
    if (error) throw error;
    if (!data) return null;
    const row = data as BrandRow & { device_series?: Series[] };
    const series = row.device_series ?? [];
    return { brand: stripEmbed(row, "device_categories", "device_series"), series };
  },
  ["brand-with-series"],
  { revalidate: REVALIDATE_SECONDS, tags: CATALOG_TAGS },
);

export const getSeriesWithModels = unstable_cache(
  async (
    brandSlug: string,
    seriesSlug: string,
  ): Promise<{ brand: Brand; series: Series; models: Model[] } | null> => {
    const { data, error } = await publicSupabase
      .from("device_series")
      .select("*, device_brands!inner(*, device_categories!inner(slug)), device_models(*)")
      .eq("slug", seriesSlug)
      .eq("active", true)
      .eq("device_brands.slug", brandSlug)
      .eq("device_brands.device_categories.slug", "laptops")
      .eq("device_models.active", true)
      .order("sort_order", { referencedTable: "device_models", ascending: true })
      .maybeSingle();
    if (error) throw error;
    if (!data) return null;
    const row = data as SeriesRow;
    if (!row.device_brands) return null;
    const brand = stripEmbed(row.device_brands, "device_categories");
    const models = row.device_models ?? [];
    return { brand, series: stripEmbed(row, "device_brands", "device_models"), models };
  },
  ["series-with-models"],
  { revalidate: REVALIDATE_SECONDS, tags: CATALOG_TAGS },
);

export const getModelWithContext = unstable_cache(
  async (
    brandSlug: string,
    seriesSlug: string,
    modelSlug: string,
  ): Promise<{ brand: Brand; series: Series; model: Model } | null> => {
    const { data, error } = await publicSupabase
      .from("device_models")
      .select("*, device_series!inner(*, device_brands!inner(*, device_categories!inner(slug)))")
      .eq("slug", modelSlug)
      .eq("active", true)
      .eq("device_series.slug", seriesSlug)
      .eq("device_series.device_brands.slug", brandSlug)
      .eq("device_series.device_brands.device_categories.slug", "laptops")
      .maybeSingle();
    if (error) throw error;
    if (!data) return null;
    const row = data as ModelRow;
    if (!row.device_series?.device_brands) return null;
    const brand = stripEmbed(row.device_series.device_brands, "device_categories");
    const series = stripEmbed(row.device_series, "device_brands");
    return { brand, series, model: stripEmbed(row, "device_series") };
  },
  ["model-with-context"],
  { revalidate: REVALIDATE_SECONDS, tags: CATALOG_TAGS },
);
