"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navigation() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="text-2xl font-serif font-bold text-black">
                        Fikr
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link href="/" className="text-gray-700 hover:text-black transition-colors">
                            Home
                        </Link>
                        <Link href="/blogs" className="text-gray-700 hover:text-black transition-colors">
                            Blogs
                        </Link>
                        <Link href="/about" className="text-gray-700 hover:text-black transition-colors">
                            About
                        </Link>
                        <Link href="/contact" className="text-gray-700 hover:text-black transition-colors">
                            Contact
                        </Link>
                        <Link href="/works" className="text-gray-700 hover:text-black transition-colors">
                            Works
                        </Link>
                        <Link
                            href="/dashboard"
                            className="px-4 py-2 rounded-full bg-black text-white hover:bg-gray-800 transition-colors"
                        >
                            Dashboard
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                        {mobileMenuOpen ? (
                            <X className="w-6 h-6" />
                        ) : (
                            <Menu className="w-6 h-6" />
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="md:hidden bg-white border-t border-gray-100">
                    <div className="px-4 py-4 space-y-3">
                        <Link
                            href="/"
                            className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Home
                        </Link>
                        <Link
                            href="/blogs"
                            className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Blogs
                        </Link>
                        <Link
                            href="/about"
                            className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            About
                        </Link>
                        <Link
                            href="/contact"
                            className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Contact
                        </Link>
                        <Link
                            href="/works"
                            className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Works
                        </Link>
                        <Link
                            href="/dashboard"
                            className="block px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors text-center"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Dashboard
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
}
