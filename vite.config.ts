import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import vConsolePlugin from "vite-plugin-simple-vconsole";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vConsolePlugin({
      enable: false,
    }),
    react(),
  ],
  base: "./",
});
