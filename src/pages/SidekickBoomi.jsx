import Icon from "../components/Icon.jsx";
import { Shot } from "../components/Flow.jsx";
import { SIDEKICK } from "../site.js";
import { GUIDE_LIST } from "./SidekickGuides.jsx";

// The Sidekick for Boomi page (English only). Only list what 0.1.0 really ships: the copy follows the store
// listing (docs/STORE_LISTING.md in ~/Desktop/P Projects/sidekick-boomi). The rest of the extension is parked on
// its `res` branch until tested, so don't mention it here. Screenshots and og.png (the marquee) are copied from its docs/store/.

export const META = {
  title: "Sidekick for Boomi — Groovy Script Editor & Boomi Shortcuts",
  description:
    "Free, unofficial Chrome extension for the Boomi Integration build screen: a real script editor with Boomi API autocomplete, a Message shape editor, Set Properties on one screen, shortcuts and canvas glow."
};

export const FEATURES = [
  { icon: "window", title: "A real script editor", text: "Groovy and JavaScript scripts get highlighting, Boomi API autocomplete, lint warnings, Format, Find, a Functions menu and snippets. Boomi's own field keeps every edit, so OK and Save work as usual." },
  { icon: "mail", title: "Message shape editor", text: "Write Message text with named {variables} instead of {1}, {2}, get the quoting right automatically, and fill Boomi's Parameters table step by step." },
  { icon: "sliders", title: "Set Properties on one screen", text: "See and edit every property of a Set Properties step at once. Reorder, duplicate, filter and reuse them; Apply walks through Boomi's own dialogs for you." },
  { icon: "check", title: "Property dictionary", text: "List your dynamic process and document properties once. Scripts, Message variables and Set Properties then suggest those names and warn about typos." },
  { icon: "zap", title: "Keyboard shortcuts", text: "Ctrl+Alt+S save, Ctrl+Alt+T test, Ctrl+Alt+X stop, Ctrl+Enter for OK and Esc for Cancel, ~ for more canvas. Each one can be switched off." },
  { icon: "target", title: "Canvas glow", text: "Unconnected endpoints glow orange and shapes with no incoming connection glow red, so loose ends are easy to spot. You can hide the dot grid too." }
];

export const FAQ = [
  ["Is Sidekick for Boomi free?", "Yes. No account, no ads, no paid tier."],
  ["How do I escape single quotes and curly braces in a Boomi Message shape?", "Write '' for an apostrophe and '{' and '}' for literal braces. Sidekick's Message editor does it for you: write plain text with named {variables} and it produces Boomi's quoted text. See the Message shape guide below."],
  ["Does it help with Groovy scripts and dynamic properties?", "Yes. The script editor autocompletes dataContext, ExecutionUtil and props, and warns about a missing document.dynamic.userdefined. prefix, a missing persist flag on setDynamicProcessProperty, and property names that don't match your dictionary."],
  ["Is it made by Boomi?", "No. Sidekick is an unofficial extension made by Web Whizz. It isn't affiliated with, endorsed by or sponsored by Boomi."],
  ["Does it call Boomi's API or need my credentials?", "No. It works only from what the Boomi build screen already shows. It never calls an API, never reads passwords or cookies, and makes no network requests of its own."],
  ["Will it break OK and Save in Boomi's dialogs?", "No. Every edit you make in Sidekick's editor is written back into Boomi's own field, so Boomi saves it as usual. You can switch the editor off per dialog with the toggle next to its title."],
  ["Which sites does it run on?", "Only Boomi's own pages, under boomi.com and manywho.com. It doesn't run on or read any other site."],
  ["Where are my settings and snippets stored?", "In Chrome's extension storage on your computer. You can export, import or reset them from the Options page, and uninstalling removes them."]
];

