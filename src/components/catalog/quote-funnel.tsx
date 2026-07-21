"use client";

import { useEffect, useState } from "react";
import { ArrowRight, CheckCircle2, Download, ShieldCheck, Truck, Zap } from "lucide-react";
import { toast } from "sonner";
import { WhatsAppIcon } from "@/components/whatsapp-icon";
import { InlineLoginForm } from "@/components/inline-login-form";
import { PageLoader } from "@/components/page-loader";
import { supabase } from "@/lib/supabase";
import { CONTACT } from "@/lib/contact";
import { submitDeviceOrder } from "@/lib/quote";
import { generateInvoicePdf } from "@/lib/invoice";
import { getMyProfile } from "@/lib/customer-profile";
import { getSavedPincode, setSavedPincode } from "@/lib/session-quote";
import type { Brand, DeviceOrder, Model, PickupSlot, Series } from "@/lib/quote-types";

type Phase = "start" | "confirmation";

export function QuoteFunnel({
  brand,
  series,
  model,
}: {
  brand: Brand;
  series: Series;
  model: Model;
}) {
  const [phase, setPhase] = useState<Phase>("start");
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [order, setOrder] = useState<DeviceOrder | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setIsAuthenticated(Boolean(data.user)));

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(Boolean(session?.user));
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  async function handlePickupSubmit(input: {
    customerName: string;
    phone: string;
    email: string;
    address: string;
    pincode: string;
    pickupDate: string;
    pickupSlot: PickupSlot;
    notes: string;
  }) {
    setSubmitting(true);
    try {
      const created = await submitDeviceOrder({
        customerName: input.customerName,
        phone: input.phone,
        email: input.email,
        address: input.address,
        pincode: input.pincode,
        pickupDate: input.pickupDate,
        pickupSlot: input.pickupSlot,
        notes: input.notes,
        categoryName: "Laptops",
        brandName: brand.name,
        seriesName: series.name,
        modelName: model.name,
        modelId: model.id,
      });
      setSavedPincode(input.pincode);
      setOrder(created);
      setPhase("confirmation");
      toast.success("Pickup requested!");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Could not book your pickup. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  const whatsappMessage = encodeURIComponent(
    `Hi Numunix, I want to sell my ${brand.name} ${model.name}. Please help me get a quote.`,
  );

  return (
    <div className="mx-auto max-w-[768px] px-4 py-10 md:px-8">
      {phase === "start" && (
        <StartPhase
          model={model}
          brand={brand}
          whatsappMessage={whatsappMessage}
          isAuthenticated={isAuthenticated}
          submitting={submitting}
          onSubmitPickup={handlePickupSubmit}
        />
      )}

      {phase === "confirmation" && order && <ConfirmationPhase order={order} />}
    </div>
  );
}

function StartPhase({
  model,
  brand,
  whatsappMessage,
  isAuthenticated,
  submitting,
  onSubmitPickup,
}: {
  model: Model;
  brand: Brand;
  whatsappMessage: string;
  isAuthenticated: boolean | null;
  submitting: boolean;
  onSubmitPickup: (input: {
    customerName: string;
    phone: string;
    email: string;
    address: string;
    pincode: string;
    pickupDate: string;
    pickupSlot: PickupSlot;
    notes: string;
  }) => void;
}) {
  return (
    <div>
      <a
        href={`${CONTACT.whatsappUrl}?text=${whatsappMessage}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-4 rounded-2xl border border-emerald-200 bg-emerald-50/70 p-4 shadow-soft transition hover:-translate-y-0.5 hover:border-emerald-300"
      >
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-emerald-500 text-white">
          <WhatsAppIcon className="h-5 w-5" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-bold text-ink">Prefer to chat? Sell on WhatsApp</p>
          <p className="mt-0.5 text-xs text-muted-foreground">
            Send a photo of your {model.name} and get a quote in minutes.
          </p>
        </div>
        <ArrowRight className="h-4 w-4 shrink-0 text-emerald-700" />
      </a>

      <div className="mt-5">
        {isAuthenticated === null ? (
          <div className="rounded-[2rem] bg-ink">
            <PageLoader minHeight="14rem" />
          </div>
        ) : !isAuthenticated ? (
          <InlineLoginForm
            title="Sign in to book a pickup"
            description={`Sign in to book a free pickup for your ${model.name}.`}
          />
        ) : (
          <PickupForm modelName={model.name} submitting={submitting} onSubmit={onSubmitPickup} />
        )}
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        {[
          { Icon: Zap, title: "Quick booking", desc: "Book your pickup in under a minute." },
          { Icon: Truck, title: "Free pickup", desc: "Doorstep collection across Bangalore." },
          {
            Icon: ShieldCheck,
            title: "Instant payment",
            desc: "Get paid the moment we verify your device.",
          },
        ].map(({ Icon, title, desc }) => (
          <div
            key={title}
            className="rounded-2xl bg-white p-4 text-center shadow-soft ring-1 ring-border"
          >
            <Icon className="mx-auto h-5 w-5 text-brand" />
            <p className="mt-2 text-sm font-bold text-ink">{title}</p>
            <p className="mt-1 text-xs text-muted-foreground">{desc}</p>
          </div>
        ))}
      </div>

      <p className="mt-4 text-center text-xs text-muted-foreground">
        {brand.name} · {model.name}
      </p>
    </div>
  );
}

function PickupForm({
  modelName,
  submitting,
  onSubmit,
}: {
  modelName: string;
  submitting: boolean;
  onSubmit: (input: {
    customerName: string;
    phone: string;
    email: string;
    address: string;
    pincode: string;
    pickupDate: string;
    pickupSlot: PickupSlot;
    notes: string;
  }) => void;
}) {
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [pickupSlot, setPickupSlot] = useState<PickupSlot>("morning");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    setPincode(getSavedPincode());
    getMyProfile()
      .then((profile) => {
        if (!profile) return;
        if (profile.full_name) setCustomerName(profile.full_name);
        if (profile.phone) setPhone(profile.phone);
        if (profile.email) setEmail(profile.email);
        if (profile.address) setAddress(profile.address);
        if (profile.pincode) setPincode(profile.pincode);
      })
      .catch(() => {
        // ignore — the buyer just types their details in manually
      });
  }, []);

  const today = new Date().toISOString().slice(0, 10);

  function onSubmitForm(event: React.FormEvent) {
    event.preventDefault();
    onSubmit({ customerName, phone, email, address, pincode, pickupDate, pickupSlot, notes });
  }

  return (
    <form
      onSubmit={onSubmitForm}
      className="rounded-3xl bg-white p-6 shadow-card ring-1 ring-border sm:p-8"
    >
      <h2 className="text-2xl font-extrabold text-ink">Book your free pickup</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        We&apos;ll confirm your exact price for the {modelName} after a quick doorstep inspection.
      </p>

      <div className="mt-6 space-y-4">
        <label className="block">
          <span className="text-xs font-semibold text-ink/70">Full name</span>
          <input
            required
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            className="mt-1.5 w-full rounded-xl border border-border px-4 py-3 text-sm outline-none focus:border-brand"
          />
        </label>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="text-xs font-semibold text-ink/70">Phone / WhatsApp number</span>
            <input
              required
              type="tel"
              inputMode="numeric"
              pattern="[0-9]{10}"
              maxLength={10}
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
              className="mt-1.5 w-full rounded-xl border border-border px-4 py-3 text-sm outline-none focus:border-brand"
            />
          </label>
          <label className="block">
            <span className="text-xs font-semibold text-ink/70">Email (optional)</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1.5 w-full rounded-xl border border-border px-4 py-3 text-sm outline-none focus:border-brand"
            />
          </label>
        </div>
        <label className="block">
          <span className="text-xs font-semibold text-ink/70">Flat/house, street, landmark</span>
          <textarea
            required
            rows={2}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="mt-1.5 w-full rounded-xl border border-border px-4 py-3 text-sm outline-none focus:border-brand"
          />
        </label>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="text-xs font-semibold text-ink/70">Bangalore pincode</span>
            <input
              required
              inputMode="numeric"
              pattern="[0-9]{6}"
              maxLength={6}
              value={pincode}
              onChange={(e) => setPincode(e.target.value.replace(/\D/g, "").slice(0, 6))}
              className="mt-1.5 w-full rounded-xl border border-border px-4 py-3 text-sm outline-none focus:border-brand"
            />
          </label>
          <label className="block">
            <span className="text-xs font-semibold text-ink/70">Preferred pickup date</span>
            <input
              required
              type="date"
              min={today}
              value={pickupDate}
              onChange={(e) => setPickupDate(e.target.value)}
              className="mt-1.5 w-full rounded-xl border border-border px-4 py-3 text-sm outline-none focus:border-brand"
            />
          </label>
        </div>
        <div>
          <span className="text-xs font-semibold text-ink/70">Time slot</span>
          <div className="mt-1.5 grid grid-cols-3 gap-2">
            {(
              [
                ["morning", "Morning · 9am–12pm"],
                ["afternoon", "Afternoon · 12pm–4pm"],
                ["evening", "Evening · 4pm–8pm"],
              ] as [PickupSlot, string][]
            ).map(([value, label]) => (
              <button
                type="button"
                key={value}
                onClick={() => setPickupSlot(value)}
                className={`rounded-xl border px-2 py-2.5 text-xs font-semibold transition ${
                  pickupSlot === value
                    ? "border-brand bg-brand/10 text-brand"
                    : "border-border text-ink hover:border-brand/50"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
        <label className="block">
          <span className="text-xs font-semibold text-ink/70">
            Notes for the pickup agent (optional)
          </span>
          <textarea
            rows={2}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="mt-1.5 w-full rounded-xl border border-border px-4 py-3 text-sm outline-none focus:border-brand"
          />
        </label>
      </div>

      <div className="mt-7">
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand px-5 py-3.5 text-sm font-semibold text-brand-foreground disabled:opacity-60"
        >
          {submitting ? "Booking…" : "Confirm free pickup"}
        </button>
      </div>
      <p className="mt-3 text-center text-xs text-muted-foreground">
        Free to book · You approve the rate before anything is sold. By booking, you agree to our{" "}
        <a href="/sell-laptop/terms" target="_blank" className="font-semibold text-brand underline">
          Buyback Terms &amp; Privacy Policy
        </a>
        .
      </p>
    </form>
  );
}

function ConfirmationPhase({ order }: { order: DeviceOrder }) {
  return (
    <div className="rounded-3xl bg-white p-8 text-center shadow-card ring-1 ring-border">
      <CheckCircle2 className="mx-auto h-14 w-14 text-brand" />
      <h2 className="mt-4 text-2xl font-extrabold text-ink">Pickup requested!</h2>
      <p className="mx-auto mt-3 inline-block rounded-full bg-secondary px-3 py-1 text-xs font-semibold uppercase tracking-wider text-ink">
        Booking ID: {order.booking_id}
      </p>
      <p className="mx-auto mt-3 max-w-sm text-sm text-muted-foreground">
        Our team will call you shortly to confirm your {order.model_name} pickup and the final price
        after inspection.
      </p>
      <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <button
          onClick={() =>
            void generateInvoicePdf(order).catch(() =>
              toast.error("Could not generate the invoice PDF. Please try again."),
            )
          }
          className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-semibold text-ink"
        >
          <Download className="h-4 w-4" /> Download invoice
        </button>
        <a
          href="/sell/laptops"
          className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-semibold text-ink"
        >
          Sell another device
        </a>
        <a
          href="/account/orders"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-brand px-5 py-3 text-sm font-semibold text-brand-foreground"
        >
          View my requests
        </a>
      </div>
    </div>
  );
}
