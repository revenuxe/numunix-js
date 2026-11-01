import { createContext, useContext, useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";

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

/** Dark-header pill toggle; renders nothing on pages without a CategoryProvider. */
export function CategoryToggle({ className = "" }: { className?: string }) {
  const ctx = useCategory();
  if (!ctx) return null;
  return (
    <div
      role="tablist"
      aria-label="Service category"
      className={`flex items-center gap-0.5 rounded-xl border border-primary-foreground/10 bg-primary-foreground/5 p-1 ${className}`}
    >
      {OPTIONS.map((o) => (
        <Button
          variant="ghost"
          key={o.value}
          role="tab"
          aria-selected={ctx.category === o.value}
          onClick={() => ctx.setCategory(o.value)}
          className={`label-mono h-auto rounded-lg px-2.5 py-1.5 transition-all duration-250 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring min-[375px]:px-3 ${
            ctx.category === o.value
              ? "bg-primary text-primary-foreground hover:bg-primary"
              : "text-primary-foreground/60 hover:bg-primary-foreground/10 hover:text-primary-foreground"
          }`}
        >
          {o.label}
        </Button>
      ))}
    </div>
  );
}
