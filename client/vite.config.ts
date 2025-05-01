import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// Load the correct env file based on the mode (dev or prod)
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    server: {
      proxy: {
        "/api": {
          target: env.VITE_BACKEND_URL,
          changeOrigin: true,
          secure: false,
        },
      },
    },
    plugins: [react()],
  };
});
