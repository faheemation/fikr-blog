import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const supabase = await createClient();

        // Check authentication
        const {
            data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await request.json();
        const { post_id, content, parent_comment_id } = body;

        // Validate required fields
        if (!post_id || !content) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        // Validate content length
        if (content.trim().length === 0) {
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

        // Verify post exists and is published
        const { data: post } = await supabase
            .from("posts")
            .select("id, status")
            .eq("id", post_id)
            .single();

        if (!post || post.status !== "published") {
            return NextResponse.json({ error: "Post not found" }, { status: 404 });
        }

        // If replying, verify parent comment exists
        if (parent_comment_id) {
            const { data: parentComment } = await supabase
                .from("comments")
                .select("id")
                .eq("id", parent_comment_id)
                .single();

            if (!parentComment) {
                return NextResponse.json(
                    { error: "Parent comment not found" },
                    { status: 404 }
                );
            }
        }

        // Create comment
        const { data: comment, error } = await supabase
            .from("comments")
            .insert({
                post_id,
                user_id: user.id,
                content: content.trim(),
                parent_comment_id: parent_comment_id || null,
            })
            .select(
                `
        *,
        user:profiles(id, full_name, avatar_url)
      `
            )
            .single();

        if (error) {
            console.error("Error creating comment:", error);
            return NextResponse.json(
                { error: "Failed to create comment" },
                { status: 500 }
            );
        }

        return NextResponse.json({ comment }, { status: 201 });
    } catch (error) {
        console.error("Error in create comment API:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
