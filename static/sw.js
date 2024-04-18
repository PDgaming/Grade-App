import { build, files } from "$service-worker";

const CACHE_NAME = "static-cache-v1";

self.addEventListener("install", (event) => {
  console.log("Service Worker Installed");
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then(async (names) => {
      for (const name of names) {
        if (name !== CACHE_NAME) await caches.delete(name);
      }
    })
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  event.respondWith(
    caches
      .match(event.request)
      .then((cached) => cached || fetch(event.request))
      .catch(() => caches.match("/offline.html"))
  );
});
