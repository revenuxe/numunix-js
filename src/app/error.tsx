"use client";
export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-5 bg-background px-5 text-center">
      <h1 className="text-3xl">This page could not load</h1>
      <button onClick={reset} className="rounded bg-primary px-5 py-3 text-primary-foreground">
        Try again
      </button>
      <a href="/">Back to home</a>
    </main>
  );
}
