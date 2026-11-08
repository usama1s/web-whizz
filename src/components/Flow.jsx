import { useEffect, useRef, useState } from "react";
import Icon from "./Icon.jsx";
import { FLOW } from "../site.js";
import { LOCALES, fill } from "../i18n/flow/index.js";

// "Add to Chrome" once the store listing exists; until then a quiet "coming soon" badge.
// The utm_ tags let the Chrome Web Store dashboard show how many installs came from this button.
export function StoreButton({ t, lang }) {
  if (FLOW.chromeStoreUrl) {
    const href = `${FLOW.chromeStoreUrl}?utm_source=web-whizz.com&utm_medium=website&utm_campaign=flow-page-${lang}`;
    return (
      <a className="btn btn-primary" href={href} target="_blank" rel="noopener noreferrer" data-umami-event="add-to-chrome" data-umami-event-lang={lang}>
        <Icon name="download" size={18} /> {t.store}
      </a>
    );
  }
  return (
    <span className="btn btn-soon" role="status">
      {t.soon}
    </span>
  );
}

// Rating, users, version and "No account · No tracking", next to the Add to Chrome button.
export function Trust({ t, lang }) {
  const { users, rating, ratingCount } = FLOW.stats;
  const min = FLOW.statsMin;
  const num = (n, digits = 0) => n.toLocaleString(lang, { minimumFractionDigits: digits, maximumFractionDigits: digits });
  return (
    <ul className="trust">
      {ratingCount >= min.ratingCount && rating >= min.rating && (
        <li>
          <a href={FLOW.chromeStoreUrl + "/reviews"} target="_blank" rel="noopener noreferrer" data-umami-event="reviews-click" data-umami-event-lang={lang}>
            <span className="stars" aria-hidden="true">
              ★★★★★
            </span>{" "}
            <b>{num(rating, 1)}</b> ({fill(ratingCount === 1 ? t.ratingOne : t.ratingMany, { n: num(ratingCount) })})
          </a>
        </li>
      )}
      {users >= min.users && <li>{fill(users === 1 ? t.usersOne : t.usersMany, { n: num(users) })}</li>}
      <li>v{FLOW.version}</li>
      <li>{t.trust}</li>
    </ul>
  );
}

export function LangSwitch({ lang, label }) {
  return (
    <nav className="langs" aria-label={label}>
      <Icon name="globe" size={16} />
      {LOCALES.map((l) => (
        <a key={l.code} href={l.path} hrefLang={l.hreflang} lang={l.hreflang} aria-current={l.hreflang === lang ? "page" : undefined}
          data-umami-event="language-switch" data-umami-event-from={lang} data-umami-event-to={l.hreflang}>
          {l.label}
        </a>
      ))}
    </nav>
  );
}

// A two-project run in miniature: tiles go queued → yellow (downloading) → green (saved), one at a time.
// FLOW.demoVideo replaces it with a real screen recording.
const PER_PROJECT = 6;
const TILES = PER_PROJECT * 2;
const STEPS_PER_TILE = 2;
const END = TILES * STEPS_PER_TILE;
const HOLD = 5; // steps to show "all saved" before starting over
const START = 7; // the frame the pre-rendered page shows: a few saved, one downloading

