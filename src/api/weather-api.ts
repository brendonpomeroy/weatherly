import axios from "axios";
import { WeatherData } from "../models/weather";
import endpoints from "./endpoints";
import { mapToWeather } from "./mappers/weather-mapper";
import { WeatherParams } from "../models/weather-params";

export const fetchWeatherData: (
  lat: number,
  lng: number,
  params: WeatherParams,
) => Promise<WeatherData> = async (lat, lng, params) => {
  // build the string base on params
  const paramsString = [
    params.temperature ? "temperature_2m" : "",
    params.humidity ? "relative_humidity_2m" : "",
    params.windSpeed ? "wind_speed_10m" : "",
    params.uvIndex ? "uv_index" : "",
  ]
    .filter(Boolean)
    .join(",");

  const response = await axios.get(endpoints.weatherBaseUrl, {
    params: {
      latitude: lat,
      longitude: lng,
      current: paramsString,
      timezone: "auto",
      ...(!params.metric && { temperature_unit: "fahrenheit" }),
      ...(!params.metric && { wind_speed_unit: "mph" }),
    },
  });

  if (response.status !== 200) {
    throw new Error(`Error fetching weather data: ${response.statusText}`);
  }

  return mapToWeather(response.data);
};
