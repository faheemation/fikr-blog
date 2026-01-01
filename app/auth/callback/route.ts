import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const requestUrl = new URL(request.url);
    const code = requestUrl.searchParams.get("code");
    const origin = requestUrl.origin;

    if (code) {
        const supabase = await createClient();

        // Exchange code for session
        const { data, error } = await supabase.auth.exchangeCodeForSession(code);

        if (error) {
            console.error("Auth callback error:", error);
            return NextResponse.redirect(`${origin}/login?error=${error.message}`);
        }

        if (data.user) {
            // Check if profile exists, if not create it
            const { data: existingProfile } = await supabase
                .from("profiles")
                .select("id")
                .eq("id", data.user.id)
                .single();

            if (!existingProfile) {
                // Create profile for new user
                await supabase.from("profiles").insert({
                    id: data.user.id,
                    email: data.user.email,
                    full_name: data.user.user_metadata?.full_name || data.user.user_metadata?.name || null,
                    avatar_url: data.user.user_metadata?.avatar_url || data.user.user_metadata?.picture || null,
                    role: "user",
                });
            }

            // Get user role
            const { data: profile } = await supabase
                .from("profiles")
                .select("role")
                .eq("id", data.user.id)
                .single();

            // Redirect based on role
            if (profile?.role === "admin") {
                return NextResponse.redirect(`${origin}/dashboard`);
            } else {
                return NextResponse.redirect(`${origin}/`);
            }
        }
    }

    // If no code or something went wrong, redirect to login
    return NextResponse.redirect(`${origin}/login`);
}
