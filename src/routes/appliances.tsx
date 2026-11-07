import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/appliances")({
  beforeLoad: () => { throw redirect({ to: "/", statusCode: 301 }); },
  head: () => ({ meta: [{ name: "robots", content: "noindex, follow" }] }),
});
