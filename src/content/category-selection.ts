export type SelectedRepairCategory = "electronics" | "appliances";
export const REPAIR_HOME_PATHS = { electronics: "/", appliances: "/appliances" } as const;
export const CATEGORY_STORAGE_KEY = "numunix-repair-category";
export function selectedRepairCategory(value: string | null): SelectedRepairCategory {
  return value === "appliances" ? "appliances" : "electronics";
}
export function selectedHomepage(category: SelectedRepairCategory) {
  return REPAIR_HOME_PATHS[category];
}
