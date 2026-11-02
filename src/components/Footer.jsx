import { Brand } from "./Brand.jsx";
import { FLOW, SITE } from "../site.js";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer-inner">
        <div className="footer-brand">
          <Brand size={28} />
          <p>Online tools that save you hours.</p>
        </div>
        <div className="footer-cols">
          <div>
            <h2>Products</h2>
            <a href={FLOW.path}>{FLOW.name}</a>
          </div>
          <div>
            <h2>Help</h2>
            <a href={FLOW.path + "#guide"}>Flow Downloader guide</a>
            <a href={FLOW.privacyPath}>Privacy policy</a>
            <a href={`mailto:${SITE.email}`}>Contact</a>
          </div>
        </div>
      </div>
      <div className="wrap legal">
        <span suppressHydrationWarning>© {new Date().getFullYear()} Web Whizz</span>
        <span>Google Flow is a trademark of Google LLC. Web Whizz is independent and not affiliated with Google.</span>
      </div>
    </footer>
  );
}
