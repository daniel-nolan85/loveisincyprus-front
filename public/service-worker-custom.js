console.log('My custom service worker');

self.addEventListener('install', (e) => {
  console.log('install => ', e);
});

self.addEventListener('push', (e) => {
  const data = e.data.json();
  console.log('Push received...', data);
  self.registration.showNotification(data.title, {
    body: data.body,
    icon: data.icon,
  });
});
