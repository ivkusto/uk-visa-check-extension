import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import { crx } from "@crxjs/vite-plugin";
import autoprefixer from "autoprefixer";
import manifest from "./manifest.config";

export default defineConfig({
  plugins: [solidPlugin(), crx({ manifest })],
  server: {
    port: 3000,
  },
  build: {
    target: "esnext",
  },
  css: {
    postcss: {
      plugins: [autoprefixer],
    },
  },
});
