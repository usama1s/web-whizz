// Everything you might want to change without touching the pages.

export const SITE = {
  name: "Web Whizz",
  url: "https://web-whizz.com",
  email: "support@web-whizz.com",
  // Umami Cloud website ID (umami.is → Settings → Websites → Edit). Empty = no analytics script on the site.
  // Umami sets no cookies and stores no personal data, so no consent banner is needed.
  umamiId: "b1aa899a-ee55-4da0-a183-00b8826b3e40"
};

export const FLOW = {
  key: "flow",
  path: "/e/flow-downloader/",
  privacyPath: "/e/flow-downloader/privacy/",
  name: "Flow Bulk Downloader",
  storeName: "Bulk Downloader for Google Flow™ – Videos & Images",
  version: "2.6.2",
  // Chrome Web Store listing. Empty = the page says "Coming soon".
  chromeStoreUrl: "https://chromewebstore.google.com/detail/bulk-downloader-for-googl/cbnojammdmehkhjmngnomofcjejleglf",
  // Copy these from the store listing now and then (shown next to the Add to Chrome button).
  // Small numbers look worse than none, so each one stays hidden until it reaches its minimum.
  stats: { users: 5, rating: 5.0, ratingCount: 1 },
  statsMin: { users: 100, ratingCount: 5, rating: 4.0 },
  // The YouTube demo, embedded in "See it in action" and the guide, with VideoObject structured data (src/seo.js).
  // uploadDate and duration are copied from YouTube; id "" hides it.
  youtube: {
    id: "ChquNogUMZ0",
    title: "Download ALL Your Google Flow Videos & Images in One Click | Free Chrome Extension",
    description: "Made 50 clips in Google Flow? Stop downloading them one by one. Flow Bulk Downloader saves your whole project, every video and every image, in one go — in GIF, 720p, 1080p or 4K, into any folder.",
    uploadDate: "2026-11-11T11:16:42-08:00",
    duration: "PT1M30S"
  },
  // A real screen recording of a run (e.g. "demo.mp4" in public/e/flow-downloader/). Empty = the animated demo is shown.
  demoVideo: "",
  // The "Pro coming soon" form posts here (public/api/waitlist.php, PHP on the cPanel host).
  waitlistUrl: "/api/waitlist.php",
  // The extension's welcome / goodbye / feedback surveys post here (public/api/feedback.php).
  feedbackUrl: "/api/feedback.php",
  img: (file) => `/e/flow-downloader/${file}`
};

// Smart Sentinel (Chrome extension: auto refresh & tab reloader). English only.
// The extension (src/lib/usage.ts in ~/Desktop/P Projects/Smart Sentinel) opens SENTINEL.path + "welcome/",
// "goodbye/" and "feedback/", and its manifest's homepage_url is SENTINEL.path: keep these addresses.
export const SENTINEL = {
  key: "sentinel",
  path: "/e/smart-sentinel/",
  privacyPath: "/e/smart-sentinel/privacy/",
  name: "Smart Sentinel",
  storeName: "Smart Sentinel – Auto Refresh & Tab Reloader",
  version: "1.0.0",
  released: "2026-11-21",
  // Chrome Web Store listing. Empty = "Coming soon" instead of Add to Chrome, and no Rate / Reinstall links.
  chromeStoreUrl: "https://chromewebstore.google.com/detail/smart-sentinel-%E2%80%93-auto-ref/fhikicejdnionanjgbocbhpkmikdjhnj",
  feedbackUrl: "/api/feedback.php",
  img: (file) => `/e/smart-sentinel/${file}`
};

// Sidekick for Boomi (Chrome extension: script editor & canvas helpers for Boomi Integration). English only.
// Only its privacy policy lives here for now (the store listing links to it). The extension's code is in
// ~/Desktop/P Projects/sidekick-boomi.
export const SIDEKICK = {
  key: "sidekick",
  path: "/e/sidekick-boomi/",
  privacyPath: "/e/sidekick-boomi/privacy/",
  name: "Sidekick for Boomi",
  storeName: "Sidekick for Boomi – Script Editor & Canvas Helpers",
  version: "0.1.0",
  // Chrome Web Store listing, once it's live.
  chromeStoreUrl: ""
};

// Changelog, newest first. The text of each entry is translated in src/i18n/flow/<lang>.js (changelog.entries).
export const RELEASES = [
  { version: "2.6.2", date: "2026-11-16" },
  { version: "2.6.1", date: "2026-11-06" },
  { version: "2.6.0", date: "2026-10-28" }
];
