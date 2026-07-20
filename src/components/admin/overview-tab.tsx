"use client";

import { useEffect, useState } from "react";
import { LoaderCircle, Package, PhoneCall, Tag, Wallet } from "lucide-react";
import { toast } from "sonner";
import { OrderStatusBadge } from "@/components/order-status-badge";
import { countActiveCategories, listAllDeviceOrders } from "@/lib/admin-catalog";
import type { DeviceOrder } from "@/lib/quote-types";

function formatInr(value: number): string {
  return `₹${Math.round(value).toLocaleString("en-IN")}`;
}

export function OverviewTab() {
  const [orders, setOrders] = useState<DeviceOrder[]>([]);
  const [activeCategories, setActiveCategories] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([listAllDeviceOrders(), countActiveCategories()])
      .then(([o, c]) => {
        setOrders(o);
        setActiveCategories(c);
      })
      .catch(() => toast.error("Could not load overview stats."))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="grid place-items-center py-20 text-muted-foreground">
        <LoaderCircle className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  const newOrContacted = orders.filter(
    (o) => o.status === "new" || o.status === "contacted",
  ).length;
  const paid = orders.filter((o) => o.status === "paid").length;

  const stats = [
    { label: "Total laptop orders", value: orders.length, Icon: Package },
    { label: "New / contacted", value: newOrContacted, Icon: PhoneCall },
    { label: "Paid orders", value: paid, Icon: Wallet },
    { label: "Active device categories", value: activeCategories, Icon: Tag },
  ];

  return (
    <div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map(({ label, value, Icon }) => (
          <div key={label} className="rounded-2xl bg-white p-5 shadow-soft ring-1 ring-border">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-emerald-50 text-emerald-600">
              <Icon className="h-4 w-4" />
            </span>
            <p className="mt-3 text-2xl font-extrabold text-ink">{value}</p>
            <p className="mt-1 text-xs text-muted-foreground">{label}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-2xl bg-white p-5 shadow-soft ring-1 ring-border">
        <p className="text-sm font-bold text-ink">Latest laptop orders</p>
        {orders.length === 0 ? (
          <p className="mt-4 text-sm text-muted-foreground">No orders yet.</p>
        ) : (
          <div className="mt-4 divide-y divide-border">
            {orders.slice(0, 8).map((order) => (
              <div
                key={order.id}
                className="flex flex-wrap items-center justify-between gap-2 py-3"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-ink">{order.customer_name}</p>
                  <p className="truncate text-xs text-muted-foreground">{order.model_name}</p>
                </div>
                <p className="text-xs text-muted-foreground">
                  {new Date(order.created_at).toLocaleDateString("en-IN")}
                </p>
                <OrderStatusBadge status={order.status} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
