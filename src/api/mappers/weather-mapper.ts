import { WeatherData } from "../../models/weather";

interface WeatherDataModel {
  timezone: string;
  current_units: {
    temperature_2m: string;
    wind_speed_10m: string;
  };
  current: {
    time: string;
    temperature_2m: number;
    relative_humidity_2m: number;
    uv_index: number;
    wind_speed_10m: number;
  };
}

export const mapToWeather: (data: unknown) => WeatherData = (data) => {
  const parsed = data as WeatherDataModel;

  const weatherData: WeatherData = {
    speedUnits: parsed.current_units.wind_speed_10m,
    temperatureUnits: parsed.current_units.temperature_2m,
    time: parsed.current.time,
    timezone: parsed.timezone,
    temperature: parsed.current.temperature_2m,
    humidity: parsed.current.relative_humidity_2m,
    uvIndex: parsed.current.uv_index,
    windSpeed: parsed.current.wind_speed_10m,
  };

  return weatherData;
};
