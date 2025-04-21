import { PropsWithChildren, useState } from "react";
import { fetchWeatherData } from "../../../api/weather-api";
import { WeatherData } from "../../../models/weather";
import { WeatherContext } from "./weather-context";
import { WeatherParams } from "../../../models/weather-params";

export function WeatherProvider({ children }: PropsWithChildren) {
  const [params, setParams] = useState<WeatherParams>({
    temperature: true,
    humidity: true,
    windSpeed: true,
    uvIndex: true,
    temperatureUnits: "f",
    windSpeedUnits: "m/s",
  });

  const setWeatherParams: (params: WeatherParams) => void = (params) => {
    setParams(params);
  };

  const getWeather: (lng: number, lat: number) => Promise<WeatherData> = async (
    lat,
    lng,
  ) => {
    const weather = await fetchWeatherData(lat, lng);
    return weather;
  };

  return (
    <WeatherContext.Provider
      value={{
        params,
        setWeatherParams,
        getWeather,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
}
