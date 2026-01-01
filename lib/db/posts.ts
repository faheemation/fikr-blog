import { createClient } from '@/lib/supabase/server'
import { PostWithAuthor } from '@/types'

/**
 * Get all published posts with pagination
 */
export async function getPosts(page = 1, limit = 10) {
    const supabase = await createClient()
    const from = (page - 1) * limit
    const to = from + limit - 1

    const { data, error, count } = await supabase
        .from("posts")
        .select(
            `
            *,
            author:profiles!posts_author_id_fkey(id, full_name, avatar_url, bio, role),
            category:categories(id, name, slug, color, icon),
            tags:post_tags(tag_id, tags(id, name, slug, color))
        `,
            { count: "exact" }
        )
        .eq("status", "published")
        .order("published_at", { ascending: false })
        .range((page - 1) * limit, page * limit - 1)
    if (error) {
        console.error('Error fetching posts:', error)
        return { posts: [], total: 0 }
    }

    const posts: PostWithAuthor[] = data.map((post: any) => ({
        ...post,
        tags: post.tags?.map((pt: any) => pt.tags).filter(Boolean) || [],
        likes_count: post.likes?.[0]?.count || 0,
        comments_count: post.comments?.[0]?.count || 0,
    }))

    return { posts, total: count || 0 }
}

/**
 * Get a single post by slug
 */
export async function getPostBySlug(slug: string) {
    const supabase = await createClient()

    const { data, error } = await supabase
        .from("posts")
        .select(
            `
            *,
            author:profiles!posts_author_id_fkey(id, full_name, avatar_url, bio, role),
            category:categories(id, name, slug, color, icon),
            tags:post_tags(tag_id, tags(id, name, slug, color))
        `
        )
        .eq("slug", slug)
        .eq("status", "published")
        .single()

    if (error) {
        console.error('Error fetching post:', error)
        return null
    }

    const post: PostWithAuthor = {
        ...data,
        tags: data.tags?.map((pt: any) => pt.tags).filter(Boolean) || [],
        likes_count: data.likes?.[0]?.count || 0,
        comments_count: data.comments?.[0]?.count || 0,
    }

    return post
}

/**
 * Get featured posts for carousel
 */
export async function getFeaturedPosts(limit = 3) {
    const supabase = await createClient()

    const { data, error } = await supabase
        .from('posts')
        .select(`
      *,
      author:profiles(*)
    `)
        .eq('status', 'published')
        .eq('is_featured', true)
        .order('published_at', { ascending: false })
        .limit(limit)

    if (error) {
        console.error('Error fetching featured posts:', error)
        return []
    }

    return data as PostWithAuthor[]
}

/**
 * Create a new post (admin/writer only)
 */
export async function createPost(post: {
    title: string
    slug: string
    excerpt?: string
    content: string
    featured_image?: string
    author_id: string
    status?: 'draft' | 'review' | 'published'
    is_featured?: boolean
    reading_time?: number
}) {
    const supabase = await createClient()

    const { data, error } = await supabase
        .from('posts')
        .insert([post])
        .select()
        .single()

    if (error) {
        console.error('Error creating post:', error)
        throw error
    }

    return data
}

/**
 * Update a post
 */
export async function updatePost(id: string, updates: Partial<{
    title: string
    slug: string
    excerpt: string
    content: string
    featured_image: string
    status: 'draft' | 'review' | 'published'
    is_featured: boolean
    reading_time: number
    published_at: string
}>) {
    const supabase = await createClient()

    const { data, error } = await supabase
        .from('posts')
        .update(updates)
        .eq('id', id)
        .select()
        .single()

    if (error) {
        console.error('Error updating post:', error)
        throw error
    }

    return data
}

/**
 * Delete a post
 */
export async function deletePost(id: string) {
    const supabase = await createClient()

    const { error } = await supabase
        .from('posts')
        .delete()
        .eq('id', id)

    if (error) {
        console.error('Error deleting post:', error)
        throw error
    }

    return true
}

/**
 * Increment post views
 */
export async function incrementViews(postId: string) {
    const supabase = await createClient()

    const { error } = await supabase.rpc('increment_post_views', {
        post_id_param: postId
    })

    if (error) {
        console.error('Error incrementing views:', error)
    }
}
