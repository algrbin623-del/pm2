importScripts('https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.22.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyDtFwMuF8sW5Pkqkgu010oHqsA7ffrnXMM",
  authDomain: "pm2-app-c29fa.firebaseapp.com",
  projectId: "pm2-app-c29fa",
  storageBucket: "pm2-app-c29fa.firebasestorage.app",
  messagingSenderId: "576395459652",
  appId: "1:576395459652:web:65caa9ef7a2692183f9011"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const notificationTitle = payload.notification.title || "تنبيه جديد";
  const notificationOptions = {
    body: payload.notification.body || "",
    icon: '/pm2/icon.png'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
