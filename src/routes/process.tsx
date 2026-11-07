import { createFileRoute, redirect } from "@tanstack/react-router";
export const Route = createFileRoute("/process")({
  beforeLoad: () => { throw redirect({ to: "/workflow", statusCode: 301 }); },
  head: () => ({ meta: [{ name: "robots", content: "noindex, follow" }] }),
});
