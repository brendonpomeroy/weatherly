import { PropsWithChildren, useEffect, useState } from "react";
import { CitiesContext } from "./cities-context";
import { fetchCities } from "../../../api/city-api";
import { City } from "../../../models/city";

export function CitiesProvider({ children }: PropsWithChildren) {
  const [cities, setCities] = useState<City[]>([]);

  const getCities: () => Promise<City[]> = async () => {
    const updatedCities = await fetchCities();
    setCities(updatedCities);
    return updatedCities;
  };

  const getCity: (name: string) => Promise<City> = async (name) => {
    if (cities.length === 0) {
      await getCities();
    }
    const city = cities.find((city) => city.name === name);
    if (city) {
      return city;
    } else {
      throw new Error(`City ${name} not found`);
    }
  };

  useEffect(() => {
    getCities();
  }, []);

  return (
    <CitiesContext.Provider
      value={{
        cities,
        getCities,
        getCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}
