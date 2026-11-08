import { loadEnvFile } from "node:process";
import { existsSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { randomUUID } from "node:crypto";

if (existsSync(".env")) loadEnvFile(".env");
const databaseUrl = process.env.SUPABASE_DB_URL?.trim();
const projectUrl = (process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL)?.trim();
if (!projectUrl) {
  console.error("Fill in SUPABASE_URL in .env before running migrations.");
  process.exit(1);
}

let database = null;
let project;
try {
  project = new URL(projectUrl);
  if (databaseUrl && !databaseUrl.startsWith("https://")) database = new URL(databaseUrl);
} catch {
  console.error("Check the database and project URL formats in .env.");
  process.exit(1);
}
const projectRef = project.hostname.split(".")[0];
if (project.protocol !== "https:" || !/^[a-z0-9]+\.supabase\.co$/.test(project.hostname)) {
  console.error("Use the Supabase project URL from API settings.");
  process.exit(1);
}
if (
  database &&
  (!["postgres:", "postgresql:"].includes(database.protocol) ||
    !database.password ||
    !(
      database.hostname === `db.${projectRef}.supabase.co` ||
      (database.hostname.endsWith(".pooler.supabase.com") &&
        database.username === `postgres.${projectRef}`)
    ))
) {
  console.error(
    "Use the direct or Session pooler URI for the same Supabase project as SUPABASE_URL, including your database password.",
  );
  process.exit(1);
}

const dryRun = process.argv.includes("--dry-run");
const grantAdmin = process.argv.includes("--grant-admin");
const verify = process.argv.includes("--verify");
console.log(
  `${grantAdmin ? "Configuring admin access" : dryRun ? "Checking migrations" : "Applying migrations"} for ${projectRef}.`,
);
const cli = fileURLToPath(new URL("../node_modules/supabase/dist/supabase.js", import.meta.url));
const targetArgs = database ? ["--db-url", databaseUrl] : ["--linked", "--project-ref", projectRef];
let args = [cli, "db", "push", ...targetArgs, "--skip-vault", "--yes"];
if (dryRun) args.push("--dry-run");
if (verify) {
  args = [cli, "db", "query", ...targetArgs, "--file", "supabase/tests/contact_permissions.sql"];
}
if (grantAdmin) {
  const email = process.env.ADMIN_EMAIL?.trim();
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    console.error(
      "Set ADMIN_EMAIL in .env to the email of an existing Supabase Authentication user.",
    );
    process.exit(1);
  }
  const quotedEmail = email.replaceAll("'", "''");
  const blockTag = `$admin_${randomUUID().replaceAll("-", "")}$`;
  const sql = `do ${blockTag} declare admin_id uuid; begin
    select id into strict admin_id from auth.users where lower(email) = lower('${quotedEmail}');
    insert into public.admin_users (user_id) values (admin_id) on conflict (user_id) do nothing;
    end ${blockTag};`;
  args = [cli, "db", "query", ...targetArgs, sql];
}
const result = spawnSync(process.execPath, args, { encoding: "utf8", timeout: 120000 });
const redact = (value) => {
  let output = value ?? "";
  for (const secret of [
    databaseUrl,
    database?.password,
    database?.password ? decodeURIComponent(database.password) : null,
  ]) {
    if (secret) output = output.split(secret).join("[REDACTED]");
  }
  return output;
};
if (result.stdout) console.log(redact(result.stdout));
if (result.stderr) console.error(redact(result.stderr));
if (result.error)
  console.error("Migration command could not complete. Check CLI installation and connectivity.");
process.exit(result.status ?? 1);
