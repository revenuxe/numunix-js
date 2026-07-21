"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Spinner } from "@/components/spinner";
import { OrdersSubtab } from "@/components/admin/orders-subtab";
import { BrandsSubtab } from "@/components/admin/brands-subtab";
import { SeriesSubtab } from "@/components/admin/series-subtab";
import { ModelsSubtab } from "@/components/admin/models-subtab";
import { getLaptopCategoryForAdmin } from "@/lib/admin-catalog";
import type { Category } from "@/lib/quote-types";

export function DevicesTab() {
  const [category, setCategory] = useState<Category | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    getLaptopCategoryForAdmin()
      .then(setCategory)
      .catch(() => {
        setError(true);
        toast.error("Could not load the device category.");
      });
  }, []);

  if (error) {
    return (
      <p className="rounded-2xl bg-red-50 p-6 text-center text-sm text-red-700 ring-1 ring-red-200">
        Could not load the Laptops category. Confirm it exists and is reachable, then refresh.
      </p>
    );
  }

  if (!category) {
    return (
      <div className="grid place-items-center py-20 text-muted-foreground">
        <Spinner className="h-6 w-6" />
      </div>
    );
  }

  return (
    <div>
      <div className="rounded-2xl bg-white p-5 shadow-soft ring-1 ring-border">
        <p className="text-sm font-bold text-ink">Device buyback</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage the sell-your-device catalog and pickup orders.
        </p>
        <label className="mt-3 block max-w-xs">
          <span className="text-xs font-semibold text-ink/70">Category</span>
          <select
            value={category.id}
            disabled
            className="mt-1.5 w-full rounded-xl border border-border px-3 py-2 text-sm font-semibold"
          >
            <option value={category.id}>{category.name}</option>
          </select>
        </label>
      </div>

      <Tabs defaultValue="orders" className="mt-6">
        <TabsList className="w-full justify-start gap-1 overflow-x-auto">
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="brands">Brands</TabsTrigger>
          <TabsTrigger value="series">Series</TabsTrigger>
          <TabsTrigger value="models">Models</TabsTrigger>
        </TabsList>
        <TabsContent value="orders" className="mt-5">
          <OrdersSubtab />
        </TabsContent>
        <TabsContent value="brands" className="mt-5">
          <BrandsSubtab categoryId={category.id} />
        </TabsContent>
        <TabsContent value="series" className="mt-5">
          <SeriesSubtab categoryId={category.id} />
        </TabsContent>
        <TabsContent value="models" className="mt-5">
          <ModelsSubtab categoryId={category.id} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
