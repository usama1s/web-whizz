import Icon from "../components/Icon.jsx";
import { Shot, StoreButton, SupportButton } from "../components/Flow.jsx";
import { FLOW, SITE } from "../site.js";

const FEATURES = [
  { icon: "video", title: "Videos and images", text: "GIF, 720p, 1080p or 4K videos and 1K, 2K or 4K images — 4K where your plan allows." },
  { icon: "sliders", title: "Only what your plan offers", text: "It reads Flow's own Download menu first and lists only the qualities you can actually get." },
  { icon: "pick", title: "Pick or take it all", text: "Tick exactly the items you want, or tick nothing to download the whole project." },
  { icon: "layers", title: "Several projects at once", text: "Start from Flow's home page; each project lands in its own subfolder." },
  { icon: "folder", title: "Any folder, clean names", text: "Save anywhere — even a new folder — as “01 - Title.mp4”, “02 - …”. Nothing is ever overwritten." },
  { icon: "inbox", title: "Leaves other downloads alone", text: "Only the files from your project are handled. Everything else you download keeps its own name and folder." },
  { icon: "grid", title: "Status on every tile", text: "Yellow = downloading, green = done, red = skipped. Live progress for every project." },
  { icon: "retry", title: "Nothing missed quietly", text: "Anything that took too long is listed at the end with a one-click “Try again”." }
];

const TOC = [
  ["install", "Install"],
  ["download-project", "Download a project"],
  ["pick", "Pick specific items"],
  ["several-projects", "Several projects at once"],
  ["quality", "Quality options"],
  ["files", "Where files go"],
  ["while-running", "While it runs"],
  ["timeouts", "Timeouts and retry"],
  ["same-title", "Items with the same title"],
  ["settings", "Settings and shortcut"],
  ["troubleshooting", "Troubleshooting"],
  ["faq", "FAQ"],
  ["privacy", "Privacy"]
];

const FAQ = [
  ["Is it free?", "Yes. Everything works for free, with no account. If it saves you time, you can support development — that's optional."],
  [
    "Does it use my Flow credits?",
    "The extension clicks Flow's own Download options for you, exactly as you would by hand. Whether a quality (for example a 1080p or 4K upscale) costs credits is decided by Flow and your plan, so check that in Flow before downloading a large batch."
  ],
  ["Does it touch my other downloads?", "No. It only handles the file Flow starts right after it clicks Download on one of your items. Everything else you download keeps its own name and folder, even while a batch is running."],
  ["Will it overwrite files I already have?", "Never. If a file name is taken, the new file gets (2), (3) and so on."],
  ["Does it click Flow's “Upgrade” button?", "Never. Qualities your plan doesn't include simply aren't offered."],
  ["Does it work alongside other Flow extensions?", "Yes. It ignores downloads started by other extensions and only adjusts file names while one of its own runs needs subfolders."],
  ["Which browsers are supported?", "Google Chrome on desktop (Windows, Mac, Linux, ChromeOS). Other Chromium browsers may work but aren't tested."],
  ["Is it made by Google?", "No. Flow Bulk Downloader is an independent tool by Web Whizz and isn't affiliated with Google."]
];

