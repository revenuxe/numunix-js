import { SiteNav } from "@/components/site-nav";
import { PageLoader } from "@/components/page-loader";

export default function Loading() {
  return (
    <main className="min-h-screen bg-secondary/40 text-ink">
      <SiteNav />
      <PageLoader minHeight="70vh" label="Loading series…" />
    </main>
  );
}
