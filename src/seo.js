// Structured data (schema.org JSON-LD) for each page. It tells Google and AI search what the page is about:
// who publishes the site, what the extension is, what it costs, what it runs on and its FAQ.
// Test any page at https://search.google.com/test/rich-results after deploying.
import { FLOW, RELEASES, SITE } from "./site.js";

const abs = (path) => SITE.url + path;
const ORG = `${SITE.url}/#org`;
const WEBSITE = `${SITE.url}/#website`;
// The same id on every language version: they all describe one extension.
const APP = `${abs(FLOW.path)}#app`;

export const organization = () => ({
  "@type": "Organization",
  "@id": ORG,
  name: SITE.name,
  url: SITE.url + "/",
  logo: { "@type": "ImageObject", url: abs("/webwhizz-logo.png"), width: 512, height: 512 },
  email: SITE.email,
  contactPoint: { "@type": "ContactPoint", contactType: "customer support", email: SITE.email }
});

export const website = () => ({
  "@type": "WebSite",
  "@id": WEBSITE,
  url: SITE.url + "/",
  name: SITE.name,
  publisher: { "@id": ORG },
  inLanguage: "en"
});

// [["Web Whizz", "/"], ["Flow Bulk Downloader", "/e/flow-downloader/"], …]
export const breadcrumbs = (route, trail) => ({
  "@type": "BreadcrumbList",
  "@id": `${abs(route.path)}#breadcrumb`,
  itemListElement: trail.map(([name, path], i) => ({ "@type": "ListItem", position: i + 1, name, item: abs(path) }))
});

export const webPage = (route, extra = {}) => ({
  "@type": "WebPage",
  "@id": `${abs(route.path)}#webpage`,
  url: abs(route.path),
  name: route.title,
  description: route.description,
  inLanguage: route.lang || "en",
  isPartOf: { "@id": WEBSITE },
  publisher: { "@id": ORG },
  ...(route.image ? { primaryImageOfPage: { "@type": "ImageObject", url: abs(route.image) } } : {}),
  ...(route.updated ? { dateModified: route.updated } : {}),
  ...extra
});

// Plain text for structured data: drops the inline marks used in src/i18n text (**bold**, `code`, [link](href)…).
const plain = (s) =>
  s
    .replace(/\*\*(.+?)\*\*/g, "$1")
    .replace(/`(.+?)`/g, "$1")
    .replace(/\[\[(.+?)\]\]/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/\{[ygrq]\|(.+?)\}/g, "$1");

export const faqPage = (route, items) => ({
  "@type": "FAQPage",
  "@id": `${abs(route.path)}#faq`,
  inLanguage: route.lang || "en",
  mainEntity: items.map(([q, a]) => ({ "@type": "Question", name: plain(q), acceptedAnswer: { "@type": "Answer", text: plain(a) } }))
});

// The extension itself. Google shows a "software app" result (stars, Free) only with a rating, and the rating must
// also be visible on the page — so it is included exactly when the page shows it (same minimums as <Trust>).
export function softwareApp(route, t) {
  const { rating, ratingCount } = FLOW.stats;
  const showRating = ratingCount >= FLOW.statsMin.ratingCount && rating >= FLOW.statsMin.rating;
  return {
    "@type": "SoftwareApplication",
    "@id": APP,
    name: FLOW.name,
    alternateName: FLOW.storeName,
    description: route.description,
    url: abs(route.path),
    applicationCategory: "BrowserApplication",
    applicationSubCategory: "Chrome extension",
    operatingSystem: "Google Chrome (Windows, macOS, Linux, ChromeOS)",
    browserRequirements: "Requires Google Chrome",
    softwareVersion: FLOW.version,
    dateModified: RELEASES[0].date,
    image: abs(FLOW.img("logo.png")),
    screenshot: ["shot-downloading.png", "shot-several-projects.png", "shot-credits.png", "shot-retry.png"].map((f) => abs(FLOW.img(f))),
    featureList: t.features.items.map((f) => f.title),
    isAccessibleForFree: true,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD", availability: "https://schema.org/InStock", url: FLOW.chromeStoreUrl || abs(route.path) },
    ...(FLOW.chromeStoreUrl ? { installUrl: FLOW.chromeStoreUrl, downloadUrl: FLOW.chromeStoreUrl, sameAs: [FLOW.chromeStoreUrl] } : {}),
    ...(showRating ? { aggregateRating: { "@type": "AggregateRating", ratingValue: rating, ratingCount, bestRating: 5, worstRating: 1 } } : {}),
    publisher: { "@id": ORG },
    author: { "@id": ORG }
  };
}

// The YouTube demo, on every page that embeds it (Google only uses VideoObject for a video that is on the page).
export function video() {
  const v = FLOW.youtube;
  return {
    "@type": "VideoObject",
    "@id": `https://www.youtube.com/watch?v=${v.id}`,
    name: v.title,
    description: v.description,
    thumbnailUrl: ["maxresdefault", "sddefault", "hqdefault"].map((q) => `https://i.ytimg.com/vi/${v.id}/${q}.jpg`),
    uploadDate: v.uploadDate,
    duration: v.duration,
    embedUrl: `https://www.youtube-nocookie.com/embed/${v.id}`,
    url: `https://www.youtube.com/watch?v=${v.id}`,
    inLanguage: "en",
    publisher: { "@id": ORG },
    about: { "@id": APP }
  };
}

export { APP, ORG };
