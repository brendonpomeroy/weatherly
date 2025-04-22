import { useNavigate, useParams } from "react-router";
import { useCities } from "../components/services/cities/cities-hook";
import { PropsWithChildren, ReactNode, useEffect, useState } from "react";
import { City } from "../models/city";
import { PinMap } from "../components/ui/pin-map";
import { WeatherData } from "../models/weather";
import { useWeather } from "../components/services/weather/weather-hook";
import { formatInTimeZone } from "date-fns-tz";
import { SettingsMenu } from "../components/compositions/settings-menu";
import {
  HumidityIcon,
  TemperatureIcon,
  UvIndexIcon,
  WindSpeedIcon,
} from "../components/ui/icons";
import { ChevronLeftIcon } from "lucide-react";
import { Skeleton } from "../components/ui/skeleton";

export function CityPage() {
  const navigate = useNavigate();
  const citiesContext = useCities();
  const weather = useWeather();
  const cityName = useParams().city;
  // search param is to disambiguate cities with the same name
  const state = new URLSearchParams(window.location.search).get("state");
  const [matchedCity, setMatchedCity] = useState<City | null>(null);
  const [loadingCity, setLoadingCity] = useState(true);
  const [loadingWeather, setLoadingWeather] = useState(true);
  const [loading, setLoading] = useState(true);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  useEffect(() => {
    setLoadingCity(true);
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
    setLoadingCity(false);
  }, [citiesContext.cities, cityName, state]);

  useEffect(() => {
    if (matchedCity !== null) {
      setLoadingWeather(true);
      // fetch the weather data
      weather.getWeather(matchedCity.lat, matchedCity.lng).then((data) => {
        setWeatherData(data);
        setLoadingWeather(false);
      });
    }
  }, [matchedCity, weather, weather.params]);

  useEffect(() => {
    setLoading(loadingCity || loadingWeather);
  }, [loadingCity, loadingWeather]);

  return (
    <div className="h-full max-w-2xl mx-auto flex flex-col justify-center gap-4">
      <SettingsMenu />
      <div
        className="cursor-pointer flex flex-row gap-2"
        onClick={() => navigate("/")}
      >
        <ChevronLeftIcon />
        Back to Search
      </div>
      <div className="text-center py-4">
        <p className="text-2xl font-bold">{matchedCity?.name}</p>
        <p>{matchedCity?.stateName}</p>
        <p>
          {weatherData &&
            formatInTimeZone(
              new Date(),
              weatherData.timezone,
              "hh:mma d MMMM yyyy",
            )}
        </p>
      </div>
      <div className="flex flex-row flex-wrap gap-2 py-2 justify-center">
        {weather.params.temperature && (
          <WeatherParam
            value={weatherData?.temperature}
            unit={weatherData?.temperatureUnits}
            label="Temperature"
            loading={loading}
          >
            <TemperatureIcon />
          </WeatherParam>
        )}
        {weather.params.humidity && (
          <WeatherParam
            value={weatherData?.humidity}
            unit="%"
            label="Humidity"
            loading={loading}
          >
            <HumidityIcon />
          </WeatherParam>
        )}
        {weather.params.uvIndex && (
          <WeatherParam
            value={weatherData?.uvIndex}
            label="UV Index"
            loading={loading}
          >
            <UvIndexIcon />
          </WeatherParam>
        )}
        {weather.params.windSpeed && (
          <WeatherParam
            value={weatherData?.windSpeed}
            unit={weatherData?.speedUnits}
            label="Wind Speed"
            loading={loading}
          >
            <WindSpeedIcon />
          </WeatherParam>
        )}
      </div>
      {matchedCity && (
        <div className="h-100 rounded-lg overflow-hidden shadow-lg m-4">
          <PinMap lng={matchedCity.lng} lat={matchedCity.lat} zoom={13} />
        </div>
      )}
    </div>
  );
}

const WeatherParam: (
  props: PropsWithChildren<{
    value?: string | number;
    unit?: string;
    label: string;
    loading: boolean;
  }>,
) => ReactNode = (props) => {
  return (
    <div className="flex flex-col items-center justify-center w-[120px]">
      <div className="py-2">{props.children}</div>
      {props.loading ? (
        <Skeleton className="h-[18px] w-[50px] my-1" />
      ) : (
        <p className="font-semibold text-lg">
          {props.value}
          {props.unit}
        </p>
      )}
      <p className="text-xs text-gray-500">{props.label}</p>
    </div>
  );
};
