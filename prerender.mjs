// After `vite build`: renders every page to static HTML (dist/<path>/index.html, dist/404.html),
// then writes sitemap.xml and robots.txt. Upload the dist/ folder to any static host.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(fileURLToPath(import.meta.url));
const dist = path.join(root, "dist");
const serverDir = path.join(root, "dist-server");
const template = fs.readFileSync(path.join(dist, "index.html"), "utf8");
const { render, pages, SITE } = await import(path.join(serverDir, "entry-server.js"));

for (const route of pages) {
  const { html, head } = render(route);
  const out = template
    .replace('<html lang="en">', `<html lang="${route.lang || "en"}">`)
    .replace("<!--app-head-->", head).replace("<!--app-html-->", html);
  const file = route.path === "/404" ? path.join(dist, "404.html") : path.join(dist, route.path, "index.html");
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, out);
  console.log("page", path.relative(dist, file));
}

const urls = pages.filter((r) => !r.noindex).map((r) => `  <url><loc>${SITE.url}${r.path}</loc></url>`);
fs.writeFileSync(path.join(dist, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>\n`);
fs.writeFileSync(path.join(dist, "robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${SITE.url}/sitemap.xml\n`);
fs.rmSync(serverDir, { recursive: true, force: true });
console.log("sitemap.xml, robots.txt");
