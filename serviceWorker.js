const cacheName = "todoapp";
const contentToCache = [
  "/To-do-app/",
  "/To-do-app/index.html",
  "/To-do-app/script.js",
  "/To-do-app/reset.css",
  "/To-do-app/style.css",
  "/To-do-app/media/accept.mp3",
  "/To-do-app/icon/gcal.png",
  "/To-do-app/icon/icon-144.png",
];

self.addEventListener("install", (e) => {
  console.log("[Service Worker] Install");
  e.waitUntil(
    (async () => {
      const cache = await caches.open(cacheName);
      console.log("[Service Worker] Caching all: app shell and content");
      await cache.addAll(contentToCache);
    })()
  );
});
self.addEventListener("fetch", (e) => {
  e.respondWith(
    (async () => {
      const r = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (r) {
        return r;
      }
      const response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })()
  );
});
