"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import Comment from "./comment";
import CommentForm from "./comment-form";
import { MessageCircle, LogIn } from "lucide-react";
import Link from "next/link";

interface CommentsSectionProps {
    postId: string;
}

export default function CommentsSection({ postId }: CommentsSectionProps) {
    const [comments, setComments] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<any>(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const supabase = createClient();
    const router = useRouter();

    useEffect(() => {
        loadUser();
        loadComments();
    }, [postId]);

    const loadUser = async () => {
        const {
            data: { user },
        } = await supabase.auth.getUser();

        if (user) {
            setUser(user);

            // Check if admin
            const { data: profile } = await supabase
                .from("profiles")
                .select("role")
                .eq("id", user.id)
                .single();

            setIsAdmin(profile?.role === "admin");
        }
    };

    const loadComments = async () => {
        setLoading(true);

        try {
            // Fetch all comments for this post
            const { data, error } = await supabase
                .from("comments")
                .select(
                    `
          *,
          user:profiles(id, full_name, avatar_url, role)
        `
                )
                .eq("post_id", postId)
                .order("created_at", { ascending: true });

            if (error) throw error;

            // Organize into threaded structure
            const threaded = organizeComments(data || []);
            setComments(threaded);
        } catch (error) {
            console.error("Error loading comments:", error);
        } finally {
            setLoading(false);
        }
    };

    // Organize flat comments into threaded structure
    const organizeComments = (flatComments: any[]) => {
        const commentMap = new Map();
        const rootComments: any[] = [];

        // First pass: create map of all comments
        flatComments.forEach((comment) => {
            commentMap.set(comment.id, { ...comment, replies: [] });
        });

        // Second pass: organize into tree
        flatComments.forEach((comment) => {
            const commentWithReplies = commentMap.get(comment.id);

            if (comment.parent_comment_id) {
                // This is a reply
                const parent = commentMap.get(comment.parent_comment_id);
                if (parent) {
                    parent.replies.push(commentWithReplies);
                }
            } else {
                // This is a root comment
                rootComments.push(commentWithReplies);
            }
        });

        return rootComments;
    };

    const handleCommentUpdate = () => {
        loadComments();
        router.refresh();
    };

    const totalComments = comments.reduce((count, comment) => {
        return count + 1 + (comment.replies?.length || 0);
    }, 0);

    return (
        <div className="mt-16 pt-16 border-t border-gray-200">
            {/* Header */}
            <div className="flex items-center gap-3 mb-8">
                <MessageCircle className="w-6 h-6" />
                <h2 className="text-3xl font-serif font-bold text-black">
                    Comments ({totalComments})
                </h2>
            </div>

            {/* Comment Form or Login Prompt */}
            {user ? (
                <div className="mb-8">
                    <CommentForm postId={postId} onSuccess={handleCommentUpdate} />
                </div>
            ) : (
                <div className="mb-8 p-6 bg-gray-50 rounded-lg border border-gray-200 text-center">
                    <p className="text-gray-600 mb-4">Please login to join the conversation</p>
                    <Link
                        href="/login"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-black text-white font-semibold hover:bg-gray-800 transition-all"
                    >
                        <LogIn className="w-4 h-4" />
                        Sign In to Comment
                    </Link>
                </div>
            )}

            {/* Comments List */}
            {loading ? (
                <div className="text-center py-12">
                    <p className="text-gray-600">Loading comments...</p>
                </div>
            ) : comments.length === 0 ? (
                <div className="text-center py-12">
                    <MessageCircle className="w-12 h-12 mx-auto text-gray-300 mb-4" />
                    <p className="text-gray-600">No comments yet. Be the first to comment!</p>
                </div>
            ) : (
                <div className="space-y-6">
                    {comments.map((comment) => (
                        <Comment
                            key={comment.id}
                            comment={comment}
                            postId={postId}
                            currentUserId={user?.id}
                            isAdmin={isAdmin}
                            onUpdate={handleCommentUpdate}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
