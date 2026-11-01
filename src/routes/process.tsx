import { createFileRoute, redirect } from "@tanstack/react-router";
export const Route = createFileRoute("/process")({
  beforeLoad: () => { throw redirect({ to: "/repair-process", statusCode: 301 }); },
  head: () => ({ meta: [{ name: "robots", content: "noindex, follow" }] }),
});
