const CACHE_NAME = 'india-fitness-v1';
const ASSETS = [
    '/',
    '/index.html',
    '/plans.html',
    '/workout.html',
    '/bmi.html',
    '/assets/css/style.css',
    '/assets/js/main.js',
    '/assets/js/cms-loader.js',
    '/assets/images/logo.png',
    '/assets/images/logo_real_2.png'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS);
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});
