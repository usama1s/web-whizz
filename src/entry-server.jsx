import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import App from "./App.jsx";
import { ROUTES, NOT_FOUND } from "./routes.jsx";
import { SITE } from "./site.js";

export { SITE };
export const pages = [...ROUTES, NOT_FOUND];

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// The <head> tags for one page: title, description, canonical link and social previews.
function head(route) {
  const url = SITE.url + (route === NOT_FOUND ? "/" : route.path);
  const tags = [
    `<title>${esc(route.title)}</title>`,
    `<meta name="description" content="${esc(route.description)}" />`,
    // max-image-preview:large lets Google show big screenshots in results and Discover.
    route.noindex
      ? `<meta name="robots" content="noindex" />`
      : `<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />\n    <link rel="canonical" href="${esc(url)}" />`,
    `<meta property="og:type" content="${route.ogType || "website"}" />`,
    `<meta property="og:site_name" content="${esc(SITE.name)}" />`,
    `<meta property="og:title" content="${esc(route.title)}" />`,
    `<meta property="og:description" content="${esc(route.description)}" />`,
    `<meta property="og:url" content="${esc(url)}" />`,
    `<meta property="og:locale" content="${route.ogLocale || "en_US"}" />`,
    `<meta name="twitter:title" content="${esc(route.title)}" />`,
    `<meta name="twitter:description" content="${esc(route.description)}" />`
  ];
  // Each translation of a page points to all the others, so search engines show the right language.
  if (route.alternates) {
    for (const a of route.alternates) tags.push(`<link rel="alternate" hreflang="${a.hreflang}" href="${esc(SITE.url + a.path)}" />`);
    tags.push(`<link rel="alternate" hreflang="x-default" href="${esc(SITE.url + route.alternates[0].path)}" />`);
    for (const a of route.alternates) if (a.ogLocale !== route.ogLocale) tags.push(`<meta property="og:locale:alternate" content="${a.ogLocale}" />`);
  }
  if (route.image) {
    tags.push(
      `<meta property="og:image" content="${esc(SITE.url + route.image)}" />`,
      `<meta property="og:image:width" content="1400" />`,
      `<meta property="og:image:height" content="560" />`,
      `<meta property="og:image:alt" content="${esc(route.imageAlt || route.title)}" />`,
      `<meta name="twitter:card" content="summary_large_image" />`,
      `<meta name="twitter:image" content="${esc(SITE.url + route.image)}" />`
    );
  }
  // Structured data for Google (see src/seo.js). "<" is escaped so text can never close the <script> tag.
  if (route.schema) {
    const json = JSON.stringify({ "@context": "https://schema.org", "@graph": route.schema(route) }).replace(/</g, "\\u003c");
    tags.push(`<script type="application/ld+json">${json}</script>`);
  }
  // Visitor analytics (Umami, cookieless). data-domains: only the live site counts, not local previews.
  if (SITE.umamiId) {
    tags.push(`<script defer src="https://cloud.umami.is/script.js" data-website-id="${esc(SITE.umamiId)}" data-domains="${esc(new URL(SITE.url).hostname)}"></script>`);
  }
  return tags.join("\n    ");
}

export function render(route) {
  const html = renderToString(
    <StrictMode>
      <App route={route} />
    </StrictMode>
  );
  return { html, head: head(route) };
}
