"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import Image from "next/image";
import Link from "next/link";
import { Plus, Edit, Trash2, Users } from "lucide-react";
import AuthorForm from "@/components/dashboard/author-form";
import toast from "react-hot-toast";

export default function AuthorsPage() {
    const [authors, setAuthors] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingAuthor, setEditingAuthor] = useState<any>(null);
    const supabase = createClient();

    const fetchAuthors = async () => {
        try {
            const { data, error } = await supabase
                .from("profiles")
                .select("*")
                .order("full_name");

            if (error) throw error;
            setAuthors(data || []);
        } catch (error) {
            console.error("Error fetching authors:", error);
            toast.error("Failed to load authors");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAuthors();
    }, []);

    const handleEdit = (author: any) => {
        setEditingAuthor(author);
        setShowForm(true);
    };

    const handleDelete = async (authorId: string) => {
        if (!confirm("Are you sure you want to delete this author? This cannot be undone.")) {
            return;
        }

        try {
            const { error } = await supabase
                .from("profiles")
                .delete()
                .eq("id", authorId);

            if (error) throw error;

            toast.success("Author deleted successfully");
            fetchAuthors();
        } catch (error: any) {
            toast.error(error.message || "Failed to delete author");
        }
    };

    const handleFormSuccess = () => {
        setShowForm(false);
        setEditingAuthor(null);
        fetchAuthors();
    };

    const handleFormCancel = () => {
        setShowForm(false);
        setEditingAuthor(null);
    };

    return (
        <div className="space-y-6 md:space-y-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-3xl md:text-4xl font-serif font-bold text-black">Authors</h1>
                    <p className="text-gray-600 mt-2">Manage blog contributors</p>
                </div>
                <Link
                    href="/dashboard/authors/new"
                    className="flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-black text-white font-semibold hover:bg-gray-800 transition-all duration-300 w-full sm:w-auto"
                >
                    <Plus className="w-5 h-5" />
                    <span>New Author</span>
                </Link>
            </div>

            {/* Authors Grid */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
                {loading ? (
                    <div className="p-12 text-center text-gray-600">Loading authors...</div>
                ) : authors.length > 0 ? (
                    <div className="divide-y divide-gray-100">
                        {authors.map((author) => (
                            <div
                                key={author.id}
                                className="p-6 hover:bg-gray-50 transition-colors"
                            >
                                <div className="flex items-start gap-6">
                                    {/* Avatar */}
                                    <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-gray-200">
                                        <Image
                                            src={author.avatar_url || "/images/author-avatar.png"}
                                            alt={author.full_name || "Author"}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>

                                    {/* Info */}
                                    <div className="flex-1">
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <h3 className="text-xl font-serif font-bold text-black mb-1">
                                                    {author.full_name || "Unnamed Author"}
                                                </h3>
                                                <p className="text-sm text-gray-600 mb-2">{author.email}</p>
                                                {author.bio && (
                                                    <p className="text-gray-700 leading-relaxed max-w-2xl">
                                                        {author.bio}
                                                    </p>
                                                )}
                                                <div className="mt-3 flex items-center gap-3">
                                                    <span
                                                        className={`px-3 py-1 rounded-full text-xs font-medium ${author.role === "admin"
                                                            ? "bg-purple-100 text-purple-700"
                                                            : "bg-gray-100 text-gray-700"
                                                            }`}
                                                    >
                                                        {author.role === "admin" ? "Admin" : "Author"}
                                                    </span>
                                                    <span className="text-sm text-gray-500">
                                                        Joined {new Date(author.created_at).toLocaleDateString()}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Actions */}
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => handleEdit(author)}
                                                    className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                                                    title="Edit author"
                                                >
                                                    <Edit className="w-4 h-4" />
                                                </button>
                                                {author.role !== "admin" && (
                                                    <button
                                                        onClick={() => handleDelete(author.id)}
                                                        className="p-2 hover:bg-red-100 text-red-600 rounded-lg transition-colors"
                                                        title="Delete author"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="p-12 text-center">
                        <Users className="w-12 h-12 mx-auto text-gray-300 mb-4" />
                        <p className="text-gray-600 mb-4">No authors yet</p>
                        <button
                            onClick={() => setShowForm(true)}
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-black text-white font-semibold hover:bg-gray-800 transition-all duration-300"
                        >
                            <Plus className="w-5 h-5" />
                            <span>Add your first author</span>
                        </button>
                    </div>
                )}
            </div>

            {/* Author Form Modal */}
            {showForm && (
                <AuthorForm
                    onSuccess={handleFormSuccess}
                    onCancel={handleFormCancel}
                    initialData={editingAuthor}
                />
            )}
        </div>
    );
}
