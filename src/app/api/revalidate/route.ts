import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

// Admin catalog mutations (brands/series/models/configuration/condition) call
// this right after a successful write so public catalog pages reflect the
// change immediately instead of waiting out the cache's revalidate window.
export async function POST(request: Request) {
  const secret = process.env.REVALIDATE_SECRET;
  if (secret) {
    const provided = request.headers.get("x-revalidate-secret");
    if (provided !== secret) {
      return NextResponse.json({ revalidated: false, message: "Invalid secret." }, { status: 401 });
    }
  }

  revalidateTag("catalog");
  return NextResponse.json({ revalidated: true, tag: "catalog", now: Date.now() });
}
