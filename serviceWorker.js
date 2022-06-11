const staticTodo = "dev-Todo-site-v1";
const assets = ["/", "/index.html", "/style.css", "/script.js", "/accept.mp3"];

self.addEventListener("install", (installEvent) => {
  installEvent.waitUntil(
    caches.open(staticTodo).then((cache) => {
      cache.addAll(assets);
    })
  );
});
