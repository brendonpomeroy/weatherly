import { useNavigate, useParams } from "react-router";
import { useCities } from "../components/services/cities/cities-hook";
import { useEffect, useState } from "react";
import { City } from "../models/city";
import { PinMap } from "../components/ui/pin-map";
import { WeatherData } from "../models/weather";
import { useWeather } from "../components/services/weather/weather-hook";

export function CityPage() {
  const navigate = useNavigate();
  const citiesContext = useCities();
  const weather = useWeather();
  const cityName = useParams().city;
  // search param is to disambiguate cities with the same name
  const state = new URLSearchParams(window.location.search).get("state");
  const [matchedCity, setMatchedCity] = useState<City | null>(null);
  const [loading, setLoading] = useState(true);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  useEffect(() => {
    const matches = citiesContext.cities
      .sort((a, b) => {
        return b.population - a.population;
      })
      .filter((city) => {
        if (state) {
          return (
            city.name.toLowerCase() === cityName?.toLowerCase() &&
            city.state.toLowerCase() === state.toLowerCase()
          );
        }
        return city.name.toLowerCase() === cityName?.toLowerCase();
      });

    if (matches.length > 0) {
      // return the first match which should be the most populated matching city
      setMatchedCity(matches[0]);
    } else {
      setMatchedCity(null);
    }
    setLoading(false);
  }, [citiesContext.cities, cityName, state]);

  useEffect(() => {
    if (matchedCity !== null) {
      // fetch the weather data
      weather.getWeather(matchedCity.lat, matchedCity.lng).then((data) => {
        setWeatherData(data);
      });
    }
  }, [matchedCity, weather]);

  return (
    <div>
      <h1>City</h1>
      <button onClick={() => navigate("/")}>Search</button>
      <p>
        Welcome to the {matchedCity?.name}, {matchedCity?.state} page!
      </p>
      {loading && <p>Loading...</p>}
      {weatherData && (
        <>
          <p>temperature: {weatherData.temperature}</p>
          <p>Humidity: {weatherData.humidity}</p>
          <p>UV Index: {weatherData.uvIndex}</p>
          <p>Wind Speed: {weatherData.windSpeed}</p>
        </>
      )}
      {matchedCity && (
        <div className="h-100 w-full">
          <PinMap lng={matchedCity.lng} lat={matchedCity.lat} zoom={13} />
        </div>
      )}
    </div>
  );
}
