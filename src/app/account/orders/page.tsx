"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Ban, Download, LoaderCircle, LogOut, UserCog } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";
import { cancelMyDeviceOrder, getMyDeviceOrders } from "@/lib/quote";
import { generateInvoicePdf } from "@/lib/invoice";
import { OrderStatusBadge } from "@/components/order-status-badge";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import type { DeviceOrder } from "@/lib/quote-types";

const CANCELLABLE_STATUSES: DeviceOrder["status"][] = ["new", "contacted", "scheduled"];

export default function MyOrdersPage() {
  const router = useRouter();
  const [orders, setOrders] = useState<DeviceOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [cancellingId, setCancellingId] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) {
        router.push("/login?redirect=/account/orders");
        return;
      }
      getMyDeviceOrders()
        .then(setOrders)
        .catch(() => toast.error("Could not load your requests."))
        .finally(() => setLoading(false));
    });
  }, [router]);

  async function signOut() {
    await supabase.auth.signOut();
    router.push("/");
  }

  async function onCancel(order: DeviceOrder) {
    setCancellingId(order.id);
    try {
      await cancelMyDeviceOrder(order.id);
      setOrders((current) =>
        current.map((o) => (o.id === order.id ? { ...o, status: "cancelled" } : o)),
      );
      toast.success("Booking cancelled.");
    } catch {
      toast.error("Could not cancel this booking. Please try again.");
    } finally {
      setCancellingId(null);
    }
  }

  return (
    <main className="min-h-screen bg-secondary/40 text-ink">
      <SiteNav />
      <div className="mx-auto max-w-3xl px-4 py-10 md:px-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[.2em] text-brand">My account</p>
            <h1 className="mt-1 text-3xl font-extrabold">My requests</h1>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/account"
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-white px-4 py-2.5 text-sm font-semibold transition hover:bg-secondary"
            >
              <UserCog className="h-4 w-4" />
              Edit profile
            </Link>
            <button
              onClick={signOut}
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-white px-4 py-2.5 text-sm font-semibold transition hover:bg-secondary"
            >
              <LogOut className="h-4 w-4" />
              Sign out
            </button>
          </div>
        </div>

        {loading ? (
          <div className="grid place-items-center py-20 text-muted-foreground">
            <LoaderCircle className="h-6 w-6 animate-spin" />
          </div>
        ) : orders.length === 0 ? (
          <div className="rounded-3xl bg-white p-8 text-center text-sm text-muted-foreground ring-1 ring-border">
            You haven&apos;t booked a pickup yet.
            <div className="mt-4">
              <Link href="/sell/laptops" className="text-sm font-semibold text-brand">
                Sell a laptop
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid gap-4">
            {orders.map((order) => (
              <article
                key={order.id}
                className="rounded-3xl bg-white p-5 shadow-soft ring-1 ring-border"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-xs uppercase tracking-widest text-muted-foreground">
                      {order.brand_name} · {order.series_name}
                    </p>
                    <h2 className="mt-1 text-lg font-bold text-ink">{order.model_name}</h2>
                    <p className="mt-1 text-2xl font-extrabold text-brand">
                      ₹{Math.round(order.final_quote).toLocaleString("en-IN")}
                    </p>
                  </div>
                  <OrderStatusBadge status={order.status} />
                </div>
                <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Booking ID: <span className="text-ink">{order.booking_id}</span>
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Pickup {order.pickup_date} · {order.pickup_slot} · Booked{" "}
                  {new Date(order.created_at).toLocaleDateString("en-IN")}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <button
                    onClick={() =>
                      void generateInvoicePdf(order).catch(() =>
                        toast.error("Could not generate the invoice PDF. Please try again."),
                      )
                    }
                    className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-xs font-semibold text-ink transition hover:bg-secondary"
                  >
                    <Download className="h-3.5 w-3.5" />
                    Download invoice
                  </button>
                  {CANCELLABLE_STATUSES.includes(order.status) && (
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <button
                          disabled={cancellingId === order.id}
                          className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-4 py-2 text-xs font-semibold text-red-700 transition hover:bg-red-600 hover:text-white disabled:opacity-60"
                        >
                          <Ban className="h-3.5 w-3.5" />
                          {cancellingId === order.id ? "Cancelling…" : "Cancel booking"}
                        </button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Cancel this pickup booking?</AlertDialogTitle>
                          <AlertDialogDescription>
                            We won&apos;t send a pickup agent for your {order.model_name}. You can
                            book again any time.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Keep booking</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => void onCancel(order)}
                            className="bg-red-600 hover:bg-red-700"
                          >
                            Cancel booking
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
      <SiteFooter />
    </main>
  );
}
