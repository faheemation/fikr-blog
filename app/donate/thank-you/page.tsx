import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Heart, CheckCircle, Share2, Mail } from "lucide-react";
import Link from "next/link";

export default function ThankYouPage() {
    return (
        <>
            <Navigation />

            <main className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-white pt-16">
                <section className="py-24">
                    <div className="container-custom max-w-3xl text-center">
                        {/* Success Icon */}
                        <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 mb-8 animate-bounce">
                            <CheckCircle className="w-12 h-12 text-white" />
                        </div>

                        {/* Thank You Message */}
                        <h1 className="text-5xl md:text-6xl font-serif font-bold text-black mb-6">
                            Thank You! ❤️
                        </h1>

                        <p className="text-2xl text-gray-700 mb-4">
                            Your generosity means the world to us
                        </p>

                        <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
                            Your support helps us continue creating thoughtful, in-depth content. We're grateful to have you as part of our community!
                        </p>

                        {/* What's Next */}
                        <div className="bg-white rounded-2xl p-8 shadow-xl border-2 border-gray-100 mb-12">
                            <h2 className="text-2xl font-bold text-black mb-6">What Happens Next?</h2>
                            <div className="space-y-4 text-left">
                                <div className="flex gap-4 items-start">
                                    <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0 mt-1">
                                        <span className="text-purple-600 font-bold">1</span>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-black mb-1">Payment Confirmation</h3>
                                        <p className="text-gray-600">Check your UPI app for payment confirmation</p>
                                    </div>
                                </div>
                                <div className="flex gap-4 items-start">
                                    <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0 mt-1">
                                        <span className="text-purple-600 font-bold">2</span>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-black mb-1">We Receive Your Support</h3>
                                        <p className="text-gray-600">Your donation goes directly to supporting our writers</p>
                                    </div>
                                </div>
                                <div className="flex gap-4 items-start">
                                    <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0 mt-1">
                                        <span className="text-purple-600 font-bold">3</span>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-black mb-1">Keep Reading</h3>
                                        <p className="text-gray-600">Enjoy our latest articles and join the conversation</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                            <Link
                                href="/blogs"
                                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-black text-white font-semibold hover:bg-gray-800 transition-all duration-300 transform hover:scale-105"
                            >
                                Read Our Articles
                            </Link>
                            <Link
                                href="/"
                                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border-2 border-black text-black font-semibold hover:bg-black hover:text-white transition-all duration-300"
                            >
                                Back to Home
                            </Link>
                        </div>

                        {/* Share */}
                        <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-8">
                            <h3 className="text-xl font-bold text-black mb-4">Help Us Grow</h3>
                            <p className="text-gray-700 mb-6">
                                Know someone who'd love our content? Share Fikr with them!
                            </p>
                            <div className="flex gap-4 justify-center">
                                <a
                                    href={`mailto:?subject=Check out Fikr Blog&body=I just supported Fikr Blog and thought you might enjoy their thoughtful articles: ${typeof window !== 'undefined' ? window.location.origin : ''}`}
                                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-medium hover:shadow-lg transition-all"
                                >
                                    <Mail className="w-5 h-5" />
                                    Share via Email
                                </a>
                            </div>
                        </div>

                        {/* Heart */}
                        <div className="mt-12">
                            <Heart className="w-16 h-16 mx-auto text-red-500 fill-red-500 animate-pulse" />
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}
