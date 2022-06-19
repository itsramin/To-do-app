var cacheName = "todoapp";
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

const RUNTIME = "runtime";

// // The install handler takes care of precaching the resources we always need.
// self.addEventListener("install", (event) => {
//   event.waitUntil(
//     caches
//       .open(cacheName)
//       .then((cache) => cache.addAll(contentToCache))
//       .then(self.skipWaiting())
//   );
// });

// // The activate handler takes care of cleaning up old caches.
// self.addEventListener("activate", (event) => {
//   const currentCaches = [cacheName, RUNTIME];
//   event.waitUntil(
//     caches
//       .keys()
//       .then((cacheNames) => {
//         return cacheNames.filter(
//           (cacheName) => !currentCaches.includes(cacheName)
//         );
//       })
//       .then((cachesToDelete) => {
//         return Promise.all(
//           cachesToDelete.map((cacheToDelete) => {
//             return caches.delete(cacheToDelete);
//           })
//         );
//       })
//       .then(() => self.clients.claim())
//   );
// });

// // The fetch handler serves responses for same-origin resources from a cache.
// // If no response is found, it populates the runtime cache with the response
// // from the network before returning it to the page.
// self.addEventListener("fetch", (event) => {
//   // Skip cross-origin requests, like those for Google Analytics.
//   if (event.request.url.startsWith(self.location.origin)) {
//     event.respondWith(
//       caches.match(event.request).then((cachedResponse) => {
//         if (cachedResponse) {
//           return cachedResponse;
//         }

//         return caches.open(RUNTIME).then((cache) => {
//           return fetch(event.request).then((response) => {
//             // Put a copy of the response in the runtime cache.
//             return cache.put(event.request, response.clone()).then(() => {
//               return response;
//             });
//           });
//         });
//       })
//     );
//   }
// });
// self.addEventListener("install", (e) => {
//   console.log("[Service Worker] Install");
//   e.waitUntil(
//     (async () => {
//       const cache = await caches.open(cacheName);
//       console.log("[Service Worker] Caching all: app shell and content");
//       await cache.addAll(contentToCache);
//     })()
//   );
// });
// self.addEventListener("fetch", (e) => {
//   e.respondWith(
//     (async () => {
//       const r = await caches.match(e.request);
//       console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
//       if (r) {
//         return r;
//       }
//       const response = await fetch(e.request);
//       const cache = await caches.open(cacheName);
//       console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
//       cache.put(e.request, response.clone());
//       return response;
//     })()
//   );
// });
