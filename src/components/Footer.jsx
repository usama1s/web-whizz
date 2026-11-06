import { Brand } from "./Brand.jsx";
import { FLOW, SITE } from "../site.js";

export default function Footer({ ui, flowPath }) {
  return (
    <footer className="footer">
      <div className="wrap footer-inner">
        <div className="footer-brand">
          <Brand size={28} />
          <p>{ui.footerTagline}</p>
        </div>
        <div className="footer-cols">
          <div>
            <h2>{ui.footerProducts}</h2>
            <a href={flowPath}>{FLOW.name}</a>
          </div>
          <div>
            <h2>{ui.footerHelp}</h2>
            <a href={flowPath + "#guide"}>{ui.footerGuide}</a>
            <a href={FLOW.privacyPath}>{ui.footerPrivacy}</a>
            <a href={`mailto:${SITE.email}`}>{ui.footerContact}</a>
          </div>
        </div>
      </div>
      <div className="wrap legal">
        <span suppressHydrationWarning>© {new Date().getFullYear()} Web Whizz</span>
        <span>{ui.legal}</span>
      </div>
    </footer>
  );
}
