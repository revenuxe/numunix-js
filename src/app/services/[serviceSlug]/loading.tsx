import { SiteNav } from "@/components/site-nav";
import { PageLoader } from "@/components/page-loader";

export default function Loading() {
  return (
    <main className="min-h-screen bg-white text-ink">
      <section className="relative isolate overflow-hidden bg-ink text-white">
        <SiteNav variant="dark" />
        <div className="px-4 pt-24 pb-10 md:px-8 md:pb-14 md:pt-28">
          <PageLoader minHeight="16rem" />
        </div>
      </section>
    </main>
  );
}
