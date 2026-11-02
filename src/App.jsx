import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";

export default function App({ route }) {
  const { Page } = route;
  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <Header path={route.path} />
      <main id="main">
        <Page />
      </main>
      <Footer />
    </>
  );
}
