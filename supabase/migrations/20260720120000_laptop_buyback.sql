-- NUMUNIX LAPTOP BUYBACK: catalog, configuration/condition questions, orders, quote engine.
create extension if not exists pgcrypto;

do $$ begin
  create type public.price_effect_type as enum ('bonus_fixed', 'deduct_fixed', 'deduct_percent');
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.device_order_status as enum ('new', 'contacted', 'scheduled', 'paid', 'cancelled', 'rejected');
exception when duplicate_object then null; end $$;

create table if not exists public.device_categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  icon text,
  active boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.device_brands (
  id uuid primary key default gen_random_uuid(),
  category_id uuid not null references public.device_categories(id) on delete cascade,
  name text not null,
  slug text not null,
  logo text,
  platform text not null check (platform in ('apple', 'windows')),
  active boolean not null default true,
  sort_order int not null default 0,
  unique (category_id, slug)
);

create table if not exists public.device_series (
  id uuid primary key default gen_random_uuid(),
  brand_id uuid not null references public.device_brands(id) on delete cascade,
  name text not null,
  slug text not null,
  image text,
  active boolean not null default true,
  sort_order int not null default 0,
  unique (brand_id, slug)
);

create table if not exists public.device_models (
  id uuid primary key default gen_random_uuid(),
  series_id uuid not null references public.device_series(id) on delete cascade,
  name text not null,
  slug text not null,
  base_price numeric(12, 2) not null check (base_price >= 0),
  year int not null check (year between 1990 and 2100),
  image text,
  active boolean not null default true,
  sort_order int not null default 0,
  unique (series_id, slug)
);

create table if not exists public.configuration_groups (
  id uuid primary key default gen_random_uuid(),
  category_id uuid not null references public.device_categories(id) on delete cascade,
  platform text check (platform is null or platform in ('apple', 'windows')),
  title text not null,
  helper_text text,
  selection_mode text not null default 'single' check (selection_mode in ('single', 'multi')),
  step_order int not null default 0,
  depends_on_processor_family text,
  active boolean not null default true
);

create table if not exists public.configuration_options (
  id uuid primary key default gen_random_uuid(),
  group_id uuid not null references public.configuration_groups(id) on delete cascade,
  label text not null,
  description text,
  price_effect_type public.price_effect_type not null default 'deduct_fixed',
  price_effect_amount numeric(12, 2) not null default 0 check (price_effect_amount >= 0),
  processor_family text,
  sort_order int not null default 0
);

create table if not exists public.condition_groups (
  id uuid primary key default gen_random_uuid(),
  category_id uuid not null references public.device_categories(id) on delete cascade,
  title text not null,
  helper_text text,
  selection_mode text not null default 'single' check (selection_mode in ('single', 'multi')),
  step_order int not null default 0,
  active boolean not null default true
);

create table if not exists public.condition_options (
  id uuid primary key default gen_random_uuid(),
  group_id uuid not null references public.condition_groups(id) on delete cascade,
  label text not null,
  description text,
  price_effect_type public.price_effect_type not null default 'deduct_fixed',
  price_effect_amount numeric(12, 2) not null default 0 check (price_effect_amount >= 0),
  sort_order int not null default 0
);

create table if not exists public.device_orders (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  user_id uuid not null references auth.users(id) on delete restrict,
  status public.device_order_status not null default 'new',
  customer_name text not null check (char_length(customer_name) between 1 and 100),
  phone text not null check (phone ~ '^[0-9]{10}$'),
  email text,
  address text not null,
  pincode text not null check (pincode ~ '^[0-9]{6}$'),
  pickup_date date not null check (pickup_date >= current_date),
  pickup_slot text not null check (pickup_slot in ('morning', 'afternoon', 'evening')),
  notes text,
  category_name text not null,
  brand_name text not null,
  series_name text not null,
  model_name text not null,
  model_id uuid references public.device_models(id) on delete set null,
  base_price numeric(12, 2) not null,
  final_quote numeric(12, 2) not null,
  answers jsonb not null default '[]',
  quote_breakdown jsonb not null default '{}'
);
create index if not exists device_orders_user_id_idx on public.device_orders(user_id, created_at desc);

