-- Lets a signed-in customer cancel their own pending pickup request from
-- "My requests" without needing admin access. Scoped narrowly: they can only
-- ever move a row they own to 'cancelled', and never once it's already paid.
drop policy if exists "cancel own orders" on public.device_orders;
create policy "cancel own orders" on public.device_orders for update to authenticated
using (user_id = auth.uid() and status <> 'paid')
with check (user_id = auth.uid() and status = 'cancelled');
