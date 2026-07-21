"use client";

import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import { toast } from "sonner";
import { Spinner } from "@/components/spinner";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { OrderStatusBadge, DEVICE_ORDER_STATUSES } from "@/components/order-status-badge";
import { ConfirmDeleteDialog } from "@/components/admin/confirm-delete-dialog";
import {
  deleteDeviceOrder,
  listAllDeviceOrders,
  updateDeviceOrderStatus,
} from "@/lib/admin-catalog";
import type { DeviceOrder, DeviceOrderStatus } from "@/lib/quote-types";

function formatQuote(value: number): string {
  return value > 0 ? `₹${Math.round(value).toLocaleString("en-IN")}` : "Pending inspection";
}

export function OrdersSubtab() {
  const [orders, setOrders] = useState<DeviceOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<DeviceOrderStatus | "all">("all");
  const [selected, setSelected] = useState<DeviceOrder | null>(null);

  async function load() {
    setLoading(true);
    try {
      setOrders(await listAllDeviceOrders());
    } catch {
      toast.error("Could not load orders.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void load();
  }, []);

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return orders.filter((o) => {
      const matchesQuery =
        !q ||
        o.customer_name.toLowerCase().includes(q) ||
        o.phone.includes(q) ||
        o.brand_name.toLowerCase().includes(q) ||
        o.model_name.toLowerCase().includes(q);
      const matchesStatus = statusFilter === "all" || o.status === statusFilter;
      return matchesQuery && matchesStatus;
    });
  }, [orders, query, statusFilter]);

  async function onStatusChange(order: DeviceOrder, status: DeviceOrderStatus) {
    try {
      await updateDeviceOrderStatus(order.id, status);
      setOrders((current) => current.map((o) => (o.id === order.id ? { ...o, status } : o)));
      setSelected((current) =>
        current && current.id === order.id ? { ...current, status } : current,
      );
      toast.success("Status updated.");
    } catch {
      toast.error("Could not update status.");
    }
  }

  async function onDelete(order: DeviceOrder) {
    try {
      await deleteDeviceOrder(order.id);
      setOrders((current) => current.filter((o) => o.id !== order.id));
      setSelected(null);
      toast.success("Order deleted.");
    } catch {
      toast.error("Could not delete order.");
    }
  }

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3">
        <label className="flex flex-1 items-center gap-2 rounded-xl border border-border px-3 py-2 sm:min-w-[240px]">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search name, phone, brand, model…"
            className="w-full text-sm outline-none"
          />
        </label>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as DeviceOrderStatus | "all")}
          className="rounded-xl border border-border px-3 py-2 text-sm font-semibold"
        >
          <option value="all">All statuses</option>
          {DEVICE_ORDER_STATUSES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="grid place-items-center py-16 text-muted-foreground">
          <Spinner className="h-5 w-5" />
        </div>
      ) : filtered.length === 0 ? (
        <p className="mt-6 rounded-2xl bg-secondary/40 p-6 text-center text-sm text-muted-foreground">
          No orders found.
        </p>
      ) : (
        <div className="mt-5 overflow-x-auto rounded-2xl border border-border bg-white">
          <table className="w-full min-w-[640px] text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs uppercase tracking-wider text-muted-foreground">
                <th className="px-4 py-3">Booking ID</th>
                <th className="px-4 py-3">Customer</th>
                <th className="px-4 py-3">Device</th>
                <th className="px-4 py-3">Quote</th>
                <th className="px-4 py-3">Pickup</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((order) => (
                <tr
                  key={order.id}
                  onClick={() => setSelected(order)}
                  className="cursor-pointer border-b border-border last:border-0 hover:bg-secondary/40"
                >
                  <td className="px-4 py-3 font-mono text-xs text-ink">{order.booking_id}</td>
                  <td className="px-4 py-3">
                    <p className="font-semibold text-ink">{order.customer_name}</p>
                    <p className="text-xs text-muted-foreground">{order.phone}</p>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-ink">{order.model_name}</p>
                    <p className="text-xs text-muted-foreground">
                      {order.brand_name} · {order.series_name}
                    </p>
                  </td>
                  <td
                    className={`px-4 py-3 font-bold ${order.final_quote > 0 ? "text-emerald-600" : "text-muted-foreground"}`}
                  >
                    {formatQuote(order.final_quote)}
                  </td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">
                    {order.pickup_date} · {order.pickup_slot}
                  </td>
                  <td className="px-4 py-3">
                    <OrderStatusBadge status={order.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Sheet open={Boolean(selected)} onOpenChange={(open) => !open && setSelected(null)}>
        <SheetContent className="w-full overflow-y-auto sm:max-w-md">
          {selected && (
            <>
              <SheetHeader>
                <SheetTitle>{selected.customer_name}</SheetTitle>
                <SheetDescription>
                  {selected.brand_name} · {selected.series_name} · {selected.model_name}
                </SheetDescription>
              </SheetHeader>

              <div className="space-y-5 px-4 pb-6">
                <div>
                  <p className="text-xs font-semibold uppercase text-muted-foreground">
                    Booking ID
                  </p>
                  <p className="mt-1 font-mono text-sm font-bold text-ink">{selected.booking_id}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase text-muted-foreground">Contact</p>
                  <p className="mt-1 text-sm text-ink">{selected.phone}</p>
                  {selected.email && <p className="text-sm text-ink">{selected.email}</p>}
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase text-muted-foreground">
                    Pickup address
                  </p>
                  <p className="mt-1 text-sm text-ink">{selected.address}</p>
                  <p className="text-sm text-ink">Pincode: {selected.pincode}</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {selected.pickup_date} · {selected.pickup_slot}
                  </p>
                  {selected.notes && (
                    <p className="mt-1 text-sm text-muted-foreground">Notes: {selected.notes}</p>
                  )}
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase text-muted-foreground">Quote</p>
                  <p
                    className={`mt-1 text-sm font-bold ${
                      selected.final_quote > 0 ? "text-emerald-600" : "text-muted-foreground"
                    }`}
                  >
                    {formatQuote(selected.final_quote)}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase text-muted-foreground">Status</p>
                  <Select
                    value={selected.status}
                    onValueChange={(value) =>
                      void onStatusChange(selected, value as DeviceOrderStatus)
                    }
                  >
                    <SelectTrigger className="mt-1.5 w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {DEVICE_ORDER_STATUSES.map((s) => (
                        <SelectItem key={s} value={s}>
                          {s}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <ConfirmDeleteDialog
                  title="Delete this order?"
                  description="This cannot be undone."
                  onConfirm={() => void onDelete(selected)}
                  trigger={
                    <button className="w-full rounded-xl bg-red-50 px-4 py-2.5 text-sm font-semibold text-red-700 hover:bg-red-600 hover:text-white">
                      Delete order
                    </button>
                  }
                />
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
