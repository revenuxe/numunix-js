import { createContext, useContext, useState, type ReactNode } from "react";

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
      className={`flex items-center gap-0.5 rounded-xl border border-white/10 bg-white/5 p-1 ${className}`}
    >
      {OPTIONS.map((o) => (
        <button
          key={o.value}
          role="tab"
          aria-selected={ctx.category === o.value}
          onClick={() => ctx.setCategory(o.value)}
          className={`label-mono rounded-lg px-2.5 py-1.5 transition-all duration-250 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3b82f6] min-[375px]:px-3 ${
            ctx.category === o.value
              ? "bg-[#1e4ed8] text-white shadow-[0_6px_16px_-8px_rgba(30,78,216,0.9)]"
              : "text-white/60 hover:text-white"
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}
