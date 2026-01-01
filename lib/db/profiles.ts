import { createClient } from '@/lib/supabase/server'
import { Profile } from '@/types'

/**
 * Get user profile
 */
export async function getProfile(userId: string) {
    const supabase = await createClient()

    const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()

    if (error) {
        console.error('Error fetching profile:', error)
        return null
    }

    return data as Profile
}

/**
 * Update user profile
 */
export async function updateProfile(userId: string, updates: Partial<{
    full_name: string
    avatar_url: string
    bio: string
}>) {
    const supabase = await createClient()

    const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', userId)
        .select()
        .single()

    if (error) {
        console.error('Error updating profile:', error)
        throw error
    }

    return data as Profile
}

/**
 * Get current user profile
 */
export async function getCurrentUserProfile() {
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return null
    }

    return await getProfile(user.id)
}
