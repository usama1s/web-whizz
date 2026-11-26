import Survey from "../components/Survey.jsx";
import { TURNOFFAI } from "../site.js";

// AI-Free Web's three short surveys (the form itself is src/components/Survey.jsx). Three pages (see src/routes.jsx):
//   welcome  — opened once by the extension right after it is installed
//   goodbye  — opened by Chrome when the extension is removed (chrome.runtime.setUninstallURL)
//   feedback — the popup's "Feedback" link
// The extension's src/shared/usage.ts (pageUrl) builds these addresses. Keep the answer values in sync with the
// "turnoffai" lists in public/api/feedback.php: anything else is dropped.

// Usage counts the extension adds to the address. Sent as hidden fields.
//   d days since install · p pages cleaned · h AI elements hidden · o "Show AI once" presses · rp reports sent
//   cr personal hide rules · ru / rf rule updates installed / rejected · top site with most hidden · off sites switched off
//   from where the page was opened ("popup", "site")
export const CONTEXT = ["v", "lang", "d", "p", "h", "o", "rp", "cr", "ru", "rf", "top", "off", "from"];

const ROLE = {
  name: "role",
  type: "radio",
  label: "What best describes you?",
  options: [
    ["everyday", "I just want Gmail, Search and YouTube without AI"],
    ["office", "I work in Outlook, Word or Excel on the web"],
    ["writer", "I'm a writer, student or teacher"],
    ["privacy", "I don't want my content sent to AI by accident"],
    ["it", "I manage browsers for a team or company"],
    ["other", "Something else"]
  ]
};

const ANNOY = {
  name: "annoy",
  type: "checkbox",
  label: "Which AI features bothered you most?",
  hint: "Pick all that apply.",
  options: [
    ["overviews", "AI Overviews and AI Mode in Google Search"],
    ["gmail", "Gemini in Gmail"],
    ["docs", "Gemini in Docs, Sheets, Slides or Drive"],
    ["youtube", "AI on YouTube"],
    ["outlook", "Copilot in Outlook"],
    ["office", "Copilot in Word, Excel or PowerPoint"],
    ["linkedin", "AI prompts on LinkedIn"],
    ["bing", "Copilot in Bing"]
  ]
};

const WANT = {
  name: "want",
  type: "checkbox",
  label: "Which sites should we cover next?",
  hint: "Pick all that apply. It decides what we build next.",
  options: [
    ["meta", "Meta AI in Facebook, Instagram and WhatsApp Web"],
    ["amazon", "Amazon's Rufus"],
    ["x", "Grok on X"],
    ["notion", "Notion AI"],
    ["canva", "Canva AI"],
    ["zoom", "Zoom AI Companion"],
    ["firefox", "A Firefox version"]
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
    h1: "AI is switched off 🎉",
    lead: "AI-Free Web is already working on every supported site. Here's how to control it, plus a few quick questions so we build what you need.",
    questionsTitle: "A few quick questions (all optional)",
    questions: [
      ANNOY,
      ROLE,
      {
        name: "source",
        type: "radio",
        label: "How did you find AI-Free Web?",
        options: [
          ["store", "Searching the Chrome Web Store"],
          ["google", "Google search"],
          ["reddit", "Reddit or a forum"],
          ["social", "A social site or video"],
          ["news", "A news article or blog"],
          ["friend", "A friend or colleague"],
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
    lead: "AI-Free Web is free and made by a small team. One minute of your time tells us what to fix.",
    questionsTitle: "Why did you uninstall?",
    questions: [
      {
        name: "reason",
        type: "radio",
        required: true,
        label: "The main reason",
        options: [
          ["missed", "AI was still showing"],
          ["broke", "It hid something I needed, or broke a page"],
          ["slow", "Pages felt slower with it"],
          ["confusing", "I couldn't figure out how to use it"],
          ["want_ai", "I decided I want the AI features after all"],
          ["trust", "I didn't want an extension on my email or documents"],
          ["other_tool", "I found another tool"],
          ["other", "Something else"]
        ]
      },
      { name: "tool", type: "text", label: "Which tool?", showIf: (a) => a.reason === "other_tool" },
      { name: "where", type: "text", label: "Which site, and what was it?", hint: "For example: “Gmail, the Gemini star on the right”.", showIf: (a) => a.reason === "missed" || a.reason === "broke" },
      { name: "stay", type: "textarea", label: "What would have made you stay?", hint: "Optional, but this is the most useful part." },
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
    lead: "Tell us what works, what doesn't, and which AI still gets in your way. It takes a minute and goes straight to the developer.",
    questionsTitle: "Your feedback",
    questions: [
      {
        name: "rating",
        type: "stars",
        required: true,
        label: "How happy are you with AI-Free Web?"
      },
      { name: "bad", type: "textarea", label: "What should we fix or add?", hint: "If AI is still showing somewhere, which site and which button or panel?" },
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
  question: "Know someone tired of AI popping up everywhere? Share it with them:",
  text: "Free Chrome extension that turns off AI Overviews, Gemini and Copilot on Google, Gmail, YouTube, Outlook and Word:",
  title: "AI-Free Web – hide AI Overviews, Gemini & Copilot"
};

function QuickStart() {
  return (
    <div className="card quickstart">
      <h2>How to control it</h2>
      <ol>
        <li>
          <b>Pin it:</b> click the puzzle piece next to Chrome's address bar, then the pin next to AI-Free Web.
        </li>
        <li>
          <b>Reload</b> any Google or Microsoft tab that was already open. AI Overviews, Gemini and Copilot are now hidden.
        </li>
        <li>
          <b>Click the icon</b> for a switch per website, “Show AI on this page once”, and “Something AI still showing?” to hide anything we missed.
        </li>
      </ol>
      <p>
        Want to keep a feature? Click the icon → <b>All settings</b>: every AI element has its own switch. <a href={TURNOFFAI.path}>See everything it hides</a>
      </p>
      <p>
        Help us fix broken rules faster: turn on <b>Send anonymous usage statistics</b> in the popup. It's off unless you turn it on, sends counts only and never anything from your pages.{" "}
        <a href={TURNOFFAI.privacyPath + "#stats"}>What's sent?</a>
      </p>
    </div>
  );
}

export default function TurnOffAiSurvey({ route }) {
  return (
    <Survey
      product={TURNOFFAI}
      survey={route.survey}
      s={SURVEYS[route.survey]}
      context={CONTEXT}
      quickStart={<QuickStart />}
      share={SHARE}
      fine="Answers are saved on web-whizz.com, together with the extension's version and a few anonymous usage counts from the page address (like how many AI elements it hid). Never anything from your emails, documents or searches."
      rateText="A quick rating on the Chrome Web Store helps other people find it."
      noShareIf={(a, survey) => survey === "goodbye" && ["missed", "broke", "slow"].includes(a.reason)}
    />
  );
}
