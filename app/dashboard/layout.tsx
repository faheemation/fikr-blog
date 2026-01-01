import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { LayoutDashboard, FileText, Settings, LogOut, BarChart3, Users, FolderOpen, Hash } from "lucide-react";

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login");
    }

    // Get user profile
    const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

    // Check if user is admin
    if (!profile || profile.role !== "admin") {
        redirect("/");
    }

    const navigation = [
        { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
        { name: "Posts", href: "/dashboard/posts", icon: FileText },
        { name: "Categories", href: "/dashboard/categories", icon: FolderOpen },
        { name: "Tags", href: "/dashboard/tags", icon: Hash },
        { name: "Authors", href: "/dashboard/authors", icon: Users },
        { name: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
        { name: "Profile", href: "/dashboard/profile", icon: Settings },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Sidebar - Hidden on mobile, visible on desktop */}
            <aside className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:w-64 lg:block bg-black text-white">
                <div className="flex flex-col h-full">
                    {/* Logo */}
                    <div className="p-6 border-b border-white/10">
                        <Link href="/" className="text-2xl font-serif font-bold">
                            Fikr Dashboard
                        </Link>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                        {navigation.map((item) => {
                            const Icon = item.icon;
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors"
                                >
                                    <Icon className="w-5 h-5" />
                                    <span>{item.name}</span>
                                </Link>
                            );
                        })}
                    </nav>

                    {/* User Profile */}
                    <div className="p-4 border-t border-white/10">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                                <span className="text-sm font-semibold">
                                    {profile?.full_name?.[0] || user.email?.[0].toUpperCase()}
                                </span>
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium truncate">
                                    {profile?.full_name || "User"}
                                </p>
                                <p className="text-xs text-white/60 truncate">{user.email}</p>
                            </div>
                        </div>
                        <form action="/auth/signout" method="post">
                            <button
                                type="submit"
                                className="w-full flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-sm"
                            >
                                <LogOut className="w-4 h-4" />
                                <span>Logout</span>
                            </button>
                        </form>
                    </div>
                </div>
            </aside>

            {/* Mobile Bottom Navigation */}
            <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-black text-white border-t border-white/10 z-50">
                <div className="flex items-center justify-around px-2 py-3">
                    {navigation.slice(0, 5).map((item) => {
                        const Icon = item.icon;
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="flex flex-col items-center gap-1 px-3 py-2 rounded-lg hover:bg-white/10 transition-colors min-w-0"
                            >
                                <Icon className="w-5 h-5 flex-shrink-0" />
                                <span className="text-xs truncate max-w-full">{item.name}</span>
                            </Link>
                        );
                    })}
                </div>
            </nav>

            {/* Main Content */}
            <div className="lg:ml-64 pb-20 lg:pb-0">
                <main className="p-4 sm:p-6 lg:p-8">{children}</main>
            </div>
        </div>
    );
}

