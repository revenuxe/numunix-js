export type Platform = "apple" | "windows";
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
  year: number;
  image: string | null;
  active: boolean;
  sort_order: number;
};

export type CustomerProfile = {
  id: string;
  full_name: string | null;
  phone: string | null;
  email: string | null;
  address: string | null;
  pincode: string | null;
  updated_at: string;
};

export type DeviceOrder = {
  id: string;
  booking_id: string;
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
};
