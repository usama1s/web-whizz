import Survey from "../components/Survey.jsx";
import { SENTINEL } from "../site.js";

// Smart Sentinel's three short surveys (the form itself is src/components/Survey.jsx). Three pages (see src/routes.jsx):
//   welcome  — opened once by the extension right after it is installed
//   goodbye  — opened by Chrome when the extension is removed (chrome.runtime.setUninstallURL)
//   feedback — the popup's "Feedback" link, and "Not really" on its "Is it working well?" prompt
// The extension's src/lib/usage.ts (pageUrl) builds these addresses. Keep the answer values in sync with the
// "sentinel" lists in public/api/feedback.php: anything else is dropped there.

// Usage counts the extension adds to the address (usage.ts → pageUrl()). Sent as hidden fields.
//   d days since install · st rules started · rl reloads · er failed loads · fin rules that ended on their own
//   site/random/custom/stop/hard/sched/daily: how many started rules used that option · iv most-used interval ("30s")
export const CONTEXT = ["v", "lang", "d", "st", "rl", "er", "fin", "site", "random", "custom", "stop", "hard", "sched", "daily", "iv", "from"];

const USE = {
  name: "use",
  type: "checkbox",
  label: "What do you keep refreshing?",
  hint: "Pick all that apply.",
  options: [
    ["tickets", "Tickets, sneaker drops or limited sales"],
    ["booking", "Appointment or booking slots (visa, exams, courts, restaurants)"],
    ["stock", "Products coming back in stock, or price changes"],
    ["dashboard", "Dashboards, reports or monitoring screens"],
    ["queue", "Order queues, support tickets, job or freelance boards"],
    ["live", "Live scores, news, auctions or trading pages"],
    ["dev", "My own website while I build or test it"],
    ["other", "Something else"]
  ]
};

const WANT = {
  name: "want",
  type: "checkbox",
  label: "Which of these would you use?",
  hint: "Pick all that apply. It helps us decide what to build next.",
  options: [
    ["change", "Alert me when something on the page changes"],
    ["keyword", "Alert me when a word appears or disappears (e.g. “In stock”)"],
    ["typing", "Pause while I'm typing, so nothing I've entered is lost"],
    ["scroll", "Keep my scroll position after each reload"],
    ["list", "One list of every tab that's auto refreshing"],
    ["autostart", "Start refreshing on its own when I open certain pages"],
    ["sound", "A sound or desktop notification on an alert"]
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
    lead: "Smart Sentinel is ready. Here's how to start your first auto refresh, plus a few quick questions so we build what you need.",
    questionsTitle: "A few quick questions (all optional)",
    questions: [
      USE,
      {
        name: "source",
        type: "radio",
        label: "How did you find Smart Sentinel?",
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
        name: "before",
        type: "radio",
        label: "What did you use before?",
        options: [
          ["manual", "Nothing, I pressed reload myself"],
          ["other_ext", "Another auto refresh extension"],
          ["script", "A script or bot I set up"],
          ["new", "Nothing, this is a new need"]
        ]
      },
      { name: "tool", type: "text", label: "Which extension?", hint: "Optional. What made you switch?", showIf: (a) => a.before === "other_ext" },
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
    lead: "Smart Sentinel is free and made by a small team. One minute of your time tells us what to fix.",
    questionsTitle: "Why did you uninstall?",
    questions: [
      {
        name: "reason",
        type: "radio",
        required: true,
        label: "The main reason",
        options: [
          ["broken", "It stopped refreshing, or missed reloads"],
          ["timing", "Reloads didn't happen at the time I set"],
          ["lost", "A reload lost what I'd typed or where I was on the page"],
          ["confusing", "I couldn't figure out how to use it"],
          ["access", "I didn't want to give it access to the site"],
          ["missing", "It's missing a feature I need"],
          ["once", "I only needed it once"],
          ["other_tool", "I found another tool"],
          ["other", "Something else"]
        ]
      },
      { name: "tool", type: "text", label: "Which tool?", showIf: (a) => a.reason === "other_tool" },
      { name: "stay", type: "textarea", label: "What went wrong, or what would have made you stay?", hint: "Optional, but this is the most useful part." },
      USE,
      {
        name: "monitor",
        type: "radio",
        label: "Would you use it if it alerted you when the page changes, instead of only reloading?",
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
        label: "How happy are you with Smart Sentinel?"
      },
      { name: "bad", type: "textarea", label: "What should we fix or add?" },
      { name: "good", type: "textarea", label: "What works well for you?", hint: "Optional." },
      USE,
      WANT,
      EMAIL
    ],
    button: "Send feedback",
    thanks: "Thank you! We read every message.",
    rate: true
  }
};

export const SURVEY_PAGES = Object.keys(SURVEYS);

const SHARE = {
  question: "Know someone who keeps pressing reload? Share it with them:",
  text: "Free Chrome extension that auto refreshes any tab on a timer or at an exact time, and keeps going after restarts:",
  title: "Smart Sentinel – auto refresh that never silently stops"
};

function QuickStart() {
  return (
    <div className="card quickstart">
      <h2>Your first auto refresh in 3 steps</h2>
      <ol>
        <li>
          <b>Pin it:</b> click the puzzle piece next to Chrome's address bar, then the pin next to Smart Sentinel.
        </li>
        <li>
          <b>Open the page</b> you want to keep fresh, and click the Smart Sentinel icon.
        </li>
        <li>
          <b>Pick how often → Start.</b> Chrome asks once to let it reload that site; say Allow. The ring counts down to the next reload.
        </li>
      </ol>
      <p>
        Need it at an exact moment, like a sale at 10:00? Choose <b>Between times</b>. <a href={`${SENTINEL.path}#how`}>See everything it can do</a>
      </p>
    </div>
  );
}

export default function SentinelSurvey({ route }) {
  return (
    <Survey
      product={SENTINEL}
      survey={route.survey}
      s={SURVEYS[route.survey]}
      context={CONTEXT}
      quickStart={<QuickStart />}
      share={SHARE}
      fine="Answers are saved on web-whizz.com, together with the extension's version and a few anonymous usage counts from the page address (like how many reloads it has done). No page addresses or site names."
      rateText="A quick rating on the Chrome Web Store helps other people find it."
      noShareIf={(a, survey) => survey === "goodbye" && ["broken", "timing", "lost"].includes(a.reason)}
    />
  );
}
