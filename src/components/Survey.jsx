import { useEffect, useRef, useState } from "react";
import Icon from "./Icon.jsx";
import { SITE } from "../site.js";

// The extensions' short surveys (welcome after install, goodbye on uninstall, feedback), shared by every product.
// Each product keeps its own questions and wording in src/pages/<Product>Survey.jsx and passes them here.
// The extension puts a few anonymous usage counts in the page address (`context`: the parameter names to keep);
// they are sent along with the answers to /api/feedback.php, which saves them in that product's CSV outside the
// web root. The answer values must match the product's lists in public/api/feedback.php: anything else is dropped.

// Share links for the product page. The utm_ tags show in Umami which network brought the visit.
function Share({ product, survey, share }) {
  const [copied, setCopied] = useState(false);
  const link = (network) => `${SITE.url}${product.path}?utm_source=${network}&utm_medium=share&utm_campaign=${survey}`;
  const enc = encodeURIComponent;
  const nets = [
    ["whatsapp", "WhatsApp", `https://wa.me/?text=${enc(share.text + " " + link("whatsapp"))}`],
    ["telegram", "Telegram", `https://t.me/share/url?url=${enc(link("telegram"))}&text=${enc(share.text)}`],
    ["facebook", "Facebook", `https://www.facebook.com/sharer/sharer.php?u=${enc(link("facebook"))}`],
    ["x", "X", `https://twitter.com/intent/tweet?text=${enc(share.text)}&url=${enc(link("x"))}`],
    ["reddit", "Reddit", `https://www.reddit.com/submit?url=${enc(link("reddit"))}&title=${enc(share.title)}`]
  ];
  async function copy() {
    try {
      await navigator.clipboard.writeText(link("copy"));
      setCopied(true);
      window.umami?.track("share", { network: "copy", survey, product: product.key });
    } catch {}
  }
  return (
    <div className="share">
      <p className="share-title">{share.question}</p>
      <div className="share-row">
        {nets.map(([id, name, href]) => (
          <a key={id} className="btn btn-ghost share-btn" href={href} target="_blank" rel="noopener noreferrer" data-umami-event="share" data-umami-event-network={id} data-umami-event-survey={survey} data-umami-event-product={product.key}>
            {name}
          </a>
        ))}
        <button type="button" className="btn btn-ghost share-btn" onClick={copy}>
          <Icon name={copied ? "check" : "copy"} size={16} /> {copied ? "Link copied" : "Copy link"}
        </button>
      </div>
    </div>
  );
}

function Stars({ q, value, onChange }) {
  return (
    <div className="stars-input" role="radiogroup" aria-label={q.label}>
      {[1, 2, 3, 4, 5].map((n) => (
        <label key={n} className={n <= (Number(value) || 0) ? "on" : ""}>
          <input type="radio" name={q.name} value={n} required={q.required} checked={Number(value) === n} onChange={() => onChange(String(n))} />
          <span aria-hidden="true">★</span>
          <span className="sr-only">{n} of 5</span>
        </label>
      ))}
    </div>
  );
}

function Question({ q, answers, set }) {
  const v = answers[q.name];
  const id = `q-${q.name}`;
  let field;
  if (q.type === "radio" || q.type === "checkbox") {
    const many = q.type === "checkbox";
    field = (
      <div className="choices">
        {q.options.map(([value, label]) => (
          <label key={value} className="choice">
            <input
              type={q.type}
              name={many ? `${q.name}[]` : q.name}
              value={value}
              required={q.required}
              checked={many ? (v || []).includes(value) : v === value}
              onChange={(e) => set(q.name, many ? (e.target.checked ? [...(v || []), value] : (v || []).filter((x) => x !== value)) : value)}
            />
            <span>{label}</span>
          </label>
        ))}
      </div>
    );
  } else if (q.type === "stars") {
    field = <Stars q={q} value={v} onChange={(x) => set(q.name, x)} />;
  } else if (q.type === "textarea") {
    field = <textarea id={id} name={q.name} rows={4} maxLength={2000} value={v || ""} onChange={(e) => set(q.name, e.target.value)} />;
  } else {
    field = (
      <input id={id} type={q.type} name={q.name} maxLength={q.type === "email" ? 254 : 200} autoComplete={q.type === "email" ? "email" : "off"} value={v || ""} onChange={(e) => set(q.name, e.target.value)} />
    );
  }
  const grouped = q.type === "radio" || q.type === "checkbox" || q.type === "stars";
  const Wrap = grouped ? "fieldset" : "div";
  return (
    <Wrap className="question">
      {grouped ? <legend>{q.label}{q.required && <span className="req"> *</span>}</legend> : <label htmlFor={id}>{q.label}</label>}
      {q.hint && <p className="q-hint">{q.hint}</p>}
      {field}
    </Wrap>
  );
}

