import { SENTINEL, SITE } from "../site.js";

// Same text as store/PRIVACY.md in the extension project (~/Desktop/P Projects/Smart Sentinel) — keep the two in sync.
// When the extension gains a permission or stores something new, update both before publishing that version.
export const UPDATED = "2026-11-21";

export default function SentinelPrivacy() {
  return (
    <section className="section">
      <div className="wrap narrow prose">
        <p className="eyebrow">
          <a href={SENTINEL.path}>{SENTINEL.name}</a>
        </p>
        <h1>Privacy Policy</h1>
        <p className="meta">Last updated: November 21, 2026</p>

        <p>
          {SENTINEL.name} (“{SENTINEL.storeName}”) is a browser extension that reloads the tabs you choose: on a timer, at random intervals, or between two times of day.
        </p>

        <h2>What we collect</h2>
        <p>
          While you use it, nothing. The extension has no accounts, no analytics and no tracking, and it sends nothing in the background. The addresses of the pages you refresh never leave your computer. The only time
          anything reaches us is when one of our short web pages opens (see “Usage counts and surveys” below).
        </p>

        <h2>What stays on your device</h2>
        <p>Everything below is kept in Chrome's extension storage on your computer only (not synced), and removed when you uninstall the extension.</p>
        <ul>
          <li>
            Your auto refresh rules: the address of each page (or site) you set to refresh, how often, your stop and schedule settings, how many times it has reloaded, and the last load error, if any. This is what lets
            a rule carry on after you restart Chrome. Stopping a refresh deletes its rule.
          </li>
          <li>
            A timing log of the last 48 hours of reloads: when each reload was due, when it actually happened, and whether the tab was in front. It holds no addresses. It is how the extension checks that reloads stay on
            time, and it is never sent anywhere. Older entries are deleted automatically.
          </li>
          <li>
            A few usage counts: when you started using it, how many refreshes you started, how many reloads it did, how many page loads failed, how many refreshes ended on their own, how often each option was used
            (whole site, random interval, custom interval, auto stop, hard reload, between times, every day) and your most used interval (for example “30s”). No addresses, site names or page content.
          </li>
          <li>Whether you answered “Is it working well?”, so it asks only once.</li>
        </ul>

        <h2>What we share</h2>
        <p>Nothing. We never sell or share data with anyone, and we don't use it for advertising or to decide anyone's credit or eligibility for anything.</p>

        <h2>Site access</h2>
        <p>
          The extension can't touch any website until you allow it. When you press Start, Chrome asks whether {SENTINEL.name} may access that one site (or, with “Whole site”, every page on it). Nothing else is
          requested. You can take access back at any time in <code>chrome://extensions</code> → {SENTINEL.name} → Details → Site access.
        </p>
        <p>On a site you've allowed, the extension:</p>
        <ul>
          <li>reloads the tab you started it in, at the times you set;</li>
          <li>
            after each reload, reads one number from the page: its HTTP status code (for example 200, or 503 when the server is busy), so it can wait longer before retrying a failing page. It doesn't read the page's
            text, forms, passwords or cookies;
          </li>
          <li>notices when the page fails to load (no connection, server not found), for the same reason.</li>
        </ul>

        <h2>Your tabs</h2>
        <p>
          When the popup is open, it shows the address and icon of the tab you're looking at, so you can see what you're about to refresh. When Chrome starts, or a tab finishes loading, the extension compares the tab's
          address with your saved rules, so a refresh can pick up again where it left off. Chrome only shows it the addresses of sites you've allowed, and nothing is kept about tabs that don't match a rule.
        </p>

        <h2>What it changes in Chrome</h2>
        <p>
          While a tab is being refreshed, the extension asks Chrome's Memory Saver not to put that tab to sleep, so the refresh doesn't stop. When the refresh stops, the tab goes back to normal. “Hard reload” reloads
          the page without Chrome's cache, like pressing Ctrl+Shift+R. No other setting is changed.
        </p>

        <h2>Permissions</h2>
        <ul>
          <li>
            <b>Site access (asked per site)</b>: reload the page and read its status code, as described above.
          </li>
          <li>
            <b>activeTab</b>: see the address of the tab you opened the popup on, so it can set up a refresh for that page.
          </li>
          <li>
            <b>webNavigation</b>: notice when a reload fails, to retry it.
          </li>
          <li>
            <b>scripting</b>: read the status code of a page you've allowed.
          </li>
          <li>
            <b>alarms, offscreen</b>: keep the timers running on time while Chrome puts the extension to sleep between reloads.
          </li>
          <li>
            <b>storage</b>: keep your rules, the timing log and the usage counts on your computer.
          </li>
        </ul>

        <h2 id="surveys">Usage counts and surveys</h2>
        <p>Three short pages on web-whizz.com, our website, can open:</p>
        <ul>
          <li>a welcome page, once, right after you install the extension;</li>
          <li>a “Why did you leave?” page, which Chrome opens when you uninstall it;</li>
          <li>a feedback page, only when you click “Feedback” in the extension, or “Not really” when it asks whether it's working well.</li>
        </ul>
        <p>
          The address of these pages includes the extension's version, your browser's language and the usage counts listed above, so we can see which features are used and where things go wrong. It never includes the
          pages you refresh. Like any web address, it reaches web-whizz.com's server when the page opens (and may appear in the server's standard access log); the counts are only saved, together with your answers, if
          you press Send. Our website analytics leave these addresses out. Every question is optional except one per page, and your email only if you type it in, to get a reply. Answers are stored on web-whizz.com's
          own server, are never shared or sold, and are used only to improve the extension. You can simply close any of these pages. To have your answers deleted, email us.
        </p>

        <h2>Rating and sharing</h2>
        <p>“Rate it” opens the extension's Chrome Web Store page. “Share” copies a link to our website. Neither sends anything.</p>

        <h2>Chrome Web Store User Data Policy</h2>
        <p>The use of information received from Chrome by {SENTINEL.name} complies with the Chrome Web Store User Data Policy, including the Limited Use requirements.</p>

        <h2>Changes</h2>
        <p>If a new version changes what the extension stores or sends, we update this page first and change the date at the top.</p>

        <h2>Publisher and contact</h2>
        <p>
          Published by Web Whizz. Questions: <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
        </p>

        {/* This section is about the website only, so it is NOT part of PRIVACY.md in the extension project. */}
        <h2>This website</h2>
        <p>
          web-whizz.com counts visits with Umami, a privacy-friendly analytics tool: which pages are viewed, which buttons are clicked, and roughly where visitors come from (country, browser, the site that linked here). It
          sets no cookies, stores no personal data, and doesn't follow you to other sites. On the survey pages it leaves out the page address, so the extension's usage counts never reach it.
        </p>

        <p className="fine">Chrome is a trademark of Google LLC. {SENTINEL.name} is an independent tool and is not affiliated with Google.</p>
      </div>
    </section>
  );
}
