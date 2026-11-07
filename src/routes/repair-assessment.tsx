import { createFileRoute, redirect } from "@tanstack/react-router";
export const Route = createFileRoute("/repair-assessment")({ beforeLoad: () => { throw redirect({ to: "/lead-management", statusCode: 301 }); }, head: () => ({ meta: [{ name: "robots", content: "noindex, follow" }] }) });
