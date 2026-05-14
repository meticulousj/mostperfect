insert into storage.buckets (id, name, public) values ('chapter-audio', 'chapter-audio', true) on conflict (id) do nothing;

create policy "Public can read chapter audio"
on storage.objects for select
using (bucket_id = 'chapter-audio');