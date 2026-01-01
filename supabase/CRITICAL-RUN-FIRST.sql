-- ============================================
-- CRITICAL: Run this FIRST before using the blog
-- ============================================

-- Step 1: Update RLS policies for new role system
-- This fixes the admin-only access and user comments/likes

-- Drop old policies
DROP POLICY IF EXISTS "Writers can create posts" ON posts;
DROP POLICY IF EXISTS "Writers can update own posts" ON posts;
DROP POLICY IF EXISTS "Writers can delete own posts" ON posts;

-- Create new admin-only policies
CREATE POLICY "Admins can create posts"
ON posts FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
    AND profiles.role = 'admin'
  )
);

CREATE POLICY "Admins can update any post"
ON posts FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
    AND profiles.role = 'admin'
  )
);

CREATE POLICY "Admins can delete any post"
ON posts FOR DELETE
USING (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
    AND profiles.role = 'admin'
  )
);

-- Update profiles default role
ALTER TABLE profiles 
ALTER COLUMN role SET DEFAULT 'user';

-- Step 2: Verify your admin account
-- Replace 'your-email@example.com' with your actual email
SELECT id, email, role FROM profiles WHERE email = 'your-email@example.com';

-- If role is not 'admin', run this:
-- UPDATE profiles SET role = 'admin' WHERE email = 'your-email@example.com';

-- Step 3: Verify posts have images
SELECT id, title, featured_image FROM posts LIMIT 5;

-- If featured_image is null, run the update-images.sql file

-- ============================================
-- VERIFICATION QUERIES
-- ============================================

-- Check all users and their roles
SELECT id, email, full_name, role, created_at 
FROM profiles 
ORDER BY created_at DESC;

-- Check all posts
SELECT id, title, status, author_id, created_at 
FROM posts 
ORDER BY created_at DESC;

-- Check RLS policies are active
SELECT schemaname, tablename, policyname 
FROM pg_policies 
WHERE tablename IN ('posts', 'comments', 'likes', 'profiles')
ORDER BY tablename, policyname;
