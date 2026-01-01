import Navigation from "@/components/navigation";
import PostCard from "@/components/post-card";
import Footer from "@/components/footer";
import FeaturedCarousel from "@/components/featured-carousel";
import CategoryBadge from "@/components/category-badge";
import TagBadge from "@/components/tag-badge";
import { getFeaturedPosts, getPosts } from "@/lib/db/posts";
import { getAllCategories, getAllTags } from "@/lib/db/categories";
import Link from "next/link";
import { Mail, PenTool, Send, FolderOpen, Hash } from "lucide-react";

export default async function Home() {
    // Fetch featured posts for carousel
    const featuredPosts = await getFeaturedPosts(3);

    // Fetch recent posts (8 max)
    const { posts } = await getPosts(1, 8);

    // Fetch categories and tags
    const categories = await getAllCategories();
    const tags = (await getAllTags()).slice(0, 20); // Top 20 tags

    // Transform for carousel
    const featuredCarouselPosts = featuredPosts.map(post => ({
        id: post.id,
        title: post.title,
        excerpt: post.excerpt || '',
        author: {
            name: post.author.full_name || 'Anonymous',
            avatar: post.author.avatar_url || '/images/author-avatar.png',
            role: post.author.role === 'admin' ? 'Founder & Writer' : 'Writer',
        },
        image: post.featured_image || '/images/blog-tech-future.png',
        slug: post.slug,
    }));

    return (
        <main className="min-h-screen">
            <Navigation />

            {/* Featured Carousel */}
            {featuredCarouselPosts.length > 0 && (
                <FeaturedCarousel posts={featuredCarouselPosts} />
            )}

            {/* Recent Posts Section */}
            <section className="py-24 bg-white">
                <div className="container-custom">
                    <div className="text-center mb-16">
                        <h2 className="text-5xl font-serif font-bold mb-4 text-black">
                            Recent Articles
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Dive into thought-provoking essays and insights
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {posts.map((post) => (
                            <PostCard key={post.id} post={post} />
                        ))}
                    </div>

                    {posts.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-gray-500 text-lg">
                                No posts yet. Check back soon!
                            </p>
                        </div>
                    )}

                    <div className="text-center mt-12">
                        <Link
                            href="/blogs"
                            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-black text-white font-semibold hover:bg-gray-900 transition-all duration-300"
                        >
                            <span>View All Posts</span>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Browse by Category */}
            {categories.length > 0 && (
                <section className="py-24 bg-neutral-50">
                    <div className="container-custom">
                        <div className="text-center mb-16">
                            <h2 className="text-5xl font-serif font-bold mb-4 text-black">
                                Browse by Category
                            </h2>
                            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                                Explore articles organized by topic
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {categories.map((category) => (
                                <Link
                                    key={category.id}
                                    href={`/category/${category.slug}`}
                                    className="group"
                                >
                                    <div className="bg-white rounded-2xl p-8 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full">
                                        <div
                                            className="inline-flex items-center justify-center w-16 h-16 rounded-xl mb-4 text-3xl transition-transform group-hover:scale-110"
                                            style={{ backgroundColor: category.color + '20' }}
                                        >
                                            {category.icon || <FolderOpen className="w-8 h-8" style={{ color: category.color }} />}
                                        </div>
                                        <h3 className="text-2xl font-serif font-bold text-black mb-2">
                                            {category.name}
                                        </h3>
                                        {category.description && (
                                            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                                                {category.description}
                                            </p>
                                        )}
                                        <p className="text-sm font-medium" style={{ color: category.color }}>
                                            {category.post_count} {category.post_count === 1 ? 'article' : 'articles'}
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Popular Tags */}
            {tags.length > 0 && (
                <section className="py-24 bg-white">
                    <div className="container-custom">
                        <div className="text-center mb-16">
                            <h2 className="text-5xl font-serif font-bold mb-4 text-black">
                                Popular Topics
                            </h2>
                            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                                Discover trending subjects
                            </p>
                        </div>

                        <div className="flex flex-wrap justify-center gap-3 max-w-5xl mx-auto">
                            {tags.map((tag) => (
                                <Link key={tag.id} href={`/tag/${tag.slug}`}>
                                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all">
                                        <TagBadge tag={tag} size="md" clickable={false} />
                                        <span className="text-sm text-gray-500">({tag.post_count})</span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Want to Write Section */}
            <section className="py-24 bg-neutral-50">
                <div className="container-custom">
                    <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl p-12 text-center">
                        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-black text-white mb-6">
                            <PenTool className="w-10 h-10" />
                        </div>

                        <h2 className="text-4xl font-serif font-bold text-black mb-4">
                            Want to Write for Fikr?
                        </h2>

                        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                            We're always looking for thoughtful writers to share their perspectives.
                            Have an idea for an article? We'd love to hear from you!
                        </p>

                        <div className="space-y-4 mb-8 text-left max-w-2xl mx-auto">
                            <div className="flex items-start gap-3">
                                <div className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center flex-shrink-0 mt-1">
                                    <span className="text-sm">✓</span>
                                </div>
                                <p className="text-gray-700">Share your unique insights and perspectives</p>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center flex-shrink-0 mt-1">
                                    <span className="text-sm">✓</span>
                                </div>
                                <p className="text-gray-700">Reach a thoughtful, engaged audience</p>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center flex-shrink-0 mt-1">
                                    <span className="text-sm">✓</span>
                                </div>
                                <p className="text-gray-700">Join a community of creative thinkers</p>
                            </div>
                        </div>

                        <a
                            href="mailto:fikronlineblog@gmail.com?subject=Article Submission for Fikr&body=Hi,%0D%0A%0D%0AI'd like to submit an article for Fikr. Here's my idea:%0D%0A%0D%0A[Your article idea]%0D%0A%0D%0AThank you!"
                            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-black text-white font-semibold hover:bg-gray-900 transition-all duration-300 text-lg"
                        >
                            <Mail className="w-5 h-5" />
                            <span>Pitch Your Idea</span>
                            <Send className="w-5 h-5" />
                        </a>

                        <p className="text-sm text-gray-500 mt-6">
                            Or email us directly at{" "}
                            <a href="mailto:fikronlineblog@gmail.com" className="text-black font-medium hover:underline">
                                fikronlineblog@gmail.com
                            </a>
                        </p>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
