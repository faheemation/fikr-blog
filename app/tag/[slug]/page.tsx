import { notFound } from "next/navigation";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import PostCard from "@/components/post-card";
import TagBadge from "@/components/tag-badge";
import { getPostsByTag } from "@/lib/db/categories";
import { Hash } from "lucide-react";

interface TagPageProps {
    params: Promise<{ slug: string }>;
}

export default async function TagPage({ params }: TagPageProps) {
    const { slug } = await params;

    const { posts, tag } = await getPostsByTag(slug);

    if (!tag) {
        notFound();
    }

    return (
        <>
            <Navigation />

            <main className="min-h-screen bg-white pt-20">
                {/* Tag Header */}
                <section className="py-16 bg-gradient-to-b from-neutral-50 to-white">
                    <div className="container-custom">
                        <div className="max-w-4xl mx-auto text-center">
                            <div
                                className="inline-flex items-center justify-center w-20 h-20 rounded-2xl mb-6"
                                style={{
                                    backgroundColor: (tag.color || '#6B7280') + '20',
                                    color: tag.color || '#6B7280'
                                }}
                            >
                                <Hash className="w-10 h-10" />
                            </div>

                            <h1 className="text-5xl md:text-6xl font-serif font-bold text-black mb-4">
                                #{tag.name}
                            </h1>

                            <p className="text-gray-500">
                                {tag.post_count} {tag.post_count === 1 ? 'article' : 'articles'}
                            </p>
                        </div>
                    </div>
                </section>

                {/* Posts Grid */}
                <section className="py-16">
                    <div className="container-custom">
                        {posts.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {posts.map((post) => (
                                    <PostCard key={post.id} post={post} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-16">
                                <p className="text-gray-500 text-lg">
                                    No posts with this tag yet.
                                </p>
                            </div>
                        )}
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}
