import { useEffect, useRef, useState } from "react";
import Icon from "../components/Icon.jsx";
import { FLOW, SITE } from "../site.js";
import { GUIDE } from "./FlowGuide.jsx";

// The extension's three short surveys. One component, three pages (see SURVEYS and src/routes.jsx):
//   welcome  — opened once by the extension right after it is installed
//   goodbye  — opened by Chrome when the extension is removed (chrome.runtime.setUninstallURL)
//   feedback — the popup's "Feedback" link, and the "Not really" answer on the on-page badge
// The extension puts a few anonymous usage counts in the page address (see CONTEXT); they are sent along with the
// answers to /api/feedback.php, which saves everything to a CSV outside the web root. Keep the question values in
// sync with the lists in public/api/feedback.php: anything else is dropped there.

// Usage counts the extension adds to the address (background.js → pageUrl()). Sent as hidden fields.
export const CONTEXT = ["v", "lang", "d", "r", "ok", "f", "s", "e", "x", "pick", "wait", "home", "newOnly", "folder", "qv", "qi", "from"];

const PLAN = {
  name: "plan",
  type: "radio",
  label: "Which Google Flow plan do you have?",
  options: [
    ["free", "Free"],
    ["plus", "Google AI Plus"],
    ["pro", "Google AI Pro"],
    ["ultra", "Google AI Ultra"],
    ["unsure", "Not sure"]
  ]
};

const USE = {
  name: "use",
  type: "checkbox",
  label: "What do you make with Flow?",
  hint: "Pick all that apply.",
  options: [
    ["youtube", "YouTube videos or Shorts"],
    ["social", "TikTok, Reels or other social posts"],
    ["ads", "Ads or marketing for a business"],
    ["film", "Short films, music videos or stories"],
    ["client", "Work for clients"],
    ["learning", "Courses, training or explainers"],
    ["personal", "Just for fun / trying it out"]
  ]
};

const WANT = {
  name: "want",
  type: "checkbox",
  label: "Which of these would you use?",
  hint: "Pick all that apply. It helps us decide what to build next.",
  options: [
    ["chain", "Turn a list of prompts into one continuous video (each clip continues the last)"],
    ["export", "Export to CapCut, Premiere or DaVinci in scene order"],
    ["credits", "See how many Flow credits each video and project cost"],
    ["prompts", "Save every prompt with its file (a prompts sheet)"],
    ["failed", "A list of failed generations, ready for a credit refund request"],
    ["zip", "Download everything as one ZIP"]
  ]
};

const EMAIL = {
  name: "email",
  type: "email",
  label: "Your email (optional)",
  hint: "Only if you'd like a reply, or to hear when something you asked for is ready. We never share it."
};

