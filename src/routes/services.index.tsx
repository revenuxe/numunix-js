import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/services/")({
  beforeLoad: () => { throw redirect({ to: "/features", statusCode: 301 }); },
  head: () => ({ meta: [{ name: "robots", content: "noindex, follow" }] }),
});
