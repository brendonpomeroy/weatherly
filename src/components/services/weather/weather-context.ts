import { createContext } from "react";
import { WeatherData } from "../../../models/weather";
import { WeatherParams } from "../../../models/weather-params";

export interface WeatherContextType {
  params: WeatherParams;
  setWeatherParams: (params: WeatherParams) => void;
  getWeather: (lng: number, lat: number) => Promise<WeatherData>;
}

export const WeatherContext = createContext<WeatherContextType | null>(null);