const SURVEYS = {
  welcome: {
    eyebrow: "Installed",
    h1: "You're all set 🎉",
    lead: "Flow Bulk Downloader is ready. Here's how to use it, plus a few quick questions so we build what you need.",
    questionsTitle: "A few quick questions (all optional)",
    questions: [
      USE,
      {
        name: "source",
        type: "radio",
        label: "How did you find Flow Bulk Downloader?",
        options: [
          ["store", "Searching the Chrome Web Store"],
          ["google", "Google search"],
          ["youtube", "A YouTube video"],
          ["social", "Facebook, TikTok, X, Reddit or another social site"],
          ["friend", "A friend or colleague"],
          ["ai", "ChatGPT, Gemini or another AI assistant"],
          ["other", "Somewhere else"]
        ]
      },
      {
        name: "volume",
        type: "radio",
        label: "How many videos and images do you make in Flow in a week?",
        options: [
          ["1-10", "1–10"],
          ["10-50", "10–50"],
          ["50-200", "50–200"],
          ["200+", "More than 200"]
        ]
      },
      PLAN,
      WANT,
      EMAIL
    ],
    button: "Send",
    thanks: "Thanks! That really helps.",
    rate: false
  },
  goodbye: {
    eyebrow: "Uninstalled",
    h1: "Sorry to see you go",
    lead: "Flow Bulk Downloader is free and made by a small team. One minute of your time tells us what to fix.",
    questionsTitle: "Why did you uninstall?",
    questions: [
      {
        name: "reason",
        type: "radio",
        required: true,
        label: "The main reason",
        options: [
          ["broken", "It didn't work, or downloads failed or got stuck"],
          ["quality", "The quality I wanted wasn't available on my Flow plan"],
          ["slow", "It was too slow"],
          ["confusing", "I couldn't figure out how to use it"],
          ["once", "I only needed it once"],
          ["other_tool", "I found another tool"],
          ["no_flow", "I don't use Google Flow anymore"],
          ["other", "Something else"]
        ]
      },
      { name: "tool", type: "text", label: "Which tool?", showIf: (a) => a.reason === "other_tool" },
      { name: "stay", type: "textarea", label: "What went wrong, or what would have made you stay?", hint: "Optional, but this is the most useful part." },
      PLAN,
      USE,
      {
        name: "chain",
        type: "radio",
        label: "Would you use a feature that turns a list of prompts into one continuous video?",
        options: [
          ["yes", "Yes"],
          ["maybe", "Maybe"],
          ["no", "No"]
        ]
      },
      EMAIL
    ],
    button: "Send",
    thanks: "Thank you. We read every answer.",
    reinstall: true
  },
  feedback: {
    eyebrow: "Feedback",
    h1: "How is it going?",
    lead: "Tell us what works, what doesn't, and what you'd like next. It takes a minute and goes straight to the developer.",
    questionsTitle: "Your feedback",
    questions: [
      {
        name: "rating",
        type: "stars",
        required: true,
        label: "How happy are you with Flow Bulk Downloader?"
      },
      { name: "bad", type: "textarea", label: "What should we fix or add?" },
      { name: "good", type: "textarea", label: "What works well for you?", hint: "Optional." },
      WANT,
      PLAN,
      EMAIL
    ],
    button: "Send feedback",
    thanks: "Thank you! We read every message.",
    rate: true
  }
};

export const SURVEY_PAGES = Object.keys(SURVEYS);

