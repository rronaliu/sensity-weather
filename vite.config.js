import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  // this was a line to add so I could host it on gh-pages
  // base: "/sensity-weather/",
  plugins: [vue()],
});
