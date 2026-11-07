import { createFileRoute, redirect } from "@tanstack/react-router";
export const Route = createFileRoute("/repair-safety")({ beforeLoad: () => { throw redirect({ to: "/access-and-records", statusCode: 301 }); }, head: () => ({ meta: [{ name: "robots", content: "noindex, follow" }] }) });
