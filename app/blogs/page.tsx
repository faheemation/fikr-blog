import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import PostCard from "@/components/post-card";
import { getPosts } from "@/lib/db/posts";
import { Search } from "lucide-react";

interface BlogsPageProps {
    searchParams: Promise<{ page?: string }>;
}

export default async function BlogsPage({ searchParams }: BlogsPageProps) {
    const params = await searchParams;
    const currentPage = Number(params.page) || 1;
    const postsPerPage = 9;

    // Fetch posts
    const { posts, total } = await getPosts(currentPage, postsPerPage);
    const totalPages = Math.ceil(total / postsPerPage);

    return (
        <>
            <Navigation />

            <main className="min-h-screen bg-black pt-16">
                {/* Header */}
                <section className="py-16 bg-black text-white">
                    <div className="container-custom">
                        <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6">
                            All Articles
                        </h1>
                        <p className="text-xl text-white/80 max-w-2xl">
                            Explore our collection of thought-provoking essays on technology, creativity, philosophy, and the human experience.
                        </p>
                    </div>
                </section>

                {/* Stats */}
                <section className="py-8 border-b border-gray-200">
                    <div className="container-custom">
                        <div className="flex items-center justify-between">
                            <p className="text-gray-600">
                                Showing <span className="font-semibold text-black">{posts.length}</span> of{" "}
                                <span className="font-semibold text-black">{total}</span> articles
                            </p>
                            <p className="text-gray-600">
                                Page {currentPage} of {totalPages}
                            </p>
                        </div>
                    </div>
                </section>

                {/* Posts Grid */}
                <section className="py-16">
                    <div className="container-custom">
                        {posts.length > 0 ? (
                            <>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {posts.map((post) => (
                                        <PostCard key={post.id} post={post} />
                                    ))}
                                </div>

                                {/* Pagination */}
                                {totalPages > 1 && (
                                    <div className="mt-16 flex items-center justify-center gap-2">
                                        {/* Previous Button */}
                                        {currentPage > 1 && (
                                            <a
                                                href={`/blogs?page=${currentPage - 1}`}
                                                className="px-6 py-3 rounded-full bg-gray-100 hover:bg-black hover:text-white transition-all duration-300 font-semibold"
                                            >
                                                Previous
                                            </a>
                                        )}

                                        {/* Page Numbers */}
                                        <div className="flex items-center gap-2">
                                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                                                // Show first page, last page, current page, and pages around current
                                                const showPage =
                                                    page === 1 ||
                                                    page === totalPages ||
                                                    (page >= currentPage - 1 && page <= currentPage + 1);

                                                if (!showPage) {
                                                    // Show ellipsis
                                                    if (page === currentPage - 2 || page === currentPage + 2) {
                                                        return (
                                                            <span key={page} className="px-3 text-gray-400">
                                                                ...
                                                            </span>
                                                        );
                                                    }
                                                    return null;
                                                }

                                                return (
                                                    <a
                                                        key={page}
                                                        href={`/blogs?page=${page}`}
                                                        className={`w-12 h-12 flex items-center justify-center rounded-full font-semibold transition-all duration-300 ${page === currentPage
                                                            ? "bg-black text-white"
                                                            : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                                                            }`}
                                                    >
                                                        {page}
                                                    </a>
                                                );
                                            })}
                                        </div>

                                        {/* Next Button */}
                                        {currentPage < totalPages && (
                                            <a
                                                href={`/blogs?page=${currentPage + 1}`}
                                                className="px-6 py-3 rounded-full bg-gray-100 hover:bg-black hover:text-white transition-all duration-300 font-semibold"
                                            >
                                                Next
                                            </a>
                                        )}
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="text-center py-16">
                                <Search className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                                <h3 className="text-2xl font-serif font-bold text-black mb-2">
                                    No articles found
                                </h3>
                                <p className="text-gray-600">
                                    Check back soon for new content!
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
