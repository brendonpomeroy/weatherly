import { describe, it, expect, vi } from "vitest";
import axios from "axios";
import { City } from "../models/city";
import { fetchCities } from "../api/city-api";

vi.mock("axios");

describe("fetchCities", () => {
  it("should fetch and transform cities correctly", async () => {
    const mockData = {
      data: [
        {
          ssc_code: 11344,
          suburb: "East Albury",
          urban_area: "Albury - East",
          postcode: 2640,
          state: "NSW",
          state_name: "New South Wales",
          type: "Urban locality",
          local_goverment_area: "Albury (City)",
          statistic_area: "Rest of NSW",
          elevation: 246,
          population: 6098,
          median_income: 38064,
          sqkm: 12.329,
          lat: -36.09041,
          lng: 146.93912,
          timezone: "Australia/Sydney",
        },
      ],
    };

    const expectedCity: City = {
      name: "East Albury",
      lat: -36.09041,
      lng: 146.93912,
      state: "NSW",
      stateName: "New South Wales",
      population: 6098,
    };

    (axios.get as unknown as ReturnType<typeof vi.fn>).mockResolvedValue({
      status: 200,
      data: mockData,
    });

    const result = await fetchCities();
    expect(result).toEqual([expectedCity]);
  });
});
