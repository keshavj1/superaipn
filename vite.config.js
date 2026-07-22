import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        /* Everything shipped as one 1.25 MB chunk, so any change to page code
           invalidated the vendor libraries too and returning visitors
           re-downloaded all of it. Splitting the heavy, rarely-changing
           dependencies into their own chunks lets them stay cached across
           deploys — and three.js in particular is only needed by the homepage
           galaxy, so it no longer weighs on any other route.

           Grouped by change cadence rather than by size: react and the router
           move together, three is its own island, the carousels are used by
           only a few pages. */
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'three-vendor': ['three', '@react-three/fiber', '@react-three/drei'],
          'carousel-vendor': ['swiper', 'react-slick', 'slick-carousel'],
        },
      },
    },
    chunkSizeWarningLimit: 700,
  },
})
