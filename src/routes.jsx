import Home from "./pages/Home.jsx";
import FlowDownloader from "./pages/FlowDownloader.jsx";
import FlowGuide, { GUIDE } from "./pages/FlowGuide.jsx";
import FlowPrivacy from "./pages/FlowPrivacy.jsx";
import FlowSurvey, { SURVEY_PAGES } from "./pages/FlowSurvey.jsx";
import NotFound from "./pages/NotFound.jsx";
import { FLOW, RELEASES, SITE } from "./site.js";
import { LOCALES } from "./i18n/flow/index.js";
import { breadcrumbs, faqPage, organization, softwareApp, video, webPage, website, APP, ORG } from "./seo.js";

// Every page of the site. Each one is pre-rendered to <path>/index.html at build time.
// title/description → <title> and meta description. updated → <lastmod> in sitemap.xml (change it when the page's text changes).
// schema(route) → the page's structured data (see src/seo.js).
export const ROUTES = [
  {
    path: "/",
    Page: Home,
    title: "Web Whizz — Online tools that work for you",
    description: "Web Whizz builds focused online tools — point-of-sale systems, browser extensions and more — that take the busywork out of your day.",
    updated: RELEASES[0].date,
    schema: (r) => [organization(), website(), webPage(r, { about: { "@id": ORG } })]
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
      breadcrumbs(r, [["Web Whizz", "/"], [FLOW.name, r.path]]),
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
      breadcrumbs(r, [["Web Whizz", "/"], [FLOW.name, FLOW.path], [GUIDE.crumb, r.path]]),
      faqPage(r, GUIDE.faq),
      ...(FLOW.youtube?.id ? [video()] : [])
    ]
  },
  {
    path: FLOW.privacyPath,
    Page: FlowPrivacy,
    title: "Privacy Policy — Flow Bulk Downloader | Web Whizz",
    description: "Flow Bulk Downloader sends nothing while you use it: no accounts, no analytics, no tracking. What our optional surveys collect, and why.",
    updated: "2026-11-18"
  },
  // The extension's welcome, goodbye (uninstall) and feedback pages. Not for search engines, not in the sitemap.
  ...SURVEY_PAGES.map((survey) => ({
    path: `${FLOW.path}${survey}/`,
    Page: FlowSurvey,
    survey,
    title: { welcome: "Welcome", goodbye: "Sorry to see you go", feedback: "Feedback" }[survey] + ` — ${FLOW.name} | Web Whizz`,
    description: `${FLOW.name}: a short ${survey === "welcome" ? "welcome" : survey} survey.`,
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
