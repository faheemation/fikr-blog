-- ============================================
-- Add Language Support for Posts
-- ============================================

-- Add language column (default to English)
ALTER TABLE posts 
ADD COLUMN IF NOT EXISTS language VARCHAR(10) DEFAULT 'en' NOT NULL;

-- Add index for performance
CREATE INDEX IF NOT EXISTS idx_posts_language ON posts(language);

-- Add check constraint (only en or ml allowed)
ALTER TABLE posts 
ADD CONSTRAINT posts_language_check 
CHECK (language IN ('en', 'ml'));

-- Update existing posts to English
UPDATE posts SET language = 'en' WHERE language IS NULL OR language = '';

-- Verification
SELECT 
  column_name, 
  data_type, 
  is_nullable,
  column_default
FROM information_schema.columns
WHERE table_name = 'posts' AND column_name = 'language';

-- Check existing posts
SELECT id, title, language FROM posts LIMIT 10;
