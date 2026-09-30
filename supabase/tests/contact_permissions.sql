-- All test writes are rolled back. Run after applying both migrations.
begin;

do $$
begin
  if not (select relrowsecurity from pg_class where oid = 'public.contact_enquiries'::regclass)
     or not (select relrowsecurity from pg_class where oid = 'public.admin_users'::regclass) then
    raise exception 'Row level security must be enabled';
  end if;
  if has_table_privilege('anon', 'public.contact_enquiries', 'SELECT')
     or has_table_privilege('anon', 'public.contact_enquiries', 'DELETE')
     or has_table_privilege('anon', 'public.admin_users', 'INSERT')
     or has_table_privilege('authenticated', 'public.admin_users', 'INSERT') then
    raise exception 'Unexpected public privileges';
  end if;
  if has_column_privilege('anon', 'public.contact_enquiries', 'status', 'INSERT')
     or has_column_privilege('authenticated', 'public.contact_enquiries', 'notes', 'INSERT') then
    raise exception 'Visitors must not be able to set internal fields';
  end if;
end $$;

set local role anon;
insert into public.contact_enquiries (name, phone, email, service, timeline, description, source)
values ('Permission test (rolled back)', '+1 202 555 0100', null, 'Test service', 'Flexible', null, '/contact');

reset role;
select set_config('request.jwt.claim.sub', '', true);
select set_config('request.jwt.claims', '{}', true);
set local role authenticated;
do $$
declare affected integer;
begin
  if exists (select 1 from public.contact_enquiries) then
    raise exception 'A session without admin membership can read leads';
  end if;
  update public.contact_enquiries set status = 'closed';
  get diagnostics affected = row_count;
  if affected <> 0 then raise exception 'Non-admin update unexpectedly succeeded'; end if;
  delete from public.contact_enquiries;
  get diagnostics affected = row_count;
  if affected <> 0 then raise exception 'Non-admin delete unexpectedly succeeded'; end if;
end $$;

reset role;
rollback;
