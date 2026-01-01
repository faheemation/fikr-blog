"use client";

import { useState } from "react";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import toast from "react-hot-toast";
import { Mail, MessageSquare, Send } from "lucide-react";

export default function ContactPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Simulate form submission
        setTimeout(() => {
            toast.success("Message sent! We'll get back to you soon.");
            setName("");
            setEmail("");
            setMessage("");
            setLoading(false);
        }, 1000);
    };

    return (
        <>
            <Navigation />

            <main className="min-h-screen bg-white pt-20">
                {/* Hero */}
                <section className="py-24 bg-black text-white">
                    <div className="container-custom">
                        <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6">
                            Get in Touch
                        </h1>
                        <p className="text-xl text-white/80 max-w-2xl">
                            Have questions, suggestions, or want to contribute? We'd love to hear from you.
                        </p>
                    </div>
                </section>

                {/* Contact Form */}
                <section className="py-24">
                    <div className="container-custom max-w-4xl">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                            {/* Form */}
                            <div>
                                <h2 className="text-3xl font-serif font-bold text-black mb-6">
                                    Send us a message
                                </h2>
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Name
                                        </label>
                                        <input
                                            type="text"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            required
                                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                                            placeholder="Your name"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                                            placeholder="your@email.com"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Message
                                        </label>
                                        <textarea
                                            value={message}
                                            onChange={(e) => setMessage(e.target.value)}
                                            required
                                            rows={6}
                                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent transition-all resize-none"
                                            placeholder="Your message..."
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full px-6 py-3 rounded-full bg-black text-white font-semibold hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-2"
                                    >
                                        <Send className="w-5 h-5" />
                                        {loading ? "Sending..." : "Send Message"}
                                    </button>
                                </form>
                            </div>

                            {/* Info */}
                            <div className="space-y-8">
                                <div>
                                    <h2 className="text-3xl font-serif font-bold text-black mb-6">
                                        Other ways to connect
                                    </h2>
                                    <div className="space-y-6">
                                        <div className="flex items-start gap-4">
                                            <div className="bg-black p-3 rounded-xl">
                                                <Mail className="w-6 h-6 text-white" />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-black mb-1">Email</h3>
                                                <p className="text-gray-600">contact@fikr.blog</p>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-4">
                                            <div className="bg-black p-3 rounded-xl">
                                                <MessageSquare className="w-6 h-6 text-white" />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-black mb-1">Contribute</h3>
                                                <p className="text-gray-600">
                                                    Interested in writing for Fikr? Reach out to discuss your ideas.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-gray-50 p-8 rounded-2xl">
                                    <h3 className="font-serif font-bold text-xl text-black mb-3">
                                        Response Time
                                    </h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        We typically respond within 24-48 hours. For urgent matters, please mention it in your message.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}
