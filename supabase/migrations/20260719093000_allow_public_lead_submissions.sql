-- Permit the public booking and contact forms to create leads.
-- This is safe to run repeatedly and does not grant read, update, or delete access.
grant usage on schema public to anon, authenticated;
grant insert on table public.leads to anon, authenticated;

alter table public.leads enable row level security;

drop policy if exists "Public can submit leads" on public.leads;
create policy "Public can submit leads"
on public.leads
for insert
to anon, authenticated
with check (true);

notify pgrst, 'reload schema';