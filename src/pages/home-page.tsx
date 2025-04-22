import { ReactNode, useEffect, useState } from "react";
import { useCities } from "../components/services/cities/cities-hook";
import { City } from "../models/city";
import { SearchField } from "../components/compositions/search-field";
import { useNavigate } from "react-router";
import { CloudSunRain } from "lucide-react";

export function HomePage() {
  const citiesContext = useCities();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchResults, setSearchResults] = useState<City[]>([]);

  useEffect(() => {
    const sortCities = (a: City, b: City) => {
      const aName = a.name.toLowerCase();
      const bName = b.name.toLowerCase();
      const search = searchTerm.toLowerCase();
      // Exact match
      if (aName === search) return -1;
      // Starts with search term
      if (aName.startsWith(search) && !bName.startsWith(search)) return -1;
      // Includes search term
      if (aName.includes(search) && !bName.includes(search)) return -1;
      // Fuzzy match
      if (aName < bName) return -1;
      return 0;
    };

    // Speed optimisation as no cities have names
    // that are less than 2 characters
    if (searchTerm.length < 2) {
      setSearchResults([]);
      return;
    }

    const results = citiesContext.cities.filter((city) =>
      city.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    setSearchResults(results.sort(sortCities));
  }, [citiesContext.cities, searchTerm]);

  return (
    <div className="h-full max-w-2xl mx-auto flex flex-col">
      <div className="h-1/4"></div>
      <div className="w-full px-4 py-8 transition duration-500 ease-in-out">
        <div className="flex flex-col items-center py-4 gap-4">
          <CloudSunRain size={120} color={"#FFC067"} />
          <p className="text-2xl font-bold">Weather Explorer</p>
          <p>
            Find your weather, search for your city and get the latest weather
            update.
          </p>
        </div>
        <div>
          <SearchField value={searchTerm} onChange={setSearchTerm} />
        </div>
        {searchTerm.length > 2 && <SearchResults results={searchResults} />}
      </div>
    </div>
  );
}

const SearchResults: ({ results }: { results: City[] }) => ReactNode = ({
  results,
}) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white py-2 px-3 mt-2 rounded-xl shadow-md max-h-96 overflow-y-auto">
      {results.length > 0 ? (
        <ul>
          {results.map((city, index) => (
            <li
              key={`${city.name}-${index}`}
              className="py-2 px-2 hover:bg-gray-100 rounded cursor-pointer"
              onClick={() =>
                navigate(`/weather/${city.name}?state=${city.state}`)
              }
            >
              <span className="font-semibold">{city.name}</span>
              <span className="text-gray-600">
                , {city.postcode}, {city.state}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p>No cities found</p>
      )}
    </div>
  );
};
