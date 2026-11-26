// Everything you might want to change without touching the pages.

export const SITE = {
  name: "Web Whizz",
  // The registered company, shown in the footer. Meta's business verification matches the site to this name and address.
  legalName: "Web Whizz LLC",
  address: ["1209 Mountain Road Pl NE, STE R", "Albuquerque, NM 87110, USA"],
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
// A basic product page (src/pages/SidekickBoomi.jsx) and the privacy policy the store listing links to.
// The extension's code is in ~/Desktop/P Projects/sidekick-boomi (logo and promo copied from its docs/store/).
export const SIDEKICK = {
  key: "sidekick",
  path: "/e/sidekick-boomi/",
  privacyPath: "/e/sidekick-boomi/privacy/",
  name: "Sidekick for Boomi",
  storeName: "Sidekick for Boomi – Script Editor & Canvas Helpers",
  version: "0.1.0",
  // Chrome Web Store listing, once it's live. Empty = no Rate / Reinstall links on the surveys.
  chromeStoreUrl: "",
  // The extension (src/shared/usage.ts) opens SIDEKICK.path + "welcome/", "goodbye/" and "feedback/": keep these
  // addresses. Their answers post here (public/api/feedback.php → "sidekick").
  feedbackUrl: "/api/feedback.php",
  img: (file) => `/e/sidekick-boomi/${file}`
};

// Turn Off AI (Chrome extension: hides AI Overviews, Gemini, Copilot and other AI features). English only.
// The extension's code is in ~/Desktop/P Projects/AI free web (github.com/usama1s/Turn-Off-AI). It opens TURNOFFAI.path +
// "welcome/", "goodbye/" and "feedback/" (src/shared/usage.ts → pageUrl), fetches TURNOFFAI.path + "rules/rules.json"
// (+ ".sig"), and posts to /api/toa-usage.php and /api/toa-report.php: keep these addresses.
export const TURNOFFAI = {
  key: "turnoffai",
  path: "/e/turn-off-ai/",
  privacyPath: "/e/turn-off-ai/privacy/",
  name: "Turn Off AI",
  storeName: "Turn Off AI – Hide AI Overviews, Gemini & Copilot",
  version: "1.0.0",
  released: "2026-11-26",
  // Chrome Web Store listing, once it's live. Empty = "Coming soon" instead of Add to Chrome, and no Rate / Reinstall links.
  chromeStoreUrl: "",
  feedbackUrl: "/api/feedback.php",
  img: (file) => `/e/turn-off-ai/${file}`
};

// Web Whizz LLC's own websites, listed under Products on the home page and in the footer. Each is its own site, so links go out.
export const WEBSITES = [
  {
    key: "dropkaro",
    name: "DropKaro",
    domain: "dropkaro.pk",
    url: "https://dropkaro.pk",
    logo: "/dropkaro/logo.svg",
    text: "Daily pick & drop rides in Pakistan. Drivers post their route for free, and riders going to school, college or the office contact them directly.",
    tags: ["Website", "Pakistan"]
  },
  {
    key: "davetiim-pk",
    name: "Davetiim.pk",
    domain: "davetiim.pk",
    url: "https://davetiim.pk",
    logo: "/davetiim/logo.svg",
    text: "Digital wedding invitations for Pakistan. Pick a template, add every function from Mangni to Walima, pay once in PKR and share one link with your guests.",
    tags: ["Website", "Pakistan"]
  },
  {
    key: "davetiim-com",
    name: "Davetiim",
    domain: "davetiim.com",
    url: "https://davetiim.com",
    logo: "/davetiim/logo.svg",
    text: "Digital wedding invitations for Turkey. Pick a template, fill in the details, pay once and share a hosted invitation with your guests.",
    tags: ["Website", "Turkey"]
  }
];

// Changelog, newest first. The text of each entry is translated in src/i18n/flow/<lang>.js (changelog.entries).
export const RELEASES = [
  { version: "2.6.2", date: "2026-11-16" },
  { version: "2.6.1", date: "2026-11-06" },
  { version: "2.6.0", date: "2026-10-28" }
];
