import { createFileRoute, redirect } from "@tanstack/react-router";
export const Route = createFileRoute("/technology")({
  beforeLoad: () => { throw redirect({ to: "/operations", statusCode: 301 }); },
  head: () => ({ meta: [{ name: "robots", content: "noindex, follow" }] }),
});
