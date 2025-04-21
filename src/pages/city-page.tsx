import { useNavigate, useParams } from "react-router";
import { useCities } from "../components/services/cities/cities-hook";
import { ReactNode, useEffect, useState } from "react";
import { City } from "../models/city";
import { PinMap } from "../components/ui/pin-map";
import { WeatherData } from "../models/weather";
import { useWeather } from "../components/services/weather/weather-hook";
import { format } from "date-fns";

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
  }, [matchedCity, weather, weather.params]);

  return (
    <div>
      <h1>City</h1>
      <button onClick={() => navigate("/")}>Search</button>
      <p>
        Welcome to the {matchedCity?.name}, {matchedCity?.state} page!
      </p>
      {loading && <p>Loading...</p>}
      <ParamSelector />
      <UnitsSelect />
      {weatherData && (
        <>
          <p>Time: {format(weatherData.time, "hh:mmb d MMMM yyyy")}</p>
          <p>Temperature: {weatherData.temperature}{weatherData.temperatureUnits}</p>
          <p>Humidity: {weatherData.humidity}</p>
          <p>UV Index: {weatherData.uvIndex}</p>
          <p>Wind Speed: {weatherData.windSpeed}{weatherData.speedUnits}</p>
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

const ParamSelector: () => ReactNode = () => {
  const weather = useWeather();
  const params = weather.params;

  const setWeatherParams = weather.setWeatherParams;

  return (
    <div className="flex flex-row gap-2">
      <ParamSelect
        label="Temperature"
        active={params.temperature}
        onClick={() => {
          setWeatherParams({ ...params, temperature: !params.temperature });
        }}
      />
      <ParamSelect
        label="Humidity"
        active={params.humidity}
        onClick={() => {
          setWeatherParams({ ...params, humidity: !params.humidity });
        }}
      />
      <ParamSelect
        label="Wind Speed"
        active={params.windSpeed}
        onClick={() => {
          setWeatherParams({ ...params, windSpeed: !params.windSpeed });
        }}
      />
      <ParamSelect
        label="UV Index"
        active={params.uvIndex}
        onClick={() => {
          setWeatherParams({ ...params, uvIndex: !params.uvIndex });
        }}
      />
    </div>
  );
};

const ParamSelect: (props: {
  label: string;
  active: boolean;
  onClick: () => void;
}) => ReactNode = (props) => {
  return (
    <div
      data-active={props.active}
      onClick={props.onClick}
      className="cursor-pointer bg-gray-200 p-2 rounded-md data-[active=true]:bg-blue-500 data-[active=true]:text-white"
    >
      <p>{props.label}</p>
    </div>
  );
};

const UnitsSelect: () => ReactNode = () => {
  const weather = useWeather();
  return (
    <div className="flex flex-row gap-2" onClick={() => weather.setWeatherParams({ ...weather.params, metric: !weather.params.metric })}>
      {weather.params.metric ? "metric" : "imperial"}
    </div>
  );
};
