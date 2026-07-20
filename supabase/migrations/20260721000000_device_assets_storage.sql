-- Public storage bucket for brand logos, series images and model photos used
-- by the laptop buyback catalog. Anyone can read; only the Numunix admin can
-- upload, replace or remove files.
insert into storage.buckets (id, name, public)
values ('device-assets', 'device-assets', true)
on conflict (id) do nothing;

drop policy if exists "device-assets public read" on storage.objects;
create policy "device-assets public read"
on storage.objects for select
to anon, authenticated
using (bucket_id = 'device-assets');

drop policy if exists "device-assets admin insert" on storage.objects;
create policy "device-assets admin insert"
on storage.objects for insert
to authenticated
with check (bucket_id = 'device-assets' and public.is_numunix_admin());

drop policy if exists "device-assets admin update" on storage.objects;
create policy "device-assets admin update"
on storage.objects for update
to authenticated
using (bucket_id = 'device-assets' and public.is_numunix_admin())
with check (bucket_id = 'device-assets' and public.is_numunix_admin());

drop policy if exists "device-assets admin delete" on storage.objects;
create policy "device-assets admin delete"
on storage.objects for delete
to authenticated
using (bucket_id = 'device-assets' and public.is_numunix_admin());
