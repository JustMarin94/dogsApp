// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/dogsApp",
  build: {
    commonjsOptions: {
      include: [/node_modules/],
    },
    rollupOptions: {
      external: ["firebase"],
      output: {
        globals: {
          firebase: "firebase",
        },
      },
    },
  },
});
