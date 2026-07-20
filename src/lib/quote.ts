import { supabase } from "@/lib/supabase";
import { saveMyProfile } from "@/lib/customer-profile";
import type {
  AnswerRecord,
  ConditionGroup,
  ConfigurationGroup,
  DeviceOrder,
  PickupSlot,
  QuoteBreakdown,
} from "@/lib/quote-types";

// A configuration group that depends on a family tag only shows once the
// user has picked an option elsewhere that produces that tag — e.g. the
// Intel-generation question appears after "Intel" is picked, and a GPU model
// question appears after its GPU-type question (GTX/RTX/Radeon) is picked.
// Any number of independent or chained sub-category questions can be built
// this way: each option may set a tag, and each group may require one.
export function getVisibleConfigurationGroups(
  groups: ConfigurationGroup[],
  selectedFamilyTags: Set<string>,
): ConfigurationGroup[] {
  return groups.filter((group) => {
    if (!group.depends_on_processor_family) return true;
    return selectedFamilyTags.has(group.depends_on_processor_family);
  });
}

// Collects every family tag produced by the user's current selections (not
// just the first one), so independent dependency chains — e.g. a CPU family
// chain and a separate GPU family chain — can each resolve correctly at once.
export function deriveSelectedFamilyTags(
  groups: ConfigurationGroup[],
  selectedOptionIds: Record<string, string[]>,
): Set<string> {
  const tags = new Set<string>();
  for (const group of groups) {
    const selected = selectedOptionIds[group.id];
    if (!selected?.length) continue;
    for (const option of group.configuration_options) {
      if (selected.includes(option.id) && option.processor_family) {
        tags.add(option.processor_family);
      }
    }
  }
  return tags;
}

export function buildAnswers(
  configGroups: ConfigurationGroup[],
  conditionGroups: ConditionGroup[],
  configSelections: Record<string, string[]>,
  conditionSelections: Record<string, string[]>,
): AnswerRecord[] {
  const answers: AnswerRecord[] = [];

  for (const group of configGroups) {
    const selected = configSelections[group.id] ?? [];
    for (const option of group.configuration_options) {
      if (!selected.includes(option.id)) continue;
      answers.push({
        kind: "configuration",
        group_id: group.id,
        group_title: group.title,
        option_id: option.id,
        option_label: option.label,
        price_effect_type: option.price_effect_type,
        price_effect_amount: option.price_effect_amount,
      });
    }
  }

  for (const group of conditionGroups) {
    const selected = conditionSelections[group.id] ?? [];
    for (const option of group.condition_options) {
      if (!selected.includes(option.id)) continue;
      answers.push({
        kind: "condition",
        group_id: group.id,
        group_title: group.title,
        option_id: option.id,
        option_label: option.label,
        price_effect_type: option.price_effect_type,
        price_effect_amount: option.price_effect_amount,
      });
    }
  }

  return answers;
}

export async function calculateQuote(
  modelId: string,
  configOptionIds: string[],
  conditionOptionIds: string[],
): Promise<QuoteBreakdown> {
  const { data, error } = await supabase.rpc("calculate_laptop_quote", {
    p_model_id: modelId,
    p_config_option_ids: configOptionIds,
    p_condition_option_ids: conditionOptionIds,
  });
  if (error) throw error;
  return data as QuoteBreakdown;
}

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
  answers: AnswerRecord[];
  quoteBreakdown: QuoteBreakdown;
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
      base_price: input.quoteBreakdown.base_price,
      final_quote: input.quoteBreakdown.final_quote,
      answers: input.answers,
      quote_breakdown: input.quoteBreakdown,
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
