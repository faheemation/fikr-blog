import Navigation from "@/components/navigation";
import Footer from "@/components/footer";

export default function NotFound() {
    return (
        <>
            <Navigation />

            <main className="min-h-screen bg-white pt-20 flex items-center justify-center">
                <div className="container-custom text-center py-24">
                    <h1 className="text-9xl font-serif font-bold text-black mb-4">404</h1>
                    <h2 className="text-3xl font-serif font-bold text-black mb-4">
                        Page Not Found
                    </h2>
                    <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                        The page you're looking for doesn't exist or has been moved.
                    </p>
                    <div className="flex items-center justify-center gap-4">
                        <a
                            href="/"
                            className="px-8 py-3 rounded-full bg-black text-white font-semibold hover:bg-gray-800 transition-all duration-300"
                        >
                            Go Home
                        </a>
                        <a
                            href="/blogs"
                            className="px-8 py-3 rounded-full border-2 border-black text-black font-semibold hover:bg-black hover:text-white transition-all duration-300"
                        >
                            Browse Articles
                        </a>
                    </div>
                </div>
            </main>

            <Footer />
        </>
    );
}
