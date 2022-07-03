const staticCacheName = "site-static-v1";
const cacheAssets = [
  "./",
  "./index.html",
  "./src/js/controller.js",
  "./src/js/model.js",
  "./src/js/helper.js",
  "./src/css/reset.css",
  "./src/css/style.css",
  "./src/js/view/view.js",
  "./src/js/view/categoryView.js",
  "./src/js/view/listView.js",
  "./src/js/view/searchView.js",
  "./src/js/view/taskView.js",
  "./src/js/view/themeView.js",
];

self.addEventListener("install", (evt) => {
  evt.waitUntil(
    caches
      .open(staticCacheName)
      .then((cache) => {
        console.log("caching assets...");
        cache.addAll(cacheAssets);
      })
      .catch((err) => {})
  );
});

self.addEventListener("fetch", (evt) => {
  evt.respondWith(
    caches
      .match(evt.request)
      .then((res) => {
        return res || fetch(evt.request);
      })
      .catch((err) => {
        if (evt.request.url.indexOf(".html") > -1) {
          return console.log("fetch error");
        }
      })
  );
});
