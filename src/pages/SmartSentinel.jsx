import Icon from "../components/Icon.jsx";
import { Shot, YouTube } from "../components/Flow.jsx";
import { SENTINEL } from "../site.js";
import { GUIDE } from "./SentinelGuide.jsx";

// The Smart Sentinel page (English only). Only list what the published version really does: the
// "page monitor" ideas in the extension's README are on the survey's wish list, not in the product yet.
// The screenshots are the store's own (Smart Sentinel/store/assets, made by scripts/store-assets.mjs);
// copy them to public/e/smart-sentinel/ and recreate the .webp files when they change.

export const META = {
  title: "Auto Refresh Chrome Tabs Every X Seconds or at a Set Time — Smart Sentinel",
  description:
    "Free Chrome auto refresh extension: reload any tab every 5, 10 or 30 seconds, at random or at an exact time. Keeps going after restarts, sleep and errors."
};

export const FEATURES = [
  { icon: "clock", title: "Any interval", text: "One click for 5 seconds up to 15 minutes, or type your own, down to once a second." },
  { icon: "calendar", title: "At an exact time", text: "Reload every second from 9:59:55 to 10:00:10 for a sale or booking, or every 5 minutes through the working day. Repeat daily if you like." },
  { icon: "shuffle", title: "Random intervals", text: "Set a range, like 30–60 seconds, and each wait is picked at random, so reloads don't follow a fixed rhythm." },
  { icon: "stop", title: "Stops on its own", text: "End after a number of reloads or after a set time. The popup tells you why it stopped." },
  { icon: "shield", title: "Never silently stops", text: "A watchdog restarts a stalled timer, and your refreshes come back after a browser restart or a reopened tab. Memory Saver won't put the tab to sleep." },
  { icon: "retry", title: "Handles errors", text: "If the page fails or the server is busy (5xx, 429), it waits longer between tries, then goes back to normal once the page loads." },
  { icon: "wifi", title: "Pauses when offline", text: "No reloading into Chrome's “No internet” page. It pauses, then picks up the moment you're back online." },
  { icon: "zap", title: "Hard reload", text: "Skip Chrome's cache and fetch the page fresh each time, like Ctrl+Shift+R. Refresh one page or a whole site." }
];

const USES = ["Ticket and sneaker drops", "Visa and exam appointments", "Back-in-stock pages", "Dashboards and reports", "Order and support queues", "Job and freelance boards", "Live scores and auctions", "Your own site while you build it"];

const SHOTS = [
  ["shot-retrying.png", "Smart Sentinel popup retrying after a page failed to load (connection refused)", "Failed loads are retried with a growing wait."],
  ["shot-exact-time.png", "Smart Sentinel popup set to reload every second between 9:59:55 and 10:00:10, every day", "Reload at an exact time, every day if you like."],
  ["shot-random-stop.png", "Smart Sentinel popup with a random 30–60 second interval, an auto stop after 1 hour and hard reload", "Random intervals, auto stop and hard reload."],
  ["shot-pick-interval.png", "Smart Sentinel popup: pick an interval from 5 seconds to 15 minutes, This page or Whole site", "Pick an interval and press Start."]
];

export const FAQ = [
  ["How do I make Chrome refresh a page automatically?", "Chrome has no built-in auto refresh. Install Smart Sentinel, open the page, click its icon, pick an interval and press Start. It keeps reloading until you stop it."],
  ["Is Smart Sentinel free?", "Yes. No account, no ads, no paid tier."],
  ["Does it keep refreshing when the tab is in the background?", "Yes. It doesn't matter which tab you're looking at, or whether the window is minimized. It also tells Chrome's Memory Saver not to put that tab to sleep while it's refreshing."],
  ["What happens if I close Chrome or restart my computer?", "Your refreshes are saved. When Chrome opens again and the page is back (Chrome can reopen your tabs for you), the refresh picks up on its own."],
  ["What if my computer is asleep?", "Nothing can reload while the computer sleeps. When it wakes up, an overdue refresh reloads right away. If a “Between times” window was missed completely, the popup says so."],
  ["What's the shortest interval?", "One second. For anything under 30 seconds, it keeps an extra timer running so the reloads stay on time."],
  ["Can I refresh several tabs at once?", "Yes. Each tab gets its own refresh with its own settings. Open the popup on another tab to set that one up."],
  ["What's the difference between “This page” and “Whole site”?", "“This page” follows one exact address. “Whole site” keeps refreshing the tab while you move between pages on the same site."],
  ["Why does it ask for access to the site?", "To reload the page and to read its status code (for example 503 when the server is busy), so it can back off and retry. It asks only for the site you start it on, and you can take access back any time."],
  ["Does it read or send my pages?", "No. The addresses you refresh and the pages' content stay on your computer. The extension sends nothing in the background. See the privacy policy for the details."],
  ["Why can't it refresh some pages?", "Chrome doesn't let any extension reload its own pages (chrome://…) or the Chrome Web Store."]
];

