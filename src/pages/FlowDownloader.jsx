import Icon from "../components/Icon.jsx";
import Rich from "../components/Rich.jsx";
import { Demo, LangSwitch, Shot, StoreButton, Trust, Waitlist } from "../components/Flow.jsx";
import { FLOW, RELEASES, SITE } from "../site.js";
import { locale } from "../i18n/flow/index.js";

// One layout for every language; all text comes from src/i18n/flow/<lang>.js.
const SHOTS = ["shot-downloading.png", "shot-several-projects.png", "shot-credits.png", "shot-retry.png"];

function Blocks({ blocks, links }) {
  return blocks.map((b, i) => {
    if (b.p) return <p key={i}><Rich text={b.p} links={links} /></p>;
    if (b.ol || b.ul) {
      const List = b.ol ? "ol" : "ul";
      return (
        <List key={i}>
          {(b.ol || b.ul).map((item) => (
            <li key={item}>
              <Rich text={item} links={links} />
            </li>
          ))}
        </List>
      );
    }
    return (
      <div className="table-wrap" key={i}>
        <table>
          <thead>
            <tr>
              {b.table.head.map((h) => (
                <th key={h}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {b.table.rows.map((row) => (
              <tr key={row[0]}>
                {row.map((cell) => (
                  <td key={cell}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  });
}

export default function FlowDownloader({ route }) {
  const lang = route.lang;
  const { t } = locale(lang);
  const links = { store: FLOW.chromeStoreUrl, email: `mailto:${SITE.email}`, privacy: FLOW.privacyPath };
  const date = new Intl.DateTimeFormat(lang, { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });
  const toc = [
    ...t.guide.sections.map((s) => [s.id, s.title]),
    ["faq", t.faq.title],
    ["changelog", t.changelog.title],
    ["privacy", t.privacy.title]
  ];

  return (
    <>
      <section className="hero hero-product">
        <div className="wrap hero-grid">
          <div>
            <div className="product-id">
              <img src={FLOW.img("logo.png")} alt="" width="64" height="64" />
              <div>
                <p className="product-name">{FLOW.name}</p>
                <span className="eyebrow">{t.hero.eyebrow}</span>
              </div>
            </div>
            <h1>{t.hero.title}</h1>
            <p className="lead">{t.hero.lead}</p>
            <div className="actions">
              <StoreButton t={t.hero} />
              <a className="btn btn-ghost" href="#guide">
                {t.hero.guide}
              </a>
            </div>
            <Trust t={t.hero} lang={lang} />
            <LangSwitch lang={lang} label={t.ui.language} />
          </div>
          <Demo t={t.demo} />
        </div>
      </section>

      <section className="section section-alt">
        <div className="wrap">
          <h2 className="section-title">{t.compare.title}</h2>
          <p className="section-lead">{t.compare.lead}</p>
          <div className="table-wrap">
            <table className="compare">
              <thead>
                <tr>
                  <th />
                  <th className="compare-us">{t.compare.us}</th>
                  <th>{t.compare.them}</th>
                </tr>
              </thead>
              <tbody>
                {t.compare.rows.map(([label, us, them]) => (
                  <tr key={label}>
                    <th scope="row">{label}</th>
                    <td className="compare-us">
                      <span className="yes">
                        <Icon name="check" size={18} />
                      </span>
                      {us}
                    </td>
                    <td>
                      <span className="no">
                        <Icon name="x" size={16} />
                      </span>
                      {them}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="fine">{t.compare.note}</p>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <h2 className="section-title">{t.features.title}</h2>
          <div className="features features-4">
            {t.features.items.map((f) => (
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

      <section className="section section-alt">
        <div className="wrap">
          <h2 className="section-title">{t.gallery.title}</h2>
          <div className="gallery">
            {SHOTS.map((file) => (
              <Shot key={file} file={file} alt={t.gallery.shots[file][0]} caption={t.gallery.shots[file][1]} />
            ))}
          </div>
        </div>
      </section>

      <section id="guide" className="section">
        <div className="wrap docs">
          <aside className="toc">
            <details open>
              <summary>{t.guide.toc}</summary>
              <nav aria-label={t.guide.title}>
                {toc.map(([id, label]) => (
                  <a key={id} href={`#${id}`}>
                    {label}
                  </a>
                ))}
              </nav>
            </details>
          </aside>

          <article className="prose">
            <h2 className="section-title">{t.guide.title}</h2>

            {t.guide.sections.map((s) => (
              <div key={s.id}>
                <h3 id={s.id}>{s.title}</h3>
                <Blocks blocks={s.blocks} links={links} />
              </div>
            ))}

            <h3 id="faq">{t.faq.title}</h3>
            <div className="faq">
              {t.faq.items.map(([q, a]) => (
                <details key={q}>
                  <summary>{q}</summary>
                  <p>{a}</p>
                </details>
              ))}
            </div>

            <h3 id="changelog">{t.changelog.title}</h3>
            <div className="changelog">
              {RELEASES.map((r) => (
                <div className="release" key={r.version}>
                  <h4>
                    v{r.version} <time dateTime={r.date}>{date.format(new Date(r.date))}</time>
                  </h4>
                  <ul>
                    {(t.changelog.entries[r.version] || en(r.version)).map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <h3 id="privacy">{t.privacy.title}</h3>
            <p>
              <Rich text={t.privacy.text} links={links} />
            </p>

            <div id="pro" className="callout callout-pro">
              <div>
                <h3>{t.waitlist.title}</h3>
                <p>{t.waitlist.text}</p>
                <Waitlist t={t.waitlist} lang={lang} />
              </div>
              <div className="callout-contact">
                <p>{t.waitlist.contact}</p>
                <a className="btn btn-ghost" href={`mailto:${SITE.email}`}>
                  <Icon name="mail" size={18} /> {t.waitlist.email}
                </a>
              </div>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}

// A release whose notes aren't translated yet shows the English notes.
const en = (version) => locale("en").t.changelog.entries[version] || [];
