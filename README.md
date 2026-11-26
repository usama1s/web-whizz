# web-whizz.com

The Web Whizz website: a static site made with plain React + Vite (no router, no framework). Every page is pre-rendered to real HTML at build time, so it works on any static hosting, with no server rules needed.

| URL | File |
|---|---|
| `/` | `src/pages/Home.jsx`: Web Whizz landing page |
| `/e/` | `src/pages/Extensions.jsx`: every Chrome extension (the header's **Chrome extensions** link). The list itself, also used on the home page, is `EXTENSIONS` in `src/components/Extensions.jsx` |
| `/e/flow-downloader/` | `src/pages/FlowDownloader.jsx`: Flow Bulk Downloader page, guide, FAQ, changelog and Pro waitlist |
| `/tr/`, `/vi/`, `/pt/`, `/es/`, `/id/` + `e/flow-downloader/` | The same page in Turkish, Vietnamese, Portuguese (Brazil), Spanish and Indonesian |
| `/api/waitlist.php` | `public/api/waitlist.php`: saves "Pro coming soon" signups (PHP, runs on the cPanel host) |
| `/e/flow-downloader/welcome/`, `/goodbye/`, `/feedback/` | `src/pages/FlowSurvey.jsx`: the extension's surveys (not indexed, not in the sitemap). See **Extension surveys** below |
| `/api/feedback.php` | `public/api/feedback.php`: saves the survey answers |
| `/admin/` | `public/admin/index.php`: private dashboard of every survey answer and waitlist signup (super admin login). See **Admin dashboard** below |
| `/e/flow-downloader/privacy/` | `src/pages/FlowPrivacy.jsx`: privacy policy (keep in sync with `flow-bulk-downloader-store/PRIVACY.md` in the extension project, `~/Desktop/google flow extension/`) |
| `/e/smart-sentinel/` | `src/pages/SmartSentinel.jsx`: Smart Sentinel page (English only): features, screenshots, how it works, FAQ |
| `/e/smart-sentinel/privacy/` | `src/pages/SentinelPrivacy.jsx`: Smart Sentinel privacy policy (keep in sync with `store/PRIVACY.md` in the extension project, `~/Desktop/P Projects/Smart Sentinel/`) |
| `/e/smart-sentinel/welcome/`, `/goodbye/`, `/feedback/` | `src/pages/SentinelSurvey.jsx`: Smart Sentinel's surveys (not indexed). See **Extension surveys** |
| `/e/sidekick-boomi/` | `src/pages/SidekickBoomi.jsx`: Sidekick for Boomi page (English only): features, FAQ. No screenshots yet |
| `/e/sidekick-boomi/privacy/` | `src/pages/SidekickPrivacy.jsx`: Sidekick for Boomi privacy policy, linked from its Chrome Web Store listing (keep in sync with `docs/PRIVACY.md` in the extension project, `~/Desktop/P Projects/sidekick-boomi/`) |
| `/e/sidekick-boomi/welcome/`, `/goodbye/`, `/feedback/` | `src/pages/SidekickSurvey.jsx`: Sidekick's surveys (not indexed). See **Extension surveys** |
| `/e/turn-off-ai/` | `src/pages/TurnOffAi.jsx`: Turn Off AI page (English only): what it hides per site, features, FAQ |
| `/e/turn-off-ai/privacy/` | `src/pages/TurnOffAiPrivacy.jsx`: Turn Off AI privacy policy (keep in sync with `store/PRIVACY.md` in the extension project, `~/Desktop/P Projects/AI free web/`) |
| `/e/turn-off-ai/welcome/`, `/goodbye/`, `/feedback/` | `src/pages/TurnOffAiSurvey.jsx`: Turn Off AI's surveys (not indexed). See **Extension surveys** |
| `/e/turn-off-ai/rules/rules.json` (+ `.sig`) | `public/e/turn-off-ai/rules/`: Turn Off AI's signed rules file. See **Turn Off AI rules, reports and usage statistics** |
| `/api/toa-usage.php`, `/api/toa-report.php` | Turn Off AI's opt-in usage statistics and "Something AI still showing?" reports (shared code in `toa-common.php`) |
| any other URL | `src/pages/NotFound.jsx`, built as `404.html` |

## Things you'll change most

Edit `src/site.js`:
- `FLOW.stats`: users, star rating and number of ratings shown next to **Add to Chrome**. Copy them from the store listing now and then. Each stays hidden until it reaches `FLOW.statsMin` (100 users; 5 ratings averaging 4.0+).
- `FLOW.version` and `RELEASES`: add a line to `RELEASES` for every new version, and its notes under `changelog.entries` in each language file.
- `FLOW.demoVideo`: put a screen recording (e.g. `demo.mp4`) in `public/e/flow-downloader/` and name it here to replace the animated demo.
- `FLOW.chromeStoreUrl`, `SITE.email`.
- `SENTINEL.chromeStoreUrl`: Smart Sentinel's store link (empty would make its page say "Coming soon" and hide the surveys' Rate and Reinstall links). Also `SENTINEL.version` / `released` for each new version.

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

