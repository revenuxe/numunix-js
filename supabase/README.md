# Contact enquiries

Fill in the root `.env` using `.env.example`:

- `VITE_SUPABASE_URL`: project URL from the Supabase dashboard.
- `VITE_SUPABASE_PUBLISHABLE_KEY`: public `sb_publishable_...` key or legacy `anon` JWT from API settings. Never use a secret or service-role key here.
- `SUPABASE_DB_URL` (optional): full PostgreSQL connection URI from Connect → Session pooler, port 5432. Replace the password placeholder with your URL-encoded database password. Leave empty to use your logged-in Supabase CLI account instead. This is only used locally for migrations.

Run `npm run db:check` to preview migrations, then `npm run db:migrate` to apply them. The runner uses the project in `VITE_SUPABASE_URL` with your connected CLI account, or checks that a provided database URI matches that project. It preserves Supabase migration history and redacts credentials from command output. No separate database password is needed when using the connected CLI account.

Restart development after changing `.env`. Add the two `VITE_` values to the deployment environment and rebuild for production; do not deploy the database URI to the browser.

Both website forms insert into `public.contact_enquiries`. Review entries in the Supabase Table Editor. Public clients have column-limited insert access only, with RLS and database constraints; they cannot list, edit, or delete enquiries. A saved enquiry is not a confirmed appointment or an email notification. The public endpoint does not currently implement CAPTCHA or per-IP rate limiting.

Run `npm run test:enquiries` for input validation checks. After migration, run `npm run db:verify` to check public permissions and validate insert access. Its test writes run inside a rolled-back transaction. Also verify an admin can review and update an enquiry before deployment.

## Admin workspace

`/admin/login` uses Supabase email/password authentication. `/admin/dashboard` checks `admin_users` membership; RLS also enforces that membership for every read, update, and delete. Public visitors cannot assign themselves admin access. Internal notes and status cannot be set via the public enquiry form.

Create your admin user in Supabase → Authentication → Users with an email and password. Set `ADMIN_EMAIL` in the local `.env` to that email, then run `npm run db:grant-admin` after the migrations. This grants access only to the specified existing account and does not create or change passwords. There is no public admin signup.

The dashboard includes server-side search, status filters, pagination, notes, status updates, and confirmed deletion. Deletion permanently removes the enquiry. Updates detect concurrent edits so one admin cannot silently overwrite another's changes.

`npm run test:admin` runs UI tests against mocked Supabase responses, never production leads. Chrome must be installed. Database policies still need verification against the connected Supabase project.
