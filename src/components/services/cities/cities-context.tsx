import { createContext } from "react";
import { City } from "../../../models/city";

export interface CitiesContextType {
  /**
   * List of cities stores in state
   */
  cities: City[];

  /**
   * Fetches the cities from the API and updates the state
   * @returns The updated list of cities
   */
  getCities: () => Promise<City[]>;

  /**
   * Get the city by name
   * @param name - The name of the city
   * @returns The city object
   * @throws Error if the city is not found
   */
  getCity: (name: string) => Promise<City>;
}

export const CitiesContext = createContext<CitiesContextType | null>(null);
