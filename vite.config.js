import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "prompt",
      devOptions: {
        enabled: true,
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg,jpg}"],
        cleanupOutdatedCaches: true,
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/api\.coingecko\.com\/api\/v3\/.*/i,
            handler: "StaleWhileRevalidate",
            options: {
              cacheName: "coingecko-api-cache",
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 7, // 7 days
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
        ],
      },
      pwaAssets: {
        image: "public/cryptocoin-app-logo.png",
        preset: "minimal-2023",
      },
      manifest: {
        name: "Cryptocoin App",
        short_name: "CryptoCoin",
        description: "Application for tracking cryptocurrency information",
        theme_color: "#ffffff",
        background_color: "#ffffff",
        display: "standalone",
        scope: "/",
        start_url: "/",
      },
    }),
  ],
});
