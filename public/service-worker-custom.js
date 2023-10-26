let currentBadgeCount = 0;

self.addEventListener('push', (e) => {
  const data = e.data.json();
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

self.addEventListener('message', (event) => {
  if (event.data && event.data.action === 'resetBadgeCount') {
    const newBadgeCount = 0;
    if (navigator.setAppBadge) {
      navigator.setAppBadge(newBadgeCount);
    } else if ('setBadge' in navigator && 'clearBadge' in navigator) {
      navigator.clearBadge();
    }
    currentBadgeCount = newBadgeCount;
  }
});
