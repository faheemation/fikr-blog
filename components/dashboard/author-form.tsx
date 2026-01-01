"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import toast from "react-hot-toast";
import { User, Mail, FileText, X } from "lucide-react";
import ImageUpload from "@/components/image-upload";

interface AuthorFormProps {
    onSuccess: () => void;
    onCancel: () => void;
    initialData?: {
        id: string;
        full_name: string;
        email: string;
        bio: string;
        avatar_url: string | null;
    };
}

export default function AuthorForm({ onSuccess, onCancel, initialData }: AuthorFormProps) {
    const [fullName, setFullName] = useState(initialData?.full_name || "");
    const [email, setEmail] = useState(initialData?.email || "");
    const [bio, setBio] = useState(initialData?.bio || "");
    const [avatarUrl, setAvatarUrl] = useState(initialData?.avatar_url || "");
    const [loading, setLoading] = useState(false);
    const supabase = createClient();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (initialData) {
                // Update existing author
                const { error } = await supabase
                    .from("profiles")
                    .update({
                        full_name: fullName,
                        bio,
                        avatar_url: avatarUrl || null,
                    })
                    .eq("id", initialData.id);

                if (error) throw error;
                toast.success("Author updated successfully!");
            } else {
                // For new authors, call the API route
                const response = await fetch("/api/authors/create", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        email,
                        full_name: fullName,
                        bio,
                        avatar_url: avatarUrl || null,
                    }),
                });

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.error || "Failed to create author");
                }

                toast.success("Author added successfully!");
            }

            onSuccess();
        } catch (error: any) {
            toast.error(error.message || "Failed to save author");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-8">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-serif font-bold text-black">
                            {initialData ? "Edit Author" : "Add New Author"}
                        </h2>
                        <button
                            onClick={onCancel}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Full Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                <div className="flex items-center gap-2">
                                    <User className="w-4 h-4" />
                                    Full Name *
                                </div>
                            </label>
                            <input
                                type="text"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                required
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                                placeholder="Ahmed Khan"
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                <div className="flex items-center gap-2">
                                    <Mail className="w-4 h-4" />
                                    Email *
                                </div>
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                disabled={!!initialData}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
                                placeholder="ahmed@fikr.blog"
                            />
                            {initialData && (
                                <p className="text-sm text-gray-500 mt-1">
                                    Email cannot be changed
                                </p>
                            )}
                        </div>

                        {/* Bio */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                <div className="flex items-center gap-2">
                                    <FileText className="w-4 h-4" />
                                    Bio & Designation
                                </div>
                            </label>
                            <textarea
                                value={bio}
                                onChange={(e) => setBio(e.target.value)}
                                rows={4}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent transition-all resize-none"
                                placeholder="Technology Writer | Exploring AI and Ethics"
                            />
                            <p className="text-sm text-gray-500 mt-1">
                                This will appear on their author bio in blog posts
                            </p>
                        </div>

                        {/* Avatar - NOW WITH DRAG & DROP! */}
                        <ImageUpload
                            label="Profile Picture"
                            value={avatarUrl}
                            onChange={setAvatarUrl}
                            onRemove={() => setAvatarUrl("")}
                            folder="fikr-blog/avatars"
                        />

                        {/* Buttons */}
                        <div className="flex items-center gap-3 pt-4">
                            <button
                                type="button"
                                onClick={onCancel}
                                className="flex-1 px-6 py-3 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors font-medium"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className="flex-1 px-6 py-3 rounded-lg bg-black text-white hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all font-medium"
                            >
                                {loading ? "Saving..." : initialData ? "Update Author" : "Add Author"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
