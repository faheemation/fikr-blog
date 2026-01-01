import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function PATCH(
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

        const body = await request.json();
        const { content } = body;

        // Validate content
        if (!content || content.trim().length === 0) {
            return NextResponse.json(
                { error: "Comment cannot be empty" },
                { status: 400 }
            );
        }

        if (content.length > 2000) {
            return NextResponse.json(
                { error: "Comment too long (max 2000 characters)" },
                { status: 400 }
            );
        }

        // Verify comment exists and user owns it
        const { data: existingComment } = await supabase
            .from("comments")
            .select("id, user_id")
            .eq("id", id)
            .single();

        if (!existingComment) {
            return NextResponse.json(
                { error: "Comment not found" },
                { status: 404 }
            );
        }

        if (existingComment.user_id !== user.id) {
            return NextResponse.json(
                { error: "You can only edit your own comments" },
                { status: 403 }
            );
        }

        // Update comment
        const { data: comment, error } = await supabase
            .from("comments")
            .update({ content: content.trim() })
            .eq("id", params.id)
            .select(
                `
        *,
        user:profiles(id, full_name, avatar_url)
      `
            )
            .single();

        if (error) {
            console.error("Error updating comment:", error);
            return NextResponse.json(
                { error: "Failed to update comment" },
                { status: 500 }
            );
        }

        return NextResponse.json({ comment });
    } catch (error) {
        console.error("Error in update comment API:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
