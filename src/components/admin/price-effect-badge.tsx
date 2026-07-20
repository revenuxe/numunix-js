import type { PriceEffectType } from "@/lib/quote-types";

export function PriceEffectBadge({ type, amount }: { type: PriceEffectType; amount: number }) {
  const isBonus = type === "bonus_fixed";
  const label =
    type === "deduct_percent"
      ? `-${amount}%`
      : `${isBonus ? "+" : "-"}₹${amount.toLocaleString("en-IN")}`;
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${
        isBonus ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"
      }`}
    >
      {label}
    </span>
  );
}
