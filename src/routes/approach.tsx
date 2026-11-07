import { createFileRoute, redirect } from "@tanstack/react-router";
export const Route = createFileRoute("/approach")({
  beforeLoad: () => { throw redirect({ to: "/lead-management", statusCode: 301 }); },
  head: () => ({ meta: [{ name: "robots", content: "noindex, follow" }] }),
});
