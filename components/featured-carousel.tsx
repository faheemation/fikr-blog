"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useMotionValue, useTransform, PanInfo } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface FeaturedPost {
    id: string;
    title: string;
    excerpt: string;
    author: {
        name: string;
        avatar: string;
        role: string;
    };
    image: string;
    slug: string;
}

interface FeaturedCarouselProps {
    posts: FeaturedPost[];
}

export default function FeaturedCarousel({ posts }: FeaturedCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);
    const x = useMotionValue(0);

    // Auto-advance carousel
    useEffect(() => {
        const timer = setInterval(() => {
            handleNext();
        }, 6000); // Change slide every 6 seconds

        return () => clearInterval(timer);
    }, [currentIndex]);

    const handleNext = () => {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % posts.length);
    };

    const handlePrev = () => {
        setDirection(-1);
        setCurrentIndex((prev) => (prev - 1 + posts.length) % posts.length);
    };

    // Handle swipe gestures on mobile
    const handleDragEnd = (e: any, { offset, velocity }: PanInfo) => {
        const swipe = Math.abs(offset.x) * velocity.x;

        if (swipe < -10000) {
            handleNext();
        } else if (swipe > 10000) {
            handlePrev();
        }
    };

    const slideVariants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 1000 : -1000,
            opacity: 0,
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
        },
        exit: (direction: number) => ({
            zIndex: 0,
            x: direction < 0 ? 1000 : -1000,
            opacity: 0,
        }),
    };

    const currentPost = posts[currentIndex];

    return (
        <section className="relative w-full h-[500px] sm:h-[600px] lg:h-[700px] bg-black overflow-hidden">
            {/* Background Image with Overlay */}
            <AnimatePresence initial={false} custom={direction}>
                <motion.div
                    key={currentIndex}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                        x: { type: "spring", stiffness: 300, damping: 30 },
                        opacity: { duration: 0.2 },
                    }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={1}
                    onDragEnd={handleDragEnd}
                    className="absolute inset-0 cursor-grab active:cursor-grabbing"
                >
                    <Image
                        src={currentPost.image}
                        alt={currentPost.title}
                        fill
                        className="object-cover"
                        priority
                    />
                    {/* Dark gradient overlay - stronger on mobile */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/40" />
                </motion.div>
            </AnimatePresence>

            {/* Content */}
            <div className="relative z-10 h-full container-custom flex items-end sm:items-center pb-20 sm:pb-0">
                <div className="max-w-3xl w-full">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentIndex}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5 }}
                        >
                            {/* Author Info */}
                            <div className="flex items-center gap-3 mb-4 sm:mb-6">
                                <div className="relative w-12 h-12 sm:w-16 sm:h-16 rounded-full overflow-hidden ring-2 ring-white/20">
                                    <Image
                                        src={currentPost.author.avatar}
                                        alt={currentPost.author.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div>
                                    <p className="text-white font-semibold text-base sm:text-lg">
                                        {currentPost.author.name}
                                    </p>
                                    <p className="text-white/70 text-xs sm:text-sm">
                                        {currentPost.author.role}
                                    </p>
                                </div>
                            </div>

                            {/* Title - Responsive sizing */}
                            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-3 sm:mb-6 leading-tight">
                                {currentPost.title}
                            </h2>

                            {/* Excerpt - Hidden on very small screens */}
                            <p className="hidden sm:block text-lg md:text-xl text-white/80 mb-6 sm:mb-8 leading-relaxed">
                                {currentPost.excerpt}
                            </p>

                            {/* CTA */}
                            <Link
                                href={`/blogs/${currentPost.slug}`}
                                className="inline-flex items-center gap-2 px-6 py-3 sm:px-8 sm:py-4 rounded-full bg-white text-black font-semibold hover:bg-gray-100 transition-all duration-300 text-sm sm:text-base"
                            >
                                Read Article
                                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </Link>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            {/* Dot Indicators */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex gap-2">
                {posts.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => {
                            setDirection(index > currentIndex ? 1 : -1); // Keep original direction logic for dots
                            setCurrentIndex(index);
                        }}
                        className={`h-2 rounded-full transition-all duration-300 ${index === currentIndex
                            ? "w-8 bg-white"
                            : "w-2 bg-white/50 hover:bg-white/75"
                            }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>

            {/* Fikr Branding - Smaller on mobile */}
            <div className="absolute bottom-4 right-4 sm:bottom-8 sm:right-8 z-20">
                <p className="text-white/60 text-xs sm:text-sm font-medium tracking-wider">
                    FIKR
                </p>
            </div>

            {/* Swipe indicator for mobile - fades out after first interaction */}
            <div className="sm:hidden absolute bottom-16 left-1/2 -translate-x-1/2 z-20 text-white/40 text-xs animate-pulse">
                ← Swipe →
            </div>
        </section>
    );
}
