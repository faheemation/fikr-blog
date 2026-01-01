import { createClient } from '@/lib/supabase/server'
import { CommentWithUser } from '@/types'

/**
 * Get comments for a post
 */
export async function getComments(postId: string) {
    const supabase = await createClient()

    const { data, error } = await supabase
        .from('comments')
        .select(`
      *,
      user:profiles(*)
    `)
        .eq('post_id', postId)
        .is('parent_id', null)
        .order('created_at', { ascending: false })

    if (error) {
        console.error('Error fetching comments:', error)
        return []
    }

    // Fetch replies for each comment
    const commentsWithReplies = await Promise.all(
        data.map(async (comment) => {
            const replies = await getReplies(comment.id)
            return {
                ...comment,
                replies,
            } as CommentWithUser
        })
    )

    return commentsWithReplies
}

/**
 * Get replies for a comment
 */
async function getReplies(parentId: string) {
    const supabase = await createClient()

    const { data, error } = await supabase
        .from('comments')
        .select(`
      *,
      user:profiles(*)
    `)
        .eq('parent_id', parentId)
        .order('created_at', { ascending: true })

    if (error) {
        console.error('Error fetching replies:', error)
        return []
    }

    return data as CommentWithUser[]
}

/**
 * Create a new comment
 */
export async function createComment(comment: {
    post_id: string
    user_id: string
    content: string
    parent_id?: string
}) {
    const supabase = await createClient()

    const { data, error } = await supabase
        .from('comments')
        .insert([comment])
        .select(`
      *,
      user:profiles(*)
    `)
        .single()

    if (error) {
        console.error('Error creating comment:', error)
        throw error
    }

    return data as CommentWithUser
}

/**
 * Delete a comment
 */
export async function deleteComment(id: string) {
    const supabase = await createClient()

    const { error } = await supabase
        .from('comments')
        .delete()
        .eq('id', id)

    if (error) {
        console.error('Error deleting comment:', error)
        throw error
    }

    return true
}
