-- Verify the explicitly configured admin's lead permissions without keeping test data.
begin;
select set_config('test.enquiry_id', gen_random_uuid()::text, true);
insert into public.contact_enquiries (id, name, phone, service, timeline, source)
values (current_setting('test.enquiry_id')::uuid, 'Admin permission test (rolled back)', '+1 202 555 0100', 'Test service', 'Flexible', '/contact');

select set_config('request.jwt.claim.sub', (
  select u.id::text from auth.users u
  join public.admin_users a on a.user_id = u.id
  where lower(u.email) = 'admin@numunix.com'
), true);
set local role authenticated;
do $$
declare affected integer;
begin
  if not exists (select 1 from public.contact_enquiries where id = current_setting('test.enquiry_id')::uuid) then
    raise exception 'Admin cannot read the test lead';
  end if;
  update public.contact_enquiries set status = 'qualified', notes = 'Permissions verified'
    where id = current_setting('test.enquiry_id')::uuid;
  get diagnostics affected = row_count;
  if affected <> 1 then raise exception 'Admin cannot update the test lead'; end if;
  delete from public.contact_enquiries where id = current_setting('test.enquiry_id')::uuid;
  get diagnostics affected = row_count;
  if affected <> 1 then raise exception 'Admin cannot delete the test lead'; end if;
end $$;
reset role;
rollback;
