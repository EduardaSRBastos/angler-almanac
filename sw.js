const CACHE_NAME = "almanaque-pesca-v1";

const ASSETS_TO_CACHE = [
  "./",
  "./index.html",
  "./styles.css",
  "./assets/data/spotsData.js",
  "./assets/data/equipLinks.js",
  "./assets/data/baitsData.js",
  "./assets/data/luresData.js",
  "./assets/data/knotsData.js",
  "./assets/data/rodsRigsData.js",
  "./assets/data/checklistData.js",
  "./assets/data/resourcesData.js",
  "./assets/data/handlingData.js",
  "./assets/js/config-i18n.js",
  "./assets/js/tides.js",
  "./assets/js/map.js",
  "./assets/js/equipRefs.js",
  "./assets/js/equipChecklist.js",
  "./assets/js/equip.js",
  "./assets/js/ui-layout.js",
  "./assets/js/spots.js"
];

// Instala e guarda todos os ficheiros locais em cache
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS_TO_CACHE))
  );
  self.skipWaiting();
});

// Limpa caches antigas quando mudares CACHE_NAME para v2, v3...
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

// Estratégia Network-First com fallback para Cache (ideal para GitHub Pages)
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        if (response && response.status === 200) {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
        }
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});