### Extension surveys

Both extensions have the same three surveys. The form is `src/components/Survey.jsx`; each product's questions are in `src/pages/FlowSurvey.jsx` and `src/pages/SentinelSurvey.jsx`, and its allowed answers, address counts and CSV columns are in the `PRODUCTS` list at the top of `public/api/feedback.php`. The form sends a hidden `product` field (`flow` or `sentinel`; missing means `flow`).

**Smart Sentinel** (1.0.0+) opens them from `src/lib/usage.ts` in the extension: welcome after install, goodbye on uninstall, and feedback from the popup's Feedback link or "Not really" on its "Is it working well?" prompt. Answers go to `/home2/codifyp1/web-whizz-data/smart-sentinel-feedback.csv`, with the email subject starting "Smart Sentinel:". CSV columns: `date, type, v, lang, from, days, starts, reloads, errors, finished, site, random, custom, stop, hard, sched, daily, iv, reason, tool, rating, use, source, before, want, monitor, stay, bad, good, email` (`site` … `daily`: how many started refreshes used that option; `iv`: most used interval).

**Flow Bulk Downloader:** the extension (2.6.3+) opens three pages: **welcome** once after install, **goodbye** when it's uninstalled (Chrome's uninstall page), and **feedback** from the popup's Feedback link or the "Not really" answer on its on-page badge. Their address carries the extension's version, UI language and a few anonymous usage counts (runs, files, which options were used, most-used quality); the page sends those along with the answers.

Answers go to `/api/feedback.php`, which appends one row per answer to `/home2/codifyp1/web-whizz-data/flow-feedback.csv` (outside the web root; open it in cPanel → File Manager, or download it and open in Google Sheets/Excel) and emails a summary to `support@web-whizz.com`. Same spam protection as the waitlist (honeypot, time check), and 5 answers per IP per hour. Only known answer values are kept, so when you change a question's choices in `FlowSurvey.jsx`, change the lists at the top of `feedback.php` too. Umami counts visits to these pages but is told to ignore their address (`data-exclude-search`), so the usage counts never reach it; it does record the events `survey-welcome`, `survey-goodbye`, `survey-feedback`, `share`, `reinstall-click`.

Flow CSV columns: `date, type, v, lang, from, days, runs, okRuns, files, skipped, errRuns, stopped, pick, wait, home, newOnly, folder, qv, qi, reason, tool, rating, plan, use, source, volume, want, chain, stay, bad, good, email, stopUser, stopCredits, stopPrompt, stopPage`. The last four (from 2.6.4) split `stopped` by cause: Stop pressed, Flow out of credits, Stop chosen at a credit question, the Flow page changed; older installs' stops have no cause, so they can add up to less than `stopped`. New columns only ever go at the end: `feedback.php` then rewrites an older CSV's header line in place.

### Flow usage statistics

