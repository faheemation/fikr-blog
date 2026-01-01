import { createClient } from "@/lib/supabase/server";
import { Eye, Heart, MessageCircle, TrendingUp } from "lucide-react";

export default async function AnalyticsPage() {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    // Get user's posts with engagement
    const { data: posts } = await supabase
        .from("posts")
        .select("id, title, created_at, status")
        .eq("author_id", user?.id)
        .eq("status", "published")
        .order("created_at", { ascending: false });

    // Get total views
    const { count: totalViews } = await supabase
        .from("post_views")
        .select("*", { count: "exact", head: true })
        .in(
            "post_id",
            posts?.map((p) => p.id) || []
        );

    // Get total likes
    const { count: totalLikes } = await supabase
        .from("likes")
        .select("*", { count: "exact", head: true })
        .in(
            "post_id",
            posts?.map((p) => p.id) || []
        );

    // Get total comments
    const { count: totalComments } = await supabase
        .from("comments")
        .select("*", { count: "exact", head: true })
        .in(
            "post_id",
            posts?.map((p) => p.id) || []
        );

    const stats = [
        { name: "Total Views", value: totalViews || 0, icon: Eye, color: "bg-blue-500" },
        { name: "Total Likes", value: totalLikes || 0, icon: Heart, color: "bg-pink-500" },
        { name: "Total Comments", value: totalComments || 0, icon: MessageCircle, color: "bg-purple-500" },
        { name: "Published Posts", value: posts?.length || 0, icon: TrendingUp, color: "bg-green-500" },
    ];

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-4xl font-serif font-bold text-black">Analytics</h1>
                <p className="text-gray-600 mt-2">Track your content performance</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat) => {
                    const Icon = stat.icon;
                    return (
                        <div
                            key={stat.name}
                            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className={`${stat.color} p-3 rounded-xl`}>
                                    <Icon className="w-6 h-6 text-white" />
                                </div>
                            </div>
                            <p className="text-sm text-gray-600 mb-1">{stat.name}</p>
                            <p className="text-3xl font-bold text-black">{stat.value}</p>
                        </div>
                    );
                })}
            </div>

            {/* Posts Performance */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
                <div className="p-6 border-b border-gray-100">
                    <h2 className="text-2xl font-serif font-bold text-black">Post Performance</h2>
                </div>
                <div className="p-6">
                    {posts && posts.length > 0 ? (
                        <div className="space-y-4">
                            {posts.map((post) => (
                                <div
                                    key={post.id}
                                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                                >
                                    <div>
                                        <h3 className="font-semibold text-black">{post.title}</h3>
                                        <p className="text-sm text-gray-600">
                                            Published {new Date(post.created_at).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-center text-gray-600 py-8">
                            No published posts yet. Create and publish your first post to see analytics!
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
