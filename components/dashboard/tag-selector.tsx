"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { X, Plus } from "lucide-react";
import TagBadge from "@/components/tag-badge";

interface TagSelectorProps {
    selectedTags: any[];
    onChange: (tags: any[]) => void;
}

export default function TagSelector({ selectedTags, onChange }: TagSelectorProps) {
    const [allTags, setAllTags] = useState<any[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [showDropdown, setShowDropdown] = useState(false);
    const [newTagName, setNewTagName] = useState("");
    const supabase = createClient();

    useEffect(() => {
        loadTags();
    }, []);

    const loadTags = async () => {
        const { data } = await supabase
            .from("tags")
            .select("*")
            .order("name");

        if (data) setAllTags(data);
    };

    const filteredTags = allTags.filter(
        (tag) =>
            tag.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
            !selectedTags.find((t) => t.id === tag.id)
    );

    const handleSelectTag = (tag: any) => {
        onChange([...selectedTags, tag]);
        setSearchQuery("");
        setShowDropdown(false);
    };

    const handleRemoveTag = (tagId: string) => {
        onChange(selectedTags.filter((t) => t.id !== tagId));
    };

    const handleCreateTag = async () => {
        if (!newTagName.trim()) return;

        const slug = newTagName
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, "");

        const { data, error } = await supabase
            .from("tags")
            .insert([{ name: newTagName, slug }])
            .select()
            .single();

        if (data && !error) {
            onChange([...selectedTags, data]);
            setAllTags([...allTags, data]);
            setNewTagName("");
            setSearchQuery("");
            setShowDropdown(false);
        }
    };

    return (
        <div className="space-y-3">
            {/* Selected Tags */}
            {selectedTags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                    {selectedTags.map((tag) => (
                        <div key={tag.id} className="inline-flex items-center gap-1">
                            <TagBadge tag={tag} clickable={false} size="md" />
                            <button
                                type="button"
                                onClick={() => handleRemoveTag(tag.id)}
                                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                            >
                                <X className="w-3 h-3 text-gray-500" />
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {/* Search Input */}
            <div className="relative">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => {
                        setSearchQuery(e.target.value);
                        setShowDropdown(true);
                    }}
                    onFocus={() => setShowDropdown(true)}
                    placeholder="Search or create tags..."
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent"
                />

                {/* Dropdown */}
                {showDropdown && (
                    <div className="absolute z-10 w-full mt-2 bg-white rounded-lg border border-gray-200 shadow-lg max-h-64 overflow-y-auto">
                        {filteredTags.length > 0 ? (
                            <div className="p-2">
                                {filteredTags.map((tag) => (
                                    <button
                                        key={tag.id}
                                        type="button"
                                        onClick={() => handleSelectTag(tag)}
                                        className="w-full text-left px-3 py-2 hover:bg-gray-50 rounded-lg transition-colors flex items-center justify-between"
                                    >
                                        <TagBadge tag={tag} clickable={false} />
                                        <span className="text-xs text-gray-400">
                                            {tag.post_count} posts
                                        </span>
                                    </button>
                                ))}
                            </div>
                        ) : searchQuery.trim() ? (
                            <div className="p-4">
                                <p className="text-sm text-gray-500 mb-3">
                                    Tag "{searchQuery}" not found
                                </p>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setNewTagName(searchQuery);
                                        handleCreateTag();
                                    }}
                                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-black text-white hover:bg-gray-800 transition-colors text-sm"
                                >
                                    <Plus className="w-4 h-4" />
                                    Create "{searchQuery}"
                                </button>
                            </div>
                        ) : (
                            <div className="p-4 text-sm text-gray-500">
                                Start typing to search tags...
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Click outside to close */}
            {showDropdown && (
                <div
                    className="fixed inset-0 z-0"
                    onClick={() => setShowDropdown(false)}
                />
            )}
        </div>
    );
}
