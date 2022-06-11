const staticTodo = "dev-todo-site-v1";
const assets = ["/", "/index.html", "/style.css", "/script.js", "/accept.mp3"];

self.addEventListener("install", (installEvent) => {
  installEvent.waitUntil(
    caches.open(staticTodo).then((cache) => {
      cache.addAll(assets);
    })
  );
});
self.addEventListener("fetch", (fetchEvent) => {
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then((res) => {
      return res || fetch(fetchEvent.request);
    })
  );
});
