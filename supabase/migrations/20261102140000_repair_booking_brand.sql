ALTER TABLE public.contact_enquiries
  ADD COLUMN brand text CONSTRAINT contact_enquiries_brand_length CHECK (char_length(brand) BETWEEN 1 AND 100);

-- Keep the original six-argument function for older clients and callbacks.
-- This overload accepts only enquiry data and retains the write-only receipt contract.
CREATE FUNCTION public.submit_repair_booking(
  p_name text, p_phone text, p_service text, p_timeline text,
  p_description text, p_source text, p_brand text
)
RETURNS TABLE(reference text, service text)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  RETURN QUERY
  INSERT INTO public.contact_enquiries AS booking (name, phone, email, service, timeline, description, source, brand, status, notes)
  VALUES (btrim(p_name), btrim(p_phone), NULL, btrim(p_service), p_timeline, NULLIF(btrim(p_description), ''), btrim(p_source), NULLIF(btrim(p_brand), ''), 'new', '')
  RETURNING booking.booking_reference, booking.service;
END;
$$;
REVOKE ALL ON FUNCTION public.submit_repair_booking(text,text,text,text,text,text,text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.submit_repair_booking(text,text,text,text,text,text,text) TO anon, authenticated, service_role;
COMMENT ON FUNCTION public.submit_repair_booking(text,text,text,text,text,text,text) IS 'Public write-only repair booking including equipment brand. Returns only the inserted reference and service; fixes internal status and notes. Existing RLS and table privileges are unchanged.';
