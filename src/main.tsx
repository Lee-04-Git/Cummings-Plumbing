import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import "@fontsource-variable/manrope";
import "@fontsource-variable/caveat";
import "@fontsource-variable/fraunces/soft.css";
import "./index.css";
import { AppRoutes } from "./App";

const container = document.getElementById("root")!;
const app = (
  <StrictMode>
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  </StrictMode>
);

// Pages are prerendered to static HTML at build time. Hydrate only when the markup was rendered
// for this URL; if a host served another page's HTML (SPA fallback), render fresh instead.
const path = window.location.pathname.replace(/\/+$/, "") || "/";
if (container.hasChildNodes() && container.dataset.route === path) {
  hydrateRoot(container, app);
} else {
  container.textContent = "";
  createRoot(container).render(app);
}
