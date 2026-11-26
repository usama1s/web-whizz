import Icon from "../components/Icon.jsx";
import { TURNOFFAI } from "../site.js";

// English how-to articles for AI-Free Web's problem searches. Each one answers the question honestly first (what the
// site's own settings can and can't do), then shows the extension. Each <h2> targets one search people make.
// GUIDES' title, description, dates and FAQ also go into <head> and structured data (src/routes.jsx).
// Keep the native steps current: Google and Microsoft move these settings around. Checked 2026-11-26.
// Extension labels ("Turn off AI everywhere", "Show AI on this page for now"…) are from the extension's
// public/_locales/en/messages.json and src/rules/bundled.json in ~/Desktop/P Projects/AI free web.

const store = (where) => `${TURNOFFAI.chromeStoreUrl}?utm_source=web-whizz.com&utm_medium=website&utm_campaign=${where}`;

function StoreCta({ where }) {
  return (
    <p className="actions">
      {TURNOFFAI.chromeStoreUrl ? (
        <a className="btn btn-primary" href={store(where)} target="_blank" rel="noopener noreferrer" data-umami-event="add-to-chrome" data-umami-event-product="turnoffai" data-umami-event-where={where}>
          <Icon name="download" size={18} /> Add AI-Free Web to Chrome — free
        </a>
      ) : (
        <span className="btn btn-soon" role="status">
          AI-Free Web: coming soon to the Chrome Web Store
        </span>
      )}
      <a className="btn btn-ghost" href={TURNOFFAI.path + "#sites"}>
        See everything it hides
      </a>
    </p>
  );
}

const Install = () =>
  TURNOFFAI.chromeStoreUrl ? (
    <a href={store("guide-steps")} target="_blank" rel="noopener noreferrer">
      Install AI-Free Web from the Chrome Web Store
    </a>
  ) : (
    <>
      Install <a href={TURNOFFAI.path}>AI-Free Web</a>
    </>
  );

function Faq({ items }) {
  return (
    <>
      <h2 id="faq">FAQ</h2>
      <div className="faq">
        {items.map(([q, a]) => (
          <details key={q}>
            <summary>{q}</summary>
            <p>{a}</p>
          </details>
        ))}
      </div>
    </>
  );
}

// The other guides, so each one links to the rest (internal links help all three rank).
function MoreGuides({ current }) {
  return (
    <>
      <h2 id="more">More guides</h2>
      <ul>
        {GUIDE_LIST.filter((g) => g.path !== current).map((g) => (
          <li key={g.path}>
            <a href={g.path}>{g.h1}</a>
          </li>
        ))}
      </ul>
    </>
  );
}

