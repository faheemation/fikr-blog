"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import PostCard from "@/components/post-card";
import { FolderOpen, Hash, X } from "lucide-react";

interface BlogListingProps {
    initialPosts: any[];
    initialTotal: number;
    categories: any[];
    tags: any[];
}

export default function BlogListing({ initialPosts, initialTotal, categories, tags }: BlogListingProps) {
    const [posts, setPosts] = useState(initialPosts);
    const [total, setTotal] = useState(initialTotal);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const supabase = createClient();

    const loadPosts = async (newPage = 1, categoryId = selectedCategory, tagIds = selectedTags) => {
        setLoading(true);
        try {
            let query = supabase
                .from("posts")
                .select(
                    `
                    *,
                    author:profiles!posts_author_id_fkey(id, full_name, avatar_url, bio, role),
                    category:categories(id, name, slug, color, icon),
                    tags:post_tags(tag_id, tags(id, name, slug, color))
                `,
                    { count: "exact" }
                )
                .eq("status", "published")
                .order("published_at", { ascending: false })
                .range((newPage - 1) * 12, newPage * 12 - 1);

            if (categoryId) {
                query = query.eq("category_id", categoryId);
            }

            const { data, error, count } = await query;

            if (error) throw error;

            let filteredData = data || [];

            // Filter by tags if selected
            if (tagIds.length > 0) {
                filteredData = filteredData.filter((post: any) => {
                    const postTagIds = post.tags?.map((pt: any) => pt.tags?.id).filter(Boolean) || [];
                    return tagIds.every(tagId => postTagIds.includes(tagId));
                });
            }

            // Transform tags
            const transformedPosts = filteredData.map((post: any) => ({
                ...post,
                tags: post.tags?.map((pt: any) => pt.tags).filter(Boolean) || [],
            }));

            setPosts(transformedPosts);
            setTotal(count || 0);
            setPage(newPage);
        } catch (error) {
            console.error("Error loading posts:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleCategoryChange = (categoryId: string) => {
        setSelectedCategory(categoryId);
        loadPosts(1, categoryId, selectedTags);
    };

    const handleTagToggle = (tagId: string) => {
        const newTags = selectedTags.includes(tagId)
            ? selectedTags.filter(id => id !== tagId)
            : [...selectedTags, tagId];
        setSelectedTags(newTags);
        loadPosts(1, selectedCategory, newTags);
    };

    const clearFilters = () => {
        setSelectedCategory("");
        setSelectedTags([]);
        loadPosts(1, "", []);
    };

    const hasFilters = selectedCategory || selectedTags.length > 0;

    return (
        <div className="space-y-8">
            {/* Filters */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <div className="flex flex-wrap items-center gap-4">
                    {/* Category Filter */}
                    <div className="flex items-center gap-2">
                        <FolderOpen className="w-5 h-5 text-gray-400" />
                        <select
                            value={selectedCategory}
                            onChange={(e) => handleCategoryChange(e.target.value)}
                            className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent"
                        >
                            <option value="">All Categories</option>
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.icon} {category.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Tag Filter */}
                    <div className="flex items-center gap-2 flex-1">
                        <Hash className="w-5 h-5 text-gray-400" />
                        <div className="flex flex-wrap gap-2">
                            {tags.slice(0, 10).map((tag) => (
                                <button
                                    key={tag.id}
                                    onClick={() => handleTagToggle(tag.id)}
                                    className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${selectedTags.includes(tag.id)
                                            ? "bg-black text-white"
                                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                        }`}
                                >
                                    #{tag.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Clear Filters */}
                    {hasFilters && (
                        <button
                            onClick={clearFilters}
                            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
                        >
                            <X className="w-4 h-4" />
                            Clear Filters
                        </button>
                    )}
                </div>

                {/* Active Filters Display */}
                {hasFilters && (
                    <div className="mt-4 pt-4 border-t border-gray-100">
                        <p className="text-sm text-gray-600">
                            Showing {posts.length} of {total} posts
                            {selectedCategory && (
                                <span className="font-medium">
                                    {" "}in {categories.find(c => c.id === selectedCategory)?.name}
                                </span>
                            )}
                            {selectedTags.length > 0 && (
                                <span className="font-medium">
                                    {" "}with {selectedTags.length} tag{selectedTags.length > 1 ? "s" : ""}
                                </span>
                            )}
                        </p>
                    </div>
                )}
            </div>

            {/* Posts Grid */}
            {loading ? (
                <div className="text-center py-16">
                    <p className="text-gray-600">Loading posts...</p>
                </div>
            ) : posts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.map((post) => (
                        <PostCard key={post.id} post={post} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-16">
                    <p className="text-gray-600 text-lg">No posts found with the selected filters.</p>
                    <button
                        onClick={clearFilters}
                        className="mt-4 text-black font-medium hover:underline"
                    >
                        Clear filters
                    </button>
                </div>
            )}

            {/* Pagination */}
            {total > 12 && (
                <div className="flex justify-center gap-2 mt-12">
                    {Array.from({ length: Math.ceil(total / 12) }, (_, i) => i + 1).map((pageNum) => (
                        <button
                            key={pageNum}
                            onClick={() => loadPosts(pageNum, selectedCategory, selectedTags)}
                            className={`px-4 py-2 rounded-lg font-medium transition-colors ${page === pageNum
                                    ? "bg-black text-white"
                                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                }`}
                        >
                            {pageNum}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
