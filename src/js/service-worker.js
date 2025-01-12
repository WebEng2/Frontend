const CACHE_NAME = 'pwa-cache-v1';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './favicon.ico',
  './pwa.js',
  './sw.js',
  './pwa.css',
  './DHBW_Logo.png',
  './icon-57.png',
  './icon-76.png',
  './icon-120.png',
  './icon-152.png',
  './icon-167.png',
  './icon-180.png',
  './pwa.webmanifest',
  './Splash-iPhone.png',
  // Add other assets you want to cache
];

// Install event - caching assets
self.addEventListener('install', event => {
  console.log('[Service Worker] Install Event processing');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[Service Worker] Caching all: app shell and content');
        return cache.addAll(ASSETS_TO_CACHE);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate event - cleaning up old caches
self.addEventListener('activate', event => {
  console.log('[Service Worker] Activate Event processing');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('[Service Worker] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});
