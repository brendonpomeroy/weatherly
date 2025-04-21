import { ReactNode, useEffect, useState } from "react";
import { useCities } from "../components/services/cities/cities-hook";
import { City } from "../models/city";

export function HomePage() {
  const citiesContext = useCities();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchResults, setSearchResults] = useState<City[]>([]);

  useEffect(() => {
    // Speed optimisation as no cities have names
    // that are less than 2 characters
    if (searchTerm.length < 2) {
      setSearchResults([]);
      return;
    }

    const results = citiesContext.cities.filter((city) =>
      city.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    setSearchResults(results);
  }, [citiesContext.cities, searchTerm]);

  return (
    <div>
      <h1>Home</h1>
      <p>
        Welcome to the home page! {citiesContext.cities.length} Cities loaded
      </p>
      <div>
        <TextField
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="City"
        />
      </div>
      <div>
        {searchResults.length > 0 ? (
          <ul>
            {searchResults.map((city, index) => (
              <li key={`${city.name}-${index}`}>
                <a href={`/city/${city.name}?state=${city.state}`}>
                  {city.name}, {city.postcode}, {city.state}, {city.population}
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p>No cities found</p>
        )}
      </div>
    </div>
  );
}

export interface TextFieldProps {
  placeholder?: string;
  value: string;
  onEnter?: () => void;
  onChange: (value: string) => void;
}

const TextField: (props: TextFieldProps) => ReactNode = (props) => {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && props.onEnter) {
      props.onEnter();
    }
  };

  return (
    <input
      type="text"
      placeholder={props.placeholder}
      value={props.value}
      onChange={(e) => props.onChange(e.target.value)}
      onKeyDown={handleKeyDown}
      className="mt-0.5 w-full rounded border-gray-300 shadow-sm sm:text-sm"
    />
  );
};
