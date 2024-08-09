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
                hostname: 'firebasestorage.googleapis.com',
                pathname: '/v0/b/dreamist-dashboard.appspot.com/**', // Allow all paths under this Firebase storage bucket
            },
        ],
    },
};

export default nextConfig;
