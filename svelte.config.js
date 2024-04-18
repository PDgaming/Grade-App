import adapter from "@sveltejs/adapter-cloudflare";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter(),
  },

  vitePlugin: {
    experimental: {
      renderBuiltUrl: "https://grade-app.pages.dev/", // Replace with your website URL
    },
  },

  package: {
    files: (file) => file === "%sveltekit.assets%/sw.js",
  },
};

export default config;
