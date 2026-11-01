import { createContext, useContext, useState, type ReactNode } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export type RepairCategory = "electronics" | "appliances";

const CategoryContext = createContext<{
  category: RepairCategory;
  setCategory: (c: RepairCategory) => void;
} | null>(null);

export function CategoryProvider({ children }: { children: ReactNode }) {
  const [category, setCategory] = useState<RepairCategory>("electronics");
  return (
    <CategoryContext.Provider value={{ category, setCategory }}>
      {children}
    </CategoryContext.Provider>
  );
}

/** Returns null when the page has no provider (interior pages stay unchanged). */
export function useCategory() {
  return useContext(CategoryContext);
}

const OPTIONS: { value: RepairCategory; label: string }[] = [
  { value: "electronics", label: "ELECTRONICS" },
  { value: "appliances", label: "APPLIANCES" },
];

/** Compact category selector for the homepage header. */
export function CategoryToggle({ className = "" }: { className?: string }) {
  const ctx = useCategory();
  if (!ctx) return null;
  return (
    <Select value={ctx.category} onValueChange={(value) => {
      if (value === "electronics" || value === "appliances") ctx.setCategory(value);
    }}>
      <SelectTrigger aria-label="Repair category" className={`h-8 w-[124px] shrink-0 gap-1.5 rounded-md border-primary/60 bg-primary px-2.5 py-1 font-mono text-[10px] tracking-normal text-primary-foreground shadow-none transition-colors hover:bg-primary/90 focus:ring-ring [&>svg]:size-3 [&>svg]:opacity-80 sm:h-9 sm:w-[132px] ${className}`}>
        <SelectValue>{OPTIONS.find(option => option.value === ctx.category)?.label}</SelectValue>
      </SelectTrigger>
      <SelectContent className="z-[70] border-primary-foreground/15 bg-ink-800 text-primary-foreground">
        {OPTIONS.map(option => <SelectItem key={option.value} value={option.value} className="py-3 font-mono text-[11px] tracking-normal focus:bg-primary focus:text-primary-foreground">{option.label}</SelectItem>)}
      </SelectContent>
    </Select>
  );
}
