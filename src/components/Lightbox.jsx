import { useEffect, useRef, useState } from "react";
import Icon from "./Icon.jsx";

// Full-screen screenshot viewer. Any link with data-lightbox (see Shot in components/Flow.jsx) opens here instead of
// following the link; without JavaScript, or with Ctrl/Cmd-click, the link still opens the image as before.
// ← → move between the page's screenshots; Esc, the ✕ or a click outside the picture closes it.
// Uses a native <dialog>, so focus and Esc are handled by the browser. Mounted once in App.jsx.
export default function Lightbox() {
  const dialog = useRef(null);
  const [items, setItems] = useState([]);
  const [index, setIndex] = useState(-1);

  useEffect(() => {
    const onClick = (e) => {
      const a = e.target.closest?.("a[data-lightbox]");
      if (!a || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      e.preventDefault();
      const links = [...document.querySelectorAll("a[data-lightbox]")];
      setItems(links.map((l) => ({ src: l.getAttribute("href"), alt: l.querySelector("img")?.alt || "", caption: l.dataset.caption || "" })));
      setIndex(links.indexOf(a));
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  useEffect(() => {
    const d = dialog.current;
    if (index >= 0 && d && !d.open) d.showModal();
  }, [index]);

  const close = () => dialog.current?.close();
  const move = (step) => setIndex((i) => (i + step + items.length) % items.length);
  const item = items[index];
  const many = items.length > 1;

  return (
    <dialog
      ref={dialog}
      className="lightbox"
      aria-label={item?.alt || "Screenshot"}
      onClose={() => setIndex(-1)}
      // A click on the dark area around the picture (the dialog itself) closes it.
      onClick={(e) => (e.target === e.currentTarget || e.target.classList.contains("lightbox-stage")) && close()}
      onKeyDown={(e) => {
        if (!many) return;
        if (e.key === "ArrowRight") move(1);
        if (e.key === "ArrowLeft") move(-1);
      }}
    >
      {item && (
        <>
          <div className="lightbox-stage">
            <picture>
              <source srcSet={item.src.replace(/\.png$/, ".webp")} type="image/webp" />
              <img src={item.src} alt={item.alt} />
            </picture>
          </div>
          <p className="lightbox-caption">
            {item.caption}
            {many && <span>{index + 1} / {items.length}</span>}
          </p>
          <button type="button" className="lightbox-btn lightbox-close" aria-label="Close" onClick={close} autoFocus>
            <Icon name="x" size={22} />
          </button>
          {many && (
            <>
              <button type="button" className="lightbox-btn lightbox-prev" aria-label="Previous screenshot" onClick={() => move(-1)}>
                <Icon name="arrow" size={22} />
              </button>
              <button type="button" className="lightbox-btn lightbox-next" aria-label="Next screenshot" onClick={() => move(1)}>
                <Icon name="arrow" size={22} />
              </button>
            </>
          )}
        </>
      )}
    </dialog>
  );
}
