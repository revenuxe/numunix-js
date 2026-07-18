
CREATE OR REPLACE FUNCTION public.generate_booking_id()
RETURNS TEXT
LANGUAGE plpgsql
SET search_path = public
AS $$
DECLARE
  new_id TEXT;
BEGIN
  new_id := 'NMX-' || to_char(now(), 'YYMMDD') || '-' ||
    upper(substring(md5(random()::text || clock_timestamp()::text) from 1 for 5));
  RETURN new_id;
END;
$$;

REVOKE EXECUTE ON FUNCTION public.generate_booking_id() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.update_updated_at_column() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.handle_new_user_admin() FROM PUBLIC, anon, authenticated;
