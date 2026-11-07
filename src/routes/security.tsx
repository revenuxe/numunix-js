import { createFileRoute, redirect } from "@tanstack/react-router";
export const Route = createFileRoute("/security")({
  beforeLoad: () => { throw redirect({ to: "/access-and-records", statusCode: 301 }); },
  head: () => ({ meta: [{ name: "robots", content: "noindex, follow" }] }),
});
