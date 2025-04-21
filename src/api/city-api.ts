import axios from "axios";
import { City } from "../models/city";
import endpoints from "./endpoints";
import { mapToCities } from "./mappers/city-mapper";

export const fetchCities = async (): Promise<City[]> => {
  const response = await axios.get(endpoints.cities);

  if (response.status !== 200) {
    throw new Error(`Error fetching cities: ${response.statusText}`);
  }

  const cities = mapToCities(response.data);

  return cities;
};
