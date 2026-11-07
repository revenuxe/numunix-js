import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/repair-request")({
  beforeLoad: () => {
    throw redirect({ to: "/contact", statusCode: 301 });
  },
  head: () => ({ meta: [{ name: "robots", content: "noindex, follow" }] }),
});
