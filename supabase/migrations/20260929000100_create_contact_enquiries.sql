create table public.contact_enquiries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null check (char_length(btrim(name)) between 1 and 100),
  phone text not null check (
    char_length(phone) between 7 and 25
    and phone ~ '^[+0-9() .-]+$'
    and char_length(regexp_replace(phone, '[^0-9]', '', 'g')) between 7 and 15
  ),
  email text check (email is null or (char_length(email) <= 254 and email ~ '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$')),
  service text not null check (char_length(btrim(service)) between 1 and 100),
  timeline text not null check (timeline in ('Flexible', 'As soon as possible', 'Within a month', 'In 1–3 months', 'Just exploring')),
  description text check (description is null or char_length(description) <= 1500),
  source text not null check (source in ('/', '/contact'))
);

alter table public.contact_enquiries enable row level security;
revoke all on public.contact_enquiries from public, anon, authenticated;
grant usage on schema public to anon, authenticated;
grant insert (name, phone, email, service, timeline, description, source)
  on public.contact_enquiries to anon, authenticated;
grant all on public.contact_enquiries to service_role;

create policy "Visitors may submit enquiries"
  on public.contact_enquiries for insert to anon, authenticated
  with check (true);

comment on table public.contact_enquiries is
  'Website enquiries. Visitors have insert-only access; review submissions in the Supabase dashboard.';

notify pgrst, 'reload schema';
