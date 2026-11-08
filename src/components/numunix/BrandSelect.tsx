"use client";
import { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { repairBrandsForService } from "@/content/repair-brands";

export function BrandSelect({ service, value, disabled, onChange }: { service: string; value: string; disabled?: boolean; onChange: (brand: string) => void }) {
  const [open, setOpen] = useState(false);
  return <div className="min-w-0">
    <label id="brand-label" htmlFor="contact-brand" className="block text-sm font-medium text-[#102a63]">Brand *</label>
    <input type="hidden" name="brand" value={value} />
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild><Button id="contact-brand" type="button" variant="outline" role="combobox" aria-expanded={open} aria-labelledby="brand-label contact-brand" disabled={disabled || !service} className="mt-2 min-h-12 h-auto w-full justify-between rounded-xl border-[#dbe5f2] bg-[#f8fafc] px-4 py-3 text-base font-normal text-[#102a63] hover:bg-[#edf3ff]">
        <span className="truncate">{value || (service ? "Select a brand" : "Select a service first")}</span><ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-60" aria-hidden="true" />
      </Button></PopoverTrigger>
      <PopoverContent align="start" className="w-[var(--radix-popover-trigger-width)] max-w-[calc(100vw-2rem)] border-[#dbe5f2] bg-white p-0 text-[#102a63]">
        <Command className="bg-white text-[#102a63]">
          <CommandInput placeholder="Search brands…" aria-label="Search brands" />
          <CommandList className="max-h-60 overscroll-contain"><CommandEmpty>No match. Search “Other” or “Not sure”.</CommandEmpty><CommandGroup>
            {repairBrandsForService(service).map(brand => <CommandItem key={brand} value={brand} onSelect={() => { onChange(brand); setOpen(false); }} className="min-h-11 cursor-pointer text-[#102a63] data-[selected=true]:bg-[#edf3ff] data-[selected=true]:text-[#102a63]">
              <Check className={`mr-2 size-4 ${value === brand ? "opacity-100" : "opacity-0"}`} aria-hidden="true" />{brand}
            </CommandItem>)}
          </CommandGroup></CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  </div>;
}
