import Survey from "../components/Survey.jsx";
import { SIDEKICK } from "../site.js";

// Sidekick for Boomi's three short surveys (the form itself is src/components/Survey.jsx). Three pages (see src/routes.jsx):
//   welcome  — opened once by the extension right after it is installed
//   goodbye  — opened by Chrome when the extension is removed (chrome.runtime.setUninstallURL)
//   feedback — the popup's "Feedback" link
// The extension's src/shared/usage.ts (pageUrl) builds these addresses. Keep the answer values in sync with the
// "sidekick" lists in public/api/feedback.php: anything else is dropped.

// Usage counts the extension adds to the address (usage.ts → pageUrl()). Sent as hidden fields.
//   d days since install · ed full editor opened · ip script fields upgraded in place · sp Set Properties editor opened
//   kb keyboard shortcuts used · from where the page was opened ("popup")
export const CONTEXT = ["v", "lang", "d", "ed", "ip", "sp", "kb", "from"];

const ROLE = {
  name: "role",
  type: "radio",
  label: "What best describes you?",
  options: [
    ["developer", "I build Boomi integrations for my company"],
    ["consultant", "I'm a consultant or partner building for clients"],
    ["admin", "I mostly support, monitor or review processes"],
    ["learning", "I'm learning Boomi"],
    ["other", "Something else"]
  ]
};

const WANT = {
  name: "want",
  type: "checkbox",
  label: "Which of these would you use?",
  hint: "Pick all that apply. It helps us decide what to build next.",
  options: [
    ["map", "A better editor for Map functions and map scripts"],
    ["search", "Search inside every shape and script of a process"],
    ["diff", "Compare two versions of a script or process"],
    ["docs", "Export process documentation"],
    ["logs", "Easier reading of Test mode documents and logs"],
    ["team", "Share snippets and the property dictionary with my team"]
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
    lead: "Sidekick is ready. Here's how to see it working, plus a few quick questions so we build what you need.",
    questionsTitle: "A few quick questions (all optional)",
    questions: [
      ROLE,
      {
        name: "source",
        type: "radio",
        label: "How did you find Sidekick?",
        options: [
          ["store", "Searching the Chrome Web Store"],
          ["google", "Google search"],
          ["community", "Boomi Community or a Boomi forum"],
          ["linkedin", "LinkedIn"],
          ["friend", "A colleague"],
          ["ai", "ChatGPT, Gemini or another AI assistant"],
          ["other", "Somewhere else"]
        ]
      },
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
    lead: "Sidekick is free and made by a small team. One minute of your time tells us what to fix.",
    questionsTitle: "Why did you uninstall?",
    questions: [
      {
        name: "reason",
        type: "radio",
        required: true,
        label: "The main reason",
        options: [
          ["broken", "It didn't work on my Boomi screens"],
          ["conflict", "It got in the way of Boomi's own editor or keys"],
          ["slow", "Boomi felt slower with it"],
          ["confusing", "I couldn't figure out how to use it"],
          ["trust", "I didn't want an extension on my Boomi account"],
          ["missing", "It's missing a feature I need"],
          ["no_boomi", "I don't work with Boomi any more"],
          ["other_tool", "I found another tool"],
          ["other", "Something else"]
        ]
      },
      { name: "tool", type: "text", label: "Which tool?", showIf: (a) => a.reason === "other_tool" },
      { name: "stay", type: "textarea", label: "What went wrong, or what would have made you stay?", hint: "Optional, but this is the most useful part." },
      ROLE,
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
        label: "How happy are you with Sidekick?"
      },
      { name: "bad", type: "textarea", label: "What should we fix or add?", hint: "If something didn't work, which screen or shape was it on?" },
      { name: "good", type: "textarea", label: "What works well for you?", hint: "Optional." },
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
  question: "Know another Boomi developer? Share it with them:",
  text: "Free Chrome extension for Boomi: a real code editor for scripts and Message shapes, Set Properties on one screen, and keyboard shortcuts:",
  title: "Sidekick for Boomi – script editor & canvas helpers"
};

function QuickStart() {
  return (
    <div className="card quickstart">
      <h2>See it working in 3 steps</h2>
      <ol>
        <li>
          <b>Pin it:</b> click the puzzle piece next to Chrome's address bar, then the pin next to Sidekick for Boomi.
        </li>
        <li>
          <b>Open a process</b> in Boomi Integration's build screen (reload the tab if it was already open). Loose connections now glow.
        </li>
        <li>
          <b>Open a Data Process script or a Message shape.</b> Its field becomes a real code editor; the toggle next to the dialog title switches it off.
        </li>
      </ol>
      <p>
        Then try <b>Ctrl+Alt+S</b> to save and <b>~</b> for more canvas. Every feature and shortcut can be switched off: click the Sidekick icon → <b>All settings</b>. <a href={SIDEKICK.path}>See everything it can do</a>
      </p>
    </div>
  );
}

export default function SidekickSurvey({ route }) {
  return (
    <Survey
      product={SIDEKICK}
      survey={route.survey}
      s={SURVEYS[route.survey]}
      context={CONTEXT}
      quickStart={<QuickStart />}
      share={SHARE}
      fine="Answers are saved on web-whizz.com, together with the extension's version and a few anonymous usage counts from the page address (like how many times the editor was opened). Never any script text, process names or account details."
      rateText="A quick rating on the Chrome Web Store helps other Boomi developers find it."
      noShareIf={(a, survey) => survey === "goodbye" && ["broken", "conflict", "slow"].includes(a.reason)}
    />
  );
}