function StoreButton({ campaign }) {
  if (SENTINEL.chromeStoreUrl) {
    return (
      <a className="btn btn-primary" href={`${SENTINEL.chromeStoreUrl}?utm_source=web-whizz.com&utm_medium=website&utm_campaign=${campaign}`} target="_blank" rel="noopener noreferrer" data-umami-event="add-to-chrome" data-umami-event-product="sentinel">
        <Icon name="download" size={18} /> Add to Chrome — it's free
      </a>
    );
  }
  return (
    <span className="btn btn-soon" role="status">
      Coming soon to the Chrome Web Store
    </span>
  );
}

export default function SmartSentinel() {
  return (
    <>
      <section className="hero hero-product">
        <div className="wrap hero-grid">
          <div>
            <div className="product-id">
              <img src={SENTINEL.img("logo.png")} alt="" width="64" height="64" />
              <div>
                <p className="product-name">{SENTINEL.name}</p>
                <span className="eyebrow">Auto refresh for Chrome</span>
              </div>
            </div>
            <h1>Auto refresh any tab — on a timer or at an exact time</h1>
            <p className="lead">
              Reload a page every few seconds or minutes, at random intervals, or between two times of day. Smart Sentinel keeps going after restarts, sleep and errors, and tells you when something's wrong instead of
              quietly stopping.
            </p>
            <div className="actions">
              <StoreButton campaign="sentinel-hero" />
              <a className="btn btn-ghost" href="#how">
                How it works
              </a>
            </div>
            <ul className="trust">
              <li>v{SENTINEL.version}</li>
              <li>Free · No account · No tracking</li>
            </ul>
          </div>
          <Shot file="shot-running.png" img={SENTINEL.img} alt="Smart Sentinel popup refreshing a page every 5 seconds: countdown ring, 2 of 50 reloads done" eager />
        </div>
      </section>

      {SENTINEL.youtube?.id && (
        <section id="video" className="section section-alt">
          <div className="wrap">
            <h2 className="section-title">See it in 90 seconds</h2>
            <YouTube v={SENTINEL.youtube} caption="Auto refresh that keeps going through restarts, sleep and site errors, in the real extension" />
          </div>
        </section>
      )}

      <section className="section">
        <div className="wrap">
          <h2 className="section-title">Refreshing you can leave running</h2>
          <p className="section-lead">Most auto refresh extensions work until the browser restarts, the computer sleeps or the site has a bad minute. This one was built for exactly those moments.</p>
          <div className="features">
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
            {SHOTS.map(([file, alt, caption]) => (
              <Shot key={file} file={file} img={SENTINEL.img} alt={alt} caption={caption} />
            ))}
          </div>
          {/* After the screenshots is when people are most ready to install. */}
          <div className="after-video">
            <div className="actions">
              <StoreButton campaign="sentinel-gallery" />
              <a className="btn btn-ghost" href="#how">
                How it works
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="how" className="section">
        <div className="wrap narrow prose">
          <h2 className="section-title">How it works</h2>
          <ol className="steps">
            <li>
              <b>Open the page</b> you want to keep fresh, and click the Smart Sentinel icon. (Pin it first: the puzzle piece next to the address bar, then the pin.)
            </li>
            <li>
              <b>Choose what to refresh:</b> <b>This page</b>, or <b>Whole site</b> to keep going as you click around it.
            </li>
            <li>
              <b>Choose when:</b> <b>Every</b> 5s, 10s, 15s, 30s, 1m, 5m, 15m or your own interval, or <b>Between times</b> for a window like 9:59:55 to 10:00:10. Add a random range, an auto stop or a hard reload
              if you need them.
            </li>
            <li>
              <b>Press Start.</b> The first time on a site, Chrome asks to let Smart Sentinel reload it: choose Allow. The ring counts down to the next reload, with the number of reloads so far.
            </li>
            <li>
              <b>Stop</b> any time from the same popup, or let your stop condition end it.
            </li>
          </ol>
          <p>
            Step by step for each case — every few seconds, at an exact time, at random — and why auto refresh stops: <a href={GUIDE.path}>how to auto refresh a page in Chrome</a>.
          </p>

          <h3>Good for</h3>
          <ul className="tags">
            {USES.map((u) => (
              <li key={u}>{u}</li>
            ))}
          </ul>

          <h3 id="faq">Questions</h3>
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
            Smart Sentinel has no accounts, no analytics and no tracking, and sends nothing while you use it. The pages you refresh stay on your computer. It asks for access only to the sites you start it on. Read the{" "}
            <a href={SENTINEL.privacyPath}>privacy policy</a>.
          </p>

          {/* The same feedback form the extension opens (SentinelSurvey); from=site marks answers sent from the website. */}
          <div className="callout callout-feedback">
            <div>
              <h3>Questions, bugs or ideas?</h3>
              <p>Tell us what you refresh, what works and what's missing. It takes a minute.</p>
            </div>
            <a className="btn btn-ghost" href={`${SENTINEL.path}feedback/?from=site`} data-umami-event="feedback-click" data-umami-event-product="sentinel">
              <Icon name="chat" size={18} /> Send feedback
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
