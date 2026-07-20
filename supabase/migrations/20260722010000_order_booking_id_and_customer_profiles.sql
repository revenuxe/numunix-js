-- Unique, human-readable booking ID on every device order, reusing the same
-- generator already used by public.leads (format NMX-YYMMDD-XXXXX) so the two
-- booking ID formats stay consistent across the site.
alter table public.device_orders add column if not exists booking_id text;

update public.device_orders
set booking_id = public.generate_booking_id()
where booking_id is null;

alter table public.device_orders alter column booking_id set default public.generate_booking_id();
alter table public.device_orders alter column booking_id set not null;

create unique index if not exists device_orders_booking_id_idx
  on public.device_orders(booking_id);

-- Customer profile: saved once from the first pickup booking, then reused to
-- prefill every later booking so a returning customer is never asked again.
create table if not exists public.customer_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  phone text,
  email text,
  address text,
  pincode text,
  updated_at timestamptz not null default now()
);

alter table public.customer_profiles enable row level security;

drop policy if exists "own profile select" on public.customer_profiles;
create policy "own profile select" on public.customer_profiles for select to authenticated
using (id = auth.uid() or public.is_numunix_admin());

drop policy if exists "own profile insert" on public.customer_profiles;
create policy "own profile insert" on public.customer_profiles for insert to authenticated
with check (id = auth.uid());

drop policy if exists "own profile update" on public.customer_profiles;
create policy "own profile update" on public.customer_profiles for update to authenticated
using (id = auth.uid()) with check (id = auth.uid());

grant select, insert, update on public.customer_profiles to authenticated;
