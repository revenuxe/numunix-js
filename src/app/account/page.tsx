"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ClipboardList, LoaderCircle, LogOut, Save } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";
import { getMyProfile, saveMyProfile } from "@/lib/customer-profile";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";

export default function AccountPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [accountEmail, setAccountEmail] = useState("");

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");

  useEffect(() => {
    supabase.auth.getUser().then(async ({ data }) => {
      if (!data.user) {
        router.push("/login?redirect=/account");
        return;
      }
      setAccountEmail(data.user.email ?? "");
      try {
        const profile = await getMyProfile();
        if (profile) {
          setFullName(profile.full_name ?? "");
          setPhone(profile.phone ?? "");
          setEmail(profile.email ?? data.user.email ?? "");
          setAddress(profile.address ?? "");
          setPincode(profile.pincode ?? "");
        } else {
          setEmail(data.user.email ?? "");
        }
      } catch {
        toast.error("Could not load your profile.");
      } finally {
        setLoading(false);
      }
    });
  }, [router]);

  async function onSave(event: React.FormEvent) {
    event.preventDefault();
    if (!fullName.trim() || !phone.trim()) {
      toast.error("Name and phone are required.");
      return;
    }
    setSaving(true);
    try {
      await saveMyProfile({ full_name: fullName, phone, email, address, pincode });
      toast.success("Profile updated.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not save your profile.");
    } finally {
      setSaving(false);
    }
  }

  async function signOut() {
    await supabase.auth.signOut();
    router.push("/");
  }

  return (
    <main className="min-h-screen bg-secondary/40 text-ink">
      <SiteNav />
      <div className="mx-auto max-w-2xl px-4 py-10 md:px-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[.2em] text-brand">My account</p>
            <h1 className="mt-1 text-3xl font-extrabold">Account details</h1>
            <p className="mt-1 text-sm text-muted-foreground">Signed in as {accountEmail}</p>
          </div>
          <button
            onClick={signOut}
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-white px-4 py-2.5 text-sm font-semibold transition hover:bg-secondary"
          >
            <LogOut className="h-4 w-4" />
            Sign out
          </button>
        </div>

        <Link
          href="/account/orders"
          className="mb-6 flex items-center gap-3 rounded-2xl bg-white p-4 shadow-soft ring-1 ring-border transition hover:bg-secondary/40"
        >
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand/10 text-brand">
            <ClipboardList className="h-5 w-5" />
          </span>
          <div>
            <p className="text-sm font-bold text-ink">My requests</p>
            <p className="text-xs text-muted-foreground">View your laptop pickup bookings</p>
          </div>
        </Link>

        {loading ? (
          <div className="grid place-items-center py-20 text-muted-foreground">
            <LoaderCircle className="h-6 w-6 animate-spin" />
          </div>
        ) : (
          <form
            onSubmit={onSave}
            className="rounded-3xl bg-white p-6 shadow-card ring-1 ring-border sm:p-8"
          >
            <h2 className="text-lg font-bold text-ink">Your details</h2>
            <p className="mt-1 text-xs text-muted-foreground">
              Saved once here — we&apos;ll auto-fill your next pickup booking so you never have to
              type this again.
            </p>

            <div className="mt-6 space-y-4">
              <label className="block">
                <span className="text-xs font-semibold text-ink/70">Full name</span>
                <input
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-border px-4 py-3 text-sm outline-none focus:border-brand"
                />
              </label>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="text-xs font-semibold text-ink/70">Phone / WhatsApp</span>
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
                  <span className="text-xs font-semibold text-ink/70">Email</span>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1.5 w-full rounded-xl border border-border px-4 py-3 text-sm outline-none focus:border-brand"
                  />
                </label>
              </div>
              <label className="block">
                <span className="text-xs font-semibold text-ink/70">
                  Flat/house, street, landmark
                </span>
                <textarea
                  rows={2}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-border px-4 py-3 text-sm outline-none focus:border-brand"
                />
              </label>
              <label className="block">
                <span className="text-xs font-semibold text-ink/70">Bangalore pincode</span>
                <input
                  inputMode="numeric"
                  pattern="[0-9]{6}"
                  maxLength={6}
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                  className="mt-1.5 w-full rounded-xl border border-border px-4 py-3 text-sm outline-none focus:border-brand"
                />
              </label>
            </div>

            <button
              disabled={saving}
              className="mt-7 inline-flex items-center justify-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-brand-foreground disabled:opacity-60"
            >
              <Save className="h-4 w-4" />
              {saving ? "Saving…" : "Save changes"}
            </button>
          </form>
        )}
      </div>
      <SiteFooter />
    </main>
  );
}
