import { createContext, useContext, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { Check, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { REPAIR_HOME_PATHS } from "@/content/repair-homepage-meta";

export type RepairCategory = "electronics" | "appliances";

const CategoryContext = createContext<{
  category: RepairCategory;
} | null>(null);

export function CategoryProvider({ children, category }: { children: ReactNode; category: RepairCategory }) {
  return (
    <CategoryContext.Provider value={{ category }}>
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
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button aria-label="Repair category" size="sm" className={`h-8 w-[124px] shrink-0 justify-between gap-1.5 border border-primary/60 px-2.5 font-mono text-[10px] tracking-normal shadow-none [&>svg]:size-3 sm:h-9 sm:w-[132px] ${className}`}>
          {OPTIONS.find(option => option.value === ctx.category)?.label}
          <ChevronDown className="opacity-80" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" sideOffset={8} onCloseAutoFocus={event => event.preventDefault()} className="z-[70] min-w-[160px] border-primary-foreground/15 bg-ink-800 text-primary-foreground motion-reduce:animate-none">
        {OPTIONS.map(option => <DropdownMenuItem key={option.value} asChild className="px-3 py-3 font-mono text-[11px] tracking-normal focus:bg-primary focus:text-primary-foreground">
          <Link to={REPAIR_HOME_PATHS[option.value]} aria-current={ctx.category === option.value ? "page" : undefined}>
            {option.label}
            {ctx.category === option.value && <Check className="ml-auto size-3" />}
          </Link>
        </DropdownMenuItem>)}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
