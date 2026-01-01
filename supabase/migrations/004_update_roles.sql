-- Update RLS policies for new role system
-- Admins can manage everything, users can comment/like

-- Drop existing policies
DROP POLICY IF EXISTS "Anyone can view published posts" ON posts;
DROP POLICY IF EXISTS "Writers can create posts" ON posts;
DROP POLICY IF EXISTS "Writers can update own posts" ON posts;
DROP POLICY IF EXISTS "Writers can delete own posts" ON posts;

-- Posts policies (Admin-only management)
CREATE POLICY "Anyone can view published posts"
ON posts FOR SELECT
USING (status = 'published');

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

-- Comments policies (Users can comment)
DROP POLICY IF EXISTS "Anyone can view comments" ON comments;
DROP POLICY IF EXISTS "Users can create comments" ON comments;
DROP POLICY IF EXISTS "Users can delete own comments" ON comments;

CREATE POLICY "Anyone can view comments"
ON comments FOR SELECT
USING (true);

CREATE POLICY "Authenticated users can create comments"
ON comments FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own comments"
ON comments FOR DELETE
USING (auth.uid() = user_id);

CREATE POLICY "Admins can delete any comment"
ON comments FOR DELETE
USING (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
    AND profiles.role = 'admin'
  )
);

-- Likes policies (Users can like)
DROP POLICY IF EXISTS "Anyone can view likes" ON likes;
DROP POLICY IF EXISTS "Users can manage own likes" ON likes;

CREATE POLICY "Anyone can view likes"
ON likes FOR SELECT
USING (true);

CREATE POLICY "Authenticated users can like posts"
ON likes FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can unlike posts"
ON likes FOR DELETE
USING (auth.uid() = user_id);

-- Update profiles table to add default role
ALTER TABLE profiles 
ALTER COLUMN role SET DEFAULT 'user';

-- Create function to get all authors (for admin dropdown)
CREATE OR REPLACE FUNCTION get_all_authors()
RETURNS TABLE (
  id UUID,
  full_name TEXT,
  email TEXT,
  avatar_url TEXT
) AS $$
BEGIN
  RETURN QUERY
  SELECT p.id, p.full_name, p.email, p.avatar_url
  FROM profiles p
  ORDER BY p.full_name;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
