import Icon from "../components/Icon.jsx";
import { Shot, YouTube } from "../components/Flow.jsx";
import { TURNOFFAI } from "../site.js";
import { GUIDE_LIST } from "./AiFreeWebGuides.jsx";

// The AI-Free Web page (English only). Keep the site list in sync with src/rules/bundled.json in the extension
// project (~/Desktop/P Projects/AI free web) and the copy with its store/STORE-LISTING.md.
// The screenshots are the store's own (AI free web/store/assets, made by `npm run store:assets`): copy them to
// public/e/ai-free-web/ as shot-*.png and recreate the .webp files when they change.

export const META = {
  title: "Turn Off Google AI Overviews, Gemini & Copilot — AI-Free Web",
  description:
    "Free Chrome extension to turn off AI Overviews, AI Mode, Gemini and Copilot. Hides AI buttons, summaries and panels on Google Search, Gmail, Docs, YouTube, Outlook and Word, with a switch per site."
};

export const SITES = [
  ["Google Search", "AI Overviews, the AI Mode tab, “Dive deeper” AI prompts; optional plain “Web” results"],
  ["Gmail", "Ask Gemini, “Help me write”, summary cards, the Gemini side panel, AI reply chips, “Try Gemini” promos"],
  ["Google Docs", "Gemini menu, Ask Gemini, “Help me write”, Refine, AI Summary block, image generation"],
  ["Google Drive", "Ask Gemini, Summarize folder / file buttons and right-click items, preview summaries, the Gemini panel"],
  ["Google Sheets & Slides", "The Gemini panel and menu, “Help me organize”, “Help me create” image prompts"],
  ["YouTube", "The Gemini “Ask” button, AI video summaries, “Ask about this video” chips"],
  ["Outlook on the web", "The Copilot summary bar on emails, Copilot buttons and drafting prompts, the Copilot pane"],
  ["Word, Excel & PowerPoint on the web", "The Copilot ribbon button, the Copilot prompt in new documents, the Copilot pane"],
  ["LinkedIn", "AI writing prompts in posts and messages, AI Premium nudges"],
  ["Bing", "Copilot answer panels, Copilot and chat tabs, “Ask Copilot” prompts"]
];

export const FEATURES = [
  { icon: "zap", title: "Gone before the page appears", text: "AI elements are hidden as the page loads, so they never flash on screen, and the layout closes up around them." },
  { icon: "sliders", title: "A switch per site and per feature", text: "One master switch, a switch for every website, and in the settings a switch for every single AI element. Keep the ones you like." },
  { icon: "retry", title: "Keeps working when sites change", text: "Google and Microsoft redesign often. Rules update automatically, so fixes arrive the same day, without waiting for a store update." },
  { icon: "target", title: "Something still showing? Click it", text: "Point at any AI element we missed to hide it on your browser, and send us an anonymous report so we fix it for everyone." },
  { icon: "play", title: "Show AI for now", text: "Need Gemini or Copilot just this time? One click shows it on the current page, and one more hides it again." },
  { icon: "shield", title: "Private, and ready for IT", text: "It never reads your emails or documents. Admins can set and lock the settings for every browser with Chrome policy." }
];

const SHOTS = [
  ["shot-google-search.png", "Google search results before and after AI-Free Web: the AI Overview and AI Mode tab are gone", "Google Search: AI Overviews and the AI Mode tab, gone."],
  ["shot-gmail.png", "Gmail before and after AI-Free Web: no Ask Gemini, summary button, AI reply chips, Help me write or Gemini panel", "Gmail without Gemini buttons, summaries or side panel."],
  ["shot-outlook.png", "Outlook on the web before and after AI-Free Web: no Copilot summary, buttons or pane", "Outlook with the Copilot summary, buttons and pane hidden."],
  ["shot-popup.png", "The AI-Free Web popup: a master switch, the current site's switch with the number of AI elements hidden, and a switch per website", "A switch for every site, right in the toolbar."]
];

export const FAQ = [
  ["Is AI-Free Web free?", "Yes. Every site and every switch is free. No account, no ads."],
  ["Can't I just turn off AI Overviews in Google's settings?", "No. Google has no setting for AI Overviews or the AI Mode tab. AI-Free Web hides both, and can also switch Google to its plain “Web” results (udm=14) for you."],
  ["How is this different from turning off Gmail's smart features?", "Gmail's smart features switch removes Gemini but also inbox tabs, Smart Compose and package tracking, and leaves Gemini in Docs, Drive and YouTube. AI-Free Web hides only the AI, on every supported site."],
  ["Can I turn off Copilot in Word, Excel or PowerPoint on the web?", "Microsoft has no Copilot switch in the web versions. AI-Free Web hides the Copilot ribbon button, new-document prompt and pane there, and the Copilot summary bar in Outlook on the web."],
  ["Does it turn off AI in my Google or Microsoft account?", "No. It hides AI buttons, banners, panels and prompts in your browser. Your account settings don't change, and other devices aren't affected. Turn the extension off and everything is back."],
  ["Will it break Send, Save or Search?", "No. Its rules only target AI features, every rule is checked so it can never match core buttons like Send, Save or Search, and it never hides the editor you're typing in. “Show AI on this page for now” brings back anything instantly."],
  ["Does it read my emails or documents?", "No. It looks only at the labels of buttons and panels (like “Ask Gemini”) to find AI features. Nothing you write or receive is read, stored or sent."],
  ["Something AI is still showing. What can I do?", "Click the AI-Free Web icon → “Something AI still showing?” and click the element. You can hide it right away on your browser, and send us an anonymous report so the next rules update hides it for everyone."],
  ["Can my company deploy it with AI hidden for everyone?", "Yes. Admins can set every switch and lock them with Chrome policy (Google Admin console or Windows Group Policy), without access to the Google Workspace or Microsoft 365 admin settings."],
  ["Which browsers does it work in?", "Chrome and Microsoft Edge. Firefox is planned."],
  ["Is it made by Google or Microsoft?", "No. AI-Free Web is an independent extension made by Web Whizz. It isn't affiliated with, endorsed by or sponsored by Google or Microsoft."]
];

