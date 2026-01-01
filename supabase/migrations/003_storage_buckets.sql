-- Storage Buckets Configuration
-- Run this in your Supabase SQL Editor

-- =====================================================
-- CREATE STORAGE BUCKETS
-- =====================================================

-- Bucket for post images (featured images, inline images)
INSERT INTO storage.buckets (id, name, public)
VALUES ('post-images', 'post-images', true)
ON CONFLICT (id) DO NOTHING;

-- Bucket for user avatars
INSERT INTO storage.buckets (id, name, public)
VALUES ('avatars', 'avatars', true)
ON CONFLICT (id) DO NOTHING;

-- Bucket for work/portfolio images
INSERT INTO storage.buckets (id, name, public)
VALUES ('work-images', 'work-images', true)
ON CONFLICT (id) DO NOTHING;

-- =====================================================
-- STORAGE POLICIES
-- =====================================================

-- Post Images Policies
CREATE POLICY "Anyone can view post images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'post-images');

CREATE POLICY "Writers and admins can upload post images"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'post-images'
    AND EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND role IN ('writer', 'admin')
    )
  );

CREATE POLICY "Writers and admins can update post images"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id = 'post-images'
    AND EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND role IN ('writer', 'admin')
    )
  );

CREATE POLICY "Writers and admins can delete post images"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'post-images'
    AND EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND role IN ('writer', 'admin')
    )
  );

-- Avatar Policies
CREATE POLICY "Anyone can view avatars"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'avatars');

CREATE POLICY "Users can upload their own avatar"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'avatars'
    AND (storage.foldername(name))[1] = auth.uid()::text
  );

CREATE POLICY "Users can update their own avatar"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id = 'avatars'
    AND (storage.foldername(name))[1] = auth.uid()::text
  );

CREATE POLICY "Users can delete their own avatar"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'avatars'
    AND (storage.foldername(name))[1] = auth.uid()::text
  );

-- Work Images Policies
CREATE POLICY "Anyone can view work images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'work-images');

CREATE POLICY "Only admins can upload work images"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'work-images'
    AND EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Only admins can update work images"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id = 'work-images'
    AND EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Only admins can delete work images"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'work-images'
    AND EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );
