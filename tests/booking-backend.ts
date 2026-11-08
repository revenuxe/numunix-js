import { createServer } from "node:http";
import { randomUUID } from "node:crypto";

// Browser mocks cannot intercept the server action's Supabase request.
export default async function setup() {
  const server = createServer(async (request, response) => {
    response.setHeader("Content-Type", "application/json");
    if (request.url !== "/rest/v1/rpc/submit_repair_booking" || request.method !== "POST") {
      response.writeHead(404).end("{}");
      return;
    }
    let body = "";
    for await (const chunk of request) body += chunk;
    const fields = JSON.parse(body);
    if (
      request.headers["apikey"] !== "sb_publishable_booking_test_only" ||
      !fields.p_brand ||
      !fields.p_source?.startsWith("/") ||
      "p_status" in fields ||
      "p_notes" in fields ||
      fields.p_name === "Fail Visitor"
    ) {
      response.writeHead(503).end(JSON.stringify({ message: "Test storage rejected" }));
      return;
    }
    response.end(
      JSON.stringify({
        reference: `NU-MOB-${randomUUID().replaceAll("-", "").toUpperCase()}`,
        service: fields.p_service,
      }),
    );
  });
  await new Promise<void>((resolve) => server.listen(4180, "127.0.0.1", resolve));
  return async () => {
    await new Promise<void>((resolve, reject) =>
      server.close((error) => (error ? reject(error) : resolve())),
    );
  };
}
