import Icon from "../components/Icon.jsx";
import { Shot } from "../components/Flow.jsx";
import { SENTINEL } from "../site.js";

// An English how-to article for problem searches: "how to auto refresh a page in Chrome", "refresh a page every
// 5 seconds", "refresh at a specific time", "auto refresh stops working". It answers the question honestly (Chrome has
// no built-in option), then shows each case with Smart Sentinel. Each <h2> targets one of those searches.
// The title, description, dates and FAQ are also used for <head> and structured data (src/routes.jsx).
export const GUIDE = {
  path: SENTINEL.path + "auto-refresh-page-chrome/",
  crumb: "Auto refresh a page in Chrome",
  h1: "How to auto refresh a page in Chrome — every few seconds or at an exact time",
  title: "How to Auto Refresh a Page in Chrome (Every X Seconds or at a Set Time)",
  description:
    "Chrome has no built-in auto refresh. How to reload a tab every 5, 10 or 30 seconds, at an exact time like 10:00:00 or at random — and why auto refresh stops.",
  published: "2026-11-21",
  updated: "2026-11-21",
  faq: [
    [
      "Does Chrome have a built-in auto refresh?",
      "No. Chrome can only reload a page when you press F5 or Ctrl+R (Cmd+R on a Mac). To reload a tab automatically you need an extension such as Smart Sentinel, which is free and needs no account."
    ],
    [
      "How do I make Chrome refresh a page every 5 seconds?",
      "Install Smart Sentinel, open the page, click the extension's icon, pick 5s under Every and press Start. You can also type your own interval in seconds, minutes or hours, down to once a second."
    ],
    [
      "How do I refresh a page at a specific time?",
      "In Smart Sentinel choose Between times and set a start and end, for example 9:59:55 to 10:00:10 with a 1-second interval, so the page reloads right as a sale or booking opens. Turn on Repeat every day to do it daily."
    ],
    [
      "Does auto refresh work when the tab is in the background or Chrome is minimized?",
      "Yes. Smart Sentinel keeps reloading tabs you're not looking at and minimized windows, and stops Chrome's Memory Saver from putting a refreshing tab to sleep. Nothing reloads while the computer itself is asleep; an overdue reload happens as soon as it wakes."
    ],
    [
      "Why does my auto refresh extension keep stopping?",
      "Most stop when Chrome restarts, when the computer sleeps, when Memory Saver discards the tab, or when the page shows an error. Smart Sentinel saves your refreshes, restarts a stalled timer, waits and retries after errors, and pauses while you're offline."
    ],
    [
      "Will auto refreshing a page keep me logged in?",
      "Often, yes: many sites count a reload as activity and extend your session. Some sites log you out after a fixed time no matter what, and refreshing can't change that."
    ],
    [
      "Can refreshing too often get me blocked?",
      "It can on some sites. Use the longest interval that still works for you, or a random range. If a site answers “too many requests” (429) or is overloaded (503), Smart Sentinel waits longer between tries on its own."
    ]
  ]
};

const store = (where) => `${SENTINEL.chromeStoreUrl}?utm_source=web-whizz.com&utm_medium=website&utm_campaign=${where}`;

function StoreCta({ where }) {
  return (
    <p className="actions">
      <a className="btn btn-primary" href={store(where)} target="_blank" rel="noopener noreferrer" data-umami-event="add-to-chrome" data-umami-event-product="sentinel" data-umami-event-where={where}>
        <Icon name="download" size={18} /> Add Smart Sentinel to Chrome — free
      </a>
      <a className="btn btn-ghost" href={SENTINEL.path}>
        See all features
      </a>
    </p>
  );
}

// Why auto refresh stops, and what Smart Sentinel does about it.
const PROBLEMS = [
  ["Chrome or the computer restarts", "Refreshes are saved and pick up again when the page is back"],
  ["The computer goes to sleep", "An overdue reload happens the moment it wakes; a missed time window is reported"],
  ["Memory Saver puts the tab to sleep", "Tabs that are refreshing are kept awake"],
  ["The timer stalls", "A watchdog notices and restarts it"],
  ["The site errors or is busy (503, 429)", "Waits longer between tries, then returns to your interval"],
  ["You go offline", "Pauses instead of loading Chrome's “No internet” page, resumes when you're back"]
];

