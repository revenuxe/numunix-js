create table public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);
alter table public.admin_users enable row level security;
revoke all on public.admin_users from public, anon, authenticated;
grant select on public.admin_users to authenticated;
grant all on public.admin_users to service_role;
create policy "Admins may verify their own membership"
  on public.admin_users for select to authenticated
  using (user_id = (select auth.uid()));

alter table public.contact_enquiries
  add column status text not null default 'new' check (status in ('new', 'contacted', 'qualified', 'won', 'closed')),
  add column notes text not null default '' check (char_length(notes) <= 5000),
  add column updated_at timestamptz not null default now();

create index contact_enquiries_created_at_idx on public.contact_enquiries (created_at desc);
create index contact_enquiries_status_idx on public.contact_enquiries (status);

grant select, delete on public.contact_enquiries to authenticated;
grant update (status, notes) on public.contact_enquiries to authenticated;

create policy "Admins may read enquiries"
  on public.contact_enquiries for select to authenticated
  using (exists (select 1 from public.admin_users where user_id = (select auth.uid())));
create policy "Admins may update enquiries"
  on public.contact_enquiries for update to authenticated
  using (exists (select 1 from public.admin_users where user_id = (select auth.uid())))
  with check (exists (select 1 from public.admin_users where user_id = (select auth.uid())));
create policy "Admins may delete enquiries"
  on public.contact_enquiries for delete to authenticated
  using (exists (select 1 from public.admin_users where user_id = (select auth.uid())));

create function public.set_enquiry_updated_at() returns trigger
  language plpgsql set search_path = '' as $$
begin
  new.updated_at = now();
  return new;
end;
$$;
revoke all on function public.set_enquiry_updated_at() from public, anon, authenticated;
create trigger contact_enquiries_updated_at before update on public.contact_enquiries
  for each row execute function public.set_enquiry_updated_at();

notify pgrst, 'reload schema';
