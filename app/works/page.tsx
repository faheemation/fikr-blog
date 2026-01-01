import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Briefcase, ExternalLink } from "lucide-react";

export default function WorksPage() {
    const works = [
        {
            title: "Fikr Blog Platform",
            description: "A premium editorial blog platform built with Next.js, Supabase, and modern web technologies. Features include markdown editing, real-time collaboration, and analytics.",
            tags: ["Next.js", "Supabase", "TypeScript", "Tailwind CSS"],
            link: "/",
        },
        // Add more projects as needed
    ];

    return (
        <>
            <Navigation />

            <main className="min-h-screen bg-white pt-20">
                {/* Hero */}
                <section className="py-24 bg-black text-white">
                    <div className="container-custom">
                        <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6">
                            Our Works
                        </h1>
                        <p className="text-xl text-white/80 max-w-2xl">
                            Projects and initiatives by the Sio Varam community
                        </p>
                    </div>
                </section>

                {/* Works Grid */}
                <section className="py-24">
                    <div className="container-custom">
                        {works.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {works.map((work, index) => (
                                    <div
                                        key={index}
                                        className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300"
                                    >
                                        <div className="p-8">
                                            <div className="bg-black p-3 rounded-xl w-fit mb-4">
                                                <Briefcase className="w-6 h-6 text-white" />
                                            </div>
                                            <h3 className="text-2xl font-serif font-bold text-black mb-3">
                                                {work.title}
                                            </h3>
                                            <p className="text-gray-600 mb-4 leading-relaxed">
                                                {work.description}
                                            </p>
                                            <div className="flex flex-wrap gap-2 mb-4">
                                                {work.tags.map((tag) => (
                                                    <span
                                                        key={tag}
                                                        className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                                                    >
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                            <a
                                                href={work.link}
                                                className="inline-flex items-center gap-2 text-black hover:underline font-medium"
                                            >
                                                View Project
                                                <ExternalLink className="w-4 h-4" />
                                            </a>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-16">
                                <Briefcase className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                                <h3 className="text-2xl font-serif font-bold text-black mb-2">
                                    More projects coming soon
                                </h3>
                                <p className="text-gray-600">
                                    We're working on exciting new initiatives. Check back later!
                                </p>
                            </div>
                        )}
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}