function StoreButton({ campaign }) {
  if (TURNOFFAI.chromeStoreUrl) {
    return (
      <a className="btn btn-primary" href={`${TURNOFFAI.chromeStoreUrl}?utm_source=web-whizz.com&utm_medium=website&utm_campaign=${campaign}`} target="_blank" rel="noopener noreferrer" data-umami-event="add-to-chrome" data-umami-event-product="turnoffai">
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

export default function TurnOffAi() {
  return (
    <>
      <section className="hero hero-product">
        <div className="wrap hero-grid">
          <div>
            <div className="product-id">
              <img src={TURNOFFAI.img("logo.png")} alt="" width="64" height="64" />
              <div>
                <p className="product-name">{TURNOFFAI.name}</p>
                <span className="eyebrow">Hide AI features on the web</span>
              </div>
            </div>
            <h1>Turn off AI Overviews, Gemini and Copilot — everywhere</h1>
            <p className="lead">
              Google and Microsoft keep adding AI to Search, Gmail, Docs, YouTube, Outlook and Word, with no single off switch. AI-Free Web is that switch: it hides AI buttons, banners, summaries, side panels and
              popups, with one switch per site and per feature.
            </p>
            <div className="actions">
              <StoreButton campaign="turnoffai-hero" />
              <a className="btn btn-ghost" href="#sites">
                See what it hides
              </a>
            </div>
            <ul className="trust">
              <li>v{TURNOFFAI.version}</li>
              <li>Free · No account · Reads nothing you write</li>
            </ul>
          </div>
          <img className="hero-promo" src={TURNOFFAI.img("og.png")} alt={`${TURNOFFAI.name}: hide AI Overviews, Gemini and Copilot`} width="1200" height="630" style={{ width: "100%", height: "auto", borderRadius: 16 }} />
        </div>
      </section>

      {TURNOFFAI.youtube?.id && (
        <section id="video" className="section section-alt">
          <div className="wrap">
            <h2 className="section-title">See it in under a minute</h2>
            <YouTube v={TURNOFFAI.youtube} caption="AI Overviews, Gemini in Gmail and Copilot in Outlook switched off by the real extension" />
          </div>
        </section>
      )}

      <section id="sites" className="section">
        <div className="wrap">
          <h2 className="section-title">What it hides</h2>
          <p className="section-lead">Every item below has its own switch. Turn a whole site off, or keep just the AI features you actually use.</p>
          <div className="table-wrap">
            <table className="compare">
              <thead>
                <tr>
                  <th scope="col">Website</th>
                  <th scope="col">AI features hidden</th>
                </tr>
              </thead>
              <tbody>
                {SITES.map(([site, what]) => (
                  <tr key={site}>
                    <th scope="row">{site}</th>
                    <td>{what}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section id="screenshots" className="section section-alt">
        <div className="wrap">
          <h2 className="section-title">See it in action</h2>
          <div className="gallery">
            {SHOTS.map(([file, alt, caption]) => (
              <Shot key={file} file={file} img={TURNOFFAI.img} alt={alt} caption={caption} />
            ))}
          </div>
          {/* After the screenshots is when people are most ready to install. */}
          <div className="after-video">
            <div className="actions">
              <StoreButton campaign="turnoffai-gallery" />
              <a className="btn btn-ghost" href="#features">
                How it works
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="section">
        <div className="wrap">
          <h2 className="section-title">Made to stay out of your way</h2>
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

      <section id="guides" className="section section-alt">
        <div className="wrap narrow prose">
          <h2 className="section-title">How-to guides</h2>
          <p>Step by step, with the settings Google and Microsoft do offer, what they break, and where AI-Free Web fills the gap:</p>
          <ul>
            {GUIDE_LIST.map((g) => (
              <li key={g.path}>
                <a href={g.path}>{g.h1}</a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="wrap narrow prose">
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
            AI-Free Web never reads your emails, documents or searches, and sends nothing unless you choose to: an anonymous report about an element it missed, or anonymous usage statistics, which are off
            unless you turn them on. Read the <a href={TURNOFFAI.privacyPath}>privacy policy</a>.
          </p>

          {/* The same feedback form the extension opens (TurnOffAiSurvey); from=site marks answers sent from the website. */}
          <div className="callout callout-feedback">
            <div>
              <h3>Questions, bugs or a site we should cover?</h3>
              <p>Tell us which AI features still bother you and where. It takes a minute.</p>
            </div>
            <a className="btn btn-ghost" href={`${TURNOFFAI.path}feedback/?from=site`} data-umami-event="feedback-click" data-umami-event-product="turnoffai">
              <Icon name="chat" size={18} /> Send feedback
            </a>
          </div>
          <p className="meta">
            AI-Free Web is not affiliated with, endorsed by or sponsored by Google or Microsoft. Gemini, Google, Gmail, YouTube, Copilot, Outlook and Microsoft 365 are trademarks of their owners, used here only to
            describe compatibility.
          </p>
        </div>
      </section>
    </>
  );
}