export function Demo({ t }) {
  const [step, setStep] = useState(START);

  useEffect(() => {
    if (FLOW.demoVideo) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setStep(END);
      return;
    }
    const id = setInterval(() => setStep((s) => (s + 1) % (END + HOLD)), 650);
    return () => clearInterval(id);
  }, []);

  if (FLOW.demoVideo) {
    return (
      <div className="frame demo-frame">
        <video src={FLOW.img(FLOW.demoVideo)} autoPlay muted loop playsInline aria-label={t.alt} />
      </div>
    );
  }

  const saved = Math.min(TILES, Math.floor(step / STEPS_PER_TILE));
  const state = (k) => (k < saved ? "g" : k === saved && step < END ? "y" : "q");
  const project = Math.min(1, Math.floor(saved / PER_PROJECT));
  const doneInProject = saved - project * PER_PROJECT;

  return (
    <div className="frame demo-frame" role="img" aria-label={t.alt}>
      <div className="frame-bar" aria-hidden="true">
        <i />
        <i />
        <i />
      </div>
      <div className="demo" aria-hidden="true">
        <div className="demo-status">
          <b>{step >= END ? fill(t.done, { total: TILES }) : fill(t.status, { p: project + 1, n: 2, name: t.projects[project] })}</b>
          <span>{step >= END ? "" : fill(t.progress, { done: doneInProject, total: PER_PROJECT })}</span>
          <div className="demo-bar">
            <i style={{ width: `${(saved / TILES) * 100}%` }} />
          </div>
        </div>
        {t.projects.map((name, p) => (
          <div className="demo-project" key={name}>
            <div className="demo-name">
              <Icon name="folder" size={14} /> {name}
            </div>
            <div className="demo-grid">
              {Array.from({ length: PER_PROJECT }, (_, i) => {
                const k = p * PER_PROJECT + i;
                const s = state(k);
                return (
                  <div key={k} className={`demo-tile demo-${s}`} style={{ "--h": (k * 47 + 200) % 360 }}>
                    {p === 0 && <Icon name="play" size={14} />}
                    {s === "q" && <span className="demo-tag">{t.queued}</span>}
                    {s === "y" && <span className="demo-spin" />}
                    {s === "g" && <Icon name="check" size={16} />}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
        <div className="demo-legend">
          <span className="pill pill-y">{t.legendYellow}</span>
          <span className="pill pill-g">{t.legendGreen}</span>
        </div>
      </div>
    </div>
  );
}

// "Pro coming soon" email signup. Posts to FLOW.waitlistUrl (public/api/waitlist.php).
// It needs JavaScript: the script sends "elapsed", and a form posted without it is treated as a bot (see waitlist.php).
export function Waitlist({ t, lang }) {
  const [status, setStatus] = useState("idle");
  // When the form appeared, on the browser's own monotonic clock. On submit, the seconds since then are sent as
  // "elapsed", so the server's "too fast / too old" check never compares two different computers' clocks.
  const shownAt = useRef(0);

  useEffect(() => {
    const q = new URLSearchParams(location.search).get("waitlist");
    if (q === "ok" || q === "error") setStatus(q);
    shownAt.current = performance.now();
  }, []);

  async function submit(e) {
    e.preventDefault();
    setStatus("sending");
    try {
      const body = new FormData(e.currentTarget);
      body.set("elapsed", String(Math.floor((performance.now() - shownAt.current) / 1000)));
      const res = await fetch(FLOW.waitlistUrl, { method: "POST", body, headers: { Accept: "application/json" } });
      const data = await res.json();
      setStatus(data.ok ? "ok" : "error");
      // Counted in Umami (if it's on). Bots also get ok:true, so this can count a few more than the real CSV.
      if (data.ok) window.umami?.track("waitlist-signup", { lang });
    } catch {
      setStatus("error");
    }
  }

  return (
    <form className="waitlist" action={FLOW.waitlistUrl} method="post" onSubmit={submit}>
      <input type="hidden" name="lang" value={lang} />
      <label className="hp" aria-hidden="true">
        Website <input type="text" name="website" tabIndex={-1} autoComplete="off" />
      </label>
      {status === "ok" ? (
        <p className="waitlist-ok" role="status">
          <Icon name="check" size={18} /> {t.ok}
        </p>
      ) : (
        <div className="waitlist-row">
          <label className="sr-only" htmlFor="waitlist-email">
            {t.label}
          </label>
          <input id="waitlist-email" type="email" name="email" required placeholder={t.placeholder} autoComplete="email" />
          <button className="btn btn-primary" type="submit" disabled={status === "sending"}>
            {status === "sending" ? t.sending : t.button}
          </button>
        </div>
      )}
      <p className="waitlist-fine" role={status === "error" ? "alert" : undefined}>
        {status === "error" ? t.error : t.fine}
      </p>
    </form>
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
