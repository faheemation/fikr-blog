"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { createClient } from "@/lib/supabase/client";
import { calculateReadingTime } from "@/lib/utils";
import { Save, Eye, FolderOpen, Hash } from "lucide-react";
import ImageUpload from "@/components/image-upload";
import EditorImageUpload from "@/components/editor-image-upload";
import TagSelector from "@/components/dashboard/tag-selector";

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

    useEffect(() => {
        const fetchData = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (user && !initialData?.author_id) {
                setAuthorId(user.id);
            }

            const { data: authorsData } = await supabase
                .from("profiles")
                .select("id, full_name, email")
                .order("full_name");
            if (authorsData) setAuthors(authorsData);

            const { data: categoriesData } = await supabase
                .from("categories")
                .select("*")
                .order("name");
            if (categoriesData) setCategories(categoriesData);

            if (initialData?.id) {
                const { data: postTagsData } = await supabase
                    .from("post_tags")
                    .select("tag_id, tags(*)")
                    .eq("post_id", initialData.id);

                if (postTagsData) {
                    setSelectedTags(
                        postTagsData.map((pt: any) => pt.tags).filter(Boolean)
                    );
                }
            }
        };

        fetchData();
    }, [initialData, supabase]);

    useEffect(() => {
        if (title && !initialData?.id) {
            setSlug(
                title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
            );
        }
    }, [title, initialData]);

    const saveTags = async (postId: string) => {
        await supabase.from("post_tags").delete().eq("post_id", postId);

        if (selectedTags.length > 0) {
            await supabase.from("post_tags").insert(
                selectedTags.map(tag => ({
                    post_id: postId,
                    tag_id: tag.id,
                }))
            );
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
                await supabase.from("posts").update(postData).eq("id", initialData.id);
                await saveTags(initialData.id);
                toast.success("Post updated successfully!");
            } else {
                const { data: newPost } = await supabase
                    .from("posts")
                    .insert([postData])
                    .select()
                    .single();

                if (newPost) await saveTags(newPost.id);
                toast.success("Post created successfully!");
            }

            router.push("/dashboard/posts");
            router.refresh();
        } catch (e: any) {
            toast.error(e.message || "Failed to save post");
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-serif font-bold text-black">
                        {initialData ? "Edit Post" : "New Post"}
                    </h1>
                    <p className="text-gray-600 mt-2">
                        {initialData ? "Update your blog post" : "Create a new blog post"}
                    </p>
                </div>
            </div>

            <div className="sticky top-0 z-10 bg-gray-50 px-4 py-4 border-b">
                <div className="flex gap-4">
                    <button
                        onClick={() => handleSave("draft")}
                        disabled={saving}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gray-200"
                    >
                        <Save className="w-5 h-5" />
                        Save Draft
                    </button>

                    <button
                        onClick={() => handleSave("published")}
                        disabled={saving}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-black text-white"
                    >
                        <Eye className="w-5 h-5" />
                        Publish
                    </button>
                </div>
            </div>

            <div className="space-y-6">
                <input
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    placeholder="Title"
                    className="w-full border px-4 py-3 rounded"
                />

                <input
                    value={slug}
                    onChange={e => setSlug(e.target.value)}
                    placeholder="Slug"
                    className="w-full border px-4 py-3 rounded"
                />

                <textarea
                    value={excerpt}
                    onChange={e => setExcerpt(e.target.value)}
                    rows={3}
                    className="w-full border px-4 py-3 rounded"
                />

                <ImageUpload
                    label="Featured Image"
                    value={featuredImage}
                    onChange={setFeaturedImage}
                    onRemove={() => setFeaturedImage("")}
                    folder="fikr-blog/posts"
                />

                <EditorImageUpload
                    onImageInsert={img => setContent(prev => prev + "\n\n" + img + "\n\n")}
                />

                <div data-color-mode="light">
                    <MDEditor
                        value={content}
                        onChange={val => setContent(val || "")}
                        height={500}
                        preview={preview ? "preview" : "edit"}
                    />
                </div>

                <TagSelector selectedTags={selectedTags} onChange={setSelectedTags} />

                <div className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        checked={isFeatured}
                        onChange={e => setIsFeatured(e.target.checked)}
                    />
                    <span>Feature this post</span>
                </div>
            </div>
        </div>
    );
}
