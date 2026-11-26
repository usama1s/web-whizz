import Home from "./pages/Home.jsx";
import FlowDownloader from "./pages/FlowDownloader.jsx";
import FlowGuide, { GUIDE } from "./pages/FlowGuide.jsx";
import FlowPrivacy from "./pages/FlowPrivacy.jsx";
import FlowSurvey, { SURVEY_PAGES } from "./pages/FlowSurvey.jsx";
import SmartSentinel, { FAQ as SENTINEL_FAQ, FEATURES as SENTINEL_FEATURES, META as SENTINEL_META } from "./pages/SmartSentinel.jsx";
import SentinelPrivacy, { UPDATED as SENTINEL_PRIVACY_UPDATED } from "./pages/SentinelPrivacy.jsx";
import SentinelSurvey, { SURVEY_PAGES as SENTINEL_SURVEY_PAGES } from "./pages/SentinelSurvey.jsx";
import SentinelGuide, { GUIDE as SENTINEL_GUIDE } from "./pages/SentinelGuide.jsx";
import SidekickBoomi, { FAQ as SIDEKICK_FAQ, META as SIDEKICK_META } from "./pages/SidekickBoomi.jsx";
import SidekickSurvey, { SURVEY_PAGES as SIDEKICK_SURVEY_PAGES } from "./pages/SidekickSurvey.jsx";
import SidekickPrivacy, { UPDATED as SIDEKICK_PRIVACY_UPDATED } from "./pages/SidekickPrivacy.jsx";
import TurnOffAi, { FAQ as TURNOFFAI_FAQ, META as TURNOFFAI_META } from "./pages/TurnOffAi.jsx";
import TurnOffAiSurvey, { SURVEY_PAGES as TURNOFFAI_SURVEY_PAGES } from "./pages/TurnOffAiSurvey.jsx";
import TurnOffAiPrivacy, { UPDATED as TURNOFFAI_PRIVACY_UPDATED } from "./pages/TurnOffAiPrivacy.jsx";
import Extensions, { META as EXTENSIONS_META } from "./pages/Extensions.jsx";
import { EXTENSIONS, EXTENSIONS_PATH } from "./components/Extensions.jsx";
import NotFound from "./pages/NotFound.jsx";
import { FLOW, RELEASES, SENTINEL, SIDEKICK, SITE, TURNOFFAI } from "./site.js";
import { LOCALES } from "./i18n/flow/index.js";
import { breadcrumbs, faqPage, organization, sentinelApp, softwareApp, video, webPage, website, APP, ORG, SENTINEL_APP } from "./seo.js";

// Every page of the site. Each one is pre-rendered to <path>/index.html at build time.
// title/description → <title> and meta description. updated → <lastmod> in sitemap.xml (change it when the page's text changes).
// schema(route) → the page's structured data (see src/seo.js).
// Every product page sits under "Chrome extensions" (/e/) in its breadcrumb trail.
const EXT_CRUMB = ["Chrome extensions", EXTENSIONS_PATH];

