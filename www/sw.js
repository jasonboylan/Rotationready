// Offline support. The page itself is loaded from the network first, so phones
// get the newest version whenever they're online; the saved copy is used offline.
const VERSION = "rotation-ready-v15";
const FILES = ["./", "index.html", "manifest.webmanifest", "icon-180.png", "icon-192.png", "icon-512.png"];
self.addEventListener("install", e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const isPage = req.mode === "navigate" || /\/(index\.html)?$/.test(new URL(req.url).pathname);
  if (isPage) {
    e.respondWith(fetch(req, {cache: "no-store"}).then(res => {
      const copy = res.clone(); caches.open(VERSION).then(c => { c.put("index.html", copy.clone()); c.put("./", copy); }); return res;
    }).catch(() => caches.match("index.html").then(hit => hit || caches.match("./"))));
    return;
  }
  e.respondWith(caches.match(req, {ignoreSearch: true}).then(hit => hit || fetch(req).then(res => {
    const copy = res.clone(); caches.open(VERSION).then(c => c.put(req, copy)); return res;
  }).catch(() => caches.match("index.html"))));
});
