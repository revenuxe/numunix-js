import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export function CatalogNotFound({
  message,
  backHref,
  backLabel,
}: {
  message: string;
  backHref: string;
  backLabel: string;
}) {
  return (
    <div className="mx-auto max-w-lg rounded-3xl bg-white p-8 text-center shadow-soft ring-1 ring-border">
      <p className="text-sm text-muted-foreground">{message}</p>
      <Link
        href={backHref}
        className="mt-5 inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90"
      >
        <ArrowLeft className="h-4 w-4" />
        {backLabel}
      </Link>
    </div>
  );
}
