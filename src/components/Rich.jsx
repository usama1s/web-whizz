// Turns the inline marks used in src/i18n text into elements:
// **bold**, `code`, [[key]], [link](href), {y|pill} (y yellow, g green, r red, q grey).
// An href starting with $ is looked up in `links` (e.g. $store → the Chrome Web Store URL).
const MARKS = /\*\*(.+?)\*\*|`(.+?)`|\[\[(.+?)\]\]|\[([^\]]+)\]\(([^)]+)\)|\{([ygrq])\|(.+?)\}/g;
const PILL = { y: "pill pill-y", g: "pill pill-g", r: "pill pill-r", q: "pill" };

export default function Rich({ text, links = {} }) {
  const out = [];
  let last = 0;
  for (const m of text.matchAll(MARKS)) {
    if (m.index > last) out.push(text.slice(last, m.index));
    const key = m.index;
    if (m[1]) out.push(<b key={key}>{m[1]}</b>);
    else if (m[2]) out.push(<code key={key}>{m[2]}</code>);
    else if (m[3]) out.push(<kbd key={key}>{m[3]}</kbd>);
    else if (m[4]) {
      const href = m[5].startsWith("$") ? links[m[5].slice(1)] : m[5];
      const external = /^https?:/.test(href);
      out.push(
        <a key={key} href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
          {m[4]}
        </a>
      );
    } else out.push(<span key={key} className={PILL[m[6]]}>{m[7]}</span>);
    last = m.index + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}
