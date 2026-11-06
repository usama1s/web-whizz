# web-whizz.com

The Web Whizz website: a static site made with plain React + Vite (no router, no framework). Every page is pre-rendered to real HTML at build time, so it works on any static hosting, with no server rules needed.

| URL | File |
|---|---|
| `/` | `src/pages/Home.jsx`: Web Whizz landing page |
| `/e/flow-downloader/` | `src/pages/FlowDownloader.jsx`: Flow Bulk Downloader page, guide, FAQ, changelog and Pro waitlist |
| `/tr/`, `/vi/`, `/pt/`, `/es/`, `/id/` + `e/flow-downloader/` | The same page in Turkish, Vietnamese, Portuguese (Brazil), Spanish and Indonesian |
| `/api/waitlist.php` | `public/api/waitlist.php`: saves "Pro coming soon" signups (PHP, runs on the cPanel host) |
| `/e/flow-downloader/privacy/` | `src/pages/FlowPrivacy.jsx`: privacy policy (keep in sync with `flow-bulk-downloader-store/PRIVACY.md` in the extension project, `~/Desktop/google flow extension/`) |
| any other URL | `src/pages/NotFound.jsx`, built as `404.html` |

## Things you'll change most

Edit `src/site.js`:
- `FLOW.stats`: users, star rating and number of ratings shown next to **Add to Chrome**. Copy them from the store listing now and then. Each stays hidden until it reaches `FLOW.statsMin` (100 users; 5 ratings averaging 4.0+).
- `FLOW.version` and `RELEASES`: add a line to `RELEASES` for every new version, and its notes under `changelog.entries` in each language file.
- `FLOW.demoVideo`: put a screen recording (e.g. `demo.mp4`) in `public/e/flow-downloader/` and name it here to replace the animated demo.
- `FLOW.chromeStoreUrl`, `SITE.email`.

### Translations

All text on the Flow page (and the header/footer around it) lives in `src/i18n/flow/<lang>.js`. `en.js` is the original; the other files are translations with the same keys. When you change the English text, change the other languages too. To add a language, copy `en.js`, translate it, and add one line to `LOCALES` in `src/i18n/flow/index.js`. The build creates `/<code>/e/flow-downloader/` and the `hreflang` links automatically.

Button names inside the extension (**Download**, **Choose folder…**) are written the way the extension shows them in that language. The extension speaks English, Spanish, Portuguese (Brazil), Vietnamese, Indonesian and Hindi (its `_locales/` folder), so the es, pt, vi and id pages use its translated names, and the Turkish page uses the English ones, because the extension falls back to English there.

### Pro waitlist

The form on the Flow page posts to `/api/waitlist.php`. Every new email is added to `/home2/codifyp1/web-whizz-data/flow-pro-waitlist.csv` (outside the web root, so it can't be downloaded from the site; open it in cPanel → File Manager), and a notice is emailed to `support@web-whizz.com`.

Spam protection works without a captcha. Bots are told "you're on the list", but nothing is saved or emailed when:
- the hidden honeypot field is filled in,
- the form was sent without running the page (so it needs JavaScript), within 3 seconds of appearing, or more than a day later (timed by the browser, so a wrong clock on the visitor's computer doesn't matter),
- the same IP has already signed up 3 times in the last hour (only a hash of the IP is kept, in `web-whizz-data/waitlist-rate.json`, for an hour).

Addresses that can't receive mail get the normal error, so a person can fix a typo: test domains like `example.com`, common throwaway inboxes like Mailinator, and domains with no mail server. The list of throwaway domains is in `waitlist.php`.

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
   - `https://web-whizz.com/tr/e/flow-downloader/` (and the other languages)
   - `https://web-whizz.com/e/flow-downloader/privacy/`
   - The **Join the waitlist** form on the Flow page, then check that the CSV appeared
   - `https://web-whizz.com/anything-else` (should show the 404 page)

**Updating later** (e.g. after changing `FLOW.stats` in `src/site.js`): repeat steps 1, 3 and 4.

`public/.htaccess` (copied into the build) shows the site's 404 page for unknown links, sets cache rules (files in `/assets/` cached for a year, pages always fresh), and has the optional HTTPS redirect.

Other hosts work too: upload the contents of `dist/` to the web root. On Cloudflare Pages or Netlify, use build command `npm run build`, output `dist`, root `website`.

## Adding another extension

1. Add its settings to `src/site.js`, and its images to `public/e/<slug>/`.
2. Create `src/pages/<Name>.jsx` (copy `FlowDownloader.jsx` as a starting point).
3. Add it to `ROUTES` in `src/routes.jsx`, and add a card in `src/pages/Home.jsx`.