export default function FlowDownloader() {
  return (
    <>
      <section className="hero hero-product">
        <div className="wrap hero-grid">
          <div>
            <div className="product-id">
              <img src={FLOW.img("logo.png")} alt="" width="64" height="64" />
              <span className="eyebrow">Chrome extension</span>
            </div>
            <h1>{FLOW.name}</h1>
            <p className="lead">
              Download all your Google Flow videos and images in one go — in the quality your plan offers, into any folder you choose. No more ⋮ → Download → 1080p for every single item.
            </p>
            <div className="actions">
              <StoreButton />
              <a className="btn btn-ghost" href="#guide">
                Read the guide
              </a>
            </div>
            <p className="meta">Free · v{FLOW.version} · No account · No tracking</p>
          </div>
          <Shot file="shot-quality-folder.png" alt="The quality and folder dialog: videos 270p GIF, 720p, 1080p; images 1K, 2K; choose a folder or use Downloads" eager />
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <h2 className="section-title">What it does</h2>
          <div className="features features-4">
            {FEATURES.map((f) => (
              <div className="feature" key={f.title}>
                <span className="feature-icon">
                  <Icon name={f.icon} />
                </span>
                <h3>{f.title}</h3>
                <p>{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="wrap">
          <h2 className="section-title">See it in action</h2>
          <div className="gallery">
            <Shot file="shot-downloading.png" alt="A project downloading, with green, yellow, red and queued tiles" caption="Every tile shows where it is: downloaded, downloading, skipped or queued." />
            <Shot file="shot-several-projects.png" alt="Lock screen showing 2 of 5 projects finished and a per-project list" caption="Several projects in one run, each into its own subfolder." />
            <Shot file="shot-quality-folder.png" alt="Quality and folder dialog" caption="Only the qualities your plan offers; pick any folder." />
            <Shot file="shot-retry.png" alt="Dialog listing one timed-out item with a Try again button" caption="Anything that timed out is listed, with one-click retry." />
          </div>
        </div>
      </section>

      <section id="guide" className="section">
        <div className="wrap docs">
          <aside className="toc">
            <details open>
              <summary>On this page</summary>
              <nav aria-label="Guide">
                {TOC.map(([id, label]) => (
                  <a key={id} href={`#${id}`}>
                    {label}
                  </a>
                ))}
              </nav>
            </details>
          </aside>

          <article className="prose">
            <h2 className="section-title">Guide</h2>

            <h3 id="install">Install</h3>
            {FLOW.chromeStoreUrl ? (
              <ol>
                <li>
                  Open the <a href={FLOW.chromeStoreUrl}>Chrome Web Store page</a> and click <b>Add to Chrome</b>.
                </li>
                <li>
                  Click the puzzle-piece icon in Chrome's toolbar and <b>pin</b> Flow Bulk Downloader, so it's one click away.
                </li>
              </ol>
            ) : (
              <p>
                Flow Bulk Downloader is on its way to the Chrome Web Store. Once it's live, you'll install it with one click from this page — and then pin it from the puzzle-piece icon in Chrome's toolbar.
              </p>
            )}

            <h3 id="download-project">Download a project</h3>
            <ol>
              <li>Open your project in Google Flow and keep that tab in front.</li>
              <li>
                Click the extension icon → <b>Download</b> (or press <kbd>Alt</kbd>+<kbd>Shift</kbd>+<kbd>D</kbd>).
              </li>
              <li>Pick the quality for videos and for images. Only qualities your plan offers are listed; unavailable ones are named underneath.</li>
              <li>
                Choose where to save: <b>Choose folder…</b> (any folder, or click <b>New folder</b>), <b>Same folder as last time</b>, or <b>Just use your Downloads folder</b>. Chrome may ask once to let the page edit that folder — click <b>Allow / Edit files</b>.
              </li>
              <li>Sit back. Items are downloaded one at a time; upscales can take a few minutes each.</li>
            </ol>

            <h3 id="pick">Pick specific items</h3>
            <p>
              Tick <b>Pick videos &amp; images</b> in the popup. A checkbox appears on every finished tile — tick the ones you want, then press Download. <b>Select all</b> and <b>Clear</b> are in the popup. With nothing ticked, everything is downloaded. Failed generations never get a checkbox.
            </p>

            <h3 id="several-projects">Several projects at once</h3>
            <ol>
              <li>Go to Flow's home page (your list of projects).</li>
              <li>Optional: tick <b>Pick projects</b> in the popup and tick the projects you want (none ticked = all projects).</li>
              <li>Press Download. It peeks into the projects first to see which types and qualities exist, then asks quality and folder once.</li>
              <li>
                It opens each project by itself and saves it into its own subfolder named after the project, e.g. <code>My folder/Travel reel/01 - Taj Mahal at dawn.mp4</code>.
              </li>
            </ol>

            <h3 id="quality">Quality options</h3>
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Type</th>
                    <th>Qualities</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Videos</td>
                    <td>GIF (270p) · 720p (original) · 1080p (upscaled) · 4K (upscaled)</td>
                  </tr>
                  <tr>
                    <td>Images</td>
                    <td>1K (original) · 2K (upscaled) · 4K (upscaled)</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              Your last choice is remembered. If it isn't available on your plan, the closest one is picked and the dialog says so. <b>Skip</b> appears only when a batch has both videos and images, and it's never remembered.
            </p>

            <h3 id="files">Where files go</h3>
            <ul>
              <li>
                <b>Chosen folder:</b> files are named <code>01 - Title.mp4</code>, <code>02 - Title.png</code>… If a name is taken, the new file gets <code>(2)</code>, <code>(3)</code> — an existing file is never replaced.
              </li>
              <li>
                <b>Downloads folder:</b> files keep the names Flow gives them. With several projects, each goes into its own subfolder inside Downloads.
              </li>
              <li>If a file can't be written into your chosen folder, it lands in Downloads instead, and the final message tells you how many did.</li>
            </ul>

            <h3 id="while-running">While it runs</h3>
            <ul>
              <li>
                Every tile shows its status: <span className="pill pill-y">yellow</span> downloading (with a timer), <span className="pill pill-g">green</span> downloaded, <span className="pill pill-r">red</span> skipped, and a small <span className="pill">QUEUED</span> tag for waiting.
              </li>
              <li>
                A panel covers the page with progress and a <b>Stop downloading</b> button. Clicks and typing on the page are blocked so nothing interrupts the run.
              </li>
              <li>The tab title shows progress, and closing or reloading the tab asks first.</li>
              <li>Switch to another tab and it pauses; come back and it continues. An interrupted item is retried, not skipped.</li>
              <li>If the project is changed by hand, it stops cleanly instead of downloading the wrong items.</li>
              <li>When it's done, a summary box shows what was downloaded and skipped. <b>Clear marks</b> removes the colored frames.</li>
            </ul>

            <h3 id="timeouts">Timeouts and retry</h3>
            <p>
              If Flow doesn't start an item's download within the <b>max wait</b> (10 minutes by default), the item is skipped and the run moves on. At the end you get a list of every item that timed out — with its number, type, project and title — and a <b>Try again</b> button. A retried file keeps its original number, e.g. <code>02 - …</code>. If Flow finishes one of them later anyway, Chrome saves it in your Downloads folder as usual.
            </p>

            <h3 id="same-title">Items with the same title</h3>
            <p>
              Flow often gives several outputs of one prompt the same title. The dialog tells you when that happens. Each file still gets its own number, so nothing is overwritten. If Flow reorders those tiles during a run, the final message names the title to check — look for tiles without a green frame.
            </p>

            <h3 id="settings">Settings and shortcut</h3>
            <ul>
              <li>
                <b>Max wait per item:</b> how long to wait for Flow to start a download (minutes). 4K upscales take longer — raise it if they time out.
              </li>
              <li>
                <b>Pause between items:</b> a short gap after each download (seconds).
              </li>
              <li>
                <b>Shortcut:</b> <kbd>Alt</kbd>+<kbd>Shift</kbd>+<kbd>D</kbd> starts or stops a run. Change it at <code>chrome://extensions/shortcuts</code>.
              </li>
            </ul>

            <h3 id="troubleshooting">Troubleshooting</h3>
            <ul>
              <li>
                <b>“No videos or images found”</b> — open a Flow project that has finished items (or Flow's home page for several projects).
              </li>
              <li>
                <b>Items time out</b> — keep the Flow tab in front, and raise <b>Max wait per item</b> for 4K.
              </li>
              <li>
                <b>“Download multiple files?”</b> — the extension allows automatic downloads for Flow, so this shouldn't appear. If it does, click <b>Allow</b>.
              </li>
              <li>
                <b>Chosen folder doesn't work</b> — pick the folder again and click <b>Allow / Edit files</b> when Chrome asks. Some system folders can't be used; pick one inside your user folder.
              </li>
              <li>
                <b>Still stuck?</b> Press <kbd>F12</kbd> → Console, look for lines starting with <code>[Flow Bulk Downloader]</code>, and <a href={`mailto:${SITE.email}`}>email us</a> what you see.
              </li>
            </ul>

            <h3 id="faq">FAQ</h3>
            <div className="faq">
              {FAQ.map(([q, a]) => (
                <details key={q}>
                  <summary>{q}</summary>
                  <p>{a}</p>
                </details>
              ))}
            </div>

            <h3 id="privacy">Privacy</h3>
            <p>
              Flow Bulk Downloader collects nothing: no servers, no accounts, no analytics, no tracking. Your settings stay in Chrome, and your files go straight from Google Flow to your computer.{" "}
              <a href={FLOW.privacyPath}>Read the full privacy policy</a>.
            </p>

            <div className="callout">
              <div>
                <h3>Saved you some clicks?</h3>
                <p>
                  {FLOW.supportUrl
                    ? "Flow Bulk Downloader is free. If it saves you time, you can support its development — it keeps it working as Flow changes."
                    : "Questions, bugs or ideas — we'd love to hear them."}
                </p>
              </div>
              <div className="actions">
                <SupportButton />
                <a className="btn btn-ghost" href={`mailto:${SITE.email}`}>
                  <Icon name="mail" size={18} /> Email us
                </a>
              </div>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
