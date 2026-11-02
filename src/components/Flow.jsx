import Icon from "./Icon.jsx";
import { FLOW } from "../site.js";

// "Add to Chrome" once the store listing exists; until then a quiet "coming soon" badge.
export function StoreButton() {
  if (FLOW.chromeStoreUrl) {
    return (
      <a className="btn btn-primary" href={FLOW.chromeStoreUrl} target="_blank" rel="noopener noreferrer">
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

export function SupportButton({ children = "Support development" }) {
  if (!FLOW.supportUrl) return null;
  return (
    <a className="btn btn-ghost" href={FLOW.supportUrl} target="_blank" rel="noopener noreferrer">
      <Icon name="heart" size={18} /> {children}
    </a>
  );
}

// A screenshot in a simple browser window frame.
export function Shot({ file, alt, caption, eager }) {
  const src = FLOW.img(file);
  return (
    <figure className="shot">
      <div className="frame">
        <div className="frame-bar" aria-hidden="true">
          <i />
          <i />
          <i />
        </div>
        <a href={src} target="_blank" rel="noopener">
          <img src={src} alt={alt} width="1280" height="800" loading={eager ? "eager" : "lazy"} decoding="async" />
        </a>
      </div>
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}
