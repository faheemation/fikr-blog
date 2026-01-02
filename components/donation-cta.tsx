"use client";

import { Heart, Sparkles } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function DonationCTA() {
    return (
        <section className="py-24 bg-gradient-to-br from-purple-600 via-pink-600 to-red-600 relative overflow-hidden">
            {/* Animated background */}
            <div className="absolute inset-0 opacity-20">
                <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-300 rounded-full blur-3xl animate-pulse delay-1000"></div>
            </div>

            <div className="container-custom relative z-10">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white/30 mb-8"
                    >
                        <Heart className="w-10 h-10 text-white fill-white" />
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-6"
                    >
                        Love What We Do?
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        viewport={{ once: true }}
                        className="text-xl md:text-2xl text-white/90 mb-12 leading-relaxed"
                    >
                        Your support helps us create thoughtful, in-depth content that explores ideas worth sharing. Every contribution makes a difference.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        viewport={{ once: true }}
                        className="flex flex-col sm:flex-row gap-4 justify-center"
                    >
                        <Link
                            href="/donate"
                            className="group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-white text-purple-600 font-bold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-2xl"
                        >
                            <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                            <span>Support Our Work</span>
                        </Link>
                        <Link
                            href="/donate"
                            className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full border-2 border-white text-white font-bold text-lg hover:bg-white hover:text-purple-600 transition-all duration-300"
                        >
                            <span>Learn More</span>
                        </Link>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        viewport={{ once: true }}
                        className="mt-8 text-white/80 text-sm"
                    >
                        ✨ 100% of donations go directly to supporting our writers and content creation
                    </motion.p>
                </div>
            </div>
        </section>
    );
}
