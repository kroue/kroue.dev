import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: [
    "three",
    "@react-three/fiber",
    "@react-three/drei",
    "@react-three/postprocessing",
  ],

  turbopack: {
    // An empty package-lock.json in C:\Users\User made Turbopack infer the home
    // directory as the workspace root, so pin it to this project instead.
    root: process.cwd(),
  },

  // Development only. Lets another device on the LAN load the dev server's HMR
  // endpoint, which is otherwise blocked as a cross-origin request. Has no
  // effect on a production build.
  allowedDevOrigins: ["192.168.1.15", "192.168.1.*"],
};

export default nextConfig;
