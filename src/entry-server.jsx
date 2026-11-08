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
    route.noindex ? `<meta name="robots" content="noindex" />` : `<link rel="canonical" href="${esc(url)}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${esc(SITE.name)}" />`,
    `<meta property="og:title" content="${esc(route.title)}" />`,
    `<meta property="og:description" content="${esc(route.description)}" />`,
    `<meta property="og:url" content="${esc(url)}" />`
  ];
  // Each translation of a page points to all the others, so search engines show the right language.
  if (route.alternates) {
    for (const a of route.alternates) tags.push(`<link rel="alternate" hreflang="${a.hreflang}" href="${esc(SITE.url + a.path)}" />`);
    tags.push(`<link rel="alternate" hreflang="x-default" href="${esc(SITE.url + route.alternates[0].path)}" />`);
  }
  if (route.image) {
    tags.push(`<meta property="og:image" content="${esc(SITE.url + route.image)}" />`, `<meta name="twitter:card" content="summary_large_image" />`);
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
