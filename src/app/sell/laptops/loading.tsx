import { SiteNav } from "@/components/site-nav";
import { PageLoader } from "@/components/page-loader";

export default function Loading() {
  return (
    <main className="min-h-screen bg-white text-ink">
      <SiteNav variant="dark" />
      <section className="bg-ink px-4 pt-28 pb-20 md:px-8 md:pt-32 md:pb-28">
        <PageLoader minHeight="16rem" />
      </section>
    </main>
  );
}