// Share links for the Flow page. The utm_ tags show in Umami which network brought the visit.
function Share({ survey }) {
  const [copied, setCopied] = useState(false);
  const link = (network) => `${SITE.url}${FLOW.path}?utm_source=${network}&utm_medium=share&utm_campaign=${survey}`;
  const text = "Free Chrome extension that downloads all your Google Flow videos & images in one click:";
  const enc = encodeURIComponent;
  const nets = [
    ["whatsapp", "WhatsApp", `https://wa.me/?text=${enc(text + " " + link("whatsapp"))}`],
    ["telegram", "Telegram", `https://t.me/share/url?url=${enc(link("telegram"))}&text=${enc(text)}`],
    ["facebook", "Facebook", `https://www.facebook.com/sharer/sharer.php?u=${enc(link("facebook"))}`],
    ["x", "X", `https://twitter.com/intent/tweet?text=${enc(text)}&url=${enc(link("x"))}`],
    ["reddit", "Reddit", `https://www.reddit.com/submit?url=${enc(link("reddit"))}&title=${enc("Flow Bulk Downloader – download all your Google Flow videos at once")}`]
  ];
  async function copy() {
    try {
      await navigator.clipboard.writeText(link("copy"));
      setCopied(true);
      window.umami?.track("share", { network: "copy", survey });
    } catch {}
  }
  return (
    <div className="share">
      <p className="share-title">Know someone who uses Google Flow? Share it with them:</p>
      <div className="share-row">
        {nets.map(([id, name, href]) => (
          <a key={id} className="btn btn-ghost share-btn" href={href} target="_blank" rel="noopener noreferrer" data-umami-event="share" data-umami-event-network={id} data-umami-event-survey={survey}>
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

function QuickStart() {
  return (
    <div className="card quickstart">
      <h2>Get started in 3 steps</h2>
      <ol>
        <li>
          <b>Pin it:</b> click the puzzle piece next to Chrome's address bar, then the pin next to Flow Bulk Downloader.
        </li>
        <li>
          <b>Open a project</b> in <a href="https://labs.google/fx/tools/flow" target="_blank" rel="noopener noreferrer">Google Flow</a> (or Flow's home page to save several projects).
        </li>
        <li>
          <b>Click the extension → Download.</b> Pick the quality and the folder, and it saves everything for you.
        </li>
      </ol>
      <p>
        <a href={GUIDE.path}>Read the full guide</a>
        {FLOW.youtube?.id && (
          <>
            {" · "}
            <a href={`https://www.youtube.com/watch?v=${FLOW.youtube.id}`} target="_blank" rel="noopener noreferrer" data-umami-event="youtube-click">
              Watch the 90-second video
            </a>
          </>
        )}
      </p>
    </div>
  );
}

export default function FlowSurvey({ route }) {
  const s = SURVEYS[route.survey];
  const [answers, setAnswers] = useState({});
  const [context, setContext] = useState({});
  const [status, setStatus] = useState("idle");
  const shownAt = useRef(0); // see Waitlist in components/Flow.jsx: "elapsed" is timed by the browser alone

  useEffect(() => {
    const q = new URLSearchParams(location.search);
    setContext(Object.fromEntries(CONTEXT.filter((k) => q.get(k)).map((k) => [k, q.get(k).slice(0, 20)])));
    shownAt.current = performance.now();
  }, []);

  const set = (name, value) => setAnswers((a) => ({ ...a, [name]: value }));
  const visible = s.questions.filter((q) => !q.showIf || q.showIf(answers));

  async function submit(e) {
    e.preventDefault();
    setStatus("sending");
    try {
      const body = new FormData(e.currentTarget);
      body.set("elapsed", String(Math.floor((performance.now() - shownAt.current) / 1000)));
      const res = await fetch(FLOW.feedbackUrl, { method: "POST", body, headers: { Accept: "application/json" } });
      const data = await res.json();
      setStatus(data.ok ? "ok" : "error");
      if (data.ok) window.umami?.track(`survey-${route.survey}`, { reason: answers.reason || "", rating: answers.rating || "", v: context.v || "" });
    } catch {
      setStatus("error");
    }
  }

  const happy = s.rate && Number(answers.rating) >= 4;
  const store = (campaign) => `${FLOW.chromeStoreUrl}?utm_source=web-whizz.com&utm_medium=survey&utm_campaign=${campaign}`;

  return (
    <section className="section">
      <div className="wrap narrow survey">
        <p className="eyebrow">
          <a href={FLOW.path}>{FLOW.name}</a> · {s.eyebrow}
        </p>
        <h1>{s.h1}</h1>
        <p className="lead">{s.lead}</p>

        {s.reinstall && (
          <p className="survey-reinstall">
            Removed it by mistake?{" "}
            <a href={store("reinstall")} target="_blank" rel="noopener noreferrer" data-umami-event="reinstall-click">
              Reinstall from the Chrome Web Store
            </a>
          </p>
        )}

        {route.survey === "welcome" && <QuickStart />}

        {status === "ok" ? (
          <div className="card survey-done" role="status">
            <p className="survey-ok">
              <Icon name="check" size={20} /> {s.thanks}
            </p>
            {(happy || route.survey === "welcome") && FLOW.chromeStoreUrl && (
              <p>
                {happy ? "Glad it's working for you! " : ""}A quick rating on the Chrome Web Store helps other Flow creators find it.
                <br />
                <a className="btn btn-primary" href={FLOW.chromeStoreUrl + "/reviews"} target="_blank" rel="noopener noreferrer" data-umami-event="reviews-click" data-umami-event-from={route.survey}>
                  ★ Rate it
                </a>
              </p>
            )}
            {route.survey !== "goodbye" || answers.reason !== "broken" ? <Share survey={route.survey} /> : null}
          </div>
        ) : (
          <form className="card survey-form" action={FLOW.feedbackUrl} method="post" onSubmit={submit}>
            <h2>{s.questionsTitle}</h2>
            <input type="hidden" name="type" value={route.survey} />
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
              {route.survey === "welcome" && <span className="q-hint">Optional. You can skip it and close this tab.</span>}
            </div>
            {status === "error" && (
              <p className="survey-error" role="alert">
                That didn't go through. Please try again, or email <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
              </p>
            )}
            <p className="fine">
              Answers are saved on web-whizz.com, together with the extension's version and a few anonymous usage counts from the page address (like how many downloads you ran).{" "}
              <a href={FLOW.privacyPath}>Privacy policy</a>
            </p>
          </form>
        )}
      </div>
    </section>
  );
}
