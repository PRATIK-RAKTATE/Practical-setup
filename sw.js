// sw.js
const CACHE_NAME = "spos-cache-v3";
const urlsToCache = [
  "/",                // root
  "/index.html",      // main page
  "/cns.html",        // second page
  "/offline.html",    // fallback
  "/manifest.json",   // PWA manifest
];

// Install and pre-cache
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Opened cache and adding resources...");
      return cache.addAll(urlsToCache);
    })
  );
});

// Activate and clean old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      )
    )
  );
});

// Fetch from cache, else network, else offline page
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return (
        response ||
        fetch(event.request).catch(() => caches.match("/offline.html"))
      );
    })
  );
});
