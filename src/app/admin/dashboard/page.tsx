"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LogoMark } from "@/components/logo-mark";
import { PageLoader } from "@/components/page-loader";
import { OverviewTab } from "@/components/admin/overview-tab";
import { DevicesTab } from "@/components/admin/devices-tab";
import { LeadsTab } from "@/components/admin/leads-tab";
import { supabase } from "@/lib/supabase";

export default function AdminDashboard() {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user?.email !== "admin@numunix.com") router.push("/admin/login");
      else setChecking(false);
    });
  }, [router]);

  async function signOut() {
    await supabase.auth.signOut();
    router.push("/admin/login");
  }

  if (checking) {
    return (
      <main className="grid min-h-screen place-items-center bg-secondary/40">
        <PageLoader label="Checking admin access…" minHeight="auto" />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-secondary/40 text-ink">
      <header className="sticky top-0 z-10 border-b border-border bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:px-8">
          <div className="flex items-center gap-3">
            <LogoMark className="h-8 w-auto" />
            <span className="rounded-full bg-brand/10 px-2.5 py-1 text-xs font-semibold text-brand">
              Admin
            </span>
          </div>
          <button
            onClick={signOut}
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-white px-4 py-2.5 text-sm font-semibold transition hover:bg-secondary"
          >
            <LogOut className="h-4 w-4" />
            Sign out
          </button>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-4 py-8 md:px-8">
        <h1 className="text-2xl font-extrabold">Dashboard</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage laptop buyback orders, device catalog, specs and pricing.
        </p>

        <Tabs defaultValue="overview" className="mt-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="devices">Devices</TabsTrigger>
            <TabsTrigger value="leads">Leads</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="mt-6">
            <OverviewTab />
          </TabsContent>
          <TabsContent value="devices" className="mt-6">
            <DevicesTab />
          </TabsContent>
          <TabsContent value="leads" className="mt-6">
            <LeadsTab />
          </TabsContent>
        </Tabs>
      </section>
    </main>
  );
}
