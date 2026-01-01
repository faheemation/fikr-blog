"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import toast from "react-hot-toast";
import { Send } from "lucide-react";

interface CommentFormProps {
    postId: string;
    onCommentAdded: () => void;
}

export default function CommentForm({ postId, onCommentAdded }: CommentFormProps) {
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);
    const supabase = createClient();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const {
                data: { user },
            } = await supabase.auth.getUser();

            if (!user) {
                toast.error("Please login to comment");
                return;
            }

            const { error } = await supabase.from("comments").insert([
                {
                    post_id: postId,
                    user_id: user.id,
                    content,
                },
            ]);

            if (error) throw error;

            toast.success("Comment added!");
            setContent("");
            onCommentAdded();
        } catch (error: any) {
            toast.error(error.message || "Failed to add comment");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                rows={3}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent transition-all resize-none"
                placeholder="Share your thoughts..."
            />
            <button
                type="submit"
                disabled={loading || !content.trim()}
                className="px-6 py-2 rounded-full bg-black text-white font-semibold hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-300 flex items-center gap-2"
            >
                <Send className="w-4 h-4" />
                {loading ? "Posting..." : "Post Comment"}
            </button>
        </form>
    );
}
