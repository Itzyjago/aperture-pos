import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Aperture Commerce Cloud — dev server proxies /api to the Express service.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5180,
    proxy: {
      "/api": {
        target: "http://localhost:5181",
        changeOrigin: true,
      },
    },
  },
});
