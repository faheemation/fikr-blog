"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Plus, Edit2, Trash2, Palette } from "lucide-react";
import Link from "next/link";

export default function CategoriesPage() {
    const [categories, setCategories] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingCategory, setEditingCategory] = useState<any>(null);
    const supabase = createClient();
    const router = useRouter();

    // Form state
    const [name, setName] = useState("");
    const [slug, setSlug] = useState("");
    const [description, setDescription] = useState("");
    const [color, setColor] = useState("#3B82F6");
    const [icon, setIcon] = useState("");

    useEffect(() => {
        loadCategories();
    }, []);

    const loadCategories = async () => {
        try {
            const { data, error } = await supabase
                .from("categories")
                .select("*")
                .order("name");

            if (error) throw error;
            setCategories(data || []);
        } catch (error) {
            console.error("Error loading categories:", error);
            toast.error("Failed to load categories");
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
        if (!editingCategory) {
            setSlug(generateSlug(value));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const categoryData = {
                name,
                slug,
                description,
                color,
                icon,
            };

            if (editingCategory) {
                const { error } = await supabase
                    .from("categories")
                    .update(categoryData)
                    .eq("id", editingCategory.id);

                if (error) throw error;
                toast.success("Category updated!");
            } else {
                const { error } = await supabase
                    .from("categories")
                    .insert([categoryData]);

                if (error) throw error;
                toast.success("Category created!");
            }

            resetForm();
            loadCategories();
            router.refresh();
        } catch (error: any) {
            toast.error(error.message || "Failed to save category");
        }
    };

    const handleEdit = (category: any) => {
        setEditingCategory(category);
        setName(category.name);
        setSlug(category.slug);
        setDescription(category.description || "");
        setColor(category.color);
        setIcon(category.icon || "");
        setShowForm(true);
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this category? Posts will not be deleted.")) return;

        try {
            const { error } = await supabase
                .from("categories")
                .delete()
                .eq("id", id);

            if (error) throw error;
            toast.success("Category deleted!");
            loadCategories();
            router.refresh();
        } catch (error: any) {
            toast.error(error.message || "Failed to delete category");
        }
    };

    const resetForm = () => {
        setName("");
        setSlug("");
        setDescription("");
        setColor("#3B82F6");
        setIcon("");
        setEditingCategory(null);
        setShowForm(false);
    };

    const iconOptions = [
        "Laptop", "Code", "Cpu", "Brain", "Lightbulb", "BookOpen",
        "Palette", "Sparkles", "Wand2", "Heart", "Leaf", "Sun",
        "Briefcase", "TrendingUp", "Target", "Rocket", "Zap", "Star"
    ];

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-gray-600">Loading categories...</p>
            </div>
        );
    }

    return (
        <div className="space-y-6 md:space-y-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-3xl md:text-4xl font-serif font-bold text-black">Categories</h1>
                    <p className="text-gray-600 mt-2">Organize your posts by topic</p>
                </div>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-black text-white hover:bg-gray-800 transition-colors w-full sm:w-auto"
                >
                    <Plus className="w-5 h-5" />
                    New Category
                </button>
            </div>

            {/* Form */}
            {showForm && (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6 lg:p-8">
                    <h2 className="text-2xl font-serif font-bold text-black mb-6">
                        {editingCategory ? "Edit Category" : "New Category"}
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
                                    placeholder="Technology"
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
                                    placeholder="technology"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Description
                            </label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                rows={3}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent resize-none text-base"
                                placeholder="Articles about technology and innovation"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                                        placeholder="#3B82F6"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Icon (Lucide name)
                                </label>
                                <select
                                    value={icon}
                                    onChange={(e) => setIcon(e.target.value)}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent text-base"
                                >
                                    <option value="">No icon</option>
                                    {iconOptions.map((iconName) => (
                                        <option key={iconName} value={iconName}>
                                            {iconName}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center gap-3">
                            <button
                                type="submit"
                                className="w-full sm:w-auto px-6 py-3 rounded-lg bg-black text-white hover:bg-gray-800 transition-colors"
                            >
                                {editingCategory ? "Update Category" : "Create Category"}
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

            {/* Categories List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categories.map((category) => (
                    <div
                        key={category.id}
                        className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow"
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div
                                className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl"
                                style={{ backgroundColor: category.color + '20' }}
                            >
                                {category.icon || '📁'}
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => handleEdit(category)}
                                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                >
                                    <Edit2 className="w-4 h-4 text-gray-600" />
                                </button>
                                <button
                                    onClick={() => handleDelete(category.id)}
                                    className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                                >
                                    <Trash2 className="w-4 h-4 text-red-600" />
                                </button>
                            </div>
                        </div>

                        <h3 className="text-xl font-serif font-bold text-black mb-2">
                            {category.name}
                        </h3>

                        {category.description && (
                            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                                {category.description}
                            </p>
                        )}

                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                            <span className="text-sm text-gray-500">
                                {category.post_count} posts
                            </span>
                            <div
                                className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
                                style={{ backgroundColor: category.color }}
                            />
                        </div>
                    </div>
                ))}
            </div>

            {categories.length === 0 && !showForm && (
                <div className="text-center py-12 bg-gray-50 rounded-2xl">
                    <p className="text-gray-600 mb-4">No categories yet</p>
                    <button
                        onClick={() => setShowForm(true)}
                        className="text-black font-medium hover:underline"
                    >
                        Create your first category
                    </button>
                </div>
            )}
        </div>
    );
}
