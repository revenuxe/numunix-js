export type SelectedRepairCategory = "electronics" | "appliances";
export const CATEGORY_STORAGE_KEY = "numunix-repair-category";
export function selectedRepairCategory(value: string | null): SelectedRepairCategory {
  return value === "appliances" ? "appliances" : "electronics";
}
export function selectedHomepage(category: SelectedRepairCategory) {
  return category === "appliances" ? "/appliances" : "/";
}