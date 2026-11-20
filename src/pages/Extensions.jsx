import Icon from "../components/Icon.jsx";
import { ExtensionCards } from "../components/Extensions.jsx";
import { SITE } from "../site.js";

// /e/: every Web Whizz Chrome extension (the header's "Chrome extensions" link). The list is in components/Extensions.jsx.
export const META = {
  title: "Chrome Extensions by Web Whizz — Free, Private, No Account",
  description: "Free Chrome extensions by Web Whizz: Flow Bulk Downloader saves all your Google Flow videos and images at once, and Smart Sentinel auto refreshes any tab on a timer or at an exact time."
};

export default function Extensions() {
  return (
    <>
      <section className="hero">
        <div className="wrap">
          <p className="eyebrow">Web Whizz</p>
          <h1>Chrome extensions</h1>
          <p className="lead">Small, focused tools for the jobs you repeat in your browser. All free, no account, and nothing sent while you use them.</p>
          <div className="cards cards-2 extensions-list">
            <ExtensionCards where="extensions" />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap contact">
          <div>
            <h2 className="section-title">Want a tool that isn't here yet?</h2>
            <p className="section-lead">Tell us what you keep doing by hand in your browser. Good ideas become our next extension.</p>
          </div>
          <a className="btn btn-primary" href={`mailto:${SITE.email}`} data-umami-event="email-click" data-umami-event-where="extensions">
            <Icon name="mail" size={18} /> Email us
          </a>
        </div>
      </section>
    </>
  );
}
