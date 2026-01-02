"use client";

import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Heart, Coffee, Star, Sparkles, Users, BookOpen, TrendingUp } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DonatePage() {
    const router = useRouter();
    const [customAmount, setCustomAmount] = useState("");
    const [donorName, setDonorName] = useState("");
    const [donorMessage, setDonorMessage] = useState("");

    const UPI_ID = "faheemabraar@fam";
    const PAYEE_NAME = "Fikr Blog";

    const generateUPILink = (amount: number) => {
        const params = new URLSearchParams({
            pa: UPI_ID,
            pn: PAYEE_NAME,
            am: amount.toString(),
            cu: "INR",
            tn: donorMessage || "Donation to Fikr Blog"
        });
        return `upi://pay?${params.toString()}`;
    };

    const handleDonate = (amount: number) => {
        const upiLink = generateUPILink(amount);
        window.location.href = upiLink;

        // Redirect to thank you page after a short delay
        setTimeout(() => {
            router.push('/donate/thank-you');
        }, 2000);
    };

    const handleCustomDonate = () => {
        const amount = parseFloat(customAmount);
        if (amount && amount > 0) {
            handleDonate(amount);
        } else {
            alert("Please enter a valid amount");
        }
    };

    const donationTiers = [
        {
            icon: Coffee,
            name: "Buy us a Coffee",
            amount: 50,
            description: "Help keep our writers caffeinated and creative",
            color: "from-amber-500 to-orange-600",
        },
        {
            icon: BookOpen,
            name: "Support a Story",
            amount: 200,
            description: "Fund the research and writing of quality articles",
            color: "from-blue-500 to-indigo-600",
            popular: true,
        },
        {
            icon: Star,
            name: "Generous Supporter",
            amount: 500,
            description: "Make a generous one-time contribution (monthly coming soon!)",
            color: "from-purple-500 to-pink-600",
        },
        {
            icon: Sparkles,
            name: "Premium Supporter",
            amount: 1000,
            description: "Make a significant impact on our mission",
            color: "from-emerald-500 to-teal-600",
        },
    ];

    const impactStats = [
        { icon: Users, value: "500+", label: "Readers Reached" },
        { icon: BookOpen, value: "50+", label: "Articles Published" },
        { icon: TrendingUp, value: "Growing", label: "Community Impact" },
    ];

    return (
        <>
            <Navigation />

            <main className="min-h-screen bg-white pt-16">
                {/* Hero Section */}
                <section className="py-24 bg-gradient-to-br from-black via-gray-900 to-black text-white relative overflow-hidden">
                    {/* Animated background elements */}
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500 rounded-full blur-3xl animate-pulse"></div>
                        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500 rounded-full blur-3xl animate-pulse delay-1000"></div>
                    </div>

                    <div className="container-custom relative z-10">
                        <div className="max-w-4xl mx-auto text-center">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
                                <Heart className="w-4 h-4 text-red-400" />
                                <span className="text-sm font-medium">Support Independent Thought</span>
                            </div>

                            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold mb-6 bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
                                Help Us Keep Writing
                            </h1>

                            <p className="text-xl md:text-2xl text-white/80 mb-8 leading-relaxed">
                                Your support enables us to create thoughtful, in-depth content that explores the intersection of technology, philosophy, and the human experience.
                            </p>

                            {/* Impact Stats */}
                            <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto">
                                {impactStats.map((stat) => (
                                    <div key={stat.label} className="text-center">
                                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-3">
                                            <stat.icon className="w-6 h-6" />
                                        </div>
                                        <p className="text-2xl font-bold mb-1">{stat.value}</p>
                                        <p className="text-sm text-white/60">{stat.label}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Optional Donor Info */}
                <section className="py-12 bg-gray-50">
                    <div className="container-custom max-w-2xl">
                        <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-100">
                            <h3 className="text-2xl font-bold text-black mb-4">Leave a Message (Optional)</h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
                                    <input
                                        type="text"
                                        value={donorName}
                                        onChange={(e) => setDonorName(e.target.value)}
                                        placeholder="Anonymous"
                                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-black focus:outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                                    <textarea
                                        value={donorMessage}
                                        onChange={(e) => setDonorMessage(e.target.value)}
                                        placeholder="Your message will appear in the UPI payment description"
                                        rows={3}
                                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-black focus:outline-none"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Donation Tiers */}
                <section className="py-24 bg-gray-50">
                    <div className="container-custom">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl md:text-5xl font-serif font-bold text-black mb-4">
                                Choose Your Support Level
                            </h2>
                            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                                Every contribution, big or small, helps us continue our mission of thoughtful discourse
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
                            {donationTiers.map((tier) => (
                                <div
                                    key={tier.name}
                                    className={`relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 ${tier.popular ? "border-purple-500" : "border-gray-100"
                                        }`}
                                >
                                    {tier.popular && (
                                        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                                            <span className="px-4 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold rounded-full">
                                                MOST POPULAR
                                            </span>
                                        </div>
                                    )}

                                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${tier.color} flex items-center justify-center mb-6`}>
                                        <tier.icon className="w-8 h-8 text-white" />
                                    </div>

                                    <h3 className="text-2xl font-bold text-black mb-2">{tier.name}</h3>
                                    <p className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-4">
                                        ₹{tier.amount}
                                    </p>
                                    <p className="text-gray-600 mb-6 leading-relaxed">{tier.description}</p>

                                    <button
                                        onClick={() => handleDonate(tier.amount)}
                                        className={`w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r ${tier.color} hover:opacity-90 transition-all duration-300 transform hover:scale-105`}
                                    >
                                        Donate Now
                                    </button>
                                </div>
                            ))}
                        </div>

                        {/* Custom Amount */}
                        <div className="mt-12 max-w-2xl mx-auto">
                            <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-100">
                                <h3 className="text-2xl font-bold text-black mb-4 text-center">Custom Amount</h3>
                                <p className="text-gray-600 text-center mb-6">
                                    Choose your own amount to support our work
                                </p>
                                <div className="flex gap-4">
                                    <div className="flex-1">
                                        <input
                                            type="number"
                                            value={customAmount}
                                            onChange={(e) => setCustomAmount(e.target.value)}
                                            placeholder="Enter amount (₹)"
                                            className="w-full px-6 py-4 rounded-xl border-2 border-gray-200 focus:border-black focus:outline-none text-lg"
                                        />
                                    </div>
                                    <button
                                        onClick={handleCustomDonate}
                                        className="px-8 py-4 rounded-xl font-semibold text-white bg-gradient-to-r from-black to-gray-800 hover:from-gray-800 hover:to-gray-700 transition-all duration-300"
                                    >
                                        Donate
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Why Support Us */}
                <section className="py-24 bg-white">
                    <div className="container-custom max-w-4xl">
                        <h2 className="text-4xl md:text-5xl font-serif font-bold text-black mb-12 text-center">
                            Why Your Support Matters
                        </h2>

                        <div className="space-y-8">
                            {[
                                {
                                    title: "Independent Voices",
                                    description: "We're not backed by corporations or advertisers. Your support keeps us independent and focused on quality over clicks.",
                                },
                                {
                                    title: "Deep Research",
                                    description: "Quality journalism takes time. Your donations allow our writers to dive deep into topics that matter.",
                                },
                                {
                                    title: "Community Building",
                                    description: "We're building a community of thoughtful readers and writers. Your support helps us grow this space for meaningful dialogue.",
                                },
                                {
                                    title: "Free for All",
                                    description: "We believe knowledge should be accessible. Your support helps us keep all our content free for everyone.",
                                },
                            ].map((item, index) => (
                                <div key={index} className="flex gap-6 items-start">
                                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-xl">
                                        {index + 1}
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-black mb-2">{item.title}</h3>
                                        <p className="text-gray-600 leading-relaxed">{item.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-24 bg-gradient-to-br from-black via-gray-900 to-black text-white">
                    <div className="container-custom text-center">
                        <Heart className="w-16 h-16 mx-auto mb-6 text-red-400" />
                        <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">
                            Every Contribution Counts
                        </h2>
                        <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
                            Payments are processed securely through UPI. Your donation goes directly to supporting our content creation.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button
                                onClick={() => handleDonate(100)}
                                className="px-8 py-4 rounded-full font-semibold text-black bg-white hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
                            >
                                Donate ₹100
                            </button>
                            <Link
                                href="/blogs"
                                className="px-8 py-4 rounded-full font-semibold text-white border-2 border-white hover:bg-white hover:text-black transition-all duration-300"
                            >
                                Read Our Articles
                            </Link>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}
