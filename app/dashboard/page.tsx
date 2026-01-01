import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { FileText, Eye, Plus } from "lucide-react";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login");
    }

    // Get all posts (admins see everything)
    const { data: recentPosts } = await supabase
        .from("posts")
        .select("*, author:profiles(full_name)")
        .order("created_at", { ascending: false })
        .limit(5);

    // Get stats
    const { count: totalPosts } = await supabase
        .from("posts")
        .select("*", { count: "exact", head: true });

    const { count: publishedPosts } = await supabase
        .from("posts")
        .select("*", { count: "exact", head: true })
        .eq("status", "published");

    const { count: draftPosts } = await supabase
        .from("posts")
        .select("*", { count: "exact", head: true })
        .eq("status", "draft");

    const stats = [
        { name: "Total Posts", value: totalPosts || 0, icon: FileText, color: "bg-blue-500" },
        { name: "Published", value: publishedPosts || 0, icon: Eye, color: "bg-green-500" },
        { name: "Drafts", value: draftPosts || 0, icon: FileText, color: "bg-yellow-500" },
    ];

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-serif font-bold text-black">Dashboard</h1>
                    <p className="text-gray-600 mt-2">Welcome back! Here's your overview.</p>
                </div>
                <Link
                    href="/dashboard/posts/new"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-black text-white font-semibold hover:bg-gray-800 transition-all duration-300"
                >
                    <Plus className="w-5 h-5" />
                    <span>New Post</span>
                </Link>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stats.map((stat) => {
                    const Icon = stat.icon;
                    return (
                        <div
                            key={stat.name}
                            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600 mb-1">{stat.name}</p>
                                    <p className="text-3xl font-bold text-black">{stat.value}</p>
                                </div>
                                <div className={`${stat.color} p-3 rounded-xl`}>
                                    <Icon className="w-6 h-6 text-white" />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Recent Posts */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
                <div className="p-6 border-b border-gray-100">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-serif font-bold text-black">Recent Posts</h2>
                        <Link
                            href="/dashboard/posts"
                            className="text-sm text-gray-600 hover:text-black transition-colors"
                        >
                            View all →
                        </Link>
                    </div>
                </div>

                <div className="divide-y divide-gray-100">
                    {recentPosts && recentPosts.length > 0 ? (
                        recentPosts.map((post: any) => (
                            <Link
                                key={post.id}
                                href={`/dashboard/posts/${post.id}/edit`}
                                className="block p-6 hover:bg-gray-50 transition-colors"
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <h3 className="text-lg font-semibold text-black mb-1">
                                            {post.title}
                                        </h3>
                                        <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                                            {post.excerpt}
                                        </p>
                                        <div className="flex items-center gap-4 text-xs text-gray-500">
                                            <span
                                                className={`px-2 py-1 rounded-full ${post.status === "published"
                                                        ? "bg-green-100 text-green-700"
                                                        : post.status === "draft"
                                                            ? "bg-yellow-100 text-yellow-700"
                                                            : "bg-blue-100 text-blue-700"
                                                    }`}
                                            >
                                                {post.status}
                                            </span>
                                            <span>By {post.author?.full_name || "Unknown"}</span>
                                            <span>{new Date(post.created_at).toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <div className="p-12 text-center">
                            <FileText className="w-12 h-12 mx-auto text-gray-300 mb-4" />
                            <p className="text-gray-600 mb-4">No posts yet</p>
                            <Link
                                href="/dashboard/posts/new"
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-black text-white font-semibold hover:bg-gray-800 transition-all duration-300"
                            >
                                <Plus className="w-5 h-5" />
                                <span>Create your first post</span>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
