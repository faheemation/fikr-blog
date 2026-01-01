"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Plus, Edit2, Trash2, Hash, Palette } from "lucide-react";
import TagBadge from "@/components/tag-badge";

export default function TagsPage() {
    const [tags, setTags] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingTag, setEditingTag] = useState<any>(null);
    const supabase = createClient();
    const router = useRouter();

    // Form state
    const [name, setName] = useState("");
    const [slug, setSlug] = useState("");
    const [color, setColor] = useState("#6B7280");

    useEffect(() => {
        loadTags();
    }, []);

    const loadTags = async () => {
        try {
            const { data, error } = await supabase
                .from("tags")
                .select("*")
                .order("post_count", { ascending: false });

            if (error) throw error;
            setTags(data || []);
        } catch (error) {
            console.error("Error loading tags:", error);
            toast.error("Failed to load tags");
        } finally {
            setLoading(false);
        }
    };

    const generateSlug = (text: string) => {
        return text
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, "");
    };

    const handleNameChange = (value: string) => {
        setName(value);
        if (!editingTag) {
            setSlug(generateSlug(value));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const tagData = {
                name,
                slug,
                color,
            };

            if (editingTag) {
                const { error } = await supabase
                    .from("tags")
                    .update(tagData)
                    .eq("id", editingTag.id);

                if (error) throw error;
                toast.success("Tag updated!");
            } else {
                const { error } = await supabase
                    .from("tags")
                    .insert([tagData]);

                if (error) throw error;
                toast.success("Tag created!");
            }

            resetForm();
            loadTags();
            router.refresh();
        } catch (error: any) {
            toast.error(error.message || "Failed to save tag");
        }
    };

    const handleEdit = (tag: any) => {
        setEditingTag(tag);
        setName(tag.name);
        setSlug(tag.slug);
        setColor(tag.color);
        setShowForm(true);
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this tag? It will be removed from all posts.")) return;

        try {
            const { error } = await supabase
                .from("tags")
                .delete()
                .eq("id", id);

            if (error) throw error;
            toast.success("Tag deleted!");
            loadTags();
            router.refresh();
        } catch (error: any) {
            toast.error(error.message || "Failed to delete tag");
        }
    };

    const resetForm = () => {
        setName("");
        setSlug("");
        setColor("#6B7280");
        setEditingTag(null);
        setShowForm(false);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-gray-600">Loading tags...</p>
            </div>
        );
    }

    return (
        <div className="space-y-6 md:space-y-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-3xl md:text-4xl font-serif font-bold text-black">Tags</h1>
                    <p className="text-gray-600 mt-2">Manage keywords for your posts</p>
                </div>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-black text-white hover:bg-gray-800 transition-colors w-full sm:w-auto"
                >
                    <Plus className="w-5 h-5" />
                    New Tag
                </button>
            </div>

            {/* Form */}
            {showForm && (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6 lg:p-8">
                    <h2 className="text-2xl font-serif font-bold text-black mb-6">
                        {editingTag ? "Edit Tag" : "New Tag"}
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Name *
                                </label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => handleNameChange(e.target.value)}
                                    required
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent text-base"
                                    placeholder="AI"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Slug *
                                </label>
                                <input
                                    type="text"
                                    value={slug}
                                    onChange={(e) => setSlug(e.target.value)}
                                    required
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent text-base"
                                    placeholder="ai"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                <div className="flex items-center gap-2">
                                    <Palette className="w-4 h-4" />
                                    Color
                                </div>
                            </label>
                            <div className="flex items-center gap-3">
                                <input
                                    type="color"
                                    value={color}
                                    onChange={(e) => setColor(e.target.value)}
                                    className="w-16 h-12 rounded-lg border border-gray-300 cursor-pointer"
                                />
                                <input
                                    type="text"
                                    value={color}
                                    onChange={(e) => setColor(e.target.value)}
                                    className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent text-base"
                                    placeholder="#6B7280"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center gap-3">
                            <button
                                type="submit"
                                className="w-full sm:w-auto px-6 py-3 rounded-lg bg-black text-white hover:bg-gray-800 transition-colors"
                            >
                                {editingTag ? "Update Tag" : "Create Tag"}
                            </button>
                            <button
                                type="button"
                                onClick={resetForm}
                                className="w-full sm:w-auto px-6 py-3 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Tags Cloud */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6 lg:p-8">
                <h2 className="text-2xl font-serif font-bold text-black mb-6">All Tags</h2>

                {tags.length > 0 ? (
                    <div className="flex flex-wrap gap-3">
                        {tags.map((tag) => (
                            <div
                                key={tag.id}
                                className="group relative inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 hover:border-gray-300 transition-all"
                            >
                                <TagBadge tag={tag} clickable={false} size="md" />
                                <span className="text-sm text-gray-500">({tag.post_count})</span>

                                <div className="hidden group-hover:flex items-center gap-1 ml-2">
                                    <button
                                        onClick={() => handleEdit(tag)}
                                        className="p-1 hover:bg-gray-100 rounded transition-colors"
                                    >
                                        <Edit2 className="w-3 h-3 text-gray-600" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(tag.id)}
                                        className="p-1 hover:bg-red-50 rounded transition-colors"
                                    >
                                        <Trash2 className="w-3 h-3 text-red-600" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <Hash className="w-12 h-12 mx-auto text-gray-300 mb-4" />
                        <p className="text-gray-600 mb-4">No tags yet</p>
                        <button
                            onClick={() => setShowForm(true)}
                            className="text-black font-medium hover:underline"
                        >
                            Create your first tag
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
