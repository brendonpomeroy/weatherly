import { WeatherData } from "../../models/weather";

interface WeatherDataModel {
  current_weather: {
    temperature: number;
    humidity: number;
    uv_index: number;
    wind_speed: number;
  };
}

export const mapToWeather: (data: unknown) => WeatherData = (data) => {
  const parsed = data as WeatherDataModel;

  const weatherData: WeatherData = {
    temperature: parsed.current_weather.temperature,
    humidity: parsed.current_weather.humidity,
    uvIndex: parsed.current_weather.uv_index,
    windSpeed: parsed.current_weather.wind_speed,
  };

  return weatherData;
};
