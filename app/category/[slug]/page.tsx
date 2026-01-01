import { notFound } from "next/navigation";
import Image from "next/image";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import PostCard from "@/components/post-card";
import CategoryBadge from "@/components/category-badge";
import { getPostsByCategory } from "@/lib/db/categories";
import { FolderOpen } from "lucide-react";

interface CategoryPageProps {
    params: Promise<{ slug: string }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
    const { slug } = await params;

    const { posts, category } = await getPostsByCategory(slug);

    if (!category) {
        notFound();
    }

    return (
        <>
            <Navigation />

            <main className="min-h-screen bg-white pt-20">
                {/* Category Header */}
                <section className="py-16 bg-gradient-to-b from-neutral-50 to-white">
                    <div className="container-custom">
                        <div className="max-w-4xl mx-auto text-center">
                            <div
                                className="inline-flex items-center justify-center w-20 h-20 rounded-2xl mb-6 text-4xl"
                                style={{ backgroundColor: category.color + '20' }}
                            >
                                {category.icon || <FolderOpen className="w-10 h-10" style={{ color: category.color }} />}
                            </div>

                            <h1 className="text-5xl md:text-6xl font-serif font-bold text-black mb-4">
                                {category.name}
                            </h1>

                            {category.description && (
                                <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-6">
                                    {category.description}
                                </p>
                            )}

                            <p className="text-gray-500">
                                {category.post_count} {category.post_count === 1 ? 'article' : 'articles'}
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
                                    No posts in this category yet.
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
