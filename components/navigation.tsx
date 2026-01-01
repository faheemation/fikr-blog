"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, User, LogOut, LayoutDashboard, ChevronDown } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Navigation() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [user, setUser] = useState<any>(null);
    const [profile, setProfile] = useState<any>(null);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const router = useRouter();
    const supabase = createClient();

    useEffect(() => {
        const getUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);

            if (user) {
                const { data: profileData } = await supabase
                    .from("profiles")
                    .select("*")
                    .eq("id", user.id)
                    .single();
                setProfile(profileData);
            }
        };

        getUser();

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
            if (session?.user) {
                supabase
                    .from("profiles")
                    .select("*")
                    .eq("id", session.user.id)
                    .single()
                    .then(({ data }) => setProfile(data));
            } else {
                setProfile(null);
            }
        });

        return () => subscription.unsubscribe();
    }, []);

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        setUserMenuOpen(false);
        router.push("/");
        router.refresh();
    };

    const isAdmin = profile?.role === "admin";

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/10 shadow-2xl">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center hover:opacity-80 transition-opacity duration-300">
                        <Image
                            src="/fikr-logo.png"
                            alt="Fikr"
                            width={120}
                            height={40}
                            className="h-10 w-auto"
                            priority
                        />
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-1">
                        <Link
                            href="/"
                            className="px-4 py-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200 font-medium"
                        >
                            Home
                        </Link>
                        <Link
                            href="/blogs"
                            className="px-4 py-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200 font-medium"
                        >
                            Blogs
                        </Link>
                        <Link
                            href="/about"
                            className="px-4 py-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200 font-medium"
                        >
                            About
                        </Link>
                        <Link
                            href="/contact"
                            className="px-4 py-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200 font-medium"
                        >
                            Contact
                        </Link>
                        <Link
                            href="/works"
                            className="px-4 py-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200 font-medium"
                        >
                            Works
                        </Link>

                        {/* Auth Section */}
                        {user ? (
                            <div className="relative ml-4">
                                <button
                                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                                    className="flex items-center gap-3 px-4 py-2 rounded-full bg-gradient-to-r from-white/20 to-white/10 hover:from-white/30 hover:to-white/20 text-white shadow-lg hover:shadow-xl backdrop-blur-sm border border-white/20 transition-all duration-300 group"
                                >
                                    {profile?.avatar_url ? (
                                        <Image
                                            src={profile.avatar_url}
                                            alt="Avatar"
                                            width={24}
                                            height={24}
                                            className="rounded-full ring-2 ring-white/30"
                                        />
                                    ) : (
                                        <div className="w-6 h-6 rounded-full bg-white/30 flex items-center justify-center">
                                            <User className="w-4 h-4" />
                                        </div>
                                    )}
                                    <span className="text-sm font-semibold">
                                        {profile?.full_name || user.email?.split("@")[0]}
                                    </span>
                                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${userMenuOpen ? 'rotate-180' : ''}`} />
                                </button>

                                {/* Premium User Dropdown */}
                                {userMenuOpen && (
                                    <>
                                        <div
                                            className="fixed inset-0 z-10"
                                            onClick={() => setUserMenuOpen(false)}
                                        />
                                        <div className="absolute right-0 mt-3 w-64 bg-gray-900/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 py-2 z-20 animate-in fade-in slide-in-from-top-2 duration-200">
                                            {/* User Info Header */}
                                            <div className="px-4 py-3 border-b border-white/10">
                                                <p className="text-sm font-semibold text-white">
                                                    {profile?.full_name || "User"}
                                                </p>
                                                <p className="text-xs text-white/60 mt-0.5">
                                                    {user.email}
                                                </p>
                                                {isAdmin && (
                                                    <span className="inline-block mt-2 px-2 py-0.5 text-xs font-medium bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full">
                                                        Admin
                                                    </span>
                                                )}
                                            </div>

                                            {/* Menu Items */}
                                            <div className="py-2">
                                                {isAdmin && (
                                                    <Link
                                                        href="/dashboard"
                                                        className="flex items-center gap-3 px-4 py-2.5 text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200 group"
                                                        onClick={() => setUserMenuOpen(false)}
                                                    >
                                                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                                                            <LayoutDashboard className="w-4 h-4 text-white" />
                                                        </div>
                                                        <span className="font-medium">Dashboard</span>
                                                    </Link>
                                                )}
                                                <Link
                                                    href="/profile"
                                                    className="flex items-center gap-3 px-4 py-2.5 text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200 group"
                                                    onClick={() => setUserMenuOpen(false)}
                                                >
                                                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                                                        <User className="w-4 h-4 text-white" />
                                                    </div>
                                                    <span className="font-medium">Profile</span>
                                                </Link>
                                            </div>

                                            {/* Sign Out */}
                                            <div className="border-t border-white/10 pt-2">
                                                <button
                                                    onClick={handleSignOut}
                                                    className="w-full flex items-center gap-3 px-4 py-2.5 text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all duration-200 group"
                                                >
                                                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                                                        <LogOut className="w-4 h-4 text-white" />
                                                    </div>
                                                    <span className="font-medium">Sign Out</span>
                                                </button>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        ) : (
                            <Link
                                href="/login"
                                className="ml-4 px-6 py-2.5 rounded-full bg-gradient-to-r from-white to-gray-100 hover:from-gray-100 hover:to-white text-black font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                            >
                                Sign In
                            </Link>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden p-2 rounded-xl hover:bg-white/10 transition-all duration-200"
                    >
                        {mobileMenuOpen ? (
                            <X className="w-6 h-6 text-white" />
                        ) : (
                            <Menu className="w-6 h-6 text-white" />
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="md:hidden bg-black/95 backdrop-blur-xl border-t border-white/10 shadow-lg">
                    <div className="px-4 py-4 space-y-2">
                        <Link
                            href="/"
                            className="block px-4 py-2.5 text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200 font-medium"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Home
                        </Link>
                        <Link
                            href="/blogs"
                            className="block px-4 py-2.5 text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200 font-medium"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Blogs
                        </Link>
                        <Link
                            href="/about"
                            className="block px-4 py-2.5 text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200 font-medium"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            About
                        </Link>
                        <Link
                            href="/contact"
                            className="block px-4 py-2.5 text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200 font-medium"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Contact
                        </Link>
                        <Link
                            href="/works"
                            className="block px-4 py-2.5 text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200 font-medium"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Works
                        </Link>

                        {/* Mobile Auth Section */}
                        {user ? (
                            <div className="pt-4 border-t border-white/10 space-y-2">
                                {/* User Info */}
                                <div className="px-4 py-3 bg-white/10 rounded-xl backdrop-blur-sm">
                                    <p className="text-sm font-semibold text-white">
                                        {profile?.full_name || "User"}
                                    </p>
                                    <p className="text-xs text-white/60 mt-0.5">
                                        {user.email}
                                    </p>
                                </div>

                                {isAdmin && (
                                    <Link
                                        href="/dashboard"
                                        className="flex items-center gap-3 px-4 py-2.5 text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        <LayoutDashboard className="w-5 h-5" />
                                        <span className="font-medium">Dashboard</span>
                                    </Link>
                                )}
                                <Link
                                    href="/profile"
                                    className="flex items-center gap-3 px-4 py-2.5 text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    <User className="w-5 h-5" />
                                    <span className="font-medium">Profile</span>
                                </Link>
                                <button
                                    onClick={() => {
                                        handleSignOut();
                                        setMobileMenuOpen(false);
                                    }}
                                    className="w-full flex items-center gap-3 px-4 py-2.5 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl transition-all duration-200"
                                >
                                    <LogOut className="w-5 h-5" />
                                    <span className="font-medium">Sign Out</span>
                                </button>
                            </div>
                        ) : (
                            <Link
                                href="/login"
                                className="block px-4 py-3 bg-gradient-to-r from-white to-gray-100 text-black rounded-xl hover:from-gray-100 hover:to-white transition-all duration-300 text-center font-semibold shadow-lg mt-4"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Sign In
                            </Link>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}
