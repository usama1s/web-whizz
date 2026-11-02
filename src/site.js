// Everything you might want to change without touching the pages.

export const SITE = {
  name: "Web Whizz",
  url: "https://web-whizz.com",
  email: "support@web-whizz.com"
};

export const FLOW = {
  path: "/e/flow-downloader/",
  privacyPath: "/e/flow-downloader/privacy/",
  name: "Flow Bulk Downloader",
  storeName: "Bulk Downloader for Google Flow™ – Videos & Images",
  version: "2.6.0",
  // Chrome Web Store listing. Empty = the page says "Coming soon".
  chromeStoreUrl: "https://chromewebstore.google.com/detail/bulk-downloader-for-googl/cbnojammdmehkhjmngnomofcjejleglf",
  // Copy these from the store listing now and then (shown next to the Add to Chrome button).
  // users: 0 hides the user count; ratingCount: 0 hides the rating.
  stats: { users: 5, rating: 5.0, ratingCount: 1 },
  // A real screen recording of a run (e.g. "demo.mp4" in public/e/flow-downloader/). Empty = the animated demo is shown.
  demoVideo: "",
  // The "Pro coming soon" form posts here (public/api/waitlist.php, PHP on the cPanel host).
  waitlistUrl: "/api/waitlist.php",
  img: (file) => `/e/flow-downloader/${file}`
};

// Changelog, newest first. The text of each entry is translated in src/i18n/flow/<lang>.js (changelog.entries).
export const RELEASES = [{ version: "2.6.0", date: "2026-10-28" }];
