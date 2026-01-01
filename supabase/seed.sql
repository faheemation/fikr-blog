-- Seed Data for Fikr Blog
-- Run this in Supabase SQL Editor to populate initial content

-- Insert sample blog posts
-- Note: Replace 'YOUR_USER_ID' with your actual user ID from the profiles table

-- First, let's create some sample posts
INSERT INTO posts (title, slug, excerpt, content, featured_image, author_id, status, is_featured, reading_time, published_at)
VALUES 
(
  'The Future of Technology and Human Connection',
  'future-of-technology',
  'Exploring how emerging technologies are reshaping the way we connect, communicate, and understand each other in an increasingly digital world.',
  '# The Future of Technology and Human Connection

In an era where artificial intelligence, virtual reality, and quantum computing are no longer science fiction, we find ourselves at a fascinating crossroads. Technology has become so deeply woven into the fabric of our daily lives that it''s hard to imagine a world without it.

## The Digital Revolution

The digital revolution has transformed every aspect of human existence. From how we work and learn to how we form relationships and express ourselves, technology has fundamentally altered the human experience.

### Communication in the Digital Age

Social media platforms have given us unprecedented ability to connect with people across the globe. Yet, paradoxically, many feel more isolated than ever. The question isn''t whether technology connects us, but *how* it connects us.

## The Human Element

Despite all our technological advances, the most important element remains unchanged: our fundamental need for genuine human connection. Technology should enhance, not replace, our humanity.

### Finding Balance

The key is finding balance. We must embrace innovation while preserving what makes us human:

- Empathy and emotional intelligence
- Face-to-face interactions
- Deep, meaningful conversations
- Authentic relationships

## Looking Forward

As we move forward, the challenge isn''t to resist technology, but to shape it in ways that enhance our humanity rather than diminish it. The future belongs to those who can harness technology while maintaining their essential human qualities.

The question we must ask ourselves is not "What can technology do?" but "What should technology do to make us more human, not less?"',
  'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=800&fit=crop',
  (SELECT id FROM profiles WHERE role = 'admin' LIMIT 1),
  'published',
  true,
  8,
  NOW()
),
(
  'Creativity in the Age of AI',
  'creativity-age-of-ai',
  'What does it mean to be creative when machines can generate art, music, and writing? A deep dive into human creativity''s unique value.',
  '# Creativity in the Age of AI

Artificial intelligence can now paint, compose music, and write poetry. Does this mean human creativity is obsolete? Far from it. In fact, AI has revealed what makes human creativity truly special.

## The AI Creative Revolution

We''ve witnessed AI systems that can:

- Generate photorealistic images from text descriptions
- Compose music in any style
- Write coherent articles and stories
- Design logos and websites

This is remarkable, but it''s not the end of human creativity—it''s a new beginning.

## What Makes Human Creativity Unique

Human creativity isn''t just about producing output. It''s about:

### Intention and Meaning

When a human creates, they imbue their work with personal experience, emotion, and intention. AI can mimic patterns, but it cannot experience the joy of creation or the pain that inspires art.

### Cultural Context

Human creators are embedded in culture, history, and society. Our art reflects and shapes the world we live in. AI lacks this lived experience.

### The Creative Process

For humans, creativity is often about the journey, not just the destination. The struggle, the breakthrough moments, the evolution of ideas—these are intrinsically valuable.

## AI as a Creative Partner

Rather than viewing AI as a replacement, we should see it as a powerful tool:

- It can handle tedious tasks, freeing us for higher-level thinking
- It can generate variations quickly, expanding our creative possibilities
- It can combine ideas in unexpected ways, sparking new inspiration

## The Future of Creativity

The future isn''t human vs. AI—it''s human + AI. The most exciting creative work will come from those who can harness AI''s capabilities while bringing uniquely human elements:

- Emotional depth
- Cultural awareness
- Ethical considerations
- Personal vision

Your creativity isn''t threatened by AI. It''s more valuable than ever.',
  'https://images.unsplash.com/photo-1550859492-d5da9d8e45f3?w=1200&h=800&fit=crop',
  (SELECT id FROM profiles WHERE role = 'admin' LIMIT 1),
  'published',
  true,
  6,
  NOW() - INTERVAL '1 day'
),
(
  'Philosophy of Modern Living',
  'philosophy-modern-living',
  'Ancient wisdom meets contemporary challenges. How timeless philosophical principles can guide us through the complexities of modern life.',
  '# Philosophy of Modern Living

In our fast-paced, technology-driven world, ancient philosophy might seem irrelevant. Yet the fundamental questions that occupied Socrates, Buddha, and Confucius are more relevant than ever.

## The Eternal Questions

Despite all our progress, we still grapple with the same core questions:

- What is a good life?
- How should we treat others?
- What gives life meaning?
- How do we find happiness?

## Ancient Wisdom for Modern Problems

### Stoicism and Digital Overwhelm

The Stoics taught us to focus on what we can control and accept what we cannot. In an age of information overload and social media anxiety, this wisdom is invaluable.

**Marcus Aurelius** wrote: "You have power over your mind—not outside events. Realize this, and you will find strength."

### Buddhist Mindfulness and Modern Stress

Buddhism''s emphasis on present-moment awareness offers a powerful antidote to modern stress and distraction.

The practice of mindfulness helps us:
- Reduce anxiety about the future
- Let go of regrets about the past
- Find peace in the present moment

### Aristotelian Ethics and Decision Making

Aristotle''s concept of the "golden mean"—finding balance between extremes—is remarkably applicable to modern life.

Too much screen time? Too little? The answer lies in finding your personal balance.

## Practical Philosophy

Philosophy isn''t just abstract thinking—it''s a practical guide for living:

1. **Question your assumptions**: Don''t accept things just because "that''s how it''s always been"
2. **Examine your values**: What truly matters to you?
3. **Practice reflection**: Regular self-examination leads to growth
4. **Seek wisdom**: Learn from both ancient texts and modern thinkers

## Living Philosophically Today

To live philosophically in the modern world means:

- Being intentional about how you spend your time
- Questioning societal norms that don''t serve you
- Cultivating virtues like wisdom, courage, and compassion
- Finding meaning beyond material success

## Conclusion

The challenges we face may be new, but the wisdom we need to face them is timeless. By combining ancient philosophical insights with modern understanding, we can navigate the complexities of contemporary life with greater clarity and purpose.

The unexamined life, as Socrates said, is not worth living. In our modern world, perhaps it''s also the most stressful.',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=800&fit=crop',
  (SELECT id FROM profiles WHERE role = 'admin' LIMIT 1),
  'published',
  true,
  7,
  NOW() - INTERVAL '2 days'
);

-- Verify the posts were created
SELECT id, title, slug, status, is_featured, published_at 
FROM posts 
ORDER BY published_at DESC;
