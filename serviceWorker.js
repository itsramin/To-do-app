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
var GHPATH = "/To-do-app";

// Choose a different app prefix name
var APP_PREFIX = "Todo";

// The version of the cache. Every time you change any of the files
// you need to change this version (version_01, version_02…).
// If you don't change the version, the service worker will give your
// users the old files!
var VERSION = "version_00";

// The files to make available for offline use. make sure to add
// others to this list
var URLS = [
  `${GHPATH}/`,
  `${GHPATH}/index.html`,
  `${GHPATH}/style.css`,
  `${GHPATH}/script.js`,
];

// self.addEventListener("fetch", function (event) {});