function Shell({ guide, route, children }) {
  const date = new Intl.DateTimeFormat("en", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" }).format(new Date(route.updated));
  return (
    <section className="section">
      <article className="wrap narrow prose">
        <nav className="eyebrow" aria-label="Breadcrumb">
          <a href="/">Web Whizz</a> › <a href="/e/">Chrome extensions</a> › <a href={TURNOFFAI.path}>{TURNOFFAI.name}</a>
        </nav>
        <h1>{guide.h1}</h1>
        <p className="meta">
          Updated <time dateTime={route.updated}>{date}</time> · By Web Whizz
        </p>
        {children}
        <Faq items={guide.faq} />
        <StoreCta where={`${guide.key}-end`} />
        <p>
          AI-Free Web is free, needs no account and never reads your emails, documents or searches. Read the <a href={TURNOFFAI.privacyPath}>privacy policy</a>.
        </p>
        <MoreGuides current={guide.path} />
        <p className="fine">
          Google, Gemini, Gmail and YouTube are trademarks of Google LLC; Copilot, Outlook, Word, Excel, PowerPoint and Microsoft 365 are trademarks of Microsoft. Web Whizz is independent and not affiliated with either.
        </p>
      </article>
    </section>
  );
}

// ——— 1. Google AI Overviews ———

export const OVERVIEWS = {
  key: "guide-ai-overviews",
  path: TURNOFFAI.path + "turn-off-google-ai-overviews/",
  crumb: "Turn off Google AI Overviews",
  h1: "How to turn off AI Overviews in Google Search (and hide AI Mode)",
  title: "How to Turn Off Google AI Overviews & AI Mode in Search",
  description:
    "Google has no setting to turn off AI Overviews. Three ways to get Google search without AI: the Web filter, a udm=14 default search engine in Chrome, or a free extension.",
  published: "2026-11-26",
  updated: "2026-11-26",
  faq: [
    ["Can you turn off AI Overviews in Google's settings?", "No. Google calls AI Overviews a core part of Search and offers no setting to switch them off. Turning off experiments in Search Labs doesn't remove them either. You can avoid them with the Web filter (udm=14) or hide them with an extension such as AI-Free Web."],
    ["What does udm=14 do?", "Adding &udm=14 to a Google search address opens the Web filter: ten plain blue links with no AI Overview, AI Mode answer or other panels. You can make it your default search engine in Chrome so every search uses it."],
    ["Does adding “-ai” to a search remove AI Overviews?", "Not reliably. It changes your query and the AI Overview still shows for most searches. Use the Web filter or an extension instead."],
    ["How do I get rid of the AI Mode tab?", "Google doesn't let you remove it. AI-Free Web hides the AI Mode tab and the “Dive deeper” AI prompts along with AI Overviews."],
    ["Can I turn off AI Overviews on my phone?", "Chrome on Android and iPhone doesn't run extensions. In the Google app or mobile browser, tap the Web filter (under More, if you don't see it) or bookmark google.com/search?udm=14&q= to search without AI."],
    ["Will hiding AI Overviews change my search results?", "No. AI-Free Web only hides the AI parts of the page; the results underneath stay the same. With the optional Web view, Google shows its plain list of web results instead of the usual mix."]
  ]
};

function Overviews({ route }) {
  const g = OVERVIEWS;
  return (
    <Shell guide={g} route={route}>
      <p className="lead">
        Searched for something and got a paragraph of AI text instead of links, sometimes wrong and always in the way? Google added AI Overviews and an AI Mode tab to Search, and it doesn't give you a switch to turn them off. Here's
        what actually works.
      </p>

      <h2 id="quick-answer">Quick answer</h2>
      <p>
        There is no setting in Google to turn off AI Overviews. To search without them, either click the <b>Web</b> filter under the search box, make a <b>udm=14</b> search your default in Chrome (steps below), or install the free{" "}
        <a href={TURNOFFAI.path}>AI-Free Web</a> extension, which hides AI Overviews, the AI Mode tab and the “Dive deeper” prompts on every search.
      </p>
      <StoreCta where={`${g.key}-top`} />

      <h2 id="no-setting">Is there a Google setting to turn off AI Overviews?</h2>
      <p>
        No. Google treats AI Overviews as a core Search feature, so there's nothing to switch off in your Google account, in Search settings or in Chrome. Turning off experiments in <b>Search Labs</b> only stops the trials you
        joined — AI Overviews keep showing. Tricks you may have read about, like adding <b>-ai</b> or a swear word to your search, change your query and don't reliably remove them.
      </p>

      <h2 id="web-filter">Use the “Web” filter (udm=14)</h2>
      <p>
        Under the search box, next to All, Images and News, Google has a <b>Web</b> filter (it may be under <b>More</b>). It shows plain web links: no AI Overview, no AI Mode answer, no extra panels. In the address bar this filter
        appears as <code>udm=14</code>, which is what the next two methods use.
      </p>

      <h2 id="chrome-default">Make Google search without AI your default in Chrome</h2>
      <p>Clicking Web on every search gets old. Make Chrome add udm=14 for you:</p>
      <ol>
        <li>
          Open <code>chrome://settings/searchEngines</code> in the address bar (Settings → Search engine → Manage search engines and site search).
        </li>
        <li>
          Next to <b>Site search</b>, click <b>Add</b>.
        </li>
        <li>
          Name: <b>Google Web</b>. Shortcut: <b>gw</b>. URL: <code>https://www.google.com/search?q=%s&amp;udm=14</code>. Click <b>Add</b>.
        </li>
        <li>
          Click the three dots next to Google Web and choose <b>Make default</b>.
        </li>
      </ol>
      <p>
        Searches from the address bar now open the Web view. Microsoft Edge has the same option under Settings → Privacy, search and services → Address bar and search → Manage search engines. The catch: searches you start on
        google.com itself, and links to Google results, still show AI Overviews, and you lose the Images, News and Shopping mix on the main results page.
      </p>

      <h2 id="extension">Hide AI Overviews everywhere with an extension</h2>
      <p>For a normal Google results page, just without the AI, use AI-Free Web:</p>
      <ol>
        <li>
          <Install /> (it works in Chrome and Microsoft Edge).
        </li>
        <li>Search on Google as usual. AI Overviews, the AI Mode tab and “Dive deeper” AI prompts are hidden before the page appears, so they never flash on screen.</li>
        <li>
          Want the plain Web view too? In AI-Free Web's <b>All settings</b>, under Google Search, turn on <b>Always show plain web results (“Web” view)</b>. It adds udm=14 for you, but leaves Images, News and other tabs
          alone.
        </li>
        <li>
          Need an AI answer once? Click the AI-Free Web icon → <b>Show AI on this page for now</b>. It comes back hidden on the next search.
        </li>
      </ol>
      <p>
        Google changes its page often, which breaks most AI Overview blockers. AI-Free Web's rules update automatically, so fixes arrive the same day, and if anything AI still shows, <b>Something AI still showing?</b> lets you
        click it to hide it and report it.
      </p>

      <h2 id="mobile">Turning off AI Overviews on Android and iPhone</h2>
      <p>
        Chrome on phones doesn't run extensions. On mobile, tap the <b>Web</b> filter after searching, or save a bookmark or home-screen shortcut to <code>https://www.google.com/search?udm=14&amp;q=</code> and search from there.
      </p>

      <h2 id="beyond-search">AI beyond Search: Gmail, Docs, YouTube and Microsoft</h2>
      <p>
        AI Overviews are only the start. The same extension hides Gemini in Gmail, Docs, Drive, Sheets, Slides and YouTube, and Copilot in Outlook, Word, Excel and PowerPoint on the web, with a switch for each site and
        feature. See <a href={GEMINI.path}>how to turn off Gemini in Gmail and Google Docs</a> and <a href={COPILOT.path}>how to turn off Copilot in Outlook and Word</a>.
      </p>
    </Shell>
  );
}

// ——— 2. Gemini in Gmail, Docs, Drive, YouTube ———

export const GEMINI = {
  key: "guide-gemini",
  path: TURNOFFAI.path + "turn-off-gemini-gmail-google-docs/",
  crumb: "Turn off Gemini in Gmail & Docs",
  h1: "How to turn off Gemini in Gmail, Google Docs, Drive and YouTube",
  title: "How to Turn Off Gemini in Gmail, Google Docs, Drive & YouTube",
  description:
    "Remove Ask Gemini, “Help me write”, AI summaries and the Gemini side panel from Gmail, Docs, Drive, Sheets and YouTube — with Google's settings (and what they break) or a free extension.",
  published: "2026-11-26",
  updated: "2026-11-26",
  faq: [
    ["How do I turn off Gemini in Gmail?", "In Gmail, open Settings → See all settings → General. Turn off Smart features, then click Manage Workspace smart feature settings and turn off both switches. This also turns off inbox categories, Smart Compose and other helpers. To hide only the Gemini buttons and keep the rest, use AI-Free Web."],
    ["How do I remove “Help me write” from Gmail and Google Docs?", "Google doesn't offer a separate switch for it. Turning off smart features removes it along with other features; AI-Free Web hides just “Help me write” (and anything else you choose) in Gmail and Docs."],
    ["How do I get rid of AI summaries in Gmail?", "Turn off smart features in Gmail's settings, or use AI-Free Web, which hides email summary cards and the Gemini side panel while leaving the rest of Gmail as it is."],
    ["Can I turn off Gemini in Google Docs, Sheets and Drive?", "Not for a personal account: those apps have no Gemini off switch, and turning off Workspace smart features doesn't remove every Gemini button. AI-Free Web hides the Gemini menu, Ask Gemini, Summarize buttons and side panels in Docs, Sheets, Slides and Drive."],
    ["How do I turn off AI summaries on YouTube?", "YouTube has no setting for it. AI-Free Web hides the Gemini “Ask” button, AI video summaries and “Ask about this video” chips."],
    ["I use a work or school account. Can I turn Gemini off?", "Your Google Workspace admin controls Gemini for the whole organization. Without admin access, an extension is the way to hide it in your browser, and admins can also deploy AI-Free Web to everyone and lock its settings with Chrome policy."],
    ["Does AI-Free Web read my emails?", "No. It only looks at the labels of buttons and panels (like “Ask Gemini”) to find AI features. Nothing you write or receive is read, stored or sent."]
  ]
};

const GEMINI_SETTINGS = [
  ["Gemini buttons and side panel in Gmail", "Removed", "Hidden (each one separately)"],
  ["“Help me write” and AI reply chips", "Removed", "Hidden (each one separately)"],
  ["Inbox tabs (Primary, Promotions…)", "Turned off", "Kept"],
  ["Smart Compose, spelling and grammar help", "Turned off", "Kept"],
  ["Package tracking, flight and event cards", "Turned off", "Kept"],
  ["Gemini in Docs, Sheets, Slides, Drive", "Mostly still there", "Hidden"],
  ["AI summaries on YouTube", "Still there", "Hidden"]
];

function Gemini({ route }) {
  const g = GEMINI;
  return (
    <Shell guide={g} route={route}>
      <p className="lead">
        Gemini now sits in nearly every Google app: an Ask Gemini button in Gmail, “Help me write” over your drafts, summary cards on emails, a Gemini menu in Docs, Summarize buttons in Drive and an Ask button on YouTube. Here's
        how to turn it off, and what each method costs you.
      </p>

      <h2 id="quick-answer">Quick answer</h2>
      <p>
        Gmail's <b>smart features</b> settings remove Gemini from Gmail, but they also turn off inbox tabs, Smart Compose and package tracking, and Gemini stays in Docs, Drive and YouTube. To hide only the AI, everywhere, use the
        free <a href={TURNOFFAI.path}>AI-Free Web</a> extension: one switch per site and per feature.
      </p>
      <StoreCta where={`${g.key}-top`} />

      <h2 id="gmail-settings">How to turn off Gemini in Gmail with Google's settings</h2>
      <ol>
        <li>
          In Gmail on a computer, click the gear icon → <b>See all settings</b>.
        </li>
        <li>
          On the <b>General</b> tab, find <b>Smart features</b> and clear the box to turn them off in Gmail, Chat and Meet. Confirm.
        </li>
        <li>
          On the same tab, click <b>Manage Workspace smart feature settings</b> and turn off <b>Smart features in Google Workspace</b> and <b>Smart features in other Google products</b>. Save.
        </li>
        <li>Gmail reloads. These settings apply to your whole Google account, on every device.</li>
      </ol>
      <p>Google moves these settings from time to time, so the labels on your screen may be slightly different.</p>

      <h2 id="trade-off">What turning off smart features breaks</h2>
      <p>Smart features are an all-or-nothing switch: Gemini goes, and so do features many people rely on.</p>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Feature</th>
              <th>Smart features off</th>
              <th>AI-Free Web</th>
            </tr>
          </thead>
          <tbody>
            {GEMINI_SETTINGS.map(([what, off, ext]) => (
              <tr key={what}>
                <td>{what}</td>
                <td>{off}</td>
                <td>{ext}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 id="extension">How to hide Gemini without losing Gmail's other features</h2>
      <ol>
        <li>
          <Install /> (Chrome or Microsoft Edge).
        </li>
        <li>
          Open Gmail. Ask Gemini, “Help me write”, email summary cards, the Gemini side panel, suggested AI reply chips and “Try Gemini” promos are hidden. Your inbox tabs, Smart Compose and everything else stay.
        </li>
        <li>
          To keep some AI features, open <b>All settings</b> and switch individual items back on, or choose the <b>Search only</b> or <b>Work apps only</b> preset.
        </li>
      </ol>

      <h2 id="docs">How to remove Gemini from Google Docs, Sheets and Slides</h2>
      <p>
        Docs, Sheets and Slides have no Gemini off switch for personal accounts. AI-Free Web hides the <b>Gemini menu</b>, the <b>Ask Gemini</b> button, the <b>“Help me write”</b> prompt, the <b>Refine</b> popup, the{" "}
        <b>AI Summary</b> building block, <b>Generate image</b> menu items, <b>“Help me organize”</b> in Sheets, <b>“Help me create”</b> image prompts in Slides, and the Gemini side panel. It never hides the document you're typing
        in.
      </p>

      <h2 id="drive">How to turn off Gemini summaries in Google Drive</h2>
      <p>
        Drive adds an Ask Gemini button, <b>Summarize this folder / file</b> buttons, AI items in right-click menus and a summary in file previews. AI-Free Web hides all of them, each with its own switch.
      </p>

      <h2 id="youtube">How to turn off AI summaries and the Ask button on YouTube</h2>
      <p>
        YouTube has no setting for its Gemini features. AI-Free Web hides the <b>Ask</b> button under videos, AI-generated video summaries and the <b>“Ask about this video”</b> chips.
      </p>

      <h2 id="work-account">Work or school account? What your admin can do</h2>
      <p>
        On a Google Workspace account, Gemini is controlled by your organization's admin in the Google Admin console. If you're the admin and want AI hidden in the browser without changing your Workspace licences, AI-Free Web
        can be deployed to every Chrome browser with its settings set and locked by Chrome policy.
      </p>
    </Shell>
  );
}

// ——— 3. Copilot in Outlook, Word, Excel, PowerPoint ———

export const COPILOT = {
  key: "guide-copilot",
  path: TURNOFFAI.path + "turn-off-copilot-outlook-word/",
  crumb: "Turn off Copilot in Outlook & Word",
  h1: "How to turn off Copilot in Outlook, Word, Excel and PowerPoint",
  title: "How to Turn Off Copilot in Outlook, Word, Excel & PowerPoint",
  description:
    "Turn off Microsoft Copilot in Word, Excel and PowerPoint (File → Options → Copilot) and in new Outlook — and hide it in the web versions, where Microsoft gives you no switch.",
  published: "2026-11-26",
  updated: "2026-11-26",
  faq: [
    ["How do I turn off Copilot in Word?", "In Word for Windows, go to File → Options → Copilot, clear Enable Copilot, click OK and restart Word. On a Mac, the same checkbox is in recent versions (16.93 or later). It only affects that app on that computer, so repeat it in Excel and PowerPoint."],
    ["How do I turn off Copilot in Outlook?", "In new Outlook for Windows, open Settings → Copilot and turn it off. On Mac and mobile, it's under Quick Settings → Copilot. Classic Outlook has no switch yet. In Outlook on the web, AI-Free Web hides the Copilot summary bar, buttons and pane."],
    ["Can I turn off Copilot in Word, Excel or PowerPoint on the web?", "Microsoft doesn't offer a switch in the web versions. AI-Free Web hides the Copilot ribbon button, the Copilot prompt in new documents and the Copilot pane in Word, Excel and PowerPoint on the web."],
    ["The Enable Copilot checkbox is missing. What now?", "Update Office first; the checkbox only exists in recent versions. Otherwise Microsoft suggests turning off connected experiences in the privacy settings, which also turns off other online features like text predictions and suggested replies."],
    ["Can I remove the Copilot summary bar at the top of emails in Outlook?", "AI-Free Web hides it in Outlook on the web, along with Copilot buttons, drafting prompts and the Copilot pane."],
    ["Does turning Copilot off change my Microsoft 365 subscription?", "No. These settings and AI-Free Web only hide or disable Copilot in the app. Your plan and its price don't change; that's managed in your Microsoft account."]
  ]
};

function Copilot({ route }) {
  const g = COPILOT;
  return (
    <Shell guide={g} route={route}>
      <p className="lead">
        Copilot now opens with new documents, sits in the ribbon of Word, Excel and PowerPoint, and adds a summary bar over your emails in Outlook. Microsoft does let you switch it off in some places — here's where, and how to
        hide it where it doesn't.
      </p>

      <h2 id="quick-answer">Quick answer</h2>
      <p>
        In the <b>desktop</b> apps, go to <b>File → Options → Copilot</b> and clear <b>Enable Copilot</b>; in <b>new Outlook</b>, open <b>Settings → Copilot</b>. In the <b>web</b> versions of Word, Excel and PowerPoint there's no
        switch at all; the free <a href={TURNOFFAI.path}>AI-Free Web</a> extension hides Copilot there and in Outlook on the web.
      </p>
      <StoreCta where={`${g.key}-top`} />

      <h2 id="word-excel-powerpoint">How to turn off Copilot in Word, Excel and PowerPoint (desktop)</h2>
      <ol>
        <li>
          Open Word (or Excel, or PowerPoint) and go to <b>File → Options</b>.
        </li>
        <li>
          Choose <b>Copilot</b> in the list on the left.
        </li>
        <li>
          Clear <b>Enable Copilot</b> and click <b>OK</b>.
        </li>
        <li>Close and reopen the app.</li>
      </ol>
      <p>
        Each app has its own checkbox and it only applies on that computer, so repeat it for Excel and PowerPoint, and on each of your computers. On a Mac it needs a recent version (16.93 or later). If you don't see it, update
        Office first.
      </p>

      <h2 id="outlook">How to turn off Copilot in Outlook</h2>
      <ul>
        <li>
          <b>New Outlook for Windows:</b> Settings → <b>Copilot</b> → turn it off. It applies wherever you sign in with that account.
        </li>
        <li>
          <b>Outlook for Mac, iPhone and Android:</b> Quick Settings → <b>Copilot</b>.
        </li>
        <li>
          <b>Classic Outlook:</b> no switch yet.
        </li>
        <li>
          <b>Outlook on the web:</b> AI-Free Web hides the Copilot summary bar on emails, Copilot buttons and drafting prompts, and the Copilot pane.
        </li>
      </ul>

      <h2 id="web-apps">How to remove Copilot from Word, Excel and PowerPoint on the web</h2>
      <p>Microsoft offers no Copilot setting in the browser versions of its apps. With AI-Free Web:</p>
      <ol>
        <li>
          <Install /> (Chrome or Microsoft Edge).
        </li>
        <li>
          Open a document at office.com or in OneDrive. The Copilot ribbon button, the Copilot prompt in new documents and the Copilot pane are hidden before the page appears.
        </li>
        <li>
          Need Copilot just this once? Click the AI-Free Web icon → <b>Show AI on this page for now</b>. To keep it on one site for good, add the site under <b>Keep AI on these sites</b> in All settings.
        </li>
      </ol>

      <h2 id="checkbox-missing">The “Enable Copilot” checkbox is missing</h2>
      <p>
        Update Office (File → Account → Update Options → Update Now) and look again. If it still isn't there, Microsoft's fallback is to turn off <b>connected experiences</b> in File → Options → Trust Center → Privacy Options.
        That's a much bigger switch: it also turns off text predictions, suggested replies and other online features.
      </p>

      <h2 id="bing-linkedin">Copilot in Bing and AI prompts on LinkedIn</h2>
      <p>
        AI-Free Web also hides Copilot answer panels, Copilot and chat tabs and “Ask Copilot” prompts on Bing, and AI writing prompts and AI Premium nudges on LinkedIn. For Google, see{" "}
        <a href={OVERVIEWS.path}>how to turn off AI Overviews</a> and <a href={GEMINI.path}>how to turn off Gemini in Gmail and Docs</a>.
      </p>

      <h2 id="it-admins">For IT admins: hide Copilot on every browser</h2>
      <p>
        Admins can deploy AI-Free Web and set and lock every switch with Chrome policy (Google Admin console or Windows Group Policy), without changing Microsoft 365 tenant settings or licences.
      </p>
    </Shell>
  );
}

export const GUIDE_LIST = [OVERVIEWS, GEMINI, COPILOT];
export const GUIDE_PAGES = { [OVERVIEWS.path]: Overviews, [GEMINI.path]: Gemini, [COPILOT.path]: Copilot };
