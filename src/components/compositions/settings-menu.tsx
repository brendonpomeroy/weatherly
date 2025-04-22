import { SettingsIcon } from "lucide-react";
import {
  PropsWithChildren,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import { useWeather } from "../services/weather/weather-hook";
import {
  TemperatureIcon,
  HumidityIcon,
  UvIndexIcon,
  WindSpeedIcon,
} from "../ui/icons";
import { cn } from "@/utils";

export const SettingsMenu: () => ReactNode = () => {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    // Hide menu when clicking outside
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuRef]);

  return (
    <div
      ref={menuRef}
      className="absolute bottom-4 right-4 flex flex-col items-end justify-center gap-2 z-10000"
    >
      <div
        data-open={showMenu}
        className="hidden data-[open=true]:block bg-white rounded-lg shadow-lg p-4 flex flex-col items-start justify-center"
      >
        <ParamSelector />
        <UnitsSelect />
      </div>
      <div
        className="bg-[#9FB3DF] hover:bg-[#6686cc] cursor-pointer text-white font-bold p-2 rounded-full shadow-lg h-12 w-12 flex items-center justify-center"
        onClick={toggleMenu}
      >
        <SettingsIcon />
      </div>
    </div>
  );
};

const ParamSelector: () => ReactNode = () => {
  const weather = useWeather();
  const params = weather.params;

  const setWeatherParams = weather.setWeatherParams;

  return (
    <div className="flex flex-col gap-2">
      <ParamSelect
        label="Temperature"
        active={params.temperature}
        onClick={() => {
          setWeatherParams({ ...params, temperature: !params.temperature });
        }}
      >
        <TemperatureIcon />
      </ParamSelect>
      <ParamSelect
        label="Humidity"
        active={params.humidity}
        onClick={() => {
          setWeatherParams({ ...params, humidity: !params.humidity });
        }}
      >
        <HumidityIcon />
      </ParamSelect>
      <ParamSelect
        label="UV Index"
        active={params.uvIndex}
        onClick={() => {
          setWeatherParams({ ...params, uvIndex: !params.uvIndex });
        }}
      >
        <UvIndexIcon />
      </ParamSelect>
      <ParamSelect
        label="Wind Speed"
        active={params.windSpeed}
        onClick={() => {
          setWeatherParams({ ...params, windSpeed: !params.windSpeed });
        }}
      >
        <WindSpeedIcon />
      </ParamSelect>
    </div>
  );
};

const ParamSelect: (
  props: PropsWithChildren<{
    label: string;
    active: boolean;
    onClick: () => void;
  }>,
) => ReactNode = (props) => {
  return (
    <div
      data-active={props.active}
      onClick={props.onClick}
      className="cursor-pointer bg-gray-200 py-2 px-3 rounded-md data-[active=true]:bg-[#6686cc] data-[active=true]:text-white flex flex-row gap-2 items-center justify-start"
    >
      <div className="h-4 w-4 [&>*]:w-full [&>*]:h-full">{props.children}</div>
      <p className="text-sm">{props.label}</p>
    </div>
  );
};

const UnitsSelect: () => ReactNode = () => {
  const weather = useWeather();

  const toggleUnits: () => void = () => {
    weather.setWeatherParams({
      ...weather.params,
      metric: !weather.params.metric,
    });
  };

  const isMetric = weather.params.metric;

  return (
    <div className="flex items-center justify-center gap-2 text-sm font-medium bg-gray-200 py-2 px-3 rounded-md mt-2">
      <span className="text-muted-foreground flex-1">Metric</span>
      <button
        onClick={() => toggleUnits()}
        className={cn(
          "relative w-12 h-6 bg-pastel-blue rounded-full transition-colors duration-300 flex-2",
          isMetric ? "bg-blue-300" : "bg-[#FAC898]",
        )}
        aria-label="Toggle units"
      >
        <div
          className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white shadow-md transition-transform duration-300 ${
            isMetric ? "translate-x-0" : "translate-x-6"
          }`}
        />
      </button>
      <span className="text-muted-foreground flex-1">Imperial</span>
    </div>
  );
};
