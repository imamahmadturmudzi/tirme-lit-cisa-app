// Nama cache untuk PWA TIRMÉ
const CACHE_NAME = 'lit-cisa-cache-v1';
const urlsToCache = [
  './tirme_innovation_lab.html',
  './manifest.json',
  // Anggap 'icon-192.png' dan 'icon-512.png' akan ditambahkan ke root
];

// Instalasi Service Worker dan caching aset statis
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        // Hanya cache file statis, API call (AI) tidak di-cache
        return cache.addAll(urlsToCache); 
      })
  );
});

// Fetch events: Menggunakan cache jika tersedia, jika tidak, fetch dari jaringan
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - mengembalikan response dari cache
        if (response) {
          return response;
        }
        // Tidak ada di cache - fetch dari jaringan
        return fetch(event.request);
      }
    )
  );
});