// No-op service worker to silence 404s from previous registrations
// This file intentionally does nothing.
self.addEventListener("install", (event) => {
  // Activate immediately
  self.skipWaiting();
});
self.addEventListener("activate", (event) => {
  // Take control of uncontrolled clients
  self.clients?.claim?.();
});
// No fetch handlers -> all requests pass-through to the network