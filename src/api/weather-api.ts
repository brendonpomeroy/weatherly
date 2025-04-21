import axios from "axios";
import { WeatherData } from "../models/weather";
import endpoints from "./endpoints";
import { mapToWeather } from "./mappers/weather-mapper";

export const fetchWeatherData: (
  lat: number,
  lng: number,
) => Promise<WeatherData> = async (lat, lng) => {
  const response = await axios.get(endpoints.weatherBaseUrl, {
    params: {
      latitude: lat,
      longitude: lng,
      current_weather: "temperature_2m,humidity_2m,uv_index,wind_speed_10m",
      timezone: "auto",
    },
  });

  if (response.status !== 200) {
    throw new Error(`Error fetching weather data: ${response.statusText}`);
  }

  return mapToWeather(response.data);
};
