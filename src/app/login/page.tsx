import type { Metadata } from "next";
import { Suspense } from "react";
import { LoginForm } from "@/components/login-form";

export const metadata: Metadata = {
  title: { absolute: "Sign In — Numunix" },
};

export default function LoginPage() {
  return (
    <main className="grid min-h-screen place-items-center bg-secondary/40 px-4 py-10 text-ink">
      <Suspense>
        <LoginForm />
      </Suspense>
    </main>
  );
}
