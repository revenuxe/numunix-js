import type { DeviceOrderStatus } from "@/lib/quote-types";

const STATUS_STYLES: Record<DeviceOrderStatus, string> = {
  new: "bg-secondary text-ink ring-1 ring-border",
  contacted: "bg-amber-100 text-amber-800 ring-1 ring-amber-200",
  scheduled: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200",
  paid: "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white",
  cancelled: "bg-red-50 text-red-700 ring-1 ring-red-200",
  rejected: "bg-red-50 text-red-700 ring-1 ring-red-200",
};

const STATUS_LABELS: Record<DeviceOrderStatus, string> = {
  new: "New",
  contacted: "Contacted",
  scheduled: "Scheduled",
  paid: "Paid",
  cancelled: "Cancelled",
  rejected: "Rejected",
};

export function OrderStatusBadge({ status }: { status: DeviceOrderStatus }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${STATUS_STYLES[status]}`}
    >
      {STATUS_LABELS[status]}
    </span>
  );
}

export const DEVICE_ORDER_STATUSES: DeviceOrderStatus[] = [
  "new",
  "contacted",
  "scheduled",
  "paid",
  "cancelled",
  "rejected",
];
