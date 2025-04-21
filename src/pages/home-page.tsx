import { useCities } from "../components/services/cities/cities-hook";

export function HomePage() {
  const citiesContext = useCities();

  return (
    <div>
      <h1>Home</h1>
      <p>
        Welcome to the home page! {citiesContext.cities.length} Cities loaded
      </p>
    </div>
  );
}
