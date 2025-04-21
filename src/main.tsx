import { createRoot } from "react-dom/client";
import "./index.css";
import { Router } from "./routes";
import { CitiesProvider } from "./components/services/cities/cities-provider";
import "leaflet/dist/leaflet.css";
import { WeatherProvider } from "./components/services/weather/weather-provider";

createRoot(document.getElementById("root")!).render(
  <CitiesProvider>
    <WeatherProvider>
      <Router />
    </WeatherProvider>
  </CitiesProvider>,
);
