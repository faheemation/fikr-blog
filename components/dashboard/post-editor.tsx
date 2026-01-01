"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { createClient } from "@/lib/supabase/client";
import { calculateReadingTime } from "@/lib/utils";
import { Save, Eye, User, FolderOpen, Hash } from "lucide-react";
import ImageUpload from "@/components/image-upload";
import EditorImageUpload from "@/components/editor-image-upload";
import TagSelector from "@/components/dashboard/tag-selector";

// Dynamically import MDEditor to avoid SSR issues
const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

interface PostEditorProps {
    initialData?: {
        id?: string;
        title: string;
        slug: string;
        excerpt: string;
        content: string;
        featured_image: string | null;
        status: string;
        is_featured: boolean;
        author_id: string;
        language?: string;
        category_id?: string;
    };
}

export default function PostEditor({ initialData }: PostEditorProps) {
    const router = useRouter();
    const supabase = createClient();

    const [title, setTitle] = useState(initialData?.title || "");
    const [slug, setSlug] = useState(initialData?.slug || "");
    const [excerpt, setExcerpt] = useState(initialData?.excerpt || "");
    const [content, setContent] = useState(initialData?.content || "");
    const [featuredImage, setFeaturedImage] = useState(initialData?.featured_image || "");
    const [isFeatured, setIsFeatured] = useState(initialData?.is_featured || false);
    const [authorId, setAuthorId] = useState(initialData?.author_id || "");
    const [language, setLanguage] = useState(initialData?.language || "en");
    const [categoryId, setCategoryId] = useState(initialData?.category_id || "");
    const [selectedTags, setSelectedTags] = useState<any[]>([]);
    const [authors, setAuthors] = useState<any[]>([]);
    const [categories, setCategories] = useState<any[]>([]);
    const [saving, setSaving] = useState(false);
    const [preview, setPreview] = useState(false);
    const [currentUserId, setCurrentUserId] = useState("");

    // Fetch authors, categories, and tags
    useEffect(() => {
        const fetchData = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                setCurrentUserId(user.id);
                if (!initialData?.author_id) {
                    setAuthorId(user.id);
                }
            }

            // Fetch authors
            const { data: authorsData } = await supabase
                .from("profiles")
                .select("id, full_name, email")
                .order("full_name");
            if (authorsData) setAuthors(authorsData);

            // Fetch categories
            const { data: categoriesData } = await supabase
                .from("categories")
                .select("*")
                .order("name");
            if (categoriesData) setCategories(categoriesData);

            // Fetch existing tags for this post
            if (initialData?.id) {
                const { data: postTagsData } = await supabase
                    .from("post_tags")
                    .select("tag_id, tags(*)")
                    .eq("post_id", initialData.id);

                if (postTagsData) {
                    const tags = postTagsData.map((pt: any) => pt.tags).filter(Boolean);
                    setSelectedTags(tags);
                }
            }
        };

        fetchData();
    }, []);

    // Auto-generate slug from title
    useEffect(() => {
        if (title && !initialData) {
            const generatedSlug = title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/(^-|-$)/g, "");
            setSlug(generatedSlug);
        }
    }, [title]);

    // Save tags for a post
    const saveTags = async (postId: string) => {
        // Delete existing tags
        await supabase
            .from("post_tags")
            .delete()
            .eq("post_id", postId);

        // Insert new tags
        if (selectedTags.length > 0) {
            const postTags = selectedTags.map(tag => ({
                post_id: postId,
                tag_id: tag.id
            }));

            await supabase
                .from("post_tags")
                .insert(postTags);
        }
    };

    const handleSave = async (status: string) => {
        if (!title || !content || !authorId || !featuredImage) {
            toast.error("Please fill in all required fields");
            return;
        }

        setSaving(true);

        try {
            const postData = {
                title,
                slug,
                excerpt,
                content,
                featured_image: featuredImage,
                status,
                is_featured: isFeatured,
                author_id: authorId,
                language,
                category_id: categoryId || null,
                reading_time: calculateReadingTime(content),
            };

            if (initialData?.id) {
                // Update existing post
                const { error } = await supabase
                    .from("posts")
                    .update(postData)
                    .eq("id", initialData.id);

                if (error) throw error;

                // Update tags
                await saveTags(initialData.id);

                toast.success("Post updated successfully!");
            } else {
                // Create new post
                const { data: newPost, error } = await supabase
                    .from("posts")
                    .insert([postData])
                    .select()
                    .single();

                if (error) throw error;

                // Save tags
                if (newPost) {
                    await saveTags(newPost.id);
                }

                toast.success("Post created successfully!");
            }

            router.push("/dashboard/posts");
            router.refresh();
        } catch (error: any) {
            toast.error(error.message || "Failed to save post");
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-serif font-bold text-black">
                        {initialData ? "Edit Post" : "New Post"}
                    </h1>
                    <p className="text-gray-600 mt-2">
                        {initialData ? "Update your blog post" : "Create a new blog post"}
                    </p>
                </div>
                <div className="space-y-6 md:space-y-8">
                    {/* Action Buttons - Sticky on mobile */}
                    <div className="sticky top-0 z-10 bg-gray-50 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-4 border-b border-gray-200 lg:static lg:bg-transparent lg:border-0 lg:p-0">
                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                            <button
                                onClick={() => handleSave("draft")}
                                disabled={saving}
                                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gray-200 text-black font-semibold hover:bg-gray-300 transition-all duration-300 disabled:opacity-50"
                            >
                                <Save className="w-5 h-5" />
                                <span>{saving ? "Saving..." : "Save Draft"}</span>
                            </button>
                            <button
                                onClick={() => handleSave("published")}
                                disabled={saving}
                                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-black text-white font-semibold hover:bg-gray-800 transition-all duration-300 disabled:opacity-50"
                            >
                                <Eye className="w-5 h-5" />
                                <span>{saving ? "Publishing..." : "Publish"}</span>
                            </button>
                        </div>
                    </div>

                    {/* Main Form */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-6">
                        {/* Author Selection */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                <div className="flex items-center gap-2">
                                    <User className="w-4 h-4" />
                                    Author *
                                </div>
                            </label>
                            <select
                                value={authorId}
                                onChange={(e) => setAuthorId(e.target.value)}
                                required
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                            >
                                <option value="">Select an author...</option>
                                {authors.map((author) => (
                                    <option key={author.id} value={author.id}>
                                        {author.full_name || author.email}
                                        {author.id === currentUserId ? " (You)" : ""}
                                    </option>
                                ))}
                            </select>
                            <p className="text-sm text-gray-500 mt-1">
                                This will be displayed as the post author
                            </p>
                        </div>

                        {/* Language Selection */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Language *
                            </label>
                            <select
                                value={language}
                                onChange={(e) => setLanguage(e.target.value)}
                                required
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                            >
                                <option value="en">English</option>
                                <option value="ml">മലയാളം (Malayalam)</option>
                            </select>
                            <p className="text-sm text-gray-500 mt-1">
                                Select the language of your post content
                            </p>
                        </div>

                        {/* Category Selection */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                <div className="flex items-center gap-2">
                                    <FolderOpen className="w-4 h-4" />
                                    Category
                                </div>
                            </label>
                            <select
                                value={categoryId}
                                onChange={(e) => setCategoryId(e.target.value)}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                            >
                                <option value="">No Category</option>
                                {categories.map((category) => (
                                    <option key={category.id} value={category.id}>
                                        {category.icon} {category.name}
                                    </option>
                                ))}
                            </select>
                            <p className="text-sm text-gray-500 mt-1">
                                Organize your post by topic
                            </p>
                        </div>

                        {/* Tags Selection */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                <div className="flex items-center gap-2">
                                    <Hash className="w-4 h-4" />
                                    Tags
                                </div>
                            </label>
                            <TagSelector
                                selectedTags={selectedTags}
                                onChange={setSelectedTags}
                            />
                            <p className="text-sm text-gray-500 mt-1">
                                Add keywords to help readers find your post
                            </p>
                        </div>

                        {/* Title */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Title *
                            </label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent transition-all text-base"
                                placeholder="Enter post title..."
                            />
                        </div>

                        {/* Slug */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                URL Slug
                            </label>
                            <input
                                type="text"
                                value={slug}
                                onChange={(e) => setSlug(e.target.value)}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                                placeholder="post-url-slug"
                            />
                            <p className="text-sm text-gray-500 mt-1">
                                URL: /blogs/{slug || "post-url-slug"}
                            </p>
                        </div>

                        {/* Excerpt */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Excerpt
                            </label>
                            <textarea
                                value={excerpt}
                                onChange={(e) => setExcerpt(e.target.value)}
                                rows={3}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent transition-all resize-none"
                                placeholder="Brief description of your post..."
                            />
                        </div>

                        {/* Featured Image - NOW WITH DRAG & DROP! */}
                        <ImageUpload
                            label="Featured Image *"
                            value={featuredImage}
                            onChange={setFeaturedImage}
                            onRemove={() => setFeaturedImage("")}
                            folder="fikr-blog/posts"
                        />

                        {/* Content */}
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <label className="block text-sm font-medium text-gray-700">
                                    Content *
                                </label>
                                <EditorImageUpload onImageInsert={(img) => setContent((prev) => prev + "\n\n" + img + "\n\n")} />
                            </div>
                            <div data-color-mode="light">
                                <MDEditor
                                    value={content}
                                    onChange={(val) => setContent(val || "")}
                                    height={500}
                                    preview={preview ? "preview" : "edit"}
                                />
                            </div>
                            <p className="text-sm text-gray-500 mt-2">
                                💡 Tip: Click "Insert Image" to upload images directly into your content
                            </p>
                        </div>

                        {/* Featured Toggle */}
                        <div className="flex items-center gap-3">
                            <input
                                type="checkbox"
                                id="featured"
                                checked={isFeatured}
                                onChange={(e) => setIsFeatured(e.target.checked)}
                                className="w-4 h-4 rounded border-gray-300 text-black focus:ring-black"
                            />
                            <label htmlFor="featured" className="text-sm font-medium text-gray-700">
                                Feature this post on homepage carousel
                            </label>
                        </div>
                    </div>
                </div>
                );
}
