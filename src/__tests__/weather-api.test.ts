import { describe, expect, it, vi } from "vitest";
import { WeatherData } from "../models/weather";
import axios from "axios";
import { fetchWeatherData } from "../api/weather-api";

vi.mock("axios");

describe("fetchWeather", () => {
  it("should fetch and transform weather data correctly", async () => {
    // Mock the API response
    const mockResponse = {
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

    const expectedWeatherData: WeatherData = {
      speedUnits: "km/h",
      temperatureUnits: "C",
      time: "2025-04-19T12:00",
      timezone: "Australia/Adelaide",
      temperature: 25,
      humidity: 60,
      uvIndex: 5,
      windSpeed: 10,
    };

    // Mock the axios get method
    (axios.get as unknown as ReturnType<typeof vi.fn>).mockResolvedValue({
      status: 200,
      data: mockResponse,
    });

    // Call the function to fetch weather data
    const response = fetchWeatherData(0, 0, {
      temperature: true,
      humidity: true,
      windSpeed: true,
      uvIndex: true,
      metric: true,
    });
    // Check if the response matches the expected data
    expect(response).resolves.toEqual(expectedWeatherData);
  });
});
