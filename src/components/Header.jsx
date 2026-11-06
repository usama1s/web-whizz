import { Brand } from "./Brand.jsx";

export default function Header({ path, ui, flowPath }) {
  const here = (p) => (path === p ? "page" : undefined);
  return (
    <header className="header">
      <div className="wrap header-inner">
        <Brand />
        <nav className="nav" aria-label="Main">
          <a href="/#products" className="nav-hide-sm">
            {ui.navProducts}
          </a>
          <a href={flowPath} aria-current={here(flowPath)}>
            {ui.navFlow}
          </a>
          <a href="/#contact">{ui.navContact}</a>
        </nav>
      </div>
    </header>
  );
}
