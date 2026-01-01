"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import toast from "react-hot-toast";
import { Send } from "lucide-react";

interface CommentFormProps {
    postId: string;
    parentCommentId?: string;
    onSuccess: () => void;
    onCancel?: () => void;
    initialContent?: string;
    isEdit?: boolean;
    commentId?: string;
    placeholder?: string;
}

export default function CommentForm({
    postId,
    parentCommentId,
    onSuccess,
    onCancel,
    initialContent = "",
    isEdit = false,
    commentId,
    placeholder = "Write a comment...",
}: CommentFormProps) {
    const [content, setContent] = useState(initialContent);
    const [loading, setLoading] = useState(false);
    const supabase = createClient();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!content.trim()) {
            toast.error("Comment cannot be empty");
            return;
        }

        if (content.length > 2000) {
            toast.error("Comment too long (max 2000 characters)");
            return;
        }

        setLoading(true);

        try {
            // Check if user is logged in
            const {
                data: { user },
            } = await supabase.auth.getUser();

            if (!user) {
                toast.error("Please login to comment");
                return;
            }

            if (isEdit && commentId) {
                // Update existing comment
                const response = await fetch(`/api/comments/${commentId}/update`, {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ content }),
                });

                if (!response.ok) {
                    const error = await response.json();
                    throw new Error(error.error || "Failed to update comment");
                }

                toast.success("Comment updated!");
            } else {
                // Create new comment
                const response = await fetch("/api/comments/create", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        post_id: postId,
                        content,
                        parent_comment_id: parentCommentId,
                    }),
                });

                if (!response.ok) {
                    const error = await response.json();
                    throw new Error(error.error || "Failed to post comment");
                }

                toast.success(parentCommentId ? "Reply posted!" : "Comment posted!");
            }

            setContent("");
            onSuccess();
        } catch (error: any) {
            toast.error(error.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-3">
            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder={placeholder}
                rows={3}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent transition-all resize-none"
                disabled={loading}
            />
            <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">
                    {content.length}/2000 characters
                </span>
                <div className="flex items-center gap-2">
                    {onCancel && (
                        <button
                            type="button"
                            onClick={onCancel}
                            disabled={loading}
                            className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors text-sm font-medium disabled:opacity-50"
                        >
                            Cancel
                        </button>
                    )}
                    <button
                        type="submit"
                        disabled={loading || !content.trim()}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-black text-white hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all text-sm font-medium"
                    >
                        <Send className="w-4 h-4" />
                        {loading ? "Posting..." : isEdit ? "Save" : parentCommentId ? "Reply" : "Comment"}
                    </button>
                </div>
            </div>
        </form>
    );
}
