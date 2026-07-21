import { SiteNav } from "@/components/site-nav";
import { PageLoader } from "@/components/page-loader";

export default function Loading() {
  return (
    <main className="min-h-screen bg-[#f3faf7] text-ink">
      <SiteNav />
      <PageLoader minHeight="70dvh" label="Loading your booking flow…" />
    </main>
  );
}
