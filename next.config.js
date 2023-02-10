/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: false,
  images: {
    domains: ['bike-rental-file.s3.ap-southeast-1.amazonaws.com'],
  },
  env: {
    mapKey: 'AIzaSyDemKVk7XsaxU-Vt2jmE1TcRv1rOlL_SNA',
  },
}

module.exports = nextConfig
