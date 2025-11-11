// sw.js
const CACHE_NAME = "spos-cache-v1";
const urlsToCache = [
  "./",                // root
  "./index.html",      // your main HTML file
  "./style.css",       // if you separate styles later
  "./cns.html",        // linked page
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
    