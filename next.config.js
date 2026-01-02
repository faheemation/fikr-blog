/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        unoptimized: true, // Disable Next.js image optimization to fix Cloudinary image display
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
        deviceSizes: [640, 750, 828, 1080, 1200],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
        // Cache optimized images for 1 year
        minimumCacheTTL: 31536000,
    },
}

module.exports = nextConfig
