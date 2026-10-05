/** @type {import('next').NextConfig} */
const nextConfig = {
  // The footer shows the date of the build, not the visitor's clock.
  env: { NEXT_PUBLIC_BUILD_DATE: new Date().toISOString() },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    qualities: [75, 100],
  },
}

export default nextConfig
