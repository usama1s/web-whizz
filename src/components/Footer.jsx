import { Brand } from "./Brand.jsx";
import { FLOW, SENTINEL, SIDEKICK, SITE, WEBSITES } from "../site.js";

// product: "sentinel" / "sidekick" on those extensions' pages (src/routes.jsx), so Help links to their own guide and privacy policy.
export default function Footer({ ui, flowPath, product }) {
  const sentinel = product === "sentinel";
  const sidekick = product === "sidekick";
  return (
    <footer className="footer">
      <div className="wrap footer-inner">
        <div className="footer-brand">
          <Brand size={28} />
          <p>{ui.footerTagline}</p>
          <address className="footer-address">
            {SITE.legalName}
            {SITE.address.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </address>
        </div>
        <div className="footer-cols">
          <div>
            <h2>{ui.footerProducts}</h2>
            <a href={flowPath}>{FLOW.name}</a>
            <a href={SENTINEL.path}>{SENTINEL.name}</a>
            <a href={SIDEKICK.path}>{SIDEKICK.name}</a>
            {WEBSITES.map((w) => (
              <a key={w.key} href={w.url} data-umami-event={`${w.key}-click`} data-umami-event-where="footer">
                {w.domain}
              </a>
            ))}
            <a href="/e/">{ui.navExtensions}</a>
          </div>
          <div>
            <h2>{ui.footerHelp}</h2>
            {sidekick ? (
              <a href={SIDEKICK.privacyPath}>{ui.footerPrivacy}</a>
            ) : sentinel ? (
              <>
                <a href={SENTINEL.path + "#how"}>How Smart Sentinel works</a>
                <a href={SENTINEL.path + "auto-refresh-page-chrome/"}>How to auto refresh a page in Chrome</a>
                <a href={SENTINEL.privacyPath}>{ui.footerPrivacy}</a>
              </>
            ) : (
              <>
                <a href={flowPath + "#guide"}>{ui.footerGuide}</a>
                {/* The how-to article is English only, so it's linked from English pages. */}
                {flowPath === FLOW.path && <a href={FLOW.path + "download-all-google-flow-videos/"}>How to download all Flow videos</a>}
                <a href={FLOW.privacyPath}>{ui.footerPrivacy}</a>
              </>
            )}
            <a href={`mailto:${SITE.email}`} data-umami-event="email-click" data-umami-event-where="footer">{ui.footerContact}</a>
          </div>
        </div>
      </div>
      <div className="wrap legal">
        <span suppressHydrationWarning>© {new Date().getFullYear()} {SITE.legalName}</span>
        <span>
          {sidekick
            ? "Boomi is a trademark of Boomi, LP. Web Whizz is independent and not affiliated with Boomi."
            : sentinel
              ? "Chrome is a trademark of Google LLC. Web Whizz is independent and not affiliated with Google."
              : ui.legal}
        </span>
      </div>
    </footer>
  );
}
