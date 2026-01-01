"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Hero() {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-neutral-900/50 via-black to-neutral-900/50" />

            {/* Floating orbs with white glow */}
            <div className="absolute top-20 left-10 w-96 h-96 bg-white/5 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-float" />
            <div className="absolute top-40 right-10 w-96 h-96 bg-white/5 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-float" style={{ animationDelay: "2s" }} />
            <div className="absolute -bottom-8 left-1/2 w-96 h-96 bg-white/5 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-float" style={{ animationDelay: "4s" }} />

            {/* Content */}
            <div className="relative z-10 container-custom text-center py-32">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="inline-block mb-6"
                    >
                        <span className="px-6 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white font-medium text-sm">
                            Welcome to Fikr
                        </span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="text-display font-serif font-bold mb-6 text-white"
                    >
                        Thoughts That
                        <br />
                        Shape Tomorrow
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto mb-12 leading-relaxed"
                    >
                        Dive into a world of deep insights, creative explorations, and transformative ideas.
                        <br />
                        <span className="text-white font-semibold">By Sio Varam</span>
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.7 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4"
                    >
                        <Link
                            href="/blogs"
                            className="group px-8 py-4 rounded-full font-semibold bg-white text-dark-900 hover:bg-white/90 transition-all duration-300 hover:shadow-2xl hover:shadow-white/20 inline-flex items-center gap-2"
                            id="hero-explore-button"
                        >
                            <span>Explore Articles</span>
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>

                        <Link
                            href="/about"
                            className="px-8 py-4 rounded-full font-semibold border-2 border-white text-white hover:bg-white hover:text-dark-900 transition-all duration-300"
                            id="hero-about-button"
                        >
                            About Me
                        </Link>
                    </motion.div>
                </motion.div>

                {/* Scroll indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1.5 }}
                    className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
                >
                    <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-6 h-10 rounded-full border-2 border-white/50 flex items-start justify-center p-2"
                    >
                        <motion.div
                            animate={{ y: [0, 12, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="w-1.5 h-1.5 rounded-full bg-white"
                        />
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
