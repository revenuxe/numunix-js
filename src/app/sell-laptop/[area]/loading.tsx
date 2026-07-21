import { SiteNav } from "@/components/site-nav";
import { PageLoader } from "@/components/page-loader";

export default function Loading() {
  return (
    <main className="min-h-screen bg-white text-ink">
      <SiteNav variant="dark" />
      <section className="relative isolate overflow-hidden bg-[linear-gradient(135deg,#111a34_0%,#182847_55%,#0c172d_100%)] px-4 pt-28 pb-16 text-white md:px-8 md:pb-24 md:pt-36">
        <PageLoader minHeight="16rem" />
      </section>
    </main>
  );
}
