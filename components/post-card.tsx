"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Calendar, Clock, Heart, MessageCircle } from "lucide-react";
import { formatDate, calculateReadingTime } from "@/lib/utils";
import { PostWithAuthor } from "@/types";
import CategoryBadge from "@/components/category-badge";
import TagBadge from "@/components/tag-badge";

interface PostCardProps {
    post: PostWithAuthor;
}

export default function PostCard({ post }: PostCardProps) {
    const readingTime = post.reading_time || calculateReadingTime(post.content);

    return (
        <Link href={`/blogs/${post.slug}`} className="block">
            <motion.article
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="article-card group h-full"
            >
                {/* Featured Image */}
                <div className="relative h-64 overflow-hidden">
                    <Image
                        src={post.featured_image || '/images/blog-tech-future.png'}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

                    {/* Floating badge */}
                    <div className="absolute top-4 right-4 px-4 py-2 rounded-full glass text-white text-sm font-medium">
                        {readingTime} min read
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                    {/* Meta */}
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1.5">
                            <Calendar className="w-4 h-4" />
                            <span>{formatDate(post.published_at || post.created_at)}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <Clock className="w-4 h-4" />
                            <span>{readingTime} min</span>
                        </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl font-serif font-bold text-black group-hover:text-gray-700 transition-all duration-300 line-clamp-2">
                        {post.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-gray-600 line-clamp-3 leading-relaxed">
                        {post.excerpt}
                    </p>

                    {/* Category & Tags */}
                    <div className="flex flex-wrap items-center gap-2">
                        {post.category && (
                            <CategoryBadge category={post.category} size="sm" />
                        )}
                        {post.tags && post.tags.length > 0 && (
                            <>
                                {post.tags.slice(0, 3).map((tag: any) => (
                                    <TagBadge key={tag.id} tag={tag} size="sm" clickable={false} />
                                ))}
                                {post.tags.length > 3 && (
                                    <span className="text-xs text-gray-400">+{post.tags.length - 3}</span>
                                )}
                            </>
                        )}
                    </div>

                    {/* Author & Stats */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                        <div className="flex items-center gap-3">
                            <div className="relative w-10 h-10 rounded-full overflow-hidden ring-2 ring-gray-200">
                                <Image
                                    src={post.author.avatar_url || '/images/author-avatar.png'}
                                    alt={post.author.full_name || 'Author'}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div>
                                <p className="font-medium text-black text-sm">
                                    {post.author.full_name || 'Anonymous'}
                                </p>
                                <p className="text-xs text-gray-500">Author</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 text-gray-500">
                            <div className="flex items-center gap-1.5">
                                <Heart className="w-4 h-4" />
                                <span className="text-sm">{post.likes_count || 0}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <MessageCircle className="w-4 h-4" />
                                <span className="text-sm">{post.comments_count || 0}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.article>
        </Link>
    );
}
