const CACHE_NAME = 'markkanich-nouchipro-v2';

// Static assets to pre-cache immediately upon install
const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/logo.jpg',
  '/manifest.webmanifest'
];

// Install Event: pre-cache core application shell
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[ServiceWorker] Pre-caching offline application shell & assets');
      return cache.addAll(PRECACHE_ASSETS).catch((err) => {
        console.warn('[ServiceWorker] Some pre-cache assets failed to load:', err);
      });
    }).then(() => self.skipWaiting())
  );
});

// Activate Event: clean up old cache versions
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((name) => {
          if (name !== CACHE_NAME) {
            console.log('[ServiceWorker] Deleting old cache version:', name);
            return caches.delete(name);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Helper to determine if request is an API call
const isApiRequest = (url) => {
  return url.pathname.startsWith('/api/');
};

// Fetch Event: Cache Strategy
self.addEventListener('fetch', (event) => {
  const request = event.request;
  const url = new URL(request.url);

  // Ignore non-GET requests or browser extension protocols
  if (request.method !== 'GET' || !url.protocol.startsWith('http')) {
    return;
  }

  // Strategy 1: For Navigation Requests (HTML / Page Loads)
  // Network-first, with fallback to cached index.html
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, responseClone);
            });
          }
          return networkResponse;
        })
        .catch(async () => {
          console.log('[ServiceWorker] Serving cached page for offline navigation:', request.url);
          const cached = await caches.match(request);
          if (cached) return cached;
          const cachedIndex = await caches.match('/index.html');
          if (cachedIndex) return cachedIndex;
          const cachedRoot = await caches.match('/');
          if (cachedRoot) return cachedRoot;
          return new Response('<h1>Markkanich NouchiPro - Mode Hors-Ligne</h1><p>Le dictionnaire est prêt.</p>', {
            headers: { 'Content-Type': 'text/html; charset=utf-8' }
          });
        })
    );
    return;
  }

  // Strategy 2: For Static Assets (JS, CSS, Images, Fonts, Icons)
  // Stale-While-Revalidate or Cache-First
  const isStaticAsset = (
    url.pathname.match(/\.(js|css|png|jpg|jpeg|svg|webp|woff|woff2|ttf|json|webmanifest)$/i) ||
    url.pathname.startsWith('/assets/') ||
    url.pathname.startsWith('/@') ||
    url.pathname.startsWith('/src/')
  );

  if (isStaticAsset) {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        // Return cached if available, but fetch fresh in background (Stale-While-Revalidate)
        const fetchPromise = fetch(request)
          .then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              const responseClone = networkResponse.clone();
              caches.open(CACHE_NAME).then((cache) => {
                cache.put(request, responseClone);
              });
            }
            return networkResponse;
          })
          .catch((err) => {
            // If network fails and no cache, log warning
            if (!cachedResponse) {
              console.warn('[ServiceWorker] Fetch failed for asset:', request.url, err);
            }
          });

        return cachedResponse || fetchPromise;
      })
    );
    return;
  }

  // Strategy 3: General Requests
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      return (
        cachedResponse ||
        fetch(request)
          .then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              const responseClone = networkResponse.clone();
              caches.open(CACHE_NAME).then((cache) => {
                cache.put(request, responseClone);
              });
            }
            return networkResponse;
          })
          .catch(() => {
            // Offline fallback for JSON or other resources
            if (request.headers.get('accept')?.includes('application/json')) {
              return new Response(
                JSON.stringify({
                  offline: true,
                  message: 'Vous êtes hors connexion. Le lexique Nouchi reste 100% accessible en local.'
                }),
                {
                  headers: { 'Content-Type': 'application/json' }
                }
              );
            }
            return cachedResponse;
          })
      );
    })
  );
});

// ==========================================
// PUSH NOTIFICATIONS & MOT DU JOUR DISPATCH
// ==========================================

// 1. Push Event: triggered by Web Push API server payload
self.addEventListener('push', (event) => {
  console.log('[ServiceWorker] Push notification received');
  let data = {};
  
  if (event.data) {
    try {
      data = event.data.json();
    } catch (e) {
      data = {
        title: '🇨🇮 Mot Nouchi du Jour',
        body: event.data.text()
      };
    }
  }

  const title = data.title || '🇨🇮 Mot Nouchi du Jour';
  const options = {
    body: data.body || 'Découvrez le mot de Babi du jour avec Markkanich !',
    icon: data.icon || '/logo.jpg',
    badge: data.badge || '/logo.jpg',
    tag: data.tag || 'nouchi-daily-word',
    renotify: true,
    vibrate: [200, 100, 200],
    data: data.data || {
      url: '/?source=push_notification',
      wordId: ''
    },
    actions: data.actions || [
      { action: 'open_word', title: '📖 Voir la fiche' },
      { action: 'pronounce_word', title: '🔊 Écouter' },
      { action: 'share_word', title: '🚀 Partager' }
    ]
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

// 2. Notification Click Event: handles interactions on notification and action buttons
self.addEventListener('notificationclick', (event) => {
  console.log('[ServiceWorker] Notification clicked:', event.action);
  event.notification.close();

  const notifData = event.notification.data || {};
  const action = event.action || 'open_word';
  const targetUrl = notifData.url || '/';

  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      // If a window is already open, focus it and notify client
      for (const client of clientList) {
        if ('focus' in client) {
          client.focus();
          client.postMessage({
            type: 'NOTIFICATION_ACTION_CLICKED',
            action,
            data: notifData
          });
          return;
        }
      }
      // If no window is open, open a new one with the target URL
      if (self.clients.openWindow) {
        return self.clients.openWindow(targetUrl);
      }
    })
  );
});

// 3. Message Event: client-to-service worker messaging (e.g. test daily notification)
self.addEventListener('message', (event) => {
  if (!event.data) return;

  if (event.data.type === 'SHOW_TEST_DAILY_NOTIFICATION') {
    const payload = event.data.payload || {};
    const title = payload.title || '🇨🇮 Mot Nouchi du Jour';
    const options = {
      body: payload.body || 'Notification quotidienne activée avec succès !',
      icon: payload.icon || '/logo.jpg',
      badge: payload.badge || '/logo.jpg',
      tag: payload.tag || 'nouchi-daily-test',
      renotify: true,
      vibrate: [150, 50, 150],
      data: payload.data || { url: '/', wordId: '' },
      actions: payload.actions || [
        { action: 'open_word', title: '📖 Voir la fiche' },
        { action: 'pronounce_word', title: '🔊 Écouter' }
      ]
    };

    self.registration.showNotification(title, options).then(() => {
      console.log('[ServiceWorker] Test notification successfully displayed');
    }).catch((err) => {
      console.warn('[ServiceWorker] Notification display failed:', err);
    });
  }
});
