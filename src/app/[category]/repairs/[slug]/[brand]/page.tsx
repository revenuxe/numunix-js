import { PUBLIC_PATHS } from "@/content/public-catalogue";
import { loadPage, pageHead } from "./data";
import { toMetadata, StructuredData } from "@/lib/page-seo";
import PageView from "./view";
type Props = {
  params: Promise<{ category: string; slug: string; brand: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};
export async function generateMetadata({ params }: Props) {
  const p = await params;
  const data = await loadPage({ params: p });
  return toMetadata(pageHead({ params: p, loaderData: data }));
}
export default async function Page({ params, searchParams }: Props) {
  const p = await params;
  const data = await loadPage({ params: p });
  const search = {};
  return (
    <>
      <StructuredData head={pageHead({ params: p, loaderData: data })} />
      <PageView params={p} loaderData={data} search={search} />
    </>
  );
}

export function generateStaticParams() {
  return PUBLIC_PATHS.flatMap((path) => {
    const match = path.match("^/([^/]+)/repairs/([^/]+)/([^/]+)$");
    return match ? [{ category: match[1]!, slug: match[2]!, brand: match[3]! }] : [];
  });
}
