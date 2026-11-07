import { createFileRoute, redirect } from "@tanstack/react-router";
export const Route = createFileRoute("/repair-guides/")({ beforeLoad: () => { throw redirect({ to: "/resources", statusCode: 301 }); }, head: () => ({ meta: [{ name: "robots", content: "noindex, follow" }] }) });
