import { WeatherData } from "../../models/weather";

interface WeatherDataModel {
  current: {
    temperature_2m: number;
    relative_humidity_2m: number;
    uv_index: number;
    wind_speed_10m: number;
  };
}

export const mapToWeather: (data: unknown) => WeatherData = (data) => {
  const parsed = data as WeatherDataModel;

  const weatherData: WeatherData = {
    temperature: parsed.current.temperature_2m,
    humidity: parsed.current.relative_humidity_2m,
    uvIndex: 22, //parsed.current_weather.uv_index,
    windSpeed: parsed.current.wind_speed_10m,
  };

  return weatherData;
};
