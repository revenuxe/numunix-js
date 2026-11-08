import Link from "next/link";
export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-5 bg-background px-5 text-center">
      <h1 className="text-5xl">Page not found</h1>
      <p>The page you requested is unavailable or has moved.</p>
      <Link href="/" className="text-primary underline">
        Back to home
      </Link>
    </main>
  );
}
