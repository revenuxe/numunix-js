"use client";

import { useEffect, useState } from "react";
import { CalendarDays, ListChecks, PhoneCall, Users } from "lucide-react";
import { toast } from "sonner";
import { Spinner } from "@/components/spinner";
import { supabase } from "@/lib/supabase";

type Lead = {
  id: string;
  created_at: string;
  name: string;
  service: string;
  source: string;
};

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export function OverviewTab() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const { data, error } = await supabase
          .from("leads")
          .select("id, created_at, name, service, source")
          .order("created_at", { ascending: false });
        if (error) throw error;
        setLeads((data ?? []) as Lead[]);
      } catch {
        toast.error("Could not load overview stats.");
      } finally {
        setLoading(false);
      }
    }
    void load();
  }, []);

  if (loading) {
    return (
      <div className="grid place-items-center py-20 text-muted-foreground">
        <Spinner className="h-6 w-6" />
      </div>
    );
  }

  const now = new Date();
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const today = leads.filter((l) => isSameDay(new Date(l.created_at), now)).length;
  const thisWeek = leads.filter((l) => new Date(l.created_at) >= weekAgo).length;
  const whatsappOrCall = leads.filter((l) => l.source !== "contact").length;

  const stats = [
    { label: "Total leads", value: leads.length, Icon: Users },
    { label: "New today", value: today, Icon: CalendarDays },
    { label: "New this week", value: thisWeek, Icon: ListChecks },
    { label: "Booking-form leads", value: whatsappOrCall, Icon: PhoneCall },
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
        <p className="text-sm font-bold text-ink">Latest leads</p>
        {leads.length === 0 ? (
          <p className="mt-4 text-sm text-muted-foreground">No leads yet.</p>
        ) : (
          <div className="mt-4 divide-y divide-border">
            {leads.slice(0, 8).map((lead) => (
              <div key={lead.id} className="flex flex-wrap items-center justify-between gap-2 py-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-ink">{lead.name}</p>
                  <p className="truncate text-xs text-muted-foreground">{lead.service}</p>
                </div>
                <p className="text-xs text-muted-foreground">
                  {new Date(lead.created_at).toLocaleDateString("en-IN")}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