create or replace function public.is_numunix_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select coalesce((auth.jwt() ->> 'email') = 'admin@numunix.com', false)
$$;

-- Quote order of operations: configuration effects on the base price, then age
-- depreciation on the post-configuration amount, then condition/accessory
-- deductions on the depreciated amount, then round to the nearest ₹100, then
-- floor at 5% of the original base price. Percent effects are relative to the
-- subtotal at the stage they're applied (base price for configuration,
-- post-depreciation amount for condition).
create or replace function public.calculate_laptop_quote(
  p_model_id uuid,
  p_config_option_ids uuid[] default '{}',
  p_condition_option_ids uuid[] default '{}'
)
returns jsonb
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  m record;
  base numeric;
  config_amount numeric := 0;
  after_config numeric;
  age_years int;
  age_percent int;
  age_amount numeric;
  after_age numeric;
  condition_amount numeric := 0;
  final_amount numeric;
  r record;
begin
  select mo.*, s.name series_name, b.name brand_name, c.name category_name
  into m
  from public.device_models mo
  join public.device_series s on s.id = mo.series_id
  join public.device_brands b on b.id = s.brand_id
  join public.device_categories c on c.id = b.category_id
  where mo.id = p_model_id;

  if not found then
    raise exception 'Model not found';
  end if;

  base := m.base_price;

  for r in
    select price_effect_type as t, price_effect_amount as a
    from public.configuration_options
    where id = any(p_config_option_ids)
  loop
    if r.t = 'bonus_fixed' then
      config_amount := config_amount + r.a;
    elsif r.t = 'deduct_fixed' then
      config_amount := config_amount - r.a;
    else
      config_amount := config_amount - base * r.a / 100;
    end if;
  end loop;
  after_config := base + config_amount;

  age_years := greatest(extract(year from current_date)::int - m.year, 0);
  age_percent := case
    when age_years <= 0 then 0
    when age_years = 1 then 8
    when age_years = 2 then 15
    when age_years = 3 then 25
    when age_years = 4 then 32
    else 38
  end;
  age_amount := after_config * age_percent / 100;
  after_age := after_config - age_amount;

  for r in
    select price_effect_type as t, price_effect_amount as a
    from public.condition_options
    where id = any(p_condition_option_ids)
  loop
    if r.t = 'bonus_fixed' then
      condition_amount := condition_amount + r.a;
    elsif r.t = 'deduct_fixed' then
      condition_amount := condition_amount - r.a;
    else
      condition_amount := condition_amount - after_age * r.a / 100;
    end if;
  end loop;

  final_amount := after_age + condition_amount;
  final_amount := round(final_amount / 100) * 100;
  final_amount := greatest(m.base_price * 0.05, final_amount);

  return jsonb_build_object(
    'category', m.category_name,
    'brand', m.brand_name,
    'series', m.series_name,
    'model', m.name,
    'base_price', m.base_price,
    'config_amount', config_amount,
    'after_config', after_config,
    'age_percent', age_percent,
    'age_amount', age_amount,
    'after_age', after_age,
    'condition_amount', condition_amount,
    'final_quote', final_amount
  );
end;
$$;

alter table public.device_categories enable row level security;
alter table public.device_brands enable row level security;
alter table public.device_series enable row level security;
alter table public.device_models enable row level security;
alter table public.configuration_groups enable row level security;
alter table public.configuration_options enable row level security;
alter table public.condition_groups enable row level security;
alter table public.condition_options enable row level security;
alter table public.device_orders enable row level security;

