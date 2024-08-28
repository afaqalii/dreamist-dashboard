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
          pathname: '/v0/b/dreamistclothing1.appspot.com/**', // Updated to match your Firebase bucket
        },
      ],
    },
  };
  
  export default nextConfig;
  