const SHOTS = [
  ["shot-script-editor.png", "Sidekick's Groovy script editor in Boomi with the Functions menu for dataContext", "A real code editor for Groovy and JavaScript, with Boomi API autocomplete."],
  ["shot-set-properties.png", "Sidekick's Set Properties editor showing every property of a Boomi Set Properties step on one screen", "Every Set Properties row on one screen."],
  ["shot-message-editor.png", "Sidekick's Message shape editor with a named {orderId} variable", "Message shapes with named variables and automatic quoting."],
  ["shot-shortcuts.png", "Sidekick options: canvas glow settings and Boomi keyboard shortcuts for save, test, stop and revert", "Shortcuts for save, test, stop and revert, and canvas glow for loose ends. Each can be switched off."]
];

function StoreButton({ campaign }) {
  if (SIDEKICK.chromeStoreUrl) {
    return (
      <a className="btn btn-primary" href={`${SIDEKICK.chromeStoreUrl}?utm_source=web-whizz.com&utm_medium=website&utm_campaign=${campaign}`} target="_blank" rel="noopener noreferrer" data-umami-event="add-to-chrome" data-umami-event-product="sidekick">
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

export default function SidekickBoomi() {
  return (
    <>
      <section className="hero hero-product">
        <div className="wrap hero-grid">
          <div>
            <div className="product-id">
              <img src={SIDEKICK.img("logo.png")} alt="" width="64" height="64" />
              <div>
                <p className="product-name">{SIDEKICK.name}</p>
                <span className="eyebrow">Developer tools for Boomi</span>
              </div>
            </div>
            <h1>A better build screen for Boomi Integration</h1>
            <p className="lead">
              A real code editor for your scripts, Message shapes without quoting headaches, every Set Properties row on one screen, shortcuts for save and test, and a canvas that shows you loose ends. All of it
              runs in your browser and sends nothing anywhere.
            </p>
            <div className="actions">
              <StoreButton campaign="sidekick-hero" />
              <a className="btn btn-ghost" href="#features">
                What it does
              </a>
            </div>
            <ul className="trust">
              <li>v{SIDEKICK.version}</li>
              <li>Free · No account · No tracking</li>
            </ul>
          </div>
          <img className="hero-promo" src={SIDEKICK.img("og.png")} alt={`${SIDEKICK.name}: a Groovy and JavaScript code editor inside Boomi`} width="1400" height="560" fetchPriority="high" style={{ width: "100%", height: "auto", borderRadius: 16 }} />
        </div>
      </section>

      <section id="features" className="section">
        <div className="wrap">
          <h2 className="section-title">What it adds to Boomi</h2>
          <p className="section-lead">Sidekick upgrades the parts of the build screen you spend the most time in, without changing how Boomi saves your work.</p>
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

      <section id="screenshots" className="section section-alt">
        <div className="wrap narrow prose">
          <h2 className="section-title">See it in Boomi</h2>
          {SHOTS.map(([file, alt, caption]) => (
            <Shot key={file} file={file} img={SIDEKICK.img} alt={alt} caption={caption} />
          ))}
        </div>
      </section>

      <section id="guides" className="section">
        <div className="wrap narrow prose">
          <h2 className="section-title">Boomi guides</h2>
          <ul>
            {GUIDE_LIST.map((g) => (
              <li key={g.path}>
                <a href={g.path}>{g.h1}</a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section-alt">
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
            Sidekick has no accounts, no analytics and no network requests. Your settings, snippets and property dictionary stay in your browser, and nothing it reads from Boomi ever leaves it. Read the{" "}
            <a href={SIDEKICK.privacyPath}>privacy policy</a>.
          </p>

          {/* The same feedback form the extension opens (SidekickSurvey); from=site marks answers sent from the website. */}
          <div className="callout callout-feedback">
            <div>
              <h3>Questions, bugs or ideas?</h3>
              <p>Tell us which Boomi screens you work in, what works and what's missing. It takes a minute.</p>
            </div>
            <a className="btn btn-ghost" href={`${SIDEKICK.path}feedback/?from=site`} data-umami-event="feedback-click" data-umami-event-product="sidekick">
              <Icon name="chat" size={18} /> Send feedback
            </a>
          </div>
          <p className="meta">Sidekick is not affiliated with, endorsed by or sponsored by Boomi, LP. “Boomi” is a trademark of its owner and is used here only to describe compatibility.</p>
        </div>
      </section>
    </>
  );
}
