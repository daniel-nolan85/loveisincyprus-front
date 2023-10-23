let currentBadgeCount = 0;

self.addEventListener('push', (e) => {
  const data = e.data.json();
  console.log('push notification => ', data);
  console.log('currentBadgeCount => ', currentBadgeCount);
  self.registration.showNotification(data.title, {
    body: data.body,
    icon: data.icon,
  });

  if (navigator.setAppBadge) {
    const newBadgeCount = currentBadgeCount + 1;
    navigator.setAppBadge(newBadgeCount);
    currentBadgeCount = newBadgeCount;
  }
});
