import { createClient } from '@/lib/supabase/server'

/**
 * Toggle like on a post
 */
export async function toggleLike(postId: string, userId: string) {
    const supabase = await createClient()

    // Check if already liked
    const { data: existingLike } = await supabase
        .from('likes')
        .select('id')
        .eq('post_id', postId)
        .eq('user_id', userId)
        .single()

    if (existingLike) {
        // Unlike
        const { error } = await supabase
            .from('likes')
            .delete()
            .eq('id', existingLike.id)

        if (error) {
            console.error('Error unliking post:', error)
            throw error
        }

        return { liked: false }
    } else {
        // Like
        const { error } = await supabase
            .from('likes')
            .insert([{ post_id: postId, user_id: userId }])

        if (error) {
            console.error('Error liking post:', error)
            throw error
        }

        return { liked: true }
    }
}

/**
 * Get like count for a post
 */
export async function getLikeCount(postId: string) {
    const supabase = await createClient()

    const { count, error } = await supabase
        .from('likes')
        .select('*', { count: 'exact', head: true })
        .eq('post_id', postId)

    if (error) {
        console.error('Error getting like count:', error)
        return 0
    }

    return count || 0
}

/**
 * Check if user has liked a post
 */
export async function hasUserLiked(postId: string, userId: string) {
    const supabase = await createClient()

    const { data, error } = await supabase
        .from('likes')
        .select('id')
        .eq('post_id', postId)
        .eq('user_id', userId)
        .single()

    if (error && error.code !== 'PGRST116') {
        console.error('Error checking like status:', error)
        return false
    }

    return !!data
}
