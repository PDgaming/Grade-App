import { registerRoute } from "workbox-strategies";
import { CacheFirst } from "workbox-strategies";
import { StaleWhileRevalidate } from "workbox-strategies";

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open("my-app-cache").then((cache) => {
      // Cache static assets
      return cache.addAll(["/", "/index.html", "/styles.css", "/script.js"]);
    })
  );
});

self.addEventListener("fetch", function (event) {
  // Cache API strategies
  if (event.request.url.startsWith(self.location.origin)) {
    event.respondWith(
      CacheFirst({
        cacheName: "my-app-cache",
        plugins: [
          StaleWhileRevalidate({
            cacheName: "my-data-cache",
            fetchTimeout: 3000, // milliseconds
          }),
        ],
      }).handle(event)
    );
  } else {
    event.respondWith(fetch(event.request));
  }
});
