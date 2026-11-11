import { FLOW } from "../../site.js";
import en from "./en.js";
import tr from "./tr.js";
import vi from "./vi.js";
import pt from "./pt.js";
import es from "./es.js";
import id from "./id.js";

// The languages of the Flow Bulk Downloader page. English lives at FLOW.path, the others at /<code>/e/flow-downloader/.
// To add a language: copy en.js to <code>.js, translate it, and add a line here.
export const LOCALES = [
  { code: "en", ogLocale: "en_US", hreflang: "en", label: "English", t: en },
  { code: "tr", ogLocale: "tr_TR", hreflang: "tr", label: "Türkçe", t: tr },
  { code: "vi", ogLocale: "vi_VN", hreflang: "vi", label: "Tiếng Việt", t: vi },
  { code: "pt", ogLocale: "pt_BR", hreflang: "pt-BR", label: "Português", t: pt },
  { code: "es", ogLocale: "es_ES", hreflang: "es", label: "Español", t: es },
  { code: "id", ogLocale: "id_ID", hreflang: "id", label: "Bahasa Indonesia", t: id }
].map((l) => ({ ...l, path: l.code === "en" ? FLOW.path : `/${l.code}${FLOW.path}` }));

export const locale = (hreflang) => LOCALES.find((l) => l.hreflang === hreflang) || LOCALES[0];

// "{n} users" → "5 users"
export const fill = (text, vars) => text.replace(/\{(\w+)\}/g, (m, k) => (k in vars ? vars[k] : m));
