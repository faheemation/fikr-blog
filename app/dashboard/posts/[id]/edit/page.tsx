import { createClient } from "@/lib/supabase/server";
import { notFound, redirect } from "next/navigation";
import PostEditor from "@/components/dashboard/post-editor";

interface EditPostPageProps {
    params: Promise<{ id: string }>;
}

export default async function EditPostPage({ params }: EditPostPageProps) {
    const { id } = await params;
    const supabase = await createClient();

    // Check authentication
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login");
    }

    // Fetch the post
    const { data: post, error } = await supabase
        .from("posts")
        .select("*")
        .eq("id", id)
        .single();

    if (error || !post) {
        notFound();
    }

    // Check if user has permission to edit
    const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

    const isAdmin = profile?.role === "admin";
    const isAuthor = post.author_id === user.id;

    if (!isAdmin && !isAuthor) {
        redirect("/dashboard");
    }

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-4xl font-serif font-bold text-black">Edit Post</h1>
                <p className="text-gray-600 mt-2">Update your blog post</p>
            </div>

            <PostEditor initialData={post} />
        </div>
    );
}
