const CACHE_VERSION = 'v1';
const CACHE_NAME = `${registration.scope}!${CACHE_VERSION}`;
let LANG = '';

self.addEventListener('message', function(event){
  console.log("SW Received Message: " + event.data);
  event.ports[0].postMessage("SW Says 'Hello back!'");
});

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(async cache => {
      const itemsToCache = [
        './',
        './languages.json',
        './_assets/css/materialize.min.css',
        './_assets/css/style.css',
        './_assets/css/fontawesome-free-5.5.0-web/css/all.min.css',
        './_assets/css/fontawesome-free-5.5.0-web/webfonts/fa-brands-400.woff',
        './_assets/css/fontawesome-free-5.5.0-web/webfonts/fa-brands-400.woff2',
        './_assets/css/fontawesome-free-5.5.0-web/webfonts/fa-regular-400.woff',
        './_assets/css/fontawesome-free-5.5.0-web/webfonts/fa-regular-400.woff2',
        './_assets/css/fontawesome-free-5.5.0-web/webfonts/fa-solid-900.woff',
        './_assets/css/fontawesome-free-5.5.0-web/webfonts/fa-solid-900.woff2',
        './_assets/js/jquery-2.1.1.min.js',
        './_assets/js/localforage.min.js',
        './_assets/js/materialize.min.js',
        './_assets/js/fp/base.js',
        './_assets/js/fp/language.js',
        './_assets/js/fp/scripture.js'
      ];
      await fetch('./languages.json').then(response => {
        return response.json();
      }).then(languages => {
        console.log('languages:', languages);
        languages.map(language => {
          itemsToCache.push(`./lang/${language.iso}/global/content.xml`);
        });
        console.log('itemsToCache:', itemsToCache);
      });
      await itemsToCache.map(itemToCache => {
        const itemUrl = `${itemToCache}`;
        fetch(itemUrl).then(response => {
          return response.text();
        }).then(itemText => {
          cache.add(itemUrl, itemText).catch(err => {
            console.error('cache.add() failed for ' + itemUrl + ':', err);
          })
        }).catch(err => {
          console.error('fetch() failed for ' + itemUrl + ':', err);
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