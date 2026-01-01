import type { Metadata } from "next";
import { Inter, Playfair_Display, Noto_Sans_Malayalam } from "next/font/google";
import "./globals.css";
import ToastProvider from "@/components/toast-provider";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
    display: "swap",
});

const playfair = Playfair_Display({
    subsets: ["latin"],
    variable: "--font-playfair",
    display: "swap",
});

const malayalam = Noto_Sans_Malayalam({
    subsets: ["malayalam"],
    variable: "--font-malayalam",
    display: "swap",
});

export const metadata: Metadata = {
    title: "Fikr By Sio Varam - Thoughts & Insights",
    description: "A premium editorial blog featuring deep thoughts, insights, and stories by Sio Varam. Explore articles on technology, philosophy, and creativity.",
    keywords: ["blog", "editorial", "thoughts", "insights", "Sio Varam", "Fikr"],
    authors: [{ name: "Sio Varam" }],
    openGraph: {
        title: "Fikr By Sio Varam",
        description: "A premium editorial blog featuring deep thoughts and insights",
        type: "website",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
            <body className="min-h-screen">
                {children}
                <ToastProvider />
            </body>
        </html>
    );
}