export default function SentinelGuide({ route }) {
  const date = new Intl.DateTimeFormat("en", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" }).format(new Date(route.updated));
  return (
    <section className="section">
      <article className="wrap narrow prose">
        <nav className="eyebrow" aria-label="Breadcrumb">
          <a href="/">Web Whizz</a> › <a href="/e/">Chrome extensions</a> › <a href={SENTINEL.path}>{SENTINEL.name}</a>
        </nav>
        <h1>{GUIDE.h1}</h1>
        <p className="meta">
          Updated <time dateTime={route.updated}>{date}</time> · By Web Whizz
        </p>

        <p className="lead">
          Waiting for an appointment slot, a ticket drop or an item to come back in stock? Watching a dashboard or a queue? Pressing F5 all day gets old fast. Here's how to make Chrome reload a page for you — on a timer, at an exact
          time, or at random — and keep it going.
        </p>

        <h2 id="quick-answer">Quick answer</h2>
        <p>
          Chrome has no built-in auto refresh, so you need an extension. With the free <a href={SENTINEL.path}>{SENTINEL.name}</a>: open the page, click the extension's icon, pick an interval (or a time window) and press{" "}
          <b>Start</b>. It keeps reloading in the background, after restarts and through errors until you press <b>Stop</b> or your stop condition is reached.
        </p>
        <StoreCta where="sentinel-guide-top" />

        <h2 id="built-in">Can Chrome auto refresh a page on its own?</h2>
        <p>
          No. Chrome only reloads when you press <b>F5</b> or <b>Ctrl+R</b> (<b>Cmd+R</b> on a Mac), or <b>Ctrl+Shift+R</b> to skip the cache. Tricks like a script in the DevTools console don't work either: the script is
          wiped out by the very reload it triggers. An extension runs outside the page, so it survives each reload.
        </p>

        <h2 id="every-x-seconds">How to refresh a page every 5, 10 or 30 seconds</h2>
        <ol>
          <li>
            Install <a href={store("sentinel-guide-steps")} target="_blank" rel="noopener noreferrer">Smart Sentinel from the Chrome Web Store</a> and pin it: the puzzle piece next to the address bar, then the pin.
          </li>
          <li>Open the page you want to keep fresh and click the Smart Sentinel icon.</li>
          <li>
            Under <b>Every</b>, pick 5s, 10s, 15s, 30s, 1m, 5m or 15m, or choose <b>Custom</b> and type your own in seconds, minutes or hours (down to once a second).
          </li>
          <li>
            Choose <b>This page</b>, or <b>Whole site</b> to keep refreshing while you click around the same site.
          </li>
          <li>
            Press <b>Start</b>. The first time on a site, Chrome asks to let the extension reload it: choose <b>Allow</b>.
          </li>
        </ol>
        <Shot file="shot-pick-interval.png" img={SENTINEL.img} alt="Smart Sentinel popup: pick an interval from 5 seconds to 15 minutes, This page or Whole site" caption="Pick an interval and press Start." />
        <p>The popup then shows a countdown to the next reload, how many reloads have happened and how long since the last one. Each tab can have its own refresh with its own settings.</p>

        <h2 id="exact-time">How to refresh a page at an exact time</h2>
        <p>
          For a ticket sale, a visa or exam booking, or a product drop that opens at 10:00, refreshing every few minutes isn't good enough — you want rapid reloads right around the moment it opens. Choose <b>Between times</b>{" "}
          and set:
        </p>
        <ul>
          <li>
            <b>From 9:59:55 to 10:00:10, every 1 second</b> — reloads only in that window, then stops.
          </li>
          <li>
            <b>The same time in both boxes</b> — a single reload at that exact moment.
          </li>
          <li>
            <b>From 9:00 to 17:00, every 5 minutes</b> — for a working day.
          </li>
        </ul>
        <p>
          Turn on <b>Repeat every day</b> to do it daily. Short intervals use a more precise timer, so reloads land on time. Your computer's clock is what counts, so make sure it's set to update automatically.
        </p>
        <Shot file="shot-exact-time.png" img={SENTINEL.img} alt="Smart Sentinel popup set to reload every second between 9:59:55 and 10:00:10, every day" caption="Reload at an exact time, every day if you like." />

        <h2 id="random">How to refresh at random intervals</h2>
        <p>
          Some sites notice reloads that arrive like clockwork. Choose <b>Random</b> and set a range, say 30–60 seconds, and each wait is picked at random within it. It's also kinder to the site than a fast fixed interval.
        </p>

        <h2 id="auto-stop">How to stop auto refresh automatically</h2>
        <p>
          Under <b>Stop</b>, choose <b>After a number of reloads</b> (say 50) or <b>After a set time</b> (say 1 hour). When it stops, the popup tells you why. You can always press <b>Stop</b> yourself.
        </p>
        <Shot file="shot-random-stop.png" img={SENTINEL.img} alt="Smart Sentinel popup with a random 30–60 second interval, an auto stop after 1 hour and hard reload" caption="Random intervals, auto stop and hard reload." />

        <h2 id="hard-reload">How to auto refresh without the cache (hard reload)</h2>
        <p>
          If a page keeps showing old content after a reload, turn on <b>Hard reload</b>. It fetches the page fresh each time, like pressing Ctrl+Shift+R.
        </p>

        <h2 id="background">Does it keep refreshing in the background?</h2>
        <p>
          Yes. It doesn't matter which tab you're looking at or whether the window is minimized. Chrome's <b>Memory Saver</b> normally puts unused tabs to sleep, which silently kills most auto refreshers; Smart Sentinel asks
          Chrome to keep refreshing tabs awake. The one limit: nothing can reload while the computer itself is asleep.
        </p>

        <h2 id="keeps-stopping">Why does auto refresh keep stopping?</h2>
        <p>Most auto refresh extensions work until something unusual happens, and then quietly stop. These are the usual causes, and what Smart Sentinel does about each:</p>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>What happens</th>
                <th>What Smart Sentinel does</th>
              </tr>
            </thead>
            <tbody>
              {PROBLEMS.map(([what, fix]) => (
                <tr key={what}>
                  <td>{what}</td>
                  <td>{fix}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Shot file="shot-retrying.png" img={SENTINEL.img} alt="Smart Sentinel popup retrying after a page failed to load (connection refused)" caption="Failed loads are retried with a growing wait." />

        <h2 id="tips">Tips for refreshing responsibly</h2>
        <ul>
          <li>
            <b>Use the longest interval that works.</b> A queue page that updates every minute doesn't need reloading every second.
          </li>
          <li>
            <b>Save fast reloads for the moment that matters</b> with Between times, instead of all day.
          </li>
          <li>
            <b>Check the site's rules.</b> Some sites limit automated access; a random range and a stop condition help.
          </li>
          <li>
            <b>Leave the page logged in.</b> Reloads usually keep a session alive, but a site that logs everyone out after a set time will still do so.
          </li>
        </ul>

        <h2 id="faq">FAQ</h2>
        <div className="faq">
          {GUIDE.faq.map(([q, a]) => (
            <details key={q}>
              <summary>{q}</summary>
              <p>{a}</p>
            </details>
          ))}
        </div>

        <StoreCta where="sentinel-guide-end" />
        <p>
          Smart Sentinel is free, has no account and sends nothing while you use it. Read the <a href={SENTINEL.privacyPath}>privacy policy</a>.
        </p>

        <p className="fine">Chrome is a trademark of Google LLC. Web Whizz is independent and not affiliated with Google.</p>
      </article>
    </section>
  );
}
