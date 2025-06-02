const cacheName = "DefaultCompany-WHAnalytics-0.1";
const contentToCache = [
    "Build/0145c752a950e797e3f5c26444736e72.loader.js",
    "Build/e2735ed4fcab77d942f4bd4544d5c9ff.framework.js",
    "Build/3bc6085463f2295fa6a9235cd809fc1b.data",
    "Build/cc441374a9641d4839681db51334ab3b.wasm",
    "TemplateData/style.css"

];

self.addEventListener('install', function (e) {
    console.log('[Service Worker] Install');
    
    e.waitUntil((async function () {
      const cache = await caches.open(cacheName);
      console.log('[Service Worker] Caching all: app shell and content');
      await cache.addAll(contentToCache);
    })());
});

self.addEventListener('fetch', function (e) {
    e.respondWith((async function () {
      let response = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (response) { return response; }

      response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })());
});
