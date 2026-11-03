-- Verify the public RPC contract and brand persistence without retaining test leads.
BEGIN;
SET LOCAL ROLE anon;
DO $$
DECLARE receipt record;
BEGIN
  SELECT * INTO receipt FROM public.submit_repair_booking('Brand verification (rolled back)', '+919876543210', 'Washing Machine Repair', 'Flexible', 'Verification only', '/contact', ' LG ');
  IF receipt.reference IS NULL OR receipt.service <> 'Washing Machine Repair' THEN
    RAISE EXCEPTION 'Brand-aware booking receipt invalid';
  END IF;
  PERFORM public.submit_repair_booking('Legacy verification (rolled back)', '+919876543210', 'Mobile Repair', 'Flexible', '', '/contact');
END $$;
RESET ROLE;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.contact_enquiries WHERE name = 'Brand verification (rolled back)' AND brand = 'LG' AND status = 'new' AND notes = '') THEN
    RAISE EXCEPTION 'Brand or internal fields not persisted correctly';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM public.contact_enquiries WHERE name = 'Legacy verification (rolled back)' AND brand IS NULL) THEN
    RAISE EXCEPTION 'Legacy function compatibility failed';
  END IF;
  BEGIN
    PERFORM public.submit_repair_booking('Invalid brand (rolled back)', '+919876543210', 'Mobile Repair', 'Flexible', '', '/contact', repeat('a', 101));
    RAISE EXCEPTION 'Oversized brand accepted';
  EXCEPTION WHEN check_violation THEN NULL;
  END;
  IF has_table_privilege('anon', 'public.contact_enquiries', 'SELECT') THEN
    RAISE EXCEPTION 'Public customer reads must remain forbidden';
  END IF;
END $$;
ROLLBACK;
