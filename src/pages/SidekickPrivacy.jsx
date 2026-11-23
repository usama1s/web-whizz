import { SIDEKICK, SITE } from "../site.js";

// Same text as docs/PRIVACY.md in the extension project (~/Desktop/P Projects/sidekick-boomi) — keep the two in sync.
// When the extension gains a permission or stores something new, update both before publishing that version.
export const UPDATED = "2026-11-23";

export default function SidekickPrivacy() {
  return (
    <section className="section">
      <div className="wrap narrow prose">
        <p className="eyebrow">{SIDEKICK.name}</p>
        <h1>Privacy Policy</h1>
        <p className="meta">Last updated: November 23, 2026</p>

        <p>
          {SIDEKICK.name} (“{SIDEKICK.storeName}”) is an unofficial browser extension that adds developer tools to the Boomi Integration build screen: a better script and Message shape editor, a Set Properties
          editor, keyboard shortcuts and canvas helpers. It is not affiliated with or endorsed by Boomi.
        </p>

        <h2>What we collect</h2>
        <p>
          Nothing while you use it. The extension has no accounts, no analytics and no crash reporting, and it makes no network requests of its own. Nothing it reads from Boomi ever reaches us. The only time
          anything reaches us is when one of our short web pages opens (see <a href="#surveys">“Usage counts and surveys”</a> below).
        </p>

        <h2>What the extension reads</h2>
        <p>
          It only runs on pages under <code>https://*.boomi.com/</code> and <code>https://*.manywho.com/</code>. On those pages it reads what Boomi already shows on screen, so it can add its features:
        </p>
        <ul>
          <li>the process canvas, to find unconnected shapes and endpoints;</li>
          <li>the script, Message shape and Set Properties fields you open, so it can edit them in a better editor and write your changes back into Boomi's own fields;</li>
          <li>Boomi's buttons (Save, Test, OK, Cancel and similar), so its keyboard shortcuts can press them for you.</li>
        </ul>
        <p>It doesn't read passwords or cookies, and it doesn't call Boomi's APIs.</p>

        <h2>What stays on your device</h2>
        <p>Everything below is kept in Chrome's extension storage on your computer only (not synced), and removed when you uninstall the extension.</p>
        <ul>
          <li>Your Sidekick settings and any selector overrides you enter under Options → Advanced.</li>
          <li>Your property dictionary, if you fill one in under Options → Property dictionary (property names and notes you type yourself).</li>
          <li>Any custom code snippets you save.</li>
          <li>Where you last dragged the Set Properties guide on screen, so it opens in the same place.</li>
          <li>A flag that tells it to show “what's new” once after an update.</li>
          <li>
            A few usage counts: when it was installed, and how many times the full editor, an in-place script editor and the Set Properties editor were opened, and how many keyboard shortcuts were used. Just
            numbers, never what was in them.
          </li>
        </ul>
        <p>Your script and Message text stays in Boomi's own fields; the extension doesn't keep a copy. You can export or delete everything from Options → Data.</p>

        <h2>What we share</h2>
        <p>Nothing. We never sell or share data with anyone, and we don't use it for advertising or to decide anyone's credit or eligibility for anything.</p>

        <h2>Permissions</h2>
        <ul>
          <li>
            <b>Access to *.boomi.com and *.manywho.com</b>: add the editors, shortcuts and canvas helpers to Boomi pages. Nothing is read from any other site.
          </li>
          <li>
            <b>storage</b>: keep your settings, property dictionary and the usage counts on your computer.
          </li>
        </ul>

        <h2 id="surveys">Usage counts and surveys</h2>
        <p>Three short pages on web-whizz.com, our website, can open:</p>
        <ul>
          <li>a welcome page, once, right after you install the extension;</li>
          <li>a “Why did you leave?” page, which Chrome opens when you uninstall it;</li>
          <li>a feedback page, only when you click “Feedback” in the extension.</li>
        </ul>
        <p>
          The address of these pages includes the extension's version, your browser's language, the number of days since you installed it and the usage counts listed above, so we can see which features are used. It
          never includes script text, process or component names, account IDs or Boomi addresses. Like any web address, it reaches web-whizz.com's server when the page opens (and may appear in the server's standard
          access log); the counts are only saved, together with your answers, if you press Send. Our website analytics leave these addresses out. Every question is optional except one per page, and your email only if
          you type it in, to get a reply. Answers are stored on web-whizz.com's own server, are never shared or sold, and are used only to improve the extension. You can simply close any of these pages. To have your
          answers deleted, email us.
        </p>

        <h2>Rating</h2>
        <p>“Rate it” opens the extension's Chrome Web Store page. It sends nothing.</p>

        <h2>Chrome Web Store User Data Policy</h2>
        <p>The use of information received from Chrome by {SIDEKICK.name} complies with the Chrome Web Store User Data Policy, including the Limited Use requirements.</p>

        <h2>Changes</h2>
        <p>If a new version changes what the extension reads, stores or sends, we update this page first and change the date at the top.</p>

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

        <p className="fine">Boomi is a trademark of Boomi, LP, and Chrome is a trademark of Google LLC. {SIDEKICK.name} is an independent tool and is not affiliated with either.</p>
      </div>
    </section>
  );
}
