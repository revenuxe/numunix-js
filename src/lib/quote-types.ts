export type Platform = "apple" | "windows";
export type SelectionMode = "single" | "multi";
export type PriceEffectType = "bonus_fixed" | "deduct_fixed" | "deduct_percent";
export type DeviceOrderStatus =
  "new" | "contacted" | "scheduled" | "paid" | "cancelled" | "rejected";
export type PickupSlot = "morning" | "afternoon" | "evening";

export type Category = {
  id: string;
  name: string;
  slug: string;
  icon: string | null;
  active: boolean;
  sort_order: number;
};

export type Brand = {
  id: string;
  category_id: string;
  name: string;
  slug: string;
  logo: string | null;
  platform: Platform;
  active: boolean;
  sort_order: number;
};

export type Series = {
  id: string;
  brand_id: string;
  name: string;
  slug: string;
  image: string | null;
  active: boolean;
  sort_order: number;
};

export type Model = {
  id: string;
  series_id: string;
  name: string;
  slug: string;
  base_price: number;
  year: number;
  image: string | null;
  active: boolean;
  sort_order: number;
};

export type ConfigurationOption = {
  id: string;
  group_id: string;
  label: string;
  description: string | null;
  price_effect_type: PriceEffectType;
  price_effect_amount: number;
  processor_family: string | null;
  sort_order: number;
};

export type ConfigurationGroup = {
  id: string;
  category_id: string;
  platform: Platform | null;
  title: string;
  helper_text: string | null;
  selection_mode: SelectionMode;
  step_order: number;
  depends_on_processor_family: string | null;
  active: boolean;
  configuration_options: ConfigurationOption[];
};

export type ConditionOption = {
  id: string;
  group_id: string;
  label: string;
  description: string | null;
  price_effect_type: PriceEffectType;
  price_effect_amount: number;
  sort_order: number;
};

export type ConditionGroup = {
  id: string;
  category_id: string;
  title: string;
  helper_text: string | null;
  selection_mode: SelectionMode;
  step_order: number;
  active: boolean;
  condition_options: ConditionOption[];
};

export type QuoteBreakdown = {
  category: string;
  brand: string;
  series: string;
  model: string;
  base_price: number;
  config_amount: number;
  after_config: number;
  age_percent: number;
  age_amount: number;
  after_age: number;
  condition_amount: number;
  final_quote: number;
};

export type AnswerRecord = {
  kind: "configuration" | "condition";
  group_id: string;
  group_title: string;
  option_id: string;
  option_label: string;
  price_effect_type: PriceEffectType;
  price_effect_amount: number;
};

export type DeviceOrder = {
  id: string;
  created_at: string;
  user_id: string;
  status: DeviceOrderStatus;
  customer_name: string;
  phone: string;
  email: string | null;
  address: string;
  pincode: string;
  pickup_date: string;
  pickup_slot: PickupSlot;
  notes: string | null;
  category_name: string;
  brand_name: string;
  series_name: string;
  model_name: string;
  model_id: string | null;
  base_price: number;
  final_quote: number;
  answers: AnswerRecord[];
  quote_breakdown: QuoteBreakdown;
};
