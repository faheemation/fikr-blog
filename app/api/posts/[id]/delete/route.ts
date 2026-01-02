import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const supabase = await createClient();
        const { id } = await params;

        // Check authentication
        const {
            data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Get user profile to check if admin
        const { data: profile } = await supabase
            .from("profiles")
            .select("role")
            .eq("id", user.id)
            .single();

        // Verify post exists
        const { data: existingPost } = await supabase
            .from("posts")
            .select("id, author_id")
            .eq("id", id)
            .single();

        if (!existingPost) {
            return NextResponse.json(
                { error: "Post not found" },
                { status: 404 }
            );
        }

        // Check permissions: user owns post OR user is admin
        const isOwner = existingPost.author_id === user.id;
        const isAdmin = profile?.role === "admin";

        if (!isOwner && !isAdmin) {
            return NextResponse.json(
                { error: "You can only delete your own posts" },
                { status: 403 }
            );
        }

        // Delete post
        const { error } = await supabase
            .from("posts")
            .delete()
            .eq("id", id);

        if (error) {
            console.error("Error deleting post:", error);
            return NextResponse.json(
                { error: "Failed to delete post" },
                { status: 500 }
            );
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error in delete post API:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
