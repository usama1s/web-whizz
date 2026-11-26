import Icon from "./Icon.jsx";
import { FLOW, SENTINEL, SIDEKICK, TURNOFFAI } from "../site.js";

// Every Chrome extension, in the order they're shown on /e/ and on the home page.
// A new extension needs one entry here (and its page in src/routes.jsx).
export const EXTENSIONS = [
  {
    product: FLOW,
    text: "Download all or selected Google Flow videos & images in one go — 1080p, 4K, GIF or 2K — into any folder you choose.",
    tags: ["Free", "Videos & images"]
  },
  {
    product: SENTINEL,
    text: "Auto refresh any tab on a timer, at random intervals or at an exact time — and keep going after restarts, sleep and errors.",
    tags: ["Free", "Auto refresh"]
  },
  {
    product: SIDEKICK,
    text: "A real script editor, a Message shape editor, Set Properties on one screen, shortcuts and canvas glow for the Boomi Integration build screen.",
    tags: ["Free", "Developer tools"]
  },
  {
    product: TURNOFFAI,
    text: "Hide AI Overviews, Gemini, Copilot and other AI buttons, banners and panels on Google, Microsoft and more, with a switch per site.",
    tags: ["Free", "Privacy"]
  }
];

export const EXTENSIONS_PATH = "/e/";

// One card per extension. Umami events: home-<key>-card on the home page (the names it has always used),
// extension-card (with product) on /e/.
export function ExtensionCards({ where }) {
  return EXTENSIONS.map(({ product, text, tags }) => (
    <a key={product.key} className="card ext-card" href={product.path} data-umami-event={where === "home" ? `home-${product.key}-card` : "extension-card"} data-umami-event-product={product.key}>
      <img src={product.img("logo.png")} alt="" width="72" height="72" />
      <div>
        <h3>{product.name}</h3>
        <p>{text}</p>
        <ul className="tags">
          <li>Chrome</li>
          {tags.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
        <span className="link-more">
          Learn more <Icon name="arrow" size={16} />
        </span>
      </div>
    </a>
  ));
}
