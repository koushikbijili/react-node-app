import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      "/api": {
        target: "http://52.66.16.153:5000",
        changeOrigin: true
      },
      // Proxy Socket.IO websocket & polling
      "/socket.io": {
        target: "http://52.66.16.153:5000",
        ws: true,
        changeOrigin: true
      }
    }
  }
});
