import { SiteNav } from "@/components/site-nav";
import { PageLoader } from "@/components/page-loader";

export default function Loading() {
  return (
    <main className="min-h-screen bg-white text-ink">
      <SiteNav variant="dark" />
      <PageLoader minHeight="70vh" label="Loading brands…" />
    </main>
  );
}
