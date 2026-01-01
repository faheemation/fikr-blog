"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Github, Twitter, Linkedin, Mail } from "lucide-react";

const socialLinks = [
    { icon: Github, href: "https://github.com", label: "GitHub" },
    { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
    { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
    { icon: Mail, href: "mailto:contact@fikr.blog", label: "Email" },
];

const footerLinks = {
    explore: [
        { label: "Home", href: "/" },
        { label: "All Blogs", href: "/blogs" },
        { label: "Works", href: "/works" },
    ],
    about: [
        { label: "About Me", href: "/about" },
        { label: "Contact", href: "/contact" },
        { label: "Dashboard", href: "/dashboard" },
    ],
};

export default function Footer() {
    return (
        <footer className="relative bg-neutral-900 text-gray-300 overflow-hidden">
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-neutral-900 to-black/50" />

            <div className="relative container-custom py-16">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    {/* Brand */}
                    <div className="md:col-span-2">
                        <Link href="/" className="inline-block mb-4">
                            <div className="relative h-16 w-40">
                                <Image
                                    src="/images/fikr-logo.png"
                                    alt="Fikr"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        </Link>
                        <p className="text-gray-400 mb-6 max-w-md">
                            A premium editorial blog featuring deep thoughts, insights, and stories that shape tomorrow.
                        </p>

                        {/* Social Links */}
                        <div className="flex items-center gap-3">
                            {socialLinks.map((social) => (
                                <motion.a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.1, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="p-3 rounded-full bg-neutral-800 hover:bg-white transition-all duration-300 group border border-neutral-700 hover:border-white"
                                    aria-label={social.label}
                                >
                                    <social.icon className="w-5 h-5 text-gray-400 group-hover:text-black transition-colors" />
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    {/* Explore */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">Explore</h3>
                        <ul className="space-y-2">
                            {footerLinks.explore.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-gray-400 hover:text-white transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* About */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">About</h3>
                        <ul className="space-y-2">
                            {footerLinks.about.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-gray-400 hover:text-white transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Newsletter */}
                <div className="mb-12 p-8 rounded-2xl bg-neutral-800/50 backdrop-blur-sm border border-neutral-700">
                    <div className="max-w-2xl mx-auto text-center">
                        <h3 className="text-2xl font-serif font-bold text-white mb-2">
                            Stay Updated
                        </h3>
                        <p className="text-gray-400 mb-6">
                            Get the latest articles and insights delivered to your inbox.
                        </p>
                        <form className="flex flex-col sm:flex-row gap-3">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 px-6 py-3 rounded-full bg-neutral-900 border border-neutral-700 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
                                id="newsletter-email-input"
                            />
                            <button
                                type="submit"
                                className="px-8 py-3 rounded-full font-semibold bg-white text-black hover:bg-gray-100 transition-all duration-300 whitespace-nowrap"
                                id="newsletter-submit-button"
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>

                {/* Bottom */}
                <div className="pt-8 border-t border-neutral-800 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-gray-500 text-sm">
                        © {new Date().getFullYear()} Fikr By Sio Varam. All rights reserved.
                    </p>
                    <div className="flex items-center gap-6 text-sm">
                        <Link href="/privacy" className="text-gray-500 hover:text-white transition-colors">
                            Privacy Policy
                        </Link>
                        <Link href="/terms" className="text-gray-500 hover:text-white transition-colors">
                            Terms of Service
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
