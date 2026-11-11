import Icon from "../components/Icon.jsx";
import { Shot } from "../components/Flow.jsx";
import { FLOW } from "../site.js";

// An English how-to article for people searching "how to download all videos from Google Flow" and similar.
// It answers the question honestly (Flow's own options first), then shows the bulk way with the extension.
// The title, description, dates and FAQ are also used for <head> and structured data (src/routes.jsx).
export const GUIDE = {
  path: FLOW.path + "download-all-google-flow-videos/",
  crumb: "Download all Google Flow videos",
  h1: "How to download all your Google Flow videos and images at once",
  title: "How to Download All Google Flow Videos & Images at Once (Veo, 4K, 1080p)",
  description:
    "Three ways to download Veo videos and Nano Banana images from Google Flow — one by one, a whole project, or in bulk with a free Chrome extension — in 720p, 1080p, 4K, GIF or 2K.",
  published: "2026-11-09",
  updated: "2026-11-09",
  faq: [
    [
      "Can you download all videos from Google Flow at once?",
      "Yes. Flow's own Download project option saves a project in one go, and a free Chrome extension such as Flow Bulk Downloader downloads every video and image — or only the ones you tick — in the quality you choose, from one project or several."
    ],
    [
      "Does downloading Google Flow videos in 4K cost credits?",
      "4K is an upscale, and Flow may charge credits for it (about 50 per video at Google's published price). 720p originals and GIFs don't need an upscale. Flow Bulk Downloader shows an estimate and waits for your approval before spending any credits."
    ],
    ["Where do Google Flow downloads go?", "Normally to Chrome's Downloads folder. With Flow Bulk Downloader you can pick any folder; each project gets its own subfolder and files are numbered 01, 02, 03…"],
    ["Do I need to give a bulk downloader my Google password?", "No. Flow Bulk Downloader works inside the Flow tab you're already signed in to. It has no account, no servers and collects no data."],
    ["Does it work on Mac?", "Yes. It works in Google Chrome on Windows, macOS, Linux and ChromeOS."]
  ]
};

const store = (where) => `${FLOW.chromeStoreUrl}?utm_source=web-whizz.com&utm_medium=website&utm_campaign=${where}`;

function StoreCta({ where }) {
  return (
    <p className="actions">
      <a className="btn btn-primary" href={store(where)} target="_blank" rel="noopener noreferrer" data-umami-event="add-to-chrome" data-umami-event-lang="en" data-umami-event-where={where}>
        <Icon name="download" size={18} /> Add Flow Bulk Downloader to Chrome — free
      </a>
      <a className="btn btn-ghost" href={FLOW.path}>
        See all features
      </a>
    </p>
  );
}

