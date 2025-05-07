/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true, // Modo estricto de React
    images: {
        domains: [
            'static.zara.net',
            'static.bershka.net',
            'static.stradivarius.net',
            'static.pullandbear.com',
            'static.oysho.com'
        ]
    }
};

module.exports = nextConfig;
