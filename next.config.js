/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        // Use Cloudinary for images instead of Vercel's image optimization
        unoptimized: false,
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
            },
            {
                protocol: 'https',
                hostname: 'drwjrgthonfxgwoikegx.supabase.co',
            },
        ],
        // Reduce image optimization quality to save bandwidth
        formats: ['image/webp'],
        deviceSizes: [640, 750, 828, 1080, 1200],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
        // Cache optimized images for 1 year
        minimumCacheTTL: 31536000,
    },
    // Enable static page generation where possible
    output: 'standalone',
}

module.exports = nextConfig
