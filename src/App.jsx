import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import { locale } from "./i18n/flow/index.js";

export default function App({ route }) {
  const { Page } = route;
  // Pages without a language (home, privacy, 404) use the English header and footer.
  const l = locale(route.lang);
  return (
    <>
      <a className="skip" href="#main">
        {l.t.ui.skip}
      </a>
      <Header path={route.path} ui={l.t.ui} flowPath={l.path} />
      <main id="main">
        <Page route={route} />
      </main>
      <Footer ui={l.t.ui} flowPath={l.path} />
    </>
  );
}
