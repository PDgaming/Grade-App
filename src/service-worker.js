import { timestamp, files, shell, routes } from "@sveltech/routify";
import { precacheAndRoute } from "workbox-precaching";
import { getCacheKeyForURL, precachePlugins } from "@sveltech/routify/plugins";
import manifestJSON from "../static/manifest.json";

precacheAndRoute(
  [
    { url: "manifest.json", revision: manifestJSON.revision || null },
    ...buildSsr("$app/"), // ssr-built routes
    ...routes, // Routify routes
  ],
  {
    // Ignore all URL parameters
    getCacheKeyForURL,
    plugins: [...precachePlugins],
  }
);

self.addEventListener("install", (event) =>
  event.waitUntil(self.skipWaiting())
);
self.addEventListener("activate", (event) =>
  event.waitUntil(self.clients.claim())
);
