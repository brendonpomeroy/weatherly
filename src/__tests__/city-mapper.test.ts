import { describe, it, expect } from "vitest";
import { mapToCities } from "../api/mappers/city-mapper";

describe("jsonToCities", () => {
  it("should convert raw city data to City[]", () => {
    const input = {
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
    const expected = [
      {
        name: "East Albury",
        lat: -36.09041,
        lng: 146.93912,
        state: "NSW",
        stateName: "New South Wales",
        population: 6098,
      },
    ];
    expect(mapToCities(input)).toEqual(expected);
  });
});
