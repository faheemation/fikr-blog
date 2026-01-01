import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { Plus, Edit2, Trash2, Eye } from "lucide-react";
import { redirect } from "next/navigation";

export default async function PostsPage() {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login");
    }

    // Get all posts with author info (admins see everything)
    const { data: posts, error } = await supabase
        .from("posts")
        .select("*, author:profiles(*)")
        .order("created_at", { ascending: false });

    if (error) {
        console.error("Error fetching posts:", error);
    }

    return (
        <div className="space-y-6 md:space-y-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-3xl md:text-4xl font-serif font-bold text-black">All Posts</h1>
                    <p className="text-gray-600 mt-2">Manage your blog posts</p>
                </div>
                <Link
                    href="/dashboard/posts/new"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-black text-white font-semibold hover:bg-gray-800 transition-all duration-300 w-full sm:w-auto"
                >
                    <Plus className="w-5 h-5" />
                    <span>New Post</span>
                </Link>
            </div>

            {/* Desktop Table View - Hidden on Mobile */}
            <div className="hidden lg:block bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                {posts && posts.length > 0 ? (
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                                    Title
                                </th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                                    Author
                                </th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                                    Status
                                </th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                                    Date
                                </th>
                                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {posts.map((post: any) => (
                                <tr key={post.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div>
                                            <p className="font-semibold text-black">{post.title}</p>
                                            <p className="text-sm text-gray-600 line-clamp-1">
                                                {post.excerpt}
                                            </p>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className="text-sm text-gray-700">
                                            {post.author?.full_name || "Unknown"}
                                        </p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-medium ${post.status === "published"
                                                    ? "bg-green-100 text-green-700"
                                                    : post.status === "draft"
                                                        ? "bg-yellow-100 text-yellow-700"
                                                        : "bg-blue-100 text-blue-700"
                                                }`}
                                        >
                                            {post.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600">
                                        {new Date(post.created_at).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <Link
                                            href={`/dashboard/posts/${post.id}/edit`}
                                            className="text-black hover:text-gray-700 font-medium text-sm"
                                        >
                                            Edit
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div className="text-center py-12">
                        <p className="text-gray-500">No posts yet. Create your first post!</p>
                    </div>
                )}
            </div>

            {/* Mobile Card View - Hidden on Desktop */}
            <div className="lg:hidden space-y-4">
                {posts && posts.length > 0 ? (
                    posts.map((post: any) => (
                        <div
                            key={post.id}
                            className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 space-y-3"
                        >
                            {/* Title & Excerpt */}
                            <div>
                                <h3 className="font-semibold text-black text-lg mb-1">
                                    {post.title}
                                </h3>
                                <p className="text-sm text-gray-600 line-clamp-2">
                                    {post.excerpt}
                                </p>
                            </div>

                            {/* Meta Info */}
                            <div className="flex flex-wrap items-center gap-3 text-sm">
                                <span className="text-gray-600">
                                    {post.author?.full_name || "Unknown"}
                                </span>
                                <span
                                    className={`px-2 py-1 rounded-full text-xs font-medium ${post.status === "published"
                                            ? "bg-green-100 text-green-700"
                                            : post.status === "draft"
                                                ? "bg-yellow-100 text-yellow-700"
                                                : "bg-blue-100 text-blue-700"
                                        }`}
                                >
                                    {post.status}
                                </span>
                                <span className="text-gray-500 text-xs">
                                    {new Date(post.created_at).toLocaleDateString()}
                                </span>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-2 pt-2 border-t border-gray-100">
                                <Link
                                    href={`/dashboard/posts/${post.id}/edit`}
                                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-black text-white font-medium hover:bg-gray-800 transition-colors"
                                >
                                    <Edit2 className="w-4 h-4" />
                                    <span>Edit</span>
                                </Link>
                                <Link
                                    href={`/blogs/${post.slug}`}
                                    className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                                >
                                    <Eye className="w-4 h-4" />
                                </Link>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
                        <p className="text-gray-500 mb-4">No posts yet</p>
                        <Link
                            href="/dashboard/posts/new"
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-black text-white font-semibold hover:bg-gray-800 transition-all"
                        >
                            <Plus className="w-5 h-5" />
                            Create your first post
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
