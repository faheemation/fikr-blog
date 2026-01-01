"use client";

import { useEffect } from "react";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <>
            <Navigation />

            <main className="min-h-screen bg-white pt-20 flex items-center justify-center">
                <div className="container-custom text-center py-24">
                    <h1 className="text-9xl font-serif font-bold text-black mb-4">500</h1>
                    <h2 className="text-3xl font-serif font-bold text-black mb-4">
                        Something went wrong!
                    </h2>
                    <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                        We're sorry, but something unexpected happened. Please try again.
                    </p>
                    <div className="flex items-center justify-center gap-4">
                        <button
                            onClick={reset}
                            className="px-8 py-3 rounded-full bg-black text-white font-semibold hover:bg-gray-800 transition-all duration-300"
                        >
                            Try Again
                        </button>
                        <a
                            href="/"
                            className="px-8 py-3 rounded-full border-2 border-black text-black font-semibold hover:bg-black hover:text-white transition-all duration-300"
                        >
                            Go Home
                        </a>
                    </div>
                </div>
            </main>

            <Footer />
        </>
    );
}
