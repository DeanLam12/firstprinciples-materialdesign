const CACHE_VERSION = 'v2';
const CACHE_NAME = `${registration.scope}!${CACHE_VERSION}`;

self.addEventListener('message', function(event){
  console.log("SW Received Message: " + event.data);
  event.ports[0].postMessage("SW Says 'Hello back!'");
});

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(async cache => {
      const itemsToCache = [
        './',
        'css/light-darkness.css',
        'css/materialize.min.css',
        'css/style.css',
        'css/the-church.css',
        'css/fontawesome-free-5.5.0-web/css/all.min.css',
        'css/fontawesome-free-5.5.0-web/webfonts/fa-brands-400.woff',
        'css/fontawesome-free-5.5.0-web/webfonts/fa-brands-400.woff2',
        'css/fontawesome-free-5.5.0-web/webfonts/fa-regular-400.woff',
        'css/fontawesome-free-5.5.0-web/webfonts/fa-regular-400.woff2',
        'css/fontawesome-free-5.5.0-web/webfonts/fa-solid-900.woff',
        'css/fontawesome-free-5.5.0-web/webfonts/fa-solid-900.woff2',
        'img/body.png',
        'js/jquery-2.1.1.min.js',
        'js/localforage.min.js',
        'js/materialize.min.js',
        'js/fp/base.js',
        'js/fp/language.js',
        'js/fp/scripture.js'
      ];
      itemsToCache.map(itemToCache => {
        const itemUrl = `${itemToCache}`;
        fetch(itemUrl).then(response => {
          return response.text();
        }).then(itemText => {
          cache.add(itemUrl, itemText).catch(err => {
            console.error('cache.add() for ' + itemUrl + ' failed:', err);
          })
        }).catch(err => {
          console.error('fetch failed for ' + itemUrl + ':', err);
        })
      });
    }).catch(err => {
      console.error('caches.open() failed:', err);
    })
  );
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(strCacheNames){
      let strCachesToDelete = [];
      strCacheNames.map(function(strCacheName){
        const startsWithName = strCacheName.startsWith(`${registration.scope}!`);
        const notEqualToName = strCacheName !== CACHE_NAME;
        const bothTrue = (startsWithName && notEqualToName);
        if (bothTrue) strCachesToDelete.push(strCacheName);
      });
      Promise.all(strCachesToDelete.map(function(item){
        caches.open(item).then(function(deleteItem) {
          deleteItem.delete();
        });
      }))
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(async function() {
    const response = await caches.match(event.request);
    return response || fetch(event.request);
  }());
});

function send_message_to_client(client, msg) {
  return new Promise((resolve, reject) => {
    var msg_chan = new MessageChannel();

    msg_chan.port1.onmessage = event => {
      if (event.data.error) {
        reject(event.data.error);
      } else {
        resolve(event.data);
      }
    };

    client.postMessage("SW Says: '"+msg+"'", [msg_chan.port2]);
  });
}

function send_message_to_all_clients(msg) {
  clients.matchAll().then(clients => {
    clients.forEach(client => {
      send_message_to_client(client, msg).then(m => console.log("SW Received Message: "+m));
    });
  });
}