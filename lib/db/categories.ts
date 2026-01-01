import { createClient } from "@/lib/supabase/server";

export async function getPostsByCategory(categorySlug: string, page = 1, limit = 12) {
    const supabase = await createClient();
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    const { data, error, count } = await supabase
        .from("posts")
        .select(
            `
            *,
            author:profiles!posts_author_id_fkey(id, full_name, avatar_url, bio, role),
            category:categories!inner(id, name, slug, color, icon),
            tags:post_tags(tag_id, tags(id, name, slug, color))
        `,
            { count: "exact" }
        )
        .eq("status", "published")
        .eq("category.slug", categorySlug)
        .order("published_at", { ascending: false })
        .range(from, to);

    if (error) {
        console.error("Error fetching posts by category:", error);
        return { posts: [], total: 0, category: null };
    }

    const posts = data.map((post: any) => ({
        ...post,
        tags: post.tags?.map((pt: any) => pt.tags).filter(Boolean) || [],
    }));

    const category = posts[0]?.category || null;

    return { posts, total: count || 0, category };
}

export async function getPostsByTag(tagSlug: string, page = 1, limit = 12) {
    const supabase = await createClient();
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    const { data, error, count } = await supabase
        .from("posts")
        .select(
            `
            *,
            author:profiles!posts_author_id_fkey(id, full_name, avatar_url, bio, role),
            category:categories(id, name, slug, color, icon),
            tags:post_tags!inner(tag_id, tags!inner(id, name, slug, color))
        `,
            { count: "exact" }
        )
        .eq("status", "published")
        .eq("tags.slug", tagSlug)
        .order("published_at", { ascending: false })
        .range(from, to);

    if (error) {
        console.error("Error fetching posts by tag:", error);
        return { posts: [], total: 0, tag: null };
    }

    const posts = data.map((post: any) => ({
        ...post,
        tags: post.tags?.map((pt: any) => pt.tags).filter(Boolean) || [],
    }));

    // Get tag info from first post
    const tag = posts[0]?.tags?.find((t: any) => t.slug === tagSlug) || null;

    return { posts, total: count || 0, tag };
}

export async function getAllCategories() {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("categories")
        .select("*")
        .order("name");

    if (error) {
        console.error("Error fetching categories:", error);
        return [];
    }

    return data;
}

export async function getAllTags() {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("tags")
        .select("*")
        .order("post_count", { ascending: false });

    if (error) {
        console.error("Error fetching tags:", error);
        return [];
    }

    return data;
}
