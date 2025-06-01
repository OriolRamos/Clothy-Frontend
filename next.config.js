/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true, // Modo estricto de React
    images: {
        domains: [
            'static.zara.net',
            'static.bershka.net',
            'static.stradivarius.net',
            'static.pullandbear.com',
            'static.oysho.com',
            'static.oysho.net'
        ],
        // Optimització: servir en formats moderns i cache TTL
        formats: ['image/avif', 'image/webp'],
        minimumCacheTTL: 60 // segons
    }
};

module.exports = nextConfig;
