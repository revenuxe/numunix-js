import { createFileRoute, redirect } from "@tanstack/react-router";
export const Route = createFileRoute("/security")({
  beforeLoad: () => { throw redirect({ to: "/repair-safety", statusCode: 301 }); },
  head: () => ({ meta: [{ name: "robots", content: "noindex, follow" }] }),
});
