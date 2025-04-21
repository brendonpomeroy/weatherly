import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Router } from "./routes";
import { CitiesProvider } from "./components/services/cities/cities-provider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CitiesProvider>
      <Router />
    </CitiesProvider>
  </StrictMode>,
);