-- Tables with their own `active` flag: only active rows are publicly
-- readable. Option tables (configuration_options / condition_options) have no
-- `active` column of their own — visibility is controlled by their parent
-- group's `active` flag, so options are always readable and admin-managed.
do $$
declare t text;
begin
  foreach t in array array['device_categories', 'device_brands', 'device_series', 'device_models', 'configuration_groups', 'condition_groups']
  loop
    execute format('drop policy if exists "public active" on public.%I', t);
    execute format('create policy "public active" on public.%I for select to anon, authenticated using (active)', t);
    execute format('drop policy if exists "admin manage" on public.%I', t);
    execute format('create policy "admin manage" on public.%I for all to authenticated using (public.is_numunix_admin()) with check (public.is_numunix_admin())', t);
  end loop;

  foreach t in array array['configuration_options', 'condition_options']
  loop
    execute format('drop policy if exists "public read" on public.%I', t);
    execute format('create policy "public read" on public.%I for select to anon, authenticated using (true)', t);
    execute format('drop policy if exists "admin manage" on public.%I', t);
    execute format('create policy "admin manage" on public.%I for all to authenticated using (public.is_numunix_admin()) with check (public.is_numunix_admin())', t);
  end loop;
end $$;

drop policy if exists "own orders" on public.device_orders;
create policy "own orders" on public.device_orders for select to authenticated
using (user_id = auth.uid() or public.is_numunix_admin());

drop policy if exists "create own orders" on public.device_orders;
create policy "create own orders" on public.device_orders for insert to authenticated
with check (user_id = auth.uid());

drop policy if exists "admin orders" on public.device_orders;
create policy "admin orders" on public.device_orders for all to authenticated
using (public.is_numunix_admin()) with check (public.is_numunix_admin());

grant usage on schema public to anon, authenticated;
grant select on public.device_categories, public.device_brands, public.device_series, public.device_models, public.configuration_groups, public.configuration_options, public.condition_groups, public.condition_options to anon, authenticated;
grant insert, update, delete on public.device_categories, public.device_brands, public.device_series, public.device_models, public.configuration_groups, public.configuration_options, public.condition_groups, public.condition_options to authenticated;
grant select, insert, update, delete on public.device_orders to authenticated;
grant execute on function public.calculate_laptop_quote(uuid, uuid[], uuid[]) to anon, authenticated;

insert into public.device_categories (name, slug, icon, sort_order)
values ('Laptops', 'laptops', 'laptop', 1)
on conflict (slug) do nothing;

insert into public.device_brands (category_id, name, slug, platform, sort_order)
select id, 'Apple', 'apple', 'apple', 1 from public.device_categories where slug = 'laptops'
on conflict do nothing;
insert into public.device_brands (category_id, name, slug, platform, sort_order)
select id, 'Dell', 'dell', 'windows', 2 from public.device_categories where slug = 'laptops'
on conflict do nothing;
insert into public.device_brands (category_id, name, slug, platform, sort_order)
select id, 'Lenovo', 'lenovo', 'windows', 3 from public.device_categories where slug = 'laptops'
on conflict do nothing;

insert into public.device_series (brand_id, name, slug, sort_order)
select id, 'MacBook Air', 'macbook-air', 1 from public.device_brands where slug = 'apple'
on conflict do nothing;
insert into public.device_series (brand_id, name, slug, sort_order)
select id, 'MacBook Pro', 'macbook-pro', 2 from public.device_brands where slug = 'apple'
on conflict do nothing;
insert into public.device_series (brand_id, name, slug, sort_order)
select id, 'XPS', 'xps', 1 from public.device_brands where slug = 'dell'
on conflict do nothing;
insert into public.device_series (brand_id, name, slug, sort_order)
select id, 'ThinkPad', 'thinkpad', 1 from public.device_brands where slug = 'lenovo'
on conflict do nothing;

insert into public.device_models (series_id, name, slug, base_price, year, sort_order)
select id, 'MacBook Air M1 2020', 'macbook-air-m1-2020', 35000, 2020, 1 from public.device_series where slug = 'macbook-air'
on conflict do nothing;
insert into public.device_models (series_id, name, slug, base_price, year, sort_order)
select id, 'MacBook Pro M1 2020', 'macbook-pro-m1-2020', 48000, 2020, 1 from public.device_series where slug = 'macbook-pro'
on conflict do nothing;
insert into public.device_models (series_id, name, slug, base_price, year, sort_order)
select id, 'Dell XPS 13 9310', 'dell-xps-13-9310', 38000, 2021, 1 from public.device_series where slug = 'xps'
on conflict do nothing;
insert into public.device_models (series_id, name, slug, base_price, year, sort_order)
select id, 'ThinkPad T14 Gen 2', 'thinkpad-t14-gen-2', 30000, 2021, 1 from public.device_series where slug = 'thinkpad'
on conflict do nothing;

