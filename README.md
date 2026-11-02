# web-whizz.com

The Web Whizz website: a static site made with plain React + Vite (no router, no framework). Every page is pre-rendered to real HTML at build time, so it works on any static hosting, with no server rules needed.

| URL | File |
|---|---|
| `/` | `src/pages/Home.jsx`: Web Whizz landing page |
| `/e/flow-downloader/` | `src/pages/FlowDownloader.jsx`: Flow Bulk Downloader page, guide and FAQ |
| `/e/flow-downloader/privacy/` | `src/pages/FlowPrivacy.jsx`: privacy policy (keep in sync with `flow-bulk-downloader-store/PRIVACY.md` in the extension project, `~/Desktop/google flow extension/`) |
| any other URL | `src/pages/NotFound.jsx`, built as `404.html` |

## Things you'll change most

Edit `src/site.js`:
- `FLOW.chromeStoreUrl`: the Chrome Web Store link once the extension is live. The "Coming soon" badge turns into **Add to Chrome**.
- `FLOW.supportUrl`: the Lemon Squeezy checkout link. A **Support development** button appears.
- `FLOW.version`, `SITE.email`.

## Commands

```bash
npm install        # once
npm run dev        # local preview while editing (http://localhost:5173)
npm run build      # builds the finished site into dist/
npm run preview    # serves dist/ locally to check the build
```

`npm run build` also writes `sitemap.xml` and `robots.txt`.

## Publishing on cPanel

1. **Make the upload zip:** in this folder, run
   ```bash
   npm run zip
   ```
   This builds the site and creates `web-whizz-site.zip`, with all files at the top level, including the hidden `.htaccess`.
2. **Log in to cPanel → File Manager →** open the **`web-whizz.com`** folder in your home folder (`/home2/codifyp1/web-whizz.com`). That's the site's Document Root; it is **not** inside `public_html`, which belongs to codify.pk.
   - Turn on **Settings → Show Hidden Files**, so you can see `.htaccess`.
   - Leave the host's `cgi-bin`, `.user.ini` and `php.ini` there. The host's original `.htaccess` was kept as `.htaccess.host-backup`.
3. **Upload** `web-whizz-site.zip` into that folder, then right-click it → **Extract** (into the same folder). Replace existing files if asked.
4. **Delete** the zip afterwards.
5. **SSL:** cPanel's AutoSSL covers web-whizz.com (Let's Encrypt, renews automatically). `.htaccess` sends all http visits to https.
6. **Check:**
   - `https://web-whizz.com/`
   - `https://web-whizz.com/e/flow-downloader/`
   - `https://web-whizz.com/e/flow-downloader/privacy/`
   - `https://web-whizz.com/anything-else` (should show the 404 page)

**Updating later** (e.g. after adding the Chrome Web Store or support link in `src/site.js`): repeat steps 1, 3 and 4.

`public/.htaccess` (copied into the build) shows the site's 404 page for unknown links, sets cache rules (files in `/assets/` cached for a year, pages always fresh), and has the optional HTTPS redirect.

Other hosts work too: upload the contents of `dist/` to the web root. On Cloudflare Pages or Netlify, use build command `npm run build`, output `dist`, root `website`.

## Adding another extension

1. Add its settings to `src/site.js`, and its images to `public/e/<slug>/`.
2. Create `src/pages/<Name>.jsx` (copy `FlowDownloader.jsx` as a starting point).
3. Add it to `ROUTES` in `src/routes.jsx`, and add a card in `src/pages/Home.jsx`.
