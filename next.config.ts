import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async headers() {
    return [
      {
        // Apply these headers to all API routes under /api/
        source: "/api/:path*", 
        headers: [
          // Allow credentials (like cookies, if you were using them)
          { key: "Access-Control-Allow-Credentials", value: "true" },
          // ✅ IMPORTANT: Replace with your actual portfolio domain(s)
          // For local testing, you can add 'http://127.0.0.1:5500'
          // For Hostinger, you'll add your actual domain, e.g., 'https://your-portfolio-domain.com'
          { key: "Access-Control-Allow-Origin", value: "http://127.0.0.1:5500" }, 
          // You can add multiple origins by changing value to a comma-separated list or an array if Next.js supports it directly
          // { key: "Access-Control-Allow-Origin", value: "https://your-portfolio-domain.com, http://127.0.0.1:5500" }, 
          
          // Allowed HTTP methods for your API (POST is essential)
          { key: "Access-Control-Allow-Methods", value: "GET,DELETE,PATCH,POST,PUT" },
          // Allowed request headers
          { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
        ],
      },
    ];
  },
};

export default nextConfig;