-- Seed example configuration/condition questions so the funnel isn't empty out
-- of the box. All fully editable afterwards from the admin Devices tab.
do $$
declare
  v_category_id uuid;
  v_group_id uuid;
begin
  select id into v_category_id from public.device_categories where slug = 'laptops';

  if v_category_id is not null and not exists (
    select 1 from public.configuration_groups where category_id = v_category_id
  ) then
    insert into public.configuration_groups (category_id, platform, title, helper_text, selection_mode, step_order)
    values (v_category_id, 'windows', 'Which processor does your laptop have?', 'This helps us match the right valuation for your configuration.', 'single', 1)
    returning id into v_group_id;
    insert into public.configuration_options (group_id, label, price_effect_type, price_effect_amount, processor_family, sort_order) values
      (v_group_id, 'Intel', 'deduct_fixed', 0, 'intel', 1),
      (v_group_id, 'AMD', 'deduct_fixed', 0, 'amd', 2);

    insert into public.configuration_groups (category_id, platform, title, helper_text, selection_mode, step_order, depends_on_processor_family)
    values (v_category_id, 'windows', 'Which Intel generation is it?', 'Newer generations hold their value better.', 'single', 2, 'intel')
    returning id into v_group_id;
    insert into public.configuration_options (group_id, label, price_effect_type, price_effect_amount, sort_order) values
      (v_group_id, '10th Gen or older', 'deduct_fixed', 2000, 1),
      (v_group_id, '11th / 12th Gen', 'deduct_fixed', 0, 2),
      (v_group_id, '13th Gen or newer', 'bonus_fixed', 1500, 3);

    insert into public.configuration_groups (category_id, platform, title, helper_text, selection_mode, step_order)
    values (v_category_id, 'apple', 'Which Apple chip does it have?', 'Apple Silicon models hold their value better than Intel-based Macs.', 'single', 1)
    returning id into v_group_id;
    insert into public.configuration_options (group_id, label, price_effect_type, price_effect_amount, sort_order) values
      (v_group_id, 'Intel-based Mac', 'deduct_fixed', 3000, 1),
      (v_group_id, 'M1', 'deduct_fixed', 0, 2),
      (v_group_id, 'M2', 'bonus_fixed', 2000, 3),
      (v_group_id, 'M3 or newer', 'bonus_fixed', 4000, 4);

    insert into public.configuration_groups (category_id, platform, title, helper_text, selection_mode, step_order)
    values (v_category_id, null, 'How much RAM does it have?', 'More memory means smoother multitasking and a higher resale value.', 'single', 3)
    returning id into v_group_id;
    insert into public.configuration_options (group_id, label, price_effect_type, price_effect_amount, sort_order) values
      (v_group_id, '8GB', 'deduct_fixed', 0, 1),
      (v_group_id, '16GB', 'bonus_fixed', 2000, 2),
      (v_group_id, '32GB or more', 'bonus_fixed', 4000, 3);

    insert into public.configuration_groups (category_id, platform, title, helper_text, selection_mode, step_order)
    values (v_category_id, null, 'What is the storage capacity?', 'Higher storage capacities are in more demand.', 'single', 4)
    returning id into v_group_id;
    insert into public.configuration_options (group_id, label, price_effect_type, price_effect_amount, sort_order) values
      (v_group_id, '128GB / 256GB', 'deduct_fixed', 0, 1),
      (v_group_id, '512GB', 'bonus_fixed', 1500, 2),
      (v_group_id, '1TB or more', 'bonus_fixed', 3000, 3);

    insert into public.configuration_groups (category_id, platform, title, helper_text, selection_mode, step_order)
    values (v_category_id, null, 'Does it have dedicated graphics?', 'Discrete GPUs add resale value for creative and gaming use.', 'single', 5)
    returning id into v_group_id;
    insert into public.configuration_options (group_id, label, price_effect_type, price_effect_amount, sort_order) values
      (v_group_id, 'No, integrated graphics only', 'deduct_fixed', 0, 1),
      (v_group_id, 'Yes, dedicated graphics', 'bonus_fixed', 2500, 2);

    insert into public.condition_groups (category_id, title, helper_text, selection_mode, step_order)
    values (v_category_id, 'Overall physical condition', 'Be honest — our engineer verifies this at pickup.', 'single', 1)
    returning id into v_group_id;
    insert into public.condition_options (group_id, label, price_effect_type, price_effect_amount, sort_order) values
      (v_group_id, 'Excellent', 'deduct_fixed', 0, 1),
      (v_group_id, 'Minor signs of use', 'deduct_fixed', 1000, 2),
      (v_group_id, 'Visible scratches or dents', 'deduct_fixed', 3000, 3);

    insert into public.condition_groups (category_id, title, helper_text, selection_mode, step_order)
    values (v_category_id, 'Is the screen working properly?', null, 'single', 2)
    returning id into v_group_id;
    insert into public.condition_options (group_id, label, price_effect_type, price_effect_amount, sort_order) values
      (v_group_id, 'Fully working', 'deduct_fixed', 0, 1),
      (v_group_id, 'Display lines or dead pixels', 'deduct_fixed', 4000, 2),
      (v_group_id, 'Cracked screen', 'deduct_fixed', 8000, 3);

    insert into public.condition_groups (category_id, title, helper_text, selection_mode, step_order)
    values (v_category_id, 'Is the battery healthy?', null, 'single', 3)
    returning id into v_group_id;
    insert into public.condition_options (group_id, label, price_effect_type, price_effect_amount, sort_order) values
      (v_group_id, 'Good battery', 'deduct_fixed', 0, 1),
      (v_group_id, 'Battery drains quickly', 'deduct_fixed', 2000, 2),
      (v_group_id, 'Does not charge', 'deduct_fixed', 5000, 3);

    insert into public.condition_groups (category_id, title, helper_text, selection_mode, step_order)
    values (v_category_id, 'Are all keys and trackpad working?', null, 'single', 4)
    returning id into v_group_id;
    insert into public.condition_options (group_id, label, price_effect_type, price_effect_amount, sort_order) values
      (v_group_id, 'All working', 'deduct_fixed', 0, 1),
      (v_group_id, 'Some keys not working', 'deduct_fixed', 1500, 2),
      (v_group_id, 'Trackpad issue', 'deduct_fixed', 1500, 3);

    insert into public.condition_groups (category_id, title, helper_text, selection_mode, step_order)
    values (v_category_id, 'Any functional issues?', 'Select all that apply.', 'multi', 5)
    returning id into v_group_id;
    insert into public.condition_options (group_id, label, price_effect_type, price_effect_amount, sort_order) values
      (v_group_id, 'No issues', 'deduct_fixed', 0, 1),
      (v_group_id, 'Overheating', 'deduct_fixed', 2000, 2),
      (v_group_id, 'Hinge damage', 'deduct_fixed', 3000, 3),
      (v_group_id, 'Motherboard issue', 'deduct_percent', 20, 4);

    insert into public.condition_groups (category_id, title, helper_text, selection_mode, step_order)
    values (v_category_id, 'Do you have the original charger?', null, 'single', 6)
    returning id into v_group_id;
    insert into public.condition_options (group_id, label, price_effect_type, price_effect_amount, sort_order) values
      (v_group_id, 'Original charger', 'deduct_fixed', 0, 1),
      (v_group_id, 'Compatible charger', 'deduct_fixed', 500, 2),
      (v_group_id, 'No charger', 'deduct_fixed', 1200, 3);
  end if;
end $$;

notify pgrst, 'reload schema';
