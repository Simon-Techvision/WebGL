const cacheName = "DefaultCompany-WHAnalytics-0.1";
const contentToCache = [
    "Build/0145c752a950e797e3f5c26444736e72.loader.js",
    "Build/525f5072792728d14d991fb55c41ef75.framework.js",
    "Build/22bf5757d6e10307ca7f69b4a03bab0b.data",
    "Build/8f485665715f2723df050ff1021ce1b0.wasm",
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
