import Survey from "../components/Survey.jsx";
import { FLOW } from "../site.js";
import { GUIDE } from "./FlowGuide.jsx";

// Flow Bulk Downloader's three short surveys (the form itself is src/components/Survey.jsx). Three pages (see src/routes.jsx):
//   welcome  — opened once by the extension right after it is installed
//   goodbye  — opened by Chrome when the extension is removed (chrome.runtime.setUninstallURL)
//   feedback — the popup's "Feedback" link, and the "Not really" answer on the on-page badge
// The extension puts a few anonymous usage counts in the page address (see CONTEXT); they are sent along with the
// answers to /api/feedback.php, which saves everything to a CSV outside the web root. Keep the question values in
// sync with the lists in public/api/feedback.php: anything else is dropped there.

// Usage counts the extension adds to the address (background.js → pageUrl()). Sent as hidden fields.
export const CONTEXT = ["v", "lang", "d", "r", "ok", "f", "s", "e", "x", "xu", "xc", "xq", "xp", "pick", "wait", "home", "newOnly", "folder", "qv", "qi", "from"];

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

const SHARE = {
  question: "Know someone who uses Google Flow? Share it with them:",
  text: "Free Chrome extension that downloads all your Google Flow videos & images in one click:",
  title: "Flow Bulk Downloader – download all your Google Flow videos at once"
};

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
  return (
    <Survey
      product={FLOW}
      survey={route.survey}
      s={SURVEYS[route.survey]}
      context={CONTEXT}
      quickStart={<QuickStart />}
      share={SHARE}
      fine="Answers are saved on web-whizz.com, together with the extension's version and a few anonymous usage counts from the page address (like how many downloads you ran)."
      rateText="A quick rating on the Chrome Web Store helps other Flow creators find it."
      noShareIf={(a, survey) => survey === "goodbye" && a.reason === "broken"}
    />
  );
}
