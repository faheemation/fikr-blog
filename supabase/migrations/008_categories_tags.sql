-- ============================================
-- Categories & Tags System
-- ============================================

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- Categories Table
-- ============================================

CREATE TABLE IF NOT EXISTS categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL UNIQUE,
  slug VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  color VARCHAR(7) DEFAULT '#000000',
  icon VARCHAR(50),
  post_count INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for performance
CREATE INDEX IF NOT EXISTS idx_categories_slug ON categories(slug);

-- ============================================
-- Tags Table
-- ============================================

CREATE TABLE IF NOT EXISTS tags (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(50) NOT NULL UNIQUE,
  slug VARCHAR(50) NOT NULL UNIQUE,
  color VARCHAR(7) DEFAULT '#6B7280',
  post_count INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for performance
CREATE INDEX IF NOT EXISTS idx_tags_slug ON tags(slug);

-- ============================================
-- Post-Tags Junction Table
-- ============================================

CREATE TABLE IF NOT EXISTS post_tags (
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
  tag_id UUID REFERENCES tags(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (post_id, tag_id)
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_post_tags_post ON post_tags(post_id);
CREATE INDEX IF NOT EXISTS idx_post_tags_tag ON post_tags(tag_id);

-- ============================================
-- Update Posts Table
-- ============================================

-- Add category_id to posts
ALTER TABLE posts 
ADD COLUMN IF NOT EXISTS category_id UUID REFERENCES categories(id) ON DELETE SET NULL;

-- Create index for performance
CREATE INDEX IF NOT EXISTS idx_posts_category ON posts(category_id);

-- ============================================
-- RLS Policies
-- ============================================

-- Categories - Anyone can view
DROP POLICY IF EXISTS "Anyone can view categories" ON categories;
CREATE POLICY "Anyone can view categories"
ON categories FOR SELECT
USING (true);

-- Categories - Admins can manage
DROP POLICY IF EXISTS "Admins can manage categories" ON categories;
CREATE POLICY "Admins can manage categories"
ON categories FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
    AND profiles.role = 'admin'
  )
);

-- Tags - Anyone can view
DROP POLICY IF EXISTS "Anyone can view tags" ON tags;
CREATE POLICY "Anyone can view tags"
ON tags FOR SELECT
USING (true);

-- Tags - Admins can manage
DROP POLICY IF EXISTS "Admins can manage tags" ON tags;
CREATE POLICY "Admins can manage tags"
ON tags FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
    AND profiles.role = 'admin'
  )
);

-- Post Tags - Anyone can view
DROP POLICY IF EXISTS "Anyone can view post_tags" ON post_tags;
CREATE POLICY "Anyone can view post_tags"
ON post_tags FOR SELECT
USING (true);

-- Post Tags - Admins can manage
DROP POLICY IF EXISTS "Admins can manage post_tags" ON post_tags;
CREATE POLICY "Admins can manage post_tags"
ON post_tags FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
    AND profiles.role = 'admin'
  )
);

-- ============================================
-- Functions to Update Post Counts
-- ============================================

-- Function to update category post count
CREATE OR REPLACE FUNCTION update_category_post_count()
RETURNS TRIGGER AS $$
BEGIN
  -- Update old category count
  IF OLD.category_id IS NOT NULL THEN
    UPDATE categories 
    SET post_count = (
      SELECT COUNT(*) FROM posts 
      WHERE category_id = OLD.category_id 
      AND status = 'published'
    )
    WHERE id = OLD.category_id;
  END IF;
  
  -- Update new category count
  IF NEW.category_id IS NOT NULL THEN
    UPDATE categories 
    SET post_count = (
      SELECT COUNT(*) FROM posts 
      WHERE category_id = NEW.category_id 
      AND status = 'published'
    )
    WHERE id = NEW.category_id;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for category post count
DROP TRIGGER IF EXISTS category_post_count_trigger ON posts;
CREATE TRIGGER category_post_count_trigger
  AFTER INSERT OR UPDATE OR DELETE ON posts
  FOR EACH ROW
  EXECUTE FUNCTION update_category_post_count();

-- Function to update tag post count
CREATE OR REPLACE FUNCTION update_tag_post_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'DELETE' THEN
    UPDATE tags 
    SET post_count = (
      SELECT COUNT(*) FROM post_tags WHERE tag_id = OLD.tag_id
    )
    WHERE id = OLD.tag_id;
    RETURN OLD;
  ELSE
    UPDATE tags 
    SET post_count = (
      SELECT COUNT(*) FROM post_tags WHERE tag_id = NEW.tag_id
    )
    WHERE id = NEW.tag_id;
    RETURN NEW;
  END IF;
END;
$$ LANGUAGE plpgsql;

-- Trigger for tag post count
DROP TRIGGER IF EXISTS tag_post_count_trigger ON post_tags;
CREATE TRIGGER tag_post_count_trigger
  AFTER INSERT OR DELETE ON post_tags
  FOR EACH ROW
  EXECUTE FUNCTION update_tag_post_count();

-- ============================================
-- Seed Default Categories
-- ============================================

INSERT INTO categories (name, slug, description, color, icon) VALUES
  ('Technology', 'technology', 'Articles about tech, AI, and innovation', '#3B82F6', 'Laptop'),
  ('Philosophy', 'philosophy', 'Deep thoughts and philosophical musings', '#8B5CF6', 'Brain'),
  ('Creativity', 'creativity', 'Art, design, and creative expression', '#EC4899', 'Palette'),
  ('Life', 'life', 'Personal growth and life experiences', '#10B981', 'Heart')
ON CONFLICT (slug) DO NOTHING;

-- ============================================
-- Verification Queries
-- ============================================

-- Check categories
SELECT * FROM categories ORDER BY name;

-- Check tags
SELECT * FROM tags ORDER BY name;

-- Check posts with categories
SELECT p.title, c.name as category 
FROM posts p 
LEFT JOIN categories c ON p.category_id = c.id 
LIMIT 10;