From 2.6.4 the Flow Bulk Downloader sends anonymous usage statistics (popup switch, on by default) to `/api/usage.php`: at most one POST a day per install, only after a download ran, plus one `new=1` message on install day. Each holds what changed since that install's last send, and the install's age only as a range (`0`, `1-7`, `8-30`, `31-90`, `91+`), so messages can't be linked by it. There is no ID: active installs are counted from the `wk=1` / `mo=1` flags (first send with runs in a new UTC week / month). `usage.php` keeps only known fields, accepts only the extension's origin (CORS, `ORIGINS`), allows 30 messages per IP per hour (hashed IP, kept an hour, `web-whizz-data/usage-rate.json`) and appends to `/home2/codifyp1/web-whizz-data/flow-usage.csv`.

Columns: `date, v, lang, new, weekFirst, monthFirst, age, runs, okRuns, files, skipped, errRuns, stopped, stopUser, stopCredits, stopPrompt, stopPage, pick, wait, home, newOnly, folder, qv, qi, er`. `qv`, `qi` and `er` are `name:count,name:count` (video quality, image quality, why items were skipped). Skip codes: `menu, quality, plan, hidden, flow, timeout, ask, declined, notFound, genFailed, stillGen, project, other` (labels in the admin's `USAGE_ERRS`). Keep the lists in sync with the extension's `background.js`. New columns only at the end.

**Publish the site before releasing 2.6.4**; until `usage.php` is live the extension just keeps its counts and tries again another day.

### Turn Off AI rules, reports and usage statistics

**Turn Off AI** (extension code: `~/Desktop/P Projects/AI free web`, github.com/usama1s/Turn-Off-AI) uses the same three surveys (product `turnoffai`, `turn-off-ai-feedback.csv`; columns `date, type, v, lang, from, days, pages, hidden, showOnce, reports, customRules, rulesOk, rulesFail, top, off, reason, tool, where, rating, role, source, annoy, want, stay, bad, good, email`) and three more things on this site:

- **Rules:** `public/e/turn-off-ai/rules/rules.json` and `rules.json.sig`, made in the extension repo with `npm run rules:sign` (bump the version first). The extension downloads them every 6 hours and only uses a file whose signature matches and that is newer than its own. The folder's `.htaccess` allows cross-origin reads and turns off caching. To ship a fix: copy both files here, `npm run zip`, upload.
- **Reports** (`/api/toa-report.php`, sent only after the user ticks the consent box): site, host, proposed selector, element tag/role/short label → `turn-off-ai-reports.csv` (columns `date, v, lang, site, host, selector, stable, tag, role, label`) and an email to support@. 10 per IP per hour.
- **Usage statistics** (`/api/toa-usage.php`): like Flow's, but **off by default** — only installs that turned them on send. At most one message a day per install, only after a page was cleaned, plus `new=1` on install day. No ID; age as a range; `wk` / `mo` flags count active installs. Columns: `date, v, lang, new, weekFirst, monthFirst, age, rulesVersion, pages, hidden, showOnce, reports, customRules, rulesOk, rulesFail, sites, off, masterOff, managed` (`sites` = `site:count,…` hidden per site; `off` = sites switched off). 30 per IP per hour. Keep in sync with the extension's `src/shared/usage.ts`.

Both endpoints accept only the extension's origin: **replace `REPLACE_WITH_CHROME_EXTENSION_ID` in `public/api/toa-common.php` with the store ID** (and add the Edge ID) once it's published; until then they answer 403 and the extension retries another day. Publish the site before the extension goes live.

### Admin dashboard

`https://web-whizz.com/admin/` (`public/admin/index.php`) shows every survey answer and waitlist signup from the CSVs above: one tab per product, counts, charts (uninstall reasons, ratings, wanted features, uses, sources), filters by survey type, search, "only with written comments", and a **Download CSV** button. The **Flow usage** tab shows the statistics above: active and new installs per week (last 12), runs, finished-OK rate, files, stop causes, skip reasons, options, qualities and languages for a chosen period, and a table by version. The **Turn Off AI usage** tab shows its opt-in statistics (active and new installs per week, pages cleaned, AI hidden per site, sites switched off, rules versions, by version), and **Turn Off AI reports** lists reported elements grouped by host + selector, most reported first. It's private: nothing links to it, it's never indexed, and every page (and download) needs the super admin login (the email in `ADMIN_USER`). Only a bcrypt hash of the password is in the code, because this repo is public. The steps to change the password are at the top of the file. 5 wrong passwords lock that IP out for 15 minutes. When you change a survey's answer choices, also update `LABELS` there, or the dashboard shows the raw code.

**Publish the site before any extension version that opens these pages** (for Smart Sentinel: before 1.0.0 goes live on the store), or uninstalling users land on the 404 page.

### Analytics

Visits and clicks are counted with [Umami Cloud](https://cloud.umami.is) (free Hobby plan, EU data region, no cookies, so no consent banner). The script is added to every page when `SITE.umamiId` in `src/site.js` is set; empty it to turn analytics off. Only visits on web-whizz.com count, so local previews don't.

Tracked clicks (Umami → **Events**): `add-to-chrome`, `waitlist-signup`, `language-switch`, `email-click`, `reviews-click`, `home-flow-card`, `home-sentinel-card`. Events from Smart Sentinel's pages carry `product: sentinel`. To track another link, give it `data-umami-event="name"`. The Add to Chrome links carry `utm_` tags, so the Chrome Web Store dashboard shows installs that came from the site. The privacy page has a short "This website" section about this.

### Screenshots

Every screenshot (`Shot` in `src/components/Flow.jsx`) opens full screen over the page when clicked (`src/components/Lightbox.jsx`): ← → move between the page's screenshots, Esc or a click outside closes it. Ctrl/Cmd-click still opens the image in a new tab.

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
   This builds the site and creates `deploy/<date>/web-whizz-site.zip` (one dated folder per release; `deploy/` is not kept in git), with all files at the top level, including the hidden `.htaccess`.
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
   - `https://web-whizz.com/e/flow-downloader/feedback/?v=test`: send a test answer, check `flow-feedback.csv` and the email, then delete the test row
   - `https://web-whizz.com/e/smart-sentinel/`, `.../privacy/`, and `.../feedback/?v=test`: send a test answer, check `smart-sentinel-feedback.csv` and the email, then delete the test row
   - `https://web-whizz.com/e/sidekick-boomi/`, `.../privacy/`, and `.../feedback/?v=test`: send a test answer, check `sidekick-boomi-feedback.csv` and the email, then delete the test row
   - `https://web-whizz.com/e/turn-off-ai/`, `.../privacy/`, `.../feedback/?v=test` (send a test answer, check `turn-off-ai-feedback.csv`, delete the row), and `.../rules/rules.json`
   - `https://web-whizz.com/anything-else` (should show the 404 page)

**Updating later** (e.g. after changing `FLOW.stats` in `src/site.js`): repeat steps 1, 3 and 4.

`public/.htaccess` (copied into the build) shows the site's 404 page for unknown links, sets cache rules (files in `/assets/` cached for a year, pages always fresh), and has the optional HTTPS redirect.

Other hosts work too: upload the contents of `dist/` to the web root. On Cloudflare Pages or Netlify, use build command `npm run build`, output `dist`, root `website`.

## Adding another extension

1. Add its settings to `src/site.js` (like `SENTINEL`), and its images to `public/e/<slug>/`.
2. Add it to `EXTENSIONS` in `src/components/Extensions.jsx`: it then shows on `/e/` and the home page.
3. Create `src/pages/<Name>.jsx` (copy `FlowDownloader.jsx` as a starting point).
4. Add it to `ROUTES` in `src/routes.jsx` (breadcrumb: `["Web Whizz", "/"], EXT_CRUMB, [name, path]`), and a link in `Footer.jsx`.
5. Surveys: copy `SentinelSurvey.jsx`, and add the product to `PRODUCTS` in `public/api/feedback.php`.
