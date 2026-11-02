import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App.jsx";
import { resolve } from "./routes.jsx";
import "./styles.css";

const route = resolve(location.pathname);
const root = document.getElementById("root");
const app = (
  <StrictMode>
    <App route={route} />
  </StrictMode>
);

// Built pages already contain the HTML (pre-rendered); in `npm run dev` the root is empty.
if (root.firstElementChild) {
  hydrateRoot(root, app);
} else {
  document.title = route.title;
  createRoot(root).render(app);
}
