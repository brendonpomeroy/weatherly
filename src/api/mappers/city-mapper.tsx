import { City } from "../../models/city";

interface CityDataModel {
  ssc_code: 11344;
  suburb: string;
  urban_area: string;
  postcode: number;
  state: string;
  state_name: string;
  type: string;
  local_goverment_area: string;
  statistic_area: string;
  elevation: number;
  population: number;
  median_income: number;
  sqkm: number;
  lat: number;
  lng: number;
  timezone: string;
}

/**
 * Turns the api response into a list of cities.
 * @param data
 * @returns City[]
 */
export const mapToCities = (data: unknown): City[] => {
  const parsed = data as { data: CityDataModel[] };
  const cities = parsed.data.map(convertToCity);
  return cities;
};

/**
 * Maps the JSON response from the API to a City object.
 * @param data
 * @returns City
 */
export const convertToCity = (data: CityDataModel): City => {
  return {
    name: data.suburb,
    lat: data.lat,
    lng: data.lng,
    state: data.state,
    postcode: data.postcode,
    stateName: data.state_name,
    population: data.population,
  };
};
