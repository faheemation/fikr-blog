-- ============================================
-- FIX: Update RLS policies for admin access
-- ============================================
-- Admins should see ALL posts, not just their own

-- Drop old policies
DROP POLICY IF EXISTS "Admins can view all posts" ON posts;

-- Create new policy: Admins can view all posts
CREATE POLICY "Admins can view all posts"
ON posts FOR SELECT
USING (
  -- Published posts are visible to everyone
  status = 'published'
  OR
  -- Admins can see all posts (including drafts)
  EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
    AND profiles.role = 'admin'
  )
);

-- Verify policies
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual
FROM pg_policies 
WHERE tablename = 'posts'
ORDER BY policyname;
