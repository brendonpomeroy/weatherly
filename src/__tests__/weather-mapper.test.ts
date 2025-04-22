import { describe, expect, it } from "vitest";
import { mapToWeather } from "../api/mappers/weather-mapper";

describe("Convert API response to WeatherData", () => {
  it("should convert the API response to WeatherData", () => {
    const apiResponse = {
      timezone: "Australia/Adelaide",
      current_units: {
        temperature_2m: "C",
        wind_speed_10m: "km/h",
      },
      current: {
        time: "2025-04-19T12:00",
        temperature_2m: 25,
        relative_humidity_2m: 60,
        uv_index: 5,
        wind_speed_10m: 10,
      },
    };

    const expectedWeatherData = {
      speedUnits: "km/h",
      temperatureUnits: "C",
      time: "2025-04-19T12:00",
      timezone: "Australia/Adelaide",
      temperature: 25,
      humidity: 60,
      uvIndex: 5,
      windSpeed: 10,
    };

    const result = mapToWeather(apiResponse);

    expect(result).toEqual(expectedWeatherData);
  });
});
