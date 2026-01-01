"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import Image from "next/image";
import toast from "react-hot-toast";
import { MessageCircle, Edit2, Trash2, MoreVertical } from "lucide-react";
import CommentForm from "./comment-form";

interface CommentProps {
    comment: any;
    postId: string;
    currentUserId?: string;
    isAdmin?: boolean;
    onUpdate: () => void;
    depth?: number;
}

export default function Comment({
    comment,
    postId,
    currentUserId,
    isAdmin,
    onUpdate,
    depth = 0,
}: CommentProps) {
    const [showReplyForm, setShowReplyForm] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const supabase = createClient();

    const isOwner = currentUserId === comment.user_id;
    const canDelete = isOwner || isAdmin;
    const canEdit = isOwner;

    // Format timestamp
    const getTimeAgo = (date: string) => {
        const seconds = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000);

        if (seconds < 60) return "just now";
        if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
        if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
        if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
        return new Date(date).toLocaleDateString();
    };

    const handleDelete = async () => {
        if (!confirm("Delete this comment? This will also delete all replies.")) {
            return;
        }

        setDeleting(true);

        try {
            const response = await fetch(`/api/comments/${comment.id}/delete`, {
                method: "DELETE",
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error || "Failed to delete comment");
            }

            toast.success("Comment deleted");
            onUpdate();
        } catch (error: any) {
            toast.error(error.message || "Failed to delete comment");
        } finally {
            setDeleting(false);
        }
    };

    const wasEdited = comment.updated_at && comment.updated_at !== comment.created_at;

    return (
        <div className={`${depth > 0 ? "ml-8 md:ml-12" : ""}`}>
            <div className={`${depth > 0 ? "border-l-2 border-gray-200 pl-4" : ""}`}>
                <div className="flex gap-3">
                    {/* Avatar */}
                    <div className="flex-shrink-0">
                        <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gray-200">
                            {comment.user?.avatar_url ? (
                                <Image
                                    src={comment.user.avatar_url}
                                    alt={comment.user.full_name || "User"}
                                    fill
                                    className="object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-black text-white font-semibold">
                                    {(comment.user?.full_name || "U")[0].toUpperCase()}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                        {/* Header */}
                        <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold text-black">
                                {comment.user?.full_name || "Anonymous"}
                            </span>
                            {isAdmin && comment.user?.role === "admin" && (
                                <span className="px-2 py-0.5 rounded-full bg-black text-white text-xs font-medium">
                                    Admin
                                </span>
                            )}
                            <span className="text-sm text-gray-500">
                                {getTimeAgo(comment.created_at)}
                            </span>
                            {wasEdited && (
                                <span className="text-xs text-gray-400">(edited)</span>
                            )}
                        </div>

                        {/* Comment Text or Edit Form */}
                        {isEditing ? (
                            <div className="mt-2">
                                <CommentForm
                                    postId={postId}
                                    initialContent={comment.content}
                                    isEdit
                                    commentId={comment.id}
                                    onSuccess={() => {
                                        setIsEditing(false);
                                        onUpdate();
                                    }}
                                    onCancel={() => setIsEditing(false)}
                                    placeholder="Edit your comment..."
                                />
                            </div>
                        ) : (
                            <>
                                <p className="text-gray-800 whitespace-pre-wrap break-words">
                                    {comment.content}
                                </p>

                                {/* Actions */}
                                <div className="flex items-center gap-4 mt-2">
                                    <button
                                        onClick={() => setShowReplyForm(!showReplyForm)}
                                        className="flex items-center gap-1 text-sm text-gray-600 hover:text-black transition-colors"
                                    >
                                        <MessageCircle className="w-4 h-4" />
                                        Reply
                                    </button>

                                    {canEdit && (
                                        <button
                                            onClick={() => setIsEditing(true)}
                                            className="flex items-center gap-1 text-sm text-gray-600 hover:text-black transition-colors"
                                        >
                                            <Edit2 className="w-4 h-4" />
                                            Edit
                                        </button>
                                    )}

                                    {canDelete && (
                                        <button
                                            onClick={handleDelete}
                                            disabled={deleting}
                                            className="flex items-center gap-1 text-sm text-red-600 hover:text-red-700 transition-colors disabled:opacity-50"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                            {deleting ? "Deleting..." : "Delete"}
                                        </button>
                                    )}
                                </div>
                            </>
                        )}

                        {/* Reply Form */}
                        {showReplyForm && !isEditing && (
                            <div className="mt-3">
                                <CommentForm
                                    postId={postId}
                                    parentCommentId={comment.id}
                                    onSuccess={() => {
                                        setShowReplyForm(false);
                                        onUpdate();
                                    }}
                                    onCancel={() => setShowReplyForm(false)}
                                    placeholder="Write a reply..."
                                />
                            </div>
                        )}
                    </div>
                </div>

                {/* Nested Replies */}
                {comment.replies && comment.replies.length > 0 && (
                    <div className="mt-4 space-y-4">
                        {comment.replies.map((reply: any) => (
                            <Comment
                                key={reply.id}
                                comment={reply}
                                postId={postId}
                                currentUserId={currentUserId}
                                isAdmin={isAdmin}
                                onUpdate={onUpdate}
                                depth={depth + 1}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
