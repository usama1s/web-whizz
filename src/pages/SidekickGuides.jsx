import Icon from "../components/Icon.jsx";
import { Shot } from "../components/Flow.jsx";
import { SIDEKICK } from "../site.js";

// English how-to articles for Boomi developers' problem searches: Message shape quoting ("boomi message shape single
// quote", "…curly braces json") and Groovy dynamic properties ("boomi groovy set dynamic process property", "get
// DDP in script"). Each answers the question in plain Boomi first, then shows how Sidekick helps.
// Every example was checked against the extension's own toMessageShape / fromMessageShape / lintMessageShape and its
// built-in snippets (~/Desktop/P Projects/sidekick-boomi/src/shared/codetools.ts, groovy.ts, lint.ts).

const store = (where) => `${SIDEKICK.chromeStoreUrl}?utm_source=web-whizz.com&utm_medium=website&utm_campaign=${where}`;

function StoreCta({ where }) {
  return (
    <p className="actions">
      {SIDEKICK.chromeStoreUrl ? (
        <a className="btn btn-primary" href={store(where)} target="_blank" rel="noopener noreferrer" data-umami-event="add-to-chrome" data-umami-event-product="sidekick" data-umami-event-where={where}>
          <Icon name="download" size={18} /> Add Sidekick for Boomi to Chrome — free
        </a>
      ) : (
        <span className="btn btn-soon" role="status">
          Sidekick for Boomi: coming soon to the Chrome Web Store
        </span>
      )}
      <a className="btn btn-ghost" href={SIDEKICK.path}>
        See all features
      </a>
    </p>
  );
}

const Code = ({ children }) => (
  <pre>
    <code>{children}</code>
  </pre>
);

