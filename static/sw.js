import { files } from "$service-worker";

const CACHE_NAME = "static-cache-v1";
const toCache = files.concat(["/offline.html"]);

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(toCache))
      .then(() => self.skipWaiting())
  );
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