export default function FlowGuide({ route }) {
  const date = new Intl.DateTimeFormat("en", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" }).format(new Date(route.updated));
  return (
    <section className="section">
      <article className="wrap narrow prose">
        <nav className="eyebrow" aria-label="Breadcrumb">
          <a href="/">Web Whizz</a> › <a href={FLOW.path}>{FLOW.name}</a>
        </nav>
        <h1>{GUIDE.h1}</h1>
        <p className="meta">
          Updated <time dateTime={route.updated}>{date}</time> · By Web Whizz
        </p>

        <p className="lead">
          Made a project full of Veo videos or Nano Banana images in Google Flow and want them all on your computer? There are three ways to do it. Which one is best depends on how many items you have, which quality you
          need, and whether you want everything or just some of them.
        </p>

        <h2 id="quick-answer">Quick answer</h2>
        <ul>
          <li>
            <b>A few items:</b> use Flow's own <b>Download</b> menu on each one.
          </li>
          <li>
            <b>A whole project or collection, as is:</b> use Flow's <b>Download project</b> (or <b>Download</b> on a collection).
          </li>
          <li>
            <b>Many items, a specific quality (1080p, 4K, 2K), only some items, or several projects at once:</b> use a free extension like <a href={FLOW.path}>{FLOW.name}</a>. It saves everything into the folder you
            choose and lists anything that couldn't be downloaded.
          </li>
        </ul>

        <h2 id="one-by-one">1. Download one video or image (built into Flow)</h2>
        <ol>
          <li>Open your project in Google Flow.</li>
          <li>
            Hover over the video or image, click <b>More</b> (⋮), then <b>Download</b>.
          </li>
          <li>Pick the file type or quality — for example a GIF (270p), the original 720p video, or an upscaled version.</li>
        </ol>
        <p>This is fine for a handful of items. For a project with dozens of clips it means dozens of clicks, and if you want 1080p or 4K you wait for each upscale before moving to the next one.</p>

        <h2 id="whole-project">2. Download a whole project or collection (built into Flow)</h2>
        <ol>
          <li>
            For a project: open it, click <b>More</b>, then <b>Download project</b>.
          </li>
          <li>
            For a collection: hover over the collection and click <b>Download</b>.
          </li>
        </ol>
        <p>
          This is the quickest way to grab a project exactly as Flow packages it. Google describes these options in its <a href="https://support.google.com/flow/answer/16935308" target="_blank" rel="noopener noreferrer">Flow help center</a>. What
          they don't describe is a way to tick just some items, pick the quality for a whole batch, control file names, or download several projects in one go — that's where an extension helps.
        </p>

        <h2 id="bulk">3. Bulk download with Flow Bulk Downloader (free Chrome extension)</h2>
        <p>
          <a href={FLOW.path}>{FLOW.name}</a> clicks Flow's own Download button for each item, one after another, in the quality you choose. Nothing is re-encoded and nothing passes through anyone's server — the files come straight from Google
          Flow to your computer.
        </p>
        <ol>
          <li>
            Install <a href={store("flow-guide-steps")} target="_blank" rel="noopener noreferrer">Flow Bulk Downloader from the Chrome Web Store</a> and pin it to the toolbar.
          </li>
          <li>Open your project in Google Flow and keep the tab in front.</li>
          <li>
            Click the extension icon → <b>Download</b> (or press <kbd>Alt</kbd>+<kbd>Shift</kbd>+<kbd>D</kbd>).
          </li>
          <li>Pick a quality for videos and one for images. Only the qualities your Flow plan offers are listed.</li>
          <li>
            Choose a folder (or just use Downloads). Files are saved as <code>01 - Title.mp4</code>, <code>02 - Title.png</code>… and nothing is ever overwritten.
          </li>
        </ol>
        <Shot file="shot-downloading.png" alt="Flow Bulk Downloader downloading a Google Flow project: tiles marked downloaded, downloading, skipped and queued" caption="Every tile shows its status while the project downloads." />

        <h3 id="selected">Download only selected items</h3>
        <p>
          Tick <b>Pick videos &amp; images</b> in the popup and a checkbox appears on every finished tile. Tick the ones you want and press Download. <b>Select all except downloaded</b> picks only what's new since your last run.
        </p>

        <h3 id="several-projects">Download several projects at once</h3>
        <p>
          Start from Flow's home page (your list of projects) and press Download. Every project is saved into its own subfolder, e.g. <code>My folder/Travel reel/01 - Taj Mahal at dawn.mp4</code>. Tick <b>Pick projects</b> to choose
          which ones.
        </p>
        <Shot file="shot-several-projects.png" alt="Several Google Flow projects downloading in one run, each into its own subfolder" caption="Five projects in one run, each into its own subfolder." />

        <StoreCta where="flow-guide-middle" />

        <h2 id="quality">Which quality should you pick?</h2>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Quality</th>
                <th>Best for</th>
                <th>Credits</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Video GIF (270p)</td>
                <td>Quick previews, chat messages</td>
                <td>No upscale</td>
              </tr>
              <tr>
                <td>Video 720p (original)</td>
                <td>Drafts and fast exports — the file Veo made</td>
                <td>No upscale</td>
              </tr>
              <tr>
                <td>Video 1080p (upscaled)</td>
                <td>YouTube, social media, most edits</td>
                <td>As shown in Flow's menu</td>
              </tr>
              <tr>
                <td>Video 4K (upscaled)</td>
                <td>Final delivery, big screens</td>
                <td>About 50 per video at Google's published price</td>
              </tr>
              <tr>
                <td>Image 1K (original)</td>
                <td>Web and social posts</td>
                <td>No upscale</td>
              </tr>
              <tr>
                <td>Image 2K / 4K (upscaled)</td>
                <td>Print, thumbnails, wallpapers</td>
                <td>As shown in Flow's menu</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          Which upscales you can get depends on your Flow plan. Flow Bulk Downloader reads Flow's own Download menu first, so it only offers what your plan includes, and if a quality costs credits it shows an estimate for the whole batch and
          waits for you to approve it.
        </p>
        <Shot file="shot-credits.png" alt="Quality dialog with 4K selected, showing a Flow credit estimate and an approval checkbox" caption="4K costs credits: you see the estimate and approve it before anything starts." />

        <h2 id="tips">Tips so you don't lose a file</h2>
        <ul>
          <li>
            <b>Keep the Flow tab in front.</b> Chrome slows down background tabs; the extension pauses when you switch away and continues when you come back.
          </li>
          <li>
            <b>Give 4K more time.</b> Upscales can take several minutes each. Raise <b>Max wait per item</b> in the extension's settings if they time out.
          </li>
          <li>
            <b>Check the list at the end.</b> Anything Flow reported an error for, or that took too long, is listed by name with a one-click <b>Try again</b>.
          </li>
          <li>
            <b>Same titles are fine.</b> Flow often gives several outputs of one prompt the same title; every file still gets its own number, so nothing is overwritten.
          </li>
        </ul>
        <Shot file="shot-retry.png" alt="Dialog listing one failed and one timed-out Google Flow item, with a Try again button" caption="Nothing is skipped quietly: failed items are listed with a Try again button." />

        <h2 id="faq">FAQ</h2>
        <div className="faq">
          {GUIDE.faq.map(([q, a]) => (
            <details key={q}>
              <summary>{q}</summary>
              <p>{a}</p>
            </details>
          ))}
        </div>

        <StoreCta where="flow-guide-end" />
        <p>
          The <a href={`${FLOW.path}#guide`}>full Flow Bulk Downloader guide</a> covers every setting, the credit rules and troubleshooting.
        </p>

        <p className="fine">Google Flow, Veo and Nano Banana are trademarks of Google LLC. Web Whizz is independent and not affiliated with Google.</p>
      </article>
    </section>
  );
}
