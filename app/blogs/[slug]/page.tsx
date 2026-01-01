import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Clock, Calendar, User, ArrowLeft } from "lucide-react";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import MarkdownRenderer from "@/components/markdown-renderer";
import ReadingProgress from "@/components/reading-progress";
import LikeButton from "@/components/like-button";
import ShareButtons from "@/components/share-buttons";
import PostCard from "@/components/post-card";
import CommentsList from "@/components/comments/comments-list";
import CommentsSection from "@/components/comments-section";
import CategoryBadge from "@/components/category-badge";
import TagBadge from "@/components/tag-badge";
import MDEditor from "@uiw/react-md-editor";
import { getPostBySlug, getPosts, incrementViews } from "@/lib/db/posts";
import { formatDate } from "@/lib/utils";

interface BlogPostPageProps {
    params: Promise<{ slug: string }>;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
    const { slug } = await params;

    // Fetch the post
    const post = await getPostBySlug(slug);

    if (!post) {
        notFound();
    }

    // Increment views (fire and forget)
    incrementViews(post.id);

    // Fetch related posts
    const { posts: relatedPosts } = await getPosts(1, 3);
    const filteredRelated = relatedPosts.filter(p => p.id !== post.id).slice(0, 3);

    const postUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/blogs/${post.slug}`;

    return (
        <>
            <ReadingProgress />
            <Navigation />

            <main className="min-h-screen bg-white pt-20">
                {/* Hero Section */}
                <article className="relative">
                    {/* Featured Image */}
                    <div className="relative h-[60vh] w-full">
                        <Image
                            src={post.featured_image || '/images/blog-tech-future.png'}
                            alt={post.title}
                            fill
                            className="object-cover"
                            priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

                        {/* Title Overlay */}
                        <div className="absolute inset-0 flex items-end">
                            <div className="container-custom pb-16">
                                <Link
                                    href="/blogs"
                                    className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors"
                                >
                                    <ArrowLeft className="w-4 h-4" />
                                    <span>Back to all posts</span>
                                </Link>

                                <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-6 max-w-4xl">
                                    {post.title}
                                </h1>

                                {post.excerpt && (
                                    <p className="text-xl text-white/90 max-w-3xl mb-8">
                                        {post.excerpt}
                                    </p>
                                )}

                                {/* Meta Info */}
                                <div className="flex flex-wrap items-center gap-6 text-white/80">
                                    <div className="flex items-center gap-3">
                                        <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-white/30">
                                            <Image
                                                src={post.author.avatar_url || '/images/author-avatar.png'}
                                                alt={post.author.full_name || 'Author'}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-white">{post.author.full_name || 'Anonymous'}</p>
                                            <p className="text-sm text-white/70">Author</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center gap-2">
                                            <Calendar className="w-4 h-4" />
                                            <span>{formatDate(post.published_at || post.created_at)}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Clock className="w-4 h-4" />
                                            <span>{post.reading_time || 5} min read</span>
                                        </div>
                                    </div>

                                    {/* Category & Tags */}
                                    <div className="flex flex-wrap items-center gap-3 mt-6">
                                        {post.category && (
                                            <CategoryBadge category={post.category} size="md" />
                                        )}
                                        {post.tags && post.tags.length > 0 && (
                                            <div className="flex flex-wrap items-center gap-2">
                                                {post.tags.map((tag: any) => (
                                                    <TagBadge key={tag.id} tag={tag} size="md" />
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="container-custom py-16">
                        <div className="max-w-4xl mx-auto">
                            {/* Article Content */}
                            <MarkdownRenderer content={post.content} />

                            {/* Divider */}
                            <div className="my-12 border-t border-gray-200" />

                            {/* Engagement Section */}
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 py-8">
                                <LikeButton
                                    postId={post.id}
                                    initialLikes={post.likes_count || 0}
                                    initialLiked={false}
                                />
                                <ShareButtons title={post.title} url={postUrl} />
                            </div>

                            {/* Author Bio */}
                            <div className="mt-12 p-8 bg-gray-50 rounded-2xl">
                                <div className="flex items-start gap-6">
                                    <div className="relative w-20 h-20 rounded-full overflow-hidden ring-4 ring-white flex-shrink-0">
                                        <Image
                                            src={post.author.avatar_url || '/images/author-avatar.png'}
                                            alt={post.author.full_name || 'Author'}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-serif font-bold text-black mb-2">
                                            {post.author.full_name || 'Anonymous'}
                                        </h3>
                                        <p className="text-gray-600 leading-relaxed">
                                            {post.author.bio || 'Writer at Fikr, exploring ideas at the intersection of technology, creativity, and human experience.'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </article>

                {/* Comments Section */}
                <section className="py-16 bg-white">
                    <div className="container-custom max-w-4xl">
                        <CommentsSection postId={post.id} />
                    </div>
                </section>

                {/* Related Posts */}
                {filteredRelated.length > 0 && (
                    <section className="py-24 bg-neutral-50">
                        <div className="container-custom">
                            <h2 className="text-4xl font-serif font-bold text-black mb-12">
                                Related Articles
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {filteredRelated.map((relatedPost) => (
                                    <PostCard key={relatedPost.id} post={relatedPost} />
                                ))}
                            </div>
                        </div>
                    </section>
                )}
            </main>

            <Footer />
        </>
    );
}
