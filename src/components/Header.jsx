import { useEffect, useRef, useState } from "react";
import { Brand } from "./Brand.jsx";
import Icon from "./Icon.jsx";

// On phones (≤640px, see styles.css) the nav folds into a menu behind the button at the top right.
// On wider screens the button is hidden and the nav is always shown.
export default function Header({ path, ui, flowPath }) {
  const here = (p) => (path === p ? "page" : undefined);
  const [open, setOpen] = useState(false);
  const header = useRef(null);

  // An open menu closes on Escape or a tap anywhere outside the header.
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    const onClick = (e) => !header.current?.contains(e.target) && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClick);
    };
  }, [open]);

  return (
    <header className={open ? "header menu-open" : "header"} ref={header}>
      <div className="wrap header-inner">
        <Brand />
        <button type="button" className="menu-btn" aria-label={ui.menu} aria-expanded={open} aria-controls="main-nav" onClick={() => setOpen((o) => !o)}>
          <Icon name={open ? "x" : "menu"} size={24} />
        </button>
        {/* Following a link (including #contact on the same page) closes the menu. */}
        <nav id="main-nav" className="nav" aria-label="Main" onClick={(e) => e.target.closest("a") && setOpen(false)}>
          <a href="/#products">
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
