import Icon from "../components/Icon.jsx";
import { Shot } from "../components/Flow.jsx";
import { FLOW, SITE } from "../site.js";

const PRINCIPLES = [
  { icon: "shield", title: "Private by default", text: "Our tools collect only what they need to work — never to sell, profile or track you." },
  { icon: "target", title: "Built to do the job", text: "Each tool focuses on real, repetitive work — and stays out of the way otherwise." },
  { icon: "inbox", title: "Hands off your stuff", text: "Our tools only touch what you asked them to. They never overwrite your files or meddle with other downloads." },
  { icon: "heart", title: "Honest by design", text: "Clear pricing, free where we can, and no dark patterns or surprise charges." }
];

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="wrap hero-grid">
          <div>
            <p className="eyebrow">Online tools by Web Whizz</p>
            <h1>Online tools that take the busywork out of your day.</h1>
            <p className="lead">
              Web Whizz builds focused online tools — point-of-sale systems, browser extensions and more — for the work you repeat every day.
            </p>
            <div className="actions">
              <a className="btn btn-primary" href="#products">
                See our products <Icon name="arrow" size={18} />
              </a>
              <a className="btn btn-ghost" href="#contact">
                Get in touch
              </a>
            </div>
          </div>
          <Shot file="shot-downloading.png" alt="Flow Bulk Downloader downloading a project: tiles marked downloaded, downloading, skipped and queued" eager />
        </div>
      </section>

      <section id="products" className="section">
        <div className="wrap">
          <h2 className="section-title">Products</h2>
          <p className="section-lead">Built carefully, tested against real-world use, and documented properly.</p>
          <div className="cards">
            <a className="card ext-card" href={FLOW.path}>
              <img src={FLOW.img("logo.png")} alt="" width="72" height="72" />
              <div>
                <h3>{FLOW.name}</h3>
                <p>Download all or selected Google Flow videos &amp; images in one go — 1080p, 4K, GIF or 2K — into any folder you choose.</p>
                <ul className="tags">
                  <li>Chrome</li>
                  <li>Free</li>
                  <li>Videos &amp; images</li>
                </ul>
                <span className="link-more">
                  Learn more <Icon name="arrow" size={16} />
                </span>
              </div>
            </a>
            <div className="card card-dashed">
              <div className="soon-icon">
                <Icon name="grid" size={26} />
              </div>
              <h3>More on the way</h3>
              <p>More tools are in the works, including point-of-sale. Have a task you'd love to see automated? Tell us about it.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="wrap">
          <h2 className="section-title">How we build</h2>
          <div className="features">
            {PRINCIPLES.map((p) => (
              <div className="feature" key={p.title}>
                <span className="feature-icon">
                  <Icon name={p.icon} />
                </span>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="section">
        <div className="wrap contact">
          <div>
            <h2 className="section-title">Questions, bugs or ideas?</h2>
            <p className="section-lead">We read every message. Tell us which tool you're using and what happened.</p>
          </div>
          <a className="btn btn-primary" href={`mailto:${SITE.email}`}>
            <Icon name="mail" size={18} /> Email us
          </a>
        </div>
      </section>
    </>
  );
}
