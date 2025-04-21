export interface WeatherParams {
  temperature: boolean;
  humidity: boolean;
  windSpeed: boolean;
  uvIndex: boolean;
  temperatureUnits: "f" | "c";
  windSpeedUnits: "m/s" | "km/h" | "mph";
}
