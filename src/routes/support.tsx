import { createFileRoute, redirect } from "@tanstack/react-router";
export const Route = createFileRoute("/support")({
  beforeLoad: () => { throw redirect({ to: "/team-workspace", statusCode: 301 }); },
  head: () => ({ meta: [{ name: "robots", content: "noindex, follow" }] }),
});
