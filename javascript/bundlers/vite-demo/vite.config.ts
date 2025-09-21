import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: "./index.html",
        about: "./src/about/index.html",
        contact: "./src/contact/index.html",
      },
    },
  },
});
