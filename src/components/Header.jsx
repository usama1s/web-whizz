import { Brand } from "./Brand.jsx";
import { FLOW } from "../site.js";

export default function Header({ path }) {
  const here = (p) => (path === p ? "page" : undefined);
  return (
    <header className="header">
      <div className="wrap header-inner">
        <Brand />
        <nav className="nav" aria-label="Main">
          <a href="/#products" className="nav-hide-sm">
            Products
          </a>
          <a href={FLOW.path} aria-current={here(FLOW.path)}>
            Flow Downloader
          </a>
          <a href="/#contact">Contact</a>
        </nav>
      </div>
    </header>
  );
}
