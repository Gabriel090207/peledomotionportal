import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/ixapi": {
        target: "http://127.0.0.1:53200",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/ixapi/, ""),
      },
    },
  },
});
