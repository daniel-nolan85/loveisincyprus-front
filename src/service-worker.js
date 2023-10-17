import { clientsClaim } from 'workbox-core';
import { ExpirationPlugin } from 'workbox-expiration';
import { precacheAndRoute, createHandlerBoundToURL } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate } from 'workbox-strategies';

clientsClaim();

precacheAndRoute(self.__WB_MANIFEST);

const fileExtensionRegexp = new RegExp('/[^/?]+\\.[^/]+$');
registerRoute(({ request, url }) => {
  if (request.mode !== 'navigate') {
    return false;
  }

  if (url.pathname.startsWith('/_')) {
    return false;
  }

  if (url.pathname.match(fileExtensionRegexp)) {
    return false;
  }

  return true;
}, createHandlerBoundToURL(process.env.PUBLIC_URL + '/index.html'));

registerRoute(
  ({ url }) =>
    url.origin === self.location.origin && url.pathname.endsWith('.png'),
  new StaleWhileRevalidate({
    cacheName: 'images',
    plugins: [new ExpirationPlugin({ maxEntries: 50 })],
  })
);

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

self.addEventListener('install', (e) => {
  console.log('Service Worker installed');
});

self.addEventListener('push', (e) => {
  const data = e.data.json();
  console.log('Push received...', data);
  self.registration.showNotification(data.title, {
    body: data.body,
    icon: data.icon,
  });
});

// self.addEventListener('push', (event) => {
//   const data = event.data.json();
//   console.log('Push received...', data);
//   event.waitUntil(
//     self.registration
//       .showNotification(data.title, {
//         body: data.body,
//         icon: data.icon,
//       })
//       .catch((error) => {
//         console.error('Error displaying notification:', error);
//       })
//   );
// });

console.log('service-worker running');