function Shell({ guide, route, children }) {
  const date = new Intl.DateTimeFormat("en", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" }).format(new Date(route.updated));
  return (
    <section className="section">
      <article className="wrap narrow prose">
        <nav className="eyebrow" aria-label="Breadcrumb">
          <a href="/">Web Whizz</a> › <a href="/e/">Chrome extensions</a> › <a href={SIDEKICK.path}>{SIDEKICK.name}</a>
        </nav>
        <h1>{guide.h1}</h1>
        <p className="meta">
          Updated <time dateTime={route.updated}>{date}</time> · By Web Whizz
        </p>
        {children}
        <h2 id="faq">FAQ</h2>
        <div className="faq">
          {guide.faq.map(([q, a]) => (
            <details key={q}>
              <summary>{q}</summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
        <StoreCta where={`${guide.key}-end`} />
        <p>
          Sidekick is free, unofficial and sends nothing anywhere: no accounts, no analytics, no network requests. Read the <a href={SIDEKICK.privacyPath}>privacy policy</a>.
        </p>
        <h2 id="more">More Boomi guides</h2>
        <ul>
          {GUIDE_LIST.filter((g) => g.path !== guide.path).map((g) => (
            <li key={g.path}>
              <a href={g.path}>{g.h1}</a>
            </li>
          ))}
        </ul>
        <p className="fine">Boomi is a trademark of Boomi, LP. Web Whizz is independent and not affiliated with Boomi.</p>
      </article>
    </section>
  );
}

// ——— 1. Message shape quoting ———

export const MESSAGE = {
  key: "guide-boomi-message",
  path: SIDEKICK.path + "boomi-message-shape-quotes-json/",
  crumb: "Boomi Message shape quotes & JSON",
  h1: "Boomi Message shape: single quotes, curly braces and JSON explained",
  title: "Boomi Message Shape: Escape Single Quotes, Braces & JSON",
  description:
    "Why apostrophes vanish and {1} prints as text in a Boomi Message shape, how to escape ' and { } in JSON, and how variables {1}, {2} map to the Variables list.",
  published: "2026-11-26",
  updated: "2026-11-26",
  faq: [
    ["Why does my apostrophe disappear in a Boomi Message shape?", "A single quote is Boomi's escape character in the Message shape: it starts a quoted section of literal text. Write two single quotes ('') for one apostrophe, so It''s gives It's."],
    ["Why does {1} print as text instead of the value?", "It's inside a quoted section, usually because an earlier lone apostrophe opened one. Everything after an unmatched ' is literal, variables included. Double the apostrophe ('') and the variable works again."],
    ["How do I put JSON in a Boomi Message shape?", "Quote every literal curly brace as '{' and '}', or wrap the whole JSON in single quotes and close the quote around each variable: '{\"id\": \"'{1}'\"}'. Double any apostrophe in the text."],
    ["Do Boomi Message variables start at {0} or {1}?", "At {1}. {1} is the first row of the shape's Variables list, {2} the second, and so on. {0} is never filled."],
    ["How do I escape curly braces in a Boomi Message shape?", "Put them in single quotes: '{' and '}'. An unquoted brace that isn't a variable like {1} makes the shape fail."],
    ["Can I use names instead of {1}, {2}?", "Not in Boomi itself. Sidekick's Message editor lets you write {orderId}, then converts it to {1} with the quoting done for you and walks you through the Variables list."]
  ]
};

const RULES = [
  ["'", "Starts or ends a quoted section of literal text", "It's {1} → Its {1} (a lone ' eats the rest)"],
  ["''", "One apostrophe (inside or outside a quoted section)", "It''s processed → It's processed"],
  ["{1}, {2}…", "The 1st, 2nd… row of the Variables list", "Order: {1} → 1234"],
  ["'{' and '}'", "Literal curly braces", "'{'\"a\": 1'}' → {\"a\": 1}"]
];

function Message({ route }) {
  const g = MESSAGE;
  return (
    <Shell guide={g} route={route}>
      <p className="lead">
        You write <code>It's processed: {"{1}"}</code> in a Message shape and Boomi outputs <code>Its processed: {"{1}"}</code> — the apostrophe is gone and the variable never got filled. Or your JSON payload makes the shape fail.
        Both come from the same two rules.
      </p>

      <h2 id="quick-answer">Quick answer</h2>
      <p>
        In a Boomi Message shape, a <b>single quote</b> starts a section of literal text and <b>curly braces</b> mark variables. So write <code>''</code> for every apostrophe, put literal braces in quotes as <code>'{"{"}'</code>{" "}
        and <code>'{"}"}'</code>, and number variables from <code>{"{1}"}</code> in the order of the shape's Variables list.
      </p>

      <h2 id="rules">The rules</h2>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>You write</th>
              <th>Boomi reads it as</th>
              <th>Example</th>
            </tr>
          </thead>
          <tbody>
            {RULES.map(([w, r, e]) => (
              <tr key={w}>
                <td>
                  <code>{w}</code>
                </td>
                <td>{r}</td>
                <td>
                  <code>{e}</code>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 id="apostrophe">Why apostrophes disappear (and {"{1}"} stops working)</h2>
      <p>
        A lone <code>'</code> opens a quoted section that runs until the next single quote. The quote itself isn't printed, and everything inside the section is printed as is — including <code>{"{1}"}</code>, which is no longer
        a variable. Double it:
      </p>
      <Code>{`It''s processed: {1}`}</Code>
      <p>
        This also bites in text like <code>Don't</code>, <code>customer's</code> or SQL such as <code>WHERE status = 'OPEN'</code>, which must be written <code>WHERE status = ''OPEN''</code>.
      </p>

      <h2 id="json">How to write JSON in a Message shape</h2>
      <p>
        Say the output should be <code>{'{"orderId": "1234", "note": "It\'s processed"}'}</code>, with the order ID from <code>{"{1}"}</code>. Two ways that both work:
      </p>
      <p>
        <b>Quote each brace</b> (what Sidekick generates):
      </p>
      <Code>{`'{'"orderId": "{1}", "note": "It''s processed"'}'`}</Code>
      <p>
        <b>Quote the whole body</b>, closing the quote around each variable:
      </p>
      <Code>{`'{"orderId": "'{1}'", "note": "It''s processed"}'`}</Code>
      <p>
        The second is easier to read for big payloads, but one missed <code>'</code> around a variable and it prints <code>{"{1}"}</code> literally. For JSON with many values, a Map shape or a JSON profile is often safer than a
        Message shape.
      </p>

      <h2 id="variables">How {"{1}"}, {"{2}"} map to the Variables list</h2>
      <p>
        Under the text, the Message shape has a <b>Variables</b> list. Row 1 fills <code>{"{1}"}</code>, row 2 fills <code>{"{2}"}</code>, and so on; there is no <code>{"{0}"}</code>. Each row has a type: a profile element,
        a dynamic process or document property, a static value, the current document or a date. For a date, the format is Java's, so literal letters are quoted there too: <code>yyyy-MM-dd'T'HH:mm:ss</code>.
      </p>
      <p>Reordering or deleting a row renumbers everything after it, which is a common source of wrong values. Check the numbers after every change.</p>

      <h2 id="sidekick">Write {"{orderId}"} instead of {"{1}"} with Sidekick</h2>
      <p>
        <a href={SIDEKICK.path}>Sidekick for Boomi</a> adds a full editor to the Message shape. Write plain text with named variables like <code>{"{orderId}"}</code>, apostrophes and braces as they are. Sidekick turns it into
        Boomi's numbered, quoted text, marks unquoted braces and unclosed quotes as errors, and its Variables panel walks you through Boomi's Parameters table one row at a time.
      </p>
      <Shot file="shot-message-editor.png" img={SIDEKICK.img} alt="Sidekick's Message shape editor in Boomi: JSON with a named {orderId} variable mapped to a profile element" caption="Named variables, no manual quoting." />
      <StoreCta where={`${g.key}-mid`} />
    </Shell>
  );
}

// ——— 2. Groovy dynamic properties ———

export const GROOVY = {
  key: "guide-boomi-groovy",
  path: SIDEKICK.path + "boomi-groovy-dynamic-properties/",
  crumb: "Boomi Groovy: DPPs & DDPs",
  h1: "Boomi Groovy script: get and set dynamic process and document properties",
  title: "Boomi Groovy: Get & Set Dynamic Process/Document Properties",
  description:
    "Groovy examples for Boomi's Data Process shape: read and set a dynamic process property (DPP) and a dynamic document property (DDP), plus the mistakes that silently break scripts.",
  published: "2026-11-26",
  updated: "2026-11-26",
  faq: [
    ["How do I get a dynamic process property in a Boomi Groovy script?", "Import com.boomi.execution.ExecutionUtil and call ExecutionUtil.getDynamicProcessProperty(\"DPP_NAME\"). It returns a String, or null if the property isn't set."],
    ["How do I set a dynamic process property in Groovy?", "ExecutionUtil.setDynamicProcessProperty(\"DPP_NAME\", value, false). The third argument, persist, keeps the value for the next execution when it's true."],
    ["How do I read a dynamic document property in a script?", "Inside the document loop, use props.getProperty(\"document.dynamic.userdefined.DDP_NAME\"), where props = dataContext.getProperties(i). Use props.setProperty with the same key to set it."],
    ["Why is my DDP null in the script?", "Usually the key is missing the document.dynamic.userdefined. prefix, or the name's spelling or case doesn't match the Set Properties step."],
    ["Why do my documents disappear after a Data Process shape?", "Every document you want to keep must be handed back with dataContext.storeStream(is, props). A document that isn't stored doesn't leave the shape."],
    ["How do I log from a Boomi Groovy script?", "Use logger = ExecutionUtil.getBaseLogger() and logger.info(...). Output from println or System.out doesn't reach the process log."]
  ]
};

const MISTAKES = [
  ["Missing document.dynamic.userdefined. prefix on a DDP", "getProperty returns null"],
  ["Calling setDynamicProcessProperty with two arguments", "The persist flag is missing"],
  ["Not calling dataContext.storeStream for a document", "The document doesn't leave the shape"],
  ["println / System.out for logging", "Nothing shows in the process log"],
  ["Not closing streams you open", "Leaks on large or many documents"],
  ["Passwords or API keys typed into the script", "Visible to anyone with access to the process"]
];

function Groovy({ route }) {
  const g = GROOVY;
  return (
    <Shell guide={g} route={route}>
      <p className="lead">
        Dynamic process properties (DPPs) and dynamic document properties (DDPs) are how a Boomi process passes values around, and a Data Process shape with a custom script is where you often need to read or change them. Here are
        working Groovy examples and the mistakes that make them fail without an error.
      </p>

      <h2 id="quick-answer">Quick answer</h2>
      <ul>
        <li>
          <b>DPP:</b> <code>ExecutionUtil.getDynamicProcessProperty("DPP_NAME")</code> and <code>ExecutionUtil.setDynamicProcessProperty("DPP_NAME", value, false)</code>.
        </li>
        <li>
          <b>DDP:</b> <code>props.getProperty("document.dynamic.userdefined.DDP_NAME")</code> and <code>props.setProperty(…, value)</code> inside the document loop, then <code>dataContext.storeStream(is, props)</code>.
        </li>
      </ul>

      <h2 id="skeleton">The Data Process script skeleton</h2>
      <p>
        In a Data Process shape, add a <b>Custom Scripting</b> step and choose Groovy. Boomi hands the script its documents in <code>dataContext</code>; every document you keep must be stored back:
      </p>
      <Code>{`import java.util.Properties
import java.io.InputStream
import com.boomi.execution.ExecutionUtil

logger = ExecutionUtil.getBaseLogger()

for (int i = 0; i < dataContext.getDataCount(); i++) {
    InputStream is = dataContext.getStream(i)
    Properties props = dataContext.getProperties(i)

    // work with the document here

    dataContext.storeStream(is, props)
}`}</Code>

      <h2 id="dpp">Get and set a dynamic process property (DPP)</h2>
      <p>A DPP belongs to the whole process run, so it's read and set outside the document loop:</p>
      <Code>{`import com.boomi.execution.ExecutionUtil

String current = ExecutionUtil.getDynamicProcessProperty("DPP_COUNTER") ?: "0"
int next = current.toInteger() + 1
// persist = true keeps the value for the next execution
ExecutionUtil.setDynamicProcessProperty("DPP_COUNTER", next.toString(), false)`}</Code>
      <p>
        Values are always Strings, and a property that was never set comes back as <code>null</code> — hence the <code>?: "0"</code>.
      </p>

      <h2 id="ddp">Get and set a dynamic document property (DDP)</h2>
      <p>
        A DDP belongs to one document, so it lives in that document's <code>props</code>, under the prefix <code>document.dynamic.userdefined.</code>:
      </p>
      <Code>{`import java.util.Properties
import java.io.InputStream

for (int i = 0; i < dataContext.getDataCount(); i++) {
    InputStream is = dataContext.getStream(i)
    Properties props = dataContext.getProperties(i)

    String value = props.getProperty("document.dynamic.userdefined.DDP_INPUT")
    props.setProperty("document.dynamic.userdefined.DDP_OUTPUT", value ?: "")

    dataContext.storeStream(is, props)
}`}</Code>

      <h2 id="mistakes">Mistakes that break Boomi scripts silently</h2>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Mistake</th>
              <th>What happens</th>
            </tr>
          </thead>
          <tbody>
            {MISTAKES.map(([m, r]) => (
              <tr key={m}>
                <td>{m}</td>
                <td>{r}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 id="sidekick">Catch these in the editor with Sidekick</h2>
      <p>
        Boomi's script box is a plain text field. <a href={SIDEKICK.path}>Sidekick for Boomi</a> turns it into a code editor with highlighting, autocomplete for <code>dataContext</code>, <code>ExecutionUtil</code> and{" "}
        <code>props</code>, a Functions menu, snippets for the examples above, Format and Find. Its lint warns about every mistake in the table, and if you list your DPP and DDP names once in its property dictionary, it flags
        typos in property names too.
      </p>
      <Shot file="shot-script-editor.png" img={SIDEKICK.img} alt="Sidekick's Groovy editor in a Boomi Data Process step, with the Functions menu listing dataContext methods" caption="Autocomplete and a Functions menu for the Boomi API." />
      <StoreCta where={`${g.key}-mid`} />
    </Shell>
  );
}

export const GUIDE_LIST = [MESSAGE, GROOVY];
export const GUIDE_PAGES = { [MESSAGE.path]: Message, [GROOVY.path]: Groovy };
