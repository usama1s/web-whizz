import { useEffect, useState } from "react";
import Icon from "../components/Icon.jsx";
import Rich from "../components/Rich.jsx";
import { Demo, LangSwitch, Shot, StoreButton, Trust, Waitlist, YouTube } from "../components/Flow.jsx";
import { FLOW, RELEASES, SITE } from "../site.js";
import { locale } from "../i18n/flow/index.js";

// One layout for every language; all text comes from src/i18n/flow/<lang>.js.
// Each screenshot sits in the guide under the step it shows (guide section id → file), so the page
// doesn't stack the video and five screenshots in a row. Without a YouTube video they go back to "See it in action".
const SHOT_IN_SECTION = {
  "download-project": "shot-credits.png",
  pick: "shot-pick.png",
  "while-running": "shot-downloading.png",
  "several-projects": "shot-several-projects.png",
  timeouts: "shot-retry.png"
};
const SHOTS = Object.values(SHOT_IN_SECTION);
const hasVideo = Boolean(FLOW.youtube?.id);

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
  const links = { store: `${FLOW.chromeStoreUrl}?utm_source=web-whizz.com&utm_medium=website&utm_campaign=flow-page-${lang}`, email: `mailto:${SITE.email}`, privacy: FLOW.privacyPath };
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
              <StoreButton t={t.hero} lang={lang} />
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
                    {/* data-label: the column name, shown above each answer on phones, where the header row is hidden */}
                    <td className="compare-us" data-label={t.compare.us}>
                      <span className="yes">
                        <Icon name="check" size={18} />
                      </span>
                      {us}
                    </td>
                    <td data-label={t.compare.them}>
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
          {hasVideo ? (
            <>
              <YouTube />
              {/* Right after the demo is when people are most ready to install. */}
              <div className="after-video">
                <div className="actions">
                  <StoreButton t={t.hero} lang={lang} />
                  <a className="btn btn-ghost" href="#guide">
                    {t.hero.guide}
                  </a>
                </div>
                <Trust t={t.hero} lang={lang} />
              </div>
            </>
          ) : (
            <div className="gallery">
              {SHOTS.map((file) => (
                <Shot key={file} file={file} alt={t.gallery.shots[file][0]} caption={t.gallery.shots[file][1]} />
              ))}
            </div>
          )}
        </div>
      </section>

      <section id="guide" className="section">
        <div className="wrap docs">
          <Toc items={toc} label={t.guide.toc} title={t.guide.title} />

          <article className="prose">
            <h2 className="section-title">{t.guide.title}</h2>

            {t.guide.sections.map((s) => (
              <div key={s.id}>
                <h3 id={s.id}>{s.title}</h3>
                <Blocks blocks={s.blocks} links={links} />
                {hasVideo && SHOT_IN_SECTION[s.id] && (
                  <Shot file={SHOT_IN_SECTION[s.id]} alt={t.gallery.shots[SHOT_IN_SECTION[s.id]][0]} caption={t.gallery.shots[SHOT_IN_SECTION[s.id]][1]} />
                )}
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
                <a className="btn btn-ghost" href={`mailto:${SITE.email}`} data-umami-event="email-click" data-umami-event-where="flow-pro">
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

// "On this page". Wide screens: a sticky sidebar list, always open. Phones and tablets (≤980px, NARROW): a bar that
// sticks under the header while the guide is on screen, names the section being read, and opens into the full list.
// Both highlight the section being read: the last heading that has scrolled up past the sticky header (and bar).
const NARROW = "(max-width: 980px)";

function Toc({ items, label, title }) {
  const [open, setOpen] = useState(true); // the pre-rendered page has it open, for wide screens
  const [current, setCurrent] = useState(null);

  useEffect(() => {
    if (matchMedia(NARROW).matches) setOpen(false);
    const headings = items.map(([id]) => document.getElementById(id)).filter(Boolean);
    let frame = 0;
    const update = () => {
      frame = 0;
      const line = matchMedia(NARROW).matches ? 150 : 110;
      let id = null;
      for (const h of headings) if (h.getBoundingClientRect().top <= line) id = h.id;
      setCurrent(id);
    };
    const onScroll = () => frame || (frame = requestAnimationFrame(update));
    update();
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onScroll);
    return () => {
      removeEventListener("scroll", onScroll);
      removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [items]);

  const currentLabel = items.find(([id]) => id === current)?.[1];

  return (
    <aside className="toc">
      <details open={open} onToggle={(e) => setOpen(e.currentTarget.open)}>
        <summary>
          <span className="toc-label">{label}</span>
          {currentLabel && <span className="toc-current">{currentLabel}</span>}
        </summary>
        <nav aria-label={title} onClick={(e) => e.target.closest("a") && matchMedia(NARROW).matches && setOpen(false)}>
          {items.map(([id, text]) => (
            <a key={id} href={`#${id}`} className={id === current ? "active" : undefined} aria-current={id === current ? "location" : undefined}>
              {text}
            </a>
          ))}
        </nav>
      </details>
    </aside>
  );
}

// A release whose notes aren't translated yet shows the English notes.
const en = (version) => locale("en").t.changelog.entries[version] || [];
