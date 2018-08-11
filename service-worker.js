// based on
// https://serviceworke.rs/strategy-network-or-cache_service-worker_doc.html

const CACHE = 'fabianmoronzirfas_v0.1.0';
self.addEventListener('install', function(event) {

  event.waitUntil(
    caches.open(CACHE).then(
      function(cache) {
        return cache.addAll([
          'index.html',
          'assets/css/style.css',
          'assets/js/index.bundle.js',
          'assets/js/register-service-worker.js',
          'offline.html',
        ]);
      }).catch(
      function(error) {
        console.log('Caching failed in service worker');
        console.log(error);
      })
  );
});


function fromCache(request) {
  return caches.open(CACHE).then(
    function (cache) {
      return cache.match(request).then(
        function (matching) {
          // return matching || Promise.reject('no-match');
          return matching;
        }).catch(
        function () {
          return caches.match('/offline.html');
        });
    });
}

function fromNetwork(request, timeout) {
  return new Promise(
    function (fulfill, reject) {
      var timeoutId = setTimeout(reject, timeout);
      fetch(request).then(
        function (response) {
          clearTimeout(timeoutId);
          fulfill(response);

        }, reject);
    });
}

self.addEventListener('fetch', function (event) {
  event.respondWith(
    fromNetwork(event.request, 400)
      .catch(
        function () {
          return fromCache(event.request);
        }));

  // event.respondWith(caches.match(event.request).then(function(response) {
  //   // caches.match() always resolves
  //   // but in case of success response will have value
  //   if (response !== undefined) {
  //     return response;
  //   } else {
  //     return fetch(event.request).then(function (response) {
  //       // response may be used only once
  //       // we need to save clone to put one copy in cache
  //       // and serve second one
  //       let responseClone = response.clone();

  //       caches.open(CACHE).then(function (cache) {
  //         cache.put(event.request, responseClone);
  //       });
  //       return response;
  //     }).catch(function () {
  //       return caches.match('/offline.html');
  //     });
  //   }
  // }));
});
