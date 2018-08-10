// https://serviceworke.rs/strategy-network-or-cache_service-worker_doc.html
const CACHE = 'fabianmoronzirfas_v0.1.0';
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE).then(function(cache) {
      return cache.addAll([
        'index.html',
        'assets/css/style.css',
        'assets/js/index.bundle.js',
        'offline.html'
      ]);
    }).catch(function(error){
      console.log(error);
    })
  );
});


self.addEventListener('fetch', function(event) {
  event.respondWith(caches.match(event.request).then(function(response) {
    // caches.match() always resolves
    // but in case of success response will have value
    if (response !== undefined) {
      return response;
    } else {
      return fetch(event.request).then(function (response) {
        // response may be used only once
        // we need to save clone to put one copy in cache
        // and serve second one
        let responseClone = response.clone();
        
        caches.open(CACHE).then(function (cache) {
          cache.put(event.request, responseClone);
        });
        return response;
      }).catch(function () {
        return caches.match('/offline.html');
      });
    }
  }));
});