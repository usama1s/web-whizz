// English text for the Flow Bulk Downloader page (and the header/footer around it).
// Inline marks: **bold**, `code`, [[key]], [link](href), {y|yellow pill} ({g|…} green, {r|…} red, {q|…} grey).
// Link targets starting with $ are filled in by the page: $store, $email, $privacy.
// The other languages are translations of this file; keep their keys in the same shape.
export default {
  meta: {
    title: "Bulk Download Google Flow Videos & Images — Veo, Nano Banana, 4K | Flow Bulk Downloader",
    description:
      "Free Chrome extension to bulk download every Veo video and Nano Banana image from Google Flow in 4K, 1080p, GIF or 2K — into any folder. No account, never overwrites, never loses a file."
  },
  ui: {
    skip: "Skip to content",
    navProducts: "Products",
    navFlow: "Flow Downloader",
    navContact: "Contact",
    footerTagline: "Online tools that save you hours.",
    footerProducts: "Products",
    footerHelp: "Help",
    footerGuide: "Flow Downloader guide",
    footerPrivacy: "Privacy policy",
    footerContact: "Contact",
    legal: "Google Flow, Veo and Nano Banana are trademarks of Google LLC. Web Whizz is independent and not affiliated with Google.",
    language: "Language"
  },
  hero: {
    eyebrow: "Chrome extension for Google Flow",
    title: "The downloader that never loses a file",
    lead: "Bulk download every Veo video and Nano Banana image from your Google Flow projects — in 4K, 1080p, GIF or 2K — into any folder you choose. Anything it can't save is reported by name, never skipped quietly.",
    store: "Add to Chrome — it's free",
    soon: "Coming soon to the Chrome Web Store",
    guide: "Read the guide",
    ratingOne: "{n} rating",
    ratingMany: "{n} ratings",
    usersOne: "{n} user",
    usersMany: "{n} users",
    trust: "No account · No tracking"
  },
  demo: {
    alt: "Animated demo: two Flow projects download one after another; each tile turns yellow while downloading, then green when saved.",
    projects: ["Travel reel", "Product shots"],
    queued: "QUEUED",
    status: "Project {p} of {n} · {name}",
    progress: "{done} of {total} files saved",
    done: "All {total} files saved · 0 missed",
    legendYellow: "downloading",
    legendGreen: "saved"
  },
  compare: {
    title: "Why it never loses a file",
    lead: "Most Flow downloaders grab what they can and leave you to spot the gaps. Flow Bulk Downloader tells you exactly what happened to every item.",
    us: "Flow Bulk Downloader",
    them: "Typical alternatives",
    rows: [
      ["Account or sign-in", "None — install and go", "Often required"],
      ["Existing files", "Never overwritten — a second copy gets (2), (3)…", "Same-name files can clash"],
      ["Failed or slow items", "Listed by name, with one-click “Try again”", "Usually silent, or just a count"],
      ["Where files go", "Any folder, one subfolder per project", "Often the Downloads folder only"],
      ["Daily limits", "None", "Free tiers are often capped"],
      ["Your data", "Nothing collected — no servers", "Some collect personal or sign-in data"]
    ],
    note: "“Typical alternatives” summarizes the public Chrome Web Store listings of other Google Flow downloaders, November 2026."
  },
  features: {
    title: "Bulk download Veo videos and Nano Banana images in 4K",
    items: [
      { icon: "video", title: "Videos and images", text: "GIF, 720p, 1080p or 4K videos and 1K, 2K or 4K images — 4K where your plan allows." },
      { icon: "sliders", title: "Only what your plan offers", text: "It reads Flow's own Download menu first and lists only the qualities you can actually get. If one costs credits, you see the estimate and approve it first." },
      { icon: "pick", title: "Pick or take it all", text: "Tick exactly the items you want, tick nothing to take the whole project, or select everything except what you already downloaded." },
      { icon: "layers", title: "Several projects at once", text: "Start from Flow's home page; each project lands in its own subfolder." },
      { icon: "folder", title: "Any folder, clean names", text: "Save anywhere — even a new folder — as “01 - Title.mp4”, “02 - …”. Nothing is ever overwritten." },
      { icon: "inbox", title: "Leaves other downloads alone", text: "Only the files from your project are handled. Everything else you download keeps its own name and folder." },
      { icon: "grid", title: "Status on every tile", text: "Yellow = downloading, green = done, red = skipped. Live progress for every project." },
      { icon: "retry", title: "Nothing missed quietly", text: "Anything Flow reported an error for, or that took too long, is listed at the end with a one-click “Try again”." }
    ]
  },
  gallery: {
    title: "See it in action",
    shots: {
      "shot-downloading.png": ["A project downloading, with green, yellow, red and queued tiles", "Every tile shows where it is: downloaded, downloading, skipped or queued."],
      "shot-several-projects.png": ["Lock screen showing 2 of 5 projects finished and a per-project list", "Several projects in one run, each into its own subfolder."],
      "shot-credits.png": ["Quality dialog with 4K selected, showing a credit estimate and an approval checkbox", "4K costs credits: you see the estimate and approve it before anything starts."],
      "shot-retry.png": ["Dialog listing one failed and one timed-out item, with a Try again button", "Anything that failed or timed out is listed, with one-click retry."]
    }
  },
  guide: {
    title: "Guide: bulk download from Google Flow",
    toc: "On this page",
    sections: [
      {
        id: "install",
        title: "Install",
        blocks: [
          {
            ol: [
              "Open [Flow Bulk Downloader on the Chrome Web Store]($store) and click **Add to Chrome**.",
              "Click the puzzle-piece icon in Chrome's toolbar and **pin** Flow Bulk Downloader, so it's one click away."
            ]
          }
        ]
      },
      {
        id: "download-project",
        title: "Download a project",
        blocks: [
          {
            ol: [
              "Open your project in Google Flow and keep that tab in front.",
              "Click the extension icon → **Download** (or press [[Alt]]+[[Shift]]+[[D]]).",
              "Pick the quality for videos and for images. Only qualities your plan offers are listed; unavailable ones are named underneath.",
              "Choose where to save: **Choose folder…** (any folder, or click **New folder**), **Same folder as last time**, or **Just use your Downloads folder**. Chrome may ask once to let the page edit that folder — click **Allow / Edit files**.",
              "Sit back. Items are downloaded one at a time; upscales can take a few minutes each."
            ]
          }
        ]
      },
      {
        id: "pick",
        title: "Pick specific items",
        blocks: [
          {
            p: "Tick **Pick videos & images** in the popup. A checkbox appears on every finished tile — tick the ones you want, then press Download. **Select all** and **Clear** are in the popup. With nothing ticked, everything is downloaded. Failed generations never get a checkbox. **Select all except downloaded** ticks everything you haven't downloaded from this project yet, so you only get what's new."
          }
        ]
      },
      {
        id: "several-projects",
        title: "Several projects at once",
        blocks: [
          {
            ol: [
              "Go to Flow's home page (your list of projects).",
              "Optional: tick **Pick projects** in the popup and tick the projects you want (none ticked = all projects).",
              "Press Download. It peeks into the projects first to see which types and qualities exist, then asks quality and folder once.",
              "It opens each project by itself and saves it into its own subfolder named after the project, e.g. `My folder/Travel reel/01 - Taj Mahal at dawn.mp4`."
            ]
          }
        ]
      },
      {
        id: "quality",
        title: "Quality options: 4K, 1080p, GIF, 2K",
        blocks: [
          {
            table: {
              head: ["Type", "Qualities"],
              rows: [
                ["Videos (Veo)", "GIF (270p) · 720p (original) · 1080p (upscaled) · 4K (upscaled)"],
                ["Images (Nano Banana)", "1K (original) · 2K (upscaled) · 4K (upscaled)"]
              ]
            }
          },
          {
            p: "Your last choice is remembered. If it isn't available on your plan, the closest one is picked and the dialog says so. **Skip** appears only when a batch has both videos and images, and it's never remembered."
          }
        ]
      },
      {
        id: "credits",
        title: "Flow credits: nothing spent without asking",
        blocks: [
          {
            ul: [
              "If a quality you pick costs Flow credits (4K uses about 50 per video at Google's published price, or whatever Flow shows in its menu), the dialog shows an estimate for the whole batch. Nothing starts until you tick **I approve…**.",
              "During the run, when Flow asks to confirm a price, the extension confirms only what you approved: same kind, same or lower price, within the total.",
              "Anything else pauses the run and asks you: allow it for the rest of the run, skip this item, or stop.",
              "It never clicks Upgrade or Buy, and it stops when Flow says you're out of credits."
            ]
          }
        ]
      },
      {
        id: "files",
        title: "Where files go",
        blocks: [
          {
            ul: [
              "**Chosen folder:** files are named `01 - Title.mp4`, `02 - Title.png`… If a name is taken, the new file gets `(2)`, `(3)` — an existing file is never replaced.",
              "**Downloads folder:** files keep the names Flow gives them. With several projects, each goes into its own subfolder inside Downloads.",
              "If a file can't be written into your chosen folder, it lands in Downloads instead, and the final message tells you how many did."
            ]
          }
        ]
      },
      {
        id: "while-running",
        title: "While it runs",
        blocks: [
          {
            ul: [
              "Every tile shows its status: {y|yellow} downloading (with a timer), {g|green} downloaded, {r|red} skipped, and a small {q|QUEUED} tag for waiting.",
              "A panel covers the page with progress and a **Stop downloading** button. Clicks and typing on the page are blocked so nothing interrupts the run.",
              "The tab title shows progress, and closing or reloading the tab asks first.",
              "Switch to another tab and it pauses; come back and it continues. An interrupted item is retried, not skipped.",
              "If the project is changed by hand, it stops cleanly instead of downloading the wrong items.",
              "When it's done, a summary box shows what was downloaded and skipped. **Clear** removes the colored frames and tick boxes."
            ]
          }
        ]
      },
      {
        id: "timeouts",
        title: "Errors, timeouts and retry",
        blocks: [
          {
            p: "If Flow shows an error after the click (for example “Upscaling failed”), the item is tried once more a few seconds later; if it fails again, it's skipped right away instead of waiting. If Flow doesn't start an item's download within the **max wait** (10 minutes by default), it's skipped too. At the end you get a list of every item that didn't download — with its number, type, project and title — and a **Try again** button. A retried file keeps its original number, e.g. `02 - …`. If Flow finishes one of them later anyway, Chrome saves it in your Downloads folder as usual."
          }
        ]
      },
      {
        id: "same-title",
        title: "Items with the same title",
        blocks: [
          {
            p: "Flow often gives several outputs of one prompt the same title. The dialog tells you when that happens. Each file still gets its own number, so nothing is overwritten. If Flow reorders those tiles during a run, the final message names the title to check — look for tiles without a green frame."
          }
        ]
      },
      {
        id: "settings",
        title: "Settings and shortcut",
        blocks: [
          {
            ul: [
              "**Max wait per item:** how long to wait for Flow to start a download (minutes). 4K upscales take longer — raise it if they time out.",
              "**Pause between items:** a short gap after each download (seconds).",
              "**Shortcut:** [[Alt]]+[[Shift]]+[[D]] starts or stops a run. Change it at `chrome://extensions/shortcuts`."
            ]
          }
        ]
      },
      {
        id: "troubleshooting",
        title: "Troubleshooting",
        blocks: [
          {
            ul: [
              "**“No videos or images found”** — open a Flow project that has finished items (or Flow's home page for several projects).",
              "**Items time out** — keep the Flow tab in front, and raise **Max wait per item** for 4K.",
              "**“Download multiple files?”** — the extension allows automatic downloads for Flow, so this shouldn't appear. If it does, click **Allow**.",
              "**Chosen folder doesn't work** — pick the folder again and click **Allow / Edit files** when Chrome asks. Some system folders can't be used; pick one inside your user folder.",
              "**Still stuck?** Press [[F12]] → Console, look for lines starting with `[Flow Bulk Downloader]`, and [email us]($email) what you see."
            ]
          }
        ]
      }
    ]
  },
  faq: {
    title: "FAQ",
    items: [
      ["Is it free?", "Yes. Everything works for free, with no account and no daily limit."],
      [
        "Does it use my Flow credits?",
        "Only if you approve it. If a quality costs credits (like 4K), the dialog shows an estimate before anything starts, and the download only begins once you tick “I approve…”. If Flow asks for more than you approved, or asks something unexpected, the run pauses and asks you."
      ],
      ["Does it touch my other downloads?", "No. It only handles the file Flow starts right after it clicks Download on one of your items. Everything else you download keeps its own name and folder, even while a batch is running."],
      ["Will it overwrite files I already have?", "Never. If a file name is taken, the new file gets (2), (3) and so on."],
      ["Does it click Flow's “Upgrade” button?", "Never. Qualities your plan doesn't include simply aren't offered."],
      ["Does it work alongside other Flow extensions?", "Yes. It ignores downloads started by other extensions and only adjusts file names while one of its own runs needs subfolders."],
      ["Which browsers are supported?", "Google Chrome on desktop (Windows, Mac, Linux, ChromeOS). Other Chromium browsers may work but aren't tested."],
      ["Which languages does it speak?", "The extension follows your Chrome language: English, Spanish, Portuguese (Brazil), Vietnamese, Indonesian and Hindi, with English for any other language. It works whatever language Flow itself is shown in."],
      ["Is it made by Google?", "No. Flow Bulk Downloader is an independent tool by Web Whizz and isn't affiliated with Google."]
    ]
  },
  changelog: {
    title: "Changelog",
    entries: {
      "2.6.1": [
        "Asks before spending Flow credits: shows an estimate for 4K and other paid qualities, and pauses if Flow asks for more.",
        "New “Select all except downloaded” button: grab only what's new since your last visit.",
        "When Flow says an upscale failed, the item is tried once more and then skipped right away, instead of waiting for the timeout.",
        "Works with Flow in any language.",
        "The extension now speaks English, Spanish, Portuguese (Brazil), Vietnamese, Indonesian and Hindi.",
        "No longer changes Flow's page, so Flow's “extensions that modify the page” warning no longer appears.",
        "“Clear” after a run now removes all marks and tick boxes."
      ],
      "2.6.0": [
        "Your other downloads are never touched — only files from your Flow project are handled.",
        "Items that time out are listed by name at the end, with a one-click “Try again”.",
        "Never overwrites a file: a second copy gets (2), (3)…",
        "Tells you when several items share the same title.",
        "Safe file names on Windows.",
        "Faster tile status on big projects.",
        "Fixed: starting a run twice, and the multi-project dialog getting stuck."
      ]
    }
  },
  privacy: {
    title: "Privacy",
    text: "Flow Bulk Downloader collects nothing: no servers, no accounts, no analytics, no tracking. Your settings, and the list of items you've already downloaded, stay in Chrome on your computer, and your files go straight from Google Flow to your computer. [Read the full privacy policy]($privacy)."
  },
  waitlist: {
    title: "Flow Bulk Downloader Pro is coming",
    text: "Leave your email and we'll let you know when Pro launches.",
    label: "Email address",
    placeholder: "you@example.com",
    button: "Join the waitlist",
    sending: "Joining…",
    ok: "You're on the list. We'll email you when Pro launches.",
    error: "That didn't work. Please try again, or email us.",
    fine: "One email when Pro launches. No spam, never shared.",
    contact: "Questions, bugs or ideas?",
    email: "Email us"
  }
};
