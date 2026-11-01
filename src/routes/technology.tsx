import { createFileRoute, redirect } from "@tanstack/react-router";
export const Route = createFileRoute("/technology")({
  beforeLoad: () => { throw redirect({ to: "/repair-diagnostics", statusCode: 301 }); },
  head: () => ({ meta: [{ name: "robots", content: "noindex, follow" }] }),
});
