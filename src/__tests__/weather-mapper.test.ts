import { describe, expect, it } from "vitest";
import { mapToWeather } from "../api/mappers/weather-mapper";

describe("Convert API response to WeatherData", () => {
  it("should convert the API response to WeatherData", () => {
    const apiResponse = {
      current_weather: {
        temperature: 25,
        humidity: 60,
        uv_index: 5,
        wind_speed: 10,
      },
    };

    const expectedWeatherData = {
      temperature: 25,
      humidity: 60,
      uvIndex: 5,
      windSpeed: 10,
    };

    const result = mapToWeather(apiResponse);

    expect(result).toEqual(expectedWeatherData);
  });
});
