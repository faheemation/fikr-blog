import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const supabase = await createClient();

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

        // Verify comment exists
        const { data: existingComment } = await supabase
            .from("comments")
            .select("id, user_id")
            .eq("id", params.id)
            .single();

        if (!existingComment) {
            return NextResponse.json(
                { error: "Comment not found" },
                { status: 404 }
            );
        }

        // Check permissions: user owns comment OR user is admin
        const isOwner = existingComment.user_id === user.id;
        const isAdmin = profile?.role === "admin";

        if (!isOwner && !isAdmin) {
            return NextResponse.json(
                { error: "You can only delete your own comments" },
                { status: 403 }
            );
        }

        // Delete comment (cascades to replies due to ON DELETE CASCADE)
        const { error } = await supabase
            .from("comments")
            .delete()
            .eq("id", params.id);

        if (error) {
            console.error("Error deleting comment:", error);
            return NextResponse.json(
                { error: "Failed to delete comment" },
                { status: 500 }
            );
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error in delete comment API:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
