const CACHE_NAME = 'india-fitness-v2';
const ASSETS = [
    './',
    './index.html',
    './plans.html',
    './workout.html',
    './bmi.html',
    './assets/css/style.css',
    './assets/css/workout.css',
    './assets/js/main.js',
    './assets/js/workout.js',
    './assets/js/cms-loader.js',
    './assets/images/logo.png',
    './assets/images/logo_real_2.png',
    'https://fonts.googleapis.com/css2?family=Montserrat:wght@700;800;900&family=Inter:wght@400;500;600&display=swap',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
];

// Install Event
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('Worker: Caching Essential Assets');
            return cache.addAll(ASSETS);
        })
    );
    self.skipWaiting();
});

// Activate Event
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
            );
        })
    );
    self.clients.claim();
});

// Fetch Event (Stale-While-Revalidate Strategy)
self.addEventListener('fetch', (event) => {
    // Only handle GET requests
    if (event.request.method !== 'GET') return;

    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            const fetchPromise = fetch(event.request).then((networkResponse) => {
                // Check if we received a valid response
                if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
                    return networkResponse;
                }
                
                // Clone the response to store in cache
                const responseToCache = networkResponse.clone();
                caches.open(CACHE_NAME).then((cache) => {
                    cache.put(event.request, responseToCache);
                });
                return networkResponse;
            }).catch(() => {
                // If network fails and no cache, you could return an offline page here
            });
            
            return cachedResponse || fetchPromise;
        })
    );
});
