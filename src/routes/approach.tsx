import { createFileRoute, redirect } from "@tanstack/react-router";
export const Route = createFileRoute("/approach")({
  beforeLoad: () => { throw redirect({ to: "/repair-assessment", statusCode: 301 }); },
  head: () => ({ meta: [{ name: "robots", content: "noindex, follow" }] }),
});
