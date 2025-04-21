import { useParams } from "react-router";
import { useCities } from "../components/services/cities/cities-hook";

export function CityPage() {
  const citiesContext = useCities();
  
  const cityName = useParams().city;

  return (
    <div>
      <h1>City</h1>
      <p>Welcome to the {cityName} page!</p>
    </div>
  );
}
