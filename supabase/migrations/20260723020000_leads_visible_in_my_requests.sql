-- Let a signed-in customer see the repair/service requests they submitted
-- (Repair Laptop page, brand repair pages, CCTV/service pages, contact form)
-- inside "My requests". Anonymous submissions keep user_id null and stay
-- admin-only, same as before.
alter table public.leads add column if not exists user_id uuid references auth.users(id) on delete set null;

drop policy if exists "Customers can read own leads" on public.leads;
create policy "Customers can read own leads"
on public.leads for select
to authenticated
using (auth.uid() = user_id);

-- Recreate submit_public_lead with an extra optional p_user_id so the RPC can
-- stamp the request with the caller's id when they're signed in.
drop function if exists public.submit_public_lead(text, text, text, text, text, text);

create function public.submit_public_lead(
  p_name text,
  p_phone text,
  p_postal_code text,
  p_service text,
  p_message text,
  p_source text,
  p_user_id uuid default null
)
returns text
language plpgsql
security definer
set search_path = public
as $$
declare
  new_booking_id text;
begin
  insert into public.leads (name, email, phone, postal_code, service, message, source, user_id)
  values (trim(p_name), null, trim(p_phone), nullif(trim(p_postal_code), ''), trim(p_service), nullif(trim(p_message), ''), trim(p_source), p_user_id)
  returning booking_id::text into new_booking_id;

  return new_booking_id;
end;
$$;

revoke all on function public.submit_public_lead(text, text, text, text, text, text, uuid) from public;
grant execute on function public.submit_public_lead(text, text, text, text, text, text, uuid) to anon, authenticated;
