-- Insert a public lead and return only its generated booking reference.
-- SECURITY DEFINER keeps the public role from reading the leads table.
create or replace function public.submit_public_lead(
  p_name text,
  p_phone text,
  p_postal_code text,
  p_service text,
  p_message text,
  p_source text
)
returns text
language plpgsql
security definer
set search_path = public
as $$
declare
  new_booking_id text;
begin
  insert into public.leads (name, email, phone, postal_code, service, message, source)
  values (trim(p_name), null, trim(p_phone), nullif(trim(p_postal_code), ''), trim(p_service), nullif(trim(p_message), ''), trim(p_source))
  returning booking_id::text into new_booking_id;

  return new_booking_id;
end;
$$;

revoke all on function public.submit_public_lead(text, text, text, text, text, text) from public;
grant execute on function public.submit_public_lead(text, text, text, text, text, text) to anon;