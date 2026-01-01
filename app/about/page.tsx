import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Users, BookOpen, Target, Heart } from "lucide-react";

export default function AboutPage() {
    return (
        <>
            <Navigation />

            <main className="min-h-screen bg-white pt-16">
                {/* Hero */}
                <section className="py-24 bg-black text-white">
                    <div className="container-custom">
                        <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6">
                            About Fikr
                        </h1>
                        <p className="text-xl text-white/80 max-w-3xl">
                            A platform for thoughtful discourse, where students from Sio Varam share ideas at the intersection of technology, philosophy, creativity, and the human experience.
                        </p>
                    </div>
                </section>

                {/* Mission */}
                <section className="py-24">
                    <div className="container-custom max-w-4xl">
                        <h2 className="text-4xl font-serif font-bold text-black mb-8">Our Mission</h2>
                        <p className="text-xl text-gray-700 leading-relaxed mb-6">
                            Fikr (Arabic for "thought" or "idea") is a collaborative blog run by students of the Students Islamic Organisation (SIO) Varam. We believe in the power of ideas to shape our understanding of the world and our place in it.
                        </p>
                        <p className="text-xl text-gray-700 leading-relaxed">
                            Through thoughtful essays, deep dives, and personal reflections, we explore topics that matter—from emerging technologies and their impact on society, to timeless philosophical questions, to the creative process itself.
                        </p>
                    </div>
                </section>

                {/* Values */}
                <section className="py-24 bg-gray-50">
                    <div className="container-custom">
                        <h2 className="text-4xl font-serif font-bold text-black mb-12 text-center">
                            What We Stand For
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {[
                                {
                                    icon: BookOpen,
                                    title: "Thoughtful Discourse",
                                    description: "We value depth over speed, nuance over noise, and understanding over quick takes.",
                                },
                                {
                                    icon: Users,
                                    title: "Diverse Voices",
                                    description: "Multiple writers bring different perspectives, experiences, and areas of expertise.",
                                },
                                {
                                    icon: Target,
                                    title: "Quality Content",
                                    description: "Every article is carefully crafted, researched, and edited to provide real value.",
                                },
                                {
                                    icon: Heart,
                                    title: "Human-Centered",
                                    description: "Technology and ideas should serve humanity, not the other way around.",
                                },
                            ].map((value) => {
                                const Icon = value.icon;
                                return (
                                    <div key={value.title} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                                        <div className="bg-black p-3 rounded-xl w-fit mb-4">
                                            <Icon className="w-6 h-6 text-white" />
                                        </div>
                                        <h3 className="text-xl font-serif font-bold text-black mb-3">
                                            {value.title}
                                        </h3>
                                        <p className="text-gray-600 leading-relaxed">
                                            {value.description}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* About SIO Varam */}
                <section className="py-24">
                    <div className="container-custom max-w-4xl">
                        <h2 className="text-4xl font-serif font-bold text-black mb-8">About Sio Varam</h2>
                        <p className="text-xl text-gray-700 leading-relaxed mb-6">
                            The Students Islamic Organisation (SIO) is a student movement working towards building a value-based society. Sio Varam is our local chapter, bringing together students who are passionate about learning, growth, and positive change.
                        </p>
                        <p className="text-xl text-gray-700 leading-relaxed">
                            Fikr represents our commitment to intellectual engagement and thoughtful dialogue. We believe that the best ideas emerge from honest inquiry, respectful debate, and a willingness to question our assumptions.
                        </p>
                    </div>
                </section>

                {/* CTA */}
                <section className="py-24 bg-black text-white">
                    <div className="container-custom text-center">
                        <h2 className="text-4xl font-serif font-bold mb-6">
                            Join the Conversation
                        </h2>
                        <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
                            Read our latest articles, share your thoughts, and be part of a community that values deep thinking and meaningful dialogue.
                        </p>
                        <a
                            href="/blogs"
                            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-black font-semibold hover:bg-gray-100 transition-all duration-300"
                        >
                            Explore Articles
                        </a>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}
