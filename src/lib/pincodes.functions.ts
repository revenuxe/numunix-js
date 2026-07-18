import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { createClient } from "@supabase/supabase-js";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import type { Database } from "@/integrations/supabase/types";

function anonClient() {
  return createClient<Database>(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_PUBLISHABLE_KEY!,
    { auth: { persistSession: false, autoRefreshToken: false } },
  );
}

export const checkPincode = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) =>
    z.object({ pincode: z.string().trim().min(3).max(12) }).parse(input),
  )
  .handler(async ({ data }) => {
    const supabase = anonClient();
    const { data: row } = await supabase
      .from("pincodes")
      .select("pincode, city, active")
      .eq("pincode", data.pincode)
      .maybeSingle();
    return { available: !!row?.active, city: row?.city ?? null };
  });

export const listPincodes = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase
      .from("pincodes")
      .select("*")
      .order("pincode");
    if (error) throw new Error(error.message);
    return data ?? [];
  });

export const addPincode = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) =>
    z
      .object({
        pincode: z.string().trim().min(3).max(12),
        city: z.string().trim().max(80).optional().or(z.literal("")),
        active: z.boolean().optional(),
      })
      .parse(input),
  )
  .handler(async ({ data, context }) => {
    const { error } = await context.supabase.from("pincodes").upsert(
      {
        pincode: data.pincode,
        city: data.city || null,
        active: data.active ?? true,
      },
      { onConflict: "pincode" },
    );
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const deletePincode = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => z.object({ id: z.string().uuid() }).parse(input))
  .handler(async ({ data, context }) => {
    const { error } = await context.supabase.from("pincodes").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const togglePincode = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) =>
    z.object({ id: z.string().uuid(), active: z.boolean() }).parse(input),
  )
  .handler(async ({ data, context }) => {
    const { error } = await context.supabase
      .from("pincodes")
      .update({ active: data.active })
      .eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });
