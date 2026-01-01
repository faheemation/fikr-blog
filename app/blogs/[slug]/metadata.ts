import { Metadata } from 'next';
import { getPostBySlug } from '@/lib/db/posts';

interface BlogPostPageProps {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
    const { slug } = await params;
    const post = await getPostBySlug(slug);

    if (!post) {
        return {
            title: 'Post Not Found',
        };
    }

    return {
        title: `${post.title} | Fikr`,
        description: post.excerpt || post.title,
        openGraph: {
            title: post.title,
            description: post.excerpt || post.title,
            images: post.featured_image ? [post.featured_image] : [],
            type: 'article',
            publishedTime: post.published_at || post.created_at,
            authors: [post.author.full_name || 'Fikr'],
        },
        twitter: {
            card: 'summary_large_image',
            title: post.title,
            description: post.excerpt || post.title,
            images: post.featured_image ? [post.featured_image] : [],
        },
    };
}

export { default } from './page';
