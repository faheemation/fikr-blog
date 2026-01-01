import { Database } from './database.types'

export type Profile = Database['public']['Tables']['profiles']['Row']
export type Post = Database['public']['Tables']['posts']['Row']
export type Comment = Database['public']['Tables']['comments']['Row']
export type Like = Database['public']['Tables']['likes']['Row']
export type Work = Database['public']['Tables']['works']['Row']

// Extended types with relations
export type PostWithAuthor = Post & {
    author: Profile
    likes_count?: number
    comments_count?: number
}

export type CommentWithUser = Comment & {
    user: Profile
    replies?: CommentWithUser[]
}

export type PostStatus = 'draft' | 'review' | 'published'
export type UserRole = 'user' | 'writer' | 'admin'
