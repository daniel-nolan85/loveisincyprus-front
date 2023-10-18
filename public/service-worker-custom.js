self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      return response || fetch(event.request);
    })
  );
});

self.addEventListener('push', (e) => {
  const data = e.data.json();
  console.log('Push received...', data);
  self.registration.showNotification(data.title, {
    body: data.body,
    icon: data.icon,
  });
});
