console.log("Service Worker Loaded");

self.addEventListener('push', e => {
  const data = e.data.json();
  console.log('Push Received');
  const promiseChain = self.registration.showNotification(data.title, {
    body: "Notified",
    icon: "https://pushpad.xyz/brand_assets/logo.png"
  });
  event.waitUntil(promiseChain);
});