/**
 * product:    { key, name, path, privacyPath, chromeStoreUrl, feedbackUrl } (src/site.js)
 * survey:     "welcome" | "goodbye" | "feedback"
 * s:          that survey's wording and questions
 * context:    address parameters to send along (the extension's usage counts)
 * quickStart: shown on the welcome page above the questions
 * share:      { question, text, title } for the share buttons
 * fine:       the line under the form about what is saved
 * rateText:   the sentence before "Rate it"
 * noShareIf:  (answers) => true hides the share buttons (e.g. after "it didn't work")
 */
// Umami event, if analytics is on. Kept apart from the submit's try/catch: an analytics error must never turn an
// answer that was saved into "That didn't go through".
function track(name, data) {
  try {
    window.umami?.track(name, data);
  } catch {}
}

export default function Survey({ product, survey, s, context: contextKeys, quickStart, share, fine, rateText, noShareIf }) {
  const [answers, setAnswers] = useState({});
  const [context, setContext] = useState({});
  const [status, setStatus] = useState("idle");
  const shownAt = useRef(0); // see Waitlist in components/Flow.jsx: "elapsed" is timed by the browser alone

  useEffect(() => {
    const q = new URLSearchParams(location.search);
    setContext(Object.fromEntries(contextKeys.filter((k) => q.get(k)).map((k) => [k, q.get(k).slice(0, 20)])));
    shownAt.current = performance.now();
  }, [contextKeys]);

  const set = (name, value) => setAnswers((a) => ({ ...a, [name]: value }));
  const visible = s.questions.filter((q) => !q.showIf || q.showIf(answers));

  async function submit(e) {
    e.preventDefault();
    setStatus("sending");
    try {
      const body = new FormData(e.currentTarget);
      body.set("elapsed", String(Math.floor((performance.now() - shownAt.current) / 1000)));
      const res = await fetch(product.feedbackUrl, { method: "POST", body, headers: { Accept: "application/json" } });
      const data = await res.json();
      setStatus(data.ok ? "ok" : "error");
      if (data.ok) track(`survey-${survey}`, { product: product.key, reason: answers.reason || "", rating: answers.rating || "", v: context.v || "" });
    } catch {
      setStatus("error");
    }
  }

  const happy = s.rate && Number(answers.rating) >= 4;
  const store = (campaign) => `${product.chromeStoreUrl}?utm_source=web-whizz.com&utm_medium=survey&utm_campaign=${campaign}`;

  return (
    <section className="section">
      <div className="wrap narrow survey">
        <p className="eyebrow">
          <a href={product.path}>{product.name}</a> · {s.eyebrow}
        </p>
        <h1>{s.h1}</h1>
        <p className="lead">{s.lead}</p>

        {s.reinstall && product.chromeStoreUrl && (
          <p className="survey-reinstall">
            Removed it by mistake?{" "}
            <a href={store("reinstall")} target="_blank" rel="noopener noreferrer" data-umami-event="reinstall-click" data-umami-event-product={product.key}>
              Reinstall from the Chrome Web Store
            </a>
          </p>
        )}

        {survey === "welcome" && quickStart}

        {status === "ok" ? (
          <div className="card survey-done" role="status">
            <p className="survey-ok">
              <Icon name="check" size={20} /> {s.thanks}
            </p>
            {(happy || survey === "welcome") && product.chromeStoreUrl && (
              <p>
                {happy ? "Glad it's working for you! " : ""}
                {rateText}
                <br />
                <a className="btn btn-primary" href={product.chromeStoreUrl + "/reviews"} target="_blank" rel="noopener noreferrer" data-umami-event="reviews-click" data-umami-event-from={survey} data-umami-event-product={product.key}>
                  ★ Rate it
                </a>
              </p>
            )}
            {!noShareIf?.(answers, survey) && <Share product={product} survey={survey} share={share} />}
          </div>
        ) : (
          <form className="card survey-form" action={product.feedbackUrl} method="post" onSubmit={submit}>
            <h2>{s.questionsTitle}</h2>
            <input type="hidden" name="product" value={product.key} />
            <input type="hidden" name="type" value={survey} />
            {Object.entries(context).map(([k, v]) => (
              <input key={k} type="hidden" name={k} value={v} />
            ))}
            <label className="hp" aria-hidden="true">
              Website <input type="text" name="website" tabIndex={-1} autoComplete="off" />
            </label>
            {visible.map((q) => (
              <Question key={q.name} q={q} answers={answers} set={set} />
            ))}
            <div className="survey-actions">
              <button className="btn btn-primary" type="submit" disabled={status === "sending"}>
                {status === "sending" ? "Sending…" : s.button}
              </button>
              {survey === "welcome" && <span className="q-hint">Optional. You can skip it and close this tab.</span>}
            </div>
            {status === "error" && (
              <p className="survey-error" role="alert">
                That didn't go through. Please try again, or email <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
              </p>
            )}
            <p className="fine">
              {fine} <a href={product.privacyPath}>Privacy policy</a>
            </p>
          </form>
        )}
      </div>
    </section>
  );
}
