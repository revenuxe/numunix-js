-- The leads table generates a booking identifier during insert.
-- Public form submissions need permission to execute that no-argument helper.
grant execute on function public.generate_booking_id() to anon, authenticated;