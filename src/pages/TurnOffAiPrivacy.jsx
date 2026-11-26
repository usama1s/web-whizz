import { SITE, TURNOFFAI } from "../site.js";

// Same text as store/PRIVACY.md in the extension project (~/Desktop/P Projects/AI free web) — keep the two in sync.
// When the extension gains a permission, stores something new or sends a new field, update both before publishing it.
export const UPDATED = "2026-11-26";

export default function TurnOffAiPrivacy() {
  return (
    <section className="section">
      <div className="wrap narrow prose">
        <p className="eyebrow">
          <a href={TURNOFFAI.path}>{TURNOFFAI.name}</a>
        </p>
        <h1>Privacy Policy</h1>
        <p className="meta">Last updated: November 26, 2026</p>

        <p>
          {TURNOFFAI.name} (“{TURNOFFAI.storeName}”) is a browser extension made by {SITE.legalName}. It hides AI features, such as AI Overviews, Gemini and Copilot buttons, banners and panels, on the websites it
          supports. It is not affiliated with Google or Microsoft.
        </p>

        <h2>What we collect</h2>
        <p>
          Nothing unless you choose to send it. The extension never reads, stores or sends your emails, documents, searches, messages or the addresses of the pages you visit. Only three things can reach us, each
          one your choice: anonymous usage statistics, which are <b>off unless you turn them on</b> (see <a href="#stats">“Anonymous usage statistics”</a>), a report you send about an AI element it missed (see{" "}
          <a href="#reports">“Reports”</a>), and what you send from one of our short web pages (see <a href="#surveys">“Usage counts and surveys”</a>).
        </p>

        <h2>What the extension looks at</h2>
        <p>
          To find AI features, it looks at the labels of buttons, menus and panels on the supported sites, for example a button named “Ask Gemini”, and hides the ones its rules list. That happens inside your
          browser; the labels aren't stored or sent anywhere.
        </p>

        <h2>What stays on your device</h2>
        <ul>
          <li>Your settings: which sites and AI features are switched off, sites where you keep AI, and your own hide rules. They are kept in Chrome's storage and, if you use Chrome sync, synced to your other computers by Google.</li>
          <li>The rules file that says what to hide on each site.</li>
          <li>
            A few usage counts: when you started using it, how many pages it cleaned and how many AI elements it hid (in total and per site), how often you used “Show AI on this page once”, how many reports and
            personal rules you made, and how many rule updates were installed or rejected. No addresses, titles or page content. Removed when you uninstall the extension.
          </li>
        </ul>

        <h2 id="stats">Anonymous usage statistics (off by default)</h2>
        <p>
          The extension sends no statistics unless you turn on “Send anonymous usage statistics” in its popup or settings. If you do, at most once a day, after it has cleaned a page, it sends web-whizz.com what
          changed in the usage counts above since its last message, together with the extension's version, your browser's language, the rules version, roughly how long ago you installed it (a range such as “8 to 30
          days”), which sites you switched off, and whether the master switch is off or your settings are managed by your organization. We use these numbers to see how many people use it, on which sites, and to
          spot a site change that broke a rule.
        </p>
        <p>
          The message has no ID of any kind, no addresses, titles or anything else from the pages you visit, and no cookies are sent with it. Like any web request, it reaches our server from your IP address,
          which we don't store (a scrambled form of it is kept for one hour only, to limit how many messages one address can send). The numbers are kept on web-whizz.com's own server, are never shared or sold,
          and are not sent to Umami or any other analytics service. Because they carry no ID, nobody can tell which messages came from you. Turn the switch off again and nothing more is sent; what you do while
          it's off is never sent later. An organization that manages your browser can also turn statistics off for everyone.
        </p>

        <h2 id="reports">Reports</h2>
        <p>
          If an AI element is still showing, you can click “Something AI still showing?” and point at it. The extension shows you exactly what a report would contain, and sends it only if you tick the consent box
          and press “Send report”: the site's host name (for example mail.google.com), the hide rule it proposes, the element's type and role, and its own short label (for example “Ask Gemini”), plus the
          extension's version and your browser's language. Never page content, addresses or anything you wrote. Reports are kept on web-whizz.com's own server and used only to fix the rules.
        </p>

        <h2>Rule updates</h2>
        <p>
          Every few hours, and when the browser starts, the extension downloads the latest rules file from web-whizz.com. The request carries nothing about you. The file is signed by us, contains data only (never
          code), and is ignored if the signature doesn't match.
        </p>

        <h2 id="surveys">Usage counts and surveys</h2>
        <p>Three short pages on web-whizz.com, our website, can open:</p>
        <ul>
          <li>a welcome page, once, right after you install the extension;</li>
          <li>a short survey when you uninstall it (Chrome opens it after removing the extension);</li>
          <li>a feedback form, when you click “Feedback” in the popup.</li>
        </ul>
        <p>
          Their address carries the extension's version, your browser's language, how many days ago you installed it and the usage counts above. If you press Send, your answers are saved on web-whizz.com together
          with those numbers; if you don't, nothing is saved. Your email address is only stored if you type it in, and only used to reply to you. Umami, the privacy-friendly service that counts visits to
          web-whizz.com, is told to ignore these addresses, so the counts never reach it.
        </p>
        <p>
          The {TURNOFFAI.name} page shows our demo video from YouTube in privacy-enhanced mode (youtube-nocookie.com). When it scrolls into view, your browser loads YouTube's player, so YouTube sees your IP address; YouTube stores
          nothing in your browser until you press play. Playing it is covered by <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Google's privacy policy</a>.
        </p>

        <h2>Permissions</h2>
        <ul>
          <li>
            <b>Access to the supported sites</b> (google.com, youtube.com, Outlook and Microsoft 365 on the web, linkedin.com, bing.com): to hide AI features on those sites. It doesn't run on any other site.
          </li>
          <li>
            <b>storage</b>: your settings and counts. <b>alarms</b>: to check for rule updates every few hours.
          </li>
        </ul>

        <h2>Your choices</h2>
        <ul>
          <li>Turn statistics on or off at any time in the popup.</li>
          <li>Reports and surveys are only sent when you press their Send button.</li>
          <li>Uninstalling the extension removes everything it kept on your computer. To have survey answers, reports or statistics deleted, email us; since statistics have no ID, we can only delete answers you can describe (for example by the email you gave).</li>
        </ul>

        <h2>Changes</h2>
        <p>If what the extension does with data changes, we update this page and the date at the top before that version is published.</p>

        <h2>Contact</h2>
        <p>
          <a href={`mailto:${SITE.email}`}>{SITE.email}</a> · {SITE.legalName}, {SITE.address.join(", ")}
        </p>
      </div>
    </section>
  );
}
