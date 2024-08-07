/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'instagram.fpew1-1.fna.fbcdn.net',
            },
            {
                protocol: 'https',
                hostname:"https://firebasestorage.googleapis.com",
            }
        ],
    },
};

export default nextConfig;
