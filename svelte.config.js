import adapter from "@sveltejs/adapter-cloudflare";
import { vitePreprocess } from "@sveltejs/kit/vite";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter(),
  },

  preprocess: vitePreprocess(),

  vitePlugin: {
    experimental: {
      renderBuiltUrl: "https://grade-app.pages.dev/", // Replace with your website URL
    },
  },

  package: {
    files: (file) => file === "static/sw.js",
  },
};

export default config;
