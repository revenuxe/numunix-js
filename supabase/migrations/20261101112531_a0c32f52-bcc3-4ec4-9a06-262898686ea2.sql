CREATE OR REPLACE FUNCTION public.submit_repair_booking(p_name text, p_phone text, p_service text, p_timeline text, p_description text, p_source text)
RETURNS TABLE(reference text, service text)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  RETURN QUERY
  INSERT INTO public.contact_enquiries AS booking (name, phone, email, service, timeline, description, source, status, notes)
  VALUES (btrim(p_name), btrim(p_phone), NULL, btrim(p_service), p_timeline, NULLIF(btrim(p_description), ''), btrim(p_source), 'new', '')
  RETURNING booking.booking_reference, booking.service;
END;
$$;
REVOKE ALL ON FUNCTION public.submit_repair_booking(text,text,text,text,text,text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.submit_repair_booking(text,text,text,text,text,text) TO anon, authenticated, service_role;
COMMENT ON FUNCTION public.submit_repair_booking(text,text,text,text,text,text) IS 'Public write-only booking action. Existing table constraints validate fields; only the inserted booking reference and service are returned. No customer reads or caller-controlled internal fields.';