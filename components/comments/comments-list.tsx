"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import Image from "next/image";
import { formatDate } from "@/lib/utils";
import { MessageCircle } from "lucide-react";
import CommentForm from "./comment-form";

interface CommentsListProps {
    postId: string;
}

export default function CommentsList({ postId }: CommentsListProps) {
    const [comments, setComments] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<any>(null);
    const supabase = createClient();

    const fetchComments = async () => {
        try {
            const { data, error } = await supabase
                .from("comments")
                .select(`
          *,
          user:profiles(*)
        `)
                .eq("post_id", postId)
                .is("parent_id", null)
                .order("created_at", { ascending: false });

            if (error) throw error;
            setComments(data || []);
        } catch (error) {
            console.error("Error fetching comments:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchComments();

        // Get current user
        supabase.auth.getUser().then(({ data }) => {
            setUser(data.user);
        });
    }, [postId]);

    if (loading) {
        return <div className="text-center py-8 text-gray-600">Loading comments...</div>;
    }

    return (
        <div className="space-y-8">
            <div>
                <h3 className="text-2xl font-serif font-bold text-black mb-6">
                    Comments ({comments.length})
                </h3>

                {user ? (
                    <CommentForm postId={postId} onCommentAdded={fetchComments} />
                ) : (
                    <div className="bg-gray-50 p-6 rounded-lg text-center">
                        <p className="text-gray-600 mb-4">
                            Please <a href="/login" className="text-black font-semibold hover:underline">login</a> to comment
                        </p>
                    </div>
                )}
            </div>

            {comments.length > 0 ? (
                <div className="space-y-6">
                    {comments.map((comment) => (
                        <div key={comment.id} className="bg-gray-50 p-6 rounded-lg">
                            <div className="flex items-start gap-4">
                                <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                                    <Image
                                        src={comment.user?.avatar_url || "/images/author-avatar.png"}
                                        alt={comment.user?.full_name || "User"}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="font-semibold text-black">
                                            {comment.user?.full_name || "Anonymous"}
                                        </span>
                                        <span className="text-sm text-gray-500">
                                            {formatDate(comment.created_at)}
                                        </span>
                                    </div>
                                    <p className="text-gray-700 leading-relaxed">{comment.content}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-12">
                    <MessageCircle className="w-12 h-12 mx-auto text-gray-300 mb-4" />
                    <p className="text-gray-600">No comments yet. Be the first to comment!</p>
                </div>
            )}
        </div>
    );
}
