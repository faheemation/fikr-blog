-- Update existing posts with Unsplash images
-- Run this if you already ran the seed.sql and want to update the images

UPDATE posts 
SET featured_image = 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=800&fit=crop'
WHERE slug = 'future-of-technology';

UPDATE posts 
SET featured_image = 'https://images.unsplash.com/photo-1550859492-d5da9d8e45f3?w=1200&h=800&fit=crop'
WHERE slug = 'creativity-age-of-ai';

UPDATE posts 
SET featured_image = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=800&fit=crop'
WHERE slug = 'philosophy-modern-living';

-- Verify the update
SELECT id, title, slug, featured_image 
FROM posts 
ORDER BY published_at DESC;
