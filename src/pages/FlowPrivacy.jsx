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
        <p className="meta">Last updated: October 26, 2026</p>

        <p>
          {FLOW.name} (“{FLOW.storeName}”) is a browser extension that downloads videos and images from your own Google Flow projects to your computer.
        </p>

        <h2>What we collect</h2>
        <p>Nothing. The extension has no servers, no accounts, no analytics and no tracking.</p>

        <h2>What stays on your device</h2>
        <ul>
          <li>Your settings (preferred quality, wait time, pick mode), stored in Chrome's extension storage.</li>
          <li>The videos and images you download, saved directly to the folder you choose.</li>
        </ul>

        <h2>What we share</h2>
        <p>Nothing. No data is sent to the developer or any third party.</p>

        <h2>Your other downloads</h2>
        <p>The extension only handles the file Google Flow starts right after it clicks Download on one of your items. It never reads, moves, renames or cancels any other download.</p>

        <h2>What it changes in Chrome</h2>
        <p>It allows “automatic downloads” for flow.google.com and labs.google, so Chrome doesn't ask “Download multiple files?” during a batch. No other site or setting is changed.</p>

        <h2>Where it runs</h2>
        <p>Only on Google Flow pages. It downloads only when you press Download or use its keyboard shortcut. When you turn on “Pick” mode, it shows checkboxes on your Flow items and projects.</p>

        <h2>Support link</h2>
        <p>If you click “Support”, your browser opens our tip page on Lemon Squeezy in a new tab. The extension itself sends nothing; any payment is handled by Lemon Squeezy under its own privacy policy.</p>

        <h2>Publisher and contact</h2>
        <p>
          Published by Web Whizz. Questions: <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
        </p>

        <p className="fine">Google Flow is a trademark of Google LLC. {FLOW.name} is an independent tool and is not affiliated with Google.</p>
      </div>
    </section>
  );
}
