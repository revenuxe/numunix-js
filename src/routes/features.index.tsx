import { createFileRoute, redirect } from "@tanstack/react-router";
export const Route = createFileRoute("/features/")({
  beforeLoad: () => { throw redirect({ to: "/services", statusCode: 301 }); },
  head: () => ({ meta: [{ name: "robots", content: "noindex, follow" }] }),
});
