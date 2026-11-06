import Home from "./pages/Home.jsx";
import FlowDownloader from "./pages/FlowDownloader.jsx";
import FlowPrivacy from "./pages/FlowPrivacy.jsx";
import NotFound from "./pages/NotFound.jsx";
import { FLOW } from "./site.js";
import { LOCALES } from "./i18n/flow/index.js";

// Every page of the site. Each one is pre-rendered to <path>/index.html at build time.
export const ROUTES = [
  {
    path: "/",
    Page: Home,
    title: "Web Whizz — Online tools that work for you",
    description: "Web Whizz builds focused online tools — point-of-sale systems, browser extensions and more — that take the busywork out of your day."
  },
  // The Flow page in every language (see src/i18n/flow/).
  ...LOCALES.map((l) => ({
    path: l.path,
    Page: FlowDownloader,
    lang: l.hreflang,
    title: l.t.meta.title,
    description: l.t.meta.description,
    image: FLOW.img("og.png"),
    alternates: LOCALES
  })),
  {
    path: FLOW.privacyPath,
    Page: FlowPrivacy,
    title: "Privacy Policy — Flow Bulk Downloader | Web Whizz",
    description: "Flow Bulk Downloader collects no data. No servers, no accounts, no analytics, no tracking."
  }
];

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
