import { describe, expect, it, vi } from "vitest";
import { WeatherData } from "../models/weather";
import axios from "axios";
import { fetchWeatherData } from "../api/weather-api";

vi.mock("axios");

describe("fetchWeather", () => {
  it("should fetch and transform weather data correctly", async () => {
    // Mock the API response
    const mockResponse = {
      current_weather: {
        temperature: 25,
        humidity: 60,
        uv_index: 5,
        wind_speed: 10,
      },
    };

    const expectedWeatherData: WeatherData = {
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
    const response = fetchWeatherData(0, 0);
    // Check if the response matches the expected data
    expect(response).resolves.toEqual(expectedWeatherData);
    // Check if axios was called with the correct URL and parameters
    expect(axios.get).toHaveBeenCalledWith(
      "https://api.open-meteo.com/v1/forecast",
      {
        params: {
          latitude: 0,
          longitude: 0,
          current_weather: "temperature_2m,humidity_2m,uv_index,wind_speed_10m",
          timezone: "auto",
        },
      },
    );
  });
});