export const ROUTES = [
  {
    path: "/",
    Page: Home,
    title: "Web Whizz — Online tools that work for you",
    description: "Web Whizz builds focused online tools — point-of-sale systems, browser extensions and more — that take the busywork out of your day.",
    updated: RELEASES[0].date,
    schema: (r) => [organization(), website(), webPage(r, { about: { "@id": ORG } })]
  },
  // /e/: the list of every Chrome extension (the header's "Chrome extensions" link).
  {
    path: EXTENSIONS_PATH,
    Page: Extensions,
    title: EXTENSIONS_META.title,
    description: EXTENSIONS_META.description,
    updated: SENTINEL.released,
    schema: (r) => [
      organization(),
      website(),
      webPage(r, { "@type": "CollectionPage", breadcrumb: { "@id": `${r.url}#breadcrumb` } }),
      {
        "@type": "ItemList",
        "@id": `${r.url}#list`,
        itemListElement: EXTENSIONS.map(({ product }, i) => ({ "@type": "ListItem", position: i + 1, name: product.name, url: SITE.url + product.path }))
      },
      breadcrumbs(r, [["Web Whizz", "/"], EXT_CRUMB])
    ]
  },
  // The Flow page in every language (see src/i18n/flow/).
  ...LOCALES.map((l) => ({
    path: l.path,
    Page: FlowDownloader,
    lang: l.hreflang,
    ogLocale: l.ogLocale,
    title: l.t.meta.title,
    description: l.t.meta.description,
    image: FLOW.img("og.png"),
    imageAlt: `${FLOW.name} — ${l.t.hero.eyebrow}`,
    updated: RELEASES[0].date,
    alternates: LOCALES,
    schema: (r) => [
      organization(),
      website(),
      webPage(r, { about: { "@id": APP }, mainEntity: { "@id": APP }, breadcrumb: { "@id": `${r.url}#breadcrumb` } }),
      softwareApp(r, l.t),
      breadcrumbs(r, [["Web Whizz", "/"], EXT_CRUMB, [FLOW.name, r.path]]),
      faqPage(r, l.t.faq.items),
      ...(FLOW.youtube?.id ? [video()] : [])
    ]
  })),
  {
    path: GUIDE.path,
    Page: FlowGuide,
    title: GUIDE.title,
    description: GUIDE.description,
    image: FLOW.img("og.png"),
    imageAlt: GUIDE.h1,
    ogType: "article",
    updated: GUIDE.updated,
    schema: (r) => [
      organization(),
      website(),
      {
        "@type": "TechArticle",
        "@id": `${r.url}#article`,
        headline: GUIDE.h1,
        description: GUIDE.description,
        url: r.url,
        mainEntityOfPage: { "@id": `${r.url}#webpage` },
        image: [SITE.url + FLOW.img("shot-downloading.png")],
        datePublished: GUIDE.published,
        dateModified: GUIDE.updated,
        inLanguage: "en",
        author: { "@id": ORG },
        publisher: { "@id": ORG },
        about: { "@id": APP }
      },
      webPage(r, { breadcrumb: { "@id": `${r.url}#breadcrumb` } }),
      breadcrumbs(r, [["Web Whizz", "/"], EXT_CRUMB, [FLOW.name, FLOW.path], [GUIDE.crumb, r.path]]),
      faqPage(r, GUIDE.faq),
      ...(FLOW.youtube?.id ? [video()] : [])
    ]
  },
  {
    path: FLOW.privacyPath,
    Page: FlowPrivacy,
    title: "Privacy Policy — Flow Bulk Downloader | Web Whizz",
    description: "Flow Bulk Downloader has no accounts and sends nothing that identifies you. What its anonymous usage statistics and our optional surveys collect, and why.",
    updated: "2026-11-26"
  },
  // The extension's welcome, goodbye (uninstall) and feedback pages. Not for search engines, not in the sitemap.
  ...SURVEY_PAGES.map((survey) => ({
    path: `${FLOW.path}${survey}/`,
    Page: FlowSurvey,
    survey,
    title: { welcome: "Welcome", goodbye: "Sorry to see you go", feedback: "Feedback" }[survey] + ` — ${FLOW.name} | Web Whizz`,
    description: `${FLOW.name}: a short ${survey === "welcome" ? "welcome" : survey} survey.`,
    noindex: true
  })),
  // Smart Sentinel (English only). product: "sentinel" switches the footer's help links to this extension.
  {
    path: SENTINEL.path,
    Page: SmartSentinel,
    product: "sentinel",
    title: SENTINEL_META.title,
    description: SENTINEL_META.description,
    image: SENTINEL.img("og.png"),
    imageAlt: `${SENTINEL.name} — auto refresh that never silently stops`,
    updated: SENTINEL.released,
    schema: (r) => [
      organization(),
      website(),
      webPage(r, { about: { "@id": SENTINEL_APP }, mainEntity: { "@id": SENTINEL_APP }, breadcrumb: { "@id": `${r.url}#breadcrumb` } }),
      sentinelApp(r, SENTINEL_FEATURES),
      breadcrumbs(r, [["Web Whizz", "/"], EXT_CRUMB, [SENTINEL.name, r.path]]),
      faqPage(r, SENTINEL_FAQ)
    ]
  },
  // How-to article for problem searches ("how to auto refresh a page in Chrome").
  {
    path: SENTINEL_GUIDE.path,
    Page: SentinelGuide,
    product: "sentinel",
    title: SENTINEL_GUIDE.title,
    description: SENTINEL_GUIDE.description,
    image: SENTINEL.img("og.png"),
    imageAlt: SENTINEL_GUIDE.h1,
    ogType: "article",
    updated: SENTINEL_GUIDE.updated,
    schema: (r) => [
      organization(),
      website(),
      {
        "@type": "TechArticle",
        "@id": `${r.url}#article`,
        headline: SENTINEL_GUIDE.h1,
        description: SENTINEL_GUIDE.description,
        url: r.url,
        mainEntityOfPage: { "@id": `${r.url}#webpage` },
        image: [SITE.url + SENTINEL.img("shot-exact-time.png"), SITE.url + SENTINEL.img("og.png")],
        datePublished: SENTINEL_GUIDE.published,
        dateModified: SENTINEL_GUIDE.updated,
        inLanguage: "en",
        author: { "@id": ORG },
        publisher: { "@id": ORG },
        about: { "@id": SENTINEL_APP },
        mentions: { "@id": SENTINEL_APP }
      },
      webPage(r, { breadcrumb: { "@id": `${r.url}#breadcrumb` } }),
      breadcrumbs(r, [["Web Whizz", "/"], EXT_CRUMB, [SENTINEL.name, SENTINEL.path], [SENTINEL_GUIDE.crumb, r.path]]),
      faqPage(r, SENTINEL_GUIDE.faq)
    ]
  },
  {
    path: SENTINEL.privacyPath,
    Page: SentinelPrivacy,
    product: "sentinel",
    title: "Privacy Policy — Smart Sentinel | Web Whizz",
    description: "Smart Sentinel sends nothing while you use it: no accounts, no analytics, no tracking. The pages you refresh stay on your computer. What it stores, why it asks for site access, and what our optional surveys collect.",
    updated: SENTINEL_PRIVACY_UPDATED
  },
  // The extension's welcome, goodbye (uninstall) and feedback pages. Not for search engines, not in the sitemap.
  ...SENTINEL_SURVEY_PAGES.map((survey) => ({
    path: `${SENTINEL.path}${survey}/`,
    Page: SentinelSurvey,
    product: "sentinel",
    survey,
    title: { welcome: "Welcome", goodbye: "Sorry to see you go", feedback: "Feedback" }[survey] + ` — ${SENTINEL.name} | Web Whizz`,
    description: `${SENTINEL.name}: a short ${survey} survey.`,
    noindex: true
  })),
  // Sidekick for Boomi (English only): a basic product page and the privacy policy its store listing links to.
  {
    path: SIDEKICK.path,
    Page: SidekickBoomi,
    product: "sidekick",
    title: SIDEKICK_META.title,
    description: SIDEKICK_META.description,
    image: SIDEKICK.img("promo.png"),
    imageAlt: `${SIDEKICK.name} — script editor and canvas helpers for Boomi`,
    updated: "2026-11-23",
    schema: (r) => [
      organization(),
      website(),
      webPage(r, { breadcrumb: { "@id": `${r.url}#breadcrumb` } }),
      breadcrumbs(r, [["Web Whizz", "/"], EXT_CRUMB, [SIDEKICK.name, r.path]]),
      faqPage(r, SIDEKICK_FAQ)
    ]
  },
  {
    path: SIDEKICK.privacyPath,
    Page: SidekickPrivacy,
    product: "sidekick",
    title: "Privacy Policy — Sidekick for Boomi | Web Whizz",
    description: "Sidekick for Boomi sends nothing while you use it: no accounts, no analytics, no network requests. Your settings stay in your browser. What our optional surveys collect.",
    updated: SIDEKICK_PRIVACY_UPDATED
  },
  // The extension's welcome, goodbye (uninstall) and feedback pages. Not for search engines, not in the sitemap.
  ...SIDEKICK_SURVEY_PAGES.map((survey) => ({
    path: `${SIDEKICK.path}${survey}/`,
    Page: SidekickSurvey,
    product: "sidekick",
    survey,
    title: { welcome: "Welcome", goodbye: "Sorry to see you go", feedback: "Feedback" }[survey] + ` — ${SIDEKICK.name} | Web Whizz`,
    description: `${SIDEKICK.name}: a short ${survey} survey.`,
    noindex: true
  })),
  // AI-Free Web (English only): product page, privacy policy and the extension's surveys. Its signed rules file is a
  // static file, public/e/ai-free-web/rules/rules.json (+ .sig), not a page.
  {
    path: TURNOFFAI.path,
    Page: TurnOffAi,
    product: "turnoffai",
    title: TURNOFFAI_META.title,
    description: TURNOFFAI_META.description,
    image: TURNOFFAI.img("og.png"),
    imageAlt: `${TURNOFFAI.name} — hide AI Overviews, Gemini and Copilot`,
    updated: TURNOFFAI.released,
    schema: (r) => [
      organization(),
      website(),
      webPage(r, { breadcrumb: { "@id": `${r.url}#breadcrumb` } }),
      breadcrumbs(r, [["Web Whizz", "/"], EXT_CRUMB, [TURNOFFAI.name, r.path]]),
      faqPage(r, TURNOFFAI_FAQ)
    ]
  },
  {
    path: TURNOFFAI.privacyPath,
    Page: TurnOffAiPrivacy,
    product: "turnoffai",
    title: "Privacy Policy — AI-Free Web | Web Whizz",
    description: "AI-Free Web never reads your emails, documents or searches and sends nothing unless you choose to. What its opt-in anonymous statistics, reports and our optional surveys collect.",
    updated: TURNOFFAI_PRIVACY_UPDATED
  },
  // The extension's welcome, goodbye (uninstall) and feedback pages. Not for search engines, not in the sitemap.
  ...TURNOFFAI_SURVEY_PAGES.map((survey) => ({
    path: `${TURNOFFAI.path}${survey}/`,
    Page: TurnOffAiSurvey,
    product: "turnoffai",
    survey,
    title: { welcome: "Welcome", goodbye: "Sorry to see you go", feedback: "Feedback" }[survey] + ` — ${TURNOFFAI.name} | Web Whizz`,
    description: `${TURNOFFAI.name}: a short ${survey} survey.`,
    noindex: true
  }))
].map((r) => ({ ...r, url: SITE.url + r.path }));

export const NOT_FOUND = {
  path: "/404",
  Page: NotFound,
  title: "Page not found — Web Whizz",
  description: "This page doesn't exist.",
  noindex: true
};

// "/e/flow-downloader", "/e/flow-downloader/" and ".../index.html" all mean the same page.
export function resolve(pathname) {
  let p = (pathname || "/").replace(/index\.html$/, "");
  if (!p.endsWith("/")) p += "/";
  return ROUTES.find((r) => r.path === p) || NOT_FOUND;
}
