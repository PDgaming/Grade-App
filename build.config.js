import { defineConfig } from "vite";
import { writeFileSync } from "fs";

export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        // Existing output options here...
        inlineConfigs: false, // Important to prevent conflicts
      },
    },
    write: async (outputOptions) => {
      const manifest = {
        name: "Grade-App",
        short_name: "Grade-App",
        start_url: "/",
        icons: [
          {
            src: "static/icons/manifest-icon-192.maskable.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "static/icons/manifest-icon-152.maskable.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
        theme_color: "#000000",
        background_color: "#FFFFFF",
        display: "fullscreen",
        orientation: "portrait",
      };
      writeFileSync(
        `${outputOptions.dir}/manifest.json`,
        JSON.stringify(manifest, null, 2)
      );
    },
  },
});
