"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import toast from "react-hot-toast";
import { User, Mail, FileText, Save } from "lucide-react";
import ImageUpload from "@/components/image-upload";

export default function ProfilePage() {
    const [user, setUser] = useState<any>(null);
    const [profile, setProfile] = useState<any>(null);
    const [fullName, setFullName] = useState("");
    const [bio, setBio] = useState("");
    const [avatarUrl, setAvatarUrl] = useState("");
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const supabase = createClient();
    const router = useRouter();

    useEffect(() => {
        loadProfile();
    }, []);

    const loadProfile = async () => {
        try {
            const {
                data: { user },
            } = await supabase.auth.getUser();

            if (!user) {
                router.push("/login");
                return;
            }

            setUser(user);

            const { data: profile } = await supabase
                .from("profiles")
                .select("*")
                .eq("id", user.id)
                .single();

            if (profile) {
                setProfile(profile);
                setFullName(profile.full_name || "");
                setBio(profile.bio || "");
                setAvatarUrl(profile.avatar_url || "");
            }
        } catch (error) {
            console.error("Error loading profile:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        try {
            const { error } = await supabase
                .from("profiles")
                .update({
                    full_name: fullName,
                    bio,
                    avatar_url: avatarUrl || null,
                })
                .eq("id", user.id);

            if (error) throw error;

            toast.success("Profile updated successfully!");
            router.refresh();
        } catch (error: any) {
            toast.error(error.message || "Failed to update profile");
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <>
                <Navigation />
                <main className="min-h-screen bg-white pt-20 flex items-center justify-center">
                    <p className="text-gray-600">Loading...</p>
                </main>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Navigation />

            <main className="min-h-screen bg-white pt-20">
                <div className="container-custom py-16 max-w-3xl">
                    <h1 className="text-4xl font-serif font-bold text-black mb-8">My Profile</h1>

                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                        <form onSubmit={handleSave} className="space-y-6">
                            {/* Email (read-only) */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    <div className="flex items-center gap-2">
                                        <Mail className="w-4 h-4" />
                                        Email
                                    </div>
                                </label>
                                <input
                                    type="email"
                                    value={user?.email || ""}
                                    disabled
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 cursor-not-allowed"
                                />
                                <p className="text-sm text-gray-500 mt-1">Email cannot be changed</p>
                            </div>

                            {/* Full Name */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    <div className="flex items-center gap-2">
                                        <User className="w-4 h-4" />
                                        Full Name
                                    </div>
                                </label>
                                <input
                                    type="text"
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                                    placeholder="Your name"
                                />
                            </div>

                            {/* Bio */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    <div className="flex items-center gap-2">
                                        <FileText className="w-4 h-4" />
                                        Bio
                                    </div>
                                </label>
                                <textarea
                                    value={bio}
                                    onChange={(e) => setBio(e.target.value)}
                                    rows={4}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent transition-all resize-none"
                                    placeholder="Tell us about yourself..."
                                />
                            </div>

                            {/* Avatar - Cloudinary Upload */}
                            <ImageUpload
                                label="Profile Picture"
                                value={avatarUrl}
                                onChange={setAvatarUrl}
                                onRemove={() => setAvatarUrl("")}
                                folder="fikr-blog/avatars"
                            />

                            {/* Save Button */}
                            <button
                                type="submit"
                                disabled={saving}
                                className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-black text-white font-semibold hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-300"
                            >
                                <Save className="w-5 h-5" />
                                {saving ? "Saving..." : "Save Changes"}
                            </button>
                        </form>
                    </div>

                    {/* Account Info */}
                    <div className="mt-8 bg-gray-50 rounded-2xl p-6">
                        <h2 className="text-xl font-serif font-bold text-black mb-4">Account Information</h2>
                        <div className="space-y-2 text-sm">
                            <p className="text-gray-600">
                                <span className="font-medium text-black">Role:</span>{" "}
                                {profile?.role === "admin" ? "Administrator" : "User"}
                            </p>
                            <p className="text-gray-600">
                                <span className="font-medium text-black">Member since:</span>{" "}
                                {new Date(profile?.created_at).toLocaleDateString()}
                            </p>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </>
    );
}
