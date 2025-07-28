const CACHE_NAME = 'medicine-tracker-v1';
const urlsToCache = [
  '/',
  '/static/css/main.css',
  '/static/js/main.js',
  '/manifest.json'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return cached version or fetch from network
        return response || fetch(event.request);
      }
    )
  );
});

// Handle push notifications
self.addEventListener('push', event => {
  const options = {
    body: 'Has Lucy had her medicine?',
    icon: '/icon-192.png',
    badge: '/icon-192.png',
    tag: 'medicine-reminder',
    requireInteraction: true
  };

  event.waitUntil(
    self.registration.showNotification('Medicine Reminder', options)
  );
});