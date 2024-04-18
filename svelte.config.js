import adapter from "@sveltejs/adapter-cloudflare";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter(),
  },

  package: {
    files: (file) => file === "static/sw.js",
  },
};

export default config;
