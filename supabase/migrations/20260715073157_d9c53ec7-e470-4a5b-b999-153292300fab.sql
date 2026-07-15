
-- Explicit deny-by-default for purchases: no client INSERT/UPDATE/DELETE.
-- Service role bypasses RLS, so backend webhooks/edge functions still work.
CREATE POLICY "No client inserts on purchases"
  ON public.purchases FOR INSERT TO authenticated, anon
  WITH CHECK (false);

CREATE POLICY "No client updates on purchases"
  ON public.purchases FOR UPDATE TO authenticated, anon
  USING (false) WITH CHECK (false);

CREATE POLICY "No client deletes on purchases"
  ON public.purchases FOR DELETE TO authenticated, anon
  USING (false);

-- Storage RLS for chapter-audio bucket.
CREATE POLICY "Paid users can read chapter-audio"
  ON storage.objects FOR SELECT TO authenticated
  USING (
    bucket_id = 'chapter-audio'
    AND EXISTS (
      SELECT 1 FROM public.purchases p
      WHERE p.user_id = auth.uid() AND p.status = 'paid'
    )
  );

CREATE POLICY "No client writes on chapter-audio"
  ON storage.objects FOR INSERT TO authenticated, anon
  WITH CHECK (bucket_id = 'chapter-audio' AND false);

CREATE POLICY "No client updates on chapter-audio"
  ON storage.objects FOR UPDATE TO authenticated, anon
  USING (bucket_id = 'chapter-audio' AND false)
  WITH CHECK (bucket_id = 'chapter-audio' AND false);

CREATE POLICY "No client deletes on chapter-audio"
  ON storage.objects FOR DELETE TO authenticated, anon
  USING (bucket_id = 'chapter-audio' AND false);
