create extension if not exists pgcrypto;

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null check (char_length(name) between 1 and 100),
  email text check (char_length(email) between 3 and 255),
  phone text,
  postal_code text,
  service text not null check (char_length(service) between 1 and 100),
  message text,
  source text not null check (source in ('hero', 'service', 'contact'))
);

alter table public.leads enable row level security;

-- Anyone may submit a form. They cannot read, update, or delete leads.
drop policy if exists "Public can submit leads" on public.leads;
create policy "Public can submit leads"
on public.leads for insert
to anon, authenticated
with check (true);

-- Only the authenticated Numunix admin can view or delete submissions.
drop policy if exists "Admin can read leads" on public.leads;
create policy "Admin can read leads"
on public.leads for select
to authenticated
using ((auth.jwt() ->> 'email') = 'admin@numunix.com');

drop policy if exists "Admin can delete leads" on public.leads;
create policy "Admin can delete leads"
on public.leads for delete
to authenticated
using ((auth.jwt() ->> 'email') = 'admin@numunix.com');

grant usage on schema public to anon, authenticated;
grant insert on table public.leads to anon, authenticated;

-- Safe to run after the first version of this table has already been created.
alter table public.leads alter column email drop not null;
grant select, delete on table public.leads to authenticated;
