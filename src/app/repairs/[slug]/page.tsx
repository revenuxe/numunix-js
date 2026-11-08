import { loadPage, pageHead } from "./data";
import { toMetadata, StructuredData } from "@/lib/page-seo";

type Props = {
  params: Promise<{ slug: string }>;
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
  return null;
}
