export interface Database {
    public: {
        Tables: {
            profiles: {
                Row: {
                    id: string
                    email: string
                    full_name: string | null
                    avatar_url: string | null
                    bio: string | null
                    role: 'user' | 'writer' | 'admin'
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id: string
                    email: string
                    full_name?: string | null
                    avatar_url?: string | null
                    bio?: string | null
                    role?: 'user' | 'writer' | 'admin'
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    email?: string
                    full_name?: string | null
                    avatar_url?: string | null
                    bio?: string | null
                    role?: 'user' | 'writer' | 'admin'
                    created_at?: string
                    updated_at?: string
                }
            }
            posts: {
                Row: {
                    id: string
                    title: string
                    slug: string
                    excerpt: string | null
                    content: string
                    featured_image: string | null
                    author_id: string
                    status: 'draft' | 'review' | 'published'
                    is_featured: boolean
                    reading_time: number | null
                    views: number
                    published_at: string | null
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id?: string
                    title: string
                    slug: string
                    excerpt?: string | null
                    content: string
                    featured_image?: string | null
                    author_id: string
                    status?: 'draft' | 'review' | 'published'
                    is_featured?: boolean
                    reading_time?: number | null
                    views?: number
                    published_at?: string | null
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    title?: string
                    slug?: string
                    excerpt?: string | null
                    content?: string
                    featured_image?: string | null
                    author_id?: string
                    status?: 'draft' | 'review' | 'published'
                    is_featured?: boolean
                    reading_time?: number | null
                    views?: number
                    published_at?: string | null
                    created_at?: string
                    updated_at?: string
                }
            }
            comments: {
                Row: {
                    id: string
                    post_id: string
                    user_id: string
                    parent_id: string | null
                    content: string
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id?: string
                    post_id: string
                    user_id: string
                    parent_id?: string | null
                    content: string
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    post_id?: string
                    user_id?: string
                    parent_id?: string | null
                    content?: string
                    created_at?: string
                    updated_at?: string
                }
            }
            likes: {
                Row: {
                    id: string
                    post_id: string
                    user_id: string
                    created_at: string
                }
                Insert: {
                    id?: string
                    post_id: string
                    user_id: string
                    created_at?: string
                }
                Update: {
                    id?: string
                    post_id?: string
                    user_id?: string
                    created_at?: string
                }
            }
            works: {
                Row: {
                    id: string
                    title: string
                    slug: string
                    description: string | null
                    content: string | null
                    featured_image: string | null
                    category: string | null
                    tags: string[] | null
                    project_url: string | null
                    github_url: string | null
                    order_index: number
                    is_featured: boolean
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id?: string
                    title: string
                    slug: string
                    description?: string | null
                    content?: string | null
                    featured_image?: string | null
                    category?: string | null
                    tags?: string[] | null
                    project_url?: string | null
                    github_url?: string | null
                    order_index?: number
                    is_featured?: boolean
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    title?: string
                    slug?: string
                    description?: string | null
                    content?: string | null
                    featured_image?: string | null
                    category?: string | null
                    tags?: string[] | null
                    project_url?: string | null
                    github_url?: string | null
                    order_index?: number
                    is_featured?: boolean
                    created_at?: string
                    updated_at?: string
                }
            }
            post_views: {
                Row: {
                    id: string
                    post_id: string
                    user_id: string | null
                    ip_address: string | null
                    user_agent: string | null
                    created_at: string
                }
                Insert: {
                    id?: string
                    post_id: string
                    user_id?: string | null
                    ip_address?: string | null
                    user_agent?: string | null
                    created_at?: string
                }
                Update: {
                    id?: string
                    post_id?: string
                    user_id?: string | null
                    ip_address?: string | null
                    user_agent?: string | null
                    created_at?: string
                }
            }
        }
    }
}
