import { createFileRoute, redirect } from "@tanstack/react-router";
export const Route = createFileRoute("/articles/")({
  beforeLoad: () => { throw redirect({ to: "/resources", statusCode: 301 }); },
  head: () => ({ meta: [{ name: "robots", content: "noindex, follow" }] }),
});
