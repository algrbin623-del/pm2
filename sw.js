self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

// استقبال طلب إطلاق إشعار من الصفحة
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SHOW_NOTIFICATION') {
    const { title, body, tag } = event.data;
    self.registration.showNotification(title, {
      body: body,
      icon: 'https://cdn-icons-png.flaticon.com/512/906/906334.png',
      badge: 'https://cdn-icons-png.flaticon.com/512/906/906334.png',
      vibrate: [200, 100, 200],
      tag: tag || 'pm2-alert',
      renotify: true,
      data: { url: './' }
    });
  }
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if (client.url && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow('./');
      }
    })
  );
});
