import { FLOW, SITE } from "../site.js";

// Same text as flow-bulk-downloader-store/PRIVACY.md in the extension project (~/Desktop/google flow extension) — keep the two in sync.
export default function FlowPrivacy() {
  return (
    <section className="section">
      <div className="wrap narrow prose">
        <p className="eyebrow">
          <a href={FLOW.path}>{FLOW.name}</a>
        </p>
        <h1>Privacy Policy</h1>
        <p className="meta">Last updated: November 19, 2026</p>

        <p>
          {FLOW.name} (“{FLOW.storeName}”) is a browser extension that downloads videos and images from your own Google Flow projects to your computer.
        </p>

        <h2>What we collect</h2>
        <p>While you use it, nothing. The extension has no accounts, no analytics and no tracking, and it sends nothing in the background. The only time anything reaches us is when one of our short web pages opens (see “Usage counts and surveys” below).</p>

        <h2>What stays on your device</h2>
        <ul>
          <li>Your settings (preferred quality, wait times), stored in Chrome's extension storage. If you use Chrome Sync, Chrome copies these settings to your other computers through your own Google account.</li>
          <li>A list of the items you've already downloaded from each Flow project (their titles), so “Select all except downloaded” can leave them out next time. It is kept only in Chrome's extension storage on your computer and removed when you uninstall the extension.</li>
          <li>While a download is running: which tab is downloading and where the files go. This is kept in memory and cleared when you close the browser.</li>
          <li>The videos and images you download, saved directly to the folder you choose.</li>
          <li>
            A few usage counts: when you started using it, how many downloads you ran (and how many finished, failed or were stopped), how many files they saved or skipped, which options you used (Pick, “items being generated”, several
            projects, “all except downloaded”, a chosen folder) and which quality you picked most. No titles, file names, prompts or addresses. Removed when you uninstall the extension.
          </li>
        </ul>

        <h2>What we share</h2>
        <p>Nothing. We never sell or share data with anyone.</p>

        <h2>Your other downloads</h2>
        <p>The extension only handles the file Google Flow starts right after it clicks Download on one of your items. It never reads, moves, renames or cancels any other download.</p>

        <h2>What it changes in Chrome</h2>
        <p>It allows “automatic downloads” for flow.google.com and labs.google, so Chrome doesn't ask “Download multiple files?” during a batch. No other site or setting is changed.</p>

        <h2>Tabs and windows</h2>
        <p>If you click “Keep going in a separate window”, the extension moves the Flow tab into a window of its own. During a download it checks only how many tabs share that window. It never reads the addresses or contents of your other tabs.</p>

        <h2>Where it runs</h2>
        <p>Only on Google Flow pages. It downloads only when you press Download or use its keyboard shortcut. When you turn on “Pick” mode, it shows checkboxes on your Flow items and projects.</p>

        <h2>Support link</h2>
        <p>If you click “Support”, your browser opens our tip page on Lemon Squeezy in a new tab. The extension itself sends nothing; any payment is handled by Lemon Squeezy under its own privacy policy.</p>

        <h2 id="surveys">Usage counts and surveys</h2>
        <p>Three short pages on web-whizz.com, our website, can open:</p>
        <ul>
          <li>a welcome page, once, right after you install the extension;</li>
          <li>a “Why did you leave?” page, which Chrome opens when you uninstall it;</li>
          <li>a feedback page, only when you click “Feedback” in the extension, or “Not really” when it asks whether it's working well.</li>
        </ul>
        <p>
          The address of these pages includes the extension's version, your browser's language and the usage counts listed above, so we can see which features are used and where things go wrong. Like any web address, it reaches
          web-whizz.com's server when the page opens (and may appear in the server's standard access log); the counts are only saved, together with your answers, if you press Send. Our website analytics leave these addresses out.
          Every question is optional except one per page, and your email only if you type it in, to get a reply. Answers are stored on web-whizz.com's own server, are never shared or sold, and are used only to improve the
          extension. You can simply close any of these pages. To have your answers deleted, email us.
        </p>

        <h2>Rating and sharing</h2>
        <p>“Rate it” opens the extension's Chrome Web Store page. “Share” copies a link to our website. Neither sends anything.</p>

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
        <p>
          The {FLOW.name} page and guide show our demo video from YouTube in privacy-enhanced mode (youtube-nocookie.com). When it scrolls into view, your browser loads YouTube's player, so YouTube sees your IP address; YouTube stores
          nothing in your browser until you press play. Playing it is covered by <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Google's privacy policy</a>.
        </p>

        <p className="fine">Google Flow is a trademark of Google LLC. {FLOW.name} is an independent tool and is not affiliated with Google.</p>
      </div>
    </section>
  );
}
