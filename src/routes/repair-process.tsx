import { createFileRoute, redirect } from "@tanstack/react-router";
export const Route = createFileRoute("/repair-process")({ beforeLoad: () => { throw redirect({ to: "/workflow", statusCode: 301 }); }, head: () => ({ meta: [{ name: "robots", content: "noindex, follow" }] }) });